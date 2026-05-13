import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type Entity = {
  id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
};

const dataDir = path.resolve('server', 'data');

export async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
  await mkdir(path.resolve('server', 'uploads'), { recursive: true });
}

function filePath(collection: string) {
  return path.join(dataDir, `${collection}.json`);
}

export async function readCollection<T extends Entity>(collection: string): Promise<T[]> {
  await ensureDataDir();
  try {
    const raw = await readFile(filePath(collection), 'utf8');
    return JSON.parse(raw) as T[];
  } catch (error: any) {
    if (error?.code === 'ENOENT') {
      await writeCollection(collection, []);
      return [];
    }
    throw error;
  }
}

export async function writeCollection<T extends Entity>(collection: string, items: T[]) {
  await ensureDataDir();
  await writeFile(filePath(collection), JSON.stringify(items, null, 2), 'utf8');
}

export function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function withTimestamps<T extends Record<string, unknown>>(payload: T, existing?: Entity) {
  const now = new Date().toISOString();
  return {
    ...payload,
    id: existing?.id || String(payload.id || createId('item')),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}

