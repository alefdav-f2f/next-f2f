import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import type { Site, SiteFormData } from './types';

let sql: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (!sql) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    sql = neon(connectionString);
  }
  return sql;
}

// Initialize table on first connection
let initialized = false;
async function ensureInitialized(): Promise<void> {
  if (initialized) return;

  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS sites (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      url VARCHAR(2048) NOT NULL,
      token VARCHAR(512) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_sites_name ON sites(name)`;

  initialized = true;
}

export async function getAllSites(): Promise<Site[]> {
  await ensureInitialized();
  const sql = getSql();
  const result = await sql`SELECT * FROM sites ORDER BY name ASC`;
  return result as Site[];
}

export async function getSiteById(id: number): Promise<Site | undefined> {
  await ensureInitialized();
  const sql = getSql();
  const result = await sql`SELECT * FROM sites WHERE id = ${id}`;
  return result[0] as Site | undefined;
}

export async function createSite(data: SiteFormData): Promise<Site> {
  await ensureInitialized();
  const sql = getSql();
  const url = data.url.replace(/\/+$/, '');

  const result = await sql`
    INSERT INTO sites (name, url, token)
    VALUES (${data.name}, ${url}, ${data.token})
    RETURNING *
  `;

  return result[0] as Site;
}

export async function updateSite(
  id: number,
  data: Partial<SiteFormData>
): Promise<Site | undefined> {
  await ensureInitialized();
  const sql = getSql();

  const site = await getSiteById(id);
  if (!site) return undefined;

  const name = data.name ?? site.name;
  const url = data.url ? data.url.replace(/\/+$/, '') : site.url;
  const token = data.token ?? site.token;

  const result = await sql`
    UPDATE sites
    SET name = ${name},
        url = ${url},
        token = ${token},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;

  return result[0] as Site | undefined;
}

export async function deleteSite(id: number): Promise<boolean> {
  await ensureInitialized();
  const sql = getSql();
  const result = await sql`DELETE FROM sites WHERE id = ${id}`;
  return result.count > 0;
}
