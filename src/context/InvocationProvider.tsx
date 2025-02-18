import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface Invocation {
  id: number;
  sujet: string;
  texte_arabe: string;
  texte_francais: string;
  phonetique: string;
  explication: string;
  texte_francais: string;
  type_id: number;
  commentaire: string;
  
}

interface HadithContextType {
  invocations: Invocations[];
  fetchInvocations: () => Promise<void>;
  isLoading: boolean; // Ajout d'un état de chargement
  error: string | null; // Ajout d'une gestion d'erreur
}

const InvocationContext = createContext<InvocationContextType | undefined>(undefined);

export const InvocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invocations, setInvocations] = useState<Invocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // État de chargement
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs

  const fetchInvocations = async () => {
    setIsLoading(true);
    setError(null); // Réinitialiser l'erreur avant chaque requête
    try {
      const response = await api.get('/invocations');
      setInvocations(response.data);
    } catch (error) {
      console.error('Error fetching invocations:', error);
      setError('Failed to fetch invocations. Please try again later.'); // Message d'erreur
    } finally {
      setIsLoading(false); // Arrêter le chargement une fois la requête terminée
    }
  };

  useEffect(() => {
    fetchInvocations();
  }, []);

  return (
    <InvocationContext.Provider value={{ invocations, fetchInvocations, isLoading, error }}>
      {children}
    </InvocationContext.Provider>
  );
};

export const useInvocations = () => {
  const context = useContext(InvocationContext);
  if (context === undefined) {
    throw new Error('useInvocations must be used within a InvocationProvider');
  }
  return context;
};