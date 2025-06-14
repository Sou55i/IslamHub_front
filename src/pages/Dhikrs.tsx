import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, BookOpen } from 'lucide-react';
import { useDhikrs } from '../context/DhikrProvider';

export const Dhikrs: React.FC = () => {
  const { dhikrs, isLoading, error} = useDhikrs();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-emerald-600 font-amiri">Loading dhikrs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 font-amiri">{error}</p>
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
            Mulitplier les évocations
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une évocation..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {dhikrs.map((dhikr, index) => (
            <motion.div
              key={dhikr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 ">
                    {dhikr.sujet}
                  </h3>
                  <p className="text-2xl mb-4 font-arabic text-right leading-loose text-gray-800 dark:text-gray-200 font-amiri">
                    {dhikr.texte_arabe}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 font-amiri">
                    {dhikr.texte_francais}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 font-amiri">
                    {dhikr.phonetique}
                  </p>
                 
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    
                    <span>{dhikr.commentaire}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};