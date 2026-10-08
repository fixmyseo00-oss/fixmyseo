import React from 'react';
import { Zap, Shield, CheckCircle, BookOpen, ShieldCheck, Mail, FileText } from 'lucide-react';
import { LegalTab } from './LegalModal';

interface FooterProps {
  onOpenLegalModal: (tab: LegalTab) => void;
  onNavigateToBlog: () => void;
  onNavigateToHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegalModal,
  onNavigateToBlog,
  onNavigateToHome,
}) => {
  return (
    <footer className="w-full border-t border-slate-800 bg-[#06090e] text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand & Mission */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToHome}
              className="flex items-center gap-2 cursor-pointer text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs">
                <Zap className="w-4 h-4 fill-slate-950 stroke-slate-950" />
              </div>
              <span className="text-lg font-black text-white">
                FixMy<span className="text-emerald-400">SEO</span>
              </span>
            </button>
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
            FixMySEO is an enterprise-grade instant web audit, AEO/GEO generative search diagnostic platform, and Core Web Vitals suite powered by Google Gemini and live DOM telemetry.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-emerald-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Google AdSense Better Ads Compliant</span>
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-slate-400">Tier-1 High CPM Optimization Architecture</span>
          </div>
        </div>

        {/* Audit Tools & Navigation */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-3">Platform Navigation</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={onNavigateToHome}
                className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
              >
                Instant SEO & GEO Audit
              </button>
            </li>
            <li>
              <button
                onClick={onNavigateToBlog}
                className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5 text-left"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Knowledge Hub / Articles</span>
              </button>
            </li>
            <li>
              <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                Commercial Plans & Pricing
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-emerald-400 transition-colors">
                Technical Audit FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Legal & Compliance Links */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-3">Legal & Compliance</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onOpenLegalModal('privacy')}
                className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5 text-left"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Privacy Policy & Cookies</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenLegalModal('terms')}
                className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5 text-left"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Terms of Service</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenLegalModal('contact')}
                className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5 text-left"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contact Us & Support</span>
              </button>
            </li>
            <li className="pt-2 text-[11px] text-slate-500">
              Direct Contact: <a href="mailto:fixmyseo00@gmail.com" className="text-emerald-400 hover:underline">fixmyseo00@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <p>© {new Date().getFullYear()} FixMySEO &bull; Instant Web Audit & Optimization. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onOpenLegalModal('privacy')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <span className="text-slate-700">&bull;</span>
          <button
            onClick={() => onOpenLegalModal('terms')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <span className="text-slate-700">&bull;</span>
          <button
            onClick={() => onOpenLegalModal('contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact Support
          </button>
        </div>
      </div>
    </footer>
  );
};
