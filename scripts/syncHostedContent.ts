import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { seedLessons, seedMedia, seedNews, seedNewspapers } from '../server/src/db/contentData';
const firebaseConfig = {
    projectId: 'kyrgyz-til',
    appId: '1:749218726563:web:48d13ce578d14fa2ab7516',
    storageBucket: 'kyrgyz-til.firebasestorage.app',
    apiKey: 'AIzaSyDEaNWJrMsV8vgnT5sSVITw5nMc953Tj4Q',
    authDomain: 'kyrgyz-til.firebaseapp.com',
    messagingSenderId: '749218726563',
    measurementId: 'G-JVH9CQ256W',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const syncCollection = (collection: string, items: Array<Record<string, unknown>>) => {
    await Promise.all(items.map((item) => setDoc(doc(db, collection, String(item.id)), item, { merge: true })));
};
await Promise.all([
    syncCollection('news', seedNews),
    syncCollection('newspapers', seedNewspapers),
    syncCollection('media', seedMedia),
    syncCollection('lessons', seedLessons),
]);
console.log('Hosted content synced.');
