import { initDatabase } from '../server/src/db/schema';
import { seedLessons, seedMedia, seedNews, seedNewspapers } from '../server/src/db/contentData';
import { createItem, getItem, updateItem } from '../server/src/modules/content/content.repository';
const upsertCollection = (collection: string, items: Array<Record<string, unknown>>) => {
    await Promise.all(items.map(async (item) => {
        const id = String(item.id);
        const existing = await getItem(collection, id);
        if (existing) {
            await updateItem(collection, id, item);
            return;
        }
        await createItem(collection, item);
    }));
};
await initDatabase();
await Promise.all([
    upsertCollection('news', seedNews),
    upsertCollection('newspapers', seedNewspapers),
    upsertCollection('media', seedMedia),
    upsertCollection('lessons', seedLessons),
]);
console.log('Server content synced.');
