import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

 const CroyanceEnDieu: React.FC = () => {
  const croyanceEnDieu = [
    { id: 1, name: 'Attributs de Dieu', path: '/foi/CroireEnDieu/AttributsDeDieu' },
    { id: 2, name: 'Dieu exsite sans endroit', path: '/foi/CroireEnDieu/DieuExisteSansEndroit' },
    { id: 3, name: 'Dieu ne ressemble pas aux créatures', path: '/foi/CroireEnDieu/DieuSansComment' },
    { id: 4, name: 'Les noms parfait de Dieu', path: '/foi/CroireEnDieu/LesNomsDeDieu' },
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
          <h1 className="text-4xl font-bold text-white mb-4 font-amiri">CroyanceEnDieu</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            Croyance en Dieu
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {croyanceEnDieu.map((croyanceEnDieu) => (
            <motion.div
              key={croyanceEnDieu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: croyanceEnDieu.id * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <Link to={croyanceEnDieu.path} className="block text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-amiri">
                  {croyanceEnDieu.name}
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

export default CroyanceEnDieu;