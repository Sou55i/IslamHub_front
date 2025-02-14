import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { PrayerTimes as PrayerTimesComponent } from '../components/PrayerTimes';

const mockPrayerTimes = {
  fajr: "05:30",
  sunrise: "06:45",
  dhuhr: "12:30",
  asr: "15:45",
  maghrib: "18:15",
  isha: "19:30"
};

export const PrayerTimesPage: React.FC = () => {
  const [selectedCity] = useState("Paris");

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-16 bg-arabesque bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-emerald-900/80 dark:bg-emerald-950/90 backdrop-blur-sm"></div>
        <div className="relative text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-4 font-amiri">Prayer Times</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            Find accurate prayer times for your location
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-100 dark:border-emerald-800"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-amiri">
                  Select Location
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose your city for accurate prayer times
                </p>
              </div>
            </div>
            <input
              type="text"
              placeholder="Search city..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent mb-4"
            />
            <div className="space-y-2">
              {['Paris', 'London', 'New York', 'Dubai'].map((city) => (
                <button
                  key={city}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                    city === selectedCity
                      ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <PrayerTimesComponent times={mockPrayerTimes} city={selectedCity} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-100 dark:border-emerald-800"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-amiri">
                Monthly Schedule
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                View prayer times for the entire month
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Fajr</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Sunrise</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Dhuhr</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Asr</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Maghrib</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Isha</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((day) => (
                  <tr key={day} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">March {day}</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">05:30</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">06:45</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">12:30</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">15:45</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">18:15</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">19:30</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};