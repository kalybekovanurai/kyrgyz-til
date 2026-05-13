import cors from 'cors';
import express from 'express';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import { openApiSpec } from './docs/openapi';
import { errorHandler } from './middlewares/errorHandler';
import { authRouter } from './modules/auth/auth.routes';
import { healthRouter } from './modules/health/health.routes';
import { lessonsRouter } from './modules/lessons/lessons.routes';
import { mediaRouter } from './modules/media/media.routes';
import { newsRouter } from './modules/news/news.routes';
import { newspapersRouter } from './modules/newspapers/newspapers.routes';
import { uploadsRouter } from './modules/uploads/uploads.routes';

export function createApp() {
  const app = express();

  app.use(cors({ origin: true }));
  app.use(express.json({ limit: '2mb' }));
  app.use('/uploads', express.static(path.resolve('server', 'uploads')));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
  app.get('/openapi.json', (_req, res) => res.json(openApiSpec));

  app.use('/api/health', healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/news', newsRouter);
  app.use('/api/newspapers', newspapersRouter);
  app.use('/api/media', mediaRouter);
  app.use('/api/lessons', lessonsRouter);
  app.use('/api/uploads', uploadsRouter);

  app.use(errorHandler);

  return app;
}
