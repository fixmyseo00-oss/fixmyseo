import React, { useState } from 'react';
import { ARTICLES_DATA } from '../data/articles';
import { Article } from '../types';
import { BookOpen, Clock, Calendar, ArrowRight, CheckCircle2, X, Sparkles, Share2 } from 'lucide-react';

interface BlogSectionProps {
  onSelectArticle?: (article: Article) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectArticle }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    if (onSelectArticle) {
      onSelectArticle(article);
    }
  };

  return (
    <section
      id="blog-section"
      aria-labelledby="knowledge-hub-heading"
      className="py-12 border-t border-slate-800/80 my-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SEO & GEO Knowledge Hub</span>
          </div>
          <h2 id="knowledge-hub-heading" className="text-2xl sm:text-3xl font-extrabold text-white">
            Mastering Search in the Age of Generative AI
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Deep-dive technical blueprints and search architecture updates to ensure your web properties dominate both Google SERPs and LLM answer carousels.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Updated for 2026 Algorithms</span>
        </div>
      </div>

      {/* 3 High-Performance Article Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES_DATA.map((article) => (
          <article
            key={article.id}
            className="flex flex-col justify-between p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-emerald-400 border border-slate-700">
                  {article.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug mb-3">
                {article.title}
              </h3>

              {/* 3-sentence deep preview to satisfy Google Helpful Content Guidelines */}
              <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-4">
                {article.summary}
              </p>
            </div>

            <div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {article.publishDate}
                </span>

                <button
                  onClick={() => handleArticleClick(article)}
                  className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group-hover:translate-x-0.5"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="cursor-pointer absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close article reader"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {selectedArticle.readTime}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {selectedArticle.publishDate}
                </span>
              </div>
              <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {selectedArticle.title}
              </h2>
            </div>

            {/* Key Takeaways Box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Summary & Key Takeaways</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deep Article Content */}
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Published by FixMySEO Engineering Team &bull; Verified 2026
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="cursor-pointer px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
