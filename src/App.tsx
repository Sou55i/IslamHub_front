import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Hadiths } from './pages/Hadiths';
import { Dhikrs } from './pages/Dhikrs';
import { Douaas } from './pages/Douaas';
import { Jurisprudence } from './pages/Jurisprudence';
import { Biographies } from './pages/Biographies';
import { Multimedia } from './pages/Multimedia';
import { PrayerTimesPage } from './pages/PrayerTimes';
import { ThemeProvider } from './context/ThemeContext';
import { Croyance } from './pages/Croyance';
import { Madhaheb } from './pages/Madhaheb';
import AttributsDeDieu from './pages/foi/CroireEnDieu/AttributsDeDieu';
import part1 from './pages/hadith/Al-Bukhari/part1'
import AlBukhari from './pages/hadith/Al-Bukhari/AlBukhari';
import ArgumentationGlobale from './pages/foi/Sectes/Repliques/Athees/ArgumentationGlobale.tsx';
import Introduction from './pages/foi/Sectes/Repliques/Athees/introduction.tsx';
import Repliques from './pages/./Repliques.tsx'
import Raison from './pages/foi/Sectes/Repliques/Athees/raison.tsx'
import Sectes from './pages/foi/Sectes/Sectes.tsx';
import MiseEnGarde from './pages/Mise-en-garde.tsx';
import AllahExisteSansEndroit from "./pages/repliques/AllahExisteSansEndroit.tsx";
import AlBaghdadiyy from './pages/repliques/ExtraitsDesLivresDesSavants/Al-Baghdadiyy.tsx';



// Import groupé depuis le dossier foi
import {
  CroyanceEnDieu,
  CroyanceAnges,
  CreationMonde,
  jourDernier,
  predestination,
  tombe,
  livres,
} from './pages/foi';

// Import groupé depuis le dossier ecoles

import {
  Hanafi, // Import depuis index.ecoles.tsx
  Malikite,
  Shafii,
  Hanbalite,
} from './pages/ecoles';




function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/croyance" element={<Croyance />} />
              <Route path="/croyance/" element={<Croyance />} />
              <Route path="/hadiths" element={<Hadiths />} />
              <Route path="/hadith/albukhari" element={<AlBukhari />} />
              <Route path="/hadith/albukhari/part1" element={<part1 />} />
              <Route path="/dhikrs" element={<Dhikrs />} />
              <Route path="/douaas" element={<Douaas />} />
              <Route path="/jurisprudence" element={<Jurisprudence />} />
              <Route path="/jurisprudence/repliques/athees/argumentation-globale" element={<ArgumentationGlobale />} />
              <Route path="/jurisprudence/repliques/athees/introduction" element={<Introduction />} />
              <Route path="/jurisprudence/repliques/athees/raison" element={<Raison />} />
              <Route path="/biographies" element={<Biographies />} />
              <Route path="/multimedia" element={<Multimedia />} />
              <Route path="/prayer-times" element={<PrayerTimesPage />} />
              <Route path="/ecoles" element={<Madhaheb />} />
              <Route path="/ecoles/Hanafi" element={<Hanafi />} />
              <Route path="/ecoles/Malikite" element={<Malikite />} />
              <Route path="/ecoles/Shafii" element={<Shafii />} />
              <Route path="/ecoles/Hanbalite" element={<Hanbalite />} />
              <Route path="/croyance/CroyanceEnDieu" element={<CroyanceEnDieu />} />
              <Route path="/croyance/CroireEnDieu/AttributsDeDieu" element={<AttributsDeDieu />} />
              <Route path="/jurisprudence/Croyance/CroyanceAnges" element={<CroyanceAnges />} />
              <Route path="/foi/CreationMonde" element={<CreationMonde />} />
              <Route path="/foi/jourDernier" element={<jourDernier />} />
              <Route path="/foi/predestination" element={<predestination />} />
              <Route path="/foi/tombe" element={<tombe />} />
              <Route path="/foi/livres" element={<livres />} />
              <Route path="/sectes" element={<Sectes />} />
              <Route path="/mise-en-garde" element={<MiseEnGarde />} />
              <Route path="/repliques" element={<Repliques />} />
              <Route path="/repliques/extraits-de-livres-de-savants/al-baghdadiyy" element={<AlBaghdadiyy />} />
              <Route path="/repliques/Allahexistesansendroit" element={<AllahExisteSansEndroit />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;