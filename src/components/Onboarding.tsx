'use client';

import React, { useState } from 'react';
import { markOnboardingCompleted } from '../utils/memoryEngine';

interface OnboardingProps {
    onComplete: () => void;
}

const STEPS = [
    {
        emoji: '👋',
        title: 'Conoce a Luna',
        description: 'Luna es tu tutora de inglés. Paciente, cálida, y siempre lista para ayudarte a mejorar.',
    },
    {
        emoji: '🎙️',
        title: 'Solo tu voz',
        description: 'Toca el botón central, habla en inglés o español, y Luna te guiará. Sin teclados, sin complicaciones.',
    },
    {
        emoji: '📈',
        title: 'Tu progreso se guarda',
        description: 'Luna recuerda lo que practicas, tus logros y tu nivel. Cada sesión te acerca más a tu meta.',
    },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
    const [step, setStep] = useState(0);
    const isLast = step === STEPS.length - 1;
    const current = STEPS[step];

    const handleNext = () => {
        if (isLast) {
            markOnboardingCompleted();
            onComplete();
        } else {
            setStep((s) => s + 1);
        }
    };

    const handleSkip = () => {
        markOnboardingCompleted();
        onComplete();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] p-6 gap-8">
            {/* Dots */}
            <div className="flex gap-2.5">
                {STEPS.map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-500 ${
                            i === step
                                ? 'w-8 bg-aurora-500'
                                : i < step
                                    ? 'w-2 bg-aurora-300'
                                    : 'w-2 bg-orange-200'
                        }`}
                    />
                ))}
            </div>

            {/* Card */}
            <div className="glass-panel p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] w-full max-w-sm flex flex-col items-center text-center space-y-6 sm:space-y-8 animate-float">
                <span
                    className="text-7xl sm:text-8xl leading-none select-none"
                    role="img"
                    aria-hidden="true"
                >
                    {current.emoji}
                </span>
                <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-950 tracking-tight">
                        {current.title}
                    </h1>
                    <p className="text-base sm:text-lg text-orange-900/70 leading-relaxed">
                        {current.description}
                    </p>
                </div>

                <button
                    onClick={handleNext}
                    className="w-full px-8 py-4 bg-aurora-500 text-white rounded-2xl font-bold text-lg hover:bg-aurora-600 active:scale-95 transition-all shadow-md"
                >
                    {isLast ? 'Empezar' : 'Siguiente'}
                </button>
            </div>

            {/* Skip */}
            {!isLast && (
                <button
                    onClick={handleSkip}
                    className="text-sm font-medium text-orange-900/50 hover:text-orange-900 transition-colors px-4 py-2 min-h-[44px]"
                >
                    Saltar intro
                </button>
            )}
        </div>
    );
}
