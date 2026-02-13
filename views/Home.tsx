
import React, { useState } from 'react';
import { ARTICLES } from '../constants';
import ArticleCard from '../components/ArticleCard';
import AffiliateWidget from '../components/AffiliateWidget';

interface HomeProps {
  onSelectArticle: (id: string) => void;
  onNavigate: (tab: string) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectArticle, onNavigate }) => {
  const featured = ARTICLES[0];
  const latest = ARTICLES.slice(1, 7);

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative bg-slate-900 dark:bg-slate-950 pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[120px] -mr-96 -mt-96"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -ml-72 -mb-72"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-emerald-500/20">
              Institutional Grade Intelligence
            </span>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[1] drop-shadow-sm">
              Engineering Your <span className="text-emerald-500 italic">Financial</span> Independence.
            </h1>
            <p className="text-slate-400 text-xl md:text-2xl mb-12 leading-relaxed font-medium">
              FinBlog blends deep-dive market reporting with institutional-grade AI tools to help you master your capital allocation.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={() => onNavigate('tools')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-emerald-600/30 transform hover:-translate-y-1 active:scale-95"
              >
                Access Simulation Lab
              </button>
              <button 
                onClick={() => onNavigate('news')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all backdrop-blur-md"
              >
                Market Signals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div 
              onClick={() => onSelectArticle(featured.id)}
              className="group bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-900/5 flex flex-col md:flex-row cursor-pointer border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:shadow-emerald-600/5"
            >
              <div className="md:w-1/2 overflow-hidden relative">
                <img 
                  src={featured.imageUrl} 
                  alt={featured.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 shadow-xl">
                    Featured Analysis
                  </span>
                </div>
              </div>
              <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
                  <span>{featured.category}</span>
                  <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                  <span className="text-slate-400">{featured.readTime} read</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight group-hover:text-emerald-600 transition-colors tracking-tight">
                  {featured.title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed font-medium">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">By {featured.author}</span>
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
             <AffiliateWidget />
          </div>
        </div>
      </section>

      {/* Grid Feed */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">Knowledge Library</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Strategic deep-dives and behavioral insights.</p>
            </div>
            <button 
              onClick={() => onNavigate('blog')}
              className="hidden md:flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-widest hover:underline"
            >
              Browse Full Feed
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {latest.map(article => (
              <ArticleCard key={article.id} article={article} onClick={onSelectArticle} />
            ))}
          </div>

          <div className="mt-16 text-center md:hidden">
            <button 
              onClick={() => onNavigate('blog')}
              className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm"
            >
              See All Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
            Master Your Capital.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Receive our weekly high-conviction market analysis and tax-saving blueprints directly in your inbox.
          </p>

          {isSuccess ? (
             <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-8 rounded-[2.5rem] animate-in zoom-in-95 duration-500 max-w-xl mx-auto">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">You're on the list!</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Verify your email to unlock the FinBlog archives.</p>
             </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input 
                required
                type="email" 
                placeholder="Professional Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 dark:focus:border-emerald-400 rounded-[1.5rem] px-8 py-5 font-bold text-slate-900 dark:text-white outline-none transition-all shadow-inner"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-slate-900 dark:bg-emerald-600 hover:opacity-90 text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.15em] transition-all shadow-2xl shadow-slate-900/20 dark:shadow-emerald-600/30 transform active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Transmitting...' : 'Join Inner Circle'}
              </button>
            </form>
          )}
          <p className="mt-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Privacy Guaranteed • Zero Spam • Unsubscribe Anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
