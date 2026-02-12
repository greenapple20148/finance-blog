
import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { summarizeArticle } from '../services/gemini';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

const ArticleView: React.FC = ({ article, onBack }) => {
  const [summary, setSummary] = useState<string>('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSummarize = async () => {
    if (summary) return;
    setIsSummarizing(true);
    try {
      const res = await summarizeArticle(article.content);
      setSummary(res);
    } catch (e) {
      setSummary("Failed to generate summary.");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <article 
      className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300 pb-20"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <meta itemProp="mainEntityOfPage" content={`https://fintools.tech/blog/${article.id}`} />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] mb-8 transition-all"
        >
          <div className="w-10 h-10 rounded-full border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:border-emerald-600 dark:group-hover:border-emerald-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </div>
          Back to feed
        </button>

        {/* FTC Compliance Disclosure */}
        <div className="mb-12 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
          <span className="text-emerald-600 dark:text-emerald-400 mr-2">Disclosure:</span>
          FinBlog is reader-supported. This article may contain affiliate links. We may earn a commission if you make a purchase at no cost to you. 
          <a href="#" className="underline ml-1">Learn more</a>.
        </div>

        <header className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg shadow-emerald-600/20" itemProp="articleSection">
              {article.category}
            </span>
            <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">{article.readTime} reading time</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-10 tracking-tighter" itemProp="headline">
            {article.title}
          </h1>
          <div className="flex items-center gap-5 py-10 border-y border-slate-100 dark:border-slate-900">
            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-slate-400 text-xl">
              {article.author[0]}
            </div>
            <div itemProp="author" itemScope itemType="https://schema.org/Person">
              <p className="font-bold text-slate-900 dark:text-white text-lg" itemProp="name">{article.author}</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest">Wealth Strategist & Contributor</p>
            </div>
            <div className="ml-auto text-slate-400 dark:text-slate-500 text-sm font-medium">
              Published <time itemProp="datePublished" dateTime={new Date(article.date).toISOString().split('T')[0]}>{article.date}</time>
            </div>
          </div>
        </header>

        {/* AI Summary Box */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-10 mb-16 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-widest">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.586 15.657l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414zM4.414 14.243l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414z" /></svg>
              </div>
              AI Insight Summary
            </div>
            {!summary && !isSummarizing && (
              <button 
                onClick={handleSummarize}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20"
              >
                Generate Summary
              </button>
            )}
          </div>
          {isSummarizing ? (
            <div className="flex items-center gap-4 text-emerald-600 dark:text-emerald-400 font-bold italic animate-pulse py-4">
              <div className="w-5 h-5 border-3 border-emerald-600 dark:border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
              Synthesizing core financial mechanics...
            </div>
          ) : summary ? (
            <div className="prose prose-emerald dark:prose-invert text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {summary.split('\n').map((line, i) => <p key={i} className="mb-4">{line}</p>)}
            </div>
          ) : (
            <p className="text-slate-400 dark:text-slate-600 text-sm font-medium italic">Gemini can analyze this article and extract the most critical actionable takeaways for you in seconds.</p>
          )}
        </div>

        <div className="prose prose-xl prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-300 leading-[1.8] space-y-12" itemProp="articleBody">
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl mb-16 h-[500px]">
             <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" itemProp="image" />
          </div>
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="whitespace-pre-wrap font-medium">{paragraph.trim()}</p>
          ))}
        </div>

        <footer className="mt-24 pt-16 border-t border-slate-100 dark:border-slate-900">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight">Expand the reach</h3>
          <div className="flex flex-wrap gap-4">
            {['Twitter', 'LinkedIn', 'Copy Direct Link'].map(platform => (
              <button key={platform} className="bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-2xl font-bold text-sm transition-all border border-slate-100 dark:border-slate-800">
                {platform}
              </button>
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
};

export default ArticleView;
