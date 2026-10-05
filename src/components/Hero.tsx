import React, { useState } from 'react';
import { Globe, Flame, Loader2, ArrowRight, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HeroProps {
  urlInput: string;
  setUrlInput: (val: string) => void;
  roastLevel: string;
  setRoastLevel: (val: string) => void;
  roastLanguage: 'hinglish' | 'english';
  setRoastLanguage: (val: 'hinglish' | 'english') => void;
  activeTab: 'professional' | 'hinglish';
  setActiveTab: (tab: 'professional' | 'hinglish') => void;
  onRunAudit: (e?: React.FormEvent) => void;
  isLoading: boolean;
  hasResult: boolean;
}

const PRESET_URLS = [
  'shopify.com',
  'stripe.com',
  'producthunt.com',
  'wikipedia.org',
  'netflix.com',
];

export const Hero: React.FC<HeroProps> = ({
  urlInput,
  setUrlInput,
  roastLevel,
  setRoastLevel,
  roastLanguage,
  setRoastLanguage,
  activeTab,
  setActiveTab,
  onRunAudit,
  isLoading,
  hasResult,
}) => {
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setInputError('Please enter a website URL (e.g. yoursite.com)');
      return;
    }
    setInputError('');
    onRunAudit(e);
  };

  const handleChipClick = (domain: string) => {
    setUrlInput(domain);
    setInputError('');
  };

  return (
    <section
      id="audit-input"
      aria-label="SEO Audit & Roaster Engine"
      className="relative pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Google Search Grounded + Real-Time DOM Inspection</span>
      </div>

      {/* STRICT REQUIREMENT: Exactly ONE main <h1> tag */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
        FixMySEO: The AI-Powered Website Audit & Optimization Tool
      </h1>

      {/* Descriptive subtext */}
      <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Instantly uncover hidden SEO errors, Core Web Vitals bottlenecks, and meta tag leaks with Google Search Grounding — or get brutally roasted in savage Hinglish or Silicon Valley English!
      </p>

      {/* Center-Aligned Website URL Input Form with Flawless Horizontal Alignment */}
      <div className="mt-8 max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 p-2 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl shadow-emerald-950/30 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all"
        >
          {/* Left Input Field: Fills all available horizontal space */}
          <div className="flex-1 flex items-center min-w-0 px-3 py-2 lg:py-0">
            <Globe className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
            <label htmlFor="website-url-input" className="sr-only">
              Website URL to audit
            </label>
            <input
              id="website-url-input"
              type="text"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                if (inputError) setInputError('');
              }}
              placeholder="Enter URL (e.g. shopify.com, stripe.com, yourdomain.com)"
              aria-label="Website URL"
              className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none truncate"
              disabled={isLoading}
            />
            {urlInput && !isLoading && (
              <button
                type="button"
                onClick={() => setUrlInput('')}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 shrink-0"
                aria-label="Clear input"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right Controls Container: Exactly aligned on horizontal line with h-11 */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Selector Dropdown (Tier 1 English vs Hinglish) */}
            <div className="relative shrink-0">
              <label htmlFor="roast-language-select" className="sr-only">
                Roast Language Mode
              </label>
              <select
                id="roast-language-select"
                value={roastLanguage}
                onChange={(e) => setRoastLanguage(e.target.value as 'hinglish' | 'english')}
                className="h-11 bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 rounded-xl px-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
                title="Select Roast Language Style"
              >
                <option value="hinglish">🔥 Hinglish</option>
                <option value="english">🌍 English</option>
              </select>
            </div>

            {/* Roast Level Dropdown in Input Bar */}
            <div className="relative shrink-0">
              <label htmlFor="roast-level-select" className="sr-only">
                Roast Level
              </label>
              <select
                id="roast-level-select"
                value={roastLevel}
                onChange={(e) => setRoastLevel(e.target.value)}
                className="h-11 bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 rounded-xl px-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
                title="Select Roast spice level"
              >
                <option value="Mild Chai Roast">☕ Mild</option>
                <option value="Masala Spicy">🌶️ Spicy</option>
                <option value="Nuclear Desi Burn">🔥 Nuclear</option>
              </select>
            </div>

            {/* Run Instant Audit Button: Flawless alignment */}
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer h-11 px-5 sm:px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/25 shrink-0 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <span>Run Instant Audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        {inputError && (
          <p className="mt-2 text-rose-400 text-xs flex items-center justify-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            {inputError}
          </p>
        )}

        {/* Quick Click Preset Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="text-slate-500">Try testing:</span>
          {PRESET_URLS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handleChipClick(preset)}
              className="cursor-pointer px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Action Tabs: Below the input field */}
      <div className="mt-10 max-w-xl mx-auto">
        <div
          role="tablist"
          aria-label="Audit Mode Navigation"
          className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md"
        >
          <button
            role="tab"
            id="tab-professional"
            aria-selected={activeTab === 'professional'}
            aria-controls="panel-professional"
            onClick={() => setActiveTab('professional')}
            className={`cursor-pointer flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'professional'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Professional Audit</span>
            {hasResult && activeTab !== 'professional' && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            role="tab"
            id="tab-hinglish"
            aria-selected={activeTab === 'hinglish'}
            aria-controls="panel-hinglish"
            onClick={() => setActiveTab('hinglish')}
            className={`cursor-pointer flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'hinglish'
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{roastLanguage === 'english' ? 'Tech AI Roaster' : 'Hinglish AI Roaster'}</span>
            <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded font-black tracking-wider uppercase">
              {roastLanguage === 'english' ? 'Global' : 'Viral 🔥'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
