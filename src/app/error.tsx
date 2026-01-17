'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-orange-50 p-4">
            <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    ¡Oops! Algo salió mal
                </h2>
                <p className="text-slate-600 mb-6">{error.message}</p>
                <button
                    onClick={reset}
                    className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
                >
                    Reintentar
                </button>
            </div>
        </div>
    );
}
