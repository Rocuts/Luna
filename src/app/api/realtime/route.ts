import { NextRequest, NextResponse } from 'next/server';
import { getSystemPrompt, type LearningMode } from '@/utils/promptManager';
import type { LearnerProfile } from '@/utils/memoryEngine';

/**
 * POST /api/realtime
 *
 * Genera un token efímero de sesión para conectarse directamente desde el
 * navegador a la OpenAI Realtime API via WebRTC.
 *
 * Body (opcional): { mode?: 'open' | 'tutor', profile?: LearnerProfile }
 *   mode    — modo de aprendizaje seleccionado por el usuario. Default: 'open'.
 *   profile — perfil acumulado del aprendiz desde localStorage.
 *             Se usa para personalizar el System Prompt de Luna vía getSystemPrompt().
 *
 * Por qué es necesario este paso del servidor:
 * - El API key de OpenAI NUNCA debe exponerse al cliente
 * - El token efímero tiene una vida corta (~1 min) y permisos limitados
 * - Este patrón es el estándar seguro para apps WebRTC de producción
 */
export async function POST(request: NextRequest) {
    const apiKey = process.env.OPENAI_API_KEY;

    // Leer modo y perfil del aprendiz desde el body
    let mode: LearningMode = 'open';
    let learnerProfile: LearnerProfile | null = null;
    try {
        const body = await request.json().catch(() => ({}));
        if (body.mode === 'open' || body.mode === 'tutor') {
            mode = body.mode;
        }
        if (body.profile && typeof body.profile === 'object') {
            learnerProfile = body.profile as LearnerProfile;
        }
    } catch {
        // Body vacío o no-JSON es válido (primera sesión sin perfil)
    }

    if (!apiKey) {
        console.error('OPENAI_API_KEY no está configurada en las variables de entorno');
        return NextResponse.json(
            { error: 'Servicio no configurado. Contacta al administrador.' },
            { status: 500 }
        );
    }

    const model = process.env.OPENAI_REALTIME_MODEL ?? 'gpt-4o-realtime-preview';

    try {
        const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                voice: 'shimmer', // Voz cálida y clara para educación
                instructions: getSystemPrompt(mode, learnerProfile),
                input_audio_transcription: {
                    model: 'whisper-1',
                },
                turn_detection: {
                    type: 'server_vad',
                    threshold: 0.5,
                    prefix_padding_ms: 300,
                    silence_duration_ms: 600,
                },
            }),
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({ message: response.statusText }));
            console.error('OpenAI API error:', errorBody);
            return NextResponse.json(
                { error: 'No se pudo iniciar la sesión. Intenta de nuevo.' },
                { status: response.status }
            );
        }

        const session = await response.json();

        // Devolvemos solo el token efímero al cliente
        return NextResponse.json({
            token: session.client_secret.value,
            expiresAt: session.client_secret.expires_at,
        });

    } catch (error) {
        console.error('Error generando token efímero:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

