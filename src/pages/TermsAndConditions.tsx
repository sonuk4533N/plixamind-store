import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileCheck } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import type { SiteSettings } from '../types';
import { storeService } from '../services/storeService';

export const TermsAndConditions: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    document.title = 'Terms & Conditions — Plixamind';
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
            <FileCheck className="w-3.5 h-3.5 text-neon-bright" />
            <span>Customer Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Effective as of October 2026 • Governing the purchase and use of Plixamind digital products
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-white/10 text-slate-300 space-y-8 text-sm sm:text-base leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">
              1. Agreement to Terms
            </h2>
            <p>
              By browsing, accessing, or purchasing any digital template, guide, or software toolkit on <strong>Plixamind</strong>, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not complete a purchase.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">
              2. Nature of Digital Products
            </h2>
            <p>
              All products offered on Plixamind are 100% digital goods (including but not limited to Notion workspace duplicate links, PDF ebooks, Figma design systems, and code templates). <strong>No physical parcels or boxed goods will be shipped.</strong>
            </p>
            <p>
              Upon successful payment via SuperProfile, access is granted electronically via immediate on-screen links and automated email delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">
              3. Intellectual Property & License Grant
            </h2>
            <p>
              When you purchase an asset from Plixamind, you are granted a non-exclusive, non-transferable, revocable license to use the product in accordance with the specified license tier (Personal or Commercial).
            </p>
            <div className="p-4 rounded-xl bg-charcoal-900 border border-rose-500/30 text-rose-200 text-xs sm:text-sm">
              <strong>Strict Prohibition:</strong> You may NOT sub-license, resell, lease, distribute, share, or publish the raw digital files or Notion links in public repositories, forums, drive folders, or competing marketplaces.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">
              4. Pricing & Payments
            </h2>
            <p>
              All prices are listed in Indian Rupees (INR - ₹) and are inclusive of applicable digital taxes unless stated otherwise. Payments are processed by SuperProfile under their verified merchant agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">
              5. Limitation of Liability
            </h2>
            <p>
              Plixamind provides templates, playbooks, and assets on an "as-is" basis for educational and operational productivity purposes. While we strive for accuracy and excellence, we do not warrant that our materials guarantee specific financial earnings, exam results, or business outcomes.
            </p>
          </section>

        </div>
      </main>

      {settings && <Footer settings={settings} />}
    </div>
  );
};
