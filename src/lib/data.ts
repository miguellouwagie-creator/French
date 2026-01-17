// =====================================================
// L'ARCHITECTE - LEARNING TRACKS DATA
// Multi-Track French Acquisition System
// =====================================================

export interface Card {
    id: string;
    emoji: string;
    french: string;
    meaning: string;
    type: 'phrase' | 'vocab' | 'verb' | 'connector' | 'phonetic' | 'table' | 'anatomy';
    // Optional fields for Phonetic Lab
    phoneticGuide?: string;  // e.g., "wa-ZO"
    mnemonic?: string;       // e.g., "Piensa en 'Guasa' para la OI"
    trap?: string;           // e.g., "La S final es muda"
    // Optional fields for Anatomy mode
    segments?: { text: string; meaning: string; grammarNote?: string }[];
    // Optional category for table mode
    category?: string;
}

export interface Track {
    id: string;
    title: string;
    titleFr: string;
    icon: string; // Lucide icon name
    description: string;
    color: string; // Tailwind color class
    deck: Card[];
    mode: 'flashcard' | 'table' | 'anatomy';
}

// =====================================================
// TRACK 1: SURVIVAL A1 (Original Deck)
// =====================================================
const SURVIVAL_DECK: Card[] = [
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
// TRACK 6: PHONETIC LAB (Complex Pronunciation)
// =====================================================
const PHONETIC_DECK: Card[] = [
    {
        id: 'phon-1',
        emoji: '🐦',
        french: 'Oiseau',
        meaning: 'Pájaro',
        type: 'phonetic',
        phoneticGuide: 'wa-ZO',
        trap: 'Todas las vocales cambian: OI→wa, EAU→o',
        mnemonic: 'Piensa en "guaso" pero con W'
    },
    {
        id: 'phon-2',
        emoji: '🍷',
        french: 'Bordeaux',
        meaning: 'Burdeos (ciudad)',
        type: 'phonetic',
        phoneticGuide: 'Bor-DÓ',
        trap: 'EAU siempre suena O',
        mnemonic: 'El vino de BorDÓ'
    },
    {
        id: 'phon-3',
        emoji: '🎩',
        french: 'Monsieur',
        meaning: 'Señor',
        type: 'phonetic',
        phoneticGuide: 'Me-SIÖ',
        trap: 'La R y la N desaparecen completamente',
        mnemonic: 'Suena como "mesiú" en español'
    },
    {
        id: 'phon-4',
        emoji: '🪑',
        french: 'S\'asseoir',
        meaning: 'Sentarse',
        type: 'phonetic',
        phoneticGuide: 'Sa-SWÁR',
        trap: 'Doble S y OI→wa',
        mnemonic: 'Sasuar = sentarse en el sofá'
    },
    {
        id: 'phon-5',
        emoji: '🥚',
        french: 'Œuf',
        meaning: 'Huevo',
        type: 'phonetic',
        phoneticGuide: 'ÖF',
        trap: 'La Œ suena como una O cerrada alemana',
        mnemonic: 'Piensa en decir "of" pero redondeando los labios'
    },
    {
        id: 'phon-6',
        emoji: '🔐',
        french: 'Serrurerie',
        meaning: 'Cerrajería',
        type: 'phonetic',
        phoneticGuide: 'Se-ú-re-RÍ',
        trap: 'Trabalenguas de Rs - la E entre Rs es casi muda',
        mnemonic: 'El trabalenguas del cerrajero'
    },
    {
        id: 'phon-7',
        emoji: '📅',
        french: 'Aujourd\'hui',
        meaning: 'Hoy',
        type: 'phonetic',
        phoneticGuide: 'O-yur-DÜÍ',
        trap: 'AU→o, la R es suave, HUI→üi',
        mnemonic: 'Piensa: "Oyur-dui" como si fuera una palabra china'
    },
    {
        id: 'phon-8',
        emoji: '🥐',
        french: 'Croissant',
        meaning: 'Cruasán',
        type: 'phonetic',
        phoneticGuide: 'Krua-SÁN',
        trap: 'La T final es MUDA, AN es nasal',
        mnemonic: 'Krua-SAN (no "sant")'
    },
    {
        id: 'phon-9',
        emoji: '🏥',
        french: 'Hôpital',
        meaning: 'Hospital',
        type: 'phonetic',
        phoneticGuide: 'O-pi-TÁL',
        trap: 'La H es muda, el acento cirunflejo (ô) indica una O larga',
        mnemonic: 'Sin la H: O-pital'
    },
    {
        id: 'phon-10',
        emoji: '💧',
        french: 'Eau',
        meaning: 'Agua',
        type: 'phonetic',
        phoneticGuide: 'Ó',
        trap: 'Tres letras, un solo sonido: O',
        mnemonic: 'E-A-U = solo "O"... el francés es eficiente'
    },
];

// =====================================================
// TRACK 7: VOCABULARY ATLAS (Visual Table Mode)
// =====================================================
const VOCABULARY_ATLAS_DECK: Card[] = [
    // Days of the Week
    { id: 'atlas-1', emoji: '📅', french: 'Lundi', meaning: 'Lunes', type: 'table', category: 'Días de la Semana' },
    { id: 'atlas-2', emoji: '📅', french: 'Mardi', meaning: 'Martes', type: 'table', category: 'Días de la Semana' },
    { id: 'atlas-3', emoji: '📅', french: 'Mercredi', meaning: 'Miércoles', type: 'table', category: 'Días de la Semana' },
    { id: 'atlas-4', emoji: '📅', french: 'Jeudi', meaning: 'Jueves', type: 'table', category: 'Días de la Semana' },
    { id: 'atlas-5', emoji: '📅', french: 'Vendredi', meaning: 'Viernes', type: 'table', category: 'Días de la Semana' },
    { id: 'atlas-6', emoji: '📅', french: 'Samedi', meaning: 'Sábado', type: 'table', category: 'Días de la Semana' },
    { id: 'atlas-7', emoji: '📅', french: 'Dimanche', meaning: 'Domingo', type: 'table', category: 'Días de la Semana' },
    // Numbers 1-10
    { id: 'atlas-8', emoji: '1️⃣', french: 'Un', meaning: 'Uno', type: 'table', category: 'Números' },
    { id: 'atlas-9', emoji: '2️⃣', french: 'Deux', meaning: 'Dos', type: 'table', category: 'Números' },
    { id: 'atlas-10', emoji: '3️⃣', french: 'Trois', meaning: 'Tres', type: 'table', category: 'Números' },
    { id: 'atlas-11', emoji: '4️⃣', french: 'Quatre', meaning: 'Cuatro', type: 'table', category: 'Números' },
    { id: 'atlas-12', emoji: '5️⃣', french: 'Cinq', meaning: 'Cinco', type: 'table', category: 'Números' },
    { id: 'atlas-13', emoji: '6️⃣', french: 'Six', meaning: 'Seis', type: 'table', category: 'Números' },
    { id: 'atlas-14', emoji: '7️⃣', french: 'Sept', meaning: 'Siete', type: 'table', category: 'Números' },
    { id: 'atlas-15', emoji: '8️⃣', french: 'Huit', meaning: 'Ocho', type: 'table', category: 'Números' },
    { id: 'atlas-16', emoji: '9️⃣', french: 'Neuf', meaning: 'Nueve', type: 'table', category: 'Números' },
    { id: 'atlas-17', emoji: '🔟', french: 'Dix', meaning: 'Diez', type: 'table', category: 'Números' },
    // Colors
    { id: 'atlas-18', emoji: '⚪', french: 'Blanc', meaning: 'Blanco', type: 'table', category: 'Colores' },
    { id: 'atlas-19', emoji: '⚫', french: 'Noir', meaning: 'Negro', type: 'table', category: 'Colores' },
    { id: 'atlas-20', emoji: '🔴', french: 'Rouge', meaning: 'Rojo', type: 'table', category: 'Colores' },
    { id: 'atlas-21', emoji: '🔵', french: 'Bleu', meaning: 'Azul', type: 'table', category: 'Colores' },
    { id: 'atlas-22', emoji: '🟢', french: 'Vert', meaning: 'Verde', type: 'table', category: 'Colores' },
    { id: 'atlas-23', emoji: '🟡', french: 'Jaune', meaning: 'Amarillo', type: 'table', category: 'Colores' },
    { id: 'atlas-24', emoji: '🟠', french: 'Orange', meaning: 'Naranja', type: 'table', category: 'Colores' },
    { id: 'atlas-25', emoji: '🟣', french: 'Violet', meaning: 'Violeta', type: 'table', category: 'Colores' },
    { id: 'atlas-26', emoji: '🩷', french: 'Rose', meaning: 'Rosa', type: 'table', category: 'Colores' },
    { id: 'atlas-27', emoji: '🟤', french: 'Marron', meaning: 'Marrón', type: 'table', category: 'Colores' },
    { id: 'atlas-28', emoji: '🩶', french: 'Gris', meaning: 'Gris', type: 'table', category: 'Colores' },
];

// =====================================================
// TRACK 8: PHRASE ANATOMY (Sentence Deconstruction)
// =====================================================
const PHRASE_ANATOMY_DECK: Card[] = [
    {
        id: 'anat-1',
        emoji: '🍷',
        french: 'Je voudrais un verre de vin rouge.',
        meaning: 'Quisiera un vaso de vino tinto.',
        type: 'anatomy',
        segments: [
            { text: 'Je', meaning: 'Yo', grammarNote: 'Pronombre personal' },
            { text: 'voudrais', meaning: 'quisiera', grammarNote: 'Condicional de cortesía (vouloir)' },
            { text: 'un verre', meaning: 'un vaso', grammarNote: 'Artículo indefinido + sustantivo' },
            { text: 'de vin rouge', meaning: 'de vino tinto', grammarNote: 'Preposición + sustantivo + adjetivo (color al final)' },
        ],
    },
    {
        id: 'anat-2',
        emoji: '🎒',
        french: 'Est-ce que tu peux m\'aider, s\'il te plaît?',
        meaning: '¿Puedes ayudarme, por favor?',
        type: 'anatomy',
        segments: [
            { text: 'Est-ce que', meaning: '¿...?', grammarNote: 'Partícula interrogativa formal' },
            { text: 'tu peux', meaning: 'tú puedes', grammarNote: 'Pronombre + verbo pouvoir (presente)' },
            { text: 'm\'aider', meaning: 'ayudarme', grammarNote: 'Pronombre reflexivo + infinitivo' },
            { text: 's\'il te plaît', meaning: 'por favor', grammarNote: 'Fórmula de cortesía (informal tú)' },
        ],
    },
    {
        id: 'anat-3',
        emoji: '🏠',
        french: 'Je suis allé chez mes parents hier soir.',
        meaning: 'Fui a casa de mis padres anoche.',
        type: 'anatomy',
        segments: [
            { text: 'Je suis allé', meaning: 'Yo fui / He ido', grammarNote: 'Passé composé con être (verbo de movimiento)' },
            { text: 'chez', meaning: 'a casa de', grammarNote: 'Preposición especial para lugares personales' },
            { text: 'mes parents', meaning: 'mis padres', grammarNote: 'Adjetivo posesivo plural + sustantivo' },
            { text: 'hier soir', meaning: 'anoche', grammarNote: 'Expresión temporal (ayer + noche)' },
        ],
    },
    {
        id: 'anat-4',
        emoji: '☔',
        french: 'Il fait beau aujourd\'hui, mais il va pleuvoir demain.',
        meaning: 'Hace buen tiempo hoy, pero va a llover mañana.',
        type: 'anatomy',
        segments: [
            { text: 'Il fait beau', meaning: 'Hace buen tiempo', grammarNote: 'Expresión impersonal del clima' },
            { text: 'aujourd\'hui', meaning: 'hoy', grammarNote: 'Adverbio de tiempo' },
            { text: 'mais', meaning: 'pero', grammarNote: 'Conjunción adversativa' },
            { text: 'il va pleuvoir', meaning: 'va a llover', grammarNote: 'Futuro próximo (aller + infinitivo)' },
            { text: 'demain', meaning: 'mañana', grammarNote: 'Adverbio de tiempo' },
        ],
    },
    {
        id: 'anat-5',
        emoji: '🍽️',
        french: 'Qu\'est-ce que vous prenez comme dessert?',
        meaning: '¿Qué toman de postre?',
        type: 'anatomy',
        segments: [
            { text: 'Qu\'est-ce que', meaning: '¿Qué...?', grammarNote: 'Partícula interrogativa para objetos' },
            { text: 'vous prenez', meaning: 'ustedes toman', grammarNote: 'Pronombre formal + verbo prendre' },
            { text: 'comme dessert', meaning: 'de postre', grammarNote: 'comme = como/de (en contexto de menú)' },
        ],
    },
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
        mode: 'flashcard',
    },
    {
        id: 'objects',
        title: 'Object Lab',
        titleFr: 'Les Objets',
        icon: 'Package',
        description: 'Sustantivos de alta frecuencia',
        color: 'violet',
        deck: OBJECTS_DECK,
        mode: 'flashcard',
    },
    {
        id: 'verbs',
        title: 'Verb Gym',
        titleFr: 'Les Verbes',
        icon: 'Zap',
        description: 'Verbos conjugados en contexto',
        color: 'amber',
        deck: VERBS_DECK,
        mode: 'flashcard',
    },
    {
        id: 'corporate',
        title: 'Corporate',
        titleFr: 'Le Bureau',
        icon: 'Briefcase',
        description: 'Frases profesionales para el trabajo',
        color: 'emerald',
        deck: CORPORATE_DECK,
        mode: 'flashcard',
    },
    {
        id: 'glue',
        title: 'Glue Words',
        titleFr: 'Les Connecteurs',
        icon: 'Link',
        description: 'Palabras de enlace y conectores',
        color: 'rose',
        deck: GLUE_DECK,
        mode: 'flashcard',
    },
    {
        id: 'phonetic',
        title: 'Phonetic Lab',
        titleFr: 'Le Labo Phonétique',
        icon: 'AudioWaveform',
        description: 'Palabras difíciles con guía de pronunciación',
        color: 'fuchsia',
        deck: PHONETIC_DECK,
        mode: 'flashcard',
    },
    {
        id: 'atlas',
        title: 'Vocabulary Atlas',
        titleFr: 'Le Tableau',
        icon: 'Table2',
        description: 'Días, números y colores en lista visual',
        color: 'sky',
        deck: VOCABULARY_ATLAS_DECK,
        mode: 'table',
    },
    {
        id: 'anatomy',
        title: 'Phrase Anatomy',
        titleFr: 'L\'Anatomie',
        icon: 'Puzzle',
        description: 'Deconstrucción de frases complejas',
        color: 'teal',
        deck: PHRASE_ANATOMY_DECK,
        mode: 'anatomy',
    },
];

// Helper function to get a track by ID
export function getTrackById(trackId: string): Track | undefined {
    return TRACKS.find(t => t.id === trackId);
}

// Helper function to get default track
export function getDefaultTrack(): Track {
    const defaultTrack = TRACKS[0];
    if (!defaultTrack) {
        throw new Error("Fatal Error: TRACKS array is empty. Data corruption.");
    }
    return defaultTrack;
}

// Helper function to get ALL cards from ALL tracks (for Quiz Mode)
export function getAllCards(): Card[] {
    return TRACKS.flatMap(track => track.deck);
}
