
import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[120] p-4 md:p-6 animate-in slide-in-from-bottom-full duration-500">
      <div className="max-w-7xl mx-auto bg-slate-900 dark:bg-slate-800 text-white p-6 md:p-8 rounded-[2rem] shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl bg-opacity-95">
        <div className="flex-grow max-w-3xl">
          <h4 className="text-lg font-bold mb-2 tracking-tight">Privacy & Transparency</h4>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            FinBlog uses cookies to enhance your strategic analysis experience and remember your theme settings. We never sell your personal data or store sensitive financial inputs. By continuing, you agree to our 
            <a href="#" className="text-emerald-400 hover:underline mx-1">Privacy Policy</a> and 
            <a href="#" className="text-emerald-400 hover:underline mx-1">Terms of Service</a>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={handleDecline}
            className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
          >
            Preferences
          </button>
          <button 
            onClick={handleAccept}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 transition-all active:scale-95"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
