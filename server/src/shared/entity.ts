import { mkdir } from 'node:fs/promises';
import path from 'node:path';
export type Entity = {
    id: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: unknown;
};
export const createId = (prefix: string) => {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
};
export const ensureUploadDir = async () => {
    await mkdir(path.resolve('server', 'uploads'), { recursive: true });
};
