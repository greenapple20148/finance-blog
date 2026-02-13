
import React, { useState } from 'react';
import SettingsModal from './SettingsModal';
import StockTicker from './StockTicker';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onNavigate: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onSubscribeClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onNavigate, isDarkMode, toggleDarkMode, onSubscribeClick }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'news', label: 'Financial News' },
    { id: 'blog', label: 'Library' },
    { id: 'tools', label: 'AI Tools' },
    { id: 'planner', label: 'Planner' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
        <StockTicker />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')} role="link" aria-label="Go to homepage">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-600/20">FB</div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">FinBlog</span>
            </div>
            
            <nav className="hidden md:flex space-x-6" aria-label="Main navigation">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className={`font-bold text-xs uppercase tracking-widest transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400 pb-1' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2.5 rounded-xl text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                aria-label="Open settings"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
              <button 
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>
              <button 
                onClick={onSubscribeClick}
                className="hidden sm:block bg-slate-900 dark:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:opacity-90 transition-all shadow-md shadow-slate-900/10 dark:shadow-emerald-600/20 uppercase tracking-widest ml-2"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate('home')}>
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">FB</div>
                <span className="text-xl font-bold text-white tracking-tight">FinBlog</span>
              </div>
              <p className="max-w-sm mb-6 leading-relaxed font-medium">Empowering institutional and retail investors with high-fidelity capital market insights and strategic AI tools.</p>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 max-w-sm border-l border-slate-700 pl-4">
                Regulatory Compliance: FinBlog is a registered educational media platform operated by RZeal Solutions. We do not provide financial advice. For security disclosures, visit our <button onClick={() => onNavigate('contact')} className="underline">Security & Support</button> center.
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Knowledge Hub</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><button onClick={() => onNavigate('blog')} className="hover:text-emerald-400 transition-colors">Wealth Library</button></li>
                <li><button onClick={() => onNavigate('tools')} className="hover:text-emerald-400 transition-colors">Strategic Tools</button></li>
                <li><button onClick={() => onNavigate('news')} className="hover:text-emerald-400 transition-colors">Market Signals</button></li>
                <li><button onClick={() => onNavigate('planner')} className="hover:text-emerald-400 transition-colors">Capital Planner</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Compliance & Legal</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><button onClick={() => onNavigate('tos')} className="hover:text-emerald-400 transition-colors">Terms of Service</button></li>
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-emerald-400 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => onNavigate('disclaimer')} className="hover:text-emerald-400 transition-colors">Legal Disclaimers</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition-colors">Security Disclosure</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 dark:border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
            <div className="flex gap-8">
              <button onClick={() => onNavigate('tos')} className="hover:text-white transition-colors">TOS</button>
              <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={() => onNavigate('disclaimer')} className="hover:text-white transition-colors">Disclosures</button>
              <a href="https://finnhub.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Data by Finnhub</a>
            </div>
            <div className="text-slate-600">
              &copy; 2024 RZeal Solutions. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer >

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default Layout;
