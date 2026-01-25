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
    // Urban Survival Expansion
    { id: 'surv-13', emoji: '🛍️', french: 'À emporter, s\'il vous plaît', meaning: 'Para llevar, por favor', type: 'phrase' },
    { id: 'surv-14', emoji: '💳', french: 'Vous prenez la carte ?', meaning: '¿Aceptan tarjeta?', type: 'phrase' },
    { id: 'surv-15', emoji: '😅', french: 'C\'est pas grave', meaning: 'No pasa nada / No importa', type: 'phrase' },
    { id: 'surv-16', emoji: '🕑', french: 'J\'arrive dans 5 minutes', meaning: 'Llego en 5 minutos', type: 'phrase' },
    { id: 'surv-17', emoji: '🛑', french: 'Arrêtez ici, s\'il vous plaît', meaning: 'Pare aquí, por favor (Taxi)', type: 'phrase' },
    { id: 'surv-18', emoji: '📶', french: 'C\'est quoi le mot de passe Wifi ?', meaning: '¿Cuál es la contraseña del Wifi?', type: 'phrase' },
    { id: 'surv-19', emoji: '👍', french: 'Ça marche', meaning: 'Vale / Me parece bien / Funciona', type: 'phrase' },
    { id: 'surv-20', emoji: '🌡️', french: 'Il fait trop chaud ici', meaning: 'Hace demasiado calor aquí', type: 'phrase' },
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
    // Daily Essentials Expansion
    { id: 'obj-13', emoji: '🗝️', french: 'Les clés', meaning: 'Las llaves', type: 'vocab' },
    { id: 'obj-14', emoji: '🔋', french: 'Le chargeur', meaning: 'El cargador', type: 'vocab' },
    { id: 'obj-15', emoji: '🧥', french: 'Le manteau', meaning: 'El abrigo', type: 'vocab' },
    { id: 'obj-16', emoji: '👟', french: 'Les chaussures', meaning: 'Los zapatos', type: 'vocab' },
    { id: 'obj-17', emoji: '🧴', french: 'La crème solaire', meaning: 'La crema solar', type: 'vocab' },
    { id: 'obj-18', emoji: '🕶️', french: 'Les lunettes', meaning: 'Las gafas', type: 'vocab' },
    { id: 'obj-19', emoji: '🎫', french: 'Le billet', meaning: 'El billete/entrada', type: 'vocab' },
    { id: 'obj-20', emoji: '🧊', french: 'Le frigo', meaning: 'La nevera', type: 'vocab' },
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
    // Routines & Action Expansion
    { id: 'verb-13', emoji: '🚿', french: 'Je prends une douche', meaning: 'Me ducho', type: 'verb' },
    { id: 'verb-14', emoji: '🍳', french: 'Je prépare le dîner', meaning: 'Preparo la cena', type: 'verb' },
    { id: 'verb-15', emoji: '🧹', french: 'Je dois nettoyer', meaning: 'Tengo que limpiar', type: 'verb' },
    { id: 'verb-16', emoji: '🔍', french: 'Je cherche mes clés', meaning: 'Busco mis llaves', type: 'verb' },
    { id: 'verb-17', emoji: '🛒', french: 'Je dois acheter ça', meaning: 'Tengo que comprar esto', type: 'verb' },
    { id: 'verb-18', emoji: '🤝', french: 'On se retrouve là-bas', meaning: 'Nos encontramos allí', type: 'verb' },
    { id: 'verb-19', emoji: '📲', french: 'Je t\'appelle plus tard', meaning: 'Te llamo más tarde', type: 'verb' },
    { id: 'verb-20', emoji: '🚶', french: 'Je pars maintenant', meaning: 'Me voy ahora', type: 'verb' },
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
    // Remote Work Era Expansion
    { id: 'corp-13', emoji: '🏠', french: 'Je suis en télétravail', meaning: 'Estoy teletrabajando', type: 'phrase' },
    { id: 'corp-14', emoji: '🔗', french: 'Tu as le lien ?', meaning: '¿Tienes el enlace?', type: 'phrase' },
    { id: 'corp-15', emoji: '📅', french: 'On peut décaler ?', meaning: '¿Podemos mover la reunión?', type: 'phrase' },
    { id: 'corp-16', emoji: '🔇', french: 'Ton micro est coupé', meaning: 'Tu micro está apagado', type: 'phrase' },
    { id: 'corp-17', emoji: '🚀', french: 'C\'est validé', meaning: 'Está aprobado', type: 'phrase' },
    { id: 'corp-18', emoji: '🔄', french: 'Je te tiens au courant', meaning: 'Te mantengo informado', type: 'phrase' },
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
    // Native Connectors Expansion (To Sound Like a Native)
    { id: 'glue-13', emoji: '💥', french: 'Du coup', meaning: 'Entonces / Total que... (Muy usado)', type: 'connector' },
    { id: 'glue-14', emoji: '🤐', french: 'Bref', meaning: 'En fin / Resumiendo', type: 'connector' },
    { id: 'glue-15', emoji: '🤷', french: 'Quand même', meaning: 'De todas formas / Aún así', type: 'connector' },
    { id: 'glue-16', emoji: '⚖️', french: 'Par contre', meaning: 'En cambio / Por otro lado', type: 'connector' },
    { id: 'glue-17', emoji: '🤔', french: 'Genre', meaning: 'Tipo / O sea (Coloquial)', type: 'connector' },
    { id: 'glue-18', emoji: '👉', french: 'D\'ailleurs', meaning: 'Por cierto / A propósito', type: 'connector' },
    { id: 'glue-19', emoji: '🛑', french: 'Franchement', meaning: 'Francamente / Sinceramente', type: 'connector' },
    { id: 'glue-20', emoji: '👀', french: 'Carrément', meaning: 'Totalmente / Completamente (Coloquial)', type: 'connector' },
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
    // Complex Sounds Expansion
    {
        id: 'phon-11',
        emoji: '🐿️',
        french: 'Écureuil',
        meaning: 'Ardilla',
        type: 'phonetic',
        phoneticGuide: 'É-cu-RÖY',
        trap: 'Terminación -EUIL imposible',
        mnemonic: 'Mezcla R y Y'
    },
    {
        id: 'phon-12',
        emoji: '🐸',
        french: 'Grenouille',
        meaning: 'Rana',
        type: 'phonetic',
        phoneticGuide: 'Gre-NUY',
        trap: 'OUILLE suena como "Uy"',
        mnemonic: 'Gre-NUY'
    },
    {
        id: 'phon-13',
        emoji: '🥣',
        french: 'Bouilloire',
        meaning: 'Hervidor',
        type: 'phonetic',
        phoneticGuide: 'Bu-YWAR',
        trap: 'Doble L mojada + OIRE',
        mnemonic: 'Bu-Y-War'
    },
    {
        id: 'phon-14',
        emoji: '🥛',
        french: 'Yaourt',
        meaning: 'Yogur',
        type: 'phonetic',
        phoneticGuide: 'Ya-URT',
        trap: 'Aquí sí suena la T final',
        mnemonic: 'Ya-hurt'
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
    // Months (Les Mois)
    { id: 'atlas-29', emoji: '📅', french: 'Janvier', meaning: 'Enero', type: 'table', category: 'Les Mois' },
    { id: 'atlas-30', emoji: '📅', french: 'Février', meaning: 'Febrero', type: 'table', category: 'Les Mois' },
    { id: 'atlas-31', emoji: '📅', french: 'Mars', meaning: 'Marzo', type: 'table', category: 'Les Mois' },
    { id: 'atlas-32', emoji: '📅', french: 'Avril', meaning: 'Abril', type: 'table', category: 'Les Mois' },
    { id: 'atlas-33', emoji: '📅', french: 'Mai', meaning: 'Mayo', type: 'table', category: 'Les Mois' },
    { id: 'atlas-34', emoji: '📅', french: 'Juin', meaning: 'Junio', type: 'table', category: 'Les Mois' },
    { id: 'atlas-35', emoji: '📅', french: 'Juillet', meaning: 'Julio', type: 'table', category: 'Les Mois' },
    { id: 'atlas-36', emoji: '📅', french: 'Août', meaning: 'Agosto', type: 'table', category: 'Les Mois' },
    { id: 'atlas-37', emoji: '📅', french: 'Septembre', meaning: 'Septiembre', type: 'table', category: 'Les Mois' },
    { id: 'atlas-38', emoji: '📅', french: 'Octobre', meaning: 'Octubre', type: 'table', category: 'Les Mois' },
    { id: 'atlas-39', emoji: '📅', french: 'Novembre', meaning: 'Noviembre', type: 'table', category: 'Les Mois' },
    { id: 'atlas-40', emoji: '📅', french: 'Décembre', meaning: 'Diciembre', type: 'table', category: 'Les Mois' },
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
    // Complex Real-World Scenario
    {
        id: 'anat-6',
        emoji: '📋',
        french: 'Désolé, je ne peux pas venir ce soir parce que je dois finir un dossier urgent.',
        meaning: 'Lo siento, no puedo venir esta noche porque tengo que terminar un informe urgente.',
        type: 'anatomy',
        segments: [
            { text: 'Désolé', meaning: 'Lo siento', grammarNote: 'Disculpa / Expresión de lamento' },
            { text: 'je ne peux pas venir', meaning: 'no puedo venir', grammarNote: 'Negación de pouvoir (verbo modal) + infinitivo' },
            { text: 'ce soir', meaning: 'esta noche', grammarNote: 'Expresión temporal' },
            { text: 'parce que', meaning: 'porque', grammarNote: 'Conjunción causal' },
            { text: 'je dois finir', meaning: 'tengo que terminar', grammarNote: 'Devoir (obligación) + infinitivo' },
            { text: 'un dossier urgent', meaning: 'un informe urgente', grammarNote: 'Artículo + sustantivo + adjetivo' },
        ],
    },
];

// =====================================================
// TRACK 9: DAILY ESSENTIALS (Quick Reference Table)
// =====================================================
const ESSENTIALS_DECK: Card[] = [
    // 1. INTERACCIONES RÁPIDAS (Quick Actions)
    { id: 'ess-1', emoji: '👇', french: 'On descend ?', meaning: '¿Bajamos?', type: 'table', category: 'Acción Inmediata' },
    { id: 'ess-2', emoji: '🚪', french: 'On sort ?', meaning: '¿Salimos?', type: 'table', category: 'Acción Inmediata' },
    { id: 'ess-3', emoji: '🚶', french: 'On y va ?', meaning: '¿Nos vamos?', type: 'table', category: 'Acción Inmediata' },
    { id: 'ess-4', emoji: '💨', french: 'On bouge ?', meaning: '¿Nos movemos/piramos?', type: 'table', category: 'Acción Inmediata' },
    { id: 'ess-5', emoji: '🏠', french: 'Je rentre', meaning: 'Me voy a casa / Vuelvo', type: 'table', category: 'Acción Inmediata' },
    { id: 'ess-6', emoji: '🍽️', french: 'À table !', meaning: '¡A comer!', type: 'table', category: 'Acción Inmediata' },
    { id: 'ess-7', emoji: '👀', french: 'Regarde ça', meaning: 'Mira esto', type: 'table', category: 'Acción Inmediata' },
    { id: 'ess-8', emoji: '👂', french: 'Écoute-moi', meaning: 'Escúchame', type: 'table', category: 'Acción Inmediata' },
    { id: 'ess-9', emoji: '✋', french: 'Attends', meaning: 'Espera', type: 'table', category: 'Acción Inmediata' },
    { id: 'ess-10', emoji: '🏎️', french: 'Dépêche-toi', meaning: 'Date prisa', type: 'table', category: 'Acción Inmediata' },

    // 2. CORTESÍA DIARIA (Politeness)
    { id: 'ess-11', emoji: '🙏', french: 'Merci bien', meaning: 'Muchas gracias', type: 'table', category: 'Cortesía' },
    { id: 'ess-12', emoji: '👐', french: 'De rien', meaning: 'De nada', type: 'table', category: 'Cortesía' },
    { id: 'ess-13', emoji: '🤷', french: 'Pas de souci', meaning: 'No hay problema / Sin fallo', type: 'table', category: 'Cortesía' },
    { id: 'ess-14', emoji: '🙇', french: 'Désolé(e)', meaning: 'Lo siento', type: 'table', category: 'Cortesía' },
    { id: 'ess-15', emoji: '🚧', french: 'Pardon', meaning: 'Perdón / Permiso', type: 'table', category: 'Cortesía' },
    { id: 'ess-16', emoji: '🤧', french: 'À tes souhaits', meaning: 'Jesús/Salud (estornudo)', type: 'table', category: 'Cortesía' },
    { id: 'ess-17', emoji: '🎂', french: 'Bon anniversaire', meaning: 'Feliz cumpleaños', type: 'table', category: 'Cortesía' },
    { id: 'ess-18', emoji: '🍀', french: 'Bonne chance', meaning: 'Buena suerte', type: 'table', category: 'Cortesía' },
    { id: 'ess-19', emoji: '👋', french: 'À tout à l\'heure', meaning: 'Hasta ahora (mismo día)', type: 'table', category: 'Cortesía' },
    { id: 'ess-20', emoji: '🌅', french: 'À demain', meaning: 'Hasta mañana', type: 'table', category: 'Cortesía' },

    // 3. RESPUESTAS CORTAS (Short Answers)
    { id: 'ess-21', emoji: '👍', french: 'Carrément', meaning: 'Totalmente / Definitivamente', type: 'table', category: 'Respuestas' },
    { id: 'ess-22', emoji: '👌', french: 'C\'est nickel', meaning: 'Está perfecto / De lujo', type: 'table', category: 'Respuestas' },
    { id: 'ess-23', emoji: '🤔', french: 'C\'est bizarre', meaning: 'Es raro', type: 'table', category: 'Respuestas' },
    { id: 'ess-24', emoji: '😐', french: 'Comme ci, comme ça', meaning: 'Más o menos / Así así', type: 'table', category: 'Respuestas' },
    { id: 'ess-25', emoji: '🤨', french: 'C\'est vrai ?', meaning: '¿En serio? / ¿Es verdad?', type: 'table', category: 'Respuestas' },
    { id: 'ess-26', emoji: '🙅', french: 'Pas du tout', meaning: 'Para nada', type: 'table', category: 'Respuestas' },
    { id: 'ess-27', emoji: '🤷', french: 'Je ne sais pas', meaning: 'No lo sé', type: 'table', category: 'Respuestas' },
    { id: 'ess-28', emoji: '🌭', french: 'J\'ai la dalle', meaning: 'Me muero de hambre (Coloq.)', type: 'table', category: 'Respuestas' },
    { id: 'ess-29', emoji: '🥵', french: 'Je suis KO', meaning: 'Estoy reventado/a', type: 'table', category: 'Respuestas' },
    { id: 'ess-30', emoji: '😨', french: 'C\'est chaud', meaning: 'Está complicado / Es difícil', type: 'table', category: 'Respuestas' },

    // 4. CONECTORES DE CALLE (Street Connectors)
    { id: 'ess-31', emoji: '🛑', french: 'Arrête !', meaning: '¡Para ya!', type: 'table', category: 'Frases Útiles' },
    { id: 'ess-32', emoji: '📱', french: 'Envoie-moi ça', meaning: 'Mándame eso', type: 'table', category: 'Frases Útiles' },
    { id: 'ess-33', emoji: '📍', french: 'T\'es où ?', meaning: '¿Dónde estás?', type: 'table', category: 'Frases Útiles' },
    { id: 'ess-34', emoji: '⌚', french: 'On se voit quand ?', meaning: '¿Cuándo nos vemos?', type: 'table', category: 'Frases Útiles' },
    { id: 'ess-35', emoji: '🍻', french: 'On prend un verre ?', meaning: '¿Tomamos algo?', type: 'table', category: 'Frases Útiles' },
    { id: 'ess-36', emoji: '💰', french: 'C\'est cher', meaning: 'Es caro', type: 'table', category: 'Frases Útiles' },
    { id: 'ess-37', emoji: '🆓', french: 'C\'est gratuit', meaning: 'Es gratis', type: 'table', category: 'Frases Útiles' },
    { id: 'ess-38', emoji: '🚽', french: 'C\'est par où ?', meaning: '¿Por dónde es?', type: 'table', category: 'Frases Útiles' },
    { id: 'ess-39', emoji: '🧾', french: 'L\'addition, s\'il vous plaît', meaning: 'La cuenta, por favor', type: 'table', category: 'Frases Útiles' },
    { id: 'ess-40', emoji: '🆘', french: 'Au secours', meaning: 'Socorro / Ayuda', type: 'table', category: 'Frases Útiles' },

    // 5. TIEMPO Y CANTIDAD (Time & Amount)
    { id: 'ess-41', emoji: '🤏', french: 'Un petit peu', meaning: 'Un poquito', type: 'table', category: 'Precisión' },
    { id: 'ess-42', emoji: '🧱', french: 'Beaucoup', meaning: 'Mucho', type: 'table', category: 'Precisión' },
    { id: 'ess-43', emoji: '🚫', french: 'Jamais', meaning: 'Nunca', type: 'table', category: 'Precisión' },
    { id: 'ess-44', emoji: '♾️', french: 'Toujours', meaning: 'Siempre', type: 'table', category: 'Precisión' },
    { id: 'ess-45', emoji: '🕰️', french: 'Maintenant', meaning: 'Ahora', type: 'table', category: 'Precisión' },
    { id: 'ess-46', emoji: '🔜', french: 'Bientôt', meaning: 'Pronto', type: 'table', category: 'Precisión' },
    { id: 'ess-47', emoji: '🗓️', french: 'La semaine prochaine', meaning: 'La semana que viene', type: 'table', category: 'Precisión' },
    { id: 'ess-48', emoji: '🌙', french: 'Hier soir', meaning: 'Anoche', type: 'table', category: 'Precisión' },
    { id: 'ess-49', emoji: '🔢', french: 'Combien ?', meaning: '¿Cuánto(s)?', type: 'table', category: 'Precisión' },
    { id: 'ess-50', emoji: '⚖️', french: 'C\'est trop', meaning: 'Es demasiado', type: 'table', category: 'Precisión' },

    // 6. SENSACIONES (Feelings)
    { id: 'ess-51', emoji: '🥶', french: 'J\'ai froid', meaning: 'Tengo frío', type: 'table', category: 'Sensaciones' },
    { id: 'ess-52', emoji: '🥵', french: 'J\'ai chaud', meaning: 'Tengo calor', type: 'table', category: 'Sensaciones' },
    { id: 'ess-53', emoji: '🤕', french: 'J\'ai mal', meaning: 'Me duele', type: 'table', category: 'Sensaciones' },
    { id: 'ess-54', emoji: '😰', french: 'J\'ai peur', meaning: 'Tengo miedo', type: 'table', category: 'Sensaciones' },
    { id: 'ess-55', emoji: '😴', french: 'Je suis fatigué(e)', meaning: 'Estoy cansado/a', type: 'table', category: 'Sensaciones' },
    { id: 'ess-56', emoji: '🤢', french: 'J\'ai la nausée', meaning: 'Tengo náuseas', type: 'table', category: 'Sensaciones' },
    { id: 'ess-57', emoji: '😡', french: 'Je suis énervé(e)', meaning: 'Estoy enfadado/a', type: 'table', category: 'Sensaciones' },
    { id: 'ess-58', emoji: '🥳', french: 'Je suis content(e)', meaning: 'Estoy contento/a', type: 'table', category: 'Sensaciones' },
    { id: 'ess-59', emoji: '🧘', french: 'Je suis calme', meaning: 'Estoy tranquilo/a', type: 'table', category: 'Sensaciones' },
    { id: 'ess-60', emoji: '🔋', french: 'Je suis prêt(e)', meaning: 'Estoy listo/a', type: 'table', category: 'Sensaciones' },
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
    {
        id: 'essentials',
        title: 'Daily Essentials',
        titleFr: 'Le Quotidien',
        icon: 'Zap',
        description: '60 expresiones vitales para el día a día',
        color: 'amber',
        deck: ESSENTIALS_DECK,
        mode: 'table',
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
