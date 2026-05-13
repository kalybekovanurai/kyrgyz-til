import admin from 'firebase-admin';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'kyrgyz-til'
});

const db = admin.firestore();

type WithId = { id: string };

async function importCollection<T extends WithId>(fileName: string, coll: string) {
  const dataPath = join(__dirname, '..', 'server', 'data', fileName);
  console.log(`Reading ${fileName} -> ${coll}`);
  const raw = await readFile(dataPath, 'utf8');
  const items: T[] = JSON.parse(raw);
  const batch = db.batch();
  items.forEach((item) => {
    const ref = db.collection(coll).doc(item.id);
    batch.set(ref, item);
  });
  await batch.commit();
  console.log(`Imported ${items.length} into ${coll}`);
}

async function main() {
  try {
    await importCollection('media.json', 'media');
    await importCollection('lessons.json', 'lessons');
    await importCollection('news.json', 'news');
    await importCollection('newspapers.json', 'newspapers');
    console.log('All done');
    process.exit(0);
  } catch (e) {
    console.error('Failed', e);
    process.exit(1);
  }
}

main();
