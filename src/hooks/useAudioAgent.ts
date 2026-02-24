'use client';

import { useState, useRef, useCallback } from 'react';

/**
 * AudioContext singleton — reutilizamos una sola instancia para evitar
 * problemas de recursos en iOS Safari y respetar la política de autoplay.
 * Se crea lazy y se resume dentro de un gesto del usuario.
 */
let sharedAudioContext: AudioContext | null = null;

function getOrCreateAudioContext(): AudioContext {
    if (sharedAudioContext && sharedAudioContext.state !== 'closed') {
        return sharedAudioContext;
    }
    const AC = window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!;
    sharedAudioContext = new AC();
    return sharedAudioContext;
}

/**
 * useAudioAgent
 *
 * Gestiona el micrófono del usuario con:
 * - Cancelación de eco, supresión de ruido y control automático de ganancia
 * - Análisis de volumen en tiempo real (normalizado 0–1) para animar la UI
 * - AudioContext singleton con resume() para compatibilidad iOS Safari
 * - Limpieza correcta de todos los recursos de Web Audio
 *
 * micVolume devuelve un valor entre 0 y 1:
 *   0   = silencio
 *   1   = nivel máximo
 * Esto permite que los componentes lo usen directamente sin conversiones.
 */
export function useAudioAgent() {
    const [isListening, setIsListening] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [micVolume, setMicVolume] = useState(0);

    const streamRef = useRef<MediaStream | null>(null);
    const analyzerRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const rafRef = useRef<number | null>(null);

    /**
     * Loop de análisis de volumen — corre en requestAnimationFrame (~60fps)
     * para mantener la animación del orbe fluida.
     */
    const monitorVolume = useCallback(() => {
        if (!analyzerRef.current) return;

        const data = new Uint8Array(analyzerRef.current.frequencyBinCount);
        analyzerRef.current.getByteFrequencyData(data);

        // Promedio de energía, normalizado al rango 0–1
        const avg = data.reduce((sum, v) => sum + v, 0) / data.length;
        setMicVolume(avg / 255);

        rafRef.current = requestAnimationFrame(monitorVolume);
    }, []);

    const buildMicAccessError = (error: unknown): Error => {
        if (typeof window !== 'undefined' && !window.isSecureContext) {
            return new Error(
                'Esta página no es segura. Para usar el micrófono abre la app en https:// o en http://localhost.'
            );
        }

        if (!navigator.mediaDevices?.getUserMedia) {
            return new Error('Tu navegador no soporta acceso al micrófono (getUserMedia).');
        }

        if (error instanceof DOMException) {
            switch (error.name) {
                case 'NotAllowedError':
                case 'SecurityError':
                    return new Error(
                        'Permiso de micrófono bloqueado. Actívalo en el navegador y vuelve a intentar.'
                    );
                case 'NotFoundError':
                    return new Error('No se encontró ningún micrófono disponible en este dispositivo.');
                case 'NotReadableError':
                    return new Error('No se pudo abrir el micrófono. Verifica que no esté en uso por otra app.');
                case 'OverconstrainedError':
                    return new Error('La configuración de audio no es compatible con este dispositivo.');
                default:
                    return new Error(error.message || 'No se pudo acceder al micrófono.');
            }
        }

        if (error instanceof Error) return error;
        return new Error('No se pudo acceder al micrófono.');
    };

    /**
     * Solicita acceso al micrófono y activa el análisis de volumen.
     * Devuelve el MediaStream listo para pasarlo a WebRTC.
     *
     * IMPORTANTE: Esta función se llama dentro de un gesto del usuario (tap),
     * lo que permite que audioContext.resume() desbloquee el audio en iOS Safari.
     */
    const startListening = async (): Promise<MediaStream | undefined> => {
        try {
            if (typeof window !== 'undefined' && !window.isSecureContext) {
                throw new Error(
                    'Esta página no es segura. Para usar el micrófono abre la app en https:// o en http://localhost.'
                );
            }

            if (!navigator.mediaDevices?.getUserMedia) {
                throw new Error('Tu navegador no soporta acceso al micrófono (getUserMedia).');
            }

            const constraints: MediaStreamConstraints = {
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    sampleRate: 48000,
                    channelCount: 1, // Mono: menor ancho de banda, suficiente para voz
                },
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;
            setHasPermission(true);
            setIsListening(true);

            // Reutilizar AudioContext singleton y resumirlo (requerido en iOS Safari)
            const audioContext = getOrCreateAudioContext();
            if (audioContext.state === 'suspended') {
                await audioContext.resume();
            }

            // Web Audio API: fuente → analizador (no conectamos al destino,
            // así no hay eco local)
            sourceRef.current = audioContext.createMediaStreamSource(stream);
            analyzerRef.current = audioContext.createAnalyser();
            analyzerRef.current.fftSize = 256; // 128 bins → resolución suficiente para UI
            sourceRef.current.connect(analyzerRef.current);

            monitorVolume();
            return stream;

        } catch (error) {
            const mappedError = buildMicAccessError(error);
            console.error('[LangLA] No se pudo acceder al micrófono:', mappedError);
            setHasPermission(false);
            throw mappedError;
        }
    };

    /**
     * Detiene el micrófono y libera recursos de la sesión actual.
     * El AudioContext singleton se mantiene vivo para reutilizar.
     */
    const stopListening = useCallback(() => {
        // 1. Parar tracks del stream
        streamRef.current?.getTracks().forEach((t: MediaStreamTrack) => t.stop());
        streamRef.current = null;

        // 2. Cancelar el loop de animación
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }

        // 3. Desconectar nodos de audio (pero no cerrar el AudioContext singleton)
        sourceRef.current?.disconnect();
        sourceRef.current = null;
        analyzerRef.current = null;

        setIsListening(false);
        setMicVolume(0);
    }, []);

    const resetPermissionState = useCallback(() => {
        setHasPermission(null);
    }, []);

    return {
        startListening,
        stopListening,
        isListening,
        hasPermission,
        resetPermissionState,
        /** Nivel de volumen normalizado 0–1 */
        micVolume,
        mediaStream: streamRef.current,
    };
}
