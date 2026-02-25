'use client';

import React from 'react';
import { type SessionReflection, type LearnerProfile, loadLearnerProfile } from '../utils/memoryEngine';

interface SessionSummaryProps {
    reflection: SessionReflection;
    onContinue: () => void;
}

const LEVEL_LABELS: Record<string, string> = {
    A1: 'Principiante',
    A2: 'Elemental',
    B1: 'Intermedio',
    B2: 'Intermedio Alto',
    C1: 'Avanzado',
    C2: 'Maestría',
};

export default function SessionSummary({ reflection, onContinue }: SessionSummaryProps) {
    const profile: LearnerProfile | null = loadLearnerProfile();
    const level = reflection.nivelAproximado || 'A1';
    const levelLabel = LEVEL_LABELS[level] || level;

    const newWords = reflection.vocabularioNuevo?.length ?? 0;
    const newLogros = reflection.logros_desbloqueados?.length ?? 0;
    const streak = profile?.streakDays ?? 1;
    const totalSessions = profile?.totalSessions ?? 1;

    return (
        <div className="flex flex-col items-center min-h-[100dvh] p-4 sm:p-6 gap-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">

            {/* Header */}
            <div className="text-center space-y-2 pt-6 sm:pt-10">
                <span className="text-5xl sm:text-6xl leading-none select-none" role="img" aria-hidden="true">
                    🎉
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-950 tracking-tight">
                    Sesión completada
                </h1>
                <p className="text-base sm:text-lg text-orange-900/60 font-medium">
                    Sesión #{totalSessions} — Aquí va tu resumen
                </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm">
                <StatCard emoji="📊" label="Nivel" value={level} subtitle={levelLabel} />
                <StatCard emoji="🔥" label="Racha" value={`${streak}`} subtitle={streak === 1 ? 'día' : 'días'} />
                <StatCard emoji="📝" label="Palabras" value={`${newWords}`} subtitle="nuevas hoy" />
                <StatCard emoji="🏆" label="Logros" value={`+${newLogros}`} subtitle="desbloqueados" />
            </div>

            {/* New achievements */}
            {newLogros > 0 && (
                <div className="w-full max-w-sm space-y-3">
                    <h2 className="text-lg font-bold text-orange-950 px-1">Nuevos logros</h2>
                    <div className="space-y-2.5">
                        {reflection.logros_desbloqueados.map((logro) => (
                            <div
                                key={logro.id}
                                className="glass-panel rounded-2xl p-4 flex items-center gap-4"
                            >
                                <span className="text-3xl sm:text-4xl leading-none select-none flex-shrink-0" role="img" aria-hidden="true">
                                    {logro.emoji}
                                </span>
                                <div className="min-w-0">
                                    <p className="font-bold text-orange-950 text-base truncate">
                                        {logro.titulo_amigable}
                                    </p>
                                    <p className="text-sm text-orange-900/60 leading-snug">
                                        {logro.frase_resumen}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Vocabulary preview */}
            {newWords > 0 && (
                <div className="w-full max-w-sm space-y-3">
                    <h2 className="text-lg font-bold text-orange-950 px-1">Vocabulario practicado</h2>
                    <div className="flex flex-wrap gap-2 px-1">
                        {reflection.vocabularioNuevo.slice(0, 12).map((word) => (
                            <span
                                key={word}
                                className="px-3 py-1.5 bg-white/60 backdrop-blur-sm border border-orange-100 rounded-full text-sm font-medium text-orange-900"
                            >
                                {word}
                            </span>
                        ))}
                        {newWords > 12 && (
                            <span className="px-3 py-1.5 text-sm font-medium text-orange-900/50">
                                +{newWords - 12} más
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Encouragement & CTA */}
            <div className="flex-1" />
            <div className="w-full max-w-sm space-y-3 pb-4">
                <button
                    onClick={onContinue}
                    className="w-full px-8 py-4 bg-aurora-500 text-white rounded-2xl font-bold text-lg hover:bg-aurora-600 active:scale-95 transition-all shadow-md"
                >
                    Seguir practicando
                </button>
                <p className="text-center text-sm text-orange-900/45 font-medium">
                    {streak >= 3
                        ? `🔥 ¡${streak} días seguidos! Increíble constancia.`
                        : streak === 2
                            ? '🔥 ¡2 días seguidos! Vas por buen camino.'
                            : '💪 Cada sesión cuenta. ¡Nos vemos mañana!'}
                </p>
            </div>
        </div>
    );
}

function StatCard({
    emoji,
    label,
    value,
    subtitle,
}: {
    emoji: string;
    label: string;
    value: string;
    subtitle: string;
}) {
    return (
        <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center gap-1.5">
            <span className="text-2xl leading-none" role="img" aria-hidden="true">{emoji}</span>
            <p className="text-xs font-semibold text-orange-900/50 uppercase tracking-wider">{label}</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-orange-950">{value}</p>
            <p className="text-xs sm:text-sm text-orange-900/55 font-medium">{subtitle}</p>
        </div>
    );
}
