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

type OAIServerEvent =
    | OAISessionEvent
    | OAITranscriptionCompleted
    | OAIResponseCreated
    | OAIAudioTranscriptDelta
    | OAIAudioTranscriptDone
    | OAIErrorEvent
    | OAIEventBase;

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
    private maxRetries = 3;
    private currentRetries = 0;

    // iOS audio playback: true si el navegador bloqueó el autoplay
    private audioPlaybackBlocked = false;

    // ── Configuración de callbacks ───────────────────────────────────────────

    setCallback(cb: RealtimeCallback) {
        this.stateCallback = cb;
    }

    setTranscriptCallback(cb: TranscriptCallback) {
        this.transcriptCallback = cb;
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

            const model = 'gpt-4o-realtime-preview';
            const sdpResponse = await fetch(
                `https://api.openai.com/v1/realtime?model=${model}`,
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
        // El modelo y las instrucciones ya se configuraron en /api/realtime.
        // Aquí podemos sobreescribir la detección de voz si queremos.
        // (Normalmente no es necesario si la configuración de sesión ya es correcta.)
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

            // La IA terminó de hablar → vuelve a escuchar
            case 'response.done':
                this.updateState({ aiState: 'listening' });
                break;

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
            this.storedMicStream !== null &&
            this.storedToken !== null;

        if (canRetry) {
            this.currentRetries++;
            this.updateState({ status: 'reconnecting', aiState: 'idle' });
            // Exponential backoff: 2s, 4s, 8s
            const delay = Math.pow(2, this.currentRetries) * 1000;
            setTimeout(() => this.connect(this.storedMicStream!, this.storedToken!), delay);
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
