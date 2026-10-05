import React, { useState } from 'react';
import { X, CreditCard, Shield, Check, Crown, Zap, Lock } from 'lucide-react';
import { PlanType } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPlan: PlanType;
  billingCycle: 'monthly' | 'yearly';
  onConfirmUpgrade: (plan: PlanType) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  targetPlan,
  billingCycle,
  onConfirmUpgrade,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'razorpay'>('card');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(targetPlan || 'pro');
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>(billingCycle || 'monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form mock state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState('Pro Webmaster');

  if (!isOpen) return null;

  const price = selectedPlan === 'pro'
    ? (cycle === 'monthly' ? 9 : 89)
    : selectedPlan === 'agency'
    ? (cycle === 'monthly' ? 19 : 189)
    : 0;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
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
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden">
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

        {/* Payment Methods Selector (Structural placeholders) */}
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
              onClick={() => setPaymentMethod('razorpay')}
              className={`cursor-pointer p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                paymentMethod === 'razorpay'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="font-mono font-bold text-xs">UPI</span>
              <span>Razorpay</span>
            </button>
          </div>
        </div>

        {/* Structural Form Fields */}
        <form onSubmit={handlePay} className="space-y-4">
          {paymentMethod === 'card' ? (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
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
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-300">
              <p>You will be securely redirected to {paymentMethod === 'paypal' ? 'PayPal' : 'Razorpay / UPI'} for instant verification.</p>
            </div>
          )}

          {/* Order Summary Line */}
          <div className="flex items-center justify-between text-xs py-2 px-1 text-slate-400 border-t border-slate-800">
            <span>Total Due Today:</span>
            <span className="text-base font-black text-emerald-400 font-mono">${price}.00 USD</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-60"
          >
            <Lock className="w-4 h-4" />
            <span>{isProcessing ? 'Processing Secure Activation...' : `Activate ${selectedPlan === 'agency' ? 'Agency' : 'Pro'} ($${price})`}</span>
          </button>
        </form>

        <p className="mt-3 text-center text-[10px] text-slate-500">
          Simulated sandbox environment. No actual charge will be made.
        </p>
      </div>
    </div>
  );
};
