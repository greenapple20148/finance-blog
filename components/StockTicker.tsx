
import React, { useEffect, useState, useCallback } from 'react';
import { fetchStockQuote } from '../services/externalApis';

interface StockData {
  symbol: string;
  price: number;
  change: number;
}

const DEFAULT_STOCKS = ['SPY', 'QQQ', 'DIA', 'BTC', 'ETH', 'TSLA', 'AAPL', 'NVDA', 'MSFT', 'GOOGL'];

const StockTicker: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [symbols, setSymbols] = useState<string[]>(() => {
    const saved = localStorage.getItem('TICKER_SYMBOLS');
    return saved ? JSON.parse(saved) : DEFAULT_STOCKS;
  });

  // Sync symbols from localStorage
  useEffect(() => {
    const syncSymbols = () => {
      const saved = localStorage.getItem('TICKER_SYMBOLS');
      if (saved) {
        setSymbols(JSON.parse(saved));
      }
    };

    window.addEventListener('ticker-updated', syncSymbols);
    return () => window.removeEventListener('ticker-updated', syncSymbols);
  }, []);

  const refreshData = useCallback(async () => {
    const results = await Promise.all(
      symbols.map(async (sym) => {
        const quote = await fetchStockQuote(sym);
        if (quote) {
          return {
            symbol: sym,
            price: quote.c,
            change: quote.dp
          };
        }
        // Mock fallback if API fails or no key
        return {
          symbol: sym,
          price: 100 + Math.random() * 500,
          change: (Math.random() * 6) - 3
        };
      })
    );
    setStocks(results);
  }, [symbols]);

  useEffect(() => {
    refreshData();
    // Refresh every 60 seconds to respect Finnhub free tier limits
    const interval = setInterval(refreshData, 60000);
    return () => clearInterval(interval);
  }, [refreshData]);

  // Subtle price oscillation between refreshes for "live" feel
  useEffect(() => {
    const subInterval = setInterval(() => {
      setStocks(prev => prev.map(s => ({
        ...s,
        price: s.price + (Math.random() * 0.04 - 0.02)
      })));
    }, 3000);
    return () => clearInterval(subInterval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-10 flex items-center bg-slate-950 border-b border-cyan-500/20 group">
      {/* Molten Cyan Filament Glow Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/20 to-cyan-500/10 animate-pulse"></div>
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
      </div>

      <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
        {[...stocks, ...stocks].map((stock, i) => (
          <div key={`${stock.symbol}-${i}`} className="inline-flex items-center mx-8 gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/50">{stock.symbol}</span>
            <span className="text-sm font-bold text-white tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${stock.change >= 0 ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'text-rose-400 drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]'}`}>
              {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)}%
            </span>
            
            {/* Visual separator "Cyan Molten Filament" */}
            <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-500/40 via-blue-200/60 to-cyan-500/40 rounded-full blur-[1px]"></div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default StockTicker;
