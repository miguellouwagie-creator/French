"use client";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PhoneticDojo from '@/Components/PhoneticDojo';

function DojoContent() {
    const searchParams = useSearchParams();
    const trackId = searchParams.get('track') || 'survival';

    return <PhoneticDojo trackId={trackId} />;
}

export default function DojoPage() {
    return (
        <main className="h-screen-safe bg-transparent text-brand-text">
            <Suspense fallback={
                <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-brand-muted text-sm">Cargando...</p>
                    </div>
                </div>
            }>
                <DojoContent />
            </Suspense>
        </main>
    );
}