/**
 * DataService - Service unifié pour la gestion des données
 */

import type {
  Hadith,
  Coran,
  Dhikr,
  Douaa,
  Savant,
  PaginatedResponse,
  PaginationParams,
} from '../types';

// Helper pour récupérer l'URL de l'API
const getApiUrl = (): string => {
  // Vérifier d'abord les variables d'environnement
  let apiUrl = '';

  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) {
    apiUrl = import.meta.env.VITE_API_URL;
  } else if (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) {
    apiUrl = process.env.REACT_APP_API_URL;
  }

  // Si pas de variable ou en développement, utiliser localhost
  if (!apiUrl || apiUrl.includes('votre-api.com')) {
    apiUrl = 'http://localhost:3001/api';
  }

  console.log('🔧 API URL configurée:', apiUrl);
  return apiUrl;
};

const API_BASE_URL = getApiUrl();

// ==========================================
// Client API
// ==========================================

class ApiClient {
  private async request<T>(
      endpoint: string,
      options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    console.log(`📡 API Request: ${options.method || 'GET'} ${url}`);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Error ${response.status}:`, errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ API Response: ${url}`, data);
      return data;
    } catch (error) {
      console.error(`❌ API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async getWithParams<T>(
      endpoint: string,
      params: Record<string, any>
  ): Promise<T> {
    // Filtrer les paramètres undefined ou null
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value != null && value !== '')
    );
    const queryString = new URLSearchParams(
        filteredParams as Record<string, string>
    ).toString();

    const fullEndpoint = `${endpoint}${queryString ? `?${queryString}` : ''}`;
    return this.get<T>(fullEndpoint);
  }
}

const apiClient = new ApiClient();

// ==========================================
// DataService Class
// ==========================================

class DataService {
  // ==========================================
  // Hadiths
  // ==========================================

  async getHadiths(params?: PaginationParams): Promise<PaginatedResponse<Hadith>> {
    const queryParams: Record<string, any> = {};
    if (params) {
      queryParams.page = params.page;
      queryParams.pageSize = params.pageSize;
    }
    return apiClient.getWithParams<PaginatedResponse<Hadith>>('/hadiths', queryParams);
  }

  async searchHadiths(
      searchTerm: string,
      tag?: string | null,
      params?: PaginationParams
  ): Promise<PaginatedResponse<Hadith>> {
    const queryParams: Record<string, any> = {
      q: searchTerm || ''
    };
    if (tag) {
      queryParams.tag = tag;
    }
    if (params) {
      queryParams.page = params.page;
      queryParams.pageSize = params.pageSize;
    }
    return apiClient.getWithParams<PaginatedResponse<Hadith>>('/hadiths/search', queryParams);
  }

  async getHadithTags(): Promise<string[]> {
    return apiClient.get<string[]>('/hadiths/tags');
  }

  // ==========================================
  // Coran
  // ==========================================

  async getCoran(params?: PaginationParams): Promise<PaginatedResponse<Coran>> {
    const queryParams: Record<string, any> = {};
    if (params) {
      queryParams.page = params.page;
      queryParams.pageSize = params.pageSize;
    }
    return apiClient.getWithParams<PaginatedResponse<Coran>>('/coran', queryParams);
  }

  async searchCoran(
      searchTerm: string,
      tag?: string | null,
      params?: PaginationParams
  ): Promise<PaginatedResponse<Coran>> {
    const queryParams: Record<string, any> = {
      q: searchTerm || ''
    };
    if (tag) {
      queryParams.tag = tag;
    }
    if (params) {
      queryParams.page = params.page;
      queryParams.pageSize = params.pageSize;
    }
    return apiClient.getWithParams<PaginatedResponse<Coran>>('/coran/search', queryParams);
  }

  async getCoranTags(): Promise<string[]> {
    return apiClient.get<string[]>('/coran/tags');
  }

  // ==========================================
  // Dhikrs
  // ==========================================

  async getDhikrs(params?: PaginationParams): Promise<PaginatedResponse<Dhikr>> {
    const queryParams: Record<string, any> = {};
    if (params) {
      queryParams.page = params.page;
      queryParams.pageSize = params.pageSize;
    }
    return apiClient.getWithParams<PaginatedResponse<Dhikr>>('/dhikrs', queryParams);
  }

  async searchDhikrs(
      searchTerm: string,
      tag?: string | null,
      params?: PaginationParams
  ): Promise<PaginatedResponse<Dhikr>> {
    const queryParams: Record<string, any> = {
      q: searchTerm || ''
    };
    if (tag) {
      queryParams.tag = tag;
    }
    if (params) {
      queryParams.page = params.page;
      queryParams.pageSize = params.pageSize;
    }
    return apiClient.getWithParams<PaginatedResponse<Dhikr>>('/dhikrs/search', queryParams);
  }

  async getDhikrTags(): Promise<string[]> {
    return apiClient.get<string[]>('/dhikrs/tags');
  }

  // ==========================================
  // Douaas
  // ==========================================

  async getDouaas(params?: PaginationParams): Promise<PaginatedResponse<Douaa>> {
    const queryParams: Record<string, any> = {};
    if (params) {
      queryParams.page = params.page;
      queryParams.pageSize = params.pageSize;
    }
    return apiClient.getWithParams<PaginatedResponse<Douaa>>('/douaas', queryParams);
  }

  async searchDouaas(
      searchTerm: string,
      tag?: string | null,
      params?: PaginationParams
  ): Promise<PaginatedResponse<Douaa>> {
    const queryParams: Record<string, any> = {
      q: searchTerm || ''
    };
    if (tag) {
      queryParams.tag = tag;
    }
    if (params) {
      queryParams.page = params.page;
      queryParams.pageSize = params.pageSize;
    }
    return apiClient.getWithParams<PaginatedResponse<Douaa>>('/douaas/search', queryParams);
  }

  async getDouaaTags(): Promise<string[]> {
    return apiClient.get<string[]>('/douaas/tags');
  }

  // ==========================================
  // Savants
  // ==========================================

  async getSavants(params?: PaginationParams): Promise<PaginatedResponse<Savant>> {
    const queryParams: Record<string, any> = {};
    if (params) {
      queryParams.page = params.page;
      queryParams.pageSize = params.pageSize;
    }
    return apiClient.getWithParams<PaginatedResponse<Savant>>('/savants', queryParams);
  }

  async searchSavants(
      searchTerm: string,
      tag?: string | null,
      params?: PaginationParams
  ): Promise<PaginatedResponse<Savant>> {
    const queryParams: Record<string, any> = {
      q: searchTerm || ''
    };
    if (tag) {
      queryParams.tag = tag;
    }
    if (params) {
      queryParams.page = params.page;
      queryParams.pageSize = params.pageSize;
    }
    return apiClient.getWithParams<PaginatedResponse<Savant>>('/savants/search', queryParams);
  }

  async getSavantTags(): Promise<string[]> {
    return apiClient.get<string[]>('/savants/tags');
  }

  async getSavantNames(): Promise<string[]> {
    return apiClient.get<string[]>('/savants/names');
  }

  // ==========================================
  // Utilitaires
  // ==========================================

  async testApiConnection(): Promise<boolean> {
    try {
      await apiClient.get('/health');
      console.log('✅ API connection successful');
      return true;
    } catch (error) {
      console.error('❌ API connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const dataService = new DataService();
export default dataService;