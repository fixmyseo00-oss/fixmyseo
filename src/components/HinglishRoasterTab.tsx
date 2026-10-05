import React, { useState, useEffect } from 'react';
import {
  Flame,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Twitter,
  MessageCircle,
  Pill,
  Sparkles,
  Globe,
} from 'lucide-react';
import { AuditResult } from '../types';

interface HinglishRoasterTabProps {
  result: AuditResult;
  roastLevel: string;
  roastLanguage: 'hinglish' | 'english';
  onReRoast: (level: string, language?: 'hinglish' | 'english') => void;
  onLanguageChange: (lang: 'hinglish' | 'english') => void;
  isLoading: boolean;
}

export const HinglishRoasterTab: React.FC<HinglishRoasterTabProps> = ({
  result,
  roastLevel,
  roastLanguage,
  onReRoast,
  onLanguageChange,
  isLoading,
}) => {
  const [copiedRoast, setCopiedRoast] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const roast = result.hinglishRoast;
  const isEnglish = roastLanguage === 'english';

  // Cancel any ongoing speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopyRoast = () => {
    const textToCopy = `🔥 FixMySEO ${isEnglish ? 'Tech' : 'Hinglish'} Roast for ${result.url}:\n\n"${roast.siteNickname}"\n\n${roast.savageRoast}\n\n👉 Punchline: "${roast.punchlines[0]}"\n\nPrescription: ${roast.desiPrescription[0]}\n\nAudited on FixMySEO (Score: ${result.overallScore}/100)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedRoast(true);
    setTimeout(() => setCopiedRoast(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `FixMySEO just roasted ${result.url} in ${isEnglish ? 'savage tech English' : 'brutal Hinglish'}! 😂\n\n"${roast.siteNickname}"\n\n"${roast.punchlines[0]}"\n\nCheck yours: https://fixmyseo.ai`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out this ${isEnglish ? 'savage tech' : 'Hinglish'} roast of ${result.url} on FixMySEO 😂:\n\n"${roast.siteNickname}"\n\n"${roast.punchlines[0]}"`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // High-naturalness Human-centric Speech Synthesis
  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean text for natural cadence
    const cleanedRoast = roast.savageRoast
      .replace(/!{2,}/g, '!')
      .replace(/\.{2,}/g, '.')
      .replace(/\n+/g, ' ');

    const topPunchline = roast.punchlines[0] ? ` Punchline: ${roast.punchlines[0]}.` : '';
    const utteranceText = `${roast.siteNickname}. ${cleanedRoast} ${topPunchline}`;

    const utterance = new SpeechSynthesisUtterance(utteranceText);
    
    // REQUIREMENT: Pitch 1.05 and Rate 0.95 for natural human-centric audio
    utterance.pitch = 1.05;
    utterance.rate = 0.95;

    // Pick most natural voice based on language
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      if (isEnglish) {
        // Find natural conversational English voice
        const englishVoice =
          voices.find(
            (v) =>
              (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Premium')) &&
              (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en'))
          ) || voices.find((v) => v.lang.startsWith('en'));
        if (englishVoice) utterance.voice = englishVoice;
      } else {
        // Find natural Hindi or Indian English voice
        const desiVoice =
          voices.find(
            (v) =>
              (v.lang.includes('hi') || v.lang.includes('IN') || v.name.includes('India') || v.name.includes('Rishi')) &&
              (v.name.includes('Google') || v.name.includes('Natural') || true)
          ) || voices.find((v) => v.lang.startsWith('hi') || v.lang.startsWith('en-IN'));
        if (desiVoice) utterance.voice = desiVoice;
      }
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <article
      id="panel-hinglish"
      role="tabpanel"
      aria-labelledby="tab-hinglish"
      className="space-y-8 animate-in fade-in duration-300"
    >
      {/* Top Banner: Site Nickname & Audio Playback */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-rose-950/40 border border-amber-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-2 border border-amber-500/40">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>
                {isEnglish ? 'Tech Industry Roast' : 'Hinglish AI Roast'} • {roastLevel}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              &ldquo;{roast.siteNickname}&rdquo;
            </h2>
            <p className="text-sm text-amber-200/80 mt-1 font-medium">
              Target: <span className="font-mono text-emerald-400">{result.url}</span> •{' '}
              {isEnglish ? 'Silicon Valley AI Diagnosis' : 'AI Desi Diagnosis'}
            </p>
          </div>

          {/* Audio Player & Share Buttons */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleToggleSpeak}
              className={`cursor-pointer flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                isSpeaking
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4" /> Stop Audio
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />{' '}
                  {isEnglish ? 'Listen to Roast (Audio)' : 'Suno Roast (Audio)'}
                </>
              )}
            </button>

            <button
              onClick={handleCopyRoast}
              className="cursor-pointer flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
            >
              {copiedRoast ? (
                <>
                  <Check className="w-4 h-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Share Roast
                </>
              )}
            </button>
          </div>
        </div>

        {/* Savage Roast Commentary Main Body */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-amber-500/20 text-slate-200 text-base sm:text-lg leading-relaxed relative font-medium">
          <p className="whitespace-pre-line italic text-amber-100/90">&ldquo;{roast.savageRoast}&rdquo;</p>
        </div>

        {/* Multi-Language Roast Toggle for Tier 1 Audience & Mirchi Intensity */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-xs">
          {/* Multi-Language Toggle Switch */}
          <div className="flex items-center gap-2.5">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              Language Mode:
            </span>
            <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
              <button
                type="button"
                onClick={() => onLanguageChange('hinglish')}
                disabled={isLoading}
                className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  roastLanguage === 'hinglish'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🔥 Hinglish (Desi Burn)
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('english')}
                disabled={isLoading}
                className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  roastLanguage === 'english'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🌍 English (Global Mode)
              </button>
            </div>
          </div>

          {/* Mirchi Spice Level Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Spice Level:</span>
            <div className="flex items-center gap-1.5">
              {['Mild Chai Roast', 'Masala Spicy', 'Nuclear Desi Burn'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => onReRoast(lvl, roastLanguage)}
                  disabled={isLoading}
                  className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    roastLevel === lvl
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {lvl === 'Mild Chai Roast' && '☕ '}
                  {lvl === 'Masala Spicy' && '🌶️ '}
                  {lvl === 'Nuclear Desi Burn' && '🔥 '}
                  {lvl.replace(' Roast', '')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Punchlines Cards Grid */}
      <section aria-labelledby="punchlines-heading" className="space-y-4">
        <h3 id="punchlines-heading" className="text-lg font-bold text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400" />
          <span>{isEnglish ? 'Top Tech Punchlines' : 'Top Desi Punchlines'}</span>
          <span className="text-xs text-slate-400 font-normal">(Tweetable One-Liners)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roast.punchlines.map((punchline, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex items-start gap-3.5 group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-sm shrink-0 group-hover:scale-105 transition-transform">
                #{idx + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                  &ldquo;{punchline}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prescription Card */}
      <section aria-labelledby="prescription-heading" className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-xl">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h3 id="prescription-heading" className="text-lg font-bold text-white">
              {isEnglish
                ? "Lead Architect's Prescription (Technical Remediation)"
                : "Desi Doctor's Prescription (Technical Ilaaj)"}
            </h3>
            <p className="text-xs text-slate-400">
              {isEnglish
                ? 'Satire aside, remediate these critical architectural items to appease search crawlers:'
                : 'Mazak ek taraf, yeh 4 cheezein theek karlo toh Googlebot khush ho jayega!'}
            </p>
          </div>
        </div>

        <ul className="space-y-3 mt-4">
          {roast.desiPrescription.map((item, idx) => (
            <li
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3 text-sm text-slate-200"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ✓
              </span>
              <span className="font-medium leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Viral Roast Card Graphic (Ready for Social Media Screenshot) */}
      <section aria-label="Social Share Roast Card" className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm uppercase tracking-wider font-bold text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Viral Social Card Preview
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareTwitter}
              aria-label="Share on X / Twitter"
              className="cursor-pointer p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Share on X (Twitter)"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={handleShareWhatsApp}
              aria-label="Share on WhatsApp"
              className="cursor-pointer p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 transition-colors"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a0f18] to-slate-900 border-2 border-emerald-500/40 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-slate-950 text-xs">
                F
              </div>
              <span className="font-black text-white text-sm">
                FixMy<span className="text-emerald-400">SEO</span> Roaster
              </span>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              {result.overallScore}/100 SEO Score
            </span>
          </div>

          <div className="my-6">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Website Diagnosis:
            </p>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              {roast.siteNickname}
            </h4>
            <p className="mt-3 text-sm sm:text-base text-slate-300 italic font-medium leading-relaxed">
              &ldquo;{roast.shareableQuote}&rdquo;
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-emerald-400">{result.url}</span>
            <span>Audited on fixmyseo.ai</span>
          </div>
        </div>
      </section>
    </article>
  );
};
