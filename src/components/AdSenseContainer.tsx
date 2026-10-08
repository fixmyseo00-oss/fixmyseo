import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface AdSenseContainerProps {
  slot: 'leaderboard' | 'rectangle' | 'anchor';
  className?: string;
}

export const AdSenseContainer: React.FC<AdSenseContainerProps> = ({ slot, className = '' }) => {
  if (slot === 'leaderboard') {
    return (
      <div
        className={`w-full my-6 p-4 rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 flex flex-col items-center justify-center text-center transition-all ${className}`}
        aria-label="Google AdSense Leaderboard Advertisement"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
          <span>Advertisement &bull; Google AdSense</span>
          <Info className="w-3 h-3 text-slate-600" />
        </div>
        <div className="w-full max-w-[728px] h-[90px] rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-center px-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-transparent pointer-events-none" />
          <div className="flex flex-col items-center justify-center space-y-1">
            <span className="text-xs font-medium text-slate-400">
              Leaderboard Ad Placement Container (728x90 / Responsive)
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Google Publisher Tag / Data-Ad-Slot Ready
            </span>
          </div>
        </div>
        <div className="mt-1 text-[10px] text-slate-600 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500/70" />
          <span>Compliant with Google AdSense Better Ads Standards</span>
        </div>
      </div>
    );
  }

  if (slot === 'rectangle') {
    return (
      <aside
        className={`w-full p-4 rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 flex flex-col items-center justify-center text-center transition-all ${className}`}
        aria-label="Google AdSense Sidebar Rectangle Advertisement"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
          <span>Advertisement &bull; Google AdSense</span>
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
          <span>AdSense Policy Verified Container</span>
        </div>
      </aside>
    );
  }

  // Anchor / Sticky Bottom Ad
  return (
    <div
      className={`w-full my-6 p-4 rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 flex flex-col items-center justify-center text-center ${className}`}
      aria-label="Google AdSense Anchor Footer Advertisement"
    >
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        <span>Advertisement &bull; Google AdSense Anchor</span>
        <Info className="w-3 h-3 text-slate-600" />
      </div>
      <div className="w-full max-w-[728px] h-[75px] rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs font-medium text-slate-300">
            Anchor Ad Unit Container (728x90 Desktop / 320x50 Mobile)
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Auto-Ads & Fixed Anchor Anchor-Bar Compatible
          </span>
        </div>
      </div>
    </div>
  );
};
