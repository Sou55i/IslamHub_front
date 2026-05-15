import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'src', 'data');

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function generateInserts(tableName, data, columns) {
  let sql = `-- Table: ${tableName}\n`;
  sql += `TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE;\n\n`;

  for (const row of data) {
    const values = columns.map(col => {
      const val = row[col];
      if (val === null || val === undefined) return 'NULL';
      if (typeof val === 'number') return val;
      return escapeSql(val);
    });

    sql += `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
  }

  sql += `\n-- Reset sequence\nSELECT setval('${tableName}_id_seq', (SELECT COALESCE(MAX(id), 1) FROM ${tableName}));\n\n`;
  return sql;
}

// Read JSON files
const hadiths = JSON.parse(fs.readFileSync(path.join(dataDir, 'hadith.json'), 'utf-8'));
const coran = JSON.parse(fs.readFileSync(path.join(dataDir, 'coran.json'), 'utf-8'));
const dhikrs = JSON.parse(fs.readFileSync(path.join(dataDir, 'dhikr.json'), 'utf-8'));
const douaas = JSON.parse(fs.readFileSync(path.join(dataDir, 'douaa.json'), 'utf-8'));
const savants = JSON.parse(fs.readFileSync(path.join(dataDir, 'savant.json'), 'utf-8'));

let output = `-- Generated INSERT statements for Supabase
-- Generated on: ${new Date().toISOString()}
-- Run this in Supabase SQL Editor

`;

// Hadiths - assign sequential IDs to avoid duplicates
const hadithColumns = ['id', 'sujet', 'rapporteur', 'narrateur', 'statut', 'texte_arabe', 'texte_francais', 'phonetique', 'explication', 'tag'];
const hadithsWithIds = hadiths.map((h, i) => ({ ...h, id: i + 1 }));
output += generateInserts('hadiths', hadithsWithIds, hadithColumns);

// Coran - assign sequential IDs
const coranColumns = ['id', 'sujet', 'sourate', 'texte_arabe', 'texte_francais', 'phonetique', 'explication', 'tag'];
const coranWithIds = coran.map((c, i) => ({ ...c, id: i + 1 }));
output += generateInserts('coran', coranWithIds, coranColumns);

// Dhikrs - assign sequential IDs
const dhikrColumns = ['id', 'sujet', 'texte_arabe', 'texte_francais', 'phonetique', 'explication', 'commentaire', 'tag'];
const dhikrsWithIds = dhikrs.map((d, i) => ({ ...d, id: i + 1 }));
output += generateInserts('dhikrs', dhikrsWithIds, dhikrColumns);

// Douaas - assign sequential IDs
const douaaColumns = ['id', 'sujet', 'texte_arabe', 'texte_francais', 'phonetique', 'explication', 'commentaire', 'tag'];
const douaasWithIds = douaas.map((d, i) => ({ ...d, id: i + 1 }));
output += generateInserts('douaas', douaasWithIds, douaaColumns);

// Savants - assign sequential IDs
const savantColumns = ['id', 'sujet', 'savant', 'texte_arabe', 'texte_francais', 'phonetique', 'explication', 'tag'];
const savantsWithIds = savants.map((s, i) => ({ ...s, id: i + 1 }));
output += generateInserts('savants', savantsWithIds, savantColumns);

// Write output
const outputPath = path.join(__dirname, 'insert-all-data.sql');
fs.writeFileSync(outputPath, output, 'utf-8');

console.log(`Generated SQL file: ${outputPath}`);
console.log(`Statistics:`);
console.log(`  - Hadiths: ${hadiths.length} rows`);
console.log(`  - Coran: ${coran.length} rows`);
console.log(`  - Dhikrs: ${dhikrs.length} rows`);
console.log(`  - Douaas: ${douaas.length} rows`);
console.log(`  - Savants: ${savants.length} rows`);
