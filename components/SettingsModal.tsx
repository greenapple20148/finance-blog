
import React, { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_STOCKS = ['SPY', 'QQQ', 'DIA', 'BTC', 'ETH', 'TSLA', 'AAPL', 'NVDA', 'MSFT', 'GOOGL'];

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [tickerSymbols, setTickerSymbols] = useState<string[]>([]);
  const [newSymbol, setNewSymbol] = useState('');

  useEffect(() => {
    if (isOpen) {
      const savedSymbols = localStorage.getItem('TICKER_SYMBOLS');
      setTickerSymbols(savedSymbols ? JSON.parse(savedSymbols) : DEFAULT_STOCKS);
      setIsSaved(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('TICKER_SYMBOLS', JSON.stringify(tickerSymbols));
    
    // Dispatch custom event to notify StockTicker
    window.dispatchEvent(new Event('ticker-updated'));
    
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const addSymbol = () => {
    const sym = newSymbol.trim().toUpperCase();
    if (sym && !tickerSymbols.includes(sym)) {
      setTickerSymbols([...tickerSymbols, sym]);
      setNewSymbol('');
    }
  };

  const removeSymbol = (sym: string) => {
    setTickerSymbols(tickerSymbols.filter(s => s !== sym));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-slate-100 dark:border-slate-800 custom-scrollbar">
        <div className="p-10 md:p-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter mb-2">Control Center</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Customize your financial dashboard telemetry.</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="space-y-10">
            {/* Ticker Management */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Molten Ticker Management</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={newSymbol}
                  onChange={e => setNewSymbol(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addSymbol()}
                  placeholder="e.g. BTC, NVDA, HOOD"
                  className="flex-grow bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-cyan-500 rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
                <button 
                  onClick={addSymbol}
                  className="bg-slate-900 dark:bg-slate-700 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-600 transition-all"
                >
                  Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {tickerSymbols.map(sym => (
                  <div key={sym} className="group bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-all">
                    {sym}
                    <button 
                      onClick={() => removeSymbol(sym)}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
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
                  Settings Applied
                </>
              ) : 'Commit Changes'}
            </button>
            
            <p className="text-center text-[9px] text-slate-400 font-medium px-4 leading-relaxed">
              Your financial preferences are stored in your browser session for high-fidelity privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
