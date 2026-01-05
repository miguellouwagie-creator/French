// =====================================================
// L'ARCHITECTE - LEARNING TRACKS DATA
// Multi-Track French Acquisition System
// =====================================================

export interface Card {
    id: string;
    emoji: string;
    french: string;
    meaning: string;
    type: 'phrase' | 'vocab' | 'verb' | 'connector';
}

export interface Track {
    id: string;
    title: string;
    titleFr: string;
    icon: string; // Lucide icon name
    description: string;
    color: string; // Tailwind color class
    deck: Card[];
}

// =====================================================
// TRACK 1: SURVIVAL A1 (Original Deck)
// =====================================================
const SURVIVAL_DECK: Card[] = [
    // SALUDOS & BÁSICOS
    { id: 'surv-1', emoji: '👋', french: 'Bonjour, ça va?', meaning: 'Hola, ¿qué tal?', type: 'phrase' },
    { id: 'surv-2', emoji: '🌙', french: 'Bonne soirée', meaning: 'Que tengas buena noche', type: 'phrase' },
    { id: 'surv-3', emoji: '🙏', french: 'Merci beaucoup', meaning: 'Muchas gracias', type: 'phrase' },
    { id: 'surv-4', emoji: '🤷', french: 'Je ne comprends pas', meaning: 'No entiendo', type: 'phrase' },
    { id: 'surv-5', emoji: '🐌', french: 'Plus lentement, s\'il vous plaît', meaning: 'Más despacio, por favor', type: 'phrase' },
    { id: 'surv-6', emoji: '☕', french: 'Un café, s\'il vous plaît', meaning: 'Un café, por favor', type: 'phrase' },
    { id: 'surv-7', emoji: '🥐', french: 'Je voudrais un croissant', meaning: 'Quisiera un croissant', type: 'phrase' },
    { id: 'surv-8', emoji: '💳', french: 'L\'addition, s\'il vous plaît', meaning: 'La cuenta, por favor', type: 'phrase' },
    { id: 'surv-9', emoji: '📍', french: 'Où sont les toilettes ?', meaning: '¿Dónde está el baño?', type: 'phrase' },
    { id: 'surv-10', emoji: '🚇', french: 'Je cherche le métro', meaning: 'Busco el metro', type: 'phrase' },
    { id: 'surv-11', emoji: '🚑', french: 'Aidez-moi !', meaning: '¡Ayúdenme!', type: 'phrase' },
    { id: 'surv-12', emoji: '💊', french: 'J\'ai besoin d\'un médecin', meaning: 'Necesito un médico', type: 'phrase' },
];

// =====================================================
// TRACK 2: OBJECT LAB (High-Frequency Nouns)
// =====================================================
const OBJECTS_DECK: Card[] = [
    { id: 'obj-1', emoji: '🏠', french: 'La maison', meaning: 'La casa', type: 'vocab' },
    { id: 'obj-2', emoji: '🚗', french: 'La voiture', meaning: 'El coche', type: 'vocab' },
    { id: 'obj-3', emoji: '🥖', french: 'Le pain', meaning: 'El pan', type: 'vocab' },
    { id: 'obj-4', emoji: '🧀', french: 'Le fromage', meaning: 'El queso', type: 'vocab' },
    { id: 'obj-5', emoji: '📱', french: 'Le téléphone', meaning: 'El teléfono', type: 'vocab' },
    { id: 'obj-6', emoji: '💻', french: 'L\'ordinateur', meaning: 'El ordenador', type: 'vocab' },
    { id: 'obj-7', emoji: '🗝️', french: 'La clé', meaning: 'La llave', type: 'vocab' },
    { id: 'obj-8', emoji: '👜', french: 'Le sac', meaning: 'El bolso', type: 'vocab' },
    { id: 'obj-9', emoji: '📖', french: 'Le livre', meaning: 'El libro', type: 'vocab' },
    { id: 'obj-10', emoji: '🪑', french: 'La chaise', meaning: 'La silla', type: 'vocab' },
    { id: 'obj-11', emoji: '🛏️', french: 'Le lit', meaning: 'La cama', type: 'vocab' },
    { id: 'obj-12', emoji: '🍷', french: 'Le vin', meaning: 'El vino', type: 'vocab' },
];

// =====================================================
// TRACK 3: VERB GYM (Conjugated Verbs in Context)
// =====================================================
const VERBS_DECK: Card[] = [
    { id: 'verb-1', emoji: '😴', french: 'Je suis fatigué', meaning: 'Estoy cansado', type: 'verb' },
    { id: 'verb-2', emoji: '🍽️', french: 'J\'ai faim', meaning: 'Tengo hambre', type: 'verb' },
    { id: 'verb-3', emoji: '💧', french: 'J\'ai soif', meaning: 'Tengo sed', type: 'verb' },
    { id: 'verb-4', emoji: '🏃', french: 'Je vais au travail', meaning: 'Voy al trabajo', type: 'verb' },
    { id: 'verb-5', emoji: '❤️', french: 'J\'aime ça', meaning: 'Me gusta esto', type: 'verb' },
    { id: 'verb-6', emoji: '🤔', french: 'Je pense que oui', meaning: 'Creo que sí', type: 'verb' },
    { id: 'verb-7', emoji: '🗣️', french: 'Je parle français', meaning: 'Hablo francés', type: 'verb' },
    { id: 'verb-8', emoji: '👀', french: 'Je vois', meaning: 'Yo veo', type: 'verb' },
    { id: 'verb-9', emoji: '✍️', french: 'J\'écris un message', meaning: 'Escribo un mensaje', type: 'verb' },
    { id: 'verb-10', emoji: '🎧', french: 'J\'écoute de la musique', meaning: 'Escucho música', type: 'verb' },
    { id: 'verb-11', emoji: '🏠', french: 'Je reste à la maison', meaning: 'Me quedo en casa', type: 'verb' },
    { id: 'verb-12', emoji: '🛒', french: 'Je fais les courses', meaning: 'Hago las compras', type: 'verb' },
];

// =====================================================
// TRACK 4: CORPORATE (Professional Phrases)
// =====================================================
const CORPORATE_DECK: Card[] = [
    { id: 'corp-1', emoji: '📧', french: 'Je t\'envoie un email', meaning: 'Te envío un email', type: 'phrase' },
    { id: 'corp-2', emoji: '📅', french: 'Je suis en réunion', meaning: 'Estoy en reunión', type: 'phrase' },
    { id: 'corp-3', emoji: '✉️', french: 'Cordialement', meaning: 'Cordialmente (firma)', type: 'phrase' },
    { id: 'corp-4', emoji: '📞', french: 'Je vous rappelle', meaning: 'Le devuelvo la llamada', type: 'phrase' },
    { id: 'corp-5', emoji: '📎', french: 'Veuillez trouver ci-joint', meaning: 'Adjunto encontrará', type: 'phrase' },
    { id: 'corp-6', emoji: '🤝', french: 'Enchanté de vous rencontrer', meaning: 'Encantado de conocerle', type: 'phrase' },
    { id: 'corp-7', emoji: '⏰', french: 'Je suis en retard', meaning: 'Llego tarde', type: 'phrase' },
    { id: 'corp-8', emoji: '📊', french: 'Voici le rapport', meaning: 'Aquí está el informe', type: 'phrase' },
    { id: 'corp-9', emoji: '💼', french: 'C\'est urgent', meaning: 'Es urgente', type: 'phrase' },
    { id: 'corp-10', emoji: '🗓️', french: 'On se voit demain', meaning: 'Nos vemos mañana', type: 'phrase' },
    { id: 'corp-11', emoji: '✅', french: 'C\'est noté', meaning: 'Anotado / Entendido', type: 'phrase' },
    { id: 'corp-12', emoji: '🙋', french: 'J\'ai une question', meaning: 'Tengo una pregunta', type: 'phrase' },
];

// =====================================================
// TRACK 5: GLUE WORDS (Connectors & Linking Words)
// =====================================================
const GLUE_DECK: Card[] = [
    { id: 'glue-1', emoji: '🔗', french: 'Mais', meaning: 'Pero', type: 'connector' },
    { id: 'glue-2', emoji: '➡️', french: 'Donc', meaning: 'Entonces / Por lo tanto', type: 'connector' },
    { id: 'glue-3', emoji: '💡', french: 'Parce que', meaning: 'Porque', type: 'connector' },
    { id: 'glue-4', emoji: '🔄', french: 'Alors', meaning: 'Entonces / Así que', type: 'connector' },
    { id: 'glue-5', emoji: '➕', french: 'Et aussi', meaning: 'Y también', type: 'connector' },
    { id: 'glue-6', emoji: '⚖️', french: 'Cependant', meaning: 'Sin embargo', type: 'connector' },
    { id: 'glue-7', emoji: '🎯', french: 'En fait', meaning: 'De hecho', type: 'connector' },
    { id: 'glue-8', emoji: '📌', french: 'D\'abord', meaning: 'Primero', type: 'connector' },
    { id: 'glue-9', emoji: '🏁', french: 'Ensuite', meaning: 'Luego / Después', type: 'connector' },
    { id: 'glue-10', emoji: '🔚', french: 'Enfin', meaning: 'Finalmente', type: 'connector' },
    { id: 'glue-11', emoji: '🤷', french: 'Peut-être', meaning: 'Quizás / Tal vez', type: 'connector' },
    { id: 'glue-12', emoji: '💯', french: 'Bien sûr', meaning: 'Por supuesto', type: 'connector' },
];

// =====================================================
// EXPORTED TRACKS COLLECTION
// =====================================================
export const TRACKS: Track[] = [
    {
        id: 'survival',
        title: 'Survival A1',
        titleFr: 'Survie',
        icon: 'Shield',
        description: 'Frases esenciales para sobrevivir en Francia',
        color: 'cyan',
        deck: SURVIVAL_DECK,
    },
    {
        id: 'objects',
        title: 'Object Lab',
        titleFr: 'Les Objets',
        icon: 'Package',
        description: 'Sustantivos de alta frecuencia',
        color: 'violet',
        deck: OBJECTS_DECK,
    },
    {
        id: 'verbs',
        title: 'Verb Gym',
        titleFr: 'Les Verbes',
        icon: 'Zap',
        description: 'Verbos conjugados en contexto',
        color: 'amber',
        deck: VERBS_DECK,
    },
    {
        id: 'corporate',
        title: 'Corporate',
        titleFr: 'Le Bureau',
        icon: 'Briefcase',
        description: 'Frases profesionales para el trabajo',
        color: 'emerald',
        deck: CORPORATE_DECK,
    },
    {
        id: 'glue',
        title: 'Glue Words',
        titleFr: 'Les Connecteurs',
        icon: 'Link',
        description: 'Palabras de enlace y conectores',
        color: 'rose',
        deck: GLUE_DECK,
    },
];

// Helper function to get a track by ID
export function getTrackById(trackId: string): Track | undefined {
    return TRACKS.find(t => t.id === trackId);
}

// Helper function to get default track
export function getDefaultTrack(): Track {
    return TRACKS[0]; // Survival is default
}
