import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Filter, X, Star, ChevronRight, Clock, Sun, Moon } from 'lucide-react';
import { PrayerTimes } from '../components/PrayerTimes';
import { DailyQuote } from '../components/DailyQuote';

const mockPrayerTimes = {
  fajr: "05:30",
  sunrise: "06:45",
  dhuhr: "12:30",
  asr: "15:45",
  maghrib: "18:15",
  isha: "19:30"
};

const mockQuote = {
  text: "Celui pour qui Allah veut le bien, lui facilite l'apprentissage de la religion",
  author: "Prophet Muhammad ﷺ",
  source: "Sahih Al-Bukhari"
};

const featuredSections = [
  {
    title: "Derniers Hadiths",
    icon: <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
    description: "Explorez les dernières paroles prophétiques ajoutées à notre collection."
  },
  {
    title: "Invocations Quotidiennes",
    icon: <Sun className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
    description: "Découvrez des invocations pour chaque moment de votre journée."
  },
  {
    title: "Vidéos Sélectionnées",
    icon: <Clock className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
    description: "Regardez des enseignements de savants réputés."
  }
];

export const Home: React.FC = () => {
  const [selectedCity] = useState("Paris");

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-950">
      {/* En-tête avec motif islamique */}
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
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </motion.h1>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
            Bienvenue sur IslamicHub - Votre source de savoir islamique
          </p>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-12 -mt-12 relative z-10">
        {/* Section principale avec citation et horaires */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-emerald-900 dark:to-amber-900 rounded-2xl p-6 shadow-xl border border-amber-200 dark:border-emerald-800 h-full">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
                  <svg viewBox="0 0 100 100" className="text-amber-500 dark:text-emerald-400">
                    <path 
                      fill="currentColor" 
                      d="M20,20 Q30,10 40,20 T60,20 T80,20 T100,20" 
                      className="transform rotate-45"
                    />
                  </svg>
                </div>
                <DailyQuote quote={mockQuote} />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-emerald-900 dark:to-amber-900 rounded-2xl p-6 shadow-xl border border-amber-200 dark:border-emerald-800 h-full">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
                  <svg viewBox="0 0 100 100" className="text-amber-500 dark:text-emerald-400">
                    <path 
                      fill="currentColor" 
                      d="M20,20 Q30,10 40,20 T60,20 T80,20 T100,20" 
                      className="transform rotate-45"
                    />
                  </svg>
                </div>
                <PrayerTimes times={mockPrayerTimes} city={selectedCity} />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Sections fonctionnalités */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-6 font-amiri text-center">
            Explorez nos ressources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-emerald-900 dark:to-amber-900 rounded-2xl p-6 shadow-xl border border-amber-200 dark:border-emerald-800 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
                  <svg viewBox="0 0 100 100" className="text-amber-500 dark:text-emerald-400">
                    <path 
                      fill="currentColor" 
                      d="M20,20 Q30,10 40,20 T60,20 T80,20 T100,20" 
                      className="transform rotate-45"
                    />
                  </svg>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="mr-3">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200">
                    {section.title}
                  </h3>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {section.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-xs bg-amber-100 dark:bg-emerald-800 text-amber-800 dark:text-emerald-200 px-3 py-1 rounded-full flex items-center"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Explorer
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section collections */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-6 font-amiri text-center">
            Collections principales
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'Sahih Al Bukhari',
              'Sahih Muslim',
              'رياض الصالحين',
              'كتاب ذكر الموت',
              'الأربعون في التصوف',
              'المنتقى من صحيح مسلم'
            ].map((topic, i) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.05 }}
                whileHover={{ y: -5 }}
                className="cursor-pointer bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 text-center rounded-xl p-4 shadow-lg border border-emerald-100 dark:border-emerald-800 transition-all"
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
      </main>

      {/* Pied de page décoratif */}
      <footer className="bg-emerald-900 dark:bg-emerald-950 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-emerald-300 mb-4 font-amiri text-xl">
            "Que l’un de vous apprenne un chapitre de la religion ou l’enseigne aura plus de récompenses que de prier mille rak`ah des prières surérogatoires"
          </p>
          <p className="text-emerald-200">© {new Date().getFullYear()} IslamicHub - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};