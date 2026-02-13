
import React, { useEffect, useState } from 'react';
import { Article } from '../types';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    let shareUrl = '';

    if (platform === 'Twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    } else if (platform === 'LinkedIn') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
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
            <button 
              onClick={() => handleSocialShare('Twitter')}
              className="bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-2xl font-bold text-sm transition-all border border-slate-100 dark:border-slate-800 flex items-center gap-2"
            >
              Twitter
            </button>
            <button 
              onClick={() => handleSocialShare('LinkedIn')}
              className="bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-2xl font-bold text-sm transition-all border border-slate-100 dark:border-slate-800 flex items-center gap-2"
            >
              LinkedIn
            </button>
            <button 
              onClick={handleCopyLink}
              className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all border flex items-center gap-2 ${
                copied 
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <svg className={`w-4 h-4 transition-transform ${copied ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {copied ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                )}
              </svg>
              {copied ? 'Link Copied!' : 'Copy Direct Link'}
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default ArticleView;
