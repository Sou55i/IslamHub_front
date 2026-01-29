# Guide de Migration vers Supabase

## 1. Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un compte gratuit
3. Créer un nouveau projet
4. Noter les informations de connexion:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon Key**: `eyJhbG...` (clé publique)

## 2. Importer le schema

1. Aller dans **SQL Editor** dans le dashboard Supabase
2. Coller le contenu de `schema.sql`
3. Exécuter le script

## 3. Importer les données

### Option A: Via l'interface Supabase

1. Aller dans **Table Editor**
2. Pour chaque table, cliquer sur **Insert** > **Import from CSV**
3. Convertir vos fichiers JSON en CSV

### Option B: Via le script Node.js

Créer un fichier `import-data.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');

// Remplacer par vos valeurs
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbG...'; // Service key (pas anon key!)

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Importer les données
const hadithsData = require('../src/data/hadith.json');
const coranData = require('../src/data/coran.json');
const dhikrData = require('../src/data/dhikr.json');
const douaaData = require('../src/data/douaa.json');
const savantData = require('../src/data/savant.json');

async function importData() {
  console.log('Importing hadiths...');
  const { error: hadithError } = await supabase
    .from('hadiths')
    .insert(hadithsData);
  if (hadithError) console.error('Hadith error:', hadithError);
  else console.log('Hadiths imported!');

  console.log('Importing coran...');
  const { error: coranError } = await supabase
    .from('coran')
    .insert(coranData);
  if (coranError) console.error('Coran error:', coranError);
  else console.log('Coran imported!');

  console.log('Importing dhikrs...');
  const { error: dhikrError } = await supabase
    .from('dhikrs')
    .insert(dhikrData);
  if (dhikrError) console.error('Dhikr error:', dhikrError);
  else console.log('Dhikrs imported!');

  console.log('Importing douaas...');
  const { error: douaaError } = await supabase
    .from('douaas')
    .insert(douaaData);
  if (douaaError) console.error('Douaa error:', douaaError);
  else console.log('Douaas imported!');

  console.log('Importing savants...');
  const { error: savantError } = await supabase
    .from('savants')
    .insert(savantData);
  if (savantError) console.error('Savant error:', savantError);
  else console.log('Savants imported!');

  console.log('Done!');
}

importData();
```

Exécuter:
```bash
npm install @supabase/supabase-js
node supabase/import-data.js
```

## 4. Configurer l'application

1. Installer le client Supabase:
```bash
npm install @supabase/supabase-js
```

2. Créer le fichier de configuration `.env`:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

3. Modifier `src/services/DataService.ts`:
   - Changer `USE_LOCAL_DATA = false`
   - Implémenter les appels Supabase

## 5. Exemple d'utilisation Supabase

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Récupérer les hadiths avec pagination
const { data, error, count } = await supabase
  .from('hadiths')
  .select('*', { count: 'exact' })
  .range(0, 19) // 20 premiers
  .order('id');

// Recherche
const { data: searchResults } = await supabase
  .from('hadiths')
  .select('*')
  .or(`texte_arabe.ilike.%${term}%,texte_francais.ilike.%${term}%`);

// Filtrer par tag
const { data: tagResults } = await supabase
  .from('hadiths')
  .select('*')
  .ilike('tag', `%${tag}%`);
```

## Avantages de Supabase

- ✅ PostgreSQL gratuit (500MB)
- ✅ API REST automatique
- ✅ Requêtes simples sans SQL
- ✅ Support UTF-8 (arabe/français)
- ✅ Pagination native
- ✅ Temps réel (optionnel)
- ✅ Auth intégrée (pour l'admin)

## Structure finale

```
src/
├── services/
│   ├── DataService.ts      # Service abstrait (déjà prêt)
│   └── supabase.ts         # Client Supabase
├── hooks/
│   └── useData.ts          # Hooks React (déjà prêt)
└── types/
    └── index.ts            # Types TypeScript (déjà prêt)
```
