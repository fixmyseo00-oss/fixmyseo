import React from 'react';
import { Sparkles, Shield, Flame, Zap, Layers, Crown } from 'lucide-react';
import { PlanType } from '../types';

interface HeaderProps {
  freeAuditsRemaining: number;
  userPlan: PlanType;
  onOpenUpgradeModal: () => void;
  onOpenBatchModal: () => void;
  onOpenAiFixModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  freeAuditsRemaining,
  userPlan,
  onOpenUpgradeModal,
  onOpenBatchModal,
  onOpenAiFixModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070A0F]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            aria-label="FixMySEO Homepage"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-slate-950 stroke-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                FixMy<span className="text-emerald-400">SEO</span>
                <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  AI 2.0
                </span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 hidden sm:inline-block">
                Instant Audit & Roaster
              </span>
            </div>
          </a>
        </div>

        {/* Semantic Navigation Menu */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#audit-input"
            className="hover:text-emerald-400 transition-colors focus:outline-none focus:text-emerald-400"
          >
            Instant Audit
          </a>
          <button
            onClick={onOpenAiFixModal}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none focus:text-emerald-400"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            AI Fix Generator
          </button>
          <button
            onClick={onOpenBatchModal}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none focus:text-emerald-400"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Batch Audit
          </button>
          <a
            href="#pricing"
            className="hover:text-emerald-400 transition-colors focus:outline-none focus:text-emerald-400"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="hover:text-emerald-400 transition-colors focus:outline-none focus:text-emerald-400"
          >
            FAQ
          </a>
        </nav>

        {/* Action Controls & Plan Status */}
        <div className="flex items-center gap-3">
          {/* Free Tier Pass Counter */}
          {userPlan === 'free' ? (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                <strong className="text-emerald-400">{freeAuditsRemaining}</strong> / 3 Free Passes Left
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
              <Crown className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider">{userPlan} Plan Active</span>
            </div>
          )}

          {/* Upgrade / Pricing CTA */}
          <button
            onClick={onOpenUpgradeModal}
            className="cursor-pointer relative group overflow-hidden rounded-xl p-px font-semibold text-xs uppercase tracking-wider text-white shadow-lg shadow-emerald-500/15"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 transition-all duration-300 group-hover:opacity-90"></span>
            <span className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-[11px] bg-slate-950 transition-colors duration-200 group-hover:bg-slate-900">
              <Crown className="w-3.5 h-3.5 text-emerald-400" />
              <span>{userPlan === 'agency' ? 'Manage Plan' : userPlan === 'pro' ? 'Go Agency' : 'Unlock Pro'}</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
