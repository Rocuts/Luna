'use client';

import React, { useState, useEffect } from 'react';
import { X, Volume2 } from 'lucide-react';
import { loadLearnerProfile, type Logro } from '../utils/memoryEngine';

interface ProgressAlbumProps {
    onClose: () => void;
}

export default function ProgressAlbum({ onClose }: ProgressAlbumProps) {
    const [logros, setLogros] = useState<Logro[]>([]);
    const [speakingId, setSpeakingId] = useState<string | null>(null);

    useEffect(() => {
        const profile = loadLearnerProfile();
        setLogros(profile?.logros_desbloqueados ?? []);
    }, []);

    // Cancela cualquier síntesis de voz al cerrar el modal
    useEffect(() => {
        return () => {
            if (typeof window !== 'undefined') {
                window.speechSynthesis?.cancel();
            }
        };
    }, []);

    const handleSpeak = (logro: Logro) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;

        window.speechSynthesis.cancel();

        // Si ya estaba hablando esta tarjeta, simplemente parar
        if (speakingId === logro.id) {
            setSpeakingId(null);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(logro.frase_resumen);
        utterance.lang = 'es-ES';
        utterance.rate = 0.88;
        utterance.pitch = 1.05;
        utterance.onstart = () => setSpeakingId(logro.id);
        utterance.onend = () => setSpeakingId(null);
        utterance.onerror = () => setSpeakingId(null);
        window.speechSynthesis.speak(utterance);
    };

    // Cerrar con Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
            style={{ background: 'rgba(255, 251, 245, 0.97)', backdropFilter: 'blur(12px)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Álbum de progreso visual"
        >
            {/* ── Header fijo ─────────────────────────────────────────────── */}
            <div className="sticky top-0 z-10 px-4 sm:px-5 py-4 sm:py-5 flex items-start sm:items-center justify-between gap-3 border-b border-orange-100/80"
                style={{ background: 'rgba(255, 251, 245, 0.95)', backdropFilter: 'blur(8px)' }}>
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-950 tracking-tight leading-tight">
                        Mis Logros ⭐
                    </h1>
                    <p className="text-sm sm:text-base text-orange-900/55 font-medium mt-0.5">
                        {logros.length === 0
                            ? 'Completa una sesión para desbloquear logros'
                            : `${logros.length} logro${logros.length !== 1 ? 's' : ''} desbloqueado${logros.length !== 1 ? 's' : ''}`}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    aria-label="Cerrar álbum de logros"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-orange-100 hover:bg-orange-200 active:scale-90 transition-all flex items-center justify-center shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-400 flex-shrink-0"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-orange-800" strokeWidth={2.5} />
                </button>
            </div>

            {/* ── Contenido ───────────────────────────────────────────────── */}
            <div className="flex-1 px-4 py-6 sm:py-7 sm:px-8 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                {logros.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto">
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
        </div>
    );
}

// ─── Tarjeta de logro ─────────────────────────────────────────────────────────

function LogroCard({
    logro,
    isSpeaking,
    onSpeak,
}: {
    logro: Logro;
    isSpeaking: boolean;
    onSpeak: () => void;
}) {
    return (
        <article
            className="bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow p-5 sm:p-7 flex flex-col items-center text-center gap-3 sm:gap-4 border border-orange-50"
            aria-label={`Logro: ${logro.titulo_amigable}`}
        >
            {/* Emoji gigante */}
            <span
                className="text-6xl sm:text-7xl leading-none select-none"
                role="img"
                aria-hidden="true"
            >
                {logro.emoji}
            </span>

            {/* Título */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug">
                {logro.titulo_amigable}
            </h2>

            {/* Resumen */}
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                {logro.frase_resumen}
            </p>

            {/* Botón de altavoz */}
            <button
                onClick={onSpeak}
                aria-label={
                    isSpeaking
                        ? `Parar audio: ${logro.titulo_amigable}`
                        : `Escuchar en voz alta: ${logro.frase_resumen}`
                }
                className={`
                    mt-1 flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[44px] rounded-2xl font-semibold text-sm sm:text-base
                    transition-all duration-200 active:scale-95
                    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-400
                    ${isSpeaking
                        ? 'bg-aurora-500 text-white shadow-md'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                    }
                `}
            >
                <Volume2
                    className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isSpeaking ? 'animate-pulse' : ''}`}
                />
                <span>{isSpeaking ? 'Escuchando...' : 'Escuchar'}</span>
            </button>
        </article>
    );
}

// ─── Estado vacío ─────────────────────────────────────────────────────────────

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-14 sm:py-20 text-center max-w-sm mx-auto gap-5 sm:gap-6">
            <span className="text-7xl sm:text-8xl leading-none select-none" role="img" aria-label="Trofeo">
                🏆
            </span>
            <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
                    Aún no hay logros
                </h2>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    Cuando completes tu primera sesión con Luna, aquí aparecerán las habilidades que hayas practicado.
                </p>
            </div>
        </div>
    );
}
