import { createItem, listItems } from '../modules/content/content.repository';
import { seedLessons, seedMedia, seedNews, seedNewspapers } from './contentData';
const seedCollection = async (collection: string, items: Array<Record<string, unknown>>) => {
    const existing = await listItems(collection);
    if (existing.length > 0)
        return;
    await Promise.all(items.map((item) => createItem(collection, item)));
};
export const seedData = async () => {
    await seedCollection('news', seedNews);
    await seedCollection('newspapers', seedNewspapers);
    await seedCollection('media', seedMedia);
    await seedCollection('lessons', seedLessons);
};
