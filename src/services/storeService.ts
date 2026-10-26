import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product, Category, SiteSettings, TrackingEventRecord } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_SITE_SETTINGS } from '../data/mockData';

const LOCAL_STORAGE_PRODUCTS = 'plixamind_products_v2';
const LOCAL_STORAGE_CATEGORIES = 'plixamind_categories_v2';
const LOCAL_STORAGE_SETTINGS = 'plixamind_settings_v2';
const LOCAL_STORAGE_EVENTS = 'plixamind_events_v2';

// Helpers for localStorage fallback
function getLocalProducts(): Product[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PRODUCTS);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read local products:', err);
    return INITIAL_PRODUCTS;
  }
}

function setLocalProducts(products: Product[]) {
  localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(products));
}

function getLocalCategories(): Category[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CATEGORIES);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read local categories:', err);
    return INITIAL_CATEGORIES;
  }
}

function getLocalSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SETTINGS);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(INITIAL_SITE_SETTINGS));
      return INITIAL_SITE_SETTINGS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read local settings:', err);
    return INITIAL_SITE_SETTINGS;
  }
}

export const storeService = {
  isConfigured(): boolean {
    return isSupabaseConfigured;
  },

  async getProducts(includeUnpublished = false): Promise<Product[]> {
    if (!isSupabaseConfigured) {
      const items = getLocalProducts();
      return includeUnpublished ? items : items.filter(p => p.is_published);
    }

    try {
      let query = supabase.from('products').select('*');
      if (!includeUnpublished) {
        query = query.eq('is_published', true);
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return (data as Product[]) || [];
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local storage:', err);
      const items = getLocalProducts();
      return includeUnpublished ? items : items.filter(p => p.is_published);
    }
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (!isSupabaseConfigured) {
      const products = getLocalProducts();
      return products.find(p => p.slug === slug) || null;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return (data as Product) || null;
    } catch (err) {
      console.warn(`Product by slug ${slug} not found in Supabase:`, err);
      const products = getLocalProducts();
      return products.find(p => p.slug === slug) || null;
    }
  },

  async saveProduct(product: Product): Promise<Product> {
    const now = new Date().toISOString();
    const cleanProduct: Product = {
      ...product,
      slug: (product.slug || product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')),
      updated_at: now,
      created_at: product.created_at || now,
    };

    if (!isSupabaseConfigured) {
      const products = getLocalProducts();
      const existingIdx = products.findIndex(p => p.id === product.id);
      if (existingIdx >= 0) {
        products[existingIdx] = cleanProduct;
      } else {
        products.unshift(cleanProduct);
      }
      setLocalProducts(products);
      return cleanProduct;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .upsert(cleanProduct)
        .select()
        .single();
      if (error) throw error;
      return data as Product;
    } catch (err) {
      console.error('Failed to save to Supabase, saving locally:', err);
      const products = getLocalProducts();
      const existingIdx = products.findIndex(p => p.id === product.id);
      if (existingIdx >= 0) {
        products[existingIdx] = cleanProduct;
      } else {
        products.unshift(cleanProduct);
      }
      setLocalProducts(products);
      return cleanProduct;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      const products = getLocalProducts();
      const filtered = products.filter(p => p.id !== id);
      setLocalProducts(filtered);
      return true;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Failed to delete in Supabase, deleting locally:', err);
      const products = getLocalProducts();
      setLocalProducts(products.filter(p => p.id !== id));
      return true;
    }
  },

  async getCategories(): Promise<Category[]> {
    if (!isSupabaseConfigured) {
      return getLocalCategories();
    }

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return (data as Category[]) || [];
    } catch (err) {
      console.warn('Supabase fetch categories failed, using local:', err);
      return getLocalCategories();
    }
  },

  async saveCategory(category: Category): Promise<Category> {
    if (!isSupabaseConfigured) {
      const cats = getLocalCategories();
      const existingIdx = cats.findIndex(c => c.id === category.id);
      if (existingIdx >= 0) {
        cats[existingIdx] = category;
      } else {
        cats.push(category);
      }
      localStorage.setItem(LOCAL_STORAGE_CATEGORIES, JSON.stringify(cats));
      return category;
    }

    try {
      const { data, error } = await supabase
        .from('categories')
        .upsert(category)
        .select()
        .single();
      if (error) throw error;
      return data as Category;
    } catch (err) {
      console.error('Failed to save category to Supabase:', err);
      return category;
    }
  },

  async deleteCategory(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      const cats = getLocalCategories();
      localStorage.setItem(LOCAL_STORAGE_CATEGORIES, JSON.stringify(cats.filter(c => c.id !== id)));
      return true;
    }

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Failed to delete category in Supabase:', err);
      return false;
    }
  },

  async getSiteSettings(): Promise<SiteSettings> {
    if (!isSupabaseConfigured) {
      return getLocalSettings();
    }

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('settings')
        .eq('id', 'global')
        .single();
      if (error || !data) return getLocalSettings();
      return data.settings as SiteSettings;
    } catch (err) {
      console.warn('Supabase fetch settings failed, using local:', err);
      return getLocalSettings();
    }
  },

  async saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
    // Always keep local updated
    localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(settings));

    if (!isSupabaseConfigured) {
      return settings;
    }

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 'global', settings, updated_at: new Date().toISOString() });
      if (error) throw error;
      return settings;
    } catch (err) {
      console.error('Failed to save settings to Supabase:', err);
      return settings;
    }
  },

  recordEvent(event: Omit<TrackingEventRecord, 'id' | 'timestamp'>) {
    try {
      const record: TrackingEventRecord = {
        ...event,
        id: 'evt_' + Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString()
      };
      const raw = localStorage.getItem(LOCAL_STORAGE_EVENTS);
      const list: TrackingEventRecord[] = raw ? JSON.parse(raw) : [];
      list.unshift(record);
      // Keep last 200 events in local log
      localStorage.setItem(LOCAL_STORAGE_EVENTS, JSON.stringify(list.slice(0, 200)));

      if (isSupabaseConfigured) {
        supabase.from('analytics_events').insert(record).then(({ error }) => {
          if (error) console.debug('Analytics remote log ignored:', error.message);
        });
      }
    } catch (err) {
      console.debug('Failed to record tracking event:', err);
    }
  },

  getEventStats() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_EVENTS);
      const list: TrackingEventRecord[] = raw ? JSON.parse(raw) : [];
      
      const pageViews = list.filter(e => e.event_name === 'PageView').length;
      const productViews = list.filter(e => e.event_name === 'ViewContent').length;
      const checkouts = list.filter(e => e.event_name === 'InitiateCheckout');
      
      // Top products clicked for checkout
      const productClickMap: Record<string, { title: string; clicks: number }> = {};
      checkouts.forEach(c => {
        const title = c.product_title || 'Unknown Product';
        if (!productClickMap[title]) {
          productClickMap[title] = { title, clicks: 0 };
        }
        productClickMap[title].clicks += 1;
      });

      const topProducts = Object.values(productClickMap).sort((a, b) => b.clicks - a.clicks);

      return {
        totalPageViews: pageViews,
        totalProductViews: productViews,
        totalInitiateCheckouts: checkouts.length,
        topProducts,
        recentEvents: list.slice(0, 15)
      };
    } catch (err) {
      return {
        totalPageViews: 0,
        totalProductViews: 0,
        totalInitiateCheckouts: 0,
        topProducts: [],
        recentEvents: []
      };
    }
  },

  resetDemoData() {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(LOCAL_STORAGE_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(INITIAL_SITE_SETTINGS));
    localStorage.removeItem(LOCAL_STORAGE_EVENTS);
  }
};
