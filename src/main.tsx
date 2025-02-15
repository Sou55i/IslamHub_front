import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HadithProvider } from './context/HadithProvider.tsx';
import { CroyanceProvider } from './context/CroyanceProvider.tsx'; // Importez CroyanceProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HadithProvider>
      <CroyanceProvider> {/* Ajoutez CroyanceProvider ici */}
        <App />
      </CroyanceProvider>
    </HadithProvider>
  </StrictMode>
);