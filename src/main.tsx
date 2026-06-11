import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DhikrProvider } from './context/DhikrProvider.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { registerSW } from 'virtual:pwa-register';

// Service worker uniquement sur le web : inutile dans la WebView Capacitor
// (l'app Android embarque déjà ses assets localement)
if (!('Capacitor' in window)) {
  registerSW({ immediate: true });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <DhikrProvider>
        <App />
      </DhikrProvider>
    </ErrorBoundary>
  </StrictMode>
);
