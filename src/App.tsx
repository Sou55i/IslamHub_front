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
import { Croyances } from './pages/Croyances';
import { Madhaheb } from './pages/Madhaheb';
import { Hanafi } from './pages/madhaheb/Hanafi';
import { Malikite } from './pages/madhaheb/Malikite';
import { Shafii } from './pages/madhaheb/Shafii';
import { Hanbalite } from './pages/madhaheb/Hanbalite';

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
              <Route path="/croyance" element={<Croyances />} />
              <Route path="/madhaheb" element={<Madhaheb />} />
              <Route path="/madhaheb/Hanafi" element={<Hanafi />} />
              <Route path="/madhaheb/Malikite" element={<Malikite />} />
              <Route path="/madhaheb/Shafii" element={<Shafii />} />
              <Route path="/madhaheb/Hanbalite" element={<Hanbalite />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;