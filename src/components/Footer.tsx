import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, MessageCircle } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-charcoal-950 border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 border border-purple-500/40 flex items-center justify-center">
                <span className="font-display font-black text-neon-bright text-base">P</span>
              </div>
              <span className="font-display font-extrabold text-lg text-white tracking-tight">
                PLIXAMIND
              </span>
            </Link>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated, production-grade digital templates, ebooks, and toolkits engineered for India's ambitious creators, designers, and developers.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Payments secured by SuperProfile</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="/#products" className="hover:text-white transition-colors">
                  All Digital Products
                </a>
              </li>
              <li>
                <a href="/#bestsellers" className="hover:text-white transition-colors">
                  Bestselling Assets
                </a>
              </li>
              <li>
                <a href="/#benefits" className="hover:text-white transition-colors">
                  Why Plixamind
                </a>
              </li>
              <li>
                <a href="/#faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refunds" className="hover:text-white transition-colors">
                  Digital Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/license" className="hover:text-white transition-colors">
                  Product License & Usage
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">
              Support & Help
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              {settings.support_email && (
                <li>
                  <a
                    href={`mailto:${settings.support_email}`}
                    className="flex items-center gap-2 hover:text-white transition-colors text-slate-300"
                  >
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span>{settings.support_email}</span>
                  </a>
                </li>
              )}
              {settings.support_whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${settings.support_whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors text-slate-300"
                  >
                    <MessageCircle className="w-4 h-4 text-neon-bright" />
                    <span>WhatsApp: {settings.support_whatsapp}</span>
                  </a>
                </li>
              )}
              <li className="pt-1">
                <span className="text-[11px] text-slate-400">
                  ⚡ Typical response time: under 12 hours
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Plixamind. All digital rights reserved. Handcrafted for builders in India.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-slate-400 hover:text-slate-200 transition-colors">
              Admin Portal
            </Link>
            <span>•</span>
            <span className="text-slate-400">
              SuperProfile Verified Partner
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
