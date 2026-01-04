"use client";
import { useState, useEffect, useCallback } from 'react';

const VOCAB_DECK = [
    { id: '1', emoji: '👋', french: 'Bonjour, ça va?', meaning: 'Hola, ¿qué tal?', type: 'phrase' },
    { id: '2', emoji: '☕', french: 'Un café, s\'il vous plaît.', meaning: 'Un café, por favor.', type: 'phrase' },
    { id: '3', emoji: '🐶', french: 'Le chien court.', meaning: 'El perro corre.', type: 'vocab' },
    { id: '4', emoji: '🥐', french: 'Je voudrais un croissant.', meaning: 'Quisiera un croissant.', type: 'phrase' }
];

export default function PhoneticDojo() {
    const [index, setIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // ESTADO PARA LAS VOCES
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

    const card = VOCAB_DECK[index];

    // FUNCIÓN DE CARGA MANUAL (El Rescate)
    const loadVoices = useCallback(() => {
        const allVoices = window.speechSynthesis.getVoices();
        console.log("Voces encontradas:", allVoices.length); // Debug en consola

        if (allVoices.length > 0) {
            setVoices(allVoices);

            // Intentar seleccionar francés
            const frenchVoice = allVoices.find(v =>
                v.name.includes('French') || v.lang.includes('fr')
            );

            if (frenchVoice) {
                setSelectedVoice(frenchVoice);
            } else {
                // Si hay voces pero ninguna francesa, seleccionar la primera
                if (!selectedVoice) setSelectedVoice(allVoices[0]);
            }
        }
    }, [selectedVoice]);

    // Intentar cargar al inicio
    useEffect(() => {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        // Re-intentar a los 500ms por si el navegador es lento
        const timer = setTimeout(loadVoices, 500);
        return () => clearTimeout(timer);
    }, [loadVoices]);

    const speakFrench = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            if (selectedVoice) utterance.voice = selectedVoice;

            utterance.lang = selectedVoice?.lang || 'fr-FR';
            utterance.rate = 0.8;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    };

    const nextCard = () => {
        setShowTranslation(false);
        setIndex((prev) => (prev + 1) % VOCAB_DECK.length);
    };

    return (
        <div className="flex flex-col h-full items-center justify-between p-6 pb-safe bg-brand-bg text-brand-text overflow-y-auto">

            {/* --- SELECTOR DE VOZ CON BOTÓN DE FUERZA --- */}
            <div className="w-full mb-4 bg-brand-surface p-3 rounded-lg border border-slate-700 shadow-md">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] text-brand-muted uppercase font-bold">
                        Configuración de Voz ({voices.length})
                    </label>
                    {/* BOTÓN DE RECARGA MANUAL */}
                    <button
                        onClick={loadVoices}
                        className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-white transition-colors"
                    >
                        🔄 Recargar
                    </button>
                </div>

                <div className="flex gap-2">
                    <select
                        className="w-full bg-slate-900 text-xs text-white p-3 rounded border border-slate-600 focus:border-brand-primary outline-none"
                        onChange={(e) => {
                            const voice = voices.find(v => v.name === e.target.value);
                            if (voice) setSelectedVoice(voice);
                        }}
                        value={selectedVoice?.name || ""}
                    >
                        {voices.map((v, i) => (
                            // Usamos el índice 'i' como respaldo para asegurar que sea 100% único
                            <option key={`${v.name}-${v.lang}-${i}`} value={v.name}>
                                {v.lang.toUpperCase()} - {v.name.slice(0, 30)}...
                            </option>
                        ))}
                    </select>
                </div>

                {/* Aviso si no hay voces francesas */}
                {voices.length > 0 && !voices.some(v => v.lang.includes('fr')) && (
                    <p className="text-[10px] text-amber-400 mt-2 font-bold bg-amber-900/30 p-2 rounded">
                        ⚠ No veo voces FRANCESAS. <br />
                        1. Instala el idioma Francés en Windows. <br />
                        2. Reinicia el navegador.
                    </p>
                )}
            </div>

            {/* TARJETA PRINCIPAL */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full max-w-sm">
                <div className="text-9xl drop-shadow-2xl cursor-pointer active:scale-95 transition-transform" onClick={() => speakFrench(card.french)}>
                    {card.emoji}
                </div>

                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-serif font-bold text-brand-text leading-tight">
                        {card.french}
                    </h2>

                    <button
                        onClick={() => speakFrench(card.french)}
                        disabled={isSpeaking}
                        className={`px-6 py-3 rounded-full border border-brand-primary/50 text-brand-primary font-bold text-sm flex items-center gap-2 mx-auto hover:bg-brand-primary/20 transition-all ${isSpeaking ? 'opacity-50' : ''}`}
                    >
                        <span>{isSpeaking ? '🔊 ...' : '🔊 Escuchar'}</span>
                    </button>
                </div>

                <div className={`transition-all duration-300 transform w-full ${showTranslation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 h-0 overflow-hidden'}`}>
                    <p className="text-brand-muted text-lg font-medium bg-brand-surface px-6 py-3 rounded-xl border border-slate-700 text-center shadow-inner">
                        "{card.meaning}"
                    </p>
                </div>
            </div>

            {/* CONTROLES */}
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
                            className="bg-brand-success text-brand-bg font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.4)] active:scale-95"
                        >
                            Fácil 🚀
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}