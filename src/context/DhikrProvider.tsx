import React, { createContext, useContext, useEffect, useState } from 'react';
import { dataService } from '../services/DataService';
import type { Dhikr } from '../types';

interface DhikrContextType {
  dhikrs: Dhikr[];
  fetchDhikrs: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const DhikrContext = createContext<DhikrContextType | undefined>(undefined);

export const DhikrProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dhikrs, setDhikrs] = useState<Dhikr[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDhikrs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await dataService.getDhikrs();
      setDhikrs(response.data);
    } catch (err) {
      console.error('Error fetching dhikrs:', err);
      setError('Erreur lors du chargement des dhikrs.');
    } finally {
      setIsLoading(false);
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
