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
      description: 'Zero waiting. Once your payment succeeds on SuperProfile, your download link opens immediately and a backup copy is dispatched to your email inbox within 30 seconds.'
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: 'Built for Action, Zero Fluff',
      description: 'Every Notion architecture, guide, and component set is engineered to solve a practical problem. No filler pages, no bloated lectures—just plug-and-play digital assets.'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-emerald-400" />,
      title: 'Frictionless Indian Payment Stack',
      description: 'Checkout securely via SuperProfile using UPI (Google Pay, PhonePe, Paytm, CRED), RuPay, Visa, Mastercard, or NetBanking across all major Indian banks.'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-neon-bright" />,
      title: 'Free Lifetime Updates',
      description: 'When tools or regulations change (like Notion updates, new tax rules, or design tokens), our products are refreshed and you receive the new versions at zero additional cost.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: 'Honest Delivery Guarantee',
      description: 'If you ever encounter an issue accessing your files or a link is broken, our support team will manually verify and deliver your digital assets within 48 hours.'
    },
    {
      icon: <Lock className="w-6 h-6 text-amber-400" />,
      title: 'Bank-Grade Security',
      description: 'We do not collect or store credit card or bank details on our servers. All transactions are securely routed through SuperProfile with 256-bit SSL encryption.'
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
          Engineered for Quality, Speed & Trust
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
          We believe in complete transparency. No fake countdown timers, no artificial review stars, and no exaggerated claims—just meticulously built digital resources.
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
