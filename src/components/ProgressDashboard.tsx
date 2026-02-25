'use client';

import React, { useState, useEffect } from 'react';
import { X, Volume2 } from 'lucide-react';
import { loadLearnerProfile, type Logro, type LearnerProfile } from '../utils/memoryEngine';

interface ProgressDashboardProps {
    onClose: () => void;
}

const LEVEL_COLORS: Record<string, string> = {
    A1: 'from-green-400 to-emerald-500',
    A2: 'from-teal-400 to-cyan-500',
    B1: 'from-blue-400 to-indigo-500',
    B2: 'from-violet-400 to-purple-500',
    C1: 'from-amber-400 to-orange-500',
    C2: 'from-rose-400 to-red-500',
};

const LEVEL_LABELS: Record<string, string> = {
    A1: 'Principiante',
    A2: 'Elemental',
    B1: 'Intermedio',
    B2: 'Intermedio Alto',
    C1: 'Avanzado',
    C2: 'Maestría',
};

export default function ProgressDashboard({ onClose }: ProgressDashboardProps) {
    const [profile] = useState<LearnerProfile | null>(() => loadLearnerProfile());
    const [speakingId, setSpeakingId] = useState<string | null>(null);

    useEffect(() => {
        return () => { window.speechSynthesis?.cancel(); };
    }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    const handleSpeak = (logro: Logro) => {
        window.speechSynthesis?.cancel();
        if (speakingId === logro.id) { setSpeakingId(null); return; }
        const utterance = new SpeechSynthesisUtterance(logro.frase_resumen);
        utterance.lang = 'es-ES';
        utterance.rate = 0.88;
        utterance.pitch = 1.05;
        utterance.onstart = () => setSpeakingId(logro.id);
        utterance.onend = () => setSpeakingId(null);
        utterance.onerror = () => setSpeakingId(null);
        window.speechSynthesis.speak(utterance);
    };

    const level = profile?.nivelAproximado || 'A1';
    const levelGradient = LEVEL_COLORS[level] || LEVEL_COLORS.A1;
    const levelLabel = LEVEL_LABELS[level] || level;
    const logros = profile?.logros_desbloqueados ?? [];
    const vocabCount = profile?.vocabularioNuevo?.length ?? 0;

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
            style={{ background: 'rgba(255, 251, 245, 0.97)', backdropFilter: 'blur(12px)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Panel de progreso"
        >
            {/* Header */}
            <div className="sticky top-0 z-10 px-4 sm:px-5 py-4 sm:py-5 flex items-center justify-between gap-3 border-b border-orange-100/80"
                style={{ background: 'rgba(255, 251, 245, 0.95)', backdropFilter: 'blur(8px)' }}>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-950 tracking-tight">
                    Mi Progreso
                </h1>
                <button
                    onClick={onClose}
                    aria-label="Cerrar panel de progreso"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-orange-100 hover:bg-orange-200 active:scale-90 transition-all flex items-center justify-center shadow-sm flex-shrink-0"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-orange-800" strokeWidth={2.5} />
                </button>
            </div>

            <div className="flex-1 px-4 py-6 sm:py-7 sm:px-8 pb-[max(1.25rem,env(safe-area-inset-bottom))] max-w-2xl mx-auto w-full space-y-6">

                {/* Stats row */}
                {profile ? (
                    <>
                        {/* Level badge */}
                        <div className={`bg-gradient-to-br ${levelGradient} rounded-2xl sm:rounded-3xl p-6 text-center text-white shadow-lg`}>
                            <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Nivel actual</p>
                            <p className="text-5xl sm:text-6xl font-extrabold mt-1">{level}</p>
                            <p className="text-lg font-bold mt-1 opacity-90">{levelLabel}</p>
                        </div>

                        {/* Quick stats */}
                        <div className="grid grid-cols-3 gap-3">
                            <QuickStat emoji="🔥" value={profile.streakDays ?? 0} label={profile.streakDays === 1 ? 'día' : 'días'} />
                            <QuickStat emoji="🎯" value={profile.totalSessions ?? 0} label={profile.totalSessions === 1 ? 'sesión' : 'sesiones'} />
                            <QuickStat emoji="⏱️" value={profile.totalMinutes ?? 0} label="min" />
                        </div>

                        {/* Vocabulary */}
                        {vocabCount > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <h2 className="text-lg font-bold text-orange-950">Vocabulario</h2>
                                    <span className="text-sm font-semibold text-orange-900/50">{vocabCount} palabras</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {profile.vocabularioNuevo.slice(0, 20).map((word) => (
                                        <span
                                            key={word}
                                            className="px-3 py-1.5 bg-white/70 border border-orange-100 rounded-full text-sm font-medium text-orange-900"
                                        >
                                            {word}
                                        </span>
                                    ))}
                                    {vocabCount > 20 && (
                                        <span className="px-3 py-1.5 text-sm font-medium text-orange-900/40">+{vocabCount - 20} más</span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Achievements */}
                        <div className="space-y-3">
                            <h2 className="text-lg font-bold text-orange-950 px-1">
                                Logros ({logros.length})
                            </h2>
                            {logros.length === 0 ? (
                                <p className="text-base text-orange-900/50 px-1">
                                    Completa una sesión para desbloquear logros.
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                    {logros.map((logro) => (
                                        <LogroCard
                                            key={logro.id}
                                            logro={logro}
                                            isSpeaking={speakingId === logro.id}
                                            onSpeak={() => handleSpeak(logro)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
}

function QuickStat({ emoji, value, label }: { emoji: string; value: number; label: string }) {
    return (
        <div className="glass-panel rounded-2xl p-4 flex flex-col items-center text-center gap-1">
            <span className="text-xl leading-none" role="img" aria-hidden="true">{emoji}</span>
            <p className="text-2xl font-extrabold text-orange-950">{value}</p>
            <p className="text-xs font-semibold text-orange-900/50">{label}</p>
        </div>
    );
}

function LogroCard({ logro, isSpeaking, onSpeak }: { logro: Logro; isSpeaking: boolean; onSpeak: () => void }) {
    return (
        <article className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 flex items-start gap-4 border border-orange-50">
            <span className="text-4xl leading-none select-none flex-shrink-0" role="img" aria-hidden="true">
                {logro.emoji}
            </span>
            <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-base font-bold text-gray-800 leading-snug truncate">{logro.titulo_amigable}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{logro.frase_resumen}</p>
                <button
                    onClick={onSpeak}
                    aria-label={isSpeaking ? `Parar: ${logro.titulo_amigable}` : `Escuchar: ${logro.frase_resumen}`}
                    className={`mt-1 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                        isSpeaking ? 'bg-aurora-500 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                    }`}
                >
                    <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                    {isSpeaking ? 'Escuchando...' : 'Escuchar'}
                </button>
            </div>
        </article>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center max-w-sm mx-auto gap-6">
            <span className="text-7xl sm:text-8xl leading-none select-none" role="img" aria-label="Cohete">
                🚀
            </span>
            <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
                    Tu aventura empieza hoy
                </h2>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    Completa tu primera sesión con Luna y aquí verás tu nivel, racha, vocabulario y logros.
                </p>
            </div>
        </div>
    );
}
