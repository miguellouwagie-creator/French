"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight, RefreshCw, BookOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { type Track, type Card } from '../lib/data';

interface Segment {
    text: string;
    meaning: string;
    grammarNote?: string;
}

interface SentenceAnatomyProps {
    track: Track;
}

export default function SentenceAnatomy({ track }: SentenceAnatomyProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [showVoiceModal, setShowVoiceModal] = useState(false);

    const currentCard = track.deck[currentIndex];
    const segments = currentCard?.segments || [];

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

    // Reset selected segment when changing cards
    useEffect(() => {
        setSelectedSegment(null);
    }, [currentIndex]);

    const speakFrench = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                utterance.lang = selectedVoice.lang;
            } else {
                utterance.lang = 'fr-FR';
            }
            utterance.rate = 0.8;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    };

    const handleSegmentClick = (segment: Segment) => {
        setSelectedSegment(segment);
        speakFrench(segment.text);
    };

    const goToNext = () => {
        if (currentIndex < track.deck.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const goToPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    if (!currentCard) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-brand-muted text-sm">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-transparent text-brand-text overflow-hidden p-4 pb-safe">
            {/* === HEADER === */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md mx-auto"
            >
                <div className="glass-pill rounded-2xl px-4 py-3">
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

                        {/* Track Badge */}
                        <div className="px-3 py-1.5 rounded-full text-xs font-bold border bg-teal-500/20 text-teal-400 border-teal-500/30">
                            {track.title}
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

                    {/* Progress Bar */}
                    <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-teal-400 to-teal-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentIndex + 1) / track.deck.length) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <span className="text-xs text-brand-muted font-medium">
                            {currentIndex + 1}/{track.deck.length}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* === MAIN CONTENT === */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto py-6 space-y-6">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full space-y-6"
                    >
                        {/* === FULL SENTENCE (Top) === */}
                        <motion.div
                            className="glass-card-elevated rounded-2xl p-6 text-center relative overflow-hidden"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                        >
                            {/* Emoji Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-8xl opacity-[0.04] blur-[1px] select-none">
                                    {currentCard.emoji}
                                </span>
                            </div>

                            <div className="relative z-10">
                                <p className="text-xs text-teal-400 uppercase tracking-widest mb-3 font-bold">
                                    Frase Completa
                                </p>
                                <h2 className="font-display text-2xl md:text-3xl font-semibold text-white leading-relaxed">
                                    {currentCard.french}
                                </h2>
                                <p className="text-brand-muted text-sm mt-3">
                                    {currentCard.meaning}
                                </p>

                                {/* Play Full Sentence */}
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => speakFrench(currentCard.french)}
                                    className={`mt-4 glass-pill rounded-full px-5 py-2 flex items-center gap-2 mx-auto transition-all ${isSpeaking ? 'glow-cyan' : ''
                                        }`}
                                >
                                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-teal-400' : 'text-white'}`} />
                                    <span className="text-sm text-white">Escuchar todo</span>
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* === SEGMENT CHIPS (Middle) === */}
                        <div className="space-y-3">
                            <p className="text-xs text-brand-muted text-center uppercase tracking-widest">
                                Toca un fragmento para analizarlo
                            </p>
                            <motion.div
                                className="flex flex-wrap gap-2 justify-center"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.05 }
                                    }
                                }}
                            >
                                {segments.map((segment, index) => (
                                    <motion.button
                                        key={index}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.8, y: 10 },
                                            visible: { opacity: 1, scale: 1, y: 0 }
                                        }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleSegmentClick(segment)}
                                        className={`px-4 py-2.5 rounded-xl font-display font-medium text-base transition-all duration-300 ${selectedSegment === segment
                                                ? 'bg-teal-500 text-slate-900 shadow-lg shadow-teal-500/30'
                                                : 'glass-card hover:bg-white/10 text-white border border-white/10 hover:border-teal-500/50'
                                            }`}
                                    >
                                        {segment.text}
                                    </motion.button>
                                ))}
                            </motion.div>
                        </div>

                        {/* === MEANING BOX (Bottom) === */}
                        <AnimatePresence mode="wait">
                            {selectedSegment ? (
                                <motion.div
                                    key="meaning"
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                                    className="glass-card-elevated rounded-2xl p-5 space-y-4 border border-teal-500/30"
                                >
                                    {/* Selected Text */}
                                    <div className="text-center">
                                        <span className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-400 px-4 py-2 rounded-full text-lg font-display font-bold">
                                            <Sparkles className="w-4 h-4" />
                                            {selectedSegment.text}
                                        </span>
                                    </div>

                                    {/* Translation */}
                                    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                                        <BookOpen className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-teal-400 uppercase tracking-wider mb-1">Traducción</p>
                                            <p className="text-white font-medium">{selectedSegment.meaning}</p>
                                        </div>
                                    </div>

                                    {/* Grammar Note */}
                                    {selectedSegment.grammarNote && (
                                        <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                            <span className="text-lg">📝</span>
                                            <div>
                                                <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">Gramática</p>
                                                <p className="text-amber-200/90 text-sm">{selectedSegment.grammarNote}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Replay Segment */}
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => speakFrench(selectedSegment.text)}
                                        className="w-full glass-pill rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                                    >
                                        <Volume2 className="w-4 h-4 text-teal-400" />
                                        <span className="text-sm text-white">Repetir fragmento</span>
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="glass-card rounded-2xl p-6 text-center border-dashed border border-white/10"
                                >
                                    <p className="text-brand-muted text-sm">
                                        👆 Selecciona un fragmento para ver su análisis
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* === NAVIGATION BUTTONS === */}
            <div className="w-full max-w-md mx-auto">
                <div className="flex gap-4">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={goToPrev}
                        disabled={currentIndex === 0}
                        className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${currentIndex === 0
                                ? 'glass-card text-brand-muted/50 cursor-not-allowed'
                                : 'glass-card hover:bg-white/10 text-white'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Anterior
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={goToNext}
                        disabled={currentIndex === track.deck.length - 1}
                        className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${currentIndex === track.deck.length - 1
                                ? 'glass-card text-brand-muted/50 cursor-not-allowed'
                                : 'bg-gradient-to-r from-teal-500 to-teal-600 text-slate-900 shadow-lg shadow-teal-500/30'
                            }`}
                    >
                        Siguiente
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>

            {/* === VOICE SELECTOR MODAL === */}
            <AnimatePresence>
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
                                                ? 'glass-card-elevated border-teal-400/50 glow-cyan'
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
                                                <span className="text-teal-400">✓</span>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
