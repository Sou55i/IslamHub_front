import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import hadithsData from '../data/hadith.json';

interface Hadith {
  id: number;
  sujet: string;
  raporteur: string;
  narrateur: string | null;
  statut: string | null;
  texte_arabe: string;
  texte_francais: string | null;
  phonetique: string | null;
  explication: string | null;
  tag: string;
}

export const Hadiths: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [filteredHadiths, setFilteredHadiths] = useState<Hadith[]>([]);

  const topics = [
    'Sahih Al Bukhari',
    'Sahih Muslim',
    'رياض الصالحين',
    'كتاب ذكر الموت',
    'الأربعون في التصوف',
    'المنتقى من صحيح مسلم',
    'Croyance',
    'Salat',
    'Jeûne',
    'Zakat',
    'Mariage',
    'Ventes',
    'Famille'
  ];

  const handleTopicClick = (topic: string) => {
    switch (topic) {
      case 'Sahih Al Bukhari':
        navigate('/hadith/albukhari');
        break;
      case 'Sahih Muslim':
        navigate('/hadith/muslim');
        break;
      case 'رياض الصالحين':
        navigate('/hadith/riyadhassalihin');
        break;
      case 'كتاب ذكر الموت':
        navigate('/hadith/dhikralmout');
        break;
      case 'الأربعون في التصوف':
        navigate('/hadith/arbaoune-tasawwuf');
        break;
      case 'المنتقى من صحيح مسلم':
        navigate('/hadith/montaqa-sahihmuslim');
        break;
      case 'Croyance':
        navigate('/hadith/croyance');
        break;
      case 'Salat':
        navigate('/hadith/salat');
        break;
      case 'Jeûne':
        navigate('/hadith/jeune');
        break;
      case 'Zakat':
        navigate('/hadith/zakat');
        break;
      case 'Mariage':
        navigate('/hadith/mariage');
        break;
      case 'Ventes':
        navigate('/hadith/ventes');
        break;
      case 'Famille':
        navigate('/hadith/famille');
        break;
      default:
        console.warn(`Aucune route définie pour le thème : ${topic}`);
        break;
    }
  };

  useEffect(() => {
    const tags = new Set<string>();
    hadithsData.forEach(hadith => {
      hadith.tag.split(',').forEach(tag => tags.add(tag.trim()));
    });
    setAllTags(Array.from(tags));
  }, []);

  useEffect(() => {
    let results = hadithsData;
    const term = searchTerm.toLowerCase();

    if (searchTerm) {
      results = results.filter(hadith =>
        hadith.texte_arabe.includes(searchTerm) ||
        hadith.texte_francais?.toLowerCase().includes(term) ||
        hadith.explication?.toLowerCase().includes(term) ||
        hadith.sujet.toLowerCase().includes(term)
      );
    }

    if (selectedTag) {
      results = results.filter(hadith =>
        hadith.tag.split(',').map(t => t.trim().toLowerCase()).includes(selectedTag.toLowerCase())
      );
    }

    setFilteredHadiths(results);
  }, [searchTerm, selectedTag]);

  return (
    <div className="space-y-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Grille de topics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {topics.map((topic, i) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="cursor-pointer bg-emerald-50 dark:bg-emerald-900 hover:bg-emerald-100 dark:hover:bg-emerald-800 text-center rounded-lg py-3 px-2 text-sm text-emerald-800 dark:text-emerald-200 shadow"
              onClick={() => handleTopicClick(topic)}
            >
              {topic}
            </motion.div>
          ))}
        </div>

        {/* Recherche + filtre tag */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Rechercher des hadiths..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <select
                className="flex items-center justify-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors cursor-pointer appearance-none pr-8"
                value={selectedTag || ''}
                onChange={(e) => setSelectedTag(e.target.value || null)}
              >
                <option value="">Tous les tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-2.5 h-5 w-5 pointer-events-none" />
            </div>
          </div>

          {selectedTag && (
            <div className="mt-3 flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Filtre actif :</span>
              <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded text-sm">
                {selectedTag}
                <button 
                  onClick={() => setSelectedTag(null)}
                  className="ml-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200"
                >
                  &times;
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Résultats de recherche */}
        <div className="mt-8">
          {filteredHadiths.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                Aucun hadith trouvé avec ces critères de recherche.
              </p>
            </div>
          ) : (
            <div className="space-y-6 font-arabic">
              {filteredHadiths.map((hadith, index) => (
  <motion.div
    key={hadith.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.03 }}
    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
  >
    {hadith.sujet && (
      <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
        Sujet : {hadith.sujet}
      </p>
    )}

    {hadith.raporteur && (
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        Rapporteur : {hadith.raporteur}
      </p>
    )}

    {hadith.narrateur && (
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        Narrateur : {hadith.narrateur}
      </p>
    )}

    {hadith.statut && (
      <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-2">
        Statut : {hadith.statut}
      </p>
    )}

    <p className="text-lg text-gray-900 dark:text-white mb-2 whitespace-pre-wrap">
      {hadith.texte_arabe}
    </p>
     
     {hadith.phonetique && (
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 italic">
        {hadith.phonetique}
      </p>
    )}

    {hadith.texte_francais && (
      <p className="text-gray-700 dark:text-gray-300 mb-2"><i>Ce qui signifie:</i> {hadith.texte_francais}</p>
    )}

   

    {hadith.explication && (
      <p className="text-gray-700 dark:text-gray-300"><i>Explication:</i> {hadith.explication}</p>
    )}

    <div className="flex flex-wrap gap-2 mt-3">
      {hadith.tag.split(',').map(tag => (
        <span
          key={tag}
          className="text-xs bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded cursor-pointer"
          onClick={() => setSelectedTag(tag.trim())}
        >
          {tag.trim()}
        </span>
      ))}
    </div>
  </motion.div>
))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};