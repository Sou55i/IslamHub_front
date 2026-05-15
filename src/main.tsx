import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DhikrProvider } from './context/DhikrProvider.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <DhikrProvider>
        <App />
      </DhikrProvider>
    </ErrorBoundary>
  </StrictMode>
);
