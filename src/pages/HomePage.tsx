import React, { useEffect, useState } from 'react';
import { Product, Category, SiteSettings } from '../types';
import { storeService } from '../services/storeService';
import { analyticsService } from '../services/analyticsService';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { BestsellerSection } from '../components/BestsellerSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { FAQSection } from '../components/FAQSection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Plixamind — Premium Digital Products, Templates & Bundles for Creators';

    async function loadData() {
      try {
        const [loadedProducts, loadedCategories, loadedSettings] = await Promise.all([
          storeService.getProducts(),
          storeService.getCategories(),
          storeService.getSiteSettings()
        ]);
        setProducts(loadedProducts);
        setCategories(loadedCategories);
        setSettings(loadedSettings);

        // Initialize Meta Pixel and GA if configured
        analyticsService.initialize(loadedSettings.meta_pixel_id, loadedSettings.google_analytics_id);
        analyticsService.trackPageView('/');
      } catch (err) {
        console.error('Failed to load home page data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-neon-bright border-t-transparent animate-spin" />
          <p className="text-sm font-semibold tracking-wide text-slate-300">Loading Plixamind storefront...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col justify-between selection:bg-neon-bright selection:text-charcoal-950">
      
      {/* 1. Announcement Bar */}
      {settings && <AnnouncementBar settings={settings} />}

      {/* 2. Top Navigation */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* 3. Hero Section */}
        {settings && (
          <Hero
            settings={settings}
            onExploreClick={() => handleScrollTo('products')}
            onBestsellerClick={() => handleScrollTo('bestsellers')}
          />
        )}

        {/* 4. Curated Products Grid (Search, Categories, Sort, Product Cards) */}
        <ProductGrid products={products} categories={categories} />

        {/* 5. Bestseller Spotlight */}
        <BestsellerSection products={products} />

        {/* 6. Benefits & Trust Section (Honest delivery & payments) */}
        <BenefitsSection />

        {/* 7. Frequently Asked Questions (Accordion) */}
        {settings && settings.faqs && <FAQSection faqs={settings.faqs} />}
      </main>

      {/* 8. Footer */}
      {settings && <Footer settings={settings} />}

    </div>
  );
};
