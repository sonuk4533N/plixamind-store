import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SiteSettings } from '../types';
import { storeService } from '../services/storeService';

export const RefundPolicy: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    document.title = 'Refund & Cancellation Policy — Plixamind';
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
            <RefreshCw className="w-3.5 h-3.5 text-neon-bright" />
            <span>Customer Fair Play</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Digital Refund Policy
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Clear, honest expectations for instant digital downloads and digital assets
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-white/10 text-slate-300 space-y-8 text-sm sm:text-base leading-relaxed">
          
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-neon-bright flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="text-white block mb-1">Standard Industry Digital Goods Notice:</strong>
              Because Notion templates, design files, ebooks, and code archives are irrevocable digital goods delivered immediately upon payment, all purchases are generally non-refundable once access is granted.
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              When We Provide Resolutions & Replacements
            </h2>
            <p>
              We want you to have a flawless experience. We will immediately resolve any of the following issues:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong>Corrupted or Missing Files:</strong> If a download link fails, a ZIP file cannot be extracted, or a Notion workspace link is broken.
              </li>
              <li>
                <strong>Accidental Duplicate Purchases:</strong> If you accidentally paid twice for the same product within a 24-hour window, we will verify the duplicate transaction on SuperProfile and refund the duplicate payment.
              </li>
              <li>
                <strong>Substantially Defective Material:</strong> If the product is demonstrably different from what was described on the product specification page.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-neon-bright" />
              How to Request Support or Assistance
            </h2>
            <p>
              If you experience any problem accessing your download:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
              <li>Locate your SuperProfile payment confirmation email and transaction ID.</li>
              <li>
                Email us at{' '}
                <a href={`mailto:${settings?.support_email || 'support@plixamind.com'}`} className="text-neon-bright underline">
                  {settings?.support_email || 'support@plixamind.com'}
                </a>{' '}
                or reach out via WhatsApp at{' '}
                <span className="text-white font-semibold">{settings?.support_whatsapp || '+91 98765 43210'}</span>.
              </li>
              <li>Our support team will verify the issue and respond with updated download links or assistance within 48 business hours.</li>
            </ol>
          </section>

        </div>
      </main>

      {settings && <Footer settings={settings} />}
    </div>
  );
};
