import React from 'react';
import { 
  Zap, 
  Download, 
  ShieldCheck, 
  RefreshCw, 
  Lock, 
  CheckCircle, 
  CreditCard 
} from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Download className="w-6 h-6 text-neon-bright" />,
      title: 'Automated Instant Delivery',
      description: 'Zero waiting time. Once checkout is completed on SuperProfile, your download link opens immediately and a backup confirmation is dispatched to your email inbox within seconds.'
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: 'Engineered for High Performance',
      description: 'Every Notion workspace, architectural blueprint, and component kit is designed to solve complex operational challenges. High signal, rigorously structured, and immediately actionable.'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-emerald-400" />,
      title: 'Seamless Indian Payment Gateway',
      description: 'Checkout securely via SuperProfile with full support for UPI (Google Pay, PhonePe, Paytm, CRED), RuPay, Visa, Mastercard, and NetBanking across all major banks.'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-neon-bright" />,
      title: 'Continuous Version Updates',
      description: 'As design tokens, framework versions, or regulatory standards evolve, our digital assets are updated. Registered purchasers receive latest version enhancements at zero extra cost.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: 'Dedicated Delivery Guarantee',
      description: 'If you encounter any difficulty duplicating a workspace or accessing files, our support team directly verifies and resolves your access within 12–24 business hours.'
    },
    {
      icon: <Lock className="w-6 h-6 text-amber-400" />,
      title: 'Enterprise-Grade Security',
      description: 'We do not store or process card numbers, UPI PINs, or sensitive banking details on our servers. All transactions are securely routed via 256-bit encrypted checkout.'
    }
  ];

  return (
    <section id="benefits" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-900 border border-white/10 text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
          <CheckCircle className="w-3.5 h-3.5 text-neon-bright" />
          <span>The Plixamind Standard</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Engineered for Quality, Speed & Reliability
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
          Crafted with rigorous technical discipline and aesthetic precision. Every resource is architected to save you hundreds of hours of design, research, and trial-and-error.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {benefits.map((b, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-6 sm:p-7 border border-white/8 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-charcoal-900 border border-white/10 flex items-center justify-center mb-5">
                {b.icon}
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">
                {b.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {b.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
