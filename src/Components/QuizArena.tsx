"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Home, Trophy, Flame, X, Check } from 'lucide-react';
import Link from 'next/link';
import { getAllCards, type Card } from '../lib/data';

// Shuffle helper (Fisher-Yates)
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = newArr[i]!; newArr[i] = newArr[j]!; newArr[j] = temp;
    }
    return newArr;
};

interface Question {
    target: Card;
    options: Card[];
    correctIndex: number;
}

export default function QuizArena() {
    const [allCards, setAllCards] = useState<Card[]>([]);
    const [question, setQuestion] = useState<Question | null>(null);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [totalAnswered, setTotalAnswered] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);

    // Voice state
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Audio refs for sound effects
    const correctSoundRef = useRef<HTMLAudioElement | null>(null);
    const wrongSoundRef = useRef<HTMLAudioElement | null>(null);

    // Load all cards on mount
    useEffect(() => {
        const cards = getAllCards();
        setAllCards(cards);
    }, []);

    // Load voices
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

    // Generate a question
    const generateQuestion = useCallback(() => {
        if (allCards.length < 3) return;

        const shuffled = shuffleArray(allCards);
        const target = shuffled[0];
        const distractors = shuffled.slice(1, 3);

        // Combine and shuffle options
        const options = shuffleArray([target, ...distractors]);
        const correctIndex = options.findIndex(c => c.id === target.id);

        setQuestion({ target, options, correctIndex });
        setSelectedIndex(null);
        setShowResult(false);
    }, [allCards]);

    // Generate first question when cards are loaded
    useEffect(() => {
        if (allCards.length > 0 && !question) {
            generateQuestion();
        }
    }, [allCards, question, generateQuestion]);

    // Speak French text
    const speakFrench = useCallback((text: string) => {
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

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    }, [selectedVoice]);

    // Auto-speak when new question appears
    useEffect(() => {
        if (question && !showResult) {
            const timer = setTimeout(() => {
                speakFrench(question.target.french);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [question, showResult, speakFrench]);

    // Handle answer selection
    const handleAnswer = (index: number) => {
        if (showResult) return;

        setSelectedIndex(index);
        setShowResult(true);
        setTotalAnswered(prev => prev + 1);

        const correct = index === question?.correctIndex;
        setIsCorrect(correct);

        if (correct) {
            setStreak(prev => {
                const newStreak = prev + 1;
                if (newStreak > bestStreak) setBestStreak(newStreak);
                return newStreak;
            });
            setCorrectCount(prev => prev + 1);
        } else {
            setStreak(0);
        }

        // Auto-advance after delay
        setTimeout(() => {
            generateQuestion();
        }, correct ? 1500 : 2500);
    };

    if (!question) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-brand-muted">Preparando el quiz...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-4 pb-safe bg-transparent text-brand-text overflow-hidden">

            {/* === HEADER === */}
            <div className="flex items-center justify-between mb-4">
                {/* Back to Home */}
                <Link href="/">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="glass-card rounded-xl p-3"
                    >
                        <Home className="w-5 h-5" />
                    </motion.button>
                </Link>

                {/* Streak Counter */}
                <motion.div
                    className="glass-card-elevated rounded-2xl px-5 py-3 flex items-center gap-3"
                    animate={streak > 0 ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    <Flame className={`w-6 h-6 ${streak > 0 ? 'text-orange-400' : 'text-brand-muted'}`} />
                    <div>
                        <p className="text-2xl font-bold text-white">{streak}</p>
                        <p className="text-[10px] text-brand-muted uppercase tracking-wider">Racha</p>
                    </div>
                </motion.div>

                {/* Score */}
                <div className="glass-card rounded-xl px-4 py-3 text-center">
                    <p className="text-lg font-bold text-amber-400">{correctCount}/{totalAnswered}</p>
                    <p className="text-[9px] text-brand-muted uppercase">Aciertos</p>
                </div>
            </div>

            {/* === QUESTION CARD === */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={question.target.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="w-full max-w-md"
                    >
                        {/* Question Card */}
                        <div className="glass-card-elevated rounded-[2rem] p-8 mb-6 relative overflow-hidden">
                            {/* Emoji Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-[8rem] opacity-[0.08] blur-[1px]">
                                    {question.target.emoji}
                                </span>
                            </div>

                            <div className="relative z-10 text-center">
                                {/* Mode Badge */}
                                <div className="inline-flex items-center gap-2 glass-pill rounded-full px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-amber-400">
                                    <Trophy className="w-4 h-4" />
                                    Le Mixeur
                                </div>

                                {/* French Text */}
                                <h2 className="font-display text-4xl font-semibold text-white mb-6">
                                    {question.target.french}
                                </h2>

                                {/* Speaker Button */}
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => speakFrench(question.target.french)}
                                    disabled={isSpeaking}
                                    className={`glass-pill rounded-full px-6 py-3 flex items-center gap-3 mx-auto transition-all ${isSpeaking ? 'glow-cyan-intense' : 'hover:bg-white/10'
                                        }`}
                                >
                                    <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse text-cyan-400' : ''}`} />
                                    <span className="text-sm font-medium">
                                        {isSpeaking ? 'Escuchando...' : 'Repetir'}
                                    </span>
                                </motion.button>
                            </div>
                        </div>

                        {/* === ANSWER OPTIONS === */}
                        <div className="space-y-3">
                            {question.options.map((option, idx) => {
                                const isSelected = selectedIndex === idx;
                                const isCorrectOption = idx === question.correctIndex;

                                let buttonStyle = 'glass-card border-white/10 hover:bg-white/10';

                                if (showResult) {
                                    if (isCorrectOption) {
                                        buttonStyle = 'bg-green-500/20 border-green-500/50 glow-success';
                                    } else if (isSelected && !isCorrectOption) {
                                        buttonStyle = 'bg-red-500/20 border-red-500/50 glow-error';
                                    } else {
                                        buttonStyle = 'glass-card border-white/5 opacity-50';
                                    }
                                }

                                return (
                                    <motion.button
                                        key={option.id}
                                        onClick={() => handleAnswer(idx)}
                                        disabled={showResult}
                                        whileTap={!showResult ? { scale: 0.98 } : {}}
                                        animate={showResult && isSelected && !isCorrectOption ? { x: [-5, 5, -5, 5, 0] } : {}}
                                        transition={{ duration: 0.3 }}
                                        className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 ${buttonStyle}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl">{option.emoji}</span>
                                            <span className="flex-1 text-lg font-medium text-white">
                                                {option.meaning}
                                            </span>
                                            {showResult && isCorrectOption && (
                                                <Check className="w-6 h-6 text-green-400" />
                                            )}
                                            {showResult && isSelected && !isCorrectOption && (
                                                <X className="w-6 h-6 text-red-400" />
                                            )}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* === RESULT FEEDBACK === */}
            <AnimatePresence>
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="text-center py-4"
                    >
                        {isCorrect ? (
                            <div className="flex items-center justify-center gap-3 text-green-400">
                                <Check className="w-6 h-6" />
                                <span className="text-xl font-bold">¡Correcto!</span>
                                {streak > 1 && <span className="text-orange-400">🔥 x{streak}</span>}
                            </div>
                        ) : (
                            <div className="text-red-400">
                                <p className="text-xl font-bold mb-1">Incorrecto</p>
                                <p className="text-sm text-brand-muted">
                                    Era: <span className="text-white">{question.target.meaning}</span>
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Best Streak Badge */}
            {bestStreak > 0 && (
                <div className="text-center pb-2">
                    <span className="text-xs text-brand-muted">
                        Mejor racha: <span className="text-amber-400 font-bold">{bestStreak}</span>
                    </span>
                </div>
            )}
        </div>
    );
}
