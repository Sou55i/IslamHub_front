// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Imports groupés depuis les fichiers d'index
import {
  CroyanceEnDieu,
  CroyanceAnges,
  CreationMonde,
  jourDernier,
  predestination,
  tombe,
  livres,
} from './pages/croyance';

// Importez AttributsDeDieu directement depuis son fichier
import { AttributsDeDieu } from './pages/croyance/CroireEnDieu/AttributsDeDieu';

import { Hanafi, Malikite, Shafii, Hanbalite } from './pages/madhaheb';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hadiths" element={<Hadiths />} />
              <Route path="/dhikrs" element={<Dhikrs />} />
              <Route path="/douaas" element={<Douaas />} />
              <Route path="/jurisprudence" element={<Jurisprudence />} />
              <Route path="/biographies" element={<Biographies />} />
              <Route path="/multimedia" element={<Multimedia />} />
              <Route path="/prayer-times" element={<PrayerTimesPage />} />
              <Route path="/croyance" element={<Croyance />} />
              <Route path="/madhaheb" element={<Madhaheb />} />
              <Route path="/madhaheb/Hanafi" element={<Hanafi />} />
              <Route path="/madhaheb/Malikite" element={<Malikite />} />
              <Route path="/madhaheb/Shafii" element={<Shafii />} />
              <Route path="/madhaheb/Hanbalite" element={<Hanbalite />} />
              <Route path="/croyance/CroyanceEnDieu" element={<CroyanceEnDieu />} />
              <Route path="/croyance/CroyanceAnges" element={<CroyanceAnges />} />
              <Route path="/croyance/CreationMonde" element={<CreationMonde />} />
              <Route path="/croyance/jourDernier" element={<jourDernier />} />
              <Route path="/croyance/predestination" element={<predestination />} />
              <Route path="/croyance/tombe" element={<tombe />} />
              <Route path="/croyance/livres" element={<livres />} />
              <Route path="/croyance/CroireEnDieu/AttributsDeDieu" element={<AttributsDeDieu />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;