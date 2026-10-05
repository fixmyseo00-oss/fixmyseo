import React, { useState } from 'react';
import { X, Printer, Download, Check, Sparkles, Building2, User } from 'lucide-react';
import { AuditResult, PlanType } from '../types';

interface WhiteLabelReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AuditResult;
  userPlan: PlanType;
  onOpenUpgradeModal: () => void;
}

export const WhiteLabelReportModal: React.FC<WhiteLabelReportModalProps> = ({
  isOpen,
  onClose,
  result,
  userPlan,
  onOpenUpgradeModal,
}) => {
  const [agencyName, setAgencyName] = useState('Apex SEO & Growth Consulting');
  const [clientName, setClientName] = useState('Acme Inc.');
  const [customNotes, setCustomNotes] = useState(
    'This audit was generated using automated search grounding, real-time crawler inspection, and Core Web Vitals diagnostics. Contact our team to implement these on-page fixes.'
  );

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whitelabel-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              PDF
            </div>
            <div>
              <h3 id="whitelabel-modal-title" className="text-sm sm:text-base font-bold text-white">
                White-Label Client Audit Report Generator
              </h3>
              <p className="text-xs text-slate-400">
                Ready to print or save as PDF with your agency branding
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Customization Inputs (Agency Branding) */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 no-print text-xs">
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
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-950 text-slate-100 font-sans space-y-8 print:p-0 print:bg-white print:text-black">
          {/* Document Header */}
          <div className="flex items-start justify-between pb-6 border-b border-slate-800 print:border-slate-300">
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                Confidential Website SEO Audit
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white print:text-black">
                {agencyName}
              </h1>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
                Prepared for: <strong>{clientName}</strong> • URL: <strong>{result.url}</strong>
              </p>
            </div>
            <div className="text-right">
              <div className="inline-block p-3 rounded-2xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-center">
                <span className="block text-[10px] uppercase font-bold text-slate-400 print:text-slate-600">
                  SEO Grade
                </span>
                <span className="text-3xl font-black text-emerald-400 print:text-emerald-700">
                  {result.grade}
                </span>
                <span className="block text-[11px] font-mono text-slate-300 print:text-slate-800">
                  {result.overallScore}/100
                </span>
              </div>
            </div>
          </div>

          {/* Core Categories Score Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Page Speed</span>
              <span className="block text-xl font-bold text-white print:text-black">
                {result.scores.pageSpeed}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Meta Data</span>
              <span className="block text-xl font-bold text-white print:text-black">
                {result.scores.metaData}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Mobile</span>
              <span className="block text-xl font-bold text-white print:text-black">
                {result.scores.mobileReadiness}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Security</span>
              <span className="block text-xl font-bold text-white print:text-black">
                {result.scores.security}%
              </span>
            </div>
          </div>

          {/* Audit Items Summary */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white print:text-black uppercase tracking-wider text-xs">
              Key Diagnostic Findings & Recommended Implementation:
            </h2>
            <div className="space-y-2">
              {result.auditItems.slice(0, 8).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 text-xs"
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
                      Action: {item.recommendation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Agency Notes */}
          <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-xs">
            <h3 className="font-bold text-slate-300 print:text-black mb-1">Consultant Notes</h3>
            <p className="text-slate-400 print:text-slate-700 leading-relaxed">{customNotes}</p>
          </div>

          {/* Footer of the report */}
          <div className="pt-4 border-t border-slate-800 print:border-slate-300 flex items-center justify-between text-[11px] text-slate-500">
            <span>Report prepared by {agencyName}</span>
            <span>Powered by FixMySEO Engine • {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
