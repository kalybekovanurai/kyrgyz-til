import { Router } from 'express';
import { seedSiteSettings } from '../../db/siteSettingsData';
import { createItem, getItem, listItems, updateItem } from '../content/content.repository';
import { requireAdmin } from '../../middlewares/requireAdmin';

export const siteSettingsRouter = Router();

const getFallbackSettings = (id: string) => {
  const item = seedSiteSettings.find((setting) => setting.id === id);
  return item ? { ...item, createdAt: null, updatedAt: null } : null;
};

const getFallbackSettingsList = () => {
  return seedSiteSettings.map((item) => ({ ...item, createdAt: null, updatedAt: null }));
};

siteSettingsRouter.get('/', async (_req, res, next) => {
  try {
    res.json(await listItems('site-settings'));
  } catch (error) {
    console.warn('Failed to load site settings from database. Falling back to seed settings.');
    console.warn(error);
    res.json(getFallbackSettingsList());
  }
});

siteSettingsRouter.get('/:id', async (req, res, next) => {
  try {
    const item = await getItem('site-settings', req.params.id);
    if (!item) {
      res.status(404).json({ message: 'Settings page not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    const fallback = getFallbackSettings(req.params.id);
    if (!fallback) {
      next(error);
      return;
    }
    console.warn(`Failed to load site settings "${req.params.id}" from database. Falling back to seed settings.`);
    console.warn(error);
    res.json(fallback);
  }
});

siteSettingsRouter.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const existing = await getItem('site-settings', req.params.id);
    const payload = { ...req.body, id: req.params.id };
    const saved = existing
      ? await updateItem('site-settings', req.params.id, payload)
      : await createItem('site-settings', payload);
    res.json(saved);
  } catch (error) {
    next(error);
  }
});
