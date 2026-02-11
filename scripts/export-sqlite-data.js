const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database('./data/f2f-monitor.db');
const sites = db.prepare('SELECT * FROM sites').all();

fs.writeFileSync(
  './data/backups/pre-postgres-migration/sites-export.json',
  JSON.stringify(sites, null, 2)
);

console.log(`Exported ${sites.length} sites to JSON`);
sites.forEach(s => console.log(`  - [${s.id}] ${s.name}`));

db.close();
