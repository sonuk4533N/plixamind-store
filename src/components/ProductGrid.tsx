import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, PackageOpen } from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';

interface ProductGridProps {
  products: Product[];
  categories: Category[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, categories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Must be published for storefront
      if (!prod.is_published) return false;

      // Category filter
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = prod.title.toLowerCase().includes(query);
        const matchTagline = prod.tagline?.toLowerCase().includes(query);
        const matchDesc = prod.short_description?.toLowerCase().includes(query);
        const matchCategory = prod.category.toLowerCase().includes(query);
        if (!matchTitle && !matchTagline && !matchDesc && !matchCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.created_at || '').localeCompare(a.created_at || '');
      // Default: featured & bestsellers first
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      if (a.is_bestseller && !b.is_bestseller) return -1;
      if (!a.is_bestseller && b.is_bestseller) return 1;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('featured');
  };

  return (
    <section id="products" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-neon-bright mb-2">
            <span>CURATED ASSETS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-bright" />
            <span>INSTANT DOWNLOAD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Browse All Digital Products
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            Engineered to save you hundreds of hours of design, research, and trial-and-error.
          </p>
        </div>

        {/* Product Count Pill */}
        <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-charcoal-900 border border-white/10 text-slate-300 self-start md:self-auto">
          Showing <span className="text-white font-bold">{filteredProducts.length}</span> of {products.length} Products
        </div>
      </div>

      {/* Controls: Search, Sort & Categories */}
      <div className="space-y-4 mb-10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Notion templates, guides, UI kits, contracts..."
              className="w-full bg-charcoal-900/90 border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto bg-charcoal-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/60 transition-all cursor-pointer"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-asc">Sort: Price (Low to High)</option>
              <option value="price-desc">Sort: Price (High to Low)</option>
              <option value="newest">Sort: Newest First</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto my-12 border border-dashed border-white/15">
          <div className="w-14 h-14 rounded-2xl bg-charcoal-900 border border-white/10 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <PackageOpen className="w-7 h-7 text-purple-400" />
          </div>
          <h3 className="font-display font-bold text-lg text-white mb-2">No matching products found</h3>
          <p className="text-sm text-slate-400 mb-6">
            We couldn't find any digital products matching your current search or category filter.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-electric/20 border border-electric/40 text-electric-light hover:bg-electric/30 transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

    </section>
  );
};
