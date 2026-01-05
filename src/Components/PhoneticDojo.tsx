"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, RefreshCw, AlertTriangle, Brain, Turtle } from 'lucide-react';
import Link from 'next/link';
import { getTrackById, getDefaultTrack, type Track, type Card } from '../lib/data';

// Algoritmo de mezcla aleatoria (Fisher-Yates)
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

interface PhoneticDojoProps {
    trackId?: string;
}

export default function PhoneticDojo({ trackId = 'survival' }: PhoneticDojoProps) {
    // Load the track
    const [track, setTrack] = useState<Track>(() => getTrackById(trackId) || getDefaultTrack());
    const [deck, setDeck] = useState<Card[]>([]);
    const [index, setIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [showVoiceModal, setShowVoiceModal] = useState(false);
    const [cardKey, setCardKey] = useState(0);
    const [isSlowMode, setIsSlowMode] = useState(false);

    // Load track and shuffle deck when trackId changes
    useEffect(() => {
        const loadedTrack = getTrackById(trackId) || getDefaultTrack();
        setTrack(loadedTrack);
        setDeck(shuffleArray(loadedTrack.deck));
        setIndex(0);
        setShowTranslation(false);
        setCardKey(prev => prev + 1);
    }, [trackId]);

    const card = deck[index];

    const loadVoices = useCallback(() => {
        const allVoices = window.speechSynthesis.getVoices();
        if (allVoices.length > 0) {
            // Ordenar: FR primero
            const sorted = [...allVoices].sort((a, b) => {
                const aFr = a.lang.includes('fr');
                const bFr = b.lang.includes('fr');
                if (aFr && !bFr) return -1;
                if (!aFr && bFr) return 1;
                return 0;
            });
            setVoices(sorted);

            // Auto-selección inteligente
            const bestVoice = sorted.find(v =>
                (v.lang.includes('fr') && v.name.includes('Thomas')) ||
                (v.lang.includes('fr') && v.name.includes('Siri')) ||
                (v.lang.includes('fr') && v.name.includes('Premium')) ||
                v.lang.includes('fr-FR')
            );

            if (bestVoice && !selectedVoice) setSelectedVoice(bestVoice);
            else if (!selectedVoice && sorted.length > 0) setSelectedVoice(sorted[0]);
        }
    }, [selectedVoice]);

    useEffect(() => {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
        const interval = setInterval(loadVoices, 1000);
        return () => clearInterval(interval);
    }, [loadVoices]);

    const speakFrench = (text: string, speed: number = 0.9) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                utterance.lang = selectedVoice.lang;
            } else {
                utterance.lang = 'fr-FR';
            }
            utterance.rate = speed;

            const isSlow = speed < 0.8;
            utterance.onstart = () => {
                setIsSpeaking(true);
                setIsSlowMode(isSlow);
            };
            utterance.onend = () => {
                setIsSpeaking(false);
                setIsSlowMode(false);
            };
            utterance.onerror = () => {
                setIsSpeaking(false);
                setIsSlowMode(false);
            };

            window.speechSynthesis.speak(utterance);
        }
    };

    const nextCard = () => {
        setShowTranslation(false);
        setCardKey(prev => prev + 1);
        setIndex((prev) => (prev + 1) % deck.length);
    };

    const handleCardTap = () => {
        if (!showTranslation) {
            setShowTranslation(true);
        }
    };

    // Color mapping for track badge
    const trackColors: Record<string, string> = {
        cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        violet: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
        amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
        fuchsia: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
    };

    // Check if this is the phonetic lab
    const isPhoneticLab = track.id === 'phonetic';

    if (!card) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-brand-muted text-sm">Cargando mazo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full items-center justify-between p-4 pb-safe bg-transparent text-brand-text overflow-hidden">

            {/* === HEADER === */}
            <div className="w-full max-w-md">
                <div className="glass-pill rounded-2xl px-4 py-3">
                    {/* Top Row: Back + Track Name + Voice */}
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
                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${trackColors[track.color] || trackColors.cyan}`}>
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
                                className={`h-full ${isPhoneticLab ? 'bg-gradient-to-r from-fuchsia-400 to-fuchsia-500' : 'bg-gradient-to-r from-cyan-400 to-cyan-500'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${((index + 1) / deck.length) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <span className="text-xs text-brand-muted font-medium">
                            {index + 1}/{deck.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* === THE CARD === */}
            <div className="flex-1 flex items-center justify-center w-full max-w-md py-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={cardKey}
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -50 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        onClick={handleCardTap}
                        className="relative w-full aspect-[3/4] cursor-pointer"
                    >
                        <div className={`glass-card-elevated rounded-[2rem] w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden ${isPhoneticLab ? 'border-fuchsia-500/30' : ''}`}>

                            {/* Emoji Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-[10rem] opacity-[0.06] blur-[2px] select-none">
                                    {card.emoji}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 w-full">

                                {/* Type Badge */}
                                <div className={`glass-pill rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${isPhoneticLab ? 'text-fuchsia-400' : 'text-cyan-400'}`}>
                                    {card.type === 'phrase' ? 'Frase' :
                                        card.type === 'vocab' ? 'Vocabulario' :
                                            card.type === 'verb' ? 'Verbo' :
                                                card.type === 'phonetic' ? 'Fonética' : 'Conector'}
                                </div>

                                {/* French Phrase - HUGE */}
                                <h2 className="font-display text-4xl md:text-5xl font-semibold text-center leading-tight text-white px-2">
                                    {card.french}
                                </h2>

                                {/* === PHONETIC GUIDE (Only for Phonetic Lab cards) === */}
                                {card.phoneticGuide && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="w-full max-w-xs"
                                    >
                                        <div className="bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl p-4">
                                            {/* Phonetic Guide */}
                                            <p className="text-center font-mono text-2xl font-bold text-fuchsia-300 mb-2">
                                                [ {card.phoneticGuide} ]
                                            </p>

                                            {/* Trap Warning */}
                                            {card.trap && (
                                                <div className="flex items-start gap-2 mt-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs text-amber-200/80">
                                                        {card.trap}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Mnemonic Tip */}
                                            {card.mnemonic && (
                                                <div className="flex items-start gap-2 mt-2 p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                                                    <Brain className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs text-cyan-200/80">
                                                        {card.mnemonic}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Audio Buttons */}
                                <div className="flex items-center gap-3">
                                    {/* Main Speaker Button */}
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            speakFrench(card.french, 0.9);
                                        }}
                                        disabled={isSpeaking}
                                        className={`glass-pill rounded-full px-6 py-3 flex items-center gap-3 transition-all duration-300 ${isSpeaking && !isSlowMode
                                            ? 'glow-cyan-intense scale-105'
                                            : 'hover:bg-white/10'
                                            }`}
                                    >
                                        <Volume2 className={`w-5 h-5 ${isSpeaking && !isSlowMode ? 'animate-pulse text-cyan-400' : 'text-white'}`} />
                                        <span className="text-sm font-medium text-white">
                                            {isSpeaking && !isSlowMode ? 'Escuchando...' : 'Escuchar'}
                                        </span>
                                    </motion.button>

                                    {/* Slow Motion Button (Turtle) */}
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            speakFrench(card.french, 0.65);
                                        }}
                                        disabled={isSpeaking}
                                        className={`glass-pill rounded-full p-3 flex items-center justify-center transition-all duration-300 border ${isSlowMode
                                            ? 'border-amber-400/50 bg-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                                            : 'border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-400/50'
                                            }`}
                                        title="Reproducción lenta"
                                    >
                                        <Turtle className={`w-5 h-5 transition-all ${isSlowMode
                                            ? 'text-amber-400 animate-pulse'
                                            : 'text-amber-400/70'}`}
                                        />
                                    </motion.button>
                                </div>

                                {/* Speed Hint */}
                                {isSlowMode && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs text-amber-400 font-medium"
                                    >
                                        🐢 Modo lento activo
                                    </motion.p>
                                )}

                                {/* Translation (Revealed on Tap) - Only if NOT phonetic lab or if phonetic lab and tapped */}
                                <AnimatePresence>
                                    {showTranslation && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.3 }}
                                            className="glass-card rounded-2xl px-6 py-4 mt-2"
                                        >
                                            <p className="text-lg text-brand-muted text-center font-medium">
                                                {card.meaning}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Tap Hint */}
                                {!showTranslation && !card.phoneticGuide && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-xs text-brand-muted/50 mt-2"
                                    >
                                        Toca para ver traducción
                                    </motion.p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* === FEEDBACK BUTTONS === */}
            <div className="w-full max-w-md pb-4">
                <AnimatePresence mode="wait">
                    {!showTranslation ? (
                        <motion.div
                            key="ghost"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {/* Ghost Show Translation Button */}
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowTranslation(true)}
                                className="w-full py-4 rounded-2xl border border-white/20 text-brand-muted font-medium hover:bg-white/5 transition-all"
                            >
                                {isPhoneticLab ? 'Mostrar Significado 🎯' : 'Mostrar Traducción 👁️'}
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="buttons"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {/* Difficult Button */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={nextCard}
                                className="relative overflow-hidden rounded-2xl py-5 font-bold text-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all"
                            >
                                <span className="flex items-center justify-center gap-2 text-rose-400">
                                    <span>Difícil</span>
                                    <span className="text-xl">🧠</span>
                                </span>
                            </motion.button>

                            {/* Easy Button */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={nextCard}
                                className="relative overflow-hidden rounded-2xl py-5 font-bold text-lg glow-success transition-all"
                                style={{
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                }}
                            >
                                <span className="flex items-center justify-center gap-2 text-slate-900">
                                    <span>Fácil</span>
                                    <span className="text-xl">🚀</span>
                                </span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
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
                                                ? 'glass-card-elevated border-cyan-400/50 glow-cyan'
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
                                                <span className="text-cyan-400">✓</span>
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