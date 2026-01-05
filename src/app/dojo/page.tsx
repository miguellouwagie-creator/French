"use client";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PhoneticDojo from '@/Components/PhoneticDojo';
import VisualTable from '@/Components/VisualTable';
import SentenceAnatomy from '@/Components/SentenceAnatomy';
import { getTrackById, getDefaultTrack } from '@/lib/data';

function DojoContent() {
    const searchParams = useSearchParams();
    const trackId = searchParams.get('track') || 'survival';

    // Get the track
    const track = getTrackById(trackId) || getDefaultTrack();

    // Route based on track mode
    if (track.mode === 'table') {
        return <VisualTable track={track} />;
    }

    if (track.mode === 'anatomy') {
        return <SentenceAnatomy track={track} />;
    }

    // Default: flashcard mode
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
