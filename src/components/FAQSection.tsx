import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Everything you need to know about purchasing, accessing, and using our digital products.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={faq.id || idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'bg-charcoal-900 border-purple-500/40 shadow-lg shadow-purple-950/30' 
                  : 'bg-charcoal-900/60 border-white/8 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full px-5 sm:px-6 py-4.5 sm:py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
              >
                <span className="font-display font-bold text-sm sm:text-base text-white pr-4">
                  {faq.question}
                </span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-slate-300 transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? 'rotate-180 text-neon-bright bg-neon/10' : ''
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help callout */}
      <div className="mt-10 p-5 rounded-2xl bg-charcoal-900/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neon/15 border border-neon/30 flex items-center justify-center text-neon-bright flex-shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Have a specific question not listed here?</p>
            <p className="text-xs text-slate-400">Our support team is here to assist you directly.</p>
          </div>
        </div>
        <a
          href="/contact"
          className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white transition-colors"
        >
          Contact Support
        </a>
      </div>

    </section>
  );
};
