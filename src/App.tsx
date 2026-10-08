import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProfessionalAuditTab } from './components/ProfessionalAuditTab';
import { HinglishRoasterTab } from './components/HinglishRoasterTab';
import { AeoGeoSection } from './components/AeoGeoSection';
import { AdSenseContainer } from './components/AdSenseContainer';
import { BlogSection } from './components/BlogSection';
import { LegalModal, LegalTab } from './components/LegalModal';
import { PricingSection } from './components/PricingSection';
import { CheckoutModal } from './components/CheckoutModal';
import { WhiteLabelReportModal } from './components/WhiteLabelReportModal';
import { AiFixGeneratorModal } from './components/AiFixGeneratorModal';
import { BatchAuditModal } from './components/BatchAuditModal';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AuditResult, PlanType } from './types';
import { runClientSideAudit } from './services/clientAuditor';
import {
  Loader2,
  Sparkles,
  AlertCircle,
  History,
  Check,
  ArrowLeft,
  FileDown,
  ExternalLink,
  ShieldCheck,
  Flame,
  LayoutDashboard,
  Zap,
} from 'lucide-react';

export type AppRoute = 'home' | 'report' | 'blog';

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
  aeo: {
    directAnswerReadiness: 76,
    schemaCompleteness: 82,
    faqSchemaDetected: true,
    citationPotential: 79,
  },
  geo: {
    brandEntityClarity: 84,
    informationGainScore: 71,
    llmContextRelevance: 78,
    aiOverviewsEligibility: true,
  },
  crawlerBlockers: {
    gptBotAllowed: true,
    claudeBotAllowed: true,
    googleExtendedAllowed: true,
    perplexityBotAllowed: true,
    ccBotAllowed: true,
    status: 'accessible',
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
    h2: {
      text: 'H2 Subheadings: 5 detected',
      count: 5,
      status: 'good',
      message: '5 H2 subheadings detected.',
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
    securityHeaders: {
      xContentTypeOptions: true,
      status: 'good',
      message: 'X-Content-Type-Options: nosniff header verified.',
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
      id: 'heading-multiple-h1',
      category: 'structure',
      status: 'warning',
      title: 'Multiple <h1> Heading Tags Detected',
      explanation: 'Detected 2 <h1> tags. Multiple H1 tags confuse search crawlers about the main page focus.',
      recommendation: 'Ensure your page has exactly ONE primary <h1> tag for topical authority.',
      fixSnippet: '<h1>Handcrafted Leather Goods & Footwear</h1>\n<h2>Seasonal Collection</h2>',
      impact: 'High',
    },
    {
      id: 'speed-lcp-slow',
      category: 'speed',
      status: 'warning',
      title: 'Largest Contentful Paint (LCP) is 3.4s',
      explanation: 'Google considers LCP over 2.5s poor. Users abandon sites that take more than 3s to render.',
      recommendation: 'Convert large hero images to modern WebP format and enable priority preloading.',
      fixSnippet: '<link rel="preload" as="image" href="/hero.webp" type="image/webp" fetchpriority="high" />',
      impact: 'High',
    },
    {
      id: 'images-alt-missing',
      category: 'structure',
      status: 'warning',
      title: '6 Images Missing Descriptive Alt Attributes',
      explanation: 'Image search drives up to 20% of organic traffic. Alt text is also critical for accessibility compliance.',
      recommendation: 'Add keyword-rich descriptive alt attributes to every product photograph.',
      fixSnippet: '<img src="/shoes.webp" alt="Handcrafted Italian brown leather oxford shoes" width="600" height="400" />',
      impact: 'Medium',
    },
    {
      id: 'security-ssl-ok',
      category: 'security',
      status: 'good',
      title: 'HTTPS SSL Certificate Active & Valid',
      explanation: 'Your site uses modern HTTPS encryption, protecting user sessions and fulfilling Google security requirements.',
      recommendation: 'Maintain automatic certificate renewal and ensure HSTS preload header is enabled.',
      fixSnippet: 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
      impact: 'High',
    },
  ],
  hinglishRoast: {
    siteNickname: 'The 2G Bullock Cart of E-Commerce',
    savageRoast:
      'Arrey bhai bhai bhai! Shopify store banaya hai ya 1999 ka government portal? Title tag itna lamba hai jaise railway ticket ki waiting list, aur meta description itna gayab jaise salary aane ke do din baad ka bank balance!\n\nHero section load hote hote user ka 5G data pack 2G ban jayega aur customer Amazon chala jayega! H1 tag dhoondhte dhoondhte CBI ki special team thak gayi! Agar aisi speed rahi toh agla order 2035 mein aayega bhai!',
    punchlines: [
      'Bhai, website load hone mein itna time lag raha hai ki user chai peeke so bhi gaya!',
      'Title tag itna lamba hai ki Googlebot ko split-screen mode lagana pad raha hai!',
      'Meta description aise gayab hai jaise exam ke din topper ke notes!',
      'Images ke paas alt tags nahi hain, Google soch raha hai yeh samosa hai ya jalebi!',
    ],
    desiPrescription: [
      'Subah shaam 2 alt tags lagao aur hero image ko WebP mein compress karo.',
      'Title tag ko gym bhej kar 55 characters ka fit banao.',
      'Ek solid H1 tag lagao taaki Google ko pata chale dukaan kis cheez ki hai!',
      'Meta description mein mast masala daalo taaki click karne ka dil kare!',
    ],
    roastScore: '3.4/10 - Sakht Dawaai Ki Zaroorat Hai!',
    shareableQuote:
      'Maine apna Shopify store FixMySEO pe check karwaya, aur AI ne aisi bezti ki ki ab main website delete karke kheti karne ja raha hoon! 😂',
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

  // Multi-page routing simulation ('home' | 'report' | 'blog')
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const search = window.location.search;
      if (path.includes('/blog')) return 'blog';
      if (path.includes('/report') || search.includes('url=')) return 'report';
    }
    return 'home';
  });

  const [activeTab, setActiveTab] = useState<'professional' | 'hinglish'>('professional');
  const [auditResult, setAuditResult] = useState<AuditResult | null>(INITIAL_DEMO_RESULT);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingStep, setLoadingStep] = useState('');

  // Legal Modal State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>('privacy');

  // Session & monetization tracking
  const [freeAuditsRemaining, setFreeAuditsRemaining] = useState<number>(() => {
    const saved = localStorage.getItem('fixmyseo_free_audits');
    return saved !== null ? parseInt(saved, 10) : 3;
  });

  const [userPlan, setUserPlan] = useState<PlanType>(() => {
    return (localStorage.getItem('fixmyseo_plan') as PlanType) || 'free';
  });

  // Dynamic Recent Scans from localStorage
  const [recentAudits, setRecentAudits] = useState<{ url: string; score: number }[]>(() => {
    try {
      const saved = localStorage.getItem('fixmyseo_recent_scans');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
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

  // Sync browser popstate for back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const search = window.location.search;
      if (path.includes('/blog')) {
        setCurrentRoute('blog');
      } else if (path.includes('/report') || search.includes('url=')) {
        setCurrentRoute('report');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: AppRoute, queryParam?: string) => {
    setCurrentRoute(route);
    let targetUrl = '/';
    if (route === 'blog') targetUrl = '/blog';
    if (route === 'report') targetUrl = `/report${queryParam ? `?url=${encodeURIComponent(queryParam)}` : ''}`;

    try {
      window.history.pushState({ route }, '', targetUrl);
    } catch {
      // safe fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const handleOpenLegal = (tab: LegalTab) => {
    setActiveLegalTab(tab);
    setLegalModalOpen(true);
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

    // Switch to report view immediately and push state
    navigateTo('report', targetUrl);
    setIsLoading(true);
    setErrorMessage('');
    setLoadingStep('Connecting to Webpulls live DOM telemetry & Google Search Grounding...');

    const stepTimer1 = setTimeout(() => {
      setLoadingStep('Extracting Title length, Meta tags verification, and H1/H2 instances...');
    }, 1200);

    const stepTimer2 = setTimeout(() => {
      setLoadingStep(
        targetLanguage === 'english'
          ? 'Formulating Core Web Vitals, AEO/GEO signals & Silicon Valley roast...'
          : 'Formulating Core Web Vitals, AEO/GEO signals & brewing spicy Hinglish roast...'
      );
    }, 2800);

    try {
      // 1. Direct browser-based execution with Webpulls and Gemini grounding
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
          // ignore
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
        currentRoute={currentRoute}
        onOpenUpgradeModal={() => handleOpenUpgrade('pro')}
        onOpenBatchModal={() => setIsBatchOpen(true)}
        onOpenAiFixModal={() => setIsAiFixOpen(true)}
        onNavigateToHome={() => navigateTo('home')}
        onNavigateToBlog={() => navigateTo('blog')}
        onOpenLegalModal={handleOpenLegal}
      />

      {/* Main Semantic Landmark Container */}
      <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        {/* ======================================================== */}
        {/* ROUTE 1: HOME PAGE (Hero, Input, Blog, Pricing, FAQ) */}
        {/* ======================================================== */}
        {currentRoute === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* HERO & INPUT SECTION: Minimalist bar with Scan button */}
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

            {/* Dynamic Recent Audits Container */}
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

            {/* KNOWLEDGE HUB / BLOG SECTION */}
            <BlogSection />

            {/* Commercial Pricing Section */}
            <PricingSection
              currentPlan={userPlan}
              onSelectPlan={(plan, cycle) => handleOpenUpgrade(plan, cycle)}
            />

            {/* FAQ Section */}
            <FaqSection />
          </div>
        )}

        {/* ======================================================== */}
        {/* ROUTE 2: DYNAMIC REPORT DASHBOARD (`/report?url=...`) */}
        {/* ======================================================== */}
        {currentRoute === 'report' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Navigation & Action Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigateTo('home')}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                  aria-label="Back to New Scan"
                >
                  <ArrowLeft className="w-4 h-4 text-emerald-400" />
                  <span>Scan Another Site</span>
                </button>

                <div className="h-5 w-px bg-slate-800 hidden sm:block" />

                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Report for:</span>
                    <span className="text-emerald-400 font-mono text-sm sm:text-base">
                      {auditResult?.url || urlInput}
                    </span>
                  </h2>
                </div>
              </div>

              {/* View Switcher Tabs (Classic SEO vs Savage Roaster) */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('professional')}
                  className={`cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'professional'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Classic SEO & Diagnostics</span>
                </button>

                <button
                  onClick={() => setActiveTab('hinglish')}
                  className={`cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'hinglish'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>AI Roaster ({roastLanguage === 'english' ? 'English' : 'Hinglish'})</span>
                </button>
              </div>
            </div>

            {/* AD SLOT 1: GOOGLE ADSENSE LEADERBOARD CONTAINER (Top of Report) */}
            <AdSenseContainer slot="leaderboard" />

            {/* Loading Indicator inside Report Dashboard */}
            {isLoading && (
              <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/40 text-center space-y-4 shadow-2xl">
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
                  <Sparkles className="w-5 h-5 text-emerald-300 absolute" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Extracting Deep Diagnostic Telemetry</h3>
                  <p className="text-xs text-emerald-400 font-medium mt-1 animate-pulse">
                    {loadingStep || 'Crunching data through Webpulls and Gemini Search Grounding...'}
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <div className="flex-1">
                  <strong className="block font-bold">Audit Error</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Two-Column Grid: Left Column Report & Right Sidebar Ad Container */}
            {auditResult && !isLoading && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Main Content (8 cols on lg) */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Primary Tab Content */}
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

                  {/* AEO, GEO, and AI Crawler Blocker Check (robots.txt analysis) */}
                  <AeoGeoSection
                    aeo={auditResult.aeo}
                    geo={auditResult.geo}
                    crawlerBlockers={auditResult.crawlerBlockers}
                    domain={auditResult.url.replace(/^https?:\/\//, '').split('/')[0]}
                  />
                </div>

                {/* Right Sidebar (4 cols on lg): AdSlot 2 & Quick Action Cards */}
                <div className="lg:col-span-4 space-y-6">
                  {/* AD SLOT 2: GOOGLE ADSENSE RECTANGLE CONTAINER (Sidebar) */}
                  <AdSenseContainer slot="rectangle" />

                  {/* Quick Action Helper Card */}
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Audit Actions & Exports
                    </h3>

                    <button
                      onClick={() => setIsWhiteLabelOpen(true)}
                      className="cursor-pointer w-full flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 transition-colors text-xs font-semibold group"
                    >
                      <span className="flex items-center gap-2">
                        <FileDown className="w-4 h-4 text-emerald-400" />
                        <span>Export White-Label PDF</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                        PRO
                      </span>
                    </button>

                    <button
                      onClick={() => setIsAiFixOpen(true)}
                      className="cursor-pointer w-full flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 transition-colors text-xs font-semibold group"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-teal-400" />
                        <span>AI Fix Tag Generator</span>
                      </span>
                      <span className="text-[10px] text-teal-400 font-bold uppercase bg-teal-500/10 px-2 py-0.5 rounded">
                        Instant
                      </span>
                    </button>

                    <button
                      onClick={() => setIsBatchOpen(true)}
                      className="cursor-pointer w-full flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 transition-colors text-xs font-semibold group"
                    >
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>Agency Batch Scan</span>
                      </span>
                      <span className="text-[10px] text-amber-400 font-bold uppercase bg-amber-500/10 px-2 py-0.5 rounded">
                        AGENCY
                      </span>
                    </button>
                  </div>

                  {/* Summary Metric Score Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">Diagnostic Health</span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Grade {auditResult.grade}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white">{auditResult.overallScore}</span>
                      <span className="text-xs text-slate-500">/ 100 Overall Score</span>
                    </div>

                    <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-400">AEO Direct Answers:</span>
                        <span className="font-mono text-emerald-400">{auditResult.aeo?.directAnswerReadiness}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">GEO Entity Clarity:</span>
                        <span className="font-mono text-teal-400">{auditResult.geo?.brandEntityClarity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Robots.txt Crawlers:</span>
                        <span className="font-mono text-emerald-400">100% Allowed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AD SLOT 3: GOOGLE ADSENSE ANCHOR CONTAINER (Bottom of Report) */}
            <AdSenseContainer slot="anchor" />
          </div>
        )}

        {/* ======================================================== */}
        {/* ROUTE 3: DEDICATED BLOG VIEW (`/blog`) */}
        {/* ======================================================== */}
        {currentRoute === 'blog' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('home')}
                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-400" />
                <span>Back to Home & Audit Tool</span>
              </button>
            </div>

            <BlogSection />

            {/* AdSense Placement in Blog Feed */}
            <AdSenseContainer slot="leaderboard" />
          </div>
        )}
      </main>

      {/* Semantic Sticky Footer with Legal & Compliance Links */}
      <Footer
        onOpenLegalModal={handleOpenLegal}
        onNavigateToBlog={() => navigateTo('blog')}
        onNavigateToHome={() => navigateTo('home')}
      />

      {/* Mandatory Legal & Compliance Modal (Privacy, Terms, Contact) */}
      <LegalModal
        isOpen={legalModalOpen}
        initialTab={activeLegalTab}
        onClose={() => setLegalModalOpen(false)}
      />

      {/* Commercial Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        targetPlan={targetCheckoutPlan}
        billingCycle={checkoutBilling}
        onConfirmUpgrade={handleConfirmUpgrade}
      />

      {/* White-Label Report Export Modal */}
      {auditResult && (
        <WhiteLabelReportModal
          isOpen={isWhiteLabelOpen}
          onClose={() => setIsWhiteLabelOpen(false)}
          result={auditResult}
          userPlan={userPlan}
          onOpenUpgradeModal={() => handleOpenUpgrade('pro')}
        />
      )}

      {/* AI Fix Generator Modal */}
      <AiFixGeneratorModal
        isOpen={isAiFixOpen}
        onClose={() => setIsAiFixOpen(false)}
        defaultUrl={auditResult?.url || urlInput}
      />

      {/* Batch Audit Modal */}
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
