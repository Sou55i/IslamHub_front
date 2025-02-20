import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HadithProvider } from './context/HadithProvider.tsx';
import { CroyanceProvider } from './context/CroyanceProvider.tsx'; // Importez CroyanceProvider
import { DhikrProvider } from './context/DhikrProvider.tsx';
import { DouaaProvider } from './context/DouaaProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HadithProvider>
      <CroyanceProvider> {/* Ajoutez CroyanceProvider ici */}
        <DhikrProvider>
          <DouaaProvider>
            <App />
          </DouaaProvider>
        </DhikrProvider>  
      </CroyanceProvider>
    </HadithProvider>
  </StrictMode>
);