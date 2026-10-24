import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, Check, X } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import type { SiteSettings } from '../types';
import { storeService } from '../services/storeService';

export const LicensePolicy: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    document.title = 'Product Licensing & Usage Terms — Plixamind';
    storeService.getSiteSettings().then(setSettings);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-neon-bright" />
            <span>Usage Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Product Licensing Terms
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Clear guidelines on what you can and cannot do with our digital products
          </p>
        </div>

        <div className="space-y-8">
          
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Personal License */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-electric/20 text-electric-light border border-electric/40 inline-block mb-4">
                  Personal License
                </span>
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  For Single Individuals & Students
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  Applies to personal Notion systems, study playbooks, and individual career cheat sheets.
                </p>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5 text-slate-200">
                    <Check className="w-4 h-4 text-neon-bright flex-shrink-0 mt-0.5" />
                    <span>Use across all your personal devices (phone, laptop, tablet)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-slate-200">
                    <Check className="w-4 h-4 text-neon-bright flex-shrink-0 mt-0.5" />
                    <span>Customize and modify the template for your personal workflows</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-rose-300">
                    <X className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>Cannot share workspace duplicate links with friends or coworkers</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-rose-300">
                    <X className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>Cannot resell or re-distribute files</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Commercial License */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-purple-500/30 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-neon/15 text-neon-bright border border-neon/30 inline-block mb-4">
                  Commercial License
                </span>
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  For Freelancers & Businesses
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  Applies to Figma UI Kits, Contract Suites, Code Kits, and Vector Icon packs.
                </p>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5 text-slate-200">
                    <Check className="w-4 h-4 text-neon-bright flex-shrink-0 mt-0.5" />
                    <span>Use in unlimited commercial client projects and SaaS products</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-slate-200">
                    <Check className="w-4 h-4 text-neon-bright flex-shrink-0 mt-0.5" />
                    <span>Export static deliverables (PDFs, mockups, code) for paying clients</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-slate-200">
                    <Check className="w-4 h-4 text-neon-bright flex-shrink-0 mt-0.5" />
                    <span>Modify components to match client brand identity</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-rose-300">
                    <X className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>Cannot redistribute or resell raw source files as a stock asset</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Need Custom Enterprise Licensing */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display font-bold text-white text-base">
                Need team seats or an enterprise license?
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                For organizations with more than 10 team members or academic institutions.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-electric/20 border border-electric/40 text-electric-light hover:bg-electric/30 transition-all whitespace-nowrap"
            >
              Contact Enterprise Sales
            </Link>
          </div>

        </div>
      </main>

      {settings && <Footer settings={settings} />}
    </div>
  );
};
