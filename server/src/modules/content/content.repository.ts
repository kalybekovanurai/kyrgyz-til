import { QueryResultRow } from 'pg';
import { query } from '../../db/pool';
import { createId, Entity } from '../../shared/entity';
import { CollectionConfig, getCollectionConfig } from './content.config';

function toEntity(row: QueryResultRow, config: CollectionConfig): Entity {
  const entity: Entity = {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  for (const [apiKey, dbKey] of Object.entries(config.fields)) {
    entity[apiKey] = row[dbKey];
  }

  return entity;
}

function valuesFromPayload(payload: Record<string, unknown>, config: CollectionConfig) {
  return Object.entries(config.fields)
    .filter(([apiKey]) => payload[apiKey] !== undefined)
    .map(([apiKey, dbKey]) => ({ apiKey, dbKey, value: payload[apiKey] }));
}

export async function listItems(collection: string) {
  const config = getCollectionConfig(collection);
  const result = await query<QueryResultRow>(`SELECT * FROM ${config.table} ORDER BY created_at DESC`);
  return result.rows.map((row) => toEntity(row as QueryResultRow, config));
}

export async function getItem(collection: string, id: string) {
  const config = getCollectionConfig(collection);
  const result = await query<QueryResultRow>(`SELECT * FROM ${config.table} WHERE id = $1`, [id]);
  const row = result.rows[0] as QueryResultRow | undefined;
  return row ? toEntity(row, config) : null;
}

export async function createItem(collection: string, payload: Record<string, unknown>) {
  const config = getCollectionConfig(collection);
  const id = String(payload.id || createId(config.prefix));
  const entries = valuesFromPayload(payload, config);
  const columns = ['id', ...entries.map((entry) => entry.dbKey)];
  const values = [id, ...entries.map((entry) => entry.value)];
  const params = values.map((_, index) => `$${index + 1}`).join(', ');

  const result = await query<QueryResultRow>(
    `INSERT INTO ${config.table} (${columns.join(', ')})
     VALUES (${params})
     RETURNING *`,
    values,
  );

  return toEntity(result.rows[0] as QueryResultRow, config);
}

export async function updateItem(collection: string, id: string, payload: Record<string, unknown>) {
  const config = getCollectionConfig(collection);
  const entries = valuesFromPayload(payload, config);
  const assignments = entries.map((entry, index) => `${entry.dbKey} = $${index + 2}`);
  assignments.push('updated_at = NOW()');

  const result = await query<QueryResultRow>(
    `UPDATE ${config.table}
     SET ${assignments.join(', ')}
     WHERE id = $1
     RETURNING *`,
    [id, ...entries.map((entry) => entry.value)],
  );

  const row = result.rows[0] as QueryResultRow | undefined;
  return row ? toEntity(row, config) : null;
}

export async function deleteItem(collection: string, id: string) {
  const config = getCollectionConfig(collection);
  const result = await query<QueryResultRow>(`DELETE FROM ${config.table} WHERE id = $1 RETURNING id`, [id]);
  return (result.rowCount ?? 0) > 0;
}
