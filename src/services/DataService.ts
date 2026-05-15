/**
 * DataService - Service unifié pour la gestion des données
 *
 * Ce service abstrait l'accès aux données pour faciliter la migration
 * de JSON local vers Supabase.
 *
 * Si les credentials Supabase sont configurés, utilise Supabase.
 * Sinon, utilise les données JSON locales en fallback.
 */

import type {
  Hadith,
  Coran,
  Dhikr,
  Douaa,
  Savant,
  PaginatedResponse,
  PaginationParams,
  BaseText
} from '../types';

import { supabase } from './supabase';

// Import des données JSON locales (fallback)
import hadithsData from '../data/hadith.json';
import coranData from '../data/coran.json';
import dhikrData from '../data/dhikr.json';
import douaaData from '../data/douaa.json';
import savantData from '../data/savant.json';

// Détecter si Supabase est configuré
const USE_SUPABASE = Boolean(
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ==========================================
// Fonctions utilitaires
// ==========================================

function extractTags<T extends BaseText>(items: T[]): string[] {
  const tagsSet = new Set<string>();
  items.forEach(item => {
    if (item.tag) {
      item.tag.split(',').forEach(t => tagsSet.add(t.trim()));
    }
  });
  return Array.from(tagsSet).sort();
}

function filterBySearch<T extends BaseText>(items: T[], searchTerm: string): T[] {
  if (!searchTerm.trim()) return items;

  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    item.sujet?.toLowerCase().includes(term) ||
    item.texte_arabe?.toLowerCase().includes(term) ||
    item.texte_francais?.toLowerCase().includes(term) ||
    item.explication?.toLowerCase().includes(term) ||
    item.tag?.toLowerCase().includes(term)
  );
}

function filterByTag<T extends BaseText>(items: T[], tag: string | null): T[] {
  if (!tag) return items;
  return items.filter(item =>
    item.tag?.toLowerCase().includes(tag.toLowerCase())
  );
}

function paginate<T>(items: T[], params: PaginationParams): PaginatedResponse<T> {
  const { page, pageSize } = params;
  const start = page * pageSize;
  const end = start + pageSize;
  const data = items.slice(start, end);

  return {
    data,
    count: items.length,
    page,
    pageSize,
    hasMore: end < items.length
  };
}

// ==========================================
// DataService Class
// ==========================================

class DataService {
  private cache: {
    hadiths: Hadith[] | null;
    coran: Coran[] | null;
    dhikrs: Dhikr[] | null;
    douaas: Douaa[] | null;
    savants: Savant[] | null;
  } = {
    hadiths: null,
    coran: null,
    dhikrs: null,
    douaas: null,
    savants: null
  };

  // ==========================================
  // Hadiths
  // ==========================================

  async getHadiths(params?: PaginationParams): Promise<PaginatedResponse<Hadith>> {
    if (USE_SUPABASE) {
      const { page = 0, pageSize = 20 } = params || {};
      const from = page * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from('hadiths')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('id');

      if (error) {
        console.error('Supabase error:', error);
        return this.getHadithsLocal(params);
      }

      return {
        data: data as Hadith[],
        count: count || 0,
        page,
        pageSize,
        hasMore: (from + pageSize) < (count || 0)
      };
    }

    return this.getHadithsLocal(params);
  }

  private getHadithsLocal(params?: PaginationParams): PaginatedResponse<Hadith> {
    if (!this.cache.hadiths) {
      this.cache.hadiths = hadithsData as Hadith[];
    }
    if (params) {
      return paginate(this.cache.hadiths, params);
    }
    return {
      data: this.cache.hadiths,
      count: this.cache.hadiths.length,
      page: 0,
      pageSize: this.cache.hadiths.length,
      hasMore: false
    };
  }

  async searchHadiths(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Hadith>> {
    if (USE_SUPABASE && searchTerm.trim()) {
      const { page = 0, pageSize = 20 } = params || {};
      const from = page * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('hadiths')
        .select('*', { count: 'exact' })
        .or(`sujet.ilike.%${searchTerm}%,texte_arabe.ilike.%${searchTerm}%,texte_francais.ilike.%${searchTerm}%`);

      if (tag) {
        query = query.ilike('tag', `%${tag}%`);
      }

      const { data, count, error } = await query.range(from, to).order('id');

      if (error) {
        console.error('Supabase search error:', error);
      } else {
        return {
          data: data as Hadith[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      }
    }

    const all = await this.getHadiths();
    let filtered = filterBySearch(all.data, searchTerm);
    filtered = filterByTag(filtered, tag ?? null);

    if (params) {
      return paginate(filtered, params);
    }
    return {
      data: filtered,
      count: filtered.length,
      page: 0,
      pageSize: filtered.length,
      hasMore: false
    };
  }

  async getHadithTags(): Promise<string[]> {
    if (USE_SUPABASE) {
      const { data, error } = await supabase
        .from('hadiths')
        .select('tag');

      if (!error && data) {
        return extractTags(data as { tag?: string }[]);
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
    if (USE_SUPABASE) {
      const { page = 0, pageSize = 20 } = params || {};
      const from = page * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from('coran')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('id');

      if (error) {
        console.error('Supabase error:', error);
        return this.getCoranLocal(params);
      }

      return {
        data: data as Coran[],
        count: count || 0,
        page,
        pageSize,
        hasMore: (from + pageSize) < (count || 0)
      };
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
    return {
      data: this.cache.coran,
      count: this.cache.coran.length,
      page: 0,
      pageSize: this.cache.coran.length,
      hasMore: false
    };
  }

  async searchCoran(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Coran>> {
    if (USE_SUPABASE && searchTerm.trim()) {
      const { page = 0, pageSize = 20 } = params || {};
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

      if (!error) {
        return {
          data: data as Coran[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      }
    }

    const all = await this.getCoran();
    let filtered = filterBySearch(all.data, searchTerm);
    filtered = filterByTag(filtered, tag ?? null);

    if (params) {
      return paginate(filtered, params);
    }
    return {
      data: filtered,
      count: filtered.length,
      page: 0,
      pageSize: filtered.length,
      hasMore: false
    };
  }

  async getCoranTags(): Promise<string[]> {
    if (USE_SUPABASE) {
      const { data, error } = await supabase
        .from('coran')
        .select('tag');

      if (!error && data) {
        return extractTags(data as { tag?: string }[]);
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
    if (USE_SUPABASE) {
      const { page = 0, pageSize = 20 } = params || {};
      const from = page * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from('dhikrs')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('id');

      if (error) {
        console.error('Supabase error:', error);
        return this.getDhikrsLocal(params);
      }

      return {
        data: data as Dhikr[],
        count: count || 0,
        page,
        pageSize,
        hasMore: (from + pageSize) < (count || 0)
      };
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
    return {
      data: this.cache.dhikrs,
      count: this.cache.dhikrs.length,
      page: 0,
      pageSize: this.cache.dhikrs.length,
      hasMore: false
    };
  }

  async searchDhikrs(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Dhikr>> {
    if (USE_SUPABASE && searchTerm.trim()) {
      const { page = 0, pageSize = 20 } = params || {};
      const from = page * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('dhikrs')
        .select('*', { count: 'exact' })
        .or(`sujet.ilike.%${searchTerm}%,texte_arabe.ilike.%${searchTerm}%,texte_francais.ilike.%${searchTerm}%`);

      if (tag) {
        query = query.ilike('tag', `%${tag}%`);
      }

      const { data, count, error } = await query.range(from, to).order('id');

      if (!error) {
        return {
          data: data as Dhikr[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      }
    }

    const all = await this.getDhikrs();
    let filtered = filterBySearch(all.data, searchTerm);
    filtered = filterByTag(filtered, tag ?? null);

    if (params) {
      return paginate(filtered, params);
    }
    return {
      data: filtered,
      count: filtered.length,
      page: 0,
      pageSize: filtered.length,
      hasMore: false
    };
  }

  async getDhikrTags(): Promise<string[]> {
    if (USE_SUPABASE) {
      const { data, error } = await supabase
        .from('dhikrs')
        .select('tag');

      if (!error && data) {
        return extractTags(data as { tag?: string }[]);
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
    if (USE_SUPABASE) {
      const { page = 0, pageSize = 20 } = params || {};
      const from = page * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from('douaas')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('id');

      if (error) {
        console.error('Supabase error:', error);
        return this.getDouaasLocal(params);
      }

      return {
        data: data as Douaa[],
        count: count || 0,
        page,
        pageSize,
        hasMore: (from + pageSize) < (count || 0)
      };
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
    return {
      data: this.cache.douaas,
      count: this.cache.douaas.length,
      page: 0,
      pageSize: this.cache.douaas.length,
      hasMore: false
    };
  }

  async searchDouaas(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Douaa>> {
    if (USE_SUPABASE && searchTerm.trim()) {
      const { page = 0, pageSize = 20 } = params || {};
      const from = page * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('douaas')
        .select('*', { count: 'exact' })
        .or(`sujet.ilike.%${searchTerm}%,texte_arabe.ilike.%${searchTerm}%,texte_francais.ilike.%${searchTerm}%`);

      if (tag) {
        query = query.ilike('tag', `%${tag}%`);
      }

      const { data, count, error } = await query.range(from, to).order('id');

      if (!error) {
        return {
          data: data as Douaa[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
      }
    }

    const all = await this.getDouaas();
    let filtered = filterBySearch(all.data, searchTerm);
    filtered = filterByTag(filtered, tag ?? null);

    if (params) {
      return paginate(filtered, params);
    }
    return {
      data: filtered,
      count: filtered.length,
      page: 0,
      pageSize: filtered.length,
      hasMore: false
    };
  }

  async getDouaaTags(): Promise<string[]> {
    if (USE_SUPABASE) {
      const { data, error } = await supabase
        .from('douaas')
        .select('tag');

      if (!error && data) {
        return extractTags(data as { tag?: string }[]);
      }
    }

    if (!this.cache.douaas) {
      this.cache.douaas = douaaData as Douaa[];
    }
    return extractTags(this.cache.douaas);
  }

  // ==========================================
  // Savants
  // ==========================================

  async getSavants(params?: PaginationParams): Promise<PaginatedResponse<Savant>> {
    if (USE_SUPABASE) {
      const { page = 0, pageSize = 20 } = params || {};
      const from = page * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from('savants')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('id');

      if (error) {
        console.error('Supabase error:', error);
        return this.getSavantsLocal(params);
      }

      return {
        data: data as Savant[],
        count: count || 0,
        page,
        pageSize,
        hasMore: (from + pageSize) < (count || 0)
      };
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
    return {
      data: this.cache.savants,
      count: this.cache.savants.length,
      page: 0,
      pageSize: this.cache.savants.length,
      hasMore: false
    };
  }

  async searchSavants(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Savant>> {
    if (USE_SUPABASE && searchTerm.trim()) {
      const { page = 0, pageSize = 20 } = params || {};
      const from = page * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('savants')
        .select('*', { count: 'exact' })
        .or(`sujet.ilike.%${searchTerm}%,savant.ilike.%${searchTerm}%,texte_arabe.ilike.%${searchTerm}%,texte_francais.ilike.%${searchTerm}%`);

      if (tag) {
        query = query.ilike('tag', `%${tag}%`);
      }

      const { data, count, error } = await query.range(from, to).order('id');

      if (!error) {
        return {
          data: data as Savant[],
          count: count || 0,
          page,
          pageSize,
          hasMore: (from + pageSize) < (count || 0)
        };
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
    return {
      data: filtered,
      count: filtered.length,
      page: 0,
      pageSize: filtered.length,
      hasMore: false
    };
  }

  async getSavantTags(): Promise<string[]> {
    if (USE_SUPABASE) {
      const { data, error } = await supabase
        .from('savants')
        .select('tag');

      if (!error && data) {
        return extractTags(data as { tag?: string }[]);
      }
    }

    if (!this.cache.savants) {
      this.cache.savants = savantData as Savant[];
    }
    return extractTags(this.cache.savants);
  }

  async getSavantNames(): Promise<string[]> {
    if (USE_SUPABASE) {
      const { data, error } = await supabase
        .from('savants')
        .select('savant');

      if (!error && data) {
        const names = new Set<string>();
        (data as { savant?: string }[]).forEach(s => {
          if (s.savant) names.add(s.savant);
        });
        return Array.from(names).sort();
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
  // Cache management
  // ==========================================

  clearCache(): void {
    this.cache = {
      hadiths: null,
      coran: null,
      dhikrs: null,
      douaas: null,
      savants: null
    };
  }

  isUsingSupabase(): boolean {
    return USE_SUPABASE;
  }
}

export const dataService = new DataService();
export default dataService;
