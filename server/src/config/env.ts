import 'dotenv/config';

export const env = {
  apiPort: Number(process.env.API_PORT || 4000),
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  adminToken: process.env.ADMIN_TOKEN || 'admin123',
  databaseUrl: process.env.DATABASE_URL || '',
  pgSslMode: process.env.PGSSLMODE || '',
};
