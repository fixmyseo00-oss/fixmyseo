import React from 'react';
import { X, Crown, ArrowRight, ShieldCheck, Zap, Layers, Code2, Image } from 'lucide-react';

interface AgencyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeToAgency: () => void;
}

export const AgencyAlertModal: React.FC<AgencyAlertModalProps> = ({
  isOpen,
  onClose,
  onUpgradeToAgency,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="agency-alert-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/40 p-6 sm:p-7 shadow-2xl shadow-amber-500/10 overflow-hidden text-center">
        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          aria-label="Close alert"
          className="cursor-pointer absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-850 border border-slate-700/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Crown Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
          <Crown className="w-7 h-7" />
        </div>

        {/* Exact required text */}
        <h3 id="agency-alert-title" className="text-lg sm:text-xl font-bold text-white mb-2">
          Agency Feature Locked
        </h3>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-5">
          <p className="text-xs sm:text-sm font-semibold text-amber-200 leading-relaxed">
            This advanced feature is exclusive to the Agency Automation Plan. Please upgrade to unlock.
          </p>
        </div>

        {/* Feature inclusions reminder */}
        <div className="text-left space-y-2 mb-6 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Agency Automation ($19/mo) includes:
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Multi-URL Agency Batch Audit workspace</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Image className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Prepend custom agency logo to client PDF reports</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Code2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Live webhook API sync & JSON-LD schema panels</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              onClose();
              onUpgradeToAgency();
            }}
            className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
          >
            <span>Upgrade to Agency Plan ($19)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="cursor-pointer w-full py-2.5 px-4 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 text-xs font-semibold transition-colors"
          >
            Stay on Current Plan
          </button>
        </div>
      </div>
    </div>
  );
};
