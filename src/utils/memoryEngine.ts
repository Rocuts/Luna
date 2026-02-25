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
const ONBOARDING_KEY = 'onboarding_completed';

// ─── Tipos públicos ────────────────────────────────────────────────────────────

/** Un hito visual desbloqueable que representa una habilidad práctica */
export interface Logro {
    id: string;
    titulo_amigable: string;
    emoji: string;
    frase_resumen: string;
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
    totalSessions: number;
    totalMinutes: number;
    streakDays: number;
    lastSessionDate: string; // YYYY-MM-DD
}

// ─── Onboarding ─────────────────────────────────────────────────────────────

export function isOnboardingCompleted(): boolean {
    try {
        return localStorage.getItem(ONBOARDING_KEY) === 'true';
    } catch {
        return false;
    }
}

export function markOnboardingCompleted(): void {
    try {
        localStorage.setItem(ONBOARDING_KEY, 'true');
    } catch {
        // Silencioso
    }
}

// ─── Session timing ─────────────────────────────────────────────────────────

let sessionStartTimestamp: number | null = null;

export function markSessionStart(): void {
    sessionStartTimestamp = Date.now();
}

export function getSessionDurationMinutes(): number {
    if (!sessionStartTimestamp) return 0;
    return Math.round((Date.now() - sessionStartTimestamp) / 60000);
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
 */
export function saveLearnerProfile(reflection: SessionReflection): void {
    const existing = loadLearnerProfile();
    const today = getTodayDate();
    const sessionMinutes = getSessionDurationMinutes();

    const merged: LearnerProfile = {
        nivelAproximado: reflection.nivelAproximado || existing?.nivelAproximado || 'A1',
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
        totalSessions: (existing?.totalSessions ?? 0) + 1,
        totalMinutes: (existing?.totalMinutes ?? 0) + Math.max(sessionMinutes, 1),
        streakDays: calculateStreak(existing, today),
        lastSessionDate: today,
    };

    sessionStartTimestamp = null;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
        // localStorage puede estar lleno o desactivado
    }
}

// ─── Reflexión post-sesión ───────────────────────────────────────────────────

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

export function buildContextBlock(profile: LearnerProfile): string {
    const vocab = profile.vocabularioNuevo.length > 0
        ? profile.vocabularioNuevo.slice(0, 20).join(', ')
        : 'ninguno registrado';

    const errors = profile.erroresFrecuentes.length > 0
        ? profile.erroresFrecuentes.slice(0, 10).join('; ')
        : 'ninguno registrado';

    return [
        '---',
        'Contexto previo del usuario (de sesiones anteriores):',
        `- Nivel aproximado: ${profile.nivelAproximado || 'desconocido'}`,
        `- Sesiones completadas: ${profile.totalSessions ?? 0}`,
        `- Vocabulario que ya conoce o ha practicado: ${vocab}`,
        `- Errores que suele cometer: ${errors}`,
        `- Datos personales mencionados: ${profile.datosPersonalesMencionados || 'ninguno'}`,
        '',
        'Inicia la conversación haciendo referencia sutil a algo de este contexto para demostrar empatía.',
        'Por ejemplo, si mencionó su trabajo o un hobby, pregúntale cómo le va con eso en inglés.',
    ].join('\n');
}

// ─── Helpers internos ─────────────────────────────────────────────────────────

function getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
}

function calculateStreak(existing: LearnerProfile | null, today: string): number {
    if (!existing?.lastSessionDate) return 1;

    const last = new Date(existing.lastSessionDate);
    const now = new Date(today);
    const diffMs = now.getTime() - last.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return existing.streakDays || 1;
    if (diffDays === 1) return (existing.streakDays || 0) + 1;
    return 1;
}

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
    if (a.includes(b)) return a;
    return `${a}. ${b}`;
}

function mergeLogros(existing: Logro[], incoming: Logro[]): Logro[] {
    const existingIds = new Set(existing.map((l) => l.id.toLowerCase().trim()));
    const nuevos = incoming.filter((l) => !existingIds.has(l.id.toLowerCase().trim()));
    return [...existing, ...nuevos];
}
