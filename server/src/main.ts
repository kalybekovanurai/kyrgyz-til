import { env } from './config/env';
import { initDatabase } from './db/schema';
import { seedData } from './db/seed';
import { ensureUploadDir } from './shared/entity';
import { createApp } from './app';

await ensureUploadDir();
if (env.databaseUrl) {
  await initDatabase();
  await seedData();
} else {
  console.log('DATABASE_URL not configured — skipping database initialization and seeding.');
}

const app = createApp();

app.listen(env.apiPort, () => {
  console.log(`API running on http://localhost:${env.apiPort}`);
  console.log(`Swagger docs: http://localhost:${env.apiPort}/docs`);
  console.log(`Admin login password: ${env.adminPassword}`);
});
