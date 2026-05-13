import { Router } from 'express';
import { requireAdmin } from '../../middlewares/requireAdmin';
import { createItem, deleteItem, getItem, listItems, updateItem } from './content.repository';

export function createContentRouter(collection: string) {
  const router = Router();

  router.get('/', async (_req, res) => {
    const items = await listItems(collection);
    res.json(items);
  });

  router.get('/:id', async (req, res) => {
    const item = await getItem(collection, req.params.id);
    if (!item) return res.status(404).json({ message: `${collection} item not found.` });
    res.json(item);
  });

  router.post('/', requireAdmin, async (req, res) => {
    const item = await createItem(collection, req.body);
    res.status(201).json(item);
  });

  router.put('/:id', requireAdmin, async (req, res) => {
    const item = await updateItem(collection, req.params.id, req.body);
    if (!item) return res.status(404).json({ message: `${collection} item not found.` });
    res.json(item);
  });

  router.delete('/:id', requireAdmin, async (req, res) => {
    const deleted = await deleteItem(collection, req.params.id);
    if (!deleted) return res.status(404).json({ message: `${collection} item not found.` });
    res.status(204).send();
  });

  return router;
}
