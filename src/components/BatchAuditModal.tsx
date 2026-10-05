import React, { useState } from 'react';
import { X, Layers, Loader2, ArrowRight, CheckCircle2, AlertTriangle, Crown, Download } from 'lucide-react';
import { PlanType } from '../types';

interface BatchAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPlan: PlanType;
  onOpenUpgradeModal: () => void;
  onSelectUrlForAudit: (url: string) => void;
}

interface BatchItemResult {
  url: string;
  score: number;
  grade: string;
  fcp: string;
  metaStatus: 'Pass' | 'Warning' | 'Error';
  mobileStatus: 'Pass' | 'Fail';
}

export const BatchAuditModal: React.FC<BatchAuditModalProps> = ({
  isOpen,
  onClose,
  userPlan,
  onOpenUpgradeModal,
  onSelectUrlForAudit,
}) => {
  const [urlsText, setUrlsText] = useState(
    'https://stripe.com\nhttps://shopify.com\nhttps://producthunt.com'
  );
  const [isRunning, setIsRunning] = useState(false);
  const [batchResults, setBatchResults] = useState<BatchItemResult[] | null>(null);

  if (!isOpen) return null;

  const isAgency = userPlan === 'agency';

  const handleStartBatch = () => {
    if (!isAgency) {
      onOpenUpgradeModal();
      return;
    }

    const lines = urlsText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) return;

    setIsRunning(true);
    setBatchResults(null);

    // Simulate batch audit execution
    setTimeout(() => {
      const mockBatch: BatchItemResult[] = lines.slice(0, 5).map((url, idx) => {
        const score = 75 + ((idx * 7) % 22);
        return {
          url,
          score,
          grade: score >= 90 ? 'A+' : score >= 80 ? 'A' : 'B',
          fcp: `${(0.8 + idx * 0.3).toFixed(1)}s`,
          metaStatus: score > 85 ? 'Pass' : 'Warning',
          mobileStatus: 'Pass',
        };
      });

      setBatchResults(mockBatch);
      setIsRunning(false);
    }, 1500);
  };

  const handleExportCsv = () => {
    if (!batchResults) return;
    const csvContent =
      'data:text/csv;charset=utf-8,URL,Score,Grade,FCP,MetaStatus,MobileStatus\n' +
      batchResults
        .map((r) => `${r.url},${r.score},${r.grade},${r.fcp},${r.metaStatus},${r.mobileStatus}`)
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'FixMySEO_Batch_Audit_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="batch-audit-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
    >
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="cursor-pointer absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 id="batch-audit-title" className="text-xl font-bold text-white flex items-center gap-2">
              <span>Agency Multi-URL Batch Auditor</span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Agency Tier
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Crawl and compare multiple client or competitor URLs side-by-side
            </p>
          </div>
        </div>

        {!isAgency && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Bulk batch auditing is unlocked on the <strong>Agency Automation Plan</strong> ($19/mo).</span>
            </div>
            <button
              onClick={onOpenUpgradeModal}
              className="cursor-pointer px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider shrink-0 transition-colors"
            >
              Unlock Agency Tier
            </button>
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">
              Enter Target URLs (One URL per line, up to 5 URLs):
            </label>
            <textarea
              rows={4}
              value={urlsText}
              onChange={(e) => setUrlsText(e.target.value)}
              placeholder="https://example1.com&#10;https://example2.com&#10;https://example3.com"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 font-mono text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={handleStartBatch}
            disabled={isRunning}
            className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 disabled:opacity-60"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Crawling Batch URLs...</span>
              </>
            ) : (
              <>
                <span>Run Batch Multi-Scan</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Results Matrix */}
        {batchResults && (
          <div className="mt-8 space-y-4 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white">Batch Comparative Matrix:</h4>
              <button
                onClick={handleExportCsv}
                className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV Matrix</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                    <th className="p-3">Target URL</th>
                    <th className="p-3">Score</th>
                    <th className="p-3">Grade</th>
                    <th className="p-3">Speed (FCP)</th>
                    <th className="p-3">Meta Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
                  {batchResults.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50">
                      <td className="p-3 text-white font-sans max-w-[200px] truncate">{row.url}</td>
                      <td className="p-3 text-emerald-400 font-bold">{row.score}/100</td>
                      <td className="p-3">{row.grade}</td>
                      <td className="p-3 text-slate-400">{row.fcp}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.metaStatus === 'Pass'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {row.metaStatus}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            onSelectUrlForAudit(row.url);
                            onClose();
                          }}
                          className="cursor-pointer text-xs font-sans text-emerald-400 hover:underline"
                        >
                          View Deep Audit →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
