"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { type Track, type Card } from '../lib/data';

interface VisualTableProps {
    track: Track;
}

export default function VisualTable({ track }: VisualTableProps) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speakingId, setSpeakingId] = useState<string | null>(null);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [showVoiceModal, setShowVoiceModal] = useState(false);

    // Group cards by category
    const groupedCards = track.deck.reduce((acc, card) => {
        const category = card.category || 'General';
        if (!acc[category]) acc[category] = [];
        acc[category].push(card);
        return acc;
    }, {} as Record<string, Card[]>);

    const categories = Object.keys(groupedCards);

    const loadVoices = useCallback(() => {
        const allVoices = window.speechSynthesis.getVoices();
        if (allVoices.length > 0) {
            const sorted = [...allVoices].sort((a, b) => {
                const aFr = a.lang.includes('fr');
                const bFr = b.lang.includes('fr');
                if (aFr && !bFr) return -1;
                if (!aFr && bFr) return 1;
                return 0;
            });
            setVoices(sorted);

            const bestVoice = sorted.find(v =>
                (v.lang.includes('fr') && v.name.includes('Thomas')) ||
                (v.lang.includes('fr') && v.name.includes('Siri')) ||
                (v.lang.includes('fr') && v.name.includes('Premium')) ||
                v.lang.includes('fr-FR')
            );

            if (bestVoice && !selectedVoice) setSelectedVoice(bestVoice);
            else if (!selectedVoice && sorted[0]) setSelectedVoice(sorted[0]);
        }
    }, [selectedVoice]);

    useEffect(() => {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
        const interval = setInterval(loadVoices, 1000);
        return () => clearInterval(interval);
    }, [loadVoices]);

    const speakFrench = (text: string, cardId: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                utterance.lang = selectedVoice.lang;
            } else {
                utterance.lang = 'fr-FR';
            }
            utterance.rate = 0.85;

            utterance.onstart = () => {
                setIsSpeaking(true);
                setSpeakingId(cardId);
            };
            utterance.onend = () => {
                setIsSpeaking(false);
                setSpeakingId(null);
            };
            utterance.onerror = () => {
                setIsSpeaking(false);
                setSpeakingId(null);
            };

            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="flex flex-col h-full bg-transparent text-brand-text overflow-hidden">
            {/* === STICKY HEADER === */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-20 px-4 pt-4 pb-2"
            >
                <div className="glass-card-elevated rounded-2xl px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Back Button */}
                        <Link href="/">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="p-2 -ml-2 text-brand-muted hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </motion.button>
                        </Link>

                        {/* Track Title */}
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{track.deck[0]?.emoji || '📚'}</span>
                            <div>
                                <h1 className="font-display font-bold text-lg text-white">{track.title}</h1>
                                <p className="text-xs text-sky-400">{track.titleFr}</p>
                            </div>
                        </div>

                        {/* Voice Selector */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowVoiceModal(true)}
                            className="flex items-center gap-1.5 glass-card rounded-xl px-3 py-2 text-xs"
                        >
                            <span>🎙️</span>
                        </motion.button>
                    </div>

                    {/* Card Count */}
                    <div className="mt-2 flex items-center justify-center gap-2">
                        <span className="text-xs text-brand-muted bg-white/5 px-3 py-1 rounded-full">
                            {track.deck.length} términos
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* === SCROLLABLE LIST === */}
            <div className="flex-1 overflow-y-auto px-4 pb-safe">
                <motion.div
                    className="space-y-6 py-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.03 }
                        }
                    }}
                >
                    {categories.map((category, catIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: catIndex * 0.1 }}
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
                                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
                                    {category}
                                </span>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
                            </div>

                            {/* Cards in Category */}
                            <div className="space-y-2">
                                {groupedCards[category].map((card, index) => (
                                    <motion.button
                                        key={card.id}
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                        whileHover={{ scale: 1.02, x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => speakFrench(card.french, card.id)}
                                        className={`w-full glass-card rounded-xl px-4 py-3 flex items-center gap-4 transition-all duration-300 group ${speakingId === card.id
                                                ? 'border-sky-400/50 glow-cyan bg-sky-500/10'
                                                : 'hover:bg-white/5'
                                            }`}
                                    >
                                        {/* Emoji */}
                                        <span className="text-2xl flex-shrink-0">{card.emoji}</span>

                                        {/* French Text */}
                                        <div className="flex-1 text-left">
                                            <p className="font-display font-bold text-white text-lg group-hover:text-sky-300 transition-colors">
                                                {card.french}
                                            </p>
                                        </div>

                                        {/* Spanish Translation */}
                                        <p className="text-brand-muted text-sm flex-shrink-0">
                                            {card.meaning}
                                        </p>

                                        {/* Speaker Icon */}
                                        <Volume2 className={`w-4 h-4 flex-shrink-0 transition-all ${speakingId === card.id
                                                ? 'text-sky-400 animate-pulse'
                                                : 'text-brand-muted/50 group-hover:text-sky-400'
                                            }`} />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* === VOICE SELECTOR MODAL === */}
            {showVoiceModal && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowVoiceModal(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-50 glass-card-elevated rounded-t-[2rem] max-h-[70vh] overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white">Seleccionar Voz</h3>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={loadVoices}
                                    className="glass-pill rounded-xl px-4 py-2 text-sm flex items-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Recargar</span>
                                </motion.button>
                            </div>

                            <div className="overflow-y-auto max-h-[50vh] space-y-2 pb-safe">
                                {voices.length === 0 && (
                                    <p className="text-center text-brand-muted py-8">
                                        Cargando voces...
                                    </p>
                                )}
                                {voices.map((v, i) => (
                                    <motion.button
                                        key={`${v.name}-${v.lang}-${i}`}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setSelectedVoice(v);
                                            setShowVoiceModal(false);
                                        }}
                                        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${selectedVoice?.name === v.name
                                            ? 'glass-card-elevated border-sky-400/50 glow-cyan'
                                            : 'glass-card hover:bg-white/10'
                                            }`}
                                    >
                                        <span className="text-xl">
                                            {v.lang.includes('fr') ? '🇫🇷' : '🌍'}
                                        </span>
                                        <div className="flex-1 text-left">
                                            <p className="font-medium text-white truncate">
                                                {v.name}
                                            </p>
                                            <p className="text-xs text-brand-muted">
                                                {v.lang}
                                            </p>
                                        </div>
                                        {selectedVoice?.name === v.name && (
                                            <span className="text-sky-400">✓</span>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
}
