import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface Dhikr {
  id: number;
  sujet: string;
  texte_arabe: string;
  texte_francais: string;
  phonetique: string;
  explication: string;
  type_id: number;
  commentaire: string;
  
}

interface DhikrContextType {
  dhikrs: Dhikr[];
  fetchDhikrs: () => Promise<void>;
  isLoading: boolean; // Ajout d'un état de chargement
  error: string | null; // Ajout d'une gestion d'erreur
}

const DhikrContext = createContext<DhikrContextType | undefined>(undefined);

export const DhikrProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dhikrs, setDhikrs] = useState<Dhikr[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // État de chargement
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs

  const fetchDhikrs = async () => {
    setIsLoading(true);
    setError(null); // Réinitialiser l'erreur avant chaque requête
    try {
      const response = await api.get('/dhikrs');
      setDhikrs(response.data);
    } catch (error) {
      console.error('Error fetching dhikrs:', error);
      setError('Failed to fetch dhikrs. Please try again later.'); // Message d'erreur
    } finally {
      setIsLoading(false); // Arrêter le chargement une fois la requête terminée
    }
  };

  useEffect(() => {
    fetchDhikrs();
  }, []);

  return (
    <DhikrContext.Provider value={{ dhikrs, fetchDhikrs, isLoading, error }}>
      {children}
    </DhikrContext.Provider>
  );
};

export const useDhikrs = () => {
  const context = useContext(DhikrContext);
  if (context === undefined) {
    throw new Error('useDhikrs must be used within a DhikrProvider');
  }
  return context;
};