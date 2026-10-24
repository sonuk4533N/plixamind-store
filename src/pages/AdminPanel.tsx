import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  LogOut, 
  Package, 
  Layers, 
  BarChart3, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  X, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  Database, 
  CheckCircle2,
  TrendingUp,
  Sliders,
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';
import type { Product, Category, SiteSettings, FAQItem } from '../types';
import { storeService } from '../services/storeService';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { analyticsService } from '../services/analyticsService';

export const AdminPanel: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'categories' | 'settings' | 'tracking' | 'database'>('analytics');

  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [eventStats, setEventStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  const [formBenefitsText, setFormBenefitsText] = useState<string>('');
  const [formWhatsIncludedText, setFormWhatsIncludedText] = useState<string>('');
  const [formPreviewImagesText, setFormPreviewImagesText] = useState<string>('');
  const [productFormError, setProductFormError] = useState<string>('');

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
  const [categoryForm, setCategoryForm] = useState<Partial<Category>>({});

  // Check auth session on load
  useEffect(() => {
    document.title = 'Admin Console — Plixamind';

    async function checkAuth() {
      // 1. If Supabase is configured, check live session
      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setIsAuthenticated(true);
            setUserEmail(session.user.email || 'Admin User');
          }
        } catch (err) {
          console.warn('Supabase session check error:', err);
        }
      } else {
        // 2. Check local admin session token
        const demoAuth = sessionStorage.getItem('plixamind_demo_admin');
        if (demoAuth === 'active') {
          setIsAuthenticated(true);
          setUserEmail('founder@plixamind.com (Demo Mode)');
        }
      }
      setLoading(false);
    }

    checkAuth();
  }, []);

  // Load all admin data once authenticated
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [allProds, allCats, settings] = await Promise.all([
        storeService.getProducts(true), // include unpublished
        storeService.getCategories(),
        storeService.getSiteSettings()
      ]);
      setProducts(allProds);
      setCategories(allCats);
      setSiteSettings(settings);
      setEventStats(storeService.getEventStats());
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginEmail.trim(),
          password: loginPassword,
        });

        if (error) throw error;
        if (data.session?.user) {
          setIsAuthenticated(true);
          setUserEmail(data.session.user.email || 'Admin');
        }
      } catch (err: any) {
        setAuthError(err.message || 'Login failed. Please verify your Supabase credentials.');
      } finally {
        setAuthLoading(false);
      }
    } else {
      // In local demo mode, simple verification
      if (loginEmail && loginPassword) {
        sessionStorage.setItem('plixamind_demo_admin', 'active');
        setIsAuthenticated(true);
        setUserEmail(loginEmail || 'founder@plixamind.com');
      } else {
        setAuthError('Please enter an email and password.');
      }
      setAuthLoading(false);
    }
  };

  const handleDemoLogin = () => {
    sessionStorage.setItem('plixamind_demo_admin', 'active');
    setIsAuthenticated(true);
    setUserEmail('founder@plixamind.com (Demo Mode)');
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem('plixamind_demo_admin');
    setIsAuthenticated(false);
    setUserEmail('');
  };

  const showNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // ----------------------------------------------------
  // Product Operations
  // ----------------------------------------------------
  const handleOpenProductModal = (product?: Product) => {
    setProductFormError('');
    if (product) {
      setEditingProduct(product);
      setProductForm({ ...product });
      setFormBenefitsText((product.benefits || []).join('\n'));
      setFormWhatsIncludedText(
        (product.whats_included || []).map(item => `${item.title} :: ${item.detail}`).join('\n')
      );
      setFormPreviewImagesText((product.preview_images || []).join('\n'));
    } else {
      setEditingProduct(null);
      setProductForm({
        id: 'prod-' + Math.random().toString(36).substring(2, 9),
        title: '',
        slug: '',
        tagline: '',
        price: 299,
        original_price: 599,
        category: categories[0]?.slug || 'notion-systems',
        badge: 'NEW',
        cover_image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
        short_description: '',
        description: '',
        file_format: 'Notion Workspace Link + PDF Guide',
        file_size: 'Instant Digital Access',
        license_type: 'Personal Use License',
        superprofile_url: 'https://superprofile.bio/plixamind/new-asset',
        is_published: true,
        is_featured: false,
        is_bestseller: false,
        faqs: []
      });
      setFormBenefitsText('Instant one-click duplicate link\nClean PARA organizational structure\nLifetime free updates');
      setFormWhatsIncludedText('Notion Template Link :: Direct duplicate into personal workspace\nSetup Walkthrough Video :: 15-minute onboarding guide');
      setFormPreviewImagesText('https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80');
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductFormError('');

    // Validation
    if (!productForm.title?.trim()) {
      setProductFormError('Product title is required.');
      return;
    }
    if (!productForm.superprofile_url?.trim() || !productForm.superprofile_url.startsWith('http')) {
      setProductFormError('Please enter a valid SuperProfile checkout URL starting with https://');
      return;
    }
    if (Number(productForm.price) < 0) {
      setProductFormError('Price must be greater than or equal to 0.');
      return;
    }

    const benefits = formBenefitsText.split('\n').map(s => s.trim()).filter(Boolean);
    const whats_included = formWhatsIncludedText.split('\n')
      .map(line => {
        const parts = line.split('::');
        return {
          title: (parts[0] || '').trim(),
          detail: (parts[1] || 'Included in download').trim()
        };
      })
      .filter(item => item.title);

    const preview_images = formPreviewImagesText.split('\n').map(s => s.trim()).filter(Boolean);

    const autoSlug = (productForm.slug || productForm.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const productToSave: Product = {
      id: productForm.id || 'prod-' + Date.now(),
      slug: autoSlug,
      title: productForm.title!,
      tagline: productForm.tagline || '',
      price: Number(productForm.price) || 0,
      original_price: productForm.original_price ? Number(productForm.original_price) : undefined,
      category: productForm.category || categories[0]?.slug || 'notion-systems',
      badge: (productForm.badge || '') as any,
      cover_image: productForm.cover_image || 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
      preview_images,
      short_description: productForm.short_description || '',
      description: productForm.description || '',
      benefits,
      whats_included,
      file_format: productForm.file_format || 'Instant Digital Access',
      file_size: productForm.file_size || 'Instant Access',
      license_type: productForm.license_type || 'Personal Use License',
      superprofile_url: productForm.superprofile_url!,
      is_published: Boolean(productForm.is_published),
      is_featured: Boolean(productForm.is_featured),
      is_bestseller: Boolean(productForm.is_bestseller),
      faqs: productForm.faqs || []
    };

    await storeService.saveProduct(productToSave);
    await loadAdminData();
    setIsProductModalOpen(false);
    showNotification(`Product "${productToSave.title}" saved successfully!`);
  };

  const handleDeleteProduct = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      await storeService.deleteProduct(id);
      await loadAdminData();
      showNotification(`Product "${title}" deleted.`);
    }
  };

  const handleTogglePublish = async (product: Product) => {
    const updated = { ...product, is_published: !product.is_published };
    await storeService.saveProduct(updated);
    await loadAdminData();
    showNotification(`Product "${product.title}" is now ${updated.is_published ? 'Published' : 'Draft'}.`);
  };

  // ----------------------------------------------------
  // Category Operations
  // ----------------------------------------------------
  const handleOpenCategoryModal = (cat?: Category) => {
    if (cat) {
      setCategoryForm({ ...cat });
    } else {
      setCategoryForm({
        id: 'cat-' + Math.random().toString(36).substring(2, 7),
        name: '',
        slug: '',
        description: '',
        icon: 'LayoutGrid'
      });
    }
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name?.trim()) return;

    const slug = (categoryForm.slug || categoryForm.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const catToSave: Category = {
      id: categoryForm.id || 'cat-' + Date.now(),
      name: categoryForm.name.trim(),
      slug,
      description: categoryForm.description || '',
      icon: categoryForm.icon || 'LayoutGrid'
    };

    await storeService.saveCategory(catToSave);
    await loadAdminData();
    setIsCategoryModalOpen(false);
    showNotification(`Category "${catToSave.name}" saved.`);
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (window.confirm(`Delete category "${name}"? Existing products with this category will remain.`)) {
      await storeService.deleteCategory(id);
      await loadAdminData();
      showNotification(`Category "${name}" deleted.`);
    }
  };

  // ----------------------------------------------------
  // Site Settings Operations
  // ----------------------------------------------------
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteSettings) return;

    await storeService.saveSiteSettings(siteSettings);
    // Refresh analytics service with newly configured pixel or GA IDs
    analyticsService.initialize(siteSettings.meta_pixel_id, siteSettings.google_analytics_id);
    showNotification('Site settings and content updated successfully!');
  };

  const handleAddFaqItem = () => {
    if (!siteSettings) return;
    const newFaq: FAQItem = {
      id: 'faq-' + Date.now(),
      question: 'New Question Title',
      answer: 'Clear, helpful answer explaining the topic.'
    };
    setSiteSettings({
      ...siteSettings,
      faqs: [...siteSettings.faqs, newFaq]
    });
  };

  const handleRemoveFaqItem = (idx: number) => {
    if (!siteSettings) return;
    const updated = [...siteSettings.faqs];
    updated.splice(idx, 1);
    setSiteSettings({ ...siteSettings, faqs: updated });
  };

  // ----------------------------------------------------
  // If Not Authenticated -> Show Login View
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-neon-bright selection:text-charcoal-950 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 rounded-xl bg-charcoal-900 border border-purple-500/40 flex items-center justify-center">
              <span className="font-display font-black text-neon-bright text-xl">P</span>
            </div>
            <span className="font-display font-extrabold text-2xl text-white tracking-tight">
              PLIXAMIND
            </span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">
            Founder & Admin Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Secure management for products, SuperProfile checkouts, and content.
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
          <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl">
            
            {/* Status Indicator */}
            <div className="mb-6 p-3 rounded-xl bg-charcoal-900 border border-white/8 flex items-center gap-2.5 text-xs">
              <Database className="w-4 h-4 text-neon-bright flex-shrink-0" />
              <div>
                <span className="font-semibold text-white">
                  {isSupabaseConfigured ? 'Cloud Mode: Supabase Connected' : 'Local Demo Mode Active'}
                </span>
                <p className="text-[11px] text-slate-400">
                  {isSupabaseConfigured
                    ? 'Authenticated via Supabase Auth with Row Level Security.'
                    : 'Running in zero-friction browser sandbox. One-click login enabled.'}
                </p>
              </div>
            </div>

            {authError && (
              <div className="mb-6 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="founder@plixamind.com"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 font-display font-extrabold text-sm tracking-wide hover:opacity-95 transition-all shadow-md shadow-neon/15 cursor-pointer disabled:opacity-50"
              >
                {authLoading ? 'Verifying...' : 'Sign In to Admin'}
              </button>
            </form>

            {/* Quick Demo Mode Login Button (Solo founder convenience) */}
            {!isSupabaseConfigured && (
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-xs text-slate-400 mb-3">
                  Testing before configuring Supabase?
                </p>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-neon-bright" />
                  <span>1-Click Demo Admin Login</span>
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors">
                ← Return to storefront
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Main Authenticated Admin View
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-charcoal-950 text-slate-100 flex flex-col selection:bg-neon-bright selection:text-charcoal-950">
      
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-charcoal-950/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-purple-500/40 flex items-center justify-center">
                  <span className="font-display font-black text-neon-bright text-base">P</span>
                </div>
                <span className="font-display font-extrabold text-lg text-white tracking-tight">
                  PLIXAMIND
                </span>
              </Link>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-electric/20 text-electric-light border border-electric/30">
                Admin Console
              </span>
            </div>

            {/* Right: User Email, Storefront Link, Sign Out */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs text-slate-400">
                Logged in as <strong className="text-slate-200">{userEmail}</strong>
              </span>

              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <span>View Storefront</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Floating Success Toast Notification */}
      {saveSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-charcoal-900 border border-neon-bright/40 shadow-2xl flex items-center gap-3 text-sm text-white animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-neon-bright flex-shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="border-b border-white/10 bg-charcoal-900/60 sticky top-16 z-30 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 py-2 min-w-max">
          
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-electric text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview & Traffic</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-electric text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-electric text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-electric text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Site Content & FAQs</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'tracking'
                ? 'bg-electric text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-neon-bright" />
            <span>Meta Pixel & Tracking</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'database'
                ? 'bg-electric text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase Setup</span>
          </button>

        </div>
      </div>

      {/* Main Admin Tab Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* ========================================================================= */}
        {/* TAB 1: ANALYTICS & TRAFFIC */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="glass-card rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>Total Products</span>
                  <Package className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-display font-black text-white">
                  {products.length}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {products.filter(p => p.is_published).length} Published • {products.filter(p => !p.is_published).length} Drafts
                </p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>Total Page Views</span>
                  <Eye className="w-4 h-4 text-neon-bright" />
                </div>
                <p className="text-2xl sm:text-3xl font-display font-black text-white">
                  {eventStats?.totalPageViews || 0}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tracked via PageView events
                </p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>Product Views</span>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-display font-black text-white">
                  {eventStats?.totalProductViews || 0}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Unique product page visits
                </p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-purple-500/30">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>Checkout Clicks (InitiateCheckout)</span>
                  <TrendingUp className="w-4 h-4 text-neon-bright" />
                </div>
                <p className="text-2xl sm:text-3xl font-display font-black text-neon-bright">
                  {eventStats?.totalInitiateCheckouts || 0}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  SuperProfile checkout redirects
                </p>
              </div>

            </div>

            {/* Top Clicked Products & Honest Analytics Guide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Product Click Popularity */}
              <div className="glass-card rounded-2xl p-6 border border-white/10">
                <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-neon-bright" />
                  <span>Top Clicked Products (Checkout Intent)</span>
                </h3>
                
                {eventStats?.topProducts && eventStats.topProducts.length > 0 ? (
                  <div className="space-y-3">
                    {eventStats.topProducts.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-charcoal-900 border border-white/8 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-white/5 text-slate-400 text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-sm text-white truncate max-w-xs">
                            {item.title}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-neon/15 text-neon-bright border border-neon/30">
                          {item.clicks} Clicks
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-400 text-sm">
                    No checkout clicks recorded yet. Click "Buy Now" on any product to test tracking!
                  </div>
                )}
              </div>

              {/* Purchase Tracking & SuperProfile Clarification */}
              <div className="glass-card rounded-2xl p-6 border border-purple-500/25 space-y-4">
                <div className="flex items-center gap-2 text-neon-bright font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Verified Purchase Tracking Protocol</span>
                </div>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In accordance with security requirements, Plixamind fires <strong>InitiateCheckout</strong> when a buyer clicks "Buy Now" to open SuperProfile.
                </p>

                <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10 text-xs text-slate-300 space-y-2">
                  <strong className="text-white block">How to record verified Purchases:</strong>
                  <p>
                    Because transactions take place on SuperProfile, verified <strong>Purchase</strong> events are transmitted directly from SuperProfile to Meta Events Manager via SuperProfile's built-in Meta Pixel & Conversions API integration.
                  </p>
                  <p>
                    This prevents duplicate counts and guarantees that a Purchase is only reported when payment is actually received.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('tracking')}
                  className="text-xs font-bold text-neon-bright hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  Configure Meta Pixel ID & view setup guide →
                </button>
              </div>

            </div>

            {/* Recent Event Log Feed */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h3 className="font-display font-bold text-lg text-white mb-4">
                Recent Interaction Log (Last 15 Events)
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="pb-3 font-semibold">Event</th>
                      <th className="pb-3 font-semibold">Product / Target</th>
                      <th className="pb-3 font-semibold">Value</th>
                      <th className="pb-3 font-semibold">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {eventStats?.recentEvents && eventStats.recentEvents.length > 0 ? (
                      eventStats.recentEvents.map((evt: any) => (
                        <tr key={evt.id} className="hover:bg-white/5">
                          <td className="py-2.5 font-bold">
                            <span className={`px-2 py-0.5 rounded text-[10px] ${
                              evt.event_name === 'InitiateCheckout'
                                ? 'bg-neon/15 text-neon-bright'
                                : evt.event_name === 'ViewContent'
                                ? 'bg-purple-500/15 text-purple-300'
                                : 'bg-white/10 text-slate-300'
                            }`}>
                              {evt.event_name}
                            </span>
                          </td>
                          <td className="py-2.5 truncate max-w-xs">{evt.product_title || '—'}</td>
                          <td className="py-2.5">{evt.value ? `₹${evt.value}` : '—'}</td>
                          <td className="py-2.5 text-slate-400">{new Date(evt.timestamp).toLocaleTimeString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-slate-400">
                          No events logged yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PRODUCTS MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold text-white">
                  Manage Digital Products
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Add, edit, toggle visibility, and configure SuperProfile checkout links.
                </p>
              </div>

              <button
                onClick={() => handleOpenProductModal()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-md shadow-neon/15 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-charcoal-900 text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="p-4 font-semibold">Product</th>
                      <th className="p-4 font-semibold">Category</th>
                      <th className="p-4 font-semibold">Price (INR)</th>
                      <th className="p-4 font-semibold">Badges</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        
                        {/* Title & Cover */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.cover_image}
                              alt=""
                              className="w-12 h-10 object-cover rounded-lg bg-charcoal-900 border border-white/10 flex-shrink-0"
                            />
                            <div>
                              <p className="font-bold text-white hover:text-neon-bright transition-colors line-clamp-1">
                                {p.title}
                              </p>
                              <p className="text-[11px] text-slate-400 font-mono truncate max-w-xs">
                                /products/{p.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="p-4 capitalize">
                          {p.category.replace('-', ' ')}
                        </td>

                        {/* Price */}
                        <td className="p-4 font-bold text-white">
                          ₹{p.price}
                          {p.original_price && (
                            <span className="text-slate-500 line-through text-xs ml-1.5">
                              ₹{p.original_price}
                            </span>
                          )}
                        </td>

                        {/* Badges */}
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            {p.badge && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white">
                                {p.badge}
                              </span>
                            )}
                            {p.is_bestseller && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neon/15 text-neon-bright border border-neon/30">
                                Bestseller
                              </span>
                            )}
                            {p.is_featured && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                                Featured
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Publish Status Toggle */}
                        <td className="p-4">
                          <button
                            onClick={() => handleTogglePublish(p)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                              p.is_published
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
                                : 'bg-slate-700/40 text-slate-400 border border-white/10 hover:bg-slate-700/60'
                            }`}
                          >
                            {p.is_published ? 'Published' : 'Draft'}
                          </button>
                        </td>

                        {/* Action Buttons */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`/products/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                              title="Preview in new tab"
                            >
                              <ArrowUpRight className="w-4 h-4" />
                            </a>

                            <button
                              onClick={() => handleOpenProductModal(p)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 hover:text-white cursor-pointer"
                              title="Edit product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(p.id, p.title)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CATEGORIES MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold text-white">
                  Manage Product Categories
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Organize store assets into intuitive collections for buyers.
                </p>
              </div>

              <button
                onClick={() => handleOpenCategoryModal()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-md shadow-neon/15 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-bold text-base text-white">
                        {c.name}
                      </span>
                      <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                        {c.slug}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                      {c.description || 'No description provided.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                    <span className="text-slate-400">
                      {products.filter(p => p.category === c.slug).length} products
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCategoryModal(c)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(c.id, c.name)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SITE CONTENT & CMS */}
        {/* ========================================================================= */}
        {activeTab === 'settings' && siteSettings && (
          <form onSubmit={handleSaveSettings} className="space-y-8 animate-fadeIn max-w-4xl">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-white">
                  Storefront Content & Settings
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Customize the announcement banner, hero headline, support contacts, and FAQs.
                </p>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md shadow-neon/15 cursor-pointer"
              >
                Save Changes
              </button>
            </div>

            {/* Announcement Banner */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neon-bright" />
                <span>Top Announcement Bar</span>
              </h3>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showAnnouncement"
                  checked={siteSettings.show_announcement}
                  onChange={(e) => setSiteSettings({ ...siteSettings, show_announcement: e.target.checked })}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="showAnnouncement" className="text-xs font-bold text-slate-300 cursor-pointer">
                  Show announcement bar on top of all pages
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Announcement Text
                </label>
                <input
                  type="text"
                  value={siteSettings.announcement_text}
                  onChange={(e) => setSiteSettings({ ...siteSettings, announcement_text: e.target.value })}
                  placeholder="⚡ FLASH SALE: Up to 50% OFF all templates!"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>
            </div>

            {/* Hero Section Copy */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="font-display font-bold text-base text-white">
                Hero Section Content
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Hero Top Badge
                </label>
                <input
                  type="text"
                  value={siteSettings.hero_badge}
                  onChange={(e) => setSiteSettings({ ...siteSettings, hero_badge: e.target.value })}
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={siteSettings.hero_headline}
                  onChange={(e) => setSiteSettings({ ...siteSettings, hero_headline: e.target.value })}
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Hero Subheadline
                </label>
                <textarea
                  rows={3}
                  value={siteSettings.hero_subheadline}
                  onChange={(e) => setSiteSettings({ ...siteSettings, hero_subheadline: e.target.value })}
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>
            </div>

            {/* Support Contacts */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="font-display font-bold text-base text-white">
                Support & Contact Info
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={siteSettings.support_email}
                    onChange={(e) => setSiteSettings({ ...siteSettings, support_email: e.target.value })}
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    WhatsApp Support Number
                  </label>
                  <input
                    type="text"
                    value={siteSettings.support_whatsapp}
                    onChange={(e) => setSiteSettings({ ...siteSettings, support_whatsapp: e.target.value })}
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/60"
                  />
                </div>
              </div>
            </div>

            {/* FAQs Manager */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-white">
                  Homepage Frequently Asked Questions
                </h3>
                <button
                  type="button"
                  onClick={handleAddFaqItem}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-neon-bright flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-4">
                {siteSettings.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-charcoal-900 border border-white/8 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const updated = [...siteSettings.faqs];
                          updated[idx].question = e.target.value;
                          setSiteSettings({ ...siteSettings, faqs: updated });
                        }}
                        className="w-full bg-charcoal-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-purple-500/60"
                        placeholder="Question title..."
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFaqItem(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...siteSettings.faqs];
                        updated[idx].answer = e.target.value;
                        setSiteSettings({ ...siteSettings, faqs: updated });
                      }}
                      className="w-full bg-charcoal-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-purple-500/60"
                      placeholder="Answer..."
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 font-display font-bold text-sm tracking-wide hover:opacity-95 shadow-md shadow-neon/15 cursor-pointer"
            >
              Save All Changes
            </button>

          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: META PIXEL & ANALYTICS SETUP */}
        {/* ========================================================================= */}
        {activeTab === 'tracking' && siteSettings && (
          <form onSubmit={handleSaveSettings} className="space-y-8 animate-fadeIn max-w-4xl">
            
            <div>
              <h2 className="text-2xl font-display font-bold text-white">
                Meta Pixel & Analytics Integration
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure your Meta Pixel and Google Analytics without touching code.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="font-display font-bold text-base text-white">
                Tracking IDs
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Meta Pixel ID
                </label>
                <input
                  type="text"
                  value={siteSettings.meta_pixel_id}
                  onChange={(e) => setSiteSettings({ ...siteSettings, meta_pixel_id: e.target.value })}
                  placeholder="e.g. 1234567890123456"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/60"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  When populated, Plixamind automatically initializes Meta Pixel and fires <code>PageView</code>, <code>ViewContent</code>, and <code>InitiateCheckout</code>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Google Analytics 4 (GA4) Measurement ID
                </label>
                <input
                  type="text"
                  value={siteSettings.google_analytics_id}
                  onChange={(e) => setSiteSettings({ ...siteSettings, google_analytics_id: e.target.value })}
                  placeholder="e.g. G-XXXXXXXXXX"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md shadow-neon/15 cursor-pointer mt-2"
              >
                Save Tracking Configuration
              </button>
            </div>

            {/* Plain English Guide for SuperProfile Meta Pixel & Conversions API */}
            <div className="glass-card rounded-2xl p-6 border border-purple-500/30 space-y-4 text-xs sm:text-sm text-slate-300">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-neon-bright" />
                <span>How to avoid duplicate events with SuperProfile</span>
              </h3>

              <p className="leading-relaxed">
                SuperProfile has a dedicated native integration for Meta Pixel and the Conversions API (CAPI). Follow this checklist to ensure 100% clean tracking:
              </p>

              <ol className="list-decimal pl-5 space-y-2 text-slate-300">
                <li>
                  <strong>On Plixamind:</strong> Enter your Meta Pixel ID above. Plixamind will track when visitors land on your website (<code>PageView</code>), view products (<code>ViewContent</code>), and click Buy Now (<code>InitiateCheckout</code>).
                </li>
                <li>
                  <strong>On SuperProfile Dashboard:</strong> Go to <em>Settings & Integrations → Meta Pixel & CAPI</em>. Paste the exact same Meta Pixel ID and your Conversions API Token.
                </li>
                <li>
                  <strong>Verified Purchase Events:</strong> When a customer pays via UPI or card on SuperProfile, SuperProfile will fire the official verified <code>Purchase</code> event with the exact order value and transaction ID directly to Meta.
                </li>
                <li>
                  <strong>Testing in Meta Events Manager:</strong> Open Meta Events Manager → <em>Test Events</em>. Open your Plixamind store in one tab and observe <code>PageView</code> and <code>ViewContent</code> appear cleanly.
                </li>
              </ol>
            </div>

          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: SUPABASE SETUP & EXPORT */}
        {/* ========================================================================= */}
        {activeTab === 'database' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl">
            
            <div>
              <h2 className="text-2xl font-display font-bold text-white">
                Supabase Cloud Database & Deployment
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero-cost Postgres database, authentication, and Row Level Security.
              </p>
            </div>

            {/* Status Card */}
            <div className={`p-6 rounded-2xl border ${
              isSupabaseConfigured 
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' 
                : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-6 h-6 text-neon-bright" />
                <h3 className="font-display font-bold text-lg text-white">
                  {isSupabaseConfigured ? 'Connected to Cloud Supabase' : 'Running in Local Storage Mode'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                {isSupabaseConfigured
                  ? 'Your store is connected directly to your remote Supabase PostgreSQL database with enforced Row Level Security.'
                  : 'Currently storing products and settings in your browser’s localStorage. Follow the 3 steps below to connect a permanent free Supabase database.'}
              </p>
            </div>

            {/* Step by Step Plain English Setup */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6 text-xs sm:text-sm text-slate-300">
              <h3 className="font-display font-bold text-base text-white">
                3-Step Plain English Setup Guide (Free Forever Tier)
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-charcoal-900 border border-white/8 space-y-2">
                  <strong className="text-white block text-sm">Step 1: Create a free Supabase project</strong>
                  <p>
                    Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-neon-bright underline">supabase.com</a>, sign up for free, and click "New Project". Give your database a strong password.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-charcoal-900 border border-white/8 space-y-2">
                  <strong className="text-white block text-sm">Step 2: Run the SQL Schema in 1 Click</strong>
                  <p>
                    In your Supabase project dashboard, navigate to <strong>SQL Editor</strong> → <strong>New Query</strong>. Copy the complete schema file from <code>supabase/schema.sql</code> and click <strong>Run</strong>.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    This automatically creates the <code>products</code>, <code>categories</code>, <code>site_settings</code>, and <code>analytics_events</code> tables and sets up strict Row Level Security (RLS) so visitors cannot alter your store.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-charcoal-900 border border-white/8 space-y-2">
                  <strong className="text-white block text-sm">Step 3: Add your keys to .env.local</strong>
                  <p>
                    Go to <strong>Project Settings</strong> → <strong>API</strong> in Supabase. Copy your <strong>Project URL</strong> and <strong>anon / public key</strong> into a file named <code>.env.local</code> in your project folder:
                  </p>
                  <pre className="p-3 rounded-lg bg-charcoal-950 font-mono text-[11px] text-purple-300 overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key`}
                  </pre>
                </div>

                <div className="p-4 rounded-xl bg-charcoal-900 border border-white/8 space-y-2">
                  <strong className="text-white block text-sm">Step 4: Create your first Admin User</strong>
                  <p>
                    In Supabase, go to <strong>Authentication</strong> → <strong>Users</strong> → <strong>Add User</strong>. Enter your email and password. That's it! You can now log into <code>/admin</code> securely.
                  </p>
                </div>
              </div>
            </div>

            {/* Utility Actions: Backup & Reset */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-white text-base">
                  Backup & Reset Controls
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Export your product catalogue to JSON or restore initial demo data.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", `plixamind-products-backup-${new Date().toISOString().slice(0, 10)}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                    showNotification('Products exported to JSON successfully!');
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors cursor-pointer"
                >
                  Export JSON Backup
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all products and settings to default demo state?')) {
                      storeService.resetDemoData();
                      loadAdminData();
                      showNotification('Data reset to default demo state.');
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-300 transition-colors cursor-pointer"
                >
                  Reset Demo Data
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* PRODUCT ADD / EDIT MODAL */}
      {/* ========================================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card rounded-3xl max-w-3xl w-full border border-white/15 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  {editingProduct ? 'Edit Digital Product' : 'Add New Digital Product'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure titles, pricing in INR, previews, and SuperProfile checkout link.
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {productFormError && (
              <div className="mb-6 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{productFormError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.title || ''}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    placeholder="e.g. Second Brain 2026: Life OS"
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    URL Slug <span className="text-slate-500 font-normal">(Auto-generated if empty)</span>
                  </label>
                  <input
                    type="text"
                    value={productForm.slug || ''}
                    onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                    placeholder="second-brain-2026-life-os"
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Catchy Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.tagline || ''}
                  onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                  placeholder="Organize your thoughts, daily habits, and projects in one aesthetic space."
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              {/* Pricing & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Selling Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={productForm.price || 0}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Original Price (INR ₹) <span className="text-slate-500">(For Strikethrough)</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={productForm.original_price || ''}
                    onChange={(e) => setProductForm({ ...productForm, original_price: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="999"
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={productForm.category || categories[0]?.slug}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SuperProfile URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neon-bright mb-1.5">
                  SuperProfile Checkout URL * <span className="text-slate-400 font-normal">(Customers will be redirected here when clicking Buy Now)</span>
                </label>
                <input
                  type="url"
                  required
                  value={productForm.superprofile_url || ''}
                  onChange={(e) => setProductForm({ ...productForm, superprofile_url: e.target.value })}
                  placeholder="https://superprofile.bio/plixamind/second-brain"
                  className="w-full bg-charcoal-900 border border-neon/40 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-neon-bright"
                />
              </div>

              {/* Cover Image & Previews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Cover Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={productForm.cover_image || ''}
                    onChange={(e) => setProductForm({ ...productForm, cover_image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Badge <span className="text-slate-500">(Optional)</span>
                  </label>
                  <select
                    value={productForm.badge || ''}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value as any })}
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60"
                  >
                    <option value="">None</option>
                    <option value="BESTSELLER">BESTSELLER</option>
                    <option value="NEW">NEW</option>
                    <option value="FEATURED">FEATURED</option>
                    <option value="HOT">HOT</option>
                    <option value="SALE">SALE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Gallery Preview Images <span className="text-slate-500">(One URL per line)</span>
                </label>
                <textarea
                  rows={2}
                  value={formPreviewImagesText}
                  onChange={(e) => setFormPreviewImagesText(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-1&#10;https://images.unsplash.com/photo-2"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500/60"
                />
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={productForm.short_description || ''}
                  onChange={(e) => setProductForm({ ...productForm, short_description: e.target.value })}
                  placeholder="A one-paragraph summary of the product..."
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Full Description & Details
                </label>
                <textarea
                  rows={4}
                  value={productForm.description || ''}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Detailed markdown or structured explanation..."
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              {/* Key Benefits */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Key Benefits <span className="text-slate-500">(One benefit per line)</span>
                </label>
                <textarea
                  rows={3}
                  value={formBenefitsText}
                  onChange={(e) => setFormBenefitsText(e.target.value)}
                  placeholder="Instant duplicate into personal Notion&#10;Built for Indian freelancers & creators&#10;Free lifetime updates"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              {/* What's Included */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  What's Included <span className="text-slate-500">(Format: Title :: Detail description per line)</span>
                </label>
                <textarea
                  rows={3}
                  value={formWhatsIncludedText}
                  onChange={(e) => setFormWhatsIncludedText(e.target.value)}
                  placeholder="Notion Workspace Link :: Instant access to duplicate into your workspace&#10;Setup Video :: 15-minute onboarding walkthrough"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              {/* Toggles (Published, Featured, Bestseller) */}
              <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl bg-charcoal-900 border border-white/8 text-xs font-bold text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.is_published}
                    onChange={(e) => setProductForm({ ...productForm, is_published: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600"
                  />
                  <span>Published (Visible to store visitors)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.is_bestseller}
                    onChange={(e) => setProductForm({ ...productForm, is_bestseller: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600"
                  />
                  <span>Bestseller (Showcase in community favorites)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.is_featured}
                    onChange={(e) => setProductForm({ ...productForm, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600"
                  />
                  <span>Featured (Highlight in sorting)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md shadow-neon/15 cursor-pointer"
                >
                  Save Product
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CATEGORY ADD / EDIT MODAL */}
      {/* ========================================================================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl max-w-md w-full border border-white/15 shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
              <h3 className="font-display font-bold text-lg text-white">
                {categoryForm.id ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={categoryForm.name || ''}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="e.g. AI Prompt Packs"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Slug <span className="text-slate-500 font-normal">(Auto-generated if empty)</span>
                </label>
                <input
                  type="text"
                  value={categoryForm.slug || ''}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  placeholder="ai-prompt-packs"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={categoryForm.description || ''}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Brief summary of assets in this category..."
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 font-bold text-xs uppercase"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
