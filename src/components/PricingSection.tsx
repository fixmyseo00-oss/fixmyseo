import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, Crown, ArrowRight } from 'lucide-react';
import { PlanType } from '../types';

interface PricingSectionProps {
  currentPlan: PlanType;
  onSelectPlan: (plan: PlanType, billing: 'monthly' | 'yearly') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  currentPlan,
  onSelectPlan,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free' as PlanType,
      name: 'Free Audit Plan',
      priceMonthly: 0,
      priceYearly: 0,
      description: 'Ideal for trying out FixMySEO with quick site check passes.',
      features: [
        'Up to 3 quick site check passes per session',
        'Basic SEO health score & grade',
        'Top 8 structural error inspections',
        'Hinglish AI Roaster preview',
        'Google SERP Snippet Preview',
      ],
      cta: currentPlan === 'free' ? 'Current Free Plan' : 'Downgrade to Free',
      popular: false,
    },
    {
      id: 'pro' as PlanType,
      name: 'Starter Pro Plan',
      priceMonthly: 9,
      priceYearly: 89, // ~20% off
      badge: 'MOST POPULAR • BEST VALUE',
      popular: true,
      description: 'Essential toolkit for webmasters, creators & fast-growing startups.',
      features: [
        'Unlimited deep website audits',
        'Google Search Grounding live crawl signals',
        'Automated meta title & description generator',
        'Clean white-label client PDF exports',
        'Core Web Vitals deep diagnostics (FCP, LCP, CLS)',
        'Full Hinglish Savage Roaster & Audio Player',
        '1-click code fixes for critical SEO errors',
      ],
      cta: currentPlan === 'pro' ? 'Current Plan' : 'Upgrade to Pro ($9/mo)',
    },
    {
      id: 'agency' as PlanType,
      name: 'Agency Automation Plan',
      priceMonthly: 19,
      priceYearly: 189, // ~20% off
      badge: 'FOR FREELANCERS & AGENCIES',
      popular: false,
      description: 'Tailored for professional freelancers and digital marketing agencies.',
      features: [
        'Everything in Starter Pro included',
        'Bulk Batch Audits (audit up to 50 URLs in 1 click)',
        'Full AI page content & heading generator',
        'Custom agency branding on client PDF reports',
        'JSON-LD Schema builder for rich snippets',
        'Priority indexing crawl recommendations',
        'API webhook integration for automated crawls',
      ],
      cta: currentPlan === 'agency' ? 'Current Plan' : 'Unlock Agency Plan ($19/mo)',
    },
  ];

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Crown className="w-3.5 h-3.5" />
          <span>Commercial Pricing Architecture</span>
        </div>
        <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Transparent, High-ROI Plans for Every Website
        </h2>
        <p className="mt-3 text-slate-300 text-base">
          Start with our free session passes, then unlock deep scans, white-label client reports, and batch agency audits.
        </p>

        {/* Monthly vs Yearly Toggle */}
        <div className="mt-6 inline-flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`cursor-pointer px-4 py-2 rounded-xl transition-all ${
              billingCycle === 'monthly'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`cursor-pointer px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Yearly Billing</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const isPro = plan.id === 'pro';
          const isCurrent = currentPlan === plan.id;
          const displayPrice = billingCycle === 'monthly' ? plan.priceMonthly : Math.round(plan.priceYearly / 12);

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300 ${
                isPro
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/15 glow-emerald md:-translate-y-2'
                  : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-xl'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 uppercase shadow-md shadow-emerald-500/30">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  {plan.id === 'agency' && (
                    <Crown className="w-5 h-5 text-amber-400" />
                  )}
                  {plan.id === 'pro' && (
                    <Zap className="w-5 h-5 text-emerald-400" />
                  )}
                  {plan.id === 'free' && (
                    <Shield className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <p className="text-xs text-slate-400 mb-6 min-h-[32px]">{plan.description}</p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-800">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    ${displayPrice}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {plan.priceMonthly === 0 ? 'Forever' : '/ month'}
                  </span>
                  {billingCycle === 'yearly' && plan.priceMonthly > 0 && (
                    <span className="text-[11px] text-emerald-400 ml-2">
                      (Billed ${plan.priceYearly}/yr)
                    </span>
                  )}
                </div>

                {/* Feature List */}
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to action button */}
              <button
                type="button"
                onClick={() => onSelectPlan(plan.id, billingCycle)}
                disabled={isCurrent}
                className={`cursor-pointer w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                  isCurrent
                    ? 'bg-slate-800 text-slate-400 cursor-default border border-slate-700'
                    : isPro
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <span>{plan.cta}</span>
                {!isCurrent && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Structural Payment Methods Footnote */}
      <div className="mt-12 text-center text-xs text-slate-500 flex flex-wrap items-center justify-center gap-4">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-400" /> 256-bit Encrypted Checkout
        </span>
        <span>•</span>
        <span>Instant Access Unlocked</span>
        <span>•</span>
        <span>Cancel Anytime with 1-Click</span>
        <span>•</span>
        <span>Includes White-Label Commercial Rights</span>
      </div>
    </section>
  );
};
