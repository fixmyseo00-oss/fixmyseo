import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Shield,
  Check,
  Crown,
  Zap,
  Lock,
  Coins,
  Copy,
  CheckCircle2,
  ExternalLink,
  UploadCloud,
} from 'lucide-react';
import { PlanType } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPlan: PlanType;
  billingCycle: 'monthly' | 'yearly';
  onConfirmUpgrade: (plan: PlanType) => void;
  onShowSuccessToast?: (msg: string, duration?: number) => void;
}

const OFFICIAL_USDT_ADDRESS = 'TT7sQ59rxRCWxZXpGma9Pyoo5rJCxUEUjL';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  targetPlan,
  billingCycle,
  onConfirmUpgrade,
  onShowSuccessToast,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'crypto'>('card');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(targetPlan || 'pro');
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>(billingCycle || 'monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form mock state (Card)
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState('Pro Webmaster');

  // Crypto state
  const [copied, setCopied] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [txidOrHandle, setTxidOrHandle] = useState('');

  if (!isOpen) return null;

  const price =
    selectedPlan === 'pro'
      ? cycle === 'monthly'
        ? 9
        : 89
      : selectedPlan === 'agency'
      ? cycle === 'monthly'
        ? 19
        : 189
      : 0;

  const handleCopyAddress = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(OFFICIAL_USDT_ADDRESS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
        return;
      }
    } catch {
      // fallback
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = OFFICIAL_USDT_ADDRESS;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === 'crypto') {
      setTimeout(() => {
        setIsProcessing(false);
        onClose();
        const successMessage =
          'Ticket Submitted! Our team is verifying your USDT transaction and Twitter follow status. Your premium features will be unlocked manually within 10 to 30 minutes.';
        if (onShowSuccessToast) {
          onShowSuccessToast(successMessage, 6500);
        }
      }, 700);
      return;
    }

    // Default Card / PayPal flow
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmUpgrade(selectedPlan);
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
    >
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close checkout modal"
          className="cursor-pointer absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h3 id="checkout-modal-title" className="text-xl font-bold text-white">
              Unlock FixMySEO {selectedPlan === 'agency' ? 'Agency Plan' : 'Pro Plan'}
            </h3>
            <p className="text-xs text-slate-400">
              Instant access • White-label client exports • Unlimited deep audits
            </p>
          </div>
        </div>

        {/* Plan Switcher Pills */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-950 border border-slate-800 mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSelectedPlan('pro')}
            className={`cursor-pointer py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              selectedPlan === 'pro'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Starter Pro ($9/mo)</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedPlan('agency')}
            className={`cursor-pointer py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              selectedPlan === 'agency'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Agency Plan ($19/mo)</span>
          </button>
        </div>

        {/* Payment Methods Selector (Renamed third tab to Crypto (USDT)) */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
            Payment Collection Method
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`cursor-pointer p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                paymentMethod === 'card'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Credit Card</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`cursor-pointer p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                paymentMethod === 'paypal'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="font-serif italic font-black text-sm">P</span>
              <span>PayPal</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('crypto')}
              className={`cursor-pointer p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                paymentMethod === 'crypto'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Crypto (USDT)</span>
            </button>
          </div>
        </div>

        {/* Conditional Layout Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {paymentMethod === 'crypto' ? (
            /* Crypto (USDT) Instruction Workflow & Interactive Upload Fields */
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in duration-200">
              {/* Step 1: Transfer Instructions */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-200 leading-relaxed">
                  Step 1: Send the exact amount ($9.00 USD for Starter Pro / $19.00 USD for Agency) to our official secure address:
                </p>

                {/* Wallet Address Text Box (Bold, Selectable, Copyable) */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-700/80">
                  <span
                    className="font-mono font-bold text-[11px] sm:text-xs text-emerald-400 select-all break-all"
                    title="Click or drag to select official USDT TRC-20 wallet address"
                  >
                    {OFFICIAL_USDT_ADDRESS}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="cursor-pointer shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold transition-all active:scale-95"
                    title="Copy wallet address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] font-semibold text-amber-400/90 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>Network Protocol: TRC-20 (Tron Network) only.</span>
                </p>
              </div>

              {/* Step 2: Twitter Follow Status */}
              <div className="pt-2 border-t border-slate-800/80">
                <p className="text-xs font-medium text-slate-200 leading-relaxed">
                  Step 2: Open Twitter and follow our official handle:{' '}
                  <a
                    href="https://twitter.com/Fixmyseo00"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 font-bold hover:underline"
                  >
                    @Fixmyseo00
                    <ExternalLink className="w-3 h-3 inline" />
                  </a>
                </p>
              </div>

              {/* Step 3: Screenshot Upload & Verification Inputs */}
              <div className="pt-2 border-t border-slate-800/80 space-y-3">
                <p className="text-xs font-medium text-slate-200 leading-relaxed">
                  Step 3: Upload a single screenshot showing both your payment confirmation receipt and the Twitter follow status.
                </p>

                {/* Upload Screenshot Button & File Input */}
                <div>
                  <input
                    type="file"
                    id="crypto-proof-upload"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="crypto-proof-upload"
                    className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 active:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-slate-200 hover:text-white text-xs font-semibold transition-all shadow-sm group"
                  >
                    <UploadCloud className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>
                      {uploadedFileName ? `📁 ${uploadedFileName}` : '📁 Upload Proof Screenshot (PNG/JPG)'}
                    </span>
                  </label>
                  {uploadedFileName && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-emerald-400 font-medium px-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Screenshot attached successfully</span>
                    </div>
                  )}
                </div>

                {/* Single-line text input field */}
                <div>
                  <input
                    type="text"
                    value={txidOrHandle}
                    onChange={(e) => setTxidOrHandle(e.target.value)}
                    placeholder="Enter your Twitter Handle or Wallet TXID Hash"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
                  />
                </div>
              </div>
            </div>
          ) : paymentMethod === 'card' ? (
            /* Standard Credit Card Inputs */
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in duration-200">
              <div>
                <label className="block text-[11px] text-slate-400 uppercase font-semibold mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 uppercase font-semibold mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                  <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 uppercase font-semibold mb-1">
                    Expiration
                  </label>
                  <input
                    type="text"
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 uppercase font-semibold mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* PayPal Placeholder */
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-300">
              <p>You will be securely redirected to PayPal for instant verification.</p>
            </div>
          )}

          {/* Order Summary Line */}
          <div className="flex items-center justify-between text-xs py-2 px-1 text-slate-400 border-t border-slate-800">
            <span>Total Due Today:</span>
            <span className="text-base font-black text-emerald-400 font-mono">${price}.00 USD</span>
          </div>

          {/* Submit Button (Dynamic text for Crypto vs Standard) */}
          <button
            type="submit"
            disabled={isProcessing}
            className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-60"
          >
            {paymentMethod === 'crypto' ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isProcessing ? 'Submitting Verification Ticket...' : 'Submit Verification Ticket'}
                </span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  {isProcessing
                    ? 'Processing Secure Activation...'
                    : `Activate ${selectedPlan === 'agency' ? 'Agency' : 'Pro'} ($${price})`}
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
