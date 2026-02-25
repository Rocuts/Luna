'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAudioAgent } from '../hooks/useAudioAgent';
import { realtimeService, RealtimeState, TranscriptEntry } from '../services/realtimeService';
import {
    loadLearnerProfile,
    saveLearnerProfile,
    generateSessionSummary,
    markSessionStart,
    type SessionReflection,
} from '../utils/memoryEngine';
import { type LearningMode } from '../utils/promptManager';
import { Mic, Square, Loader2, MicOff, WifiOff } from 'lucide-react';
import ProgressDashboard from './ProgressDashboard';
import SessionSummary from './SessionSummary';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

// ─── Tipos ────────────────────────────────────────────────────────────────────

type AiState = RealtimeState['aiState'];

// ─── Utilidades ───────────────────────────────────────────────────────────────

function formatTranscriptText(entries: TranscriptEntry[]): string {
    return entries
        .map((e) => `${e.role === 'user' ? 'Usuario' : 'Luna'}: ${e.text}`)
        .join('\n');
}

function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function TranscriptPanel({ entries }: { entries: TranscriptEntry[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [entries]);

    if (entries.length === 0) return null;

    return (
        <div ref={containerRef} className="w-full max-w-2xl glass-panel rounded-2xl sm:rounded-3xl p-3 sm:p-5 max-h-44 sm:max-h-56 overflow-y-auto space-y-2.5 sm:space-y-3">
            {entries.map((entry) => (
                <div key={entry.id} className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[88%] sm:max-w-[82%] px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-sm sm:text-base font-medium leading-relaxed ${
                        entry.role === 'user'
                            ? 'bg-aurora-500 text-white rounded-br-sm shadow-md'
                            : 'bg-white/70 text-orange-950 rounded-bl-sm shadow-sm'
                    }`}>
                        {entry.text}
                    </div>
                </div>
            ))}
        </div>
    );
}

function MicDeniedScreen({ errorMessage, onRetry }: { errorMessage?: string; onRetry: () => void }) {
    const isInsecureContext = Boolean(errorMessage?.toLowerCase().includes('no es segura'));
    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 sm:p-6">
            <div className="glass-panel p-7 sm:p-12 rounded-[2rem] sm:rounded-[3rem] w-full max-w-sm flex flex-col items-center text-center space-y-6 sm:space-y-8 animate-float">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-100/80 flex items-center justify-center shadow-inner">
                    <MicOff className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
                </div>
                <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-950 tracking-tight">
                        Necesito el micrófono
                    </h1>
                    <p className="text-base sm:text-lg text-orange-900/70 leading-relaxed">
                        {errorMessage ?? 'Para hablar con tu tutora, permite el acceso al micrófono en la barra de tu navegador.'}
                    </p>
                    {isInsecureContext && (
                        <p className="text-sm sm:text-base text-orange-900/70 leading-relaxed">
                            Si abriste la app por IP local, usa http://localhost:3000 en este mismo equipo o publica con HTTPS.
                        </p>
                    )}
                </div>
                <button
                    onClick={onRetry}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-aurora-500 text-white rounded-2xl font-bold text-base sm:text-lg hover:bg-aurora-600 active:scale-95 transition-all shadow-md"
                >
                    Intentar de nuevo
                </button>
            </div>
        </div>
    );
}

function ReconnectingScreen() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 sm:p-6">
            <div className="glass-panel p-7 sm:p-12 rounded-[2rem] sm:rounded-[3rem] w-full max-w-sm flex flex-col items-center text-center space-y-6 sm:space-y-8 animate-float">
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-orange-400 rounded-full opacity-30 animate-ping" />
                    <Loader2 className="w-14 h-14 sm:w-16 sm:h-16 text-orange-500 animate-spin relative z-10" />
                </div>
                <div className="space-y-3">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-950 tracking-tight">
                        Dame un segundito...
                    </h1>
                    <p className="text-lg sm:text-xl text-orange-900/70 font-medium">
                        Estoy recordando lo que me decías...
                    </p>
                </div>
            </div>
        </div>
    );
}

function OfflineBanner() {
    return (
        <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 glass-panel px-4 sm:px-5 py-2.5 sm:py-3 rounded-full flex items-center gap-2.5 sm:gap-3 shadow-lg z-50 max-w-[calc(100vw-1.5rem)] border-orange-300/50">
            <WifiOff className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <span className="text-sm font-semibold text-orange-900 whitespace-nowrap">
                Sin conexión — tu progreso está seguro
            </span>
        </div>
    );
}

function SavingMemoryBadge() {
    return (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 glass-panel px-4 sm:px-5 py-2.5 sm:py-3 rounded-full flex items-center gap-2.5 sm:gap-3 shadow-lg animate-float z-50 max-w-[calc(100vw-1.5rem)]">
            <Loader2 className="w-4 h-4 text-orange-500 animate-spin flex-shrink-0" />
            <span className="text-sm font-semibold text-orange-900 whitespace-nowrap">
                Analizando tu sesión...
            </span>
        </div>
    );
}

// ─── Pantalla de selección de modo ───────────────────────────────────────────

function ModeSelectionScreen({ onSelect, onShowProgress }: { onSelect: (mode: LearningMode) => void; onShowProgress: () => void }) {
    const profile = loadLearnerProfile();
    const streak = profile?.streakDays ?? 0;
    const level = profile?.nivelAproximado;

    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 sm:p-6 gap-6 sm:gap-10">
            <div className="text-center space-y-3 max-w-sm">
                {streak >= 2 && (
                    <p className="text-base font-bold text-aurora-500">
                        🔥 Racha de {streak} días
                    </p>
                )}
                <h1 className="text-[clamp(1.9rem,7vw,2.45rem)] font-extrabold text-orange-950 tracking-tight leading-tight mix-blend-multiply opacity-90">
                    ¿Cómo quieres<br />practicar hoy?
                </h1>
                <p className="text-base sm:text-lg font-medium text-orange-900/65">
                    {level ? `Nivel ${level} — Elige tu modo` : 'Elige tu modo de práctica'}
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 sm:gap-5 w-full max-w-2xl">
                <button
                    onClick={() => onSelect('open')}
                    aria-label="Charla Libre: conversación libre con Luna"
                    className="flex-1 glass-panel rounded-[1.65rem] sm:rounded-[2rem] p-5 sm:p-8 flex flex-col items-center text-center gap-4 min-h-[190px] sm:min-h-[220px] border-2 border-transparent hover:border-aurora-500/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                    <span className="text-6xl sm:text-7xl leading-none" role="img" aria-hidden="true">☕</span>
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-orange-950 tracking-tight">Charla Libre</h2>
                        <p className="text-sm sm:text-base font-medium text-orange-900/70 leading-relaxed">Conversa libremente con Luna sobre cualquier tema</p>
                    </div>
                </button>

                <button
                    onClick={() => onSelect('tutor')}
                    aria-label="Clase Guiada: sesión estructurada con corrección"
                    className="flex-1 glass-panel rounded-[1.65rem] sm:rounded-[2rem] p-5 sm:p-8 flex flex-col items-center text-center gap-4 min-h-[190px] sm:min-h-[220px] border-2 border-transparent hover:border-aurora-500/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                    <span className="text-6xl sm:text-7xl leading-none" role="img" aria-hidden="true">🎓</span>
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-orange-950 tracking-tight">Clase Guiada</h2>
                        <p className="text-sm sm:text-base font-medium text-orange-900/70 leading-relaxed">Practica con preguntas guiadas y corrección inmediata</p>
                    </div>
                </button>
            </div>

            <button
                onClick={onShowProgress}
                aria-label="Ver mi progreso"
                className="px-6 py-3 bg-white/70 backdrop-blur-sm border border-orange-200 rounded-2xl font-bold text-base text-orange-900 hover:bg-white hover:shadow-md active:scale-95 transition-all shadow-sm min-h-[48px]"
            >
                Ver mi progreso 📊
            </button>
        </div>
    );
}

// ─── Labels de estado ─────────────────────────────────────────────────────────

const AI_STATE_LABELS: Record<AiState, string> = {
    idle: 'Conectando...',
    listening: 'Te escucho...',
    thinking: 'Pensando...',
    speaking: 'Hablando...',
};

const AI_STATE_COLORS: Record<AiState, string> = {
    idle: 'bg-orange-400 animate-bounce',
    listening: 'bg-green-500 animate-pulse',
    thinking: 'bg-yellow-500 animate-bounce',
    speaking: 'bg-blue-500 animate-pulse',
};

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ChatInterface() {
    const {
        startListening,
        stopListening,
        isListening,
        micVolume,
        hasPermission,
        resetPermissionState,
    } = useAudioAgent();
    const isOnline = useNetworkStatus();

    const [selectedMode, setSelectedMode] = useState<LearningMode | null>(null);

    const [sessionState, setSessionState] = useState<RealtimeState>({
        status: 'disconnected',
        aiState: 'idle',
        error: null,
    });
    const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);

    // ── Memoria y UI modals ────────────────────────────────────────────────────
    const [isReflecting, setIsReflecting] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [sessionReflection, setSessionReflection] = useState<SessionReflection | null>(null);

    // ── Session timer ──────────────────────────────────────────────────────────
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = useCallback(() => {
        setElapsedSeconds(0);
        timerRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    }, []);

    const stopTimer = useCallback(() => {
        if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    }, []);

    useEffect(() => () => { stopTimer(); }, [stopTimer]);

    // ── Transcript ref ─────────────────────────────────────────────────────────
    const transcriptRef = useRef<TranscriptEntry[]>([]);
    useEffect(() => { transcriptRef.current = transcript; }, [transcript]);

    const runReflection = useCallback(async (entries: TranscriptEntry[]): Promise<SessionReflection | null> => {
        if (entries.length === 0) return null;
        const plainText = formatTranscriptText(entries);
        const reflection = await generateSessionSummary(plainText);
        if (reflection) saveLearnerProfile(reflection);
        return reflection;
    }, []);

    // ── Token efímero ──────────────────────────────────────────────────────────

    const getEphemeralToken = useCallback(async (): Promise<string> => {
        const profile = loadLearnerProfile();
        const res = await fetch('/api/realtime', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mode: selectedMode ?? 'open', profile }),
        });
        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body.error ?? 'No se pudo iniciar la sesión.');
        }
        const data = await res.json();
        return data.token as string;
    }, [selectedMode]);

    // ── Callbacks del servicio ─────────────────────────────────────────────────

    useEffect(() => {
        let mounted = true;

        realtimeService.setCallback((state) => { if (mounted) setSessionState(state); });
        realtimeService.setTranscriptCallback((entries) => { if (mounted) setTranscript(entries); });
        realtimeService.setTokenRefreshCallback(getEphemeralToken);

        return () => {
            mounted = false;
            const entries = transcriptRef.current;
            if (entries.length > 0) runReflection(entries).catch(() => {});
            realtimeService.disconnect();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        realtimeService.setTokenRefreshCallback(getEphemeralToken);
    }, [getEphemeralToken]);

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleStart = async () => {
        if (navigator.vibrate) navigator.vibrate(15);
        realtimeService.retryAudioPlayback();

        try {
            const stream = await startListening();
            if (!stream) return;
            markSessionStart();
            startTimer();
            const token = await getEphemeralToken();
            await realtimeService.connect(stream, token);
        } catch (e) {
            console.error('[LangLA] Error iniciando sesión:', e);
            stopListening();
            stopTimer();
            setSessionState((prev) => ({
                ...prev,
                status: 'disconnected',
                error: e instanceof Error ? e : new Error('Error desconocido'),
            }));
        }
    };

    const handleStop = async () => {
        const entriesToReflect = [...transcriptRef.current];
        stopListening();
        stopTimer();
        realtimeService.disconnect();

        if (entriesToReflect.length > 0) {
            setIsReflecting(true);
            const reflection = await runReflection(entriesToReflect);
            setIsReflecting(false);
            if (reflection) setSessionReflection(reflection);
        }
    };

    const handleChangeMode = () => {
        setSelectedMode(null);
        setTranscript([]);
        setSessionReflection(null);
        setSessionState({ status: 'disconnected', aiState: 'idle', error: null });
    };

    const handleSummaryContinue = () => {
        setSessionReflection(null);
        setTranscript([]);
        setElapsedSeconds(0);
        setSelectedMode(null);
    };

    // ── Pantallas especiales ──────────────────────────────────────────────────

    if (hasPermission === false) {
        return (
            <MicDeniedScreen
                errorMessage={sessionState.error?.message}
                onRetry={() => { resetPermissionState(); setSessionState((prev) => ({ ...prev, error: null })); }}
            />
        );
    }
    if (sessionState.status === 'reconnecting') return <ReconnectingScreen />;

    if (sessionReflection) {
        return <SessionSummary reflection={sessionReflection} onContinue={handleSummaryContinue} />;
    }

    if (selectedMode === null) {
        return (
            <>
                {showProgress && <ProgressDashboard onClose={() => setShowProgress(false)} />}
                <ModeSelectionScreen onSelect={setSelectedMode} onShowProgress={() => setShowProgress(true)} />
            </>
        );
    }

    // ── Cálculos visuales ─────────────────────────────────────────────────────

    const orbScale = isListening ? 1 + micVolume * 0.15 : 1;
    const isConnecting = sessionState.status === 'connecting';
    const { aiState } = sessionState;
    const hasTranscript = transcript.length > 0;
    const isActive = isListening || isConnecting;
    const sessionMinutes = Math.floor(elapsedSeconds / 60);

    return (
        <>
        {showProgress && <ProgressDashboard onClose={() => setShowProgress(false)} />}
        {!isOnline && <OfflineBanner />}
        <div className="flex flex-col items-center min-h-[100dvh] p-3 sm:p-8 gap-4 sm:gap-6 pb-[max(1rem,env(safe-area-inset-bottom))]">

            {isReflecting && <SavingMemoryBadge />}

            {/* Session timer */}
            {isActive && (
                <div className="flex items-center gap-3">
                    <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2">
                        <span className="text-sm font-mono font-semibold text-orange-900">
                            {formatDuration(elapsedSeconds)}
                        </span>
                    </div>
                    {sessionMinutes >= 5 && (
                        <div className="glass-panel px-3 py-2 rounded-full">
                            <span className="text-xs font-semibold text-orange-900/60">
                                ¡{sessionMinutes} min! Buen ritmo 💪
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Transcripción */}
            <div className={`w-full max-w-2xl transition-all duration-700 ${
                hasTranscript ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}>
                <TranscriptPanel entries={transcript} />
            </div>

            {/* Zona central */}
            <div className="flex-1 flex flex-col items-center justify-center gap-5 sm:gap-8 w-full max-w-2xl">

                {/* Status indicator */}
                <div className={`glass-panel px-5 sm:px-7 py-2.5 sm:py-3 rounded-full flex items-center gap-2.5 sm:gap-3 transition-all duration-500 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'
                }`}>
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${AI_STATE_COLORS[aiState]}`} />
                    <span className="text-sm sm:text-base font-semibold text-orange-900 tracking-wide">
                        {AI_STATE_LABELS[aiState]}
                    </span>
                </div>

                {/* Central orb */}
                <button
                    onClick={isListening ? handleStop : handleStart}
                    aria-label={isListening ? 'Parar de hablar' : 'Tocar para hablar con Luna'}
                    disabled={isConnecting || isReflecting}
                    className={`relative group focus:outline-none rounded-full flex items-center justify-center transition-transform duration-300 ease-out ${
                        isConnecting || isReflecting ? 'cursor-wait' : 'cursor-pointer hover:scale-105 active:scale-95'
                    }`}
                    style={{ transform: `scale(${orbScale})` }}
                >
                    {isListening && (
                        <>
                            <div className="absolute inset-[-22%] rounded-full bg-orange-400/15 blur-3xl animate-pulse-slow" />
                            <div className="absolute inset-[-12%] rounded-full bg-white/25 blur-xl" />
                        </>
                    )}
                    <div className={`
                        w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full
                        flex flex-col items-center justify-center
                        border border-white/50 backdrop-blur-md
                        shadow-[0_20px_60px_-15px_rgba(255,100,0,0.35),inset_0_2px_15px_rgba(255,255,255,0.8)]
                        transition-all duration-700
                        ${isListening ? 'bg-aurora-500/90 animate-glow' : 'glass-button'}
                    `}>
                        {isConnecting ? (
                            <Loader2 className="w-16 h-16 sm:w-20 sm:h-20 text-white animate-spin opacity-80" strokeWidth={1.5} />
                        ) : isListening ? (
                            <Square className="w-12 h-12 sm:w-16 sm:h-16 text-white fill-white opacity-90 transition-transform group-hover:scale-90" />
                        ) : (
                            <Mic className="w-16 h-16 sm:w-24 sm:h-24 text-white opacity-90 transition-transform group-hover:scale-110 drop-shadow-md" strokeWidth={1.5} />
                        )}
                        <span className={`
                            text-white text-lg sm:text-2xl font-bold tracking-wide drop-shadow-sm
                            transition-all duration-300 absolute mt-20 sm:mt-28
                            ${isConnecting ? 'opacity-0' : 'opacity-0 group-hover:opacity-90'}
                        `}>
                            {isListening ? 'Parar' : 'Hablar'}
                        </span>
                    </div>
                </button>

                {/* Welcome */}
                <div className={`text-center max-w-sm px-2 transition-all duration-700 ${
                    isActive || hasTranscript ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                    <h2 className="text-[clamp(2rem,8vw,3rem)] font-extrabold text-orange-950 tracking-tight leading-tight mix-blend-multiply opacity-90">
                        Toca el centro<br />para empezar
                    </h2>
                    <p className="mt-4 sm:mt-5 text-base sm:text-xl font-medium text-orange-900/65">
                        Sin botones complicados.<br />Solo tú y Luna, tu tutora de inglés.
                    </p>

                    {sessionState.error && (
                        <p className="mt-4 text-sm sm:text-base text-red-600/80 font-medium">
                            {sessionState.error.message}
                        </p>
                    )}

                    <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 w-full">
                        <button
                            onClick={() => setShowProgress(true)}
                            aria-label="Ver mi progreso"
                            className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-4 bg-white/70 backdrop-blur-sm border border-orange-200 rounded-2xl font-bold text-base sm:text-lg text-orange-900 hover:bg-white hover:shadow-md active:scale-95 transition-all shadow-sm"
                        >
                            Ver mi progreso 📊
                        </button>
                        <button
                            onClick={handleChangeMode}
                            aria-label="Volver a seleccionar modo"
                            className="px-5 py-3 min-h-[48px] text-sm sm:text-base font-medium text-orange-900/60 hover:text-orange-900 hover:bg-white/40 rounded-xl transition-all"
                        >
                            ← Cambiar modo
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
