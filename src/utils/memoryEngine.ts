/**
 * memoryEngine.ts
 *
 * Gestiona la "Memoria a Largo Plazo" del aprendiz usando localStorage.
 *
 * Flujo:
 * 1. Al INICIAR sesión: leer perfil → buildContextBlock() → pasar contexto a /api/realtime
 * 2. Al TERMINAR sesión: generateSessionSummary(transcript) → /api/reflect → saveLearnerProfile()
 */

const STORAGE_KEY = 'learner_profile';

// ─── Tipos públicos ────────────────────────────────────────────────────────────

/** Un hito visual desbloqueable que representa una habilidad práctica */
export interface Logro {
    id: string;               // slug único (ej. "pedir_comida")
    titulo_amigable: string;  // texto grande en la tarjeta (ej. "Ir a la Panadería")
    emoji: string;            // emoji representativo (ej. "🥖")
    frase_resumen: string;    // frase corta leída por TTS (ej. "Aprendiste a pedir comida")
}

/** Resultado de analizar una sola sesión */
export interface SessionReflection {
    nivelAproximado: string;
    vocabularioNuevo: string[];
    erroresFrecuentes: string[];
    datosPersonalesMencionados: string;
    logros_desbloqueados: Logro[];
}

/** Perfil acumulado a lo largo de todas las sesiones */
export interface LearnerProfile extends SessionReflection {
    lastUpdated: string;
}

// ─── localStorage ─────────────────────────────────────────────────────────────

export function loadLearnerProfile(): LearnerProfile | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as LearnerProfile;
    } catch {
        return null;
    }
}

/**
 * Fusiona la nueva reflexión con el perfil existente y guarda en localStorage.
 * - nivelAproximado: siempre reemplaza con el último (más reciente = más preciso)
 * - vocabularioNuevo / erroresFrecuentes: acumula y deduplica
 * - datosPersonalesMencionados: concatena si hay información nueva
 * - logros_desbloqueados: se anexan, deduplicando por id
 */
export function saveLearnerProfile(reflection: SessionReflection): void {
    const existing = loadLearnerProfile();

    const merged: LearnerProfile = {
        nivelAproximado: reflection.nivelAproximado || existing?.nivelAproximado || '',
        vocabularioNuevo: deduplicate([
            ...(existing?.vocabularioNuevo ?? []),
            ...(reflection.vocabularioNuevo ?? []),
        ]),
        erroresFrecuentes: deduplicate([
            ...(existing?.erroresFrecuentes ?? []),
            ...(reflection.erroresFrecuentes ?? []),
        ]),
        datosPersonalesMencionados: mergePersonalData(
            existing?.datosPersonalesMencionados,
            reflection.datosPersonalesMencionados,
        ),
        logros_desbloqueados: mergeLogros(
            existing?.logros_desbloqueados ?? [],
            reflection.logros_desbloqueados ?? [],
        ),
        lastUpdated: new Date().toISOString(),
    };

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
        // localStorage puede estar lleno o desactivado — fallo silencioso en MVP
    }
}

// ─── Reflexión post-sesión ───────────────────────────────────────────────────

/**
 * Llama a /api/reflect con la transcripción en texto plano.
 * Devuelve null si la transcripción está vacía o si la llamada falla.
 */
export async function generateSessionSummary(
    transcript: string,
): Promise<SessionReflection | null> {
    if (!transcript.trim()) return null;

    try {
        const res = await fetch('/api/reflect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transcript }),
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data as SessionReflection;
    } catch {
        return null;
    }
}

// ─── Inyección de contexto en el System Prompt ───────────────────────────────

/**
 * Genera el bloque de contexto que se añadirá al final del System Prompt de Luna.
 * Devuelve null si no hay perfil guardado.
 */
export function buildContextBlock(profile: LearnerProfile): string {
    const vocab = profile.vocabularioNuevo.length > 0
        ? profile.vocabularioNuevo.slice(0, 20).join(', ')  // cap para no sobrecargar el prompt
        : 'ninguno registrado';

    const errors = profile.erroresFrecuentes.length > 0
        ? profile.erroresFrecuentes.slice(0, 10).join('; ')
        : 'ninguno registrado';

    return [
        '---',
        'Contexto previo del usuario (de sesiones anteriores):',
        `- Nivel aproximado: ${profile.nivelAproximado || 'desconocido'}`,
        `- Vocabulario que ya conoce o ha practicado: ${vocab}`,
        `- Errores que suele cometer: ${errors}`,
        `- Datos personales mencionados: ${profile.datosPersonalesMencionados || 'ninguno'}`,
        '',
        'Inicia la conversación haciendo referencia sutil a algo de este contexto para demostrar empatía.',
        'Por ejemplo, si mencionó su trabajo o un hobby, pregúntale cómo le va con eso en inglés.',
    ].join('\n');
}

// ─── Helpers internos ─────────────────────────────────────────────────────────

function deduplicate(arr: string[]): string[] {
    const normalized = arr.map((s) => s.toLowerCase().trim()).filter(Boolean);
    return normalized.filter((item, idx) => normalized.indexOf(item) === idx);
}

function mergePersonalData(existing?: string, incoming?: string): string {
    const a = existing?.trim() ?? '';
    const b = incoming?.trim() ?? '';
    if (!a && !b) return '';
    if (!a) return b;
    if (!b) return a;
    if (a === b) return a;
    // Evitar duplicar frases que ya están incluidas
    if (a.includes(b)) return a;
    return `${a}. ${b}`;
}

/**
 * Anexa los nuevos logros al array existente, evitando duplicados por id.
 * Los logros existentes mantienen su posición (primeros = más antiguos).
 */
function mergeLogros(existing: Logro[], incoming: Logro[]): Logro[] {
    const existingIds = new Set(existing.map((l) => l.id.toLowerCase().trim()));
    const nuevos = incoming.filter((l) => !existingIds.has(l.id.toLowerCase().trim()));
    return [...existing, ...nuevos];
}
