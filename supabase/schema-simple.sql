-- =====================================================
-- Schema Supabase pour IslamHub (version simplifiée)
-- =====================================================

-- Table: hadiths
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
  type_id INTEGER DEFAULT 1,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: coran
CREATE TABLE IF NOT EXISTS coran (
  id SERIAL PRIMARY KEY,
  sujet VARCHAR(255) NOT NULL,
  sourate VARCHAR(100),
  texte_arabe TEXT NOT NULL,
  texte_francais TEXT,
  phonetique TEXT,
  explication TEXT,
  type_id INTEGER DEFAULT 2,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: dhikrs
CREATE TABLE IF NOT EXISTS dhikrs (
  id SERIAL PRIMARY KEY,
  sujet VARCHAR(255) NOT NULL,
  texte_arabe TEXT NOT NULL,
  texte_francais TEXT,
  phonetique TEXT,
  explication TEXT,
  commentaire TEXT,
  type_id INTEGER DEFAULT 4,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: douaas
CREATE TABLE IF NOT EXISTS douaas (
  id SERIAL PRIMARY KEY,
  sujet VARCHAR(255) NOT NULL,
  texte_arabe TEXT NOT NULL,
  texte_francais TEXT,
  phonetique TEXT,
  explication TEXT,
  commentaire TEXT,
  type_id INTEGER DEFAULT 3,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: savants
CREATE TABLE IF NOT EXISTS savants (
  id SERIAL PRIMARY KEY,
  sujet VARCHAR(255) NOT NULL,
  savant VARCHAR(100) NOT NULL,
  texte_arabe TEXT NOT NULL,
  texte_francais TEXT,
  phonetique TEXT,
  explication TEXT,
  type_id INTEGER DEFAULT 5,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security - Lecture publique
ALTER TABLE hadiths ENABLE ROW LEVEL SECURITY;
ALTER TABLE coran ENABLE ROW LEVEL SECURITY;
ALTER TABLE dhikrs ENABLE ROW LEVEL SECURITY;
ALTER TABLE douaas ENABLE ROW LEVEL SECURITY;
ALTER TABLE savants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read hadiths" ON hadiths FOR SELECT USING (true);
CREATE POLICY "Public read coran" ON coran FOR SELECT USING (true);
CREATE POLICY "Public read dhikrs" ON dhikrs FOR SELECT USING (true);
CREATE POLICY "Public read douaas" ON douaas FOR SELECT USING (true);
CREATE POLICY "Public read savants" ON savants FOR SELECT USING (true);
