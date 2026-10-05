import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProfessionalAuditTab } from './components/ProfessionalAuditTab';
import { HinglishRoasterTab } from './components/HinglishRoasterTab';
import { PricingSection } from './components/PricingSection';
import { CheckoutModal } from './components/CheckoutModal';
import { WhiteLabelReportModal } from './components/WhiteLabelReportModal';
import { AiFixGeneratorModal } from './components/AiFixGeneratorModal';
import { BatchAuditModal } from './components/BatchAuditModal';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AuditResult, PlanType } from './types';
import { runClientSideAudit } from './services/clientAuditor';
import { Loader2, Sparkles, AlertCircle, History, Check } from 'lucide-react';

const INITIAL_DEMO_RESULT: AuditResult = {
  url: 'https://myshopify-store.com',
  analyzedAt: new Date().toISOString(),
  overallScore: 68,
  grade: 'C',
  roastLanguage: 'hinglish',
  scores: {
    pageSpeed: 62,
    metaData: 70,
    mobileReadiness: 88,
    contentStructure: 55,
    security: 95,
  },
  metrics: {
    title: {
      text: 'My Cool Online Store - Buy Handcrafted Shoes, Bags & Accessories Online Best Price',
      length: 83,
      status: 'warning',
      message: 'Title length is 83 chars (Recommended: 30-60 characters). Search snippets will be truncated with an ellipsis.',
    },
    description: {
      text: 'Welcome to our online store. We sell nice shoes.',
      length: 48,
      status: 'warning',
      message: 'Length is only 48 chars. Recommended: 120-160 characters. Too short for optimal search visibility.',
    },
    h1: {
      text: 'Welcome to My Cool Online Store',
      count: 2,
      status: 'warning',
      message: 'Detected 2 <h1> tags. Multiple H1 tags dilute topical search relevance.',
    },
    mobile: {
      viewportFound: true,
      status: 'good',
      message: 'Mobile viewport tag detected and properly configured for smartphones.',
    },
    speed: {
      fcp: '1.9s',
      lcp: '3.4s',
      cls: '0.12',
      tti: '4.1s',
      score: 62,
      status: 'warning',
    },
    ssl: {
      enabled: true,
      status: 'good',
      message: 'Valid HTTPS SSL encryption active across all assets.',
    },
    images: {
      total: 14,
      missingAlt: 6,
      status: 'warning',
      message: '6 out of 14 images are missing descriptive alt attributes.',
    },
  },
  auditItems: [
    {
      id: 'meta-title-length',
      category: 'meta',
      status: 'warning',
      title: 'Page Title Tag Length (83 Chars Detected)',
      explanation: 'Search engines truncate titles longer than 60 characters on mobile and desktop search results.',
      recommendation: 'Shorten title to under 60 characters and keep your primary target keywords at the beginning.',
      fixSnippet: '<title>Handcrafted Shoes & Bags | MyStore</title>',
      impact: 'High',
    },
    {
      id: 'meta-desc-short',
      category: 'meta',
      status: 'warning',
      title: 'Meta Description Under 120 Characters',
      explanation: 'Your description is only 48 characters. A full 120-160 character description increases organic CTR by up to 34%.',
      recommendation: 'Expand with a strong customer benefit, keyword focus, and clear call-to-action.',
      fixSnippet: '<meta name="description" content="Shop handcrafted leather shoes, artisan bags, and accessories. Enjoy sustainable craftsmanship, free express delivery, and lifetime guarantee." />',
      impact: 'High',
    },
    {
      id: 'h1-multiple',
      category: 'structure',
      status: 'warning',
      title: 'Multiple <h1> Tags Detected on Same Page',
      explanation: 'Found 2 H1 tags. Best practice requires strictly 1 primary H1 representing the core topic of the document.',
      recommendation: 'Demote the secondary H1 tag to an <h2> heading.',
      fixSnippet: '<h1>Handcrafted Luxury Leather Shoes & Artisan Goods</h1>\n<h2>Featured Seasonal Collection</h2>',
      impact: 'High',
    },
    {
      id: 'image-alt-missing',
      category: 'structure',
      status: 'warning',
      title: '6 Images Missing Descriptive Alt Attributes',
      explanation: 'Search crawlers cannot index images or rank them in Google Images without descriptive alt text.',
      recommendation: 'Add descriptive alt attributes explaining the subject matter of each image.',
      fixSnippet: '<img src="/product-shoe-tan.webp" alt="Handcrafted tan leather oxford shoe with rubber sole" width="600" height="600" />',
      impact: 'Medium',
    },
    {
      id: 'speed-lcp',
      category: 'speed',
      status: 'error',
      title: 'Largest Contentful Paint (LCP) Above 2.5s Target',
      explanation: 'Main hero image takes 3.4 seconds to render. This triggers poor Core Web Vitals rankings.',
      recommendation: 'Convert hero images to WebP/AVIF format and add fetchpriority="high" preload tag.',
      fixSnippet: '<link rel="preload" as="image" href="/hero.webp" type="image/webp" fetchpriority="high" />',
      impact: 'High',
    },
    {
      id: 'mobile-viewport',
      category: 'mobile',
      status: 'good',
      title: 'Mobile Viewport Tag Configured Properly',
      explanation: 'The viewport meta tag is present with standard width=device-width scaling.',
      recommendation: 'Maintain responsive CSS media queries across breakpoints.',
      fixSnippet: '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
      impact: 'High',
    },
    {
      id: 'ssl-security',
      category: 'security',
      status: 'good',
      title: 'HTTPS SSL Encryption Active',
      explanation: 'The connection is encrypted using modern TLS/SSL certificates.',
      recommendation: 'Ensure all subdomains and third-party assets are loaded over HTTPS.',
      fixSnippet: '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />',
      impact: 'High',
    },
    {
      id: 'canonical-url',
      category: 'meta',
      status: 'good',
      title: 'Canonical Tag Present',
      explanation: 'A canonical tag is declared, preventing duplicate parameter indexing penalties.',
      recommendation: 'Ensure self-referential canonical URL is accurate.',
      fixSnippet: '<link rel="canonical" href="https://myshopify-store.com" />',
      impact: 'Medium',
    },
  ],
  hinglishRoast: {
    siteNickname: 'The 2G Bullock Cart',
    savageRoast: `Arrey bhai bhai bhai! Is website ka SEO dekh ke Googlebot ne apna resignation submit kar diya hai! Title tag itna lamba hai jaise railway ticket ki reservation list, aur meta description itna chhota jaise salary aane ke do din baad ka bank balance!\n\nHero image load hote hote user ka 5G data pack 2G ban jayega aur customer so jayega! H1 tag dhoondhte dhoondhte CBI ki team thak gayi! Agar aisi speed rahi toh agla sale 2035 mein hoga bhai! Thoda taras khao user par aur image compress karo!`,
    punchlines: [
      'Bhai, website load hote hote user ka data package khatam ho jayega!',
      'Title tag itna lamba hai ki Googlebot ko split-screen mode lagana pad raha hai!',
      'Meta description aise gayab hai jaise exam ke din topper ke notes!',
      'Images ke paas alt tags nahi hain, Google soch raha hai yeh samosa hai ya jalebi!',
      'Speed aisi hai ki kabootar isse tez sandesh deliver kar de!',
    ],
    desiPrescription: [
      'Subah shaam 2 alt tags lagao aur hero image ko WebP mein compress karo.',
      'Title tag ko gym bhej kar 55 characters ka fit banao.',
      'Ek solid H1 tag lagao taaki Google ko pata chale dukaan kis cheez ki hai!',
      'Meta description mein mast masala daalo taaki click karne ka dil kare!',
    ],
    roastScore: '3.5/10 - Sakht Dawaai Ki Zaroorat Hai!',
    shareableQuote: 'Maine apni website ka SEO audit karwaya FixMySEO pe, aur AI ne aisi bezti ki ki ab main website delete karke dukan pe board lagane ja raha hoon! 😂',
    burnLevel: 'Masala Spicy',
    language: 'hinglish',
  },
  groundingSources: [
    {
      title: 'Shopify SEO Checklist & Store Optimization',
      uri: 'https://www.shopify.com/blog/shopify-seo-checklist',
    },
    {
      title: 'Google Search Central - Title Links & Snippets',
      uri: 'https://developers.google.com/search/docs/appearance/title-link',
    },
  ],
};

export default function App() {
  const [urlInput, setUrlInput] = useState('myshopify-store.com');
  const [roastLevel, setRoastLevel] = useState('Masala Spicy');
  const [roastLanguage, setRoastLanguage] = useState<'hinglish' | 'english'>(() => {
    return (localStorage.getItem('fixmyseo_roast_lang') as 'hinglish' | 'english') || 'hinglish';
  });

  const [activeTab, setActiveTab] = useState<'professional' | 'hinglish'>('professional');
  const [auditResult, setAuditResult] = useState<AuditResult | null>(INITIAL_DEMO_RESULT);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingStep, setLoadingStep] = useState('');

  // Session & monetization tracking
  const [freeAuditsRemaining, setFreeAuditsRemaining] = useState<number>(() => {
    const saved = localStorage.getItem('fixmyseo_free_audits');
    return saved !== null ? parseInt(saved, 10) : 3;
  });

  const [userPlan, setUserPlan] = useState<PlanType>(() => {
    return (localStorage.getItem('fixmyseo_plan') as PlanType) || 'free';
  });

  // Dynamic Recent Scans from localStorage (Clean - no dummy placeholder links)
  const [recentAudits, setRecentAudits] = useState<{ url: string; score: number }[]>(() => {
    try {
      const saved = localStorage.getItem('fixmyseo_recent_scans');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      // ignore
    }
    return [];
  });

  // Modals state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [targetCheckoutPlan, setTargetCheckoutPlan] = useState<PlanType>('pro');
  const [checkoutBilling, setCheckoutBilling] = useState<'monthly' | 'yearly'>('monthly');

  const [isWhiteLabelOpen, setIsWhiteLabelOpen] = useState(false);
  const [isAiFixOpen, setIsAiFixOpen] = useState(false);
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenUpgrade = (plan: PlanType = 'pro', cycle: 'monthly' | 'yearly' = 'monthly') => {
    setTargetCheckoutPlan(plan);
    setCheckoutBilling(cycle);
    setIsCheckoutOpen(true);
  };

  const handleConfirmUpgrade = (plan: PlanType) => {
    setUserPlan(plan);
    localStorage.setItem('fixmyseo_plan', plan);
    setFreeAuditsRemaining(999);
    showToast(`🎉 Congratulations! ${plan.toUpperCase()} Plan activated successfully.`);
  };

  const handleRoastLanguageChange = (lang: 'hinglish' | 'english') => {
    setRoastLanguage(lang);
    localStorage.setItem('fixmyseo_roast_lang', lang);
    if (auditResult) {
      runAudit(auditResult.url, roastLevel, lang);
    }
  };

  const runAudit = async (
    customUrl?: string,
    customLevel?: string,
    customLanguage?: 'hinglish' | 'english'
  ) => {
    const targetUrl = customUrl || urlInput;
    const targetRoastLevel = customLevel || roastLevel;
    const targetLanguage = customLanguage || roastLanguage;

    if (!targetUrl.trim()) return;

    // Check free session limit
    if (userPlan === 'free' && freeAuditsRemaining <= 0) {
      showToast('You have used all 3 free passes for this session. Please upgrade to Pro!');
      handleOpenUpgrade('pro');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setLoadingStep('Probing website DOM & crawling meta tags...');

    const stepTimer1 = setTimeout(() => {
      setLoadingStep('Connecting to Google Search Grounding for live SERP signals...');
    }, 1200);

    const stepTimer2 = setTimeout(() => {
      setLoadingStep(
        targetLanguage === 'english'
          ? 'Formulating Core Web Vitals & crafting Silicon Valley roast...'
          : 'Formulating Core Web Vitals & brewing spicy Hinglish roast...'
      );
    }, 2800);

    try {
      // 1. Completely bypass internal backend API endpoints (remove fetch('/api/audit'))
      // 2. Perform direct browser-based client-side request to Gemini endpoint and calculate real-time audit
      const data: AuditResult = await runClientSideAudit(
        targetUrl,
        targetRoastLevel,
        targetLanguage
      );

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      setAuditResult(data);

      // Decrement free passes if on free plan
      if (userPlan === 'free') {
        const newCount = Math.max(0, freeAuditsRemaining - 1);
        setFreeAuditsRemaining(newCount);
        localStorage.setItem('fixmyseo_free_audits', newCount.toString());
      }

      // Add to dynamic recent audits in localStorage
      setRecentAudits((prev) => {
        const filtered = prev.filter((p) => p.url !== data.url);
        const updated = [{ url: data.url, score: data.overallScore }, ...filtered.slice(0, 5)];
        try {
          localStorage.setItem('fixmyseo_recent_scans', JSON.stringify(updated));
        } catch {
          // ignore storage error
        }
        return updated;
      });

      showToast(`Audit for ${data.url} completed (Score: ${data.overallScore}/100)`);
    } catch (err: any) {
      console.error('Audit failed:', err);
      setErrorMessage(err.message || 'Audit encountered an issue. Please try another URL.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleReRoast = (level: string, lang?: 'hinglish' | 'english') => {
    setRoastLevel(level);
    if (lang) {
      setRoastLanguage(lang);
      localStorage.setItem('fixmyseo_roast_lang', lang);
    }
    runAudit(urlInput, level, lang || roastLanguage);
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/30 animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Semantic Header */}
      <Header
        freeAuditsRemaining={freeAuditsRemaining}
        userPlan={userPlan}
        onOpenUpgradeModal={() => handleOpenUpgrade('pro')}
        onOpenBatchModal={() => setIsBatchOpen(true)}
        onOpenAiFixModal={() => setIsAiFixOpen(true)}
      />

      {/* Main Semantic Landmark Container */}
      <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        {/* Hero Section containing strictly ONE main H1 tag & center URL input with aligned button */}
        <Hero
          urlInput={urlInput}
          setUrlInput={setUrlInput}
          roastLevel={roastLevel}
          setRoastLevel={setRoastLevel}
          roastLanguage={roastLanguage}
          setRoastLanguage={setRoastLanguage}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onRunAudit={() => runAudit()}
          isLoading={isLoading}
          hasResult={!!auditResult}
        />

        {/* Loading Progress State */}
        {isLoading && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/40 text-center space-y-4 shadow-2xl glow-emerald">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
              <Sparkles className="w-5 h-5 text-emerald-300 absolute" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Analyzing Website Health & SERP Signals</h3>
              <p className="text-xs text-emerald-400 font-medium mt-1 animate-pulse">
                {loadingStep || 'Crunching data through Gemini 3.8 & Google Search Grounding...'}
              </p>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div className="flex-1">
              <strong className="block font-bold">Audit Encountered An Error</strong>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Dynamic Recent Audits Container (No hardcoded placeholders, reads from localStorage) */}
        {!isLoading && (
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <History className="w-3.5 h-3.5" /> Recent Scans:
            </span>
            {recentAudits.length === 0 ? (
              <span className="text-slate-500 italic">No recent scans yet</span>
            ) : (
              <>
                {recentAudits.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setUrlInput(item.url.replace(/^https?:\/\//, ''));
                      runAudit(item.url);
                    }}
                    className="cursor-pointer px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span>{item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                    <span className="text-[10px] font-bold text-emerald-400 group-hover:scale-105">
                      ({item.score})
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    setRecentAudits([]);
                    localStorage.removeItem('fixmyseo_recent_scans');
                  }}
                  className="text-[10px] text-slate-500 hover:text-rose-400 underline ml-1 cursor-pointer transition-colors"
                  title="Clear scan history"
                >
                  Clear
                </button>
              </>
            )}
          </div>
        )}

        {/* Audit Results Container (Hydrated with Dynamic Tabs) */}
        {auditResult && !isLoading && (
          <div className="pt-4">
            {activeTab === 'professional' ? (
              <ProfessionalAuditTab
                result={auditResult}
                onOpenWhiteLabelModal={() => setIsWhiteLabelOpen(true)}
                onOpenAiFixModal={() => setIsAiFixOpen(true)}
              />
            ) : (
              <HinglishRoasterTab
                result={auditResult}
                roastLevel={roastLevel}
                roastLanguage={roastLanguage}
                onReRoast={handleReRoast}
                onLanguageChange={handleRoastLanguageChange}
                isLoading={isLoading}
              />
            )}
          </div>
        )}

        {/* Commercial Pricing Architecture (Positioned before FAQ & Footer) */}
        <PricingSection
          currentPlan={userPlan}
          onSelectPlan={(plan, cycle) => handleOpenUpgrade(plan, cycle)}
        />

        {/* Semantic Knowledge FAQ Section */}
        <FaqSection />
      </main>

      {/* Semantic Footer */}
      <Footer />

      {/* Modals */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        targetPlan={targetCheckoutPlan}
        billingCycle={checkoutBilling}
        onConfirmUpgrade={handleConfirmUpgrade}
      />

      {auditResult && (
        <WhiteLabelReportModal
          isOpen={isWhiteLabelOpen}
          onClose={() => setIsWhiteLabelOpen(false)}
          result={auditResult}
          userPlan={userPlan}
          onOpenUpgradeModal={() => handleOpenUpgrade('pro')}
        />
      )}

      <AiFixGeneratorModal
        isOpen={isAiFixOpen}
        onClose={() => setIsAiFixOpen(false)}
        defaultUrl={auditResult?.url || urlInput}
      />

      <BatchAuditModal
        isOpen={isBatchOpen}
        onClose={() => setIsBatchOpen(false)}
        userPlan={userPlan}
        onOpenUpgradeModal={() => handleOpenUpgrade('agency')}
        onSelectUrlForAudit={(url) => {
          setUrlInput(url);
          runAudit(url);
        }}
      />
    </div>
  );
}
