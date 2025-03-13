import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AlBukhari: React.FC = () => {
  const albukhari = [
    { id: 1, name: 'Français', path: '/Al-Bukhari/Français' },
    { id: 2, name: 'Arabe', path: '/Al-Bukhari/Arabe' },
  
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-16 bg-arabesque bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-emerald-900/80 dark:bg-emerald-950/90 backdrop-blur-sm"></div>
        <div className="relative text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-4 font-amiri">Al-Bukhari</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            Découvrez les Hadiths Rapportés par l'Imam Al-Bukhari
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {albukhari.map((albukhari) => (
            <motion.div
              key={albukhari.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: madhab.id * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <Link to={albukhari.path} className="block text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-amiri">
                  {albukhari.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  En savoir plus
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlBukhari;