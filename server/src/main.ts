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
  const { initDatabase } = await import('./db/schema');
  const { seedData } = await import('./db/seed');
  await initDatabase();
  await seedData();
} else {
  console.log('Current DATABASE_URL:', env.databaseUrl ? '[REDACTED]' : '<EMPTY>');
  console.log('DATABASE_URL not configured — skipping database initialization and seeding.');
}

const app = createApp();

app.listen(env.apiPort, () => {
  console.log(`API running on http://localhost:${env.apiPort}`);
  console.log(`Swagger docs: http://localhost:${env.apiPort}/docs`);
  console.log(`Admin login password: ${env.adminPassword}`);
});
