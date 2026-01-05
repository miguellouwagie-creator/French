"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA: MAZO DE SUPERVIVENCIA A1 (30 CARTAS) ---
const SURVIVAL_DECK = [
    // SALUDOS & BÁSICOS
    { id: '1', emoji: '👋', french: 'Bonjour, ça va?', meaning: 'Hola, ¿qué tal?', type: 'phrase' },
    { id: '2', emoji: '🌙', french: 'Bonne soirée', meaning: 'Que tengas buena noche', type: 'phrase' },
    { id: '3', emoji: '🙏', french: 'Merci beaucoup', meaning: 'Muchas gracias', type: 'phrase' },
    { id: '4', emoji: '🤷', french: 'Je ne comprends pas', meaning: 'No entiendo', type: 'phrase' },
    { id: '5', emoji: '🐌', french: 'Plus lentement, s\'il vous plaît', meaning: 'Más despacio, por favor', type: 'phrase' },

    // COMIDA & BEBIDA
    { id: '6', emoji: '☕', french: 'Un café, s\'il vous plaît', meaning: 'Un café, por favor', type: 'phrase' },
    { id: '7', emoji: '🥐', french: 'Je voudrais un croissant', meaning: 'Quisiera un croissant', type: 'phrase' },
    { id: '8', emoji: '💳', french: 'L\'addition, s\'il vous plaît', meaning: 'La cuenta, por favor', type: 'phrase' },
    { id: '9', emoji: '💧', french: 'Une carafe d\'eau', meaning: 'Una jarra de agua (gratis)', type: 'phrase' },
    { id: '10', emoji: '🍷', french: 'Un verre de vin rouge', meaning: 'Una copa de vino tinto', type: 'phrase' },

    // DIRECCIONES
    { id: '11', emoji: '📍', french: 'Où sont les toilettes ?', meaning: '¿Dónde está el baño?', type: 'phrase' },
    { id: '12', emoji: '🚇', french: 'Je cherche le métro', meaning: 'Busco el metro', type: 'phrase' },
    { id: '13', emoji: '➡️', french: 'C\'est à droite', meaning: 'Está a la derecha', type: 'phrase' },
    { id: '14', emoji: '⬅️', french: 'C\'est à gauche', meaning: 'Está a la izquierda', type: 'phrase' },

    // VOCABULARIO DE IMPACTO
    { id: '15', emoji: '🏠', french: 'La maison', meaning: 'La casa', type: 'vocab' },
    { id: '16', emoji: '🚗', french: 'La voiture', meaning: 'El coche', type: 'vocab' },
    { id: '17', emoji: '🧀', french: 'Le fromage', meaning: 'El queso', type: 'vocab' },
    { id: '18', emoji: '🥖', french: 'Le pain', meaning: 'El pan', type: 'vocab' },
    { id: '19', emoji: '🕰️', french: 'Quelle heure est-il ?', meaning: '¿Qué hora es?', type: 'phrase' },
    { id: '20', emoji: '💶', french: 'C\'est combien ?', meaning: '¿Cuánto cuesta?', type: 'phrase' },

    // EMERGENCIAS / SOCIAL
    { id: '21', emoji: '🚑', french: 'Aidez-moi !', meaning: '¡Ayúdenme!', type: 'phrase' },
    { id: '22', emoji: '💊', french: 'J\'ai besoin d\'un médecin', meaning: 'Necesito un médico', type: 'phrase' },
    { id: '23', emoji: '🇪🇸', french: 'Parlez-vous espagnol ?', meaning: '¿Habla español?', type: 'phrase' },
    { id: '24', emoji: '🍺', french: 'Santé !', meaning: '¡Salud! (Brindis)', type: 'phrase' },
    { id: '25', emoji: '👋', french: 'Au revoir', meaning: 'Adiós', type: 'phrase' },
    { id: '26', emoji: '🚆', french: 'Le train part quand ?', meaning: '¿Cuándo sale el tren?', type: 'phrase' },
    { id: '27', emoji: '🏨', french: 'J\'ai une réservation', meaning: 'Tengo una reserva', type: 'phrase' },
    { id: '28', emoji: '🗝️', french: 'La clé', meaning: 'La llave', type: 'vocab' },
    { id: '29', emoji: '🌧️', french: 'Il pleut', meaning: 'Está lloviendo', type: 'vocab' },
    { id: '30', emoji: '❤️', french: 'J\'adore ça', meaning: 'Me encanta esto', type: 'phrase' }
];

// Algoritmo de mezcla aleatoria (Fisher-Yates)
const shuffleArray = (array: any[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

export default function PhoneticDojo() {
    const [deck, setDeck] = useState(SURVIVAL_DECK);
    const [index, setIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [showVoiceModal, setShowVoiceModal] = useState(false);
    const [cardKey, setCardKey] = useState(0);

    // Mezclar cartas al inicio
    useEffect(() => {
        setDeck(shuffleArray(SURVIVAL_DECK));
    }, []);

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
            utterance.rate = 0.85;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    };

    const nextCard = () => {
        setShowTranslation(false);
        setCardKey(prev => prev + 1);
        // Avanzar infinito circular
        setIndex((prev) => (prev + 1) % deck.length);
    };

    const handleCardTap = () => {
        if (!showTranslation) {
            setShowTranslation(true);
        }
    };

    return (
        <div className="flex flex-col h-full items-center justify-between p-4 pb-safe bg-transparent text-brand-text overflow-hidden">

            {/* === HEADER: Progress + Voice Control === */}
            <div className="w-full max-w-md">
                <div className="glass-pill rounded-2xl px-4 py-3 flex items-center justify-between">
                    {/* Progress Badge */}
                    <div className="flex items-center gap-3">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                            Survival A1
                        </div>
                        <div className="glass-card rounded-full px-3 py-1 text-xs font-bold text-cyan-400">
                            {index + 1} / {deck.length}
                        </div>
                    </div>

                    {/* Voice Selector Trigger */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowVoiceModal(true)}
                        className="flex items-center gap-2 glass-card rounded-xl px-3 py-2 text-xs"
                    >
                        <span>🎙️</span>
                        <span className="text-brand-muted max-w-[80px] truncate">
                            {selectedVoice?.name.slice(0, 12) || 'Voz...'}
                        </span>
                    </motion.button>
                </div>
            </div>

            {/* === THE CARD === */}
            <div className="flex-1 flex items-center justify-center w-full max-w-md py-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={cardKey}
                        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -100 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        onClick={handleCardTap}
                        className="relative w-full aspect-[3/4] cursor-pointer"
                    >
                        {/* Card Container */}
                        <div className="glass-card-elevated rounded-[2rem] w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">

                            {/* Emoji Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-[12rem] opacity-[0.07] blur-[1px] select-none">
                                    {card.emoji}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">

                                {/* Type Badge */}
                                <div className="glass-pill rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                                    {card.type === 'phrase' ? 'Frase' : 'Vocabulario'}
                                </div>

                                {/* French Phrase - HUGE Serif */}
                                <h2 className="font-display text-3xl md:text-4xl font-semibold text-center leading-tight text-white px-4">
                                    {card.french}
                                </h2>

                                {/* Speaker Button */}
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        speakFrench(card.french);
                                    }}
                                    disabled={isSpeaking}
                                    className={`glass-pill rounded-full px-6 py-3 flex items-center gap-3 transition-all duration-300 ${isSpeaking
                                            ? 'glow-cyan-intense scale-105'
                                            : 'hover:bg-white/10'
                                        }`}
                                >
                                    <span className={`text-xl ${isSpeaking ? 'animate-pulse' : ''}`}>
                                        🔊
                                    </span>
                                    <span className="text-sm font-medium text-white">
                                        {isSpeaking ? 'Escuchando...' : 'Escuchar'}
                                    </span>
                                </motion.button>

                                {/* Translation (Revealed on Tap) */}
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
                                {!showTranslation && (
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

            {/* === FEEDBACK BUTTONS (Thumb Zone) === */}
            <div className="w-full max-w-md pb-4">
                <AnimatePresence mode="wait">
                    {!showTranslation ? (
                        <motion.div
                            key="hint"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center py-4"
                        >
                            <p className="text-sm text-brand-muted">
                                Escucha y repite antes de revelar 🎯
                            </p>
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
                                className="relative overflow-hidden rounded-2xl py-5 font-bold text-lg transition-all duration-200"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(248, 113, 113, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)',
                                    border: '1px solid rgba(248, 113, 113, 0.3)',
                                }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 text-red-400">
                                    <span>Difícil</span>
                                    <span className="text-xl">🧠</span>
                                </span>
                            </motion.button>

                            {/* Easy Button */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={nextCard}
                                className="relative overflow-hidden rounded-2xl py-5 font-bold text-lg glow-success transition-all duration-200"
                                style={{
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 text-slate-900">
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
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowVoiceModal(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 z-50 glass-card-elevated rounded-t-[2rem] max-h-[70vh] overflow-hidden"
                        >
                            <div className="p-6">
                                {/* Handle */}
                                <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-white">Seleccionar Voz</h3>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={loadVoices}
                                        className="glass-pill rounded-xl px-4 py-2 text-sm"
                                    >
                                        🔄 Recargar
                                    </motion.button>
                                </div>

                                {/* Voice List */}
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