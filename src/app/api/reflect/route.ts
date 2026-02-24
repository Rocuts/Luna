import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/reflect
 *
 * Analiza la transcripción de una sesión de aprendizaje y devuelve un JSON
 * estructurado con insights pedagógicos. Usa gpt-4o-mini para eficiencia en coste.
 *
 * Body:  { transcript: string }
 * Returns: {
 *   nivelAproximado, vocabularioNuevo, erroresFrecuentes,
 *   datosPersonalesMencionados, logros_desbloqueados
 * }
 */
export async function POST(request: NextRequest) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: 'Servicio no configurado.' },
            { status: 500 },
        );
    }

    let transcript: string;
    try {
        const body = await request.json();
        transcript = typeof body.transcript === 'string' ? body.transcript : '';
        if (!transcript.trim()) {
            return NextResponse.json(
                { error: 'Transcripción vacía.' },
                { status: 400 },
            );
        }
    } catch {
        return NextResponse.json({ error: 'Body inválido.' }, { status: 400 });
    }

    const systemPrompt = `Eres un analizador experto de sesiones de aprendizaje de inglés para hispanohablantes.

Analiza la transcripción y devuelve ÚNICAMENTE un objeto JSON válido con exactamente estos cinco campos:

{
  "nivelAproximado": "nivel CEFR del usuario (A1, A2, B1, B2, C1 o C2). Si no hay suficiente información, usa 'A1'.",
  "vocabularioNuevo": ["lista de palabras o frases en inglés que el usuario intentó usar, aprendió o repitió durante la sesión"],
  "erroresFrecuentes": ["lista de errores gramaticales o de vocabulario que cometió el usuario, descritos brevemente en español"],
  "datosPersonalesMencionados": "resumen en una frase de los datos personales del usuario: nombre, trabajo, hobbies, ciudad, metas de aprendizaje, etc. Deja vacío si no mencionó nada.",
  "logros_desbloqueados": [
    {
      "id": "slug único en snake_case basado en el tema (ej. 'pedir_comida', 'en_el_aeropuerto')",
      "titulo_amigable": "título corto y descriptivo de la habilidad practicada (ej. 'Ir a la Panadería')",
      "emoji": "un solo emoji que represente visualmente el logro (ej. '🥖')",
      "frase_resumen": "frase corta en español que describe qué aprendió el usuario (ej. 'Aprendiste a pedir comida')"
    }
  ]
}

Reglas para logros_desbloqueados:
- Genera entre 1 y 3 logros por sesión basados en los temas REALES que se practicaron en la conversación.
- Los logros deben ser concretos y motivadores, no genéricos. Ej: 'Presentarte en inglés' es mejor que 'Practicaste inglés'.
- Si la sesión fue muy corta o sin contenido pedagógico claro, devuelve un array vacío.
- El id debe ser estable: siempre el mismo para el mismo concepto (ej. presentarse → 'presentarse_en_ingles').

Reglas generales:
- Devuelve SOLO el JSON, sin markdown, sin explicaciones adicionales.
- vocabularioNuevo y erroresFrecuentes deben ser arrays, nunca null.
- Si el usuario no cometió errores, devuelve erroresFrecuentes como array vacío.
- Si no hay vocabulario notable, devuelve vocabularioNuevo como array vacío.
- Máximo 20 elementos en vocabularioNuevo y 10 en erroresFrecuentes.`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                temperature: 0,
                response_format: { type: 'json_object' },
                messages: [
                    { role: 'system', content: systemPrompt },
                    {
                        role: 'user',
                        content: `Transcripción de la sesión:\n\n${transcript}`,
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errBody = await response.text();
            console.error('[LangLA /api/reflect] OpenAI error:', errBody);
            return NextResponse.json(
                { error: 'Error al analizar la sesión.' },
                { status: 502 },
            );
        }

        const completion = await response.json();
        const raw = completion.choices?.[0]?.message?.content ?? '{}';

        let parsed: Record<string, unknown>;
        try {
            parsed = JSON.parse(raw);
        } catch {
            console.error('[LangLA /api/reflect] JSON parse failed:', raw);
            return NextResponse.json(
                { error: 'Respuesta mal formada del modelo.' },
                { status: 500 },
            );
        }

        // Normalización defensiva de logros: cada objeto debe tener los 4 campos string
        const rawLogros = Array.isArray(parsed.logros_desbloqueados)
            ? parsed.logros_desbloqueados
            : [];

        const logros_desbloqueados = (rawLogros as unknown[])
            .filter(
                (item): item is Record<string, string> =>
                    typeof item === 'object' &&
                    item !== null &&
                    typeof (item as Record<string, unknown>).id === 'string' &&
                    typeof (item as Record<string, unknown>).titulo_amigable === 'string' &&
                    typeof (item as Record<string, unknown>).emoji === 'string' &&
                    typeof (item as Record<string, unknown>).frase_resumen === 'string',
            )
            .slice(0, 5)
            .map((item) => ({
                id: item.id.trim().toLowerCase().replace(/\s+/g, '_'),
                titulo_amigable: item.titulo_amigable.trim(),
                emoji: item.emoji.trim(),
                frase_resumen: item.frase_resumen.trim(),
            }));

        // Normalización defensiva de los demás campos
        const result = {
            nivelAproximado: typeof parsed.nivelAproximado === 'string'
                ? parsed.nivelAproximado.trim()
                : 'A1',
            vocabularioNuevo: Array.isArray(parsed.vocabularioNuevo)
                ? (parsed.vocabularioNuevo as unknown[]).filter((x) => typeof x === 'string').slice(0, 20)
                : [],
            erroresFrecuentes: Array.isArray(parsed.erroresFrecuentes)
                ? (parsed.erroresFrecuentes as unknown[]).filter((x) => typeof x === 'string').slice(0, 10)
                : [],
            datosPersonalesMencionados: typeof parsed.datosPersonalesMencionados === 'string'
                ? parsed.datosPersonalesMencionados.trim()
                : '',
            logros_desbloqueados,
        };

        return NextResponse.json(result);

    } catch (error) {
        console.error('[LangLA /api/reflect] Unexpected error:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor.' },
            { status: 500 },
        );
    }
}
