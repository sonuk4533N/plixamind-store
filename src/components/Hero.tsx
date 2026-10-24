import React from 'react';
import { Sparkles, ArrowRight, Zap, ShieldCheck, Download, Smartphone } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
  onExploreClick: () => void;
  onBestsellerClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onExploreClick, onBestsellerClick }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-white/5">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-radial-glow pointer-events-none opacity-80" />
      <div className="absolute -top-24 left-1/4 w-72 h-72 rounded-full bg-electric/15 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-60 h-60 rounded-full bg-neon/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal-900/90 border border-purple-500/30 text-xs sm:text-sm text-slate-200 mb-6 shadow-inner animate-float">
          <span className="w-2 h-2 rounded-full bg-neon-bright animate-ping" />
          <span className="font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-neon-bright to-white">
            {settings.hero_badge || '⚡ INDIA’S PREMIER DIGITAL ASSET STORE'}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="max-w-4xl mx-auto text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-[1.08] mb-6">
          {settings.hero_headline ? (
            <span className="text-gradient-purple-lime">{settings.hero_headline}</span>
          ) : (
            <>
              Level Up Your Workflow With{' '}
              <span className="text-gradient-purple-lime">High-Impact</span> Digital Assets
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10">
          {settings.hero_subheadline ||
            'Curated Notion systems, developer roadmaps, legally drafted contracts, and UI design kits built for ambitious students, freelancers, and builders across India.'}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 font-display font-extrabold text-base tracking-wide flex items-center justify-center gap-2 hover:opacity-95 hover:shadow-lg hover:shadow-neon/20 transition-all cursor-pointer group"
          >
            <span>{settings.hero_cta_text || 'Explore Store'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onBestsellerClick}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-charcoal-900/90 border border-white/10 hover:border-purple-500/50 text-white font-display font-bold text-base flex items-center justify-center gap-2 hover:bg-white/5 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>View Bestsellers</span>
          </button>
        </div>

        {/* Quick Trust Highlights Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto pt-6 border-t border-white/10 text-left">
          
          <div className="glass-card rounded-xl p-3.5 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-electric/15 border border-electric/30 flex items-center justify-center text-electric-light flex-shrink-0">
              <Download className="w-5 h-5 text-neon-bright" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">Instant Download</p>
              <p className="text-[11px] text-slate-400">Links delivered in seconds</p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-3.5 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon/15 border border-neon/30 flex items-center justify-center text-neon-bright flex-shrink-0">
              <Zap className="w-5 h-5 text-neon-bright" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">100% Digital Assets</p>
              <p className="text-[11px] text-slate-400">Zero shipping fees or delays</p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-3.5 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
              <Smartphone className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">UPI & Cards</p>
              <p className="text-[11px] text-slate-400">GPay, PhonePe, Paytm, Cards</p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-3.5 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">Verified Checkout</p>
              <p className="text-[11px] text-slate-400">Secured via SuperProfile</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
