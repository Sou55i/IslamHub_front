import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Filter, X, Star, ChevronRight, Loader, Tags, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHadiths} from "../context/HadithProvider.tsx";
import { dataService } from '../services/DataService';
import type { Hadith as HadithType } from '../types';

interface Hadith extends HadithType {
  id: number;
  sujet: string;
  rapporteur: string | null;
  narrateur: string | null;
  statut: string | null;
  texte_arabe: string;
  texte_francais: string | null;
  phonétique: string | null;
  explication: string | null;
  tag: string | null;
}

const TOPIC_ROUTES: Record<string, string> = {
  'Sahih Al Bukhari': '/hadith/albukhari',
  'Sahih Muslim': '/hadith/muslim',
  'رياض الصالحين': '/hadith/riyadhassalihin',
  'كتاب ذكر الموت': '/hadith/dhikralmout',
  'الأربعون في التصوف': '/hadith/arbaoune-tasawwuf',
  'المنتقى من صحيح مسلم': '/hadith/montaqa-sahihmuslim',
  'Croyance': '/hadith/croyance',
  'Salat': '/hadith/salat',
  'Jeûne': '/hadith/jeune',
  'Zakat': '/hadith/zakat',
  'Mariage': '/hadith/mariage',
  'Ventes': '/hadith/ventes',
  'Famille': '/hadith/famille',
};

// Fonction utilitaire pour extraire les tags
const getTagsArray = (tag: string | null): string[] => {
  if (!tag) return [];
  return tag.split(',').map(t => t.trim()).filter(t => t.length > 0);
};

const HadithCard: React.FC<{ hadith: Hadith; onClick: () => void; onTagClick?: (tag: string) => void }> = ({ hadith, onClick, onTagClick }) => {
  const tags = getTagsArray(hadith.tag);

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation(); // Empêche d'ouvrir le modal
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  return (
      <motion.div
          whileHover={{ scale: 1.01 }}
          onClick={onClick}
          className="relative bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-emerald-900 dark:to-amber-900 rounded-2xl p-6 shadow-xl border border-amber-200 dark:border-emerald-800 space-y-4 overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-300 hover:shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100" className="text-amber-500 dark:text-emerald-400">
            <path fill="currentColor" d="M20,20 Q30,10 40,20 T60,20 T80,20 T100,20" className="transform rotate-45" />
          </svg>
        </div>

        {hadith.sujet && (
            <div className="flex items-center">
              <Star className="h-5 w-5 text-amber-500 dark:text-amber-300 mr-2" />
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200 font-amiri">
                {hadith.sujet}
              </h3>
            </div>
        )}

        {hadith.rapporteur && (
            <div className="text-sm text-emerald-700 dark:text-emerald-300 italic">
              Rapporteur: {hadith.rapporteur}
            </div>
        )}

        <div className="bg-white dark:bg-gray-800/80 p-4 rounded-lg border border-amber-100 dark:border-emerald-800 flex-grow">
          <p className="text-2xl text-gray-900 dark:text-white font-arabic leading-loose text-right line-clamp-3">
            {hadith.texte_arabe}
          </p>

          {hadith.texte_francais && (
              <div className="mt-4 pl-4 border-l-4 border-amber-300 dark:border-emerald-600 line-clamp-2">
                <p className="text-sm text-amber-700 dark:text-amber-200 mb-1">Signification :</p>
                <p className="text-gray-700 dark:text-gray-300">{hadith.texte_francais}</p>
              </div>
          )}
        </div>

        {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                  <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => handleTagClick(e, tag)}
                      className="text-xs bg-amber-100 dark:bg-emerald-800 text-amber-800 dark:text-emerald-200 px-3 py-1 rounded-full flex items-center cursor-pointer hover:bg-amber-200 dark:hover:bg-emerald-700 transition-colors"
                  >
                    <Hash className="h-3 w-3 mr-1" />
                    {tag}
                  </motion.span>
              ))}
            </div>
        )}

        <div className="mt-auto pt-4 text-center">
          <button className="text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:underline">
            Lire la suite...
          </button>
        </div>
      </motion.div>
  );
};

const HadithModal: React.FC<{ hadith: Hadith; onClose: () => void; onTagClick?: (tag: string) => void }> = ({ hadith, onClose, onTagClick }) => {
  const tags = getTagsArray(hadith.tag);

  const handleTagClick = (tag: string) => {
    if (onTagClick) {
      onTagClick(tag);
      onClose();
    }
  };

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
      >
        <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        >
          <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 font-amiri">
                  {hadith.sujet}
                </h2>
                {hadith.rapporteur && (
                    <p className="text-emerald-700 dark:text-emerald-400 mt-1">
                      Rapporteur: {hadith.rapporteur}
                    </p>
                )}
                {hadith.narrateur && (
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Narrateur: {hadith.narrateur}
                    </p>
                )}
              </div>

              {hadith.statut && (
                  <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full text-sm">
                  {hadith.statut}
                </span>
              )}
            </div>

            <div className="bg-amber-50 dark:bg-gray-700 p-6 rounded-lg">
              <p className="text-3xl text-gray-900 dark:text-white font-arabic leading-loose text-right">
                {hadith.texte_arabe}
              </p>

              {hadith.phonétique && (
                  <div className="mt-6 bg-white dark:bg-gray-600 p-4 rounded">
                    <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">Phonétique:</p>
                    <p className="text-gray-700 dark:text-gray-200">{hadith.phonétique}</p>
                  </div>
              )}

              {hadith.texte_francais && (
                  <div className="mt-6 pl-4 border-l-4 border-emerald-500">
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-2">Traduction:</p>
                    <p className="text-gray-700 dark:text-gray-300">{hadith.texte_francais}</p>
                  </div>
              )}
            </div>

            {hadith.explication && (
                <div className="mt-6 bg-emerald-50 dark:bg-emerald-900/30 p-6 rounded-lg">
                  <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-3">Explication:</p>
                  <p className="text-gray-700 dark:text-gray-300">{hadith.explication}</p>
                </div>
            )}

            {tags.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-2">
                    <Tags className="h-4 w-4" />
                    Tags associés :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <motion.span
                            key={tag}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleTagClick(tag)}
                            className="cursor-pointer text-xs bg-amber-100 dark:bg-emerald-800 text-amber-800 dark:text-emerald-200 px-3 py-1 rounded-full hover:bg-amber-200 dark:hover:bg-emerald-700 transition-colors"
                        >
                          <Hash className="h-3 w-3 inline mr-1" />
                          {tag}
                        </motion.span>
                    ))}
                  </div>
                </div>
            )}
          </div>
        </motion.div>
      </motion.div>
  );
};

export const Hadiths: React.FC = () => {

  const navigate = useNavigate();
  const [hadithsData, setHadithsData] = useState<Hadith[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [filteredHadiths, setFilteredHadiths] = useState<Hadith[]>([]);
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [tagCounts, setTagCounts] = useState<Map<string, number>>(new Map());

  const topics = Object.keys(TOPIC_ROUTES);

  useEffect(() => {
    loadHadiths();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadHadiths = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await dataService.getHadiths();
      setHadithsData(response.data);
      setFilteredHadiths(response.data);
      // Charger les tags après avoir les hadiths
      loadTagsFromData(response.data);
    } catch (err) {
      console.error('Error loading hadiths:', err);
      setError('Erreur lors du chargement des hadiths. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTagsFromData = (hadiths: Hadith[]) => {
    try {
      const tags = new Set<string>();
      const counts = new Map<string, number>();

      hadiths.forEach(hadith => {
        const tagArray = getTagsArray(hadith.tag);
        tagArray.forEach(tag => {
          tags.add(tag);
          counts.set(tag, (counts.get(tag) || 0) + 1);
        });
      });

      setAllTags(Array.from(tags).sort((a, b) => a.localeCompare(b)));
      setTagCounts(counts);
    } catch (err) {
      console.error('Error loading tags:', err);
    }
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    // Faire défiler jusqu'en haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const searchHadiths = async () => {
      if (!searchTerm.trim() && !selectedTag) {
        setFilteredHadiths(hadithsData);
        return;
      }

      setIsSearching(true);
      try {
        const response = await dataService.searchHadiths(
            searchTerm,
            selectedTag,
            { page: 0, pageSize: 1000 }
        );
        setFilteredHadiths(response.data);
      } catch (err) {
        console.warn('API search failed, falling back to local search:', err);
        let results = [...hadithsData];

        if (selectedTag) {
          const tagToFind = selectedTag.toLowerCase();
          results = results.filter(hadith => {
            const tags = getTagsArray(hadith.tag).map(t => t.toLowerCase());
            return tags.includes(tagToFind);
          });
        }

        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase().trim();
          results = results.filter(hadith =>
              hadith.texte_arabe.toLowerCase().includes(term) ||
              (hadith.texte_francais?.toLowerCase().includes(term)) ||
              (hadith.explication?.toLowerCase().includes(term)) ||
              hadith.sujet.toLowerCase().includes(term) ||
              (hadith.rapporteur?.toLowerCase().includes(term))
          );
        }

        setFilteredHadiths(results);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (hadithsData.length > 0) {
        searchHadiths();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedTag, hadithsData]);

  const handleTopicClick = (topic: string) => {
    const route = TOPIC_ROUTES[topic];
    if (route) {
      navigate(route);
    } else {
      console.warn(`Aucune route définie pour le thème : ${topic}`);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedTag(null);
  };

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-950 flex items-center justify-center">
          <div className="text-center">
            <Loader className="h-12 w-12 text-emerald-600 dark:text-emerald-400 animate-spin mx-auto mb-4" />
            <p className="text-xl text-emerald-800 dark:text-emerald-200 font-amiri">
              Chargement des hadiths...
            </p>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-950 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
              Une erreur est survenue
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
                onClick={loadHadiths}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-950">
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative py-20 bg-emerald-800 dark:bg-emerald-950 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-50 dark:from-gray-900" />

          <div className="relative container mx-auto px-4 text-center">
            <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-5xl md:text-6xl font-bold text-white mb-6 font-amiri"
            >
              Hadiths du Prophète
            </motion.h1>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              Explorez la sagesse prophétique à travers une collection authentique
            </p>
          </div>
        </motion.header>

        <main className="container mx-auto px-4 py-12 -mt-12 relative z-10">
          <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
          >
            <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-6 font-amiri text-center">
              Collections principales
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {topics.map((topic, i) => (
                  <motion.div
                      key={topic}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + Math.min(i, 10) * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="cursor-pointer bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 text-center rounded-xl p-4 shadow-lg border border-emerald-100 dark:border-emerald-800 transition-all"
                      onClick={() => handleTopicClick(topic)}
                  >
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                      <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                      {topic}
                    </span>
                  </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Section des tags populaires */}
          {allTags.length > 0 && (
              <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200 dark:border-emerald-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Tags className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300">
                      Tags populaires
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 12).map(tag => {
                      const count = tagCounts.get(tag) || 0;
                      return (
                          <motion.button
                              key={tag}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleTagClick(tag)}
                              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                  selectedTag === tag
                                      ? 'bg-emerald-600 text-white shadow-md'
                                      : 'bg-amber-100 dark:bg-emerald-800 text-amber-800 dark:text-emerald-200 hover:bg-amber-200 dark:hover:bg-emerald-700'
                              }`}
                          >
                            <Hash className="h-3 w-3" />
                            {tag}
                            <span className="text-xs opacity-75">({count})</span>
                          </motion.button>
                      );
                    })}
                    {allTags.length > 12 && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 self-center">
                      +{allTags.length - 12} autres tags
                    </span>
                    )}
                  </div>
                </div>
              </motion.section>
          )}

          <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mb-12 sticky top-20 z-20 border border-emerald-100 dark:border-emerald-900"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <input
                    type="text"
                    aria-label="Rechercher un hadith"
                    placeholder="Rechercher un hadith..."
                    className="w-full pl-12 pr-6 py-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg font-amiri"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Loader className="h-5 w-5 text-emerald-600 dark:text-emerald-400 animate-spin" />
                    </div>
                )}
              </div>

              <div className="relative md:w-80">
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Filter className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <select
                    aria-label="Filtrer par tag"
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none font-medium cursor-pointer"
                    value={selectedTag || ''}
                    onChange={(e) => setSelectedTag(e.target.value || null)}
                >
                  <option value="">🏷️ Tous les tags</option>
                  {allTags.map(tag => {
                    const count = tagCounts.get(tag) || 0;
                    return (
                        <option key={tag} value={tag}>
                          {tag} ({count})
                        </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {(selectedTag || searchTerm) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-900/30 dark:to-amber-900/30 rounded-lg px-4 py-2"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-emerald-800 dark:text-emerald-200">
                      Filtre actif :
                    </span>
                    {selectedTag && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-600 text-white rounded-full text-sm">
                        <Hash className="h-3 w-3" />
                          {selectedTag}
                      </span>
                    )}
                    {searchTerm && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-600 text-white rounded-full text-sm">
                        <Search className="h-3 w-3" />
                        "{searchTerm}"
                      </span>
                    )}
                  </div>
                  <button
                      onClick={handleResetFilters}
                      aria-label="Retirer les filtres"
                      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200 p-1 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </motion.div>
            )}
          </motion.section>

          <section className="pb-16">
            <AnimatePresence mode="wait">
              {filteredHadiths.length === 0 ? (
                  <motion.div
                      key="no-results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
                  >
                    <div className="max-w-md mx-auto">
                      <div className="text-6xl mb-4">📖</div>
                      <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Aucun résultat trouvé
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Essayez de modifier vos critères de recherche
                      </p>
                      <button
                          onClick={handleResetFilters}
                          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                      >
                        Réinitialiser
                      </button>
                    </div>
                  </motion.div>
              ) : (
                  <>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-6"
                    >
                      {filteredHadiths.length} hadith{filteredHadiths.length > 1 ? 's' : ''} trouvé{filteredHadiths.length > 1 ? 's' : ''}
                    </motion.p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {filteredHadiths.map((hadith, index) => (
                          <motion.div
                              key={`${hadith.id}-${index}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: Math.min(index, 10) * 0.05 }}
                              layout
                          >
                            <HadithCard
                                hadith={hadith}
                                onClick={() => setSelectedHadith(hadith)}
                                onTagClick={handleTagClick}
                            />
                          </motion.div>
                      ))}
                    </div>
                  </>
              )}
            </AnimatePresence>
          </section>
        </main>

        <footer className="bg-emerald-900 dark:bg-emerald-950 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-emerald-300 mb-4 font-amiri text-xl">
              "On n'obéit pas à une créature pour désobéir au Créateur"
            </p>
            <p className="text-emerald-200">© 2023 Collection de Hadiths</p>
          </div>
        </footer>

        <AnimatePresence>
          {selectedHadith && (
              <HadithModal
                  hadith={selectedHadith}
                  onClose={() => setSelectedHadith(null)}
                  onTagClick={handleTagClick}
              />
          )}
        </AnimatePresence>
      </div>
  );
};