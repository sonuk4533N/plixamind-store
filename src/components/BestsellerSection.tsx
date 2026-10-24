import React from 'react';
import { Sparkles, ArrowUpRight, CheckCircle2, Zap } from 'lucide-react';
import { Product } from '../types';
import { analyticsService } from '../services/analyticsService';

interface BestsellerSectionProps {
  products: Product[];
}

export const BestsellerSection: React.FC<BestsellerSectionProps> = ({ products }) => {
  const bestsellers = products.filter(p => p.is_bestseller && p.is_published).slice(0, 2);

  if (bestsellers.length === 0) return null;

  return (
    <section id="bestsellers" className="py-16 md:py-24 border-t border-b border-white/5 relative overflow-hidden bg-charcoal-900/30">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-purple-950/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon/10 border border-neon/30 text-neon-bright text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Favorites</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Our Top Bestsellers
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            The most downloaded frameworks, Notion setups, and playbooks trusted by creators across India.
          </p>
        </div>

        {/* Bestseller Spotlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {bestsellers.map((product) => {
            const discountPercent = product.original_price && product.original_price > product.price
              ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-purple-500/25 relative group hover:border-purple-400/60 transition-all duration-300"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-neon-bright text-charcoal-950 uppercase tracking-wider">
                    BESTSELLER
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 group-hover:text-neon-bright transition-colors">
                    <a
                      href={`/products/${product.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.title}
                    </a>
                  </h3>

                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    {product.short_description || product.tagline}
                  </p>

                  {/* Top Benefits Checklist */}
                  <div className="space-y-2.5 mb-8">
                    {product.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-neon-bright flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Price & CTA */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-display font-black text-white">
                      ₹{product.price}
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-sm text-slate-400 line-through">
                        ₹{product.original_price}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 font-medium">
                      (Lifetime access)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`/products/${product.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 transition-all"
                    >
                      <span>Preview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={product.superprofile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analyticsService.trackInitiateCheckout(product)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 flex items-center gap-1.5 hover:opacity-95 shadow-md shadow-neon/15 transition-all"
                    >
                      <Zap className="w-3.5 h-3.5 fill-charcoal-950" />
                      <span>Buy Now</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
