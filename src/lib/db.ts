import Database from 'better-sqlite3';
import path from 'path';
import type { Site, SiteFormData } from './types';

const DB_PATH = process.env.DATABASE_PATH || './data/f2f-monitor.db';

function getDb(): Database.Database {
  const globalAny = globalThis as typeof globalThis & { __db?: Database.Database };

  if (!globalAny.__db) {
    const dbPath = path.resolve(DB_PATH);
    globalAny.__db = new Database(dbPath);
    globalAny.__db.pragma('journal_mode = WAL');

    globalAny.__db.exec(`
      CREATE TABLE IF NOT EXISTS sites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        token TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `);
  }

  return globalAny.__db;
}

export function getAllSites(): Site[] {
  const db = getDb();
  return db.prepare('SELECT * FROM sites ORDER BY name ASC').all() as Site[];
}

export function getSiteById(id: number): Site | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM sites WHERE id = ?').get(id) as Site | undefined;
}

export function createSite(data: SiteFormData): Site {
  const db = getDb();
  const url = data.url.replace(/\/+$/, '');
  const stmt = db.prepare(
    'INSERT INTO sites (name, url, token) VALUES (?, ?, ?)'
  );
  const result = stmt.run(data.name, url, data.token);
  return getSiteById(result.lastInsertRowid as number) as Site;
}

export function updateSite(id: number, data: Partial<SiteFormData>): Site | undefined {
  const db = getDb();
  const site = getSiteById(id);
  if (!site) return undefined;

  const name = data.name ?? site.name;
  const url = data.url ? data.url.replace(/\/+$/, '') : site.url;
  const token = data.token ?? site.token;

  db.prepare(
    "UPDATE sites SET name = ?, url = ?, token = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(name, url, token, id);

  return getSiteById(id);
}

export function deleteSite(id: number): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM sites WHERE id = ?').run(id);
  return result.changes > 0;
}
