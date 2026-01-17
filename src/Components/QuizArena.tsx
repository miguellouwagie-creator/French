"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Home, Trophy, Flame, X, Check } from 'lucide-react';
import Link from 'next/link';
import { getAllCards, type Card } from '../lib/data';

const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = newArr[i]!;
        newArr[i] = newArr[j]!;
        newArr[j] = temp;
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
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        setAllCards(getAllCards());
    }, []);

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

    const generateQuestion = useCallback(() => {
        if (allCards.length < 3) return;
        const shuffled = shuffleArray(allCards);
        const target = shuffled[0]!;
        const distractors = shuffled.slice(1, 3);
        const options = shuffleArray([target, ...distractors]);
        const correctIndex = options.findIndex(c => c?.id === target.id);
        setQuestion({ target, options, correctIndex });
        setSelectedIndex(null);
        setShowResult(false);
    }, [allCards]);

    useEffect(() => {
        if (allCards.length > 0 && !question) generateQuestion();
    }, [allCards, question, generateQuestion]);

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

    // FIX: useEffect with consistent return paths
    useEffect(() => {
        if (question && !showResult) {
            const timer = setTimeout(() => {
                speakFrench(question.target.french);
            }, 500);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [question, showResult, speakFrench]);

    const handleAnswer = (index: number) => {
        if (showResult || !question) return;
        setSelectedIndex(index);
        setShowResult(true);
        setTotalAnswered(prev => prev + 1);
        const correct = index === question.correctIndex;
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
        setTimeout(() => generateQuestion(), correct ? 1500 : 2500);
    };

    if (!question) return null;

    return (
        <div className="flex flex-col h-full p-4 pb-safe bg-transparent text-brand-text overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <Link href="/"><motion.button whileTap={{ scale: 0.9 }} className="glass-card rounded-xl p-3"><Home className="w-5 h-5" /></motion.button></Link>
                <motion.div className="glass-card-elevated rounded-2xl px-5 py-3 flex items-center gap-3" animate={streak > 0 ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 0.3 }}>
                    <Flame className={w-6 h-6 \} />
                    <div><p className="text-2xl font-bold text-white">{streak}</p></div>
                </motion.div>
                <div className="glass-card rounded-xl px-4 py-3 text-center">
                    <p className="text-lg font-bold text-amber-400">{correctCount}/{totalAnswered}</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div key={question.target.id} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -20 }} className="w-full max-w-md">
                        <div className="glass-card-elevated rounded-[2rem] p-8 mb-6 relative overflow-hidden text-center">
                            <h2 className="font-display text-4xl font-semibold text-white mb-6">{question.target.french}</h2>
                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => speakFrench(question.target.french)} disabled={isSpeaking} className="glass-pill rounded-full px-6 py-3 flex items-center gap-3 mx-auto">
                                <Volume2 className={w-5 h-5 \} />
                            </motion.button>
                        </div>
                        <div className="space-y-3">
                            {question.options.map((option, idx) => {
                                const isSelected = selectedIndex === idx;
                                const isCorrectOption = idx === question.correctIndex;
                                let style = 'glass-card border-white/10';
                                if (showResult) {
                                    if (isCorrectOption) style = 'bg-green-500/20 border-green-500/50';
                                    else if (isSelected) style = 'bg-red-500/20 border-red-500/50';
                                }
                                return (
                                    <button key={option.id} onClick={() => handleAnswer(idx)} disabled={showResult} className={w-full p-5 rounded-2xl border text-left transition-all \}>
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl">{option.emoji}</span>
                                            <span className="flex-1 text-lg font-medium text-white">{option.meaning}</span>
                                            {showResult && isCorrectOption && <Check className="w-6 h-6 text-green-400" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
