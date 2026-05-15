import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scale, BookOpen, Users, Star, ChevronRight, GraduationCap, Lightbulb, Globe } from 'lucide-react';

const Hanafi: React.FC = () => {
    const stats = [
        { label: 'Œuvres majeures', value: '100+', icon: BookOpen },
        { label: "Élèves célèbres", value: '80+', icon: Users },
        { label: "Siècles d'influence", value: '13+', icon: Scale },
        { label: 'Pays influencés', value: '40+', icon: Globe },
    ];

    const relatedMadhaheb = [
        {
            id: 1,
            name: 'Maliki',
            nameArabic: 'المالكية',
            path: '/ecoles/Malikite',
            description: "L'école de la pratique médinoise",
            color: 'from-emerald-500 to-teal-600'
        },
        {
            id: 2,
            name: "Shafi'i",
            nameArabic: 'الشافعية',
            path: '/ecoles/Shafii',
            description: "L'école équilibrée entre texte et raison",
            color: 'from-blue-500 to-indigo-600'
        },
        {
            id: 3,
            name: 'Hanbali',
            nameArabic: 'الحنابلة',
            path: '/ecoles/Hanbalite',
            description: "L'école du texte et de la tradition",
            color: 'from-purple-500 to-pink-600'
        },
    ];

    const principles = [
        {
            title: 'Le Coran',
            description: 'Source première de la législation islamique.',
            icon: BookOpen
        },
        {
            title: 'La Sunna',
            description: 'Les enseignements et pratiques du Prophète (paix sur lui).',
            icon: Star
        },
        {
            title: 'L\'Ijma\'',
            description: 'Le consensus des savants sur une question juridique.',
            icon: Users
        },
        {
            title: 'Le Qiyas',
            description: 'Le raisonnement analogique pour les nouvelles situations.',
            icon: Scale
        },
        {
            title: 'L\'Istihsan',
            description: 'Le choix de la meilleure solution pour l\'intérêt public.',
            icon: Lightbulb
        },
        {
            title: 'L\'Urf',
            description: 'La coutume locale comme source de droit.',
            icon: Globe
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
                        <Scale className="h-12 w-12 text-white" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 font-amiri"
                    >
                        École Hanafite
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-emerald-200 max-w-3xl mx-auto mb-4"
                    >
                        L'école de la raison et de l'opinion
                    </motion.p>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-emerald-300 max-w-2xl mx-auto font-amiri"
                    >
                        Fondée par l'Imam Abou Hanifa an-Nou‘man (699-767 EC)
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
                        L'École Hanafite
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            L'école hanafite est la plus ancienne et la plus répandue des quatre écoles juridiques sunnites.
                            Fondée par l'Imam Abou Hanifa an-Nou‘man ibn Thabit (699-767 EC), elle est réputée pour son
                            utilisation extensive du raisonnement logique et de l'opinion éclairée dans la dérivation des lois.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            L'Imam Abou Hanifa était connu pour sa méthode systématique et sa capacité à traiter des
                            questions complexes par le raisonnement analogique (qiyas) et la préférence juridique (istihsan).
                            Son approche a permis une grande flexibilité dans l'adaptation de la loi islamique aux
                            différents contextes culturels et géographiques.
                        </p>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full mt-6"></div>
                    </div>
                </motion.section>

                {/* Section sur l'Imam Abou Hanifa */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-16 bg-gradient-to-r from-amber-100 to-emerald-100 dark:from-emerald-900/30 dark:to-amber-900/30 rounded-2xl p-8 shadow-lg"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-4 font-amiri">
                                Imam Abou Hanifa
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                Né à Koufa (Irak actuel) en 699 EC, l'Imam Abou Hanifa était un grand commerçant
                                avant de se consacrer pleinement à l'étude de la jurisprudence islamique.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Son œuvre majeure, "Al-Fiqh al-Akbar", traite des fondements de la foi, tandis que
                                ses élèves ont compilé ses enseignements dans des ouvrages comme "Al-Mabsout" et
                                "Al-Jami' al-Kabir". L'école hanafite a été adoptée comme école officielle par
                                l'Empire ottoman, contribuant à sa large diffusion.
                            </p>
                        </div>
                        <div className="flex-1 text-center">
                            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 p-1">
                                <div className="w-full h-full rounded-full bg-emerald-900 dark:bg-emerald-950 flex items-center justify-center">
                                    <Scale className="h-12 w-12 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Section des principes */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-16"
                >
                    <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-8 font-amiri text-center">
                        Sources et Méthodologie de l'École Hanafite
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {principles.map((principle, index) => (
                            <motion.div
                                key={principle.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-emerald-800"
                            >
                                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-emerald-800 flex items-center justify-center mb-4">
                                    <principle.icon className="h-6 w-6 text-amber-600 dark:text-emerald-400" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                                    {principle.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {principle.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Section caractéristiques spécifiques */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mb-16"
                >
                    <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-8 font-amiri text-center">
                        Particularités de l'École Hanafite
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-gray-800 dark:to-emerald-900/50 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-emerald-800">
                            <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-3 font-amiri">
                                Flexibilité et Adaptabilité
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                L'école hanafite est reconnue pour sa flexibilité, utilisant des méthodes comme
                                l'istihsan (préférence juridique) pour adapter la loi aux circonstances changeantes
                                et à l'intérêt public.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-gray-800 dark:to-emerald-900/50 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-emerald-800">
                            <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-3 font-amiri">
                                Rayonnement Géographique
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                L'école hanafite est majoritaire en Turquie, dans les Balkans, en Asie centrale,
                                en Afghanistan, au Pakistan, en Inde, en Chine et chez les musulmans de l'ex-URSS.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Autres écoles */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
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
                                transition={{ delay: 1.0 + index * 0.1 }}
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
                    transition={{ delay: 1.1 }}
                    className="mt-16 bg-gradient-to-r from-amber-100 to-emerald-100 dark:from-emerald-900/30 dark:to-amber-900/30 rounded-2xl p-8 text-center shadow-lg"
                >
                    <div className="max-w-2xl mx-auto">
                        <div className="text-5xl mb-4 text-amber-600 dark:text-amber-400">"</div>
                        <p className="text-xl text-gray-800 dark:text-gray-200 font-amiri leading-relaxed mb-4">
                            La science est plus précieuse que l'argent, car la science te protège tandis que tu dois protéger l'argent.
                        </p>
                        <p className="text-sm text-emerald-700 dark:text-emerald-400">
                            - Imam Abou Hanifa
                        </p>
                    </div>
                </motion.section>
            </main>

            <footer className="bg-emerald-900 dark:bg-emerald-950 text-white py-12 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-emerald-300 mb-4 font-amiri text-xl">
                        "Et dis: Seigneur, augmente mes connaissances."
                    </p>
                    <p className="text-emerald-200 text-sm">
                        Sourate Ta-Ha, verset 114
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Hanafi;