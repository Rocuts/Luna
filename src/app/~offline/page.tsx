'use client';

export default function OfflinePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] p-6 text-center">
            <div className="glass-panel p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] w-full max-w-sm flex flex-col items-center gap-6 sm:gap-8 animate-float">
                <span className="text-7xl sm:text-8xl leading-none select-none" role="img" aria-label="Sin conexión">
                    📡
                </span>
                <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-950 tracking-tight">
                        Sin conexión
                    </h1>
                    <p className="text-base sm:text-lg text-orange-900/70 leading-relaxed">
                        No te preocupes, tu progreso está guardado.
                        Cuando vuelvas a tener señal, podrás seguir practicando con Luna.
                    </p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-aurora-500 text-white rounded-2xl font-bold text-base sm:text-lg hover:bg-aurora-600 active:scale-95 transition-all shadow-md"
                >
                    Reintentar
                </button>
            </div>
        </div>
    );
}
