import React from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter } from 'lucide-react';

export const Biographies: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-16 bg-arabesque bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-emerald-900/80 dark:bg-emerald-950/90 backdrop-blur-sm"></div>
        <div className="relative text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-4 font-amiri">Biographies</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            Apprendre la vie des personnages de l'islam
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search biographies..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="flex items-center justify-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors">
              <Filter className="h-5 w-5 mr-2" />
              Categories
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Abu Bakr As-Siddiq', title: 'Le Premier Calife', category: 'Compagnon' },
            { name: 'Umar ibn Al-Khattab', title: 'Le Second Calife', category: 'Compagnon' },
            { name: 'Imam Al-Bukhari', title: 'Master of Hadith', category: 'Rapporteur' },
          ].map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <span className="px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs">
                    {person.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-2 mb-1 font-amiri">
                    {person.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {person.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};