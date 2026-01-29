/**
 * DataService - Service unifié pour la gestion des données
 *
 * Ce service abstrait l'accès aux données pour faciliter la migration
 * de JSON local vers Supabase (ou autre backend).
 *
 * Actuellement: JSON local
 * Futur: Supabase avec cache local SQLite
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

// Import des données JSON locales
import hadithsData from '../data/hadith.json';
import coranData from '../data/coran.json';
import dhikrData from '../data/dhikr.json';
import douaaData from '../data/douaa.json';
import savantData from '../data/savant.json';

// Configuration - Changer cette valeur quand on passe à Supabase
const USE_LOCAL_DATA = true;

// ==========================================
// Fonctions utilitaires
// ==========================================

/** Extrait les tags uniques d'une liste de textes */
function extractTags<T extends BaseText>(items: T[]): string[] {
  const tagsSet = new Set<string>();
  items.forEach(item => {
    if (item.tag) {
      item.tag.split(',').forEach(t => tagsSet.add(t.trim()));
    }
  });
  return Array.from(tagsSet).sort();
}

/** Filtre les textes selon un terme de recherche */
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

/** Filtre les textes selon un tag */
function filterByTag<T extends BaseText>(items: T[], tag: string | null): T[] {
  if (!tag) return items;
  return items.filter(item =>
    item.tag?.toLowerCase().includes(tag.toLowerCase())
  );
}

/** Pagine une liste */
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
  // Cache local pour éviter les re-imports
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
    if (USE_LOCAL_DATA) {
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
    // TODO: Supabase implementation
    throw new Error('Supabase not implemented yet');
  }

  async searchHadiths(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Hadith>> {
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

  getHadithTags(): string[] {
    if (!this.cache.hadiths) {
      this.cache.hadiths = hadithsData as Hadith[];
    }
    return extractTags(this.cache.hadiths);
  }

  // ==========================================
  // Coran
  // ==========================================

  async getCoran(params?: PaginationParams): Promise<PaginatedResponse<Coran>> {
    if (USE_LOCAL_DATA) {
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
    throw new Error('Supabase not implemented yet');
  }

  async searchCoran(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Coran>> {
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

  getCoranTags(): string[] {
    if (!this.cache.coran) {
      this.cache.coran = coranData as Coran[];
    }
    return extractTags(this.cache.coran);
  }

  // ==========================================
  // Dhikrs
  // ==========================================

  async getDhikrs(params?: PaginationParams): Promise<PaginatedResponse<Dhikr>> {
    if (USE_LOCAL_DATA) {
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
    throw new Error('Supabase not implemented yet');
  }

  async searchDhikrs(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Dhikr>> {
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

  getDhikrTags(): string[] {
    if (!this.cache.dhikrs) {
      this.cache.dhikrs = dhikrData as Dhikr[];
    }
    return extractTags(this.cache.dhikrs);
  }

  // ==========================================
  // Douaas
  // ==========================================

  async getDouaas(params?: PaginationParams): Promise<PaginatedResponse<Douaa>> {
    if (USE_LOCAL_DATA) {
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
    throw new Error('Supabase not implemented yet');
  }

  async searchDouaas(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Douaa>> {
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

  getDouaaTags(): string[] {
    if (!this.cache.douaas) {
      this.cache.douaas = douaaData as Douaa[];
    }
    return extractTags(this.cache.douaas);
  }

  // ==========================================
  // Savants
  // ==========================================

  async getSavants(params?: PaginationParams): Promise<PaginatedResponse<Savant>> {
    if (USE_LOCAL_DATA) {
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
    throw new Error('Supabase not implemented yet');
  }

  async searchSavants(
    searchTerm: string,
    tag?: string | null,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Savant>> {
    const all = await this.getSavants();
    let filtered = filterBySearch(all.data, searchTerm);
    filtered = filterByTag(filtered, tag ?? null);

    // Recherche aussi par nom de savant
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const byName = all.data.filter(s =>
        s.savant?.toLowerCase().includes(term)
      );
      // Fusionner sans doublons
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

  getSavantTags(): string[] {
    if (!this.cache.savants) {
      this.cache.savants = savantData as Savant[];
    }
    return extractTags(this.cache.savants);
  }

  /** Retourne la liste des noms de savants uniques */
  getSavantNames(): string[] {
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
}

// Export singleton instance
export const dataService = new DataService();
export default dataService;
