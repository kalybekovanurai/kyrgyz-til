import { Pool } from 'pg';
import { env } from '../config/env';

export const pool = env.databaseUrl
  ? new Pool({
      connectionString: env.databaseUrl,
      ssl: env.pgSslMode === 'require' ? { rejectUnauthorized: false } : undefined,
    })
  : null;

export async function query<T>(text: string, params: unknown[] = []) {
  if (!pool) {
    throw new Error('DATABASE_URL is not configured. Add PostgreSQL connection string to .env.');
  }

  return pool.query<T>(text, params);
}
