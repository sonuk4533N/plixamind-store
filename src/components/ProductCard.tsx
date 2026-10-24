import React from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';
import { Product } from '../types';
import { analyticsService } from '../services/analyticsService';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountPercent = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const handleDirectCheckoutClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    analyticsService.trackInitiateCheckout(product);
  };

  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-950/40">
      
      {/* Product Image Link Container */}
      <a 
        href={`/products/${product.slug}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="block relative aspect-[16/10] overflow-hidden bg-charcoal-900 focus:outline-none"
        aria-label={`View ${product.title} details in new tab`}
      >
        <img
          src={product.cover_image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badge (Bestseller, New, etc.) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.badge && (
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-md ${
              product.badge === 'BESTSELLER' 
                ? 'bg-neon-bright text-charcoal-950 border border-neon-lime'
                : product.badge === 'NEW'
                ? 'bg-electric text-white border border-purple-400'
                : 'bg-white/90 text-charcoal-950 border border-white'
            }`}>
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-500/90 text-white backdrop-blur-md">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* File Format Indicator */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-charcoal-950/85 text-slate-300 border border-white/10 backdrop-blur-md">
            {product.file_format.split('+')[0].trim()}
          </span>
        </div>
      </a>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <div className="flex items-center justify-between text-xs text-purple-400 font-semibold mb-2">
            <span className="capitalize tracking-wider">{product.category.replace('-', ' ')}</span>
            <span className="text-[11px] text-slate-400">{product.file_size}</span>
          </div>

          {/* Product Title */}
          <h2 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-neon-bright transition-colors line-clamp-1 mb-2">
            <a 
              href={`/products/${product.slug}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="focus:outline-none"
            >
              {product.title}
            </a>
          </h2>

          {/* Tagline / Short Description */}
          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {product.tagline || product.short_description}
          </p>
        </div>

        {/* Footer Area: Pricing & Actions */}
        <div className="pt-4 border-t border-white/5 mt-auto">
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-display font-black text-white">
                ₹{product.price}
              </span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-xs sm:text-sm text-slate-400 line-through">
                  ₹{product.original_price}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              One-time purchase
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* View Details Button (Opens Product Page in New Tab) */}
            <a
              href={`/products/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-xl text-xs font-bold text-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 text-slate-200 transition-all flex items-center justify-center gap-1.5 focus:outline-none"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* Direct SuperProfile Buy Now Button (Opens SuperProfile Checkout in New Tab) */}
            <a
              href={product.superprofile_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDirectCheckoutClick}
              className="px-3 py-2.5 rounded-xl text-xs font-bold text-center bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-neon/10 focus:outline-none"
            >
              <Zap className="w-3.5 h-3.5 fill-charcoal-950" />
              <span>Buy Now</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
