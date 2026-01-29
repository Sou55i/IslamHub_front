import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DhikrProvider } from './context/DhikrProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DhikrProvider>
      <App />
    </DhikrProvider>
  </StrictMode>
);
