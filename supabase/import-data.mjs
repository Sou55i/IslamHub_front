/**
 * Script d'import des données JSON vers Supabase
 * Usage: node supabase/import-data.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration Supabase
const SUPABASE_URL = 'https://mqtkoisepnazsrvlbzdw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xdGtvaXNlcG5henNydmxiemR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NzkxMzYsImV4cCI6MjA4NTI1NTEzNn0.jG4vVRFGV7NWx71eoCtUYl3xRSRY_IT6u1iqz1WSdMo';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Charger les fichiers JSON
function loadJSON(filename) {
  const path = join(__dirname, '..', 'src', 'data', filename);
  const content = readFileSync(path, 'utf-8');
  return JSON.parse(content);
}

async function importTable(tableName, data) {
  console.log(`\n📥 Import ${tableName}... (${data.length} éléments)`);

  // Supprimer les IDs pour laisser Supabase les générer
  const cleanData = data.map(item => {
    const { id, ...rest } = item;
    return rest;
  });

  // Import par lots de 100
  const batchSize = 100;
  let imported = 0;

  for (let i = 0; i < cleanData.length; i += batchSize) {
    const batch = cleanData.slice(i, i + batchSize);
    const { error } = await supabase.from(tableName).insert(batch);

    if (error) {
      console.error(`❌ Erreur ${tableName}:`, error.message);
      return false;
    }

    imported += batch.length;
    process.stdout.write(`   ${imported}/${cleanData.length} importés\r`);
  }

  console.log(`✅ ${tableName}: ${imported} éléments importés`);
  return true;
}

async function main() {
  console.log('🚀 Import des données vers Supabase...\n');
  console.log(`URL: ${SUPABASE_URL}`);

  // Charger les données
  const hadiths = loadJSON('hadith.json');
  const coran = loadJSON('coran.json');
  const dhikrs = loadJSON('dhikr.json');
  const douaas = loadJSON('douaa.json');
  const savants = loadJSON('savant.json');

  // Importer chaque table
  await importTable('hadiths', hadiths);
  await importTable('coran', coran);
  await importTable('dhikrs', dhikrs);
  await importTable('douaas', douaas);
  await importTable('savants', savants);

  console.log('\n✨ Import terminé !');
}

main().catch(console.error);
