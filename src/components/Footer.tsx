import React from 'react';
import { Zap, Heart, Shield, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800 bg-[#06090e] text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand & Mission */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs">
              <Zap className="w-4 h-4 fill-slate-950 stroke-slate-950" />
            </div>
            <span className="text-lg font-black text-white">
              FixMy<span className="text-emerald-400">SEO</span>
            </span>
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
            FixMySEO is an AI-powered instant website audit, Core Web Vitals diagnostic suite, and viral Hinglish SEO roaster powered by Google Gemini and real-time Search Grounding.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Google Search Grounding Engine Active</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-3">Audit Tools</h4>
          <ul className="space-y-2">
            <li>
              <a href="#audit-input" className="hover:text-emerald-400 transition-colors">
                Instant Page Auditor
              </a>
            </li>
            <li>
              <a href="#audit-input" className="hover:text-emerald-400 transition-colors">
                Hinglish AI Roaster
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                Core Web Vitals Tracker
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                White-Label Client Exporter
              </a>
            </li>
          </ul>
        </div>

        {/* Legal & Standards */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-3">Standards & Compliance</h4>
          <ul className="space-y-2 text-[11px]">
            <li className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>HTML5 Semantic 100/100</span>
            </li>
            <li className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Schema.org JSON-LD Validated</span>
            </li>
            <li className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Core Web Vitals Metric Ready</span>
            </li>
            <li className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>W3C Accessibility Standard</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <p>© {new Date().getFullYear()} FixMySEO. Built for digital builders, marketers, and founders worldwide.</p>
        <div className="flex items-center gap-4">
          <a href="#audit-input" className="hover:text-white transition-colors">Privacy</a>
          <a href="#pricing" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#audit-input" className="hover:text-white transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
};
