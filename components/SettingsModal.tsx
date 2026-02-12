
import React, { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [finnhubKey, setFinnhubKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFinnhubKey(localStorage.getItem('FINNHUB_API_KEY') || '');
      setIsSaved(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('FINNHUB_API_KEY', finnhubKey.trim());
    setIsSaved(true);
    setTimeout(() => {
      onClose();
      // Force refresh for any components relying on these keys
      window.location.reload();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-slate-100 dark:border-slate-800">
        <div className="p-10 md:p-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter mb-2">Data Control Center</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Configure your external financial data providers.</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Finnhub API Key</label>
                <a href="https://finnhub.io/dashboard" target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-600 font-bold hover:underline">Get Key →</a>
              </div>
              <input 
                type="password"
                value={finnhubKey}
                onChange={e => setFinnhubKey(e.target.value)}
                placeholder="Paste your Finnhub token here"
                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-6 py-5 font-bold text-slate-900 dark:text-white outline-none transition-all"
              />
              <p className="text-[9px] text-slate-400 font-medium px-1">Required for real-time stock quotes and 7-day trend charts.</p>
            </div>

            <button 
              onClick={handleSave}
              disabled={isSaved}
              className={`w-full font-black py-5 rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 ${
                isSaved ? 'bg-emerald-500 text-white' : 'bg-slate-900 dark:bg-emerald-600 text-white hover:opacity-90'
              }`}
            >
              {isSaved ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  Configurations Applied
                </>
              ) : 'Update Provider Keys'}
            </button>
            
            <p className="text-center text-[9px] text-slate-400 font-medium px-4">
              Keys are stored securely in your browser's local storage and never transmitted to our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
