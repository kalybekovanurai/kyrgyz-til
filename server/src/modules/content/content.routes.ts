import { Router } from 'express';
import { requireAdmin } from '../../middlewares/requireAdmin';
import { createItem, deleteItem, getItem, listItems, updateItem } from './content.repository';
export const createContentRouter = (collection: string) => {
    const router = Router();
    router.get('/', async (_req, res) => {
        try {
            const items = await listItems(collection);
            res.json(items);
        }
        catch (error) {
            console.warn(`Failed to list ${collection}:`, error);
            res.json([]);
        }
    });
    router.get('/:id', async (req, res) => {
        try {
            const item = await getItem(collection, req.params.id);
            if (!item)
                return res.status(404).json({ message: `${collection} item not found.` });
            res.json(item);
        }
        catch (error) {
            console.warn(`Failed to get ${collection} item ${req.params.id}:`, error);
            res.status(500).json({ message: 'Database unavailable.' });
        }
    });
    router.post('/', requireAdmin, async (req, res) => {
        try {
            const item = await createItem(collection, req.body);
            res.status(201).json(item);
        }
        catch (error) {
            console.warn(`Failed to create ${collection} item:`, error);
            res.status(500).json({ message: 'Database unavailable.' });
        }
    });
    router.put('/:id', requireAdmin, async (req, res) => {
        try {
            const item = await updateItem(collection, req.params.id, req.body);
            if (!item)
                return res.status(404).json({ message: `${collection} item not found.` });
            res.json(item);
        }
        catch (error) {
            console.warn(`Failed to update ${collection} item ${req.params.id}:`, error);
            res.status(500).json({ message: 'Database unavailable.' });
        }
    });
    router.delete('/:id', requireAdmin, async (req, res) => {
        try {
            const deleted = await deleteItem(collection, req.params.id);
            if (!deleted)
                return res.status(404).json({ message: `${collection} item not found.` });
            res.status(204).send();
        }
        catch (error) {
            console.warn(`Failed to delete ${collection} item ${req.params.id}:`, error);
            res.status(500).json({ message: 'Database unavailable.' });
        }
    });
    return router;
};
