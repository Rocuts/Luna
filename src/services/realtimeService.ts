/**
 * realtimeService.ts
 *
 * Servicio WebRTC hacia la OpenAI Realtime API.
 *
 * Flujo completo:
 * 1. El componente llama a connect(micStream, ephemeralToken)
 * 2. Se establece la conexión WebRTC con la API de OpenAI
 * 3. El data channel recibe eventos del servidor en tiempo real
 * 4. Los callbacks notifican al componente sobre cambios de estado y transcripciones
 *
 * Características:
 * - Transcripción en tiempo real del usuario y del asistente (feedback educativo)
 * - Detección de actividad de voz (VAD) del servidor: barge-in automático
 * - Reconexión con exponential backoff (resiliencia offline/señal débil)
 * - Limpieza correcta de recursos WebRTC y Web Audio
 */

// ─── Tipos públicos ────────────────────────────────────────────────────────────

export interface TranscriptEntry {
    id: string;
    role: 'user' | 'assistant';
    text: string;
}

export interface RealtimeState {
    status: 'disconnected' | 'connecting' | 'connected' | 'reconnecting';
    /** Estado de la IA dentro de una sesión conectada */
    aiState: 'idle' | 'listening' | 'thinking' | 'speaking';
    error: Error | null;
}

export type RealtimeCallback = (state: RealtimeState) => void;
export type TranscriptCallback = (entries: TranscriptEntry[]) => void;

// ─── Tipos internos para eventos del servidor de OpenAI ───────────────────────

interface OAIEventBase {
    type: string;
    event_id?: string;
}

interface OAISessionEvent extends OAIEventBase {
    type: 'session.created' | 'session.updated';
}

interface OAITranscriptionCompleted extends OAIEventBase {
    type: 'conversation.item.input_audio_transcription.completed';
    item_id: string;
    transcript: string;
}

interface OAIResponseCreated extends OAIEventBase {
    type: 'response.created';
    response: { id: string };
}

interface OAIAudioTranscriptDelta extends OAIEventBase {
    type: 'response.audio_transcript.delta';
    response_id: string;
    delta: string;
}

interface OAIAudioTranscriptDone extends OAIEventBase {
    type: 'response.audio_transcript.done';
    response_id: string;
    transcript: string;
}

interface OAIErrorEvent extends OAIEventBase {
    type: 'error';
    error: { message: string; code?: string };
}

interface OAIFunctionCallDone extends OAIEventBase {
    type: 'response.function_call_arguments.done';
    call_id: string;
    name: string;
    arguments: string; // JSON string
}

type OAIServerEvent =
    | OAISessionEvent
    | OAITranscriptionCompleted
    | OAIResponseCreated
    | OAIAudioTranscriptDelta
    | OAIAudioTranscriptDone
    | OAIFunctionCallDone
    | OAIErrorEvent
    | OAIEventBase;

// Tipo público para registrar tool handlers desde fuera del servicio
export type ToolHandler = (args: Record<string, unknown>) => string;

// ─── Servicio ──────────────────────────────────────────────────────────────────

class RealtimeService {
    private peerConnection: RTCPeerConnection | null = null;
    private dataChannel: RTCDataChannel | null = null;
    private audioElement: HTMLAudioElement | null = null;
    private remoteStream: MediaStream | null = null;

    private stateCallback: RealtimeCallback | null = null;
    private transcriptCallback: TranscriptCallback | null = null;

    // Estado interno
    private currentState: RealtimeState = {
        status: 'disconnected',
        aiState: 'idle',
        error: null,
    };
    private transcript: TranscriptEntry[] = [];
    private partialAssistantText = '';
    private currentResponseId: string | null = null;

    // Datos necesarios para reconexión automática
    private storedMicStream: MediaStream | null = null;
    private storedToken: string | null = null;
    private tokenRefreshCallback: (() => Promise<string>) | null = null;
    private maxRetries = 3;
    private currentRetries = 0;

    // iOS audio playback: true si el navegador bloqueó el autoplay
    private audioPlaybackBlocked = false;

    // ── Function calling: registro de tool handlers ───────────────────────
    private toolHandlers: Map<string, ToolHandler> = new Map();

    // ── Anti-eco: referencia a los tracks del micrófono para mute/unmute ───
    private micTracks: MediaStreamTrack[] = [];
    private isMicMuted = false;

    // ── Detección de echo loop ────────────────────────────────────────────
    // Si detectamos respuestas muy rápidas seguidas sin input real del usuario,
    // es señal de que la IA se está escuchando a sí misma → activar mute como fallback.
    private responseTimestamps: number[] = [];
    private echoLoopDetected = false;
    private static readonly ECHO_LOOP_WINDOW_MS = 8000; // ventana de detección
    private static readonly ECHO_LOOP_THRESHOLD = 3;    // respuestas en la ventana para activar

    private checkForEchoLoop(): boolean {
        const now = Date.now();
        this.responseTimestamps.push(now);
        // Mantener solo timestamps dentro de la ventana
        this.responseTimestamps = this.responseTimestamps.filter(
            (t) => now - t < RealtimeService.ECHO_LOOP_WINDOW_MS
        );
        // Si hay demasiadas respuestas rápidas → echo loop
        if (this.responseTimestamps.length >= RealtimeService.ECHO_LOOP_THRESHOLD) {
            if (!this.echoLoopDetected) {
                console.warn('[LangLA] Echo loop detectado — activando mute de micrófono como fallback');
                this.echoLoopDetected = true;
            }
            return true;
        }
        return false;
    }

    // ── Anti-eco: mute/unmute del micrófono ─────────────────────────────────

    private muteMic() {
        if (this.isMicMuted) return;
        this.micTracks.forEach((t) => { t.enabled = false; });
        this.isMicMuted = true;
        this.sendEvent({ type: 'input_audio_buffer.clear' });
    }

    private unmuteMic() {
        if (!this.isMicMuted) return;
        this.micTracks.forEach((t) => { t.enabled = true; });
        this.isMicMuted = false;
    }

    // ── Configuración de callbacks y tools ───────────────────────────────────

    setCallback(cb: RealtimeCallback) {
        this.stateCallback = cb;
    }

    /**
     * Registra un handler para un tool que Luna puede llamar durante la conversación.
     * El handler recibe los argumentos parseados y devuelve un JSON string con el resultado.
     */
    registerTool(name: string, handler: ToolHandler) {
        this.toolHandlers.set(name, handler);
    }

    setTranscriptCallback(cb: TranscriptCallback) {
        this.transcriptCallback = cb;
    }

    setTokenRefreshCallback(cb: () => Promise<string>) {
        this.tokenRefreshCallback = cb;
    }

    // ── Conexión principal ───────────────────────────────────────────────────

    async connect(micStream: MediaStream, apiToken: string) {
        this.storedMicStream = micStream;
        this.storedToken = apiToken;
        this.updateState({ status: 'connecting', aiState: 'idle', error: null });

        try {
            this.peerConnection = new RTCPeerConnection();

            // ── Audio de salida: elemento <audio> para reproducir la IA ─────
            this.remoteStream = new MediaStream();
            this.peerConnection.ontrack = (event) => {
                this.remoteStream!.addTrack(event.track);
                if (!this.audioElement) {
                    this.audioElement = new Audio();
                    this.audioElement.autoplay = true;
                    this.audioElement.srcObject = this.remoteStream;
                }
                // Iniciar reproducción con retry para iOS Safari.
                // En iOS, el autoplay puede fallar si el gesto del usuario
                // no se propagó correctamente al elemento <audio>.
                this.audioElement.play().catch(() => {
                    // Retry: marcar estado para que la UI muestre un aviso
                    // y el próximo tap del usuario reactive el audio
                    this.audioPlaybackBlocked = true;
                    this.updateState({
                        error: new Error('Toca la pantalla para activar el audio de Luna'),
                    });
                });
            };

            // ── Audio de entrada: micrófono → OpenAI ────────────────────────
            this.micTracks = micStream.getAudioTracks();
            this.isMicMuted = false;
            micStream.getTracks().forEach((track) => {
                this.peerConnection!.addTrack(track, micStream);
            });

            // ── Data channel para eventos bidireccionales ────────────────────
            this.dataChannel = this.peerConnection.createDataChannel('oai-events', {
                ordered: true,
            });
            this.dataChannel.onopen = this.onDataChannelOpen.bind(this);
            this.dataChannel.onmessage = this.handleServerEvent.bind(this);
            this.dataChannel.onerror = (e) => {
                console.error('[LangLA] DataChannel error:', e);
            };

            // ── Monitor del estado de la conexión peer ───────────────────────
            this.peerConnection.onconnectionstatechange = () => {
                const state = this.peerConnection?.connectionState;
                if (state === 'connected') {
                    this.currentRetries = 0;
                    this.updateState({ status: 'connected' });
                } else if (state === 'disconnected' || state === 'failed') {
                    this.handleDisconnection();
                }
            };

            // ── Negociación SDP (WebRTC handshake con OpenAI) ────────────────
            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);

            const sdpResponse = await fetch(
                'https://api.openai.com/v1/realtime/calls',
                {
                    method: 'POST',
                    body: offer.sdp,
                    headers: {
                        Authorization: `Bearer ${apiToken}`,
                        'Content-Type': 'application/sdp',
                    },
                }
            );

            if (!sdpResponse.ok) {
                const text = await sdpResponse.text();
                throw new Error(`SDP handshake failed (${sdpResponse.status}): ${text}`);
            }

            const answerSdp = await sdpResponse.text();
            await this.peerConnection.setRemoteDescription({
                type: 'answer',
                sdp: answerSdp,
            });

        } catch (error) {
            console.error('[LangLA] Error conectando a OpenAI Realtime:', error);
            this.handleDisconnection();
        }
    }

    // ── Configuración de sesión vía data channel ─────────────────────────────

    private onDataChannelOpen() {
        // Sobreescribir la configuración de sesión con semantic_vad y reducción de ruido.
        // Esto complementa la config de /api/realtime con parámetros que solo
        // se pueden ajustar después de que el data channel esté abierto.
        this.sendEvent({
            type: 'session.update',
            session: {
                turn_detection: {
                    type: 'semantic_vad',
                    eagerness: 'low',
                    create_response: true,
                    interrupt_response: true,
                },
                input_audio_noise_reduction: {
                    type: 'far_field',
                },
            },
        });
    }

    private sendEvent(event: object) {
        if (this.dataChannel?.readyState === 'open') {
            this.dataChannel.send(JSON.stringify(event));
        }
    }

    // ── Manejo de eventos del servidor ───────────────────────────────────────

    private handleServerEvent(event: MessageEvent) {
        let data: OAIServerEvent;
        try {
            data = JSON.parse(event.data as string) as OAIServerEvent;
        } catch {
            return;
        }

        switch (data.type) {

            // Sesión lista – la IA empieza a escuchar
            case 'session.created':
            case 'session.updated':
                this.updateState({ status: 'connected', aiState: 'listening' });
                break;

            // VAD: el usuario empezó a hablar
            case 'input_audio_buffer.speech_started':
                this.updateState({ aiState: 'listening' });
                break;

            // VAD: el usuario terminó de hablar → procesando
            case 'input_audio_buffer.speech_stopped':
                this.updateState({ aiState: 'thinking' });
                break;

            // Transcripción del usuario completada (Whisper)
            case 'conversation.item.input_audio_transcription.completed': {
                const e = data as OAITranscriptionCompleted;
                const userText = e.transcript?.trim();
                if (userText) {
                    // Transcripción real del usuario → resetear detección de echo loop
                    this.responseTimestamps = [];
                    this.echoLoopDetected = false;
                    const entryId = e.item_id || `user-${Date.now()}`;
                    const existing = this.transcript.findIndex((t) => t.id === entryId);
                    if (existing >= 0) {
                        // Crear nuevo objeto en lugar de mutar
                        this.transcript[existing] = { ...this.transcript[existing], text: userText };
                    } else {
                        // Si ya hay una entrada parcial del asistente (porque Whisper llegó tarde),
                        // insertar la del usuario ANTES para mantener el orden correcto
                        const currentAssistantId = this.currentResponseId
                            ? `assistant-${this.currentResponseId}`
                            : null;
                        const assistantIdx = currentAssistantId
                            ? this.transcript.findIndex((t) => t.id === currentAssistantId)
                            : -1;
                        if (assistantIdx >= 0) {
                            this.transcript.splice(assistantIdx, 0, { id: entryId, role: 'user', text: userText });
                        } else {
                            this.transcript.push({ id: entryId, role: 'user', text: userText });
                        }
                    }
                    this.emitTranscript();
                }
                break;
            }

            // La IA empieza a generar una respuesta
            case 'response.created': {
                const e = data as OAIResponseCreated;
                this.currentResponseId = e.response?.id ?? `resp-${Date.now()}`;
                this.partialAssistantText = '';
                // Solo mutear si detectamos un echo loop (respuestas rápidas sin input real).
                // En condiciones normales, el WebRTC AEC + semantic_vad + far_field noise
                // reduction son suficientes y permiten barge-in (interrupciones del usuario).
                if (this.checkForEchoLoop()) {
                    this.muteMic();
                }
                this.updateState({ aiState: 'thinking' });
                break;
            }

            // Texto de la IA llegando en tiempo real (streaming)
            case 'response.audio_transcript.delta': {
                const e = data as OAIAudioTranscriptDelta;
                this.partialAssistantText += e.delta ?? '';

                // Usar ID estable desde el inicio para evitar key change → flash al finalizar
                const entryId = `assistant-${this.currentResponseId}`;
                const idx = this.transcript.findIndex((t) => t.id === entryId);
                if (idx >= 0) {
                    // Crear nuevo objeto en lugar de mutar
                    this.transcript[idx] = { ...this.transcript[idx], text: this.partialAssistantText };
                } else {
                    this.transcript.push({
                        id: entryId,
                        role: 'assistant',
                        text: this.partialAssistantText,
                    });
                }
                this.emitTranscript();
                this.updateState({ aiState: 'speaking' });
                break;
            }

            // Texto final de la IA (mismo ID, solo actualiza el texto)
            case 'response.audio_transcript.done': {
                const e = data as OAIAudioTranscriptDone;
                const finalText = (e.transcript ?? this.partialAssistantText).trim();
                const entryId = `assistant-${this.currentResponseId}`;

                const idx = this.transcript.findIndex((t) => t.id === entryId);
                if (idx >= 0) {
                    this.transcript[idx] = { id: entryId, role: 'assistant', text: finalText };
                } else if (finalText) {
                    this.transcript.push({ id: entryId, role: 'assistant', text: finalText });
                }
                this.partialAssistantText = '';
                this.emitTranscript();
                break;
            }

            // La IA terminó de hablar → reactivar micrófono y volver a escuchar
            case 'response.done':
                if (this.isMicMuted) {
                    this.unmuteMic();
                }
                this.updateState({ aiState: 'listening' });
                break;

            // Function calling: Luna quiere ejecutar un tool del currículo
            case 'response.function_call_arguments.done': {
                const e = data as OAIFunctionCallDone;
                const handler = this.toolHandlers.get(e.name);
                if (handler) {
                    try {
                        const args = JSON.parse(e.arguments) as Record<string, unknown>;
                        const result = handler(args);
                        // Enviar el resultado de vuelta a Luna
                        this.sendEvent({
                            type: 'conversation.item.create',
                            item: {
                                type: 'function_call_output',
                                call_id: e.call_id,
                                output: result,
                            },
                        });
                        // Pedir a Luna que continúe hablando con el resultado
                        this.sendEvent({ type: 'response.create' });
                    } catch (err) {
                        console.error(`[LangLA] Error ejecutando tool "${e.name}":`, err);
                        this.sendEvent({
                            type: 'conversation.item.create',
                            item: {
                                type: 'function_call_output',
                                call_id: e.call_id,
                                output: JSON.stringify({ error: 'Tool execution failed' }),
                            },
                        });
                        this.sendEvent({ type: 'response.create' });
                    }
                } else {
                    console.warn(`[LangLA] Tool no registrado: "${e.name}"`);
                    this.sendEvent({
                        type: 'conversation.item.create',
                        item: {
                            type: 'function_call_output',
                            call_id: e.call_id,
                            output: JSON.stringify({ error: `Tool "${e.name}" not found` }),
                        },
                    });
                    this.sendEvent({ type: 'response.create' });
                }
                break;
            }

            // Error del servidor
            case 'error': {
                const e = data as OAIErrorEvent;
                const msg = e.error?.message ?? 'Error desconocido del servidor';
                console.error('[LangLA] Server error:', msg);
                this.updateState({ error: new Error(msg) });
                break;
            }
        }
    }

    // ── Reconexión automática ────────────────────────────────────────────────

    private handleDisconnection() {
        const canRetry =
            this.currentRetries < this.maxRetries &&
            this.storedMicStream !== null;

        if (canRetry) {
            this.currentRetries++;
            this.updateState({ status: 'reconnecting', aiState: 'idle' });
            const delay = Math.pow(2, this.currentRetries) * 1000;
            setTimeout(async () => {
                try {
                    // Pedir token fresco — el anterior ya expiró (~60s)
                    const freshToken = this.tokenRefreshCallback
                        ? await this.tokenRefreshCallback()
                        : this.storedToken;
                    if (!freshToken || !this.storedMicStream) {
                        throw new Error('No se pudo renovar la sesión.');
                    }
                    await this.connect(this.storedMicStream, freshToken);
                } catch {
                    this.updateState({
                        status: 'disconnected',
                        aiState: 'idle',
                        error: new Error('Se perdió la conexión. Toca para intentar de nuevo.'),
                    });
                }
            }, delay);
        } else {
            this.updateState({
                status: 'disconnected',
                aiState: 'idle',
                error: new Error('Se perdió la conexión. Toca para intentar de nuevo.'),
            });
        }
    }

    // ── Desconexión limpia ───────────────────────────────────────────────────

    disconnect() {
        this.storedMicStream = null;
        this.storedToken = null;
        this.currentRetries = 0;
        this.transcript = [];
        this.partialAssistantText = '';
        this.currentResponseId = null;
        this.micTracks = [];
        this.isMicMuted = false;
        this.responseTimestamps = [];
        this.echoLoopDetected = false;

        this.dataChannel?.close();
        this.peerConnection?.close();

        if (this.audioElement) {
            this.audioElement.srcObject = null;
            this.audioElement = null;
        }

        this.peerConnection = null;
        this.dataChannel = null;
        this.remoteStream = null;

        this.updateState({ status: 'disconnected', aiState: 'idle', error: null });
        this.transcriptCallback?.([]);
    }

    /**
     * Actualiza las instrucciones de Luna mid-sesión via session.update.
     * Útil para adaptar la dificultad o el enfoque pedagógico dinámicamente.
     */
    updateSessionInstructions(instructions: string) {
        this.sendEvent({
            type: 'session.update',
            session: { instructions },
        });
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private updateState(partial: Partial<RealtimeState>) {
        this.currentState = { ...this.currentState, ...partial };
        this.stateCallback?.(this.currentState);
    }

    private emitTranscript() {
        this.transcriptCallback?.([...this.transcript]);
    }

    /**
     * Reintenta la reproducción de audio tras un gesto del usuario.
     * Llamar cuando iOS Safari bloqueó el autoplay inicialmente.
     */
    retryAudioPlayback() {
        if (this.audioPlaybackBlocked && this.audioElement) {
            this.audioElement.play().then(() => {
                this.audioPlaybackBlocked = false;
                // Limpiar el error de audio bloqueado
                if (this.currentState.error?.message.includes('audio')) {
                    this.updateState({ error: null });
                }
            }).catch(() => {
                // Sigue bloqueado — el usuario necesita otro gesto
            });
        }
    }

    /** Permite enviar un mensaje de texto manualmente (útil para testing) */
    sendTextMessage(text: string) {
        this.sendEvent({
            type: 'conversation.item.create',
            item: {
                type: 'message',
                role: 'user',
                content: [{ type: 'input_text', text }],
            },
        });
        this.sendEvent({ type: 'response.create' });
    }
}

export const realtimeService = new RealtimeService();
