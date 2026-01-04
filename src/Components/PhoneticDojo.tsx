"use client";
import { useState, useEffect, useCallback } from 'react';

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
        // Avanzar infinito circular
        setIndex((prev) => (prev + 1) % deck.length);
    };

    return (
        <div className="flex flex-col h-full items-center justify-between p-6 pb-safe bg-brand-bg text-brand-text overflow-y-auto">

            {/* HEADER: Selector de Voz + Contador */}
            <div className="w-full mb-4 space-y-2">
                <div className="flex justify-between items-center text-[10px] text-brand-muted uppercase tracking-widest">
                    <span>Survival A1</span>
                    <span>{index + 1} / {deck.length}</span>
                </div>

                <div className="flex gap-2">
                    <select
                        className="w-full bg-slate-800 text-xs text-white p-2 rounded-lg border border-slate-700 outline-none"
                        onChange={(e) => {
                            const voice = voices.find(v => v.name === e.target.value);
                            if (voice) setSelectedVoice(voice);
                        }}
                        value={selectedVoice?.name || ""}
                    >
                        {voices.length === 0 && <option>Cargando voces...</option>}
                        {voices.map((v, i) => (
                            <option key={`${v.name}-${v.lang}-${i}`} value={v.name}>
                                {v.lang.includes('fr') ? '🇫🇷' : '🌍'} {v.name.slice(0, 25)}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={loadVoices}
                        className="text-lg bg-brand-surface border border-slate-700 rounded-lg px-3"
                    >
                        🔄
                    </button>
                </div>
            </div>

            {/* TARJETA VISUAL */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full max-w-sm min-h-[50vh]">
                <div
                    className="text-8xl drop-shadow-2xl cursor-pointer active:scale-90 transition-transform duration-200 select-none"
                    onClick={() => speakFrench(card.french)}
                >
                    {card.emoji}
                </div>

                <div className="text-center space-y-4 w-full">
                    <h2 className="text-3xl font-serif font-bold text-brand-text leading-tight min-h-[4rem] flex items-center justify-center select-none">
                        {card.french}
                    </h2>

                    <button
                        onClick={() => speakFrench(card.french)}
                        disabled={isSpeaking}
                        className={`px-8 py-3 rounded-full border border-brand-primary/50 text-brand-primary font-bold text-sm flex items-center gap-3 mx-auto hover:bg-brand-primary/20 active:bg-brand-primary/40 transition-all ${isSpeaking ? 'opacity-50 scale-95' : ''}`}
                    >
                        <span className="text-lg">🔊</span>
                        <span>{isSpeaking ? 'Escuchando...' : 'Escuchar'}</span>
                    </button>
                </div>

                <div className={`transition-all duration-300 transform w-full ${showTranslation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 h-0 overflow-hidden'}`}>
                    <p className="text-brand-muted text-lg font-medium bg-brand-surface px-6 py-4 rounded-xl border border-slate-700 text-center shadow-lg">
                        {card.meaning}
                    </p>
                </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="w-full space-y-3 pb-4 pt-4">
                {!showTranslation ? (
                    <button
                        onClick={() => setShowTranslation(true)}
                        className="w-full bg-brand-surface border border-slate-600 text-brand-text font-bold py-4 rounded-2xl active:scale-95 transition-transform shadow-lg"
                    >
                        ¿Qué significa? 🤔
                    </button>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={nextCard}
                            className="bg-brand-surface text-brand-error border-2 border-brand-error/20 font-bold py-4 rounded-2xl active:scale-95"
                        >
                            Difícil 🧠
                        </button>
                        <button
                            onClick={nextCard}
                            className="bg-brand-success text-brand-bg font-bold py-4 rounded-2xl shadow-lg active:scale-95"
                        >
                            Fácil 🚀
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}