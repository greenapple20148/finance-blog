
import React, { useState } from 'react';
import { ARTICLES } from '../constants';
import ArticleCard from '../components/ArticleCard';

interface HomeProps {
  onSelectArticle: (id: string) => void;
  onNavigate: (tab: string) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectArticle, onNavigate }) => {
  const featured = ARTICLES[0];
  const latest = ARTICLES.slice(1);

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
    <div className="space-y-24 pb-24 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-emerald-950 text-white pt-24 pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-emerald-800/20 to-transparent pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="inline-block bg-emerald-500/20 text-emerald-300 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-emerald-500/30">
              Future-Proof Your Finances
            </span>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8 tracking-tighter">
              Wealth is about having <span className="text-emerald-400 italic">options</span>.
            </h1>
            <p className="text-xl text-emerald-100/70 mb-12 max-w-xl leading-relaxed font-medium">
              Join 50,000+ readers master their personal finances with AI-enhanced insights, real-time market trends, and time-tested wealth strategies.
            </p>
            <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => onNavigate('blog')}
                className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-10 py-5 rounded-2xl font-black transition-all shadow-2xl shadow-emerald-500/20 transform hover:-translate-y-1"
              >
                Read Library
              </button>
              <button 
                onClick={() => onNavigate('planner')}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-black backdrop-blur-md transition-all transform hover:-translate-y-1"
              >
                Launch AI Planner
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div 
          onClick={() => onSelectArticle(featured.id)}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100 dark:border-slate-800 cursor-pointer group hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all duration-500"
        >
          <div className="lg:w-1/2 relative overflow-hidden h-[400px] lg:h-auto">
            <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <span className="text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-widest mb-6">{featured.category}</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
              {featured.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed font-medium">
              {featured.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-slate-400 text-xl">
                  {featured.author[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{featured.author}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-sm font-bold uppercase tracking-tighter">{featured.date}</p>
                </div>
              </div>
              <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 w-12 h-12 rounded-full flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">The Wealth Library</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Strategic guidance on building and preserving your legacy.</p>
          </div>
          <button 
            onClick={() => onNavigate('blog')} 
            className="group flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-widest hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            Explore All 
            <span className="w-8 h-8 rounded-full border-2 border-emerald-600 dark:border-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 dark:group-hover:bg-emerald-400 group-hover:text-white transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {latest.map(article => (
            /* Fix: Changed handleSelectArticle to onSelectArticle from props */
            <ArticleCard key={article.id} article={article} onClick={onSelectArticle} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 dark:bg-slate-800 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full -mr-40 -mt-40 blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tighter">Master your money.</h2>
            <p className="text-slate-400 text-xl mb-12 leading-relaxed font-medium">
              Join 50,000+ elite subscribers who receive our weekly deep-dive into market arbitrage, hidden tax codes, and AI-powered capital allocation.
            </p>
            
            {isSuccess ? (
              <div className="bg-white/5 border border-emerald-500/30 rounded-[2.5rem] p-12 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Subscription Confirmed</h4>
                <p className="text-slate-400">Check your inbox for your first market signal.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 rounded-[2.5rem] backdrop-blur-xl border border-white/10">
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email" 
                  className="bg-transparent rounded-[2rem] px-8 py-5 text-white focus:outline-none flex-grow font-medium"
                />
                <button 
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-[2rem] font-black shadow-2xl shadow-emerald-600/20 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Transmitting...' : 'Join the Circle'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
