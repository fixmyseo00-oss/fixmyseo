import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { PlanType } from '../types';

interface AdSenseContainerProps {
  slot: 'leaderboard' | 'rectangle' | 'anchor' | 'interstitial';
  className?: string;
  userPlan?: PlanType;
}

const ADSTERRA_728x90_HTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <base target="_blank" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key' : '65ac55348cb9b72de4fab84a3a3fa66b',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://bauval.org/22/65ac55348cb9b72de4fab84a3a3fa66b"></script>
  </body>
</html>`;

/**
 * Renders the active Adsterra 728x90 Banner iframe script block
 */
export const AdsterraLeaderboardIframe: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc && (!doc.body || !doc.body.innerHTML || doc.body.innerHTML.trim() === '')) {
        doc.open();
        doc.write(ADSTERRA_728x90_HTML);
        doc.close();
      }
    } catch {
      // safe fallback if cross-origin boundary applies
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Adsterra 728x90 Top Horizontal Banner"
      width={728}
      height={90}
      scrolling="no"
      srcDoc={ADSTERRA_728x90_HTML}
      style={{
        width: '100%',
        maxWidth: '728px',
        height: '90px',
        border: 0,
        overflow: 'hidden',
      }}
    />
  );
};

export const AdSenseContainer: React.FC<AdSenseContainerProps> = ({
  slot,
  className = '',
  userPlan = 'free',
}) => {
  // Conditional Monetization: strictly suppress all ad nodes if not on Free tier
  if (userPlan !== 'free') {
    return null;
  }

  if (slot === 'interstitial') {
    return (
      <div
        className={`w-full max-w-lg mx-auto my-4 p-4 rounded-2xl border border-dashed border-emerald-500/40 bg-slate-900/90 flex flex-col items-center justify-center text-center shadow-xl ${className}`}
        aria-label="Active Sponsor Loading Screen Interstitial Advertisement"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 mb-2">
          <span>Active Sponsor Space &bull; Adsterra Network</span>
          <Info className="w-3 h-3 text-slate-500" />
        </div>
        <div className="w-full h-[160px] rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent pointer-events-none" />
          <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-2">
            <span className="text-emerald-400 font-mono font-bold text-xs">AD</span>
          </div>
          <span className="text-xs font-semibold text-slate-200">
            Loading Screen Interstitial Ad Space (Responsive)
          </span>
          <span className="text-[11px] text-slate-500 font-mono mt-0.5">
            Adsterra Network &bull; High-Viewability Tier-1 Placement
          </span>
        </div>
        <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>Active Free Plan Ad Placement &bull; Better Ads Standards</span>
        </div>
      </div>
    );
  }

  if (slot === 'leaderboard') {
    return (
      <div
        className={`w-full my-6 p-3 sm:p-4 rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 flex flex-col items-center justify-center text-center transition-all ${className}`}
        aria-label="Adsterra Top Horizontal Banner (728x90) Advertisement"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
          <span>Advertisement &bull; Sponsored</span>
          <Info className="w-3 h-3 text-slate-600" />
        </div>

        {/* TOP HORIZONTAL BANNER (728x90) SLOT: Active Script Iframe Block */}
        <div className="w-full max-w-[728px] min-h-[90px] rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-center relative overflow-hidden group">
          <AdsterraLeaderboardIframe />
        </div>

        <div className="mt-2 text-[10px] text-slate-600 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500/70" />
          <span>Compliant with Adsterra & Better Ads Standards &bull; 728x90</span>
        </div>
      </div>
    );
  }

  if (slot === 'rectangle') {
    return (
      <aside
        className={`w-full p-4 rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 flex flex-col items-center justify-center text-center transition-all ${className}`}
        aria-label="Adsterra Sidebar Rectangle Advertisement"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
          <span>Advertisement &bull; Active Sponsor</span>
          <Info className="w-3 h-3 text-slate-600" />
        </div>
        <div className="w-full max-w-[300px] h-[250px] rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-teal-500/5 to-transparent pointer-events-none" />
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-3">
            <span className="text-emerald-400 font-mono font-bold text-xs">AD</span>
          </div>
          <span className="text-xs font-medium text-slate-300">
            Medium Rectangle Ad Placement (300x250)
          </span>
          <p className="text-[11px] text-slate-500 mt-1 max-w-[220px]">
            High-viewability sidebar unit optimized for Tier-1 CPM monetization.
          </p>
        </div>
        <div className="mt-2 text-[10px] text-slate-600 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500/70" />
          <span>Active Adsterra Container Verified</span>
        </div>
      </aside>
    );
  }

  // Anchor / Sticky Bottom Ad
  return (
    <div
      className={`w-full my-6 p-4 rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 flex flex-col items-center justify-center text-center ${className}`}
      aria-label="Adsterra Anchor Footer Advertisement"
    >
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        <span>Advertisement &bull; Anchor Banner</span>
        <Info className="w-3 h-3 text-slate-600" />
      </div>
      <div className="w-full max-w-[728px] h-[75px] rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs font-medium text-slate-300">
            Anchor Ad Unit Container (728x90 Desktop / 320x50 Mobile)
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Active Fixed Anchor-Bar Compatible
          </span>
        </div>
      </div>
    </div>
  );
};
