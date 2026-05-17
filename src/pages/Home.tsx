import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Clock, Sun, Moon, Sunrise, Sunset, Book, Heart, Wind, Users, GraduationCap, Video, ScrollText } from 'lucide-react';
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

// Hadiths du jour (rotation basée sur le jour)
const dailyHadiths = [
  {
    text: "Les actes ne valent que par les intentions, et chaque homme n'aura que selon son intention.",
    source: "Sahih Al-Bukhari",
    narrator: "Omar ibn Al-Khattab"
  },
  {
    text: "Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne.",
    source: "Sahih Al-Bukhari",
    narrator: "Othman ibn Affan"
  },
  {
    text: "Celui qui croit en Allah et au Jour dernier, qu'il dise du bien ou qu'il se taise.",
    source: "Sahih Al-Bukhari & Muslim",
    narrator: "Abou Hourayra"
  },
  {
    text: "La religion est facilité. Nul ne cherche à rivaliser avec la religion sans qu'elle ne le vainque.",
    source: "Sahih Al-Bukhari",
    narrator: "Abou Hourayra"
  },
  {
    text: "Fait partie de la beauté de l'Islam de la personne de délaisser ce qui ne la concerne pas.",
    source: "At-Tirmidhi",
    narrator: "Abou Hourayra"
  },
  {
    text: "N'entrera pas au Paradis celui dont le voisin n'est pas à l'abri de ses méfaits.",
    source: "Sahih Muslim",
    narrator: "Abou Hourayra"
  },
  {
    text: "Aucun de vous ne sera véritablement croyant tant qu'il n'aimera pas pour son frère ce qu'il aime pour lui-même.",
    source: "Sahih Al-Bukhari & Muslim",
    narrator: "Anas ibn Malik"
  }
];

// Douaas selon le moment de la journée
const douaasByTime = {
  morning: {
    title: "Doua du matin",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah",
    translation: "Nous voilà au matin et le royaume appartient à Allah, et la louange est à Allah.",
    source: "Sahih Muslim"
  },
  afternoon: {
    title: "Doua de protection",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ",
    transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'",
    translation: "Au nom d'Allah, avec le nom de Qui rien sur terre ni dans le ciel ne peut nuire.",
    source: "At-Tirmidhi"
  },
  evening: {
    title: "Doua du soir",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
    transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah",
    translation: "Nous voilà au soir et le royaume appartient à Allah, et la louange est à Allah.",
    source: "Sahih Muslim"
  },
  night: {
    title: "Doua avant de dormir",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "C'est en Ton nom, ô Allah, que je meurs et que je vis.",
    source: "Sahih Al-Bukhari"
  }
};

// Versets à méditer
const dailyVerses = [
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translation: "Certes, Allah est avec les patients.",
    reference: "Sourate Al-Baqara, 153"
  },
  {
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    translation: "Et quiconque place sa confiance en Allah, Il lui suffit.",
    reference: "Sourate At-Talaq, 3"
  },
  {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Car certes, avec la difficulté il y a une facilité.",
    reference: "Sourate Ash-Sharh, 5"
  },
  {
    arabic: "وَاذْكُر رَّبَّكَ فِي نَفْسِكَ تَضَرُّعًا وَخِيفَةً",
    translation: "Et invoque ton Seigneur en toi-même, avec humilité et crainte.",
    reference: "Sourate Al-A'raf, 205"
  },
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    translation: "Seigneur! Accorde-nous une belle part ici-bas, et une belle part dans l'au-delà.",
    reference: "Sourate Al-Baqara, 201"
  },
  {
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    translation: "Et dis: Seigneur, augmente mes connaissances.",
    reference: "Sourate Ta-Ha, 114"
  },
  {
    arabic: "إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ",
    translation: "La miséricorde d'Allah est proche des bienfaisants.",
    reference: "Sourate Al-A'raf, 56"
  }
];

// Statistiques du site
const siteStats = [
  { label: 'Hadiths', value: '500+', icon: Book, color: 'from-emerald-500 to-teal-500', path: '/hadiths' },
  { label: 'Savants', value: '50+', icon: GraduationCap, color: 'from-blue-500 to-indigo-500', path: '/savants' },
  { label: 'Douaas', value: '100+', icon: Heart, color: 'from-rose-500 to-pink-500', path: '/douaas' },
  { label: 'Dhikrs', value: '80+', icon: Wind, color: 'from-cyan-500 to-blue-500', path: '/dhikrs' },
  { label: 'Vidéos', value: '200+', icon: Video, color: 'from-purple-500 to-violet-500', path: '/multimedia' },
  { label: 'Biographies', value: '40+', icon: ScrollText, color: 'from-amber-500 to-orange-500', path: '/biographies' },
];

const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
};

const getTimeIcon = (time: string) => {
  switch (time) {
    case 'morning': return <Sunrise className="w-6 h-6" />;
    case 'afternoon': return <Sun className="w-6 h-6" />;
    case 'evening': return <Sunset className="w-6 h-6" />;
    case 'night': return <Moon className="w-6 h-6" />;
    default: return <Sun className="w-6 h-6" />;
  }
};

export const Home: React.FC = () => {
  const [selectedCity] = useState("Paris");
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const [dayIndex, setDayIndex] = useState(0);

  useEffect(() => {
    setTimeOfDay(getTimeOfDay());
    // Index basé sur le jour de l'année pour la rotation du contenu
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    setDayIndex(dayOfYear % 7);
  }, []);

  const currentHadith = dailyHadiths[dayIndex];
  const currentDouaa = douaasByTime[timeOfDay];
  const currentVerse = dailyVerses[dayIndex];

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
            Bienvenue sur IslamHub - Votre source de savoir islamique
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

        {/* Section contenu quotidien */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-8 font-amiri text-center">
            Votre dose quotidienne de spiritualité
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hadith du jour */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-amber-200 dark:border-emerald-800 overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg">
                    <Book className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 font-amiri">
                      Hadith du jour
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Rapporté par {currentHadith.narrator}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 italic">
                  "{currentHadith.text}"
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                    {currentHadith.source}
                  </span>
                  <Link to="/hadiths" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Doua du moment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ y: -5 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-amber-200 dark:border-emerald-800 overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                    {getTimeIcon(timeOfDay)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rose-800 dark:text-rose-300 font-amiri">
                      {currentDouaa.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {currentDouaa.source}
                    </p>
                  </div>
                </div>

                <p className="text-2xl text-right font-amiri text-gray-800 dark:text-gray-200 mb-3 leading-loose">
                  {currentDouaa.arabic}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">
                  {currentDouaa.transliteration}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {currentDouaa.translation}
                </p>

                <div className="flex justify-end">
                  <Link to="/douaas" className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Verset à méditer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -5 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-amber-200 dark:border-emerald-800 overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 font-amiri">
                      Verset à méditer
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {currentVerse.reference}
                    </p>
                  </div>
                </div>

                <p className="text-2xl text-right font-amiri text-gray-800 dark:text-gray-200 mb-4 leading-loose">
                  {currentVerse.arabic}
                </p>

                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  "{currentVerse.translation}"
                </p>

                <div className="flex justify-end">
                  <Link to="/coran" className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section statistiques */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-8 font-amiri text-center">
            Explorer nos ressources
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {siteStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Link to={stat.path}>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-700">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                    {/* Icon */}
                    <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Value */}
                    <div className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-1 font-amiri">
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      {stat.label}
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronRight className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Pied de page décoratif */}
      <footer className="bg-emerald-900 dark:bg-emerald-950 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-emerald-300 mb-4 font-amiri text-xl">
            "Que l'un de vous apprenne un chapitre de la religion ou l'enseigne aura plus de récompenses que de prier mille rak`ah des prières surérogatoires"
          </p>
          <p className="text-emerald-200">© {new Date().getFullYear()} IslamHub - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};
