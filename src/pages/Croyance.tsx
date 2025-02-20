import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Croyance: React.FC = () => {
  const croyance = [
    { id: 1, name: 'Croire en Dieu', path: '/croyance/Croyance.EnDieu' },
    { id: 2, name: 'Croire en tous les Prophètes', path: '/croyance/Croyance.prophetes' },
    { id: 3, name: 'Croire aux Anges honorés', path: '/croyance/Croyance.anges' },
    { id: 4, name: 'Livres révélés', path: '/croyance/Croyance.livres' },
    { id: 5, name: 'La tombe', path: '/croyance/Croyance.tombe' },
    { id: 6, name: 'Le jour dernier', path: '/croyance/Croyance.jourDernier' },
    { id: 7, name: 'Prédestination du bien et du mal', path: '/croyance/Croyance.predestination' },
    { id: 8, name: 'Création du monde', path: '/croyance/Croyance.creationDuMonde' },
    
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
          <h1 className="text-4xl font-bold text-white mb-4 font-amiri">Foi</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            Les bases de la foi
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {croyance.map((croyance) => (
            <motion.div
              key={croyance.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: croyance.id * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <Link to={croyance.path} className="block text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-amiri">
                  {croyance.name}
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