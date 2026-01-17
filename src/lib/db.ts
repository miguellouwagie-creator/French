import { createRxDatabase, RxDatabase, RxCollection, RxJsonSchema, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import SHA256 from 'crypto-js/sha256';

// Solo activamos plugins de desarrollo en local
if (process.env.NODE_ENV === 'development') {
    addRxPlugin(RxDBDevModePlugin);
}

const cardSchema: RxJsonSchema<any> = {
    title: 'card schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: { type: 'string', maxLength: 100 },
        front: { type: 'string' },
        back: { type: 'string' },
        type: { type: 'string', enum: ['phonetic', 'vocab', 'sentence'] },
        interval: { type: 'number' },
        factor: { type: 'number' },
        dueDate: { type: 'number' },
        state: { type: 'string', enum: ['new', 'learning', 'review', 'relearning'] },
        phoneticGuide: { type: 'string' },
        mnemonic: { type: 'string' },
        trap: { type: 'string' }
    },
    required: ['id', 'front', 'back', 'dueDate', 'state']
};

export type CardDoc = {
    id: string;
    front: string;
    back: string;
    type: 'phonetic' | 'vocab' | 'sentence';
    interval: number;
    factor: number;
    dueDate: number;
    state: 'new' | 'learning' | 'review' | 'relearning';
    phoneticGuide?: string;
    mnemonic?: string;
    trap?: string;
};

export type MyDatabaseCollections = {
    cards: RxCollection<CardDoc>;
};

export type MyDatabase = RxDatabase<MyDatabaseCollections>;

// --- AQUÍ ESTÁ EL CAMBIO CLAVE ---
// Usamos globalThis para que la conexión sobreviva al Hot Reload de Next.js
const globalForRxDB = globalThis as unknown as {
    rxdbPromise: Promise<MyDatabase> | undefined;
};

const cryptoJsHash = async (data: string) => {
    return SHA256(data).toString();
};

export const getDatabase = async (): Promise<MyDatabase> => {
    // 1. PRIMERO: Verificamos si ya existe una conexión global
    if (process.env.NODE_ENV === 'development' && globalForRxDB.rxdbPromise) {
        return globalForRxDB.rxdbPromise;
    }

    const storage = process.env.NODE_ENV === 'development'
        ? wrappedValidateAjvStorage({ storage: getRxStorageDexie() })
        : getRxStorageDexie();

    const dbPromise = createRxDatabase<MyDatabaseCollections>({
        name: 'larchitectedb_v3', // Subimos versión para limpiar cualquier bloqueo previo
        storage: storage,
        hashFunction: cryptoJsHash,
        multiInstance: false,
        ignoreDuplicate: true
    }).then(async (db) => {
        // Añadimos colección solo si no existe
        if (!db.collections.cards) {
            await db.addCollections({
                cards: {
                    schema: cardSchema
                }
            });
        }
        console.log("🧠 Cerebro L'Architecte activado (Singleton)");
        return db;
    });

    // 2. GUARDAMOS la conexión en la variable global
    if (process.env.NODE_ENV === 'development') {
        globalForRxDB.rxdbPromise = dbPromise;
    }

    return dbPromise;
};