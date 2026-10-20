import React, { useState } from 'react';
import {
  X,
  Printer,
  Sparkles,
  Building2,
  User,
  Image,
  Lock,
  Code2,
} from 'lucide-react';
import { AuditResult, PlanType } from '../types';

interface WhiteLabelReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AuditResult;
  userPlan: PlanType;
  onOpenUpgradeModal: () => void;
  onLockedAgencyFeature?: () => void;
}

export const WhiteLabelReportModal: React.FC<WhiteLabelReportModalProps> = ({
  isOpen,
  onClose,
  result,
  userPlan,
  onOpenUpgradeModal,
  onLockedAgencyFeature,
}) => {
  const [agencyName, setAgencyName] = useState('Apex SEO & Growth Consulting');
  const [clientName, setClientName] = useState('Acme Inc.');
  const [customLogoUrl, setCustomLogoUrl] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('https://api.growthagency.com/v1/seo-sync');
  const [customNotes, setCustomNotes] = useState(
    'This audit was generated using automated search grounding, real-time crawler inspection, and Core Web Vitals diagnostics. Contact our team to implement these on-page fixes.'
  );

  if (!isOpen) return null;

  const isAgency = userPlan === 'agency';

  const handlePrint = () => {
    window.print();
  };

  const handleAgencyLockedClick = () => {
    if (onLockedAgencyFeature) {
      onLockedAgencyFeature();
    } else {
      onOpenUpgradeModal();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whitelabel-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in"
    >
      <div className="relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              PDF
            </div>
            <div>
              <h3 id="whitelabel-modal-title" className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>White-Label Client Audit Report Generator</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {isAgency ? 'Agency Automated' : 'Starter Pro Tier'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Ready to print or save as multi-page PDF with structured grades, AEO/GEO insights, and checklist cards.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="cursor-pointer p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Customization Inputs (Agency Branding) */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 no-print text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              Agency / Consultant Name
            </label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              Client / Target Business
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Custom Branding / Agency Logo Prepending (Agency Automation $19 exclusive) */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-emerald-400" />
                Agency Logo URL (Prepend to PDF)
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                isAgency
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {isAgency ? 'Agency Unlocked' : 'Agency Only ($19)'}
              </span>
            </label>
            {isAgency ? (
              <input
                type="text"
                value={customLogoUrl}
                onChange={(e) => setCustomLogoUrl(e.target.value)}
                placeholder="https://agency.com/logo.png"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500 font-mono text-[11px]"
              />
            ) : (
              <button
                type="button"
                onClick={handleAgencyLockedClick}
                className="cursor-pointer w-full text-left bg-slate-900/60 border border-dashed border-amber-500/30 rounded-lg px-3 py-1.5 text-slate-400 hover:text-amber-300 hover:border-amber-400 transition-colors flex items-center justify-between"
              >
                <span className="truncate">Prepend agency logo to PDF...</span>
                <span className="text-[10px] font-bold text-amber-400 shrink-0 ml-1">Unlock</span>
              </button>
            )}
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-950 text-slate-100 font-sans space-y-8 print:p-0 print:bg-white print:text-black">
          {/* Document Header with Dynamically Prepended Agency Logo */}
          <div className="pb-6 border-b border-slate-800 print:border-slate-300">
            {/* Dynamically prepended Agency Logo when Agency Plan is active */}
            {isAgency && customLogoUrl.trim() && (
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={customLogoUrl.trim()}
                  alt="Agency Custom Brand Logo"
                  className="h-12 w-auto max-w-[180px] object-contain rounded bg-slate-900/40 p-1 print:bg-transparent"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="text-[11px] text-slate-400 print:text-slate-600 font-medium">
                  Verified Audit Partner &bull; Agency Automated Delivery
                </div>
              </div>
            )}

            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 print:text-emerald-700 font-bold block mb-1">
                  Confidential Website SEO &amp; AEO Audit Report
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white print:text-black">
                  {agencyName}
                </h1>
                <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
                  Prepared for: <strong>{clientName}</strong> &bull; Target Domain: <strong>{result.url}</strong>
                </p>
                <p className="text-[11px] text-slate-500 print:text-slate-500 mt-0.5">
                  Audit Timestamp: {new Date(result.analyzedAt).toLocaleDateString()} at {new Date(result.analyzedAt).toLocaleTimeString()}
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="inline-block p-3 sm:p-4 rounded-2xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-center shadow-lg">
                  <span className="block text-[10px] uppercase font-bold text-slate-400 print:text-slate-600">
                    Overall Grade
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400 print:text-emerald-700">
                    {result.grade}
                  </span>
                  <span className="block text-[11px] font-mono text-slate-300 print:text-slate-800 font-bold">
                    {result.overallScore}/100 Score
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Categories Score Breakdown */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 print:text-slate-700 mb-3">
              Core Technical Performance Matrix:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                <span className="text-[11px] text-slate-400 print:text-slate-600 uppercase font-semibold block">Page Speed</span>
                <span className="text-xl font-bold text-white print:text-black">
                  {result.scores.pageSpeed}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                <span className="text-[11px] text-slate-400 print:text-slate-600 uppercase font-semibold block">Meta Data</span>
                <span className="text-xl font-bold text-white print:text-black">
                  {result.scores.metaData}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                <span className="text-[11px] text-slate-400 print:text-slate-600 uppercase font-semibold block">Mobile Ready</span>
                <span className="text-xl font-bold text-white print:text-black">
                  {result.scores.mobileReadiness}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                <span className="text-[11px] text-slate-400 print:text-slate-600 uppercase font-semibold block">Content Struct</span>
                <span className="text-xl font-bold text-white print:text-black">
                  {result.scores.contentStructure}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                <span className="text-[11px] text-slate-400 print:text-slate-600 uppercase font-semibold block">Security</span>
                <span className="text-xl font-bold text-white print:text-black">
                  {result.scores.security}%
                </span>
              </div>
            </div>
          </div>

          {/* AEO & GEO Intelligence Breakdown (Pro & Agency) */}
          <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 print:border-slate-200 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Search Architecture (AEO &amp; GEO Insights)</span>
              </h3>
              <span className="text-[10px] text-slate-400 print:text-slate-600 font-mono">
                AI Overviews &bull; Perplexity &bull; LLM Discovery
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-slate-950/60 print:bg-white border border-slate-800 print:border-slate-200">
                <span className="text-[10px] text-slate-400 print:text-slate-600 block">AEO Direct Answers</span>
                <span className="text-base font-bold text-teal-400 print:text-teal-700">
                  {result.aeo?.directAnswerReadiness || 78}%
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 print:bg-white border border-slate-800 print:border-slate-200">
                <span className="text-[10px] text-slate-400 print:text-slate-600 block">Schema Graph Depth</span>
                <span className="text-base font-bold text-emerald-400 print:text-emerald-700">
                  {result.aeo?.schemaCompleteness || 85}%
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 print:bg-white border border-slate-800 print:border-slate-200">
                <span className="text-[10px] text-slate-400 print:text-slate-600 block">Perplexity Potential</span>
                <span className="text-base font-bold text-teal-300 print:text-teal-800">
                  {result.aeo?.citationPotential || 82}%
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 print:bg-white border border-slate-800 print:border-slate-200">
                <span className="text-[10px] text-slate-400 print:text-slate-600 block">GEO Entity Clarity</span>
                <span className="text-base font-bold text-emerald-300 print:text-emerald-800">
                  {result.geo?.brandEntityClarity || 88}%
                </span>
              </div>
            </div>
          </div>

          {/* Audit Items Summary */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white print:text-black uppercase tracking-wider">
              Diagnostic Findings &amp; Implementation Code Checklist:
            </h3>
            <div className="space-y-2.5">
              {result.auditItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 text-xs"
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-slate-100 print:text-black">{item.title}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${
                        item.status === 'error'
                          ? 'text-rose-400 bg-rose-500/10'
                          : item.status === 'warning'
                          ? 'text-amber-400 bg-amber-500/10'
                          : 'text-emerald-400 bg-emerald-500/10'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-slate-400 print:text-slate-700">{item.explanation}</p>
                  {item.recommendation && (
                    <p className="text-emerald-400 print:text-emerald-700 mt-1 font-medium">
                      Action Required: {item.recommendation}
                    </p>
                  )}
                  {item.fixSnippet && (
                    <pre className="mt-2 p-2 rounded bg-slate-950 print:bg-slate-200 text-emerald-300 print:text-slate-900 font-mono text-[10px] overflow-x-auto">
                      {item.fixSnippet}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Agency Automation Tier Feature: JSON-LD Schema & API Integration Panel */}
          {isAgency ? (
            <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 print:border-slate-200 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-amber-700 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Agency Automation &bull; JSON-LD Schema Graph &amp; API Webhook</span>
                </h3>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Agency Tier Unlocked ($19)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 print:text-slate-600 font-semibold block mb-1">
                    Automated Webhook Sync Destination:
                  </label>
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full bg-slate-950 print:bg-white border border-slate-700 print:border-slate-300 rounded px-2.5 py-1 text-slate-300 print:text-black font-mono text-[11px]"
                  />
                  <span className="text-[10px] text-slate-500 print:text-slate-500 block mt-1">
                    Real-time JSON payload dispatched upon audit completion
                  </span>
                </div>
                <div>
                  <label className="text-slate-400 print:text-slate-600 font-semibold block mb-1">
                    JSON-LD Schema Graph Deployment:
                  </label>
                  <div className="p-2 rounded bg-slate-950 print:bg-white border border-slate-700 print:border-slate-300 text-[10px] font-mono text-emerald-400 print:text-emerald-800">
                    {`{"@context": "https://schema.org", "@type": "WebSite", "url": "${result.url}", "name": "${agencyName}"}`}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={handleAgencyLockedClick}
              className="p-4 rounded-xl bg-slate-900/60 print:hidden border border-dashed border-amber-500/30 cursor-pointer hover:border-amber-400 hover:bg-slate-900 transition-all group space-y-2.5"
              title="Click to unlock Agency Webhook & Schema tools"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Agency Automation &bull; JSON-LD Schema Graph &amp; API Webhook</span>
                </h3>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1 group-hover:bg-amber-500/20">
                  <Lock className="w-3 h-3" />
                  Agency Plan Only ($19)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs opacity-70 pointer-events-none">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Automated Webhook Sync Destination:</label>
                  <div className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-slate-500 font-mono text-[11px] flex items-center justify-between">
                    <span>https://api.youragency.com/webhook</span>
                    <Lock className="w-3 h-3 text-amber-400" />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">JSON-LD Schema Graph:</label>
                  <div className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-slate-500 font-mono text-[11px] flex items-center justify-between">
                    <span>{`{"@context": "https://schema.org", ...}`}</span>
                    <Lock className="w-3 h-3 text-amber-400" />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-amber-300 font-medium">
                ⚡ Click to unlock real-time webhook endpoints &amp; schema graph generation.
              </p>
            </div>
          )}

          {/* Agency Notes */}
          <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-xs">
            <h3 className="font-bold text-slate-300 print:text-black mb-1">Consultant Advisory Notes</h3>
            <p className="text-slate-400 print:text-slate-700 leading-relaxed">{customNotes}</p>
          </div>

          {/* Footer of the report */}
          <div className="pt-4 border-t border-slate-800 print:border-slate-300 flex items-center justify-between text-[11px] text-slate-500">
            <span>Report prepared by <strong>{agencyName}</strong></span>
            <span>Powered by FixMySEO Multi-Page Audit Engine &bull; {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
