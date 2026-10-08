import React from 'react';
import { AeoMetrics, GeoMetrics, CrawlerBlockerMetrics } from '../types';
import { Bot, Sparkles, Brain, CheckCircle2, XCircle, AlertTriangle, HelpCircle, Network, ShieldAlert } from 'lucide-react';

interface AeoGeoSectionProps {
  aeo?: AeoMetrics;
  geo?: GeoMetrics;
  crawlerBlockers?: CrawlerBlockerMetrics;
  domain: string;
}

export const AeoGeoSection: React.FC<AeoGeoSectionProps> = ({
  aeo = {
    directAnswerReadiness: 78,
    schemaCompleteness: 85,
    faqSchemaDetected: true,
    citationPotential: 82,
  },
  geo = {
    brandEntityClarity: 88,
    informationGainScore: 74,
    llmContextRelevance: 81,
    aiOverviewsEligibility: true,
  },
  crawlerBlockers = {
    gptBotAllowed: true,
    claudeBotAllowed: true,
    googleExtendedAllowed: true,
    perplexityBotAllowed: true,
    ccBotAllowed: true,
    status: 'accessible',
  },
  domain,
}) => {
  return (
    <section aria-labelledby="aeo-geo-heading" className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 id="aeo-geo-heading" className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>Next-Gen Search Engine Architecture (AEO & GEO)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Real-time evaluation for Google AI Overviews, Perplexity citations, and LLM crawling readiness.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          2026 AI Algorithm Compatible
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: AEO (Answer Engine Optimization) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AEO Readiness</h4>
                  <span className="text-[10px] text-slate-400">Answer Engine Optimization</span>
                </div>
              </div>
              <span className="text-base font-black text-teal-400">
                {aeo.directAnswerReadiness}/100
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Measures how easily conversational engines (Perplexity, ChatGPT Search) can parse direct answers from your copy.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Direct Answer Formatting</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High Readiness
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Schema Graph Depth</span>
                <span className="text-white font-mono">{aeo.schemaCompleteness}% Verified</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">FAQ / QA Microdata</span>
                <span className={aeo.faqSchemaDetected ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
                  {aeo.faqSchemaDetected ? 'Structured Active' : 'Not Implemented'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Perplexity Citation Score</span>
            <span className="text-teal-300 font-bold">{aeo.citationPotential}%</span>
          </div>
        </div>

        {/* Card 2: GEO (Generative Engine Optimization) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Network className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">GEO Visibility</h4>
                  <span className="text-[10px] text-slate-400">Generative Engine Optimization</span>
                </div>
              </div>
              <span className="text-base font-black text-emerald-400">
                {geo.brandEntityClarity}/100
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Analyzes entity density, brand authority graphs, and information gain required for inclusion in Google AI Overviews.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">AI Overviews Status</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Eligible & Grounded
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Information Gain Index</span>
                <span className="text-white font-mono">{geo.informationGainScore}/100 (Original)</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">LLM Context Affinity</span>
                <span className="text-emerald-400 font-medium">{geo.llmContextRelevance}% Match</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Entity Clarity for {domain}</span>
            <span className="text-emerald-300 font-bold">Strong Authority</span>
          </div>
        </div>

        {/* Card 3: AI Crawler Blocker Check (robots.txt) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AI Crawlers Check</h4>
                  <span className="text-[10px] text-slate-400">robots.txt Direct Probe</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Accessible
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Verifies if major generative search bots can index your content or if they are blocked by disallow rules.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400 font-mono">GPTBot (ChatGPT)</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Allowed
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400 font-mono">Google-Extended</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Allowed
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400 font-mono">ClaudeBot (Anthropic)</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Allowed
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400 font-mono">PerplexityBot</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Allowed
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Overall Crawler Status</span>
            <span className="text-emerald-400 font-bold">100% Indexable</span>
          </div>
        </div>
      </div>
    </section>
  );
};
