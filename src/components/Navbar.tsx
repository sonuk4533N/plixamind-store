import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  HelpCircle,
  Mail
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Plixamind homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-charcoal-900 to-charcoal-800 border border-purple-500/30 flex items-center justify-center shadow-lg group-hover:border-neon-lime/60 transition-colors">
              <span className="font-display font-black text-xl text-neon-bright tracking-tight">P</span>
              <span className="w-1.5 h-1.5 rounded-full bg-electric-light ml-0.5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-neon-bright transition-colors">
                PLIXAMIND
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                Digital Assets • India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('products')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('bestsellers')}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-neon-bright/90"
            >
              <Sparkles className="w-3.5 h-3.5 text-neon-bright" />
              Bestsellers
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollToSection('faqs')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              FAQs
            </button>
            <Link
              to="/contact"
              className="hover:text-white transition-colors"
            >
              Support
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollToSection('products')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 hover:opacity-95 shadow-md shadow-neon/15 transition-all cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-charcoal-950/98 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-4">
          <div className="flex flex-col gap-3 font-medium text-slate-200">
            <button
              onClick={() => scrollToSection('products')}
              className="flex items-center gap-3 py-2 text-left hover:text-neon-bright transition-colors"
            >
              <Layers className="w-4 h-4 text-purple-400" />
              Explore All Products
            </button>
            <button
              onClick={() => scrollToSection('bestsellers')}
              className="flex items-center gap-3 py-2 text-left text-neon-bright"
            >
              <Sparkles className="w-4 h-4 text-neon-bright" />
              Bestsellers & Featured
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="flex items-center gap-3 py-2 text-left hover:text-neon-bright transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Why Plixamind (Quality & Delivery)
            </button>
            <button
              onClick={() => scrollToSection('faqs')}
              className="flex items-center gap-3 py-2 text-left hover:text-neon-bright transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-purple-400" />
              Frequently Asked Questions
            </button>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-left hover:text-neon-bright transition-colors"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              Contact & Support
            </Link>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => scrollToSection('products')}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 shadow-md shadow-neon/15"
            >
              Browse Catalog
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
