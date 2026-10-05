import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: 'How does Google Search Grounding improve website audits?',
      a: 'Unlike static analyzers that only read raw HTML tags, FixMySEO leverages Gemini 3.8 with Google Search Grounding to evaluate real-time search engine visibility, indexation status, brand search presence, knowledge graph authority, and competitor SERP ranking factors.',
    },
    {
      q: 'Why does FixMySEO include a Hinglish AI Roaster tab?',
      a: 'Traditional SEO reports are often dry, boring, and filled with technical jargon that stakeholders ignore. The Hinglish Roaster tab translates serious Core Web Vitals and meta tag errors into hilarious, culturally relatable desi punchlines that make client meetings viral and unforgettable while keeping the technical diagnosis 100% accurate.',
    },
    {
      q: 'What are the optimal character counts for Title and Meta Description tags?',
      a: 'Google typically renders page titles between 30 and 60 characters (approximately 580px width) before truncating with an ellipsis. Meta descriptions should strictly be between 120 and 160 characters (optimal around 145-155 characters) to ensure the snippet displays completely and maximizes click-through rates (CTR).',
    },
    {
      q: 'Can I export white-label reports for my SEO clients?',
      a: 'Yes! Both Starter Pro ($9/mo) and Agency Automation ($19/mo) plans include white-label PDF report generation. You can brand reports with your own agency name, logo text, client company name, and custom consulting notes without FixMySEO branding.',
    },
    {
      q: 'How many free audits do I get per session?',
      a: 'The Free Audit Plan includes up to 3 quick site check passes per browser session. Upgrading to Starter Pro removes all limits and unlocks priority multi-server crawls.',
    },
  ];

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Knowledge & SEO FAQ</span>
        </div>
        <h2 id="faq-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-slate-400 text-sm">
          Everything you need to know about our AI-powered website auditor and viral roaster.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group rounded-2xl bg-slate-900/80 border border-slate-800 p-5 transition-all open:border-emerald-500/40"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between font-bold text-sm sm:text-base text-white focus:outline-none focus:text-emerald-400">
              <span>{faq.q}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-emerald-400 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};
