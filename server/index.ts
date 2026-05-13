import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import { openApiSpec } from './openapi';
import { seedData } from './seed';
import { createId, ensureDataDir, Entity, readCollection, withTimestamps, writeCollection } from './storage';

const app = express();
const port = Number(process.env.API_PORT || 4000);
const adminToken = process.env.ADMIN_TOKEN || 'admin123';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, path.resolve('server', 'uploads')),
    filename: (_req, file, cb) => {
      const safeName = file.originalname.replace(/[^\w.\-]+/g, '-');
      cb(null, `${Date.now()}-${safeName}`);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

app.use(cors({ origin: true }));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(path.resolve('server', 'uploads')));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.get('/openapi.json', (_req, res) => res.json(openApiSpec));

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-admin-token');
  if (token !== adminToken) {
    return res.status(401).json({ message: 'Admin token is missing or invalid.' });
  }
  next();
}

function publicUrl(req: Request, fileName: string) {
  return `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
}

function collectionRoutes(collection: string, prefix: string) {
  app.get(`/api/${collection}`, async (_req, res) => {
    const items = await readCollection(collection);
    res.json(items);
  });

  app.get(`/api/${collection}/:id`, async (req, res) => {
    const items = await readCollection(collection);
    const item = items.find((entry) => entry.id === req.params.id);
    if (!item) return res.status(404).json({ message: `${collection} item not found.` });
    res.json(item);
  });

  app.post(`/api/${collection}`, requireAdmin, async (req, res) => {
    const items = await readCollection<Entity>(collection);
    const item = withTimestamps({ ...req.body, id: req.body.id || createId(prefix) });
    items.unshift(item);
    await writeCollection(collection, items);
    res.status(201).json(item);
  });

  app.put(`/api/${collection}/:id`, requireAdmin, async (req, res) => {
    const items = await readCollection<Entity>(collection);
    const index = items.findIndex((entry) => entry.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: `${collection} item not found.` });
    const item = withTimestamps({ ...items[index], ...req.body, id: req.params.id }, items[index]);
    items[index] = item;
    await writeCollection(collection, items);
    res.json(item);
  });

  app.delete(`/api/${collection}/:id`, requireAdmin, async (req, res) => {
    const items = await readCollection<Entity>(collection);
    const nextItems = items.filter((entry) => entry.id !== req.params.id);
    if (nextItems.length === items.length) return res.status(404).json({ message: `${collection} item not found.` });
    await writeCollection(collection, nextItems);
    res.status(204).send();
  });
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'kyrgyztil-api',
    docs: `http://localhost:${port}/docs`,
  });
});

app.post('/api/auth/login', (req, res) => {
  if (req.body?.password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid admin password.' });
  }

  res.json({ token: adminToken });
});

app.get('/api/auth/me', requireAdmin, (_req, res) => {
  res.json({ ok: true, role: 'admin' });
});

collectionRoutes('news', 'news');
collectionRoutes('newspapers', 'issue');
collectionRoutes('media', 'media');
collectionRoutes('lessons', 'lesson');

app.post('/api/uploads', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File is required.' });
  res.status(201).json({
    url: publicUrl(req, req.file.filename),
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error.' });
});

await ensureDataDir();
await seedData();

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
  console.log(`Swagger docs: http://localhost:${port}/docs`);
  console.log(`Admin login password: ${adminPassword}`);
});
