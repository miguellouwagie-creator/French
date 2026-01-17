"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, RefreshCw, AlertTriangle, Brain, Turtle } from 'lucide-react';
import Link from 'next/link';
import { getTrackById, getDefaultTrack, type Track, type Card } from '../lib/data';

const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = newArr[i]!;
        newArr[i] = newArr[j]!; // ✅ Non-null assertion
        newArr[j] = temp!; // ✅ Non-null assertion
    }
    return newArr;
};

interface PhoneticDojoProps {
    trackId?: string;
}

export default function PhoneticDojo({ trackId = 'survival' }: PhoneticDojoProps) {
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

            // ✅ FIXED: Add null checks
            if (bestVoice && !selectedVoice) {
                setSelectedVoice(bestVoice);
            } else if (!selectedVoice && sorted.length > 0) {
                const firstVoice = sorted[0];
                if (firstVoice) setSelectedVoice(firstVoice);
            }
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

    const trackColors: Record<string, string> = {
        cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        violet: 'bg-violet-100 text-violet-700 border-violet-200',
        amber: 'bg-amber-100 text-amber-700 border-amber-200',
        emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        rose: 'bg-rose-100 text-rose-700 border-rose-200',
        fuchsia: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
        sky: 'bg-sky-100 text-sky-700 border-sky-200',
        teal: 'bg-teal-100 text-teal-700 border-teal-200',
    };

    const isPhoneticLab = track.id === 'phonetic';

    if (!card) {
        return (
            <div className="h-full flex items-center justify-center bg-orange-50">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-500 text-sm">Cargando mazo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full items-center justify-between p-4 pb-safe bg-orange-50 text-slate-800 overflow-hidden">

            {/* === HEADER === */}
            <div className="w-full max-w-md">
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="p-2 -ml-2 text-slate-400 hover:text-slate-800 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </motion.button>
                        </Link>

                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${trackColors[track.color] || trackColors.cyan}`}>
                            {track.title}
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowVoiceModal(true)}
                            className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs shadow-sm hover:bg-slate-50"
                        >
                            <span>🎙️</span>
                        </motion.button>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full ${isPhoneticLab ? 'bg-gradient-to-r from-fuchsia-500 to-fuchsia-600' : 'bg-gradient-to-r from-orange-500 to-orange-400'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${((index + 1) / deck.length) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <span className="text-xs text-slate-400 font-semibold">
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
                        <div className="bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2rem] w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">

                            {/* Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-[8rem] opacity-[0.03] select-none grayscale">
                                    {card.emoji}
                                </span>
                            </div>

                            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 w-full force-dark-text">

                                {/* Type Badge */}
                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${isPhoneticLab ? 'bg-fuchsia-100 text-fuchsia-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {card.type === 'phrase' ? 'Frase' :
                                        card.type === 'vocab' ? 'Vocabulario' :
                                            card.type === 'verb' ? 'Verbo' :
                                                card.type === 'phonetic' ? 'Fonética' : 'Conector'}
                                </div>

                                {/* French Phrase - ASEGURADO COLOR SLATE-900 (Negro) */}
                                <h2
                                    className="font-display text-4xl md:text-5xl font-semibold text-center leading-tight px-2 drop-shadow-sm force-dark-text"
                                    style={{ color: '#0f172a' }}
                                >
                                    {card.french}
                                </h2>

                                {/* Phonetic Guide */}
                                {card.phoneticGuide && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="w-full max-w-xs"
                                    >
                                        <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-xl p-4">
                                            <p className="text-center font-mono text-2xl font-bold text-fuchsia-700 mb-2">
                                                [ {card.phoneticGuide} ]
                                            </p>

                                            {card.trap && (
                                                <div className="flex items-start gap-2 mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                                                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs text-amber-800">
                                                        {card.trap}
                                                    </p>
                                                </div>
                                            )}

                                            {card.mnemonic && (
                                                <div className="flex items-start gap-2 mt-2 p-2 bg-cyan-50 border border-cyan-200 rounded-lg">
                                                    <Brain className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs text-cyan-800">
                                                        {card.mnemonic}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Audio Buttons */}
                                <div className="flex items-center gap-3">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            speakFrench(card.french, 0.9);
                                        }}
                                        disabled={isSpeaking}
                                        className={`rounded-full px-6 py-3 flex items-center gap-3 transition-all duration-300 shadow-lg ${isSpeaking && !isSlowMode
                                            ? 'bg-orange-600 text-white shadow-orange-500/30 scale-105'
                                            : 'bg-slate-900 text-white shadow-slate-900/20 hover:bg-slate-800'
                                            }`}
                                    >
                                        <Volume2 className={`w-5 h-5 ${isSpeaking && !isSlowMode ? 'animate-pulse' : ''}`} />
                                        <span className="text-sm font-semibold">
                                            {isSpeaking && !isSlowMode ? 'Escuchando...' : 'Escuchar'}
                                        </span>
                                    </motion.button>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            speakFrench(card.french, 0.65);
                                        }}
                                        disabled={isSpeaking}
                                        className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 border-2 shadow-sm ${isSlowMode
                                            ? 'border-amber-500 bg-amber-100 text-amber-700'
                                            : 'border-slate-200 bg-white text-slate-500 hover:border-amber-400 hover:text-amber-500'
                                            }`}
                                        title="Reproducción lenta"
                                    >
                                        <Turtle className={`w-5 h-5 ${isSlowMode ? 'animate-pulse' : ''}`} />
                                    </motion.button>
                                </div>

                                {isSlowMode && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs text-amber-700 font-semibold bg-amber-100 px-3 py-1 rounded-full"
                                    >
                                        🐢 Modo lento activo
                                    </motion.p>
                                )}

                                <AnimatePresence>
                                    {showTranslation && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 mt-2 shadow-inner"
                                        >
                                            <p className="text-lg text-slate-700 text-center font-medium">
                                                {card.meaning}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {!showTranslation && !card.phoneticGuide && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-xs text-slate-400 mt-2 font-medium"
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
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowTranslation(true)}
                                className="w-full py-4 rounded-2xl border-2 border-slate-200 bg-white text-slate-500 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
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
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={nextCard}
                                className="relative overflow-hidden rounded-2xl py-5 font-bold text-lg border-2 border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all shadow-sm"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span>Difícil</span>
                                    <span className="text-xl">🧠</span>
                                </span>
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={nextCard}
                                className="relative overflow-hidden rounded-2xl py-5 font-bold text-lg bg-emerald-500 text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-600"
                            >
                                <span className="flex items-center justify-center gap-2">
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
                            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[70vh] overflow-hidden shadow-2xl"
                        >
                            <div className="p-6">
                                <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6" />

                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-slate-800">Seleccionar Voz</h3>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={loadVoices}
                                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm flex items-center gap-2 shadow-sm text-slate-600 hover:bg-slate-100"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        <span>Recargar</span>
                                    </motion.button>
                                </div>

                                <div className="overflow-y-auto max-h-[50vh] space-y-2 pb-safe">
                                    {voices.length === 0 && (
                                        <p className="text-center text-slate-400 py-8">
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
                                                ? 'bg-orange-50 border-2 border-orange-500 shadow-sm'
                                                : 'bg-white border border-slate-100 hover:bg-slate-50'
                                                }`}
                                        >
                                            <span className="text-xl">
                                                {v.lang.includes('fr') ? '🇫🇷' : '🌍'}
                                            </span>
                                            <div className="flex-1 text-left">
                                                <p className="font-semibold text-slate-800 truncate">
                                                    {v.name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {v.lang}
                                                </p>
                                            </div>
                                            {selectedVoice?.name === v.name && (
                                                <span className="text-orange-600 font-bold">✓</span>
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
