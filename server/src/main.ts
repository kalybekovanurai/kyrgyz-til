import { env } from './config/env';
console.log('Startup: DATABASE_URL present?', Boolean(env.databaseUrl));
if (env.databaseUrl) {
  const visible = String(env.databaseUrl).replace(/:\/\/([^:]+):([^@]+)@/, '://$1:[REDACTED]@');
  console.log('DATABASE_URL:', visible);
}
// DB modules are imported dynamically below to avoid connecting on startup when DATABASE_URL is not set
import { ensureUploadDir } from './shared/entity';
import { createApp } from './app';

await ensureUploadDir();
if (env.databaseUrl) {
  try {
    const { initDatabase } = await import('./db/schema');
    const { seedData } = await import('./db/seed');
    await initDatabase();
    await seedData();
  }
  catch (error) {
    console.warn('Database initialization failed; continuing without DB. Admin auth and uploads will still work.');
    console.warn(error);
  }
} else {
  console.log('DATABASE_URL not configured — skipping database initialization and seeding.');
}

const app = createApp();

app.listen(env.apiPort, () => {
  console.log(`API running on http://localhost:${env.apiPort}`);
  console.log(`Swagger docs: http://localhost:${env.apiPort}/docs`);
  console.log(`Admin login password: ${env.adminPassword}`);
});
