import type {
  Hadith,
  Coran,
  Dhikr,
  Douaa,
  Savant,
  PaginatedResponse,
  PaginationParams,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function sanitizeInput(value: string): string {
  return value.trim().slice(0, 300).replace(/[<>"']/g, '');
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async getWithParams<T>(endpoint: string, params: Record<string, unknown>): Promise<T> {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value != null && value !== '')
    );
    const queryString = new URLSearchParams(filteredParams as Record<string, string>).toString();
    return this.get<T>(`${endpoint}${queryString ? `?${queryString}` : ''}`);
  }
}

const apiClient = new ApiClient();

class DataService {
  // ==========================================
  // Hadiths
  // ==========================================

  async getHadiths(params?: PaginationParams): Promise<PaginatedResponse<Hadith>> {
    const queryParams: Record<string, unknown> = {};
    if (params) { queryParams.page = params.page; queryParams.pageSize = params.pageSize; }
    return apiClient.getWithParams<PaginatedResponse<Hadith>>('/hadiths', queryParams);
  }

  async searchHadiths(searchTerm: string, tag?: string | null, params?: PaginationParams): Promise<PaginatedResponse<Hadith>> {
    const queryParams: Record<string, unknown> = { q: sanitizeInput(searchTerm) };
    if (tag) queryParams.tag = sanitizeInput(tag);
    if (params) { queryParams.page = params.page; queryParams.pageSize = params.pageSize; }
    return apiClient.getWithParams<PaginatedResponse<Hadith>>('/hadiths/search', queryParams);
  }

  async getHadithTags(): Promise<string[]> {
    return apiClient.get<string[]>('/hadiths/tags');
  }

  // ==========================================
  // Coran
  // ==========================================

  async getCoran(params?: PaginationParams): Promise<PaginatedResponse<Coran>> {
    const queryParams: Record<string, unknown> = {};
    if (params) { queryParams.page = params.page; queryParams.pageSize = params.pageSize; }
    return apiClient.getWithParams<PaginatedResponse<Coran>>('/coran', queryParams);
  }

  async searchCoran(searchTerm: string, tag?: string | null, params?: PaginationParams): Promise<PaginatedResponse<Coran>> {
    const queryParams: Record<string, unknown> = { q: sanitizeInput(searchTerm) };
    if (tag) queryParams.tag = sanitizeInput(tag);
    if (params) { queryParams.page = params.page; queryParams.pageSize = params.pageSize; }
    return apiClient.getWithParams<PaginatedResponse<Coran>>('/coran/search', queryParams);
  }

  async getCoranTags(): Promise<string[]> {
    return apiClient.get<string[]>('/coran/tags');
  }

  // ==========================================
  // Dhikrs
  // ==========================================

  async getDhikrs(params?: PaginationParams): Promise<PaginatedResponse<Dhikr>> {
    const queryParams: Record<string, unknown> = {};
    if (params) { queryParams.page = params.page; queryParams.pageSize = params.pageSize; }
    return apiClient.getWithParams<PaginatedResponse<Dhikr>>('/dhikrs', queryParams);
  }

  async searchDhikrs(searchTerm: string, tag?: string | null, params?: PaginationParams): Promise<PaginatedResponse<Dhikr>> {
    const queryParams: Record<string, unknown> = { q: sanitizeInput(searchTerm) };
    if (tag) queryParams.tag = sanitizeInput(tag);
    if (params) { queryParams.page = params.page; queryParams.pageSize = params.pageSize; }
    return apiClient.getWithParams<PaginatedResponse<Dhikr>>('/dhikrs/search', queryParams);
  }

  async getDhikrTags(): Promise<string[]> {
    return apiClient.get<string[]>('/dhikrs/tags');
  }

  // ==========================================
  // Douaas
  // ==========================================

  async getDouaas(params?: PaginationParams): Promise<PaginatedResponse<Douaa>> {
    const queryParams: Record<string, unknown> = {};
    if (params) { queryParams.page = params.page; queryParams.pageSize = params.pageSize; }
    return apiClient.getWithParams<PaginatedResponse<Douaa>>('/douaas', queryParams);
  }

  async searchDouaas(searchTerm: string, tag?: string | null, params?: PaginationParams): Promise<PaginatedResponse<Douaa>> {
    const queryParams: Record<string, unknown> = { q: sanitizeInput(searchTerm) };
    if (tag) queryParams.tag = sanitizeInput(tag);
    if (params) { queryParams.page = params.page; queryParams.pageSize = params.pageSize; }
    return apiClient.getWithParams<PaginatedResponse<Douaa>>('/douaas/search', queryParams);
  }

  async getDouaaTags(): Promise<string[]> {
    return apiClient.get<string[]>('/douaas/tags');
  }

  // ==========================================
  // Savants
  // ==========================================

  async getSavants(params?: PaginationParams): Promise<PaginatedResponse<Savant>> {
    const queryParams: Record<string, unknown> = {};
    if (params) { queryParams.page = params.page; queryParams.pageSize = params.pageSize; }
    return apiClient.getWithParams<PaginatedResponse<Savant>>('/savants', queryParams);
  }

  async searchSavants(searchTerm: string, tag?: string | null, params?: PaginationParams): Promise<PaginatedResponse<Savant>> {
    const queryParams: Record<string, unknown> = { q: sanitizeInput(searchTerm) };
    if (tag) queryParams.tag = sanitizeInput(tag);
    if (params) { queryParams.page = params.page; queryParams.pageSize = params.pageSize; }
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
      return true;
    } catch {
      return false;
    }
  }
}

export const dataService = new DataService();
export default dataService;
