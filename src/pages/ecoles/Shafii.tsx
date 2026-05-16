import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  MapPin,
  Calendar,
  Users,
  GraduationCap,
  Heart,
  ChevronDown,
  ChevronUp,
  Star,
  Scroll,
  Globe
} from 'lucide-react';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<SectionProps> = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-emerald-100 dark:border-emerald-900"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-900/30 dark:to-amber-900/30 hover:from-emerald-100 hover:to-amber-100 dark:hover:from-emerald-900/50 dark:hover:to-amber-900/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 dark:bg-emerald-700 flex items-center justify-center text-white">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 font-amiri">
            {title}
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Shafii: React.FC = () => {
  const teachers = [
    "Mouchè l'Imam Malik",
    "Mouslim fils de Khalid Az-Zinjiyy",
    "Soufyan fils de ^Ouyaynah",
    "Ibrahim fils de Sa^d",
    "^AbdoulWahhab fils de ^AbdilMajid Ath-Thaqafiyy",
    "Isma^il fils de ^Aliyyah",
    "Ibnoul-^Aliyyah",
    "^Abdour-Rahman fils de ^Abdil^Aziz",
    "Ibrahim fils de Mouhammad fils de Abi Yahya",
    "Ibrahim fils de ^Ouyaynah",
    "Isma^il fils de Ja^far",
    "Hatim fils de Isma^il",
    "^Abdoul^Aziz fils de Mouhammad Ad-Darawardiyy",
    "Mouhammad fils de l-Haçan Ach-Chaybaniyy",
    "Waki^ fils de l-Jarrah"
  ];

  const students = [
    { name: "Abou ^Abdil-Lah Ahmad Ibnou Hanbal", note: "fondateur de l'école Hanbalite" },
    { name: "Al-Harith fils de Sourayk An-Naqqa", note: "" },
    { name: "Abou l-Walid Mouça fils de Abi l-Jaroudi", note: "" },
    { name: "Abou Bakr Al-Houmaydiyy", note: "" },
    { name: "Ibnou Hicham", note: "spécialiste de grammaire et de biographie du prophète" },
    { name: "Abou ^Outhman Al-Maziniyy", note: "spécialiste de grammaire" },
    { name: "Ar-Rabi^ fils de Soulayman Al-Mouradiyy", note: "" },
    { name: "Ar-Rabi^ fils de Soulayman Al-Jiziyy", note: "" },
    { name: "Youçouf fils de Yahya Al-Bouwaytiyy", note: "" },
    { name: "Harmalah fils de Yahya At-Toujibiyy", note: "" },
    { name: "Younouss fils de ^Abdil-'A^la", note: "" },
    { name: "Mouhammad fils de ^Abdil-Lah fils de ^AbdilHakam", note: "" },
    { name: "Al-Mouzaniyy", note: "un des plus grands savants de l'école Chafi^iyy" }
  ];

  const qualities = [
    "Très pieux et très attaché à la religion",
    "Très intelligent et doté d'une grande capacité de mémorisation",
    "Éloquent et très fort en argumentation",
    "Généreux et détaché des biens de ce monde",
    "Humble et aimant les gens vertueux",
    "Sincère dans la recherche de la vérité",
    "Persévérant dans l'apprentissage et l'enseignement"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-950">
      {/* Hero Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-20 bg-emerald-800 dark:bg-emerald-950 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-50 dark:from-gray-900" />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-amber-500/20 text-amber-200 rounded-full text-sm font-medium mb-4">
              150 H - 204 H (767 - 820 EC)
            </span>
          </motion.div>

          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 font-amiri"
          >
            L'Imam Ach-Chafi^iyy
          </motion.h1>

          <p className="text-xl text-emerald-200 max-w-3xl mx-auto mb-6 font-amiri">
            Mouhammad fils de Idris Ach-Chafi^iyy
          </p>

          <p className="text-lg text-emerald-300 max-w-2xl mx-auto">
            Fondateur de l'école Chafi^iyy, l'une des quatre grandes écoles de jurisprudence sunnite
          </p>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-12 -mt-8 relative z-10">
        {/* Quick Facts Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-emerald-100 dark:border-emerald-900">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Naissance</p>
                <p className="font-bold text-gray-800 dark:text-gray-200">150 H / 767 EC</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">Gaza, Palestine</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-emerald-100 dark:border-emerald-900">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Décès</p>
                <p className="font-bold text-gray-800 dark:text-gray-200">204 H / 820 EC</p>
                <p className="text-sm text-amber-600 dark:text-amber-400">Le Caire, Égypte</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-emerald-100 dark:border-emerald-900">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Lignée</p>
                <p className="font-bold text-gray-800 dark:text-gray-200">Qouraychite Hachémite</p>
                <p className="text-sm text-purple-600 dark:text-purple-400">Rejoint le Prophète ﷺ</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-6">
          {/* Nom et Ascendance */}
          <CollapsibleSection
            title="Son nom et son ascendance"
            icon={<Scroll className="w-5 h-5" />}
            defaultOpen={true}
          >
            <p className="mb-4">
              Il est Mouhammad fils de Idris, fils de Al-^Abbas, fils de ^Outhman, fils de Chafi^, fils de As-Sa'ib,
              fils de ^Oubayd, fils de ^Abd Yazid, fils de Hachim, fils de Al-Mouttalib, fils de ^Abd Manaf.
            </p>
            <p className="mb-4">
              Son ascendance rejoint donc celle du Prophète ﷺ à ^Abd Manaf, ce qui fait de lui un Qouraychite,
              un Hachémite et un Mouttalibiyy.
            </p>
            <p>
              Il est surnommé <span className="font-bold text-emerald-600 dark:text-emerald-400">Abou ^Abdil-Lah</span>.
              Quant au terme "Chafi^iyy", il est attribué à son quatrième ascendant Chafi^ fils de As-Sa'ib.
            </p>
          </CollapsibleSection>

          {/* Son enfance */}
          <CollapsibleSection
            title="Son enfance et sa jeunesse"
            icon={<Heart className="w-5 h-5" />}
          >
            <p className="mb-4">
              L'Imam Ach-Chafi^iyy est né en l'an 150 de l'hégire à Gaza, en Palestine. Son père mourut alors
              qu'il était encore petit. Sa mère, craignant qu'il ne perde ses droits à l'héritage familial,
              décida de l'emmener à La Mecque où se trouvait sa famille.
            </p>
            <p className="mb-4">
              Il a grandi orphelin dans la pauvreté. Sa mère, qui était une femme pieuse et intelligente,
              veilla à son éducation religieuse malgré leurs moyens limités. Elle l'envoya à l'école coranique
              où il mémorisa le Coran à l'âge de sept ans.
            </p>
            <p>
              Malgré leur pauvreté, sa mère ne négligea jamais son éducation. Elle faisait tout son possible
              pour qu'il puisse assister aux cercles de science, parfois sans pouvoir payer les maîtres.
              Les enseignants, impressionnés par son intelligence exceptionnelle, acceptaient de lui
              enseigner gratuitement.
            </p>
          </CollapsibleSection>

          {/* Son amour pour la science */}
          <CollapsibleSection
            title="Son amour pour la science"
            icon={<BookOpen className="w-5 h-5" />}
          >
            <p className="mb-4">
              Dès son plus jeune âge, l'Imam Ach-Chafi^iyy manifesta un amour profond pour la science religieuse.
              Après avoir mémorisé le Coran, il se tourna vers l'apprentissage des hadiths du Prophète ﷺ.
            </p>
            <p className="mb-4">
              Il mémorisa le Mouwatta' de l'Imam Malik à l'âge de dix ans. Ce recueil de hadiths et de
              jurisprudence était l'un des ouvrages les plus importants de l'époque.
            </p>
            <p className="mb-4">
              Il vécut parmi la tribu de Houdhay durant plusieurs années pour maîtriser la langue arabe
              dans sa forme la plus pure. Cette tribu était reconnue pour la pureté de son arabe,
              préservé des influences extérieures.
            </p>
            <p>
              Sa maîtrise exceptionnelle de la langue arabe et de la poésie fit de lui une référence
              en la matière. Al-'Açma^iyy, célèbre linguiste de l'époque, faisait vérifier ses recueils
              de poésie par le jeune Chafi^iyy.
            </p>
          </CollapsibleSection>

          {/* Fondation de l'école */}
          <CollapsibleSection
            title="La fondation de l'école Chafi^iyy"
            icon={<GraduationCap className="w-5 h-5" />}
          >
            <p className="mb-4">
              L'Imam Ach-Chafi^iyy a fondé une méthodologie juridique qui combine les traditions des gens
              du hadith (ahl al-hadith) et des gens de l'opinion (ahl ar-ra'y). Il a établi des règles
              claires pour déduire les lois religieuses à partir des sources.
            </p>
            <p className="mb-4">
              Il fut le premier à codifier les principes de la jurisprudence islamique (oussoul al-fiqh)
              dans son célèbre ouvrage <span className="font-bold text-emerald-600 dark:text-emerald-400">"Ar-Riçalah"</span>.
              Cet ouvrage établit les fondements méthodologiques pour comprendre et interpréter les textes religieux.
            </p>
            <p className="mb-4">
              Son école juridique se distingue par sa rigueur méthodologique et son équilibre entre les
              textes et le raisonnement. Elle est aujourd'hui suivie par des millions de musulmans,
              notamment en Égypte, en Asie du Sud-Est, au Yémen et en Afrique de l'Est.
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4 mt-4">
              <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                L'école Chafi^iyy représente environ 15% des musulmans dans le monde et reste
                particulièrement influente dans les domaines de la jurisprudence, du hadith et
                des principes de jurisprudence.
              </p>
            </div>
          </CollapsibleSection>

          {/* Ses qualités */}
          <CollapsibleSection
            title="Ses qualités"
            icon={<Star className="w-5 h-5" />}
          >
            <p className="mb-4">
              L'Imam Ach-Chafi^iyy était reconnu pour ses nombreuses qualités morales et intellectuelles :
            </p>
            <ul className="space-y-3">
              {qualities.map((quality, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 dark:text-amber-400 text-sm font-bold">{index + 1}</span>
                  </span>
                  <span>{quality}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg border-l-4 border-amber-500">
              <p className="italic text-amber-800 dark:text-amber-200">
                L'Imam Ahmad a dit à son sujet : "Ach-Chafi^iyy était comme le soleil pour le monde
                et comme la santé pour les gens."
              </p>
            </div>
          </CollapsibleSection>

          {/* Ses professeurs */}
          <CollapsibleSection
            title="Ses professeurs (Chouyoukh)"
            icon={<Users className="w-5 h-5" />}
          >
            <p className="mb-4">
              L'Imam Ach-Chafi^iyy a étudié auprès de nombreux savants illustres de son époque,
              parmi lesquels :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {teachers.map((teacher, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{teacher}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Parmi ses professeurs les plus influents, l'Imam Malik ibn Anas occupe une place
              particulière. L'Imam Ach-Chafi^iyy a étudié le Mouwatta' directement auprès de lui
              à Médine.
            </p>
          </CollapsibleSection>

          {/* Ses élèves */}
          <CollapsibleSection
            title="Ses élèves"
            icon={<GraduationCap className="w-5 h-5" />}
          >
            <p className="mb-4">
              L'Imam Ach-Chafi^iyy a formé de nombreux savants qui ont contribué à la transmission
              et au développement de son école :
            </p>
            <div className="space-y-3">
              {students.map((student, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400 text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{student.name}</span>
                    {student.note && (
                      <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">{student.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Ses voyages */}
          <CollapsibleSection
            title="Ses voyages pour la science"
            icon={<Globe className="w-5 h-5" />}
          >
            <p className="mb-4">
              L'Imam Ach-Chafi^iyy a parcouru de nombreuses régions du monde musulman à la recherche
              de la science :
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mt-2"></div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">La Mecque</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sa ville d'enfance où il a mémorisé le Coran et commencé ses études religieuses.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-amber-500 mt-2"></div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">Médine</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Où il a étudié auprès de l'Imam Malik et appris le Mouwatta'.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-purple-500 mt-2"></div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">Yémen</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Où il a occupé un poste de juge et acquis une expérience pratique.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">Bagdad (Irak)</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Où il a étudié auprès de Mouhammad ibn Al-Haçan et enseigné sa première école (al-qadim).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mt-2"></div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">Le Caire (Égypte)</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Où il s'est installé définitivement et a développé sa nouvelle école (al-jadid).
                    C'est là qu'il est décédé et qu'il repose.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Sa croyance */}
          <CollapsibleSection
            title="Sa croyance (^Aqidah)"
            icon={<Heart className="w-5 h-5" />}
          >
            <p className="mb-4">
              L'Imam Ach-Chafi^iyy était sur la croyance des gens de la Sounnah et du Groupe (Ahl as-Sounnah wal-Jama^ah).
              Il a clairement exprimé sa croyance en l'unicité d'Allah et en Ses attributs parfaits.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border-l-4 border-emerald-500">
                <p className="italic text-emerald-800 dark:text-emerald-200">
                  "J'ai cru en Allah et en ce qui est venu de la part d'Allah, selon ce qu'a voulu Allah.
                  Et j'ai cru en le Messager d'Allah et en ce qui est venu de la part du Messager d'Allah,
                  selon ce qu'a voulu le Messager d'Allah."
                </p>
              </div>
              <p>
                Il a affirmé que Allah existe sans endroit et qu'Il n'est pas concerné par le temps.
                Il a mis en garde contre le fait d'attribuer à Allah des caractéristiques des créatures.
              </p>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg border-l-4 border-amber-500">
                <p className="italic text-amber-800 dark:text-amber-200">
                  L'Imam Ach-Chafi^iyy a dit : "Celui qui cherche à approfondir sa connaissance de la
                  science du tawhid (unicité) avant d'avoir affermi sa croyance, celui-là sera perturbé."
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* Son décès */}
          <CollapsibleSection
            title="Son décès"
            icon={<Calendar className="w-5 h-5" />}
          >
            <p className="mb-4">
              L'Imam Ach-Chafi^iyy est décédé le dernier vendredi du mois de Rajab de l'an 204 de l'hégire
              (20 janvier 820 de l'ère chrétienne) au Caire, en Égypte. Il avait 54 ans.
            </p>
            <p className="mb-4">
              Il fut enterré au Caire, où son mausolée est devenu un lieu de visite pour les musulmans
              du monde entier. Sa tombe se trouve dans le quartier qui porte aujourd'hui son nom.
            </p>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                Malgré sa courte vie, l'Imam Ach-Chafi^iyy a laissé un héritage immense : des ouvrages
                fondamentaux comme <span className="font-bold">Ar-Riçalah</span> et <span className="font-bold">Al-'Oumm</span>,
                une méthodologie juridique rigoureuse, et des milliers d'élèves qui ont perpétué son enseignement.
              </p>
            </div>
          </CollapsibleSection>
        </div>

        {/* Citation finale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-amber-600 rounded-2xl p-8 text-white shadow-xl">
            <p className="text-2xl font-amiri mb-4 italic">
              "La science est ce qui profite, non ce qui est mémorisé."
            </p>
            <p className="text-emerald-100">— L'Imam Ach-Chafi^iyy</p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-900 dark:bg-emerald-950 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-emerald-300 font-amiri text-lg">
            Que Allah lui fasse miséricorde et l'agrée
          </p>
        </div>
      </footer>
    </div>
  );
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Star, ChevronRight, Scale, Globe, Shield, Heart } from 'lucide-react';

const Shafii: React.FC = () => {
    const stats = [
        { label: 'Œuvres majeures', value: '60+', icon: BookOpen },
        { label: "Élèves célèbres", value: '70+', icon: Users },
        { label: "Siècles d'influence", value: '12+', icon: Scale },
        { label: 'Pays influencés', value: '35+', icon: Globe },
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
            name: 'Hanbali',
            nameArabic: 'الحنابلة',
            path: '/ecoles/Hanbalite',
            description: "L'école du texte et de la tradition",
            color: 'from-purple-500 to-pink-600'
        },
    ];

    const sources = [
        {
            title: 'Le Coran',
            description: 'Source première et fondamentale de la législation.',
            icon: BookOpen
        },
        {
            title: 'La Sunna',
            description: 'Les enseignements et pratiques du Prophète (paix sur lui).',
            icon: Star
        },
        {
            title: "L'Ijma'",
            description: 'Le consensus de la communauté des savants.',
            icon: Users
        },
        {
            title: 'Le Qiyas',
            description: 'Le raisonnement analogique.',
            icon: Scale
        },
        {
            title: "Al-Istishab",
            description: 'La présomption de continuité (principe de non-changement).',
            icon: Shield
        },
        {
            title: "Usul al-Fiqh",
            description: 'Systématisation des principes juridiques fondamentaux.',
            icon: Heart
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
                        <GraduationCap className="h-12 w-12 text-white" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 font-amiri"
                    >
                        École Shafi'ite
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-emerald-200 max-w-3xl mx-auto mb-4"
                    >
                        L'école équilibrée entre texte et raison
                    </motion.p>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-emerald-300 max-w-2xl mx-auto font-amiri"
                    >
                        Fondée par l'Imam Muhammad ibn Idris al-Shafi'i (767-820 EC)
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
                        L'École Shafi'ite
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            L'école shafi'ite est la troisième des quatre grandes écoles juridiques sunnites.
                            Fondée par l'Imam Muhammad ibn Idris al-Shafi'i (767-820 EC), elle se distingue
                            par sa méthodologie équilibrée qui combine harmonieusement l'attachement aux textes
                            et l'utilisation mesurée du raisonnement.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            L'Imam al-Shafi'i est considéré comme le "maître des fondements" car il a systématisé
                            les principes de la jurisprudence islamique (Usul al-Fiqh). Son œuvre majeure,
                            "Al-Risala", est le premier ouvrage consacré à la méthodologie juridique islamique.
                        </p>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full mt-6"></div>
                    </div>
                </motion.section>

                {/* Section sur l'Imam al-Shafi'i */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-16 bg-gradient-to-r from-amber-100 to-emerald-100 dark:from-emerald-900/30 dark:to-amber-900/30 rounded-2xl p-8 shadow-lg"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-4 font-amiri">
                                Imam Muhammad ibn Idris al-Shafi'i
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                Né à Gaza en 767 EC, l'Imam al-Shafi'i est issu de la tribu Quraych.
                                Il a étudié auprès de l'Imam Malik à Médine et a également bénéficié de
                                l'école hanafite en Irak, ce qui lui a permis de synthétiser les approches
                                de Médine et de Kufa.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Ses deux principales doctrines sont l'"ancienne" (qadim) développée en Irak
                                et la "nouvelle" (jadid) développée en Égypte, où il s'est installé à la fin
                                de sa vie. L'école shafi'ite est largement répandue en Égypte, au Yémen,
                                en Asie du Sud-Est et dans l'est de l'Afrique.
                            </p>
                        </div>
                        <div className="flex-1 text-center">
                            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 p-1">
                                <div className="w-full h-full rounded-full bg-emerald-900 dark:bg-emerald-950 flex items-center justify-center">
                                    <GraduationCap className="h-12 w-12 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Section des sources */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-16"
                >
                    <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-8 font-amiri text-center">
                        Hiérarchie des Sources selon l'École Shafi'ite
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sources.map((source, index) => (
                            <motion.div
                                key={source.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-emerald-800"
                            >
                                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-emerald-800 flex items-center justify-center mb-4">
                                    <source.icon className="h-6 w-6 text-amber-600 dark:text-emerald-400" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                                    {source.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {source.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Section spécifique Usul al-Fiqh */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-16"
                >
                    <div className="bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-gray-800 dark:to-emerald-900/30 rounded-2xl p-6 shadow-lg border border-amber-200 dark:border-emerald-800">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-3 font-amiri">
                                    Al-Risala et l'Usul al-Fiqh
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    "Al-Risala" (L'Épître) est l'œuvre fondatrice qui a établi les principes
                                    méthodologiques de la jurisprudence islamique. L'Imam al-Shafi'i y a défini
                                    les sources du droit dans un ordre hiérarchique précis et a établi les règles
                                    d'interprétation qui font autorité. Cette systématisation a eu une influence
                                    profonde sur toutes les écoles juridiques ultérieures.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 dark:bg-emerald-800">
                                    <BookOpen className="h-10 w-10 text-amber-600 dark:text-emerald-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Section particularités */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.85 }}
                    className="mb-16"
                >
                    <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-8 font-amiri text-center">
                        Particularités de l'École Shafi'ite
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-gray-800 dark:to-emerald-900/50 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-emerald-800">
                            <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-3 font-amiri">
                                Équilibre Méthodologique
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                L'école shafi'ite trouve un juste milieu entre l'attachement strict aux textes
                                de l'école hanbalite et l'utilisation extensive du raisonnement de l'école hanafite.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-gray-800 dark:to-emerald-900/50 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-emerald-800">
                            <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-3 font-amiri">
                                Rejet de l'Istihsan
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Contrairement aux hanafites, l'école shafi'ite rejette l'istihsan (préférence
                                juridique) comme source de loi, privilégiant le qiyas strict.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-gray-800 dark:to-emerald-900/50 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-emerald-800">
                            <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-3 font-amiri">
                                Rayonnement Mondial
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                L'école shafi'ite est majoritaire en Égypte, au Yémen, en Somalie, à Djibouti,
                                en Jordanie, en Palestine, en Indonésie, en Malaisie, à Brunei et aux Philippines.
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
                            La science est une lumière que Dieu place dans le cœur de celui qu'Il veut guider.
                        </p>
                        <p className="text-sm text-emerald-700 dark:text-emerald-400">
                            - Imam Muhammad ibn Idris al-Shafi'i
                        </p>
                    </div>
                </motion.section>
            </main>

            <footer className="bg-emerald-900 dark:bg-emerald-950 text-white py-12 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-emerald-300 mb-4 font-amiri text-xl">
                        "Ceux parmi Ses serviteurs qui craignent Dieu sont les savants."
                    </p>
                    <p className="text-emerald-200 text-sm">
                        Sourate Fatir, verset 28
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Shafii;
