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
        // Campos nuevos opcionales para el Laboratorio
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

let dbPromise: Promise<MyDatabase> | null = null;

const cryptoJsHash = async (data: string) => {
    return SHA256(data).toString();
};

export const getDatabase = async (): Promise<MyDatabase> => {
    if (dbPromise) return dbPromise;

    const storage = process.env.NODE_ENV === 'development'
        ? wrappedValidateAjvStorage({ storage: getRxStorageDexie() })
        : getRxStorageDexie();

    dbPromise = createRxDatabase<MyDatabaseCollections>({
        name: 'larchitectedb_v2', // <--- CAMBIO CLAVE: Nombre nuevo para resetear datos corruptos
        storage: storage,
        hashFunction: cryptoJsHash,
        multiInstance: false,     // <--- CAMBIO CLAVE: Evita errores de bloqueo en iPhone
        ignoreDuplicate: true
    }).then(async (db) => {
        await db.addCollections({
            cards: {
                schema: cardSchema
            }
        });
        console.log("🧠 Cerebro L'Architecte activado (v2)");
        return db;
    });

    return dbPromise;
};