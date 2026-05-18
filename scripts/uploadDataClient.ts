import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const firebaseConfig = {
    projectId: "kyrgyz-til",
    appId: "1:749218726563:web:48d13ce578d14fa2ab7516",
    storageBucket: "kyrgyz-til.firebasestorage.app",
    apiKey: "AIzaSyDEaNWJrMsV8vgnT5sSVITw5nMc953Tj4Q",
    authDomain: "kyrgyz-til.firebaseapp.com",
    messagingSenderId: "749218726563",
    measurementId: "G-JVH9CQ256W"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const importCollection = (fileName: string, collName: string) => {
    const dataPath = join(__dirname, '..', 'server', 'data', fileName);
    console.log(`Reading ${fileName} -> ${collName}`);
    const raw = await readFile(dataPath, 'utf8');
    const items = JSON.parse(raw);
    for (const item of items) {
        const docRef = doc(db, collName, item.id);
        await setDoc(docRef, item);
    }
    console.log(`Imported ${items.length} into ${collName}`);
};
const main = () => {
    try {
        await importCollection('media.json', 'media');
        await importCollection('lessons.json', 'lessons');
        await importCollection('news.json', 'news');
        await importCollection('newspapers.json', 'newspapers');
        console.log('All done!');
        process.exit(0);
    }
    catch (e) {
        console.error('Failed', e);
        process.exit(1);
    }
};
main();
