const { neon } = require('@neondatabase/serverless');
const fs = require('fs');

async function migrate() {
  console.log('Starting migration from SQLite to Neon PostgreSQL...\n');

  // 1. Read exported data from JSON
  const sitesData = JSON.parse(
    fs.readFileSync('./data/backups/pre-postgres-migration/sites-export.json', 'utf8')
  );
  console.log(`Found ${sitesData.length} sites in backup JSON`);

  // 2. Connect to Neon
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const sql = neon(process.env.DATABASE_URL);
  console.log('Connected to Neon PostgreSQL');

  // 3. Create table
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
  console.log('Table created successfully\n');

  // 4. Check if data already exists
  const existing = await sql`SELECT COUNT(*) as count FROM sites`;
  if (existing[0].count > 0) {
    console.log(`⚠️  Warning: ${existing[0].count} sites already exist in PostgreSQL`);
    console.log('Migration will skip existing records (ON CONFLICT DO NOTHING)\n');
  }

  // 5. Migrate data
  console.log('Migrating sites:');
  for (const site of sitesData) {
    await sql`
      INSERT INTO sites (id, name, url, token, created_at, updated_at)
      VALUES (
        ${site.id},
        ${site.name},
        ${site.url},
        ${site.token},
        ${site.created_at},
        ${site.updated_at}
      )
      ON CONFLICT (id) DO NOTHING
    `;
    console.log(`  ✓ [${site.id}] ${site.name}`);
  }

  // 6. Update sequence to continue from max id
  if (sitesData.length > 0) {
    const maxId = Math.max(...sitesData.map(s => s.id));
    await sql`SELECT setval('sites_id_seq', ${maxId}, true)`;
    console.log(`\nSequence updated: next ID will be ${maxId + 1}`);
  }

  // 7. Verify migration
  const finalCount = await sql`SELECT COUNT(*) as count FROM sites`;
  console.log(`\n✅ Migration completed successfully!`);
  console.log(`Total sites in PostgreSQL: ${finalCount[0].count}`);
}

migrate().catch(error => {
  console.error('\n❌ Migration failed:', error);
  process.exit(1);
});
