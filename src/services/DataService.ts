import type {
  Hadith,
  Coran,
  Dhikr,
  Douaa,
  Savant,
  Multimedia,
  MultimediaCategory,
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
  // Configuration
  // ==========================================

  setDataSource(mode: DataSourceMode): void {
    currentDataSource = mode;
    this.clearCache();
    console.log(`DataService: switched to ${mode} mode`);
  }

  getDataSource(): DataSourceMode {
    return currentDataSource;
  }

  isUsingSupabase(): boolean {
    return currentDataSource === 'supabase';
  }

  isUsingExpress(): boolean {
    return currentDataSource === 'express';
  }

  isUsingLocal(): boolean {
    return currentDataSource === 'local';
  }

  // ==========================================
  // Hadiths
  // ==========================================

  async getHadiths(params?: PaginationParams): Promise<PaginatedResponse<Hadith>> {
    const { page = 0, pageSize = 20 } = params || {};

    // Mode Supabase
    if (currentDataSource === 'supabase') {
      try {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        const { data, count, error } = await supabase
          .from('hadith')
          .select('*', { count: 'exact' })
          .range(from, to)
          .order('id');

        if (error) throw error;

        return {
          data: data as Hadith[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      } catch (err) {
        console.error('Supabase error, falling back to local:', err);
        return this.getHadithsLocal(params);
      }
    }

    // Mode Express
    if (currentDataSource === 'express') {
      try {
        const response = await api.get('/hadith', {
          params: { page, pageSize }
        });
        return response.data as PaginatedResponse<Hadith>;
      } catch (err) {
        console.error('Express error, falling back to local:', err);
        return this.getHadithsLocal(params);
      }
    }

    // Mode Local
    return this.getHadithsLocal(params);
  }

  private getHadithsLocal(params?: PaginationParams): PaginatedResponse<Hadith> {
    if (!this.cache.hadiths) {
      this.cache.hadiths = hadithsData as Hadith[];
    }
    if (params) {
      return paginate(this.cache.hadiths, params);
    }
    return defaultPaginatedResponse(this.cache.hadiths);
  }

  async searchHadiths(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Hadith>> {
    const { page = 0, pageSize = 20 } = params || {};

    if (currentDataSource === 'supabase' && searchTerm.trim()) {
      try {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        let query = supabase
          .from('hadith')
          .select('*', { count: 'exact' })
          .or(`sujet.ilike.%${searchTerm}%,texte_arabe.ilike.%${searchTerm}%,texte_francais.ilike.%${searchTerm}%`);

        if (tag) {
          query = query.ilike('tag', `%${tag}%`);
        }

        const { data, count, error } = await query.range(from, to).order('id');
        if (error) throw error;

        return {
          data: data as Hadith[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      } catch (err) {
        console.error('Supabase search error:', err);
      }
    }

    if (currentDataSource === 'express' && searchTerm.trim()) {
      try {
        const response = await api.get('/hadith/search', {
          params: { q: searchTerm, tag, page, pageSize }
        });
        return response.data as PaginatedResponse<Hadith>;
      } catch (err) {
        console.error('Express search error:', err);
      }
    }

    // Fallback local
    const all = await this.getHadiths();
    let filtered = filterBySearch(all.data, searchTerm);
    filtered = filterByTag(filtered, tag ?? null);

    if (params) {
      return paginate(filtered, params);
    }
    return defaultPaginatedResponse(filtered);
  }

  async getHadithTags(): Promise<string[]> {
    if (currentDataSource === 'supabase') {
      try {
        const { data, error } = await supabase
          .from('hadith')
          .select('tag');
        if (error) throw error;
        return extractTags(data as { tag?: string }[]);
      } catch (err) {
        console.error('Error fetching hadith tags:', err);
      }
    }

    if (currentDataSource === 'express') {
      try {
        const response = await api.get('/hadith/tags');
        return response.data as string[];
      } catch (err) {
        console.error('Error fetching hadith tags:', err);
      }
    }

    if (!this.cache.hadiths) {
      this.cache.hadiths = hadithsData as Hadith[];
    }
    return extractTags(this.cache.hadiths);
  }

  // ==========================================
  // Coran
  // ==========================================

  async getCoran(params?: PaginationParams): Promise<PaginatedResponse<Coran>> {
    const { page = 0, pageSize = 20 } = params || {};

    if (currentDataSource === 'supabase') {
      try {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        const { data, count, error } = await supabase
          .from('coran')
          .select('*', { count: 'exact' })
          .range(from, to)
          .order('id');

        if (error) throw error;

        return {
          data: data as Coran[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      } catch (err) {
        console.error('Supabase error:', err);
        return this.getCoranLocal(params);
      }
    }

    if (currentDataSource === 'express') {
      try {
        const response = await api.get('/coran', {
          params: { page, pageSize }
        });
        return response.data as PaginatedResponse<Coran>;
      } catch (err) {
        console.error('Express error:', err);
        return this.getCoranLocal(params);
      }
    }

    return this.getCoranLocal(params);
  }

  private getCoranLocal(params?: PaginationParams): PaginatedResponse<Coran> {
    if (!this.cache.coran) {
      this.cache.coran = coranData as Coran[];
    }
    if (params) {
      return paginate(this.cache.coran, params);
    }
    return defaultPaginatedResponse(this.cache.coran);
  }

  async searchCoran(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Coran>> {
    const { page = 0, pageSize = 20 } = params || {};

    if (currentDataSource === 'supabase' && searchTerm.trim()) {
      try {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        let query = supabase
          .from('coran')
          .select('*', { count: 'exact' })
          .or(`sujet.ilike.%${searchTerm}%,texte_arabe.ilike.%${searchTerm}%,texte_francais.ilike.%${searchTerm}%,sourate.ilike.%${searchTerm}%`);

        if (tag) {
          query = query.ilike('tag', `%${tag}%`);
        }

        const { data, count, error } = await query.range(from, to).order('id');
        if (error) throw error;

        return {
          data: data as Coran[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      } catch (err) {
        console.error('Supabase search error:', err);
      }
    }

    if (currentDataSource === 'express' && searchTerm.trim()) {
      try {
        const response = await api.get('/coran/search', {
          params: { q: searchTerm, tag, page, pageSize }
        });
        return response.data as PaginatedResponse<Coran>;
      } catch (err) {
        console.error('Express search error:', err);
      }
    }

    const all = await this.getCoran();
    let filtered = filterBySearch(all.data, searchTerm);
    filtered = filterByTag(filtered, tag ?? null);

    if (params) {
      return paginate(filtered, params);
    }
    return defaultPaginatedResponse(filtered);
  }

  async getCoranTags(): Promise<string[]> {
    if (currentDataSource === 'supabase') {
      try {
        const { data, error } = await supabase.from('coran').select('tag');
        if (error) throw error;
        return extractTags(data as { tag?: string }[]);
      } catch (err) {
        console.error('Error fetching coran tags:', err);
      }
    }

    if (currentDataSource === 'express') {
      try {
        const response = await api.get('/coran/tags');
        return response.data as string[];
      } catch (err) {
        console.error('Error fetching coran tags:', err);
      }
    }

    if (!this.cache.coran) {
      this.cache.coran = coranData as Coran[];
    }
    return extractTags(this.cache.coran);
  }

  // ==========================================
  // Dhikrs
  // ==========================================

  async getDhikrs(params?: PaginationParams): Promise<PaginatedResponse<Dhikr>> {
    const { page = 0, pageSize = 20 } = params || {};

    if (currentDataSource === 'supabase') {
      try {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        const { data, count, error } = await supabase
          .from('dhikr')
          .select('*', { count: 'exact' })
          .range(from, to)
          .order('id');

        if (error) throw error;

        return {
          data: data as Dhikr[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      } catch (err) {
        console.error('Supabase error:', err);
        return this.getDhikrsLocal(params);
      }
    }

    if (currentDataSource === 'express') {
      try {
        const response = await api.get('/dhikr', {
          params: { page, pageSize }
        });
        return response.data as PaginatedResponse<Dhikr>;
      } catch (err) {
        console.error('Express error:', err);
        return this.getDhikrsLocal(params);
      }
    }

    return this.getDhikrsLocal(params);
  }

  private getDhikrsLocal(params?: PaginationParams): PaginatedResponse<Dhikr> {
    if (!this.cache.dhikrs) {
      this.cache.dhikrs = dhikrData as Dhikr[];
    }
    if (params) {
      return paginate(this.cache.dhikrs, params);
    }
    return defaultPaginatedResponse(this.cache.dhikrs);
  }

  async searchDhikrs(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Dhikr>> {
    const { page = 0, pageSize = 20 } = params || {};

    if (currentDataSource === 'supabase' && searchTerm.trim()) {
      try {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        let query = supabase
          .from('dhikr')
          .select('*', { count: 'exact' })
          .or(`sujet.ilike.%${searchTerm}%,texte_arabe.ilike.%${searchTerm}%,texte_francais.ilike.%${searchTerm}%`);

        if (tag) {
          query = query.ilike('tag', `%${tag}%`);
        }

        const { data, count, error } = await query.range(from, to).order('id');
        if (error) throw error;

        return {
          data: data as Dhikr[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      } catch (err) {
        console.error('Supabase search error:', err);
      }
    }

    if (currentDataSource === 'express' && searchTerm.trim()) {
      try {
        const response = await api.get('/dhikr/search', {
          params: { q: searchTerm, tag, page, pageSize }
        });
        return response.data as PaginatedResponse<Dhikr>;
      } catch (err) {
        console.error('Express search error:', err);
      }
    }

    const all = await this.getDhikrs();
    let filtered = filterBySearch(all.data, searchTerm);
    filtered = filterByTag(filtered, tag ?? null);

    if (params) {
      return paginate(filtered, params);
    }
    return defaultPaginatedResponse(filtered);
  }

  async getDhikrTags(): Promise<string[]> {
    if (currentDataSource === 'supabase') {
      try {
        const { data, error } = await supabase.from('dhikr').select('tag');
        if (error) throw error;
        return extractTags(data as { tag?: string }[]);
      } catch (err) {
        console.error('Error fetching dhikr tags:', err);
      }
    }

    if (currentDataSource === 'express') {
      try {
        const response = await api.get('/dhikr/tags');
        return response.data as string[];
      } catch (err) {
        console.error('Error fetching dhikr tags:', err);
      }
    }

    if (!this.cache.dhikrs) {
      this.cache.dhikrs = dhikrData as Dhikr[];
    }
    return extractTags(this.cache.dhikrs);
  }

  // ==========================================
  // Douaas
  // ==========================================

  async getDouaas(params?: PaginationParams): Promise<PaginatedResponse<Douaa>> {
    const { page = 0, pageSize = 20 } = params || {};

    if (currentDataSource === 'supabase') {
      try {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        const { data, count, error } = await supabase
          .from('douaa')
          .select('*', { count: 'exact' })
          .range(from, to)
          .order('id');

        if (error) throw error;

        return {
          data: data as Douaa[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      } catch (err) {
        console.error('Supabase error:', err);
        return this.getDouaasLocal(params);
      }
    }

    if (currentDataSource === 'express') {
      try {
        const response = await api.get('/douaa', {
          params: { page, pageSize }
        });
        return response.data as PaginatedResponse<Douaa>;
      } catch (err) {
        console.error('Express error:', err);
        return this.getDouaasLocal(params);
      }
    }

    return this.getDouaasLocal(params);
  }

  private getDouaasLocal(params?: PaginationParams): PaginatedResponse<Douaa> {
    if (!this.cache.douaas) {
      this.cache.douaas = douaaData as Douaa[];
    }
    if (params) {
      return paginate(this.cache.douaas, params);
    }
    return defaultPaginatedResponse(this.cache.douaas);
  }

  async searchDouaas(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Douaa>> {
    const { page = 0, pageSize = 20 } = params || {};

    if (currentDataSource === 'supabase' && searchTerm.trim()) {
      try {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        let query = supabase
          .from('douaa')
          .select('*', { count: 'exact' })
          .or(`sujet.ilike.%${searchTerm}%,texte_arabe.ilike.%${searchTerm}%,texte_francais.ilike.%${searchTerm}%`);

        if (tag) {
          query = query.ilike('tag', `%${tag}%`);
        }

        const { data, count, error } = await query.range(from, to).order('id');
        if (error) throw error;

        return {
          data: data as Douaa[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      } catch (err) {
        console.error('Supabase search error:', err);
      }
    }

    if (currentDataSource === 'express' && searchTerm.trim()) {
      try {
        const response = await api.get('/douaa/search', {
          params: { q: searchTerm, tag, page, pageSize }
        });
        return response.data as PaginatedResponse<Douaa>;
      } catch (err) {
        console.error('Express search error:', err);
      }
    }

    const all = await this.getDouaas();
    let filtered = filterBySearch(all.data, searchTerm);
    filtered = filterByTag(filtered, tag ?? null);

    if (params) {
      return paginate(filtered, params);
    }
    return defaultPaginatedResponse(filtered);
  }

  async getDouaaTags(): Promise<string[]> {
    if (currentDataSource === 'supabase') {
      try {
        const { data, error } = await supabase.from('douaa').select('tag');
        if (error) throw error;
        return extractTags(data as { tag?: string }[]);
      } catch (err) {
        console.error('Error fetching douaa tags:', err);
      }
    }

    if (currentDataSource === 'express') {
      try {
        const response = await api.get('/douaa/tags');
        return response.data as string[];
      } catch (err) {
        console.error('Error fetching douaa tags:', err);
      }
    }

    if (!this.cache.douaas) {
      this.cache.douaas = douaaData as Douaa[];
    }
    return extractTags(this.cache.douaas);
  }

  // ==========================================
  // Savants (parole table in Supabase)
  // ==========================================

  async getSavants(params?: PaginationParams): Promise<PaginatedResponse<Savant>> {
    const { page = 0, pageSize = 20 } = params || {};

    if (currentDataSource === 'supabase') {
      try {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        const { data, count, error } = await supabase
          .from('parole')
          .select('*', { count: 'exact' })
          .range(from, to)
          .order('id');

        if (error) throw error;

        return {
          data: data as Savant[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      } catch (err) {
        console.error('Supabase error:', err);
        return this.getSavantsLocal(params);
      }
    }

    if (currentDataSource === 'express') {
      try {
        const response = await api.get('/parole', {
          params: { page, pageSize }
        });
        return response.data as PaginatedResponse<Savant>;
      } catch (err) {
        console.error('Express error:', err);
        return this.getSavantsLocal(params);
      }
    }

    return this.getSavantsLocal(params);
  }

  private getSavantsLocal(params?: PaginationParams): PaginatedResponse<Savant> {
    if (!this.cache.savants) {
      this.cache.savants = savantData as Savant[];
    }
    if (params) {
      return paginate(this.cache.savants, params);
    }
    return defaultPaginatedResponse(this.cache.savants);
  }

  async searchSavants(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Savant>> {
    const { page = 0, pageSize = 20 } = params || {};

    if (currentDataSource === 'supabase' && searchTerm.trim()) {
      try {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        let query = supabase
          .from('parole')
          .select('*', { count: 'exact' })
          .or(`sujet.ilike.%${searchTerm}%,savant.ilike.%${searchTerm}%,texte_arabe.ilike.%${searchTerm}%,texte_francais.ilike.%${searchTerm}%`);

        if (tag) {
          query = query.ilike('tag', `%${tag}%`);
        }

        const { data, count, error } = await query.range(from, to).order('id');
        if (error) throw error;

        return {
          data: data as Savant[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      } catch (err) {
        console.error('Supabase search error:', err);
      }
    }

    if (currentDataSource === 'express' && searchTerm.trim()) {
      try {
        const response = await api.get('/parole/search', {
          params: { q: searchTerm, tag, page, pageSize }
        });
        return response.data as PaginatedResponse<Savant>;
      } catch (err) {
        console.error('Express search error:', err);
      }
    }

    const all = await this.getSavants();
    let filtered = filterBySearch(all.data, searchTerm);
    filtered = filterByTag(filtered, tag ?? null);

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const byName = all.data.filter(s =>
        s.savant?.toLowerCase().includes(term)
      );
      const ids = new Set(filtered.map(f => f.id));
      byName.forEach(s => {
        if (!ids.has(s.id)) {
          filtered.push(s);
        }
      });
    }

    if (params) {
      return paginate(filtered, params);
    }
    return defaultPaginatedResponse(filtered);
  }

  async getSavantTags(): Promise<string[]> {
    if (currentDataSource === 'supabase') {
      try {
        const { data, error } = await supabase.from('parole').select('tag');
        if (error) throw error;
        return extractTags(data as { tag?: string }[]);
      } catch (err) {
        console.error('Error fetching savant tags:', err);
      }
    }

    if (currentDataSource === 'express') {
      try {
        const response = await api.get('/parole/tags');
        return response.data as string[];
      } catch (err) {
        console.error('Error fetching savant tags:', err);
      }
    }

    if (!this.cache.savants) {
      this.cache.savants = savantData as Savant[];
    }
    return extractTags(this.cache.savants);
  }

  async getSavantNames(): Promise<string[]> {
    if (currentDataSource === 'supabase') {
      try {
        const { data, error } = await supabase.from('parole').select('savant');
        if (error) throw error;
        const names = new Set<string>();
        (data as { savant?: string }[]).forEach(s => {
          if (s.savant) names.add(s.savant);
        });
        return Array.from(names).sort();
      } catch (err) {
        console.error('Error fetching savant names:', err);
      }
    }

    if (currentDataSource === 'express') {
      try {
        const response = await api.get('/parole/savants');
        return response.data as string[];
      } catch (err) {
        console.error('Error fetching savant names:', err);
      }
    }

    if (!this.cache.savants) {
      this.cache.savants = savantData as Savant[];
    }
    const names = new Set<string>();
    this.cache.savants.forEach(s => {
      if (s.savant) names.add(s.savant);
    });
    return Array.from(names).sort();
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
