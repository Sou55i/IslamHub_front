import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  text: "The best among you are those who have the best manners and character.",
  author: "Prophet Muhammad ﷺ",
  source: "Sahih Al-Bukhari"
};

export const Home: React.FC = () => {
  const [selectedCity] = useState("Paris");

  return (
    <div className="space-y-8">
      <div className="relative py-20 bg-arabesque bg-cover bg-center">
        <div className="absolute inset-0 bg-emerald-900/80 dark:bg-emerald-950/90 backdrop-blur-sm transition-colors duration-200"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 font-amiri">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bienvenu sur IslamHub
          </h2>
          <p className="text-lg md:text-xl text-emerald-50">
            Croyance de Ahlou 'sounnah wal jamaa
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 -mt-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DailyQuote quote={mockQuote} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PrayerTimes times={mockPrayerTimes} city={selectedCity} />
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-amiri font-semibold mb-2 dark:text-white">Latest Hadiths</h3>
              <div className="w-16 h-1 bg-emerald-500 dark:bg-emerald-400 mx-auto"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center">Coming soon...</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-amiri font-semibold mb-2 dark:text-white">Daily Dhikrs</h3>
              <div className="w-16 h-1 bg-emerald-500 dark:bg-emerald-400 mx-auto"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center">Coming soon...</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-amiri font-semibold mb-2 dark:text-white">Featured Videos</h3>
              <div className="w-16 h-1 bg-emerald-500 dark:bg-emerald-400 mx-auto"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center">Coming soon...</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};