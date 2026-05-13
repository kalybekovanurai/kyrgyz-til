import { env } from './config/env';
import { initDatabase } from './db/schema';
import { seedData } from './db/seed';
import { ensureUploadDir } from './shared/entity';
import { createApp } from './app';

await ensureUploadDir();
await initDatabase();
await seedData();

const app = createApp();

app.listen(env.apiPort, () => {
  console.log(`API running on http://localhost:${env.apiPort}`);
  console.log(`Swagger docs: http://localhost:${env.apiPort}/docs`);
  console.log(`Admin login password: ${env.adminPassword}`);
});
