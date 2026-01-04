import { createRxDatabase, RxDatabase, RxCollection, RxJsonSchema, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import SHA256 from 'crypto-js/sha256'; // <--- NUEVA LIBRERÍA

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
        state: { type: 'string', enum: ['new', 'learning', 'review', 'relearning'] }
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
};

export type MyDatabaseCollections = {
    cards: RxCollection<CardDoc>;
};

export type MyDatabase = RxDatabase<MyDatabaseCollections>;

let dbPromise: Promise<MyDatabase> | null = null;

// FUNCIÓN HASH COMPATIBLE CON IPHONE (HTTP)
const cryptoJsHash = async (data: string) => {
    return SHA256(data).toString();
};

export const getDatabase = async (): Promise<MyDatabase> => {
    if (dbPromise) return dbPromise;

    const storage = process.env.NODE_ENV === 'development'
        ? wrappedValidateAjvStorage({ storage: getRxStorageDexie() })
        : getRxStorageDexie();

    dbPromise = createRxDatabase<MyDatabaseCollections>({
        name: 'larchitectedb',
        storage: storage,
        hashFunction: cryptoJsHash, // <--- AQUÍ APLICAMOS EL PARCHE
        ignoreDuplicate: true
    }).then(async (db) => {
        await db.addCollections({
            cards: {
                schema: cardSchema
            }
        });
        console.log("🧠 Cerebro L'Architecte activado (Modo Compatible iPhone)");
        return db;
    });

    return dbPromise;
};