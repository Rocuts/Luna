'use client';

import React, { Component, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('[LangLA] Error boundary caught:', error, info.componentStack);
    }

    render() {
        if (!this.state.hasError) return this.props.children;

        return (
            <div className="flex flex-col items-center justify-center min-h-[100dvh] p-6">
                <div className="glass-panel p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] w-full max-w-sm flex flex-col items-center text-center space-y-6 sm:space-y-8 animate-float">
                    <span className="text-7xl sm:text-8xl leading-none select-none" role="img" aria-label="Preocupado">
                        😓
                    </span>
                    <div className="space-y-3">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-950 tracking-tight">
                            Algo no salió bien
                        </h1>
                        <p className="text-base sm:text-lg text-orange-900/70 leading-relaxed">
                            No te preocupes, tu progreso está seguro.
                            Vamos a intentarlo de nuevo.
                        </p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full sm:w-auto px-8 py-4 bg-aurora-500 text-white rounded-2xl font-bold text-lg hover:bg-aurora-600 active:scale-95 transition-all shadow-md"
                    >
                        Recargar la app
                    </button>
                </div>
            </div>
        );
    }
}
