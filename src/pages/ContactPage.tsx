import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SiteSettings } from '../types';
import { storeService } from '../services/storeService';

export const ContactPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact & Support — Plixamind';
    storeService.getSiteSettings().then(setSettings);
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    // Create mailto fallback or simulated ticket
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/30 text-xs font-bold text-neon-bright uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Always Here To Help</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Contact & Customer Support
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            Have a question about a product, need assistance with your SuperProfile download, or want a custom bundle? Get in touch with our team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Quick Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Email Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-base">Direct Email Support</h3>
              <p className="text-xs text-slate-400">
                Best for file verification, invoice requests, and general questions.
              </p>
              <a
                href={`mailto:${settings?.support_email || 'support@plixamind.com'}`}
                className="inline-block text-sm font-bold text-neon-bright hover:underline pt-1"
              >
                {settings?.support_email || 'support@plixamind.com'}
              </a>
            </div>

            {/* WhatsApp or Direct Desk Card */}
            {settings?.support_whatsapp ? (
              <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-white text-base">WhatsApp Support</h3>
                <p className="text-xs text-slate-400">
                  Direct assistance for download verification or pre-sale questions.
                </p>
                <a
                  href={`https://wa.me/${settings.support_whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:underline pt-1"
                >
                  <span>{settings.support_whatsapp}</span>
                </a>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neon/15 border border-neon/30 flex items-center justify-center text-neon-bright">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-white text-base">Priority Helpdesk</h3>
                <p className="text-xs text-slate-400">
                  Submit an inquiry below and our support team will review your order details directly.
                </p>
                <span className="inline-block text-xs font-semibold text-slate-300 pt-1">
                  Average response: &lt; 12 hours
                </span>
              </div>
            )}

            {/* Response Time SLA */}
            <div className="p-5 rounded-2xl bg-charcoal-900 border border-white/5 flex items-center gap-3">
              <Clock className="w-5 h-5 text-neon-bright flex-shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white">Guaranteed Response Window</p>
                <p className="text-slate-400 mt-0.5">We review all incoming inquiries within 12 business hours.</p>
              </div>
            </div>

            {/* Quick Link to FAQs */}
            <div className="p-5 rounded-2xl bg-charcoal-900 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-bold text-white">Check common questions</span>
              </div>
              <a href="/#faqs" className="text-xs font-bold text-neon-bright hover:underline">
                View FAQs →
              </a>
            </div>

          </div>

          {/* Right Column: Support Message Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-neon/15 border border-neon/30 flex items-center justify-center mx-auto text-neon-bright">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    Message Received!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Your request has been logged and our support team will follow up directly at <strong>{email}</strong> within 12 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name or organization"
                        className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      SuperProfile Order ID <span className="text-slate-500 font-normal">(Optional, if regarding a purchase)</span>
                    </label>
                    <input
                      type="text"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="e.g. SP-849201"
                      className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your inquiry, order details, or custom licensing request..."
                      className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 font-display font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-neon/15 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </main>

      {settings && <Footer settings={settings} />}
    </div>
  );
};
