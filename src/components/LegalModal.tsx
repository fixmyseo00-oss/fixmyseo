import React, { useState } from 'react';
import { ShieldCheck, FileText, Mail, X, CheckCircle2, Send, ExternalLink } from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'contact';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl relative">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              {activeTab === 'privacy' && <ShieldCheck className="w-5 h-5" />}
              {activeTab === 'terms' && <FileText className="w-5 h-5" />}
              {activeTab === 'contact' && <Mail className="w-5 h-5" />}
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-xl font-bold text-white">
                {activeTab === 'privacy' && 'Privacy Policy & Cookie Disclosure'}
                {activeTab === 'terms' && 'Terms of Service'}
                {activeTab === 'contact' && 'Contact Support & Enterprise Inquiries'}
              </h2>
              <p className="text-xs text-slate-400">
                FixMySEO Compliance, Legal Agreements & User Safety
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close legal information"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center px-6 pt-3 bg-slate-950/40 border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`cursor-pointer px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'border-emerald-400 text-emerald-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`cursor-pointer px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'border-emerald-400 text-emerald-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`cursor-pointer px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'contact'
                ? 'border-emerald-400 text-emerald-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed max-h-[60vh]">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                <strong>Google AdSense Compliance Notice:</strong> This privacy policy explains our collection practices, log protocols, and explicit use of third-party advertising cookies including the Google DoubleClick DART cookie.
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">1. Information We Collect</h3>
                <p>
                  At FixMySEO, we prioritize the privacy of our visitors. When you utilize our search audit services, we analyze public website URL parameters, public DOM metadata, and technical HTTP response headers. We do not require visitors to enter personally identifiable information (PII) to perform standard SEO audits.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">2. Log Files & Analytics</h3>
                <p>
                  Like most standard web servers, FixMySEO uses log files. These files log visitors when they visit the website. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">3. Google AdSense & DoubleClick DART Cookies</h3>
                <p>
                  Google is one of our third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to FixMySEO and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-emerald-400 underline">https://policies.google.com/technologies/ads</a>.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">4. GDPR & CCPA Data Rights</h3>
                <p>
                  Under European General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), users are entitled to request data disclosure, rectify inaccuracies, or request the deletion of any stored data traces. Contact our designated privacy officer at <span className="font-mono text-emerald-400">fixmyseo00@gmail.com</span>.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">1. Acceptance of Terms</h3>
                <p>
                  By accessing and using FixMySEO ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue using the service immediately.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">2. Acceptable Use of Auditing Services</h3>
                <p>
                  FixMySEO provides non-intrusive diagnostic analysis of publicly accessible web pages. You agree not to use automated bots to flood our scanning infrastructure, conduct Denial of Service (DoS) attacks, or attempt reverse-engineering of our proprietary scoring algorithms.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">3. Disclaimer of Warranties</h3>
                <p>
                  All diagnostic scores, Core Web Vitals telemetry, and AI optimization recommendations are provided "as is" without warranty of any kind. FixMySEO does not guarantee specific organic ranking positions or revenue growth on third-party search engines.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              {contactSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-slate-950/60 rounded-2xl border border-emerald-500/30">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Message Dispatched!</h3>
                  <p className="text-xs text-slate-400">
                    Thank you for contacting FixMySEO. A senior web architect will review your message and reply to your email within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <p className="text-xs text-slate-400 mb-2">
                    Have inquiries regarding AdSense partnerships, enterprise batch API access, or data privacy requests? Get in touch directly:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Business Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Message & Inquiries
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your technical question, AdSense partner proposal, or audit issue..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500 font-mono">
                      Direct: <a href="mailto:fixmyseo00@gmail.com" className="text-emerald-400 underline">fixmyseo00@gmail.com</a>
                    </span>
                    <button
                      type="submit"
                      className="cursor-pointer inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>&copy; 2026 FixMySEO &bull; All Rights Reserved</span>
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
