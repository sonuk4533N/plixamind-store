import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = '404: Page Not Found — Plixamind';
  }, []);

  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-4 selection:bg-neon-bright selection:text-charcoal-950 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

      <div className="glass-card max-w-lg w-full rounded-3xl p-8 sm:p-12 text-center border border-white/10 relative z-10 shadow-2xl">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-400 uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404</span>
        </div>

        <h1 className="text-7xl sm:text-8xl font-display font-black text-white tracking-tight mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-bright via-white to-purple-400">
            404
          </span>
        </h1>

        <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
          Lost in Digital Space?
        </h2>

        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          The page or product you're looking for doesn't exist, was moved, or has expired. Let's get you back to the high-impact stuff.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-md shadow-neon/15 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Storefront</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2 border border-white/10 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

      </div>
    </div>
  );
};
