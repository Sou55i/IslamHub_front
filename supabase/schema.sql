-- =====================================================
-- Schema Supabase pour IslamHub
-- =====================================================
-- Ce fichier contient la structure de la base de données
-- à importer dans Supabase
-- =====================================================

-- =====================================================
-- Table: types
-- Classification des contenus (hadith, coran, dhikr, etc.)
-- =====================================================
CREATE TABLE IF NOT EXISTS types (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE,
  description TEXT
);

-- Insérer les types de base
INSERT INTO types (id, nom, description) VALUES
  (1, 'hadith', 'Paroles du Prophète (ﷺ)'),
  (2, 'coran', 'Versets du Coran'),
  (3, 'douaa', 'Invocations'),
  (4, 'dhikr', 'Évocations/Rappels'),
  (5, 'savant', 'Citations de savants');

-- =====================================================
-- Table: hadiths
-- =====================================================
CREATE TABLE IF NOT EXISTS hadiths (
  id SERIAL PRIMARY KEY,
  sujet VARCHAR(255) NOT NULL,
  rapporteur VARCHAR(100),
  narrateur VARCHAR(100),
  statut VARCHAR(50),
  texte_arabe TEXT NOT NULL,
  texte_francais TEXT,
  phonetique TEXT,
  explication TEXT,
  type_id INTEGER REFERENCES types(id) DEFAULT 1,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour la recherche full-text
CREATE INDEX IF NOT EXISTS hadiths_texte_arabe_idx ON hadiths USING gin(to_tsvector('arabic', texte_arabe));
CREATE INDEX IF NOT EXISTS hadiths_texte_francais_idx ON hadiths USING gin(to_tsvector('french', COALESCE(texte_francais, '')));
CREATE INDEX IF NOT EXISTS hadiths_tag_idx ON hadiths USING gin(to_tsvector('french', COALESCE(tag, '')));
CREATE INDEX IF NOT EXISTS hadiths_sujet_idx ON hadiths(sujet);
CREATE INDEX IF NOT EXISTS hadiths_rapporteur_idx ON hadiths(rapporteur);

-- =====================================================
-- Table: coran
-- =====================================================
CREATE TABLE IF NOT EXISTS coran (
  id SERIAL PRIMARY KEY,
  sujet VARCHAR(255) NOT NULL,
  sourate VARCHAR(100),
  texte_arabe TEXT NOT NULL,
  texte_francais TEXT,
  phonetique TEXT,
  explication TEXT,
  type_id INTEGER REFERENCES types(id) DEFAULT 2,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour la recherche
CREATE INDEX IF NOT EXISTS coran_texte_arabe_idx ON coran USING gin(to_tsvector('arabic', texte_arabe));
CREATE INDEX IF NOT EXISTS coran_sourate_idx ON coran(sourate);
CREATE INDEX IF NOT EXISTS coran_tag_idx ON coran USING gin(to_tsvector('french', COALESCE(tag, '')));

-- =====================================================
-- Table: dhikrs
-- =====================================================
CREATE TABLE IF NOT EXISTS dhikrs (
  id SERIAL PRIMARY KEY,
  sujet VARCHAR(255) NOT NULL,
  texte_arabe TEXT NOT NULL,
  texte_francais TEXT,
  phonetique TEXT,
  explication TEXT,
  commentaire TEXT,
  type_id INTEGER REFERENCES types(id) DEFAULT 4,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS dhikrs_tag_idx ON dhikrs USING gin(to_tsvector('french', COALESCE(tag, '')));

-- =====================================================
-- Table: douaas
-- =====================================================
CREATE TABLE IF NOT EXISTS douaas (
  id SERIAL PRIMARY KEY,
  sujet VARCHAR(255) NOT NULL,
  texte_arabe TEXT NOT NULL,
  texte_francais TEXT,
  phonetique TEXT,
  explication TEXT,
  commentaire TEXT,
  type_id INTEGER REFERENCES types(id) DEFAULT 3,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS douaas_tag_idx ON douaas USING gin(to_tsvector('french', COALESCE(tag, '')));

-- =====================================================
-- Table: savants
-- =====================================================
CREATE TABLE IF NOT EXISTS savants (
  id SERIAL PRIMARY KEY,
  sujet VARCHAR(255) NOT NULL,
  savant VARCHAR(100) NOT NULL,
  texte_arabe TEXT NOT NULL,
  texte_francais TEXT,
  phonetique TEXT,
  explication TEXT,
  type_id INTEGER REFERENCES types(id) DEFAULT 5,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS savants_savant_idx ON savants(savant);
CREATE INDEX IF NOT EXISTS savants_tag_idx ON savants USING gin(to_tsvector('french', COALESCE(tag, '')));

-- =====================================================
-- Row Level Security (RLS) - Lecture publique
-- =====================================================

-- Activer RLS sur toutes les tables
ALTER TABLE hadiths ENABLE ROW LEVEL SECURITY;
ALTER TABLE coran ENABLE ROW LEVEL SECURITY;
ALTER TABLE dhikrs ENABLE ROW LEVEL SECURITY;
ALTER TABLE douaas ENABLE ROW LEVEL SECURITY;
ALTER TABLE savants ENABLE ROW LEVEL SECURITY;
ALTER TABLE types ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique (tout le monde peut lire)
CREATE POLICY "Lecture publique hadiths" ON hadiths FOR SELECT USING (true);
CREATE POLICY "Lecture publique coran" ON coran FOR SELECT USING (true);
CREATE POLICY "Lecture publique dhikrs" ON dhikrs FOR SELECT USING (true);
CREATE POLICY "Lecture publique douaas" ON douaas FOR SELECT USING (true);
CREATE POLICY "Lecture publique savants" ON savants FOR SELECT USING (true);
CREATE POLICY "Lecture publique types" ON types FOR SELECT USING (true);

-- =====================================================
-- Fonctions utilitaires
-- =====================================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_hadiths_updated_at BEFORE UPDATE ON hadiths
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coran_updated_at BEFORE UPDATE ON coran
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dhikrs_updated_at BEFORE UPDATE ON dhikrs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_douaas_updated_at BEFORE UPDATE ON douaas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_savants_updated_at BEFORE UPDATE ON savants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Vue pour recherche unifiée (optionnel)
-- =====================================================
CREATE OR REPLACE VIEW all_texts AS
SELECT
  id,
  'hadith' as type,
  sujet,
  texte_arabe,
  texte_francais,
  phonetique,
  explication,
  tag,
  rapporteur as source,
  NULL as sourate,
  NULL as savant_name,
  NULL as commentaire
FROM hadiths
UNION ALL
SELECT
  id,
  'coran' as type,
  sujet,
  texte_arabe,
  texte_francais,
  phonetique,
  explication,
  tag,
  NULL as source,
  sourate,
  NULL as savant_name,
  NULL as commentaire
FROM coran
UNION ALL
SELECT
  id,
  'dhikr' as type,
  sujet,
  texte_arabe,
  texte_francais,
  phonetique,
  explication,
  tag,
  NULL as source,
  NULL as sourate,
  NULL as savant_name,
  commentaire
FROM dhikrs
UNION ALL
SELECT
  id,
  'douaa' as type,
  sujet,
  texte_arabe,
  texte_francais,
  phonetique,
  explication,
  tag,
  NULL as source,
  NULL as sourate,
  NULL as savant_name,
  commentaire
FROM douaas
UNION ALL
SELECT
  id,
  'savant' as type,
  sujet,
  texte_arabe,
  texte_francais,
  phonetique,
  explication,
  tag,
  NULL as source,
  NULL as sourate,
  savant as savant_name,
  NULL as commentaire
FROM savants;
