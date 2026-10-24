import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SiteSettings } from '../types';
import { storeService } from '../services/storeService';

export const PrivacyPolicy: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    document.title = 'Privacy Policy — Plixamind';
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
            <Shield className="w-3.5 h-3.5 text-neon-bright" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Last updated: October 2026 • Compliant with India's Digital Personal Data Protection Act (DPDP)
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-white/10 text-slate-300 space-y-8 text-sm sm:text-base leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-neon-bright" />
              1. Information We Collect
            </h2>
            <p>
              At <strong>Plixamind</strong>, we respect your privacy. Because our checkout is powered by <strong>SuperProfile</strong>, we do not directly collect, process, or store your credit card numbers, debit card numbers, UPI PINs, or bank account credentials on our website.
            </p>
            <p>
              When you purchase a digital product, SuperProfile collects the necessary customer details (such as your name, email address, and phone number) to deliver your files, provide transactional receipts, and manage customer service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-400" />
              2. How We Use Information
            </h2>
            <p>We use information solely for legitimate operational purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>To provide customer support and troubleshoot file access or Notion template duplication.</li>
              <li>To send you product update notifications when a digital template you purchased receives a major upgrade.</li>
              <li>To understand aggregate website traffic and optimize storefront performance using anonymous analytics.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              3. Analytics & Tracking Pixels
            </h2>
            <p>
              Our storefront may utilize standard web analytics tools such as the Meta Pixel and Google Analytics to monitor anonymous browsing metrics (e.g. page views and product interest). These tools do not record sensitive payment credentials. You may choose to disable third-party cookies via your browser settings at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">
              4. Contact Our Privacy Officer
            </h2>
            <p>
              If you have any questions about our privacy practices, please contact us at{' '}
              <a href={`mailto:${settings?.support_email || 'support@plixamind.com'}`} className="text-neon-bright underline">
                {settings?.support_email || 'support@plixamind.com'}
              </a>.
            </p>
          </section>

        </div>
      </main>

      {settings && <Footer settings={settings} />}
    </div>
  );
};
