import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Scale, Star, ChevronRight, GraduationCap } from 'lucide-react';

const Hanbalite: React.FC = () => {
    const stats = [
        { label: 'Œuvres majeures', value: '30+', icon: BookOpen },
        { label: "Élèves célèbres", value: '50+', icon: Users },
        { label: "Siècles d'influence", value: '12+', icon: Scale },
        { label: 'Textes fondamentaux', value: '15+', icon: GraduationCap },
    ];

    const relatedMadhaheb = [
        {
            id: 1,
            name: 'Hanafi',
            nameArabic: 'الحنفية',
            path: '/ecoles/Hanafi',
            description: "L'école de la raison et de l'opinion",
            color: 'from-amber-500 to-orange-600'
        },
        {
            id: 2,
            name: 'Maliki',
            nameArabic: 'المالكية',
            path: '/ecoles/Malikite',
            description: "L'école de la pratique médinoise",
            color: 'from-emerald-500 to-teal-600'
        },
        {
            id: 3,
            name: "Shafi'i",
            nameArabic: 'الشافعية',
            path: '/ecoles/Shafii',
            description: "L'école équilibrée entre texte et raison",
            color: 'from-blue-500 to-indigo-600'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-950">
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative py-24 bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-900 dark:from-emerald-950 dark:via-emerald-900 dark:to-amber-950 overflow-hidden"
            >
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-amber-50 dark:to-gray-900" />

                <div className="relative container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ scale: 0.9, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm mb-8 shadow-2xl"
                    >
                        <Users className="h-12 w-12 text-white" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 font-amiri"
                    >
                        École Hanbalite
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-emerald-200 max-w-3xl mx-auto mb-4"
                    >
                        L'école du texte et de la tradition
                    </motion.p>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-emerald-300 max-w-2xl mx-auto font-amiri"
                    >
                        Fondée par l'Imam Ahmad ibn Hanbal (780-855 EC)
                    </motion.p>
                </div>
            </motion.header>

            <main className="container mx-auto px-4 py-12 -mt-12 relative z-10">
                {/* Section des statistiques */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-amber-200 dark:border-emerald-800"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 mb-3">
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-amber-800 dark:text-amber-200 font-amiri">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.section>

                {/* Section d'introduction */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-300 mb-6 font-amiri text-center">
                        L'École Hanbalite
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            L'école hanbalite est la quatrième des grandes écoles juridiques sunnites.
                            Elle se distingue par son attachement rigoureux au Coran et à la Sunna,
                            ainsi que par sa méfiance envers le raisonnement analogique (qiyas) et
                            l'opinion personnelle (ra'y) lorsqu'ils ne sont pas solidement fondés sur les sources principales.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            Fondée par l'Imam Ahmad ibn Hanbal (780-855 EC), cette école met l'accent sur
                            l'utilisation des hadiths comme source principale de loi après le Coran.
                            L'imam Ahmad est connu pour sa vaste connaissance des hadiths et pour sa
                            résistance face à l'inquisition (mihna) sous le califat abbasside.
                        </p>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full mt-6"></div>
                    </div>
                </motion.section>

                {/* Section sur l'Imam Ahmad */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-16 bg-gradient-to-r from-amber-100 to-emerald-100 dark:from-emerald-900/30 dark:to-amber-900/30 rounded-2xl p-8 shadow-lg"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-4 font-amiri">
                                Imam Ahmad ibn Hanbal
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                Né à Bagdad en 780 EC, l'Imam Ahmad était connu pour sa piété, sa patience
                                et son dévouement à la préservation des enseignements du Prophète (paix et
                                bénédictions sur lui).
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Son œuvre majeure, "Al-Musnad", contient plus de 40 000 hadiths et reste
                                l'une des collections de hadiths les plus importantes de l'histoire islamique.
                            </p>
                        </div>
                        <div className="flex-1 text-center">
                            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 p-1">
                                <div className="w-full h-full rounded-full bg-emerald-900 dark:bg-emerald-950 flex items-center justify-center">
                                    <Users className="h-12 w-12 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Section caractéristiques */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-16"
                >
                    <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-8 font-amiri text-center">
                        Caractéristiques de l'École Hanbalite
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-emerald-800">
                            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-emerald-800 flex items-center justify-center mb-4">
                                <BookOpen className="h-6 w-6 text-amber-600 dark:text-emerald-400" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                                Attachement au Texte
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Priorité absolue au Coran et à la Sunna authentique, avec une utilisation
                                limitée du raisonnement analogique.
                            </p>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-emerald-800">
                            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-emerald-800 flex items-center justify-center mb-4">
                                <Scale className="h-6 w-6 text-amber-600 dark:text-emerald-400" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                                Rigueur Juridique
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Approche conservatrice en matière de jurisprudence, privilégiant la
                                préservation des pratiques établies.
                            </p>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-emerald-800">
                            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-emerald-800 flex items-center justify-center mb-4">
                                <Users className="h-6 w-6 text-amber-600 dark:text-emerald-400" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                                Influence Moderne
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                L'école hanbalite est particulièrement influente en Arabie Saoudite,
                                au Qatar et dans certaines régions de Syrie et d'Irak.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Autres écoles */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-16"
                >
                    <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-6 font-amiri text-center">
                        Découvrir les Autres Écoles
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {relatedMadhaheb.map((madhab, index) => (
                            <motion.div
                                key={madhab.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="group"
                            >
                                <Link to={madhab.path} className="block h-full">
                                    <div className="relative h-full bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-emerald-900/50 rounded-xl shadow-lg overflow-hidden border border-amber-200 dark:border-emerald-800 transition-all duration-300 hover:shadow-xl">
                                        <div className={`bg-gradient-to-r ${madhab.color} p-4 text-white`}>
                                            <h4 className="text-xl font-bold font-amiri">{madhab.name}</h4>
                                            <p className="text-sm opacity-90">{madhab.nameArabic}</p>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {madhab.description}
                                            </p>
                                            <div className="flex items-center justify-end mt-4">
                                                <motion.div
                                                    whileHover={{ x: 5 }}
                                                    className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm"
                                                >
                                                    Voir <ChevronRight className="h-4 w-4" />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Section de citation */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-16 bg-gradient-to-r from-amber-100 to-emerald-100 dark:from-emerald-900/30 dark:to-amber-900/30 rounded-2xl p-8 text-center shadow-lg"
                >
                    <div className="max-w-2xl mx-auto">
                        <div className="text-5xl mb-4 text-amber-600 dark:text-amber-400">"</div>
                        <p className="text-xl text-gray-800 dark:text-gray-200 font-amiri leading-relaxed mb-4">
                            La véritable richesse, c'est la connaissance. La véritable pauvreté, c'est l'ignorance.
                        </p>
                        <p className="text-sm text-emerald-700 dark:text-emerald-400">
                            - Imam Ahmad ibn Hanbal
                        </p>
                    </div>
                </motion.section>
            </main>

            <footer className="bg-emerald-900 dark:bg-emerald-950 text-white py-12 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-emerald-300 mb-4 font-amiri text-xl">
                        "Ceux qui savent et ceux qui ne savent pas sont-ils égaux ?"
                    </p>
                    <p className="text-emerald-200 text-sm">
                        Sourate Az-Zumar, verset 9
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Hanbalite;