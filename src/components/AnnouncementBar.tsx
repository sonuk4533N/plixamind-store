import React, { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { SiteSettings } from '../types';

interface AnnouncementBarProps {
  settings: SiteSettings;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ settings }) => {
  const [dismissed, setDismissed] = useState(false);

  if (!settings.show_announcement || !settings.announcement_text || dismissed) {
    return null;
  }

  return (
    <aside 
      aria-label="Site announcement"
      className="relative bg-gradient-to-r from-purple-900/90 via-charcoal-900 to-purple-950/90 border-b border-purple-500/20 text-xs sm:text-sm py-2.5 px-4 text-center z-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-slate-200">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-neon-bright/20 text-neon-bright flex-shrink-0 animate-pulse">
          <Sparkles className="w-3 h-3" />
        </span>
        <span className="font-medium tracking-wide">
          {settings.announcement_text}
        </span>
        {settings.announcement_link && (
          <a
            href={settings.announcement_link}
            className="inline-flex items-center gap-1 font-semibold text-neon-bright hover:text-white transition-colors underline underline-offset-4 ml-1"
          >
            Claim Offer <ArrowRight className="w-3 h-3" />
          </a>
        )}
      </div>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
