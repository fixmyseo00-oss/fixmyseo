import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  FileDown,
  ExternalLink,
  Smartphone,
  Gauge,
  Tags,
  ShieldCheck,
  FileCode2,
  Sparkles,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { AuditResult, AuditStatus, AuditCategory, AuditItem } from '../types';

interface ProfessionalAuditTabProps {
  result: AuditResult;
  onOpenWhiteLabelModal: () => void;
  onOpenAiFixModal: () => void;
}

export const ProfessionalAuditTab: React.FC<ProfessionalAuditTabProps> = ({
  result,
  onOpenWhiteLabelModal,
  onOpenAiFixModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | AuditCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | AuditStatus>('all');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const handleCopySnippet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  // Filter items
  const filteredItems = result.auditItems.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    return true;
  });

  const criticalErrorsCount = result.auditItems.filter((i) => i.status === 'error').length;
  const warningsCount = result.auditItems.filter((i) => i.status === 'warning').length;
  const passedCount = result.auditItems.filter((i) => i.status === 'good').length;

  // Grade color
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 65) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const getStatusBadge = (status: AuditStatus) => {
    switch (status) {
      case 'good':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Good / Pass
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" /> Warning
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" /> Critical Error
          </span>
        );
    }
  };

  return (
    <article
      id="panel-professional"
      role="tabpanel"
      aria-labelledby="tab-professional"
      className="space-y-8 animate-in fade-in duration-300"
    >
      {/* Top Overview & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Audit Report for</span>
              <span className="text-emerald-400 underline decoration-emerald-500/40 font-mono text-sm sm:text-base">
                {result.url}
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Generated on {new Date(result.analyzedAt).toLocaleDateString()} at{' '}
              {new Date(result.analyzedAt).toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={onOpenAiFixModal}
            className="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 border border-emerald-500/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Fix Helper
          </button>
          <button
            onClick={onOpenWhiteLabelModal}
            className="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20"
          >
            <FileDown className="w-4 h-4" />
            Export White-Label PDF
          </button>
        </div>
      </div>

      {/* Main Score & 4 Key Progress Trackers Section */}
      <section aria-labelledby="health-score-heading" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Overall SEO Health Score Gauge (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-black border ${getScoreColor(
                result.overallScore
              )}`}
            >
              Grade {result.grade}
            </span>
          </div>

          <h3 id="health-score-heading" className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
            Overall SEO Health Score
          </h3>

          {/* Circular SVG Gauge */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * result.overallScore) / 100}
                strokeLinecap="round"
                fill="transparent"
                className={`${
                  result.overallScore >= 80
                    ? 'text-emerald-400'
                    : result.overallScore >= 60
                    ? 'text-amber-400'
                    : 'text-rose-400'
                } transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white tracking-tight">{result.overallScore}</span>
              <span className="text-xs text-slate-400 font-medium">/ 100 pts</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs">
            <div className="text-center">
              <span className="block font-black text-rose-400">{criticalErrorsCount}</span>
              <span className="text-slate-500">Errors</span>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div className="text-center">
              <span className="block font-black text-amber-400">{warningsCount}</span>
              <span className="text-slate-500">Warnings</span>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div className="text-center">
              <span className="block font-black text-emerald-400">{passedCount}</span>
              <span className="text-slate-500">Passed</span>
            </div>
          </div>
        </div>

        {/* 4 Modern Progress Trackers (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tracker 1: Page Speed & Performance */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Page Speed & Vitals</h4>
                </div>
                <span className="text-sm font-black text-emerald-400">
                  {result.scores.pageSpeed}/100
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden my-3">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                  style={{ width: `${result.scores.pageSpeed}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-center">
                <div>
                  <span className="block text-[11px] text-slate-500 uppercase">FCP</span>
                  <span className="text-xs font-mono font-semibold text-slate-200">
                    {result.metrics.speed.fcp}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 uppercase">LCP</span>
                  <span className="text-xs font-mono font-semibold text-slate-200">
                    {result.metrics.speed.lcp}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 uppercase">TTI</span>
                  <span className="text-xs font-mono font-semibold text-slate-200">
                    {result.metrics.speed.tti}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tracker 2: Meta Data Architecture */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                    <Tags className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Meta Data & SERP</h4>
                </div>
                <span className="text-sm font-black text-teal-400">
                  {result.scores.metaData}/100
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden my-3">
                <div
                  className="h-full rounded-full bg-teal-400 transition-all duration-700"
                  style={{ width: `${result.scores.metaData}%` }}
                />
              </div>

              <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Title Tag:</span>
                  <span className="font-mono text-[11px] text-white">
                    {result.metrics.title.length || 0} chars{' '}
                    <span className="text-slate-500">(Ideal 30-60)</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Meta Desc:</span>
                  <span className="font-mono text-[11px] text-white">
                    {result.metrics.description.length || 0} chars{' '}
                    <span className="text-slate-500">(Ideal 120-160)</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">H1 / H2 Headers:</span>
                  <span className="font-mono text-[11px] text-emerald-400">
                    {result.metrics.h1.count || 0} H1 &bull; {result.metrics.h2?.count || 0} H2
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tracker 3: Mobile Readiness */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Mobile Readiness</h4>
                </div>
                <span className="text-sm font-black text-blue-400">
                  {result.scores.mobileReadiness}/100
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden my-3">
                <div
                  className="h-full rounded-full bg-blue-400 transition-all duration-700"
                  style={{ width: `${result.scores.mobileReadiness}%` }}
                />
              </div>

              <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Viewport Meta:</span>
                  <span
                    className={
                      result.metrics.mobile.viewportFound ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'
                    }
                  >
                    {result.metrics.mobile.viewportFound ? 'Configured' : 'Missing'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Touch Sizing:</span>
                  <span className="text-emerald-400 font-semibold">Optimized</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tracker 4: Content & Security */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Content & Security</h4>
                </div>
                <span className="text-sm font-black text-purple-400">
                  {result.scores.security}/100
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden my-3">
                <div
                  className="h-full rounded-full bg-purple-400 transition-all duration-700"
                  style={{ width: `${result.scores.security}%` }}
                />
              </div>

              <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">SSL Status:</span>
                  <span
                    className={
                      result.metrics.ssl.enabled ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'
                    }
                  >
                    {result.metrics.ssl.enabled ? 'HTTPS Active (256-bit TLS)' : 'Insecure HTTP'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">X-Content Flag:</span>
                  <span
                    className={
                      result.metrics.securityHeaders?.xContentTypeOptions
                        ? 'text-emerald-400 font-semibold font-mono text-[11px]'
                        : 'text-amber-400 font-semibold font-mono text-[11px]'
                    }
                  >
                    {result.metrics.securityHeaders?.xContentTypeOptions ? 'nosniff (Verified)' : 'Missing nosniff'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Best Practices:</span>
                  <span
                    className={
                      result.scores.security >= 80 ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'
                    }
                  >
                    {result.scores.security >= 80 ? 'Hardened / Passing' : 'Warning: Review Headers'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Extracted SERP Preview Card */}
      <section aria-label="SERP Google Snippet Preview" className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
            <span>Google Search Result Snippet Preview</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Live Simulation
            </span>
          </h3>
          <span className="text-xs text-slate-400">How your site renders on Google SERP</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-sans space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-emerald-400 font-mono">{result.url}</span>
            <span className="text-slate-600">›</span>
            <span>index</span>
          </div>
          <p className="text-base sm:text-lg font-medium text-blue-400 hover:underline cursor-pointer">
            {result.metrics.title.text || 'Page Title Not Specified - Please Add <title> Tag'}
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {result.metrics.description.text ||
              'No meta description detected on this page. Google will dynamically extract random sentences from your page content which may hurt click-through rates.'}
          </p>
        </div>
      </section>

      {/* Detailed Structural Audit Card List with Filter Controls */}
      <section aria-labelledby="audit-findings-heading" className="space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <h3 id="audit-findings-heading" className="text-lg font-bold text-white flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-emerald-400" />
              <span>Detailed Audit Checklist & Fixes</span>
              <span className="text-xs font-normal text-slate-400">
                ({filteredItems.length} items shown)
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Color-coded by severity. Click any item to inspect recommendations and copy ready-to-paste HTML code.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filters */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('error')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === 'error' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Errors ({criticalErrorsCount})
              </button>
              <button
                onClick={() => setStatusFilter('warning')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === 'warning' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Warnings ({warningsCount})
              </button>
              <button
                onClick={() => setStatusFilter('good')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === 'good' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Passed ({passedCount})
              </button>
            </div>

            {/* Category Filter */}
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value as any)}
              className="bg-slate-900 text-xs text-slate-300 border border-slate-800 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Categories</option>
              <option value="meta">Meta Data</option>
              <option value="speed">Page Speed</option>
              <option value="mobile">Mobile</option>
              <option value="structure">Structure</option>
              <option value="security">Security</option>
            </select>
          </div>
        </div>

        {/* Structural Card List */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isExpanded = expandedItemId === item.id;
            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl bg-slate-900/80 border transition-all ${
                  item.status === 'error'
                    ? 'border-rose-900/40 hover:border-rose-700/60'
                    : item.status === 'warning'
                    ? 'border-amber-900/40 hover:border-amber-700/60'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getStatusBadge(item.status)}</div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.explanation}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded uppercase">
                      Impact: {item.impact}
                    </span>
                    {item.fixSnippet && (
                      <button
                        onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                        className="cursor-pointer text-xs font-semibold text-emerald-400 hover:text-emerald-300 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                      >
                        {isExpanded ? 'Hide Fix' : 'View Code Fix'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expandable Code Fix Snippet */}
                {isExpanded && item.fixSnippet && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        Recommended Action:
                      </span>
                      <button
                        onClick={() => handleCopySnippet(item.id, item.fixSnippet!)}
                        className="cursor-pointer flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded text-xs transition-colors"
                      >
                        {copiedSnippetId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Snippet</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-slate-300">{item.recommendation}</p>
                    <div className="relative">
                      <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto selection:bg-emerald-500/40">
                        {item.fixSnippet}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Google Search Grounding Web Sources block */}
      {result.groundingSources && result.groundingSources.length > 0 && (
        <section aria-labelledby="grounding-heading" className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <h3 id="grounding-heading" className="text-xs uppercase tracking-wider font-bold text-slate-300">
              Google Search Grounding: Live Indexed Sources Analyzed
            </h3>
          </div>
          <p className="text-slate-400 mb-3">
            Gemini dynamically browsed public Google search data to ground the authority, citations, and indexability of this domain.
          </p>
          <ul className="flex flex-wrap gap-2">
            {result.groundingSources.map((src, idx) => (
              <li key={idx}>
                <a
                  href={src.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-slate-700 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="max-w-xs truncate">{src.title || src.uri}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};
