import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Loader } from 'lucide-react';
import { useDhikrs } from '../context/DhikrProvider';
import { dataService } from '../services/DataService';
import SearchBar from '../components/SearchBar';
import type { Dhikr } from '../types';

export const Dhikrs: React.FC = () => {
    const { dhikrs: initialDhikrs, isLoading, error } = useDhikrs();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDhikrs, setFilteredDhikrs] = useState<Dhikr[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        setFilteredDhikrs(initialDhikrs);
    }, [initialDhikrs]);

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (searchQuery.trim() === '') {
                setFilteredDhikrs(initialDhikrs);
                return;
            }
            setIsSearching(true);
            try {
                const response = await dataService.searchDhikrs(searchQuery);
                setFilteredDhikrs(response.data);
            } catch {
                const q = searchQuery.toLowerCase();
                setFilteredDhikrs(
                    initialDhikrs.filter(dhikr =>
                        dhikr.sujet.toLowerCase().includes(q) ||
                        dhikr.texte_francais?.toLowerCase().includes(q) ||
                        dhikr.phonétique?.toLowerCase().includes(q) ||
                        dhikr.commentaire?.toLowerCase().includes(q)
                    )
                );
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [searchQuery, initialDhikrs]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-950 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="h-12 w-12 text-emerald-600 dark:text-emerald-400 animate-spin mx-auto mb-4" />
                    <p className="text-xl text-emerald-800 dark:text-emerald-200 font-amiri">
                        Chargement des dhikrs...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                    <div className="text-6xl mb-4">😔</div>
                    <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                        Une erreur est survenue
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative py-16 bg-arabesque bg-cover bg-center"
            >
                <div className="absolute inset-0 bg-emerald-900/80 dark:bg-emerald-950/90 backdrop-blur-sm"></div>
                <div className="relative text-center px-4">
                    <h1 className="text-4xl font-bold text-white mb-4 font-amiri">Dhikrs</h1>
                    <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
                        Multiplier les évocations
                    </p>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-4">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Rechercher une évocation..."
                        isSearching={isSearching}
                        onClear={() => setSearchQuery('')}
                    />
                </div>

                {searchQuery.trim() !== '' && (
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-4 px-1">
                        {filteredDhikrs.length} évocation{filteredDhikrs.length !== 1 ? 's' : ''} trouvée{filteredDhikrs.length !== 1 ? 's' : ''}
                    </p>
                )}

                {filteredDhikrs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400 font-amiri">
                            {searchQuery ? `Aucun dhikr trouvé pour "${searchQuery}"` : 'Aucun dhikr disponible'}
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredDhikrs.map((dhikr, index) => (
                            <motion.div
                                key={dhikr.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(index, 10) * 0.05 }}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                                        <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {dhikr.sujet}
                                        </h3>
                                        <p className="text-2xl mb-4 font-arabic text-right leading-loose text-gray-800 dark:text-gray-200 font-amiri">
                                            {dhikr.texte_arabe}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 font-amiri">
                                            {dhikr.texte_francais}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 font-amiri">
                                            {dhikr.phonétique}
                                        </p>
                                        {dhikr.commentaire && (
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <BookOpen className="w-4 h-4" />
                                                <span>{dhikr.commentaire}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
