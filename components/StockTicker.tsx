
import React, { useEffect, useState, useCallback } from 'react';
import { fetchStockQuote } from '../services/externalApis';
import { getMarketSentiment } from '../services/gemini';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  sentiment?: string;
}

const DEFAULT_STOCKS = ['SPY', 'QQQ', 'DIA', 'BTC', 'ETH', 'TSLA', 'AAPL', 'NVDA', 'MSFT', 'GOOGL'];

const StockTicker: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [marketBias, setMarketBias] = useState<'bullish' | 'bearish' | 'neutral'>('neutral');
  const [symbols, setSymbols] = useState<string[]>(() => {
    const saved = localStorage.getItem('TICKER_SYMBOLS');
    return saved ? JSON.parse(saved) : DEFAULT_STOCKS;
  });

  // Sync symbols from localStorage
  useEffect(() => {
    const syncSymbols = () => {
      const saved = localStorage.getItem('TICKER_SYMBOLS');
      const combined = saved ? JSON.parse(saved) : [...DEFAULT_STOCKS];
      setSymbols(combined);
    };

    syncSymbols();
    window.addEventListener('ticker-updated', syncSymbols);
    return () => window.removeEventListener('ticker-updated', syncSymbols);
  }, []);

  const refreshData = useCallback(async () => {
    const results = await Promise.all(
      symbols.map(async (sym) => {
        const quote = await fetchStockQuote(sym);
        let price = quote ? quote.c : (100 + Math.random() * 500);
        let change = quote ? quote.dp : ((Math.random() * 6) - 3);
        
        // AI Sentiment (randomly sampled to manage rate limits)
        let sentiment = "STABLE";
        if (Math.random() > 0.7) {
           sentiment = await getMarketSentiment(sym, price, change);
        }

        return {
          symbol: sym,
          price,
          change,
          sentiment
        };
      })
    );

    // Calculate overall market bias based on simulated data
    const avgChange = results.reduce((acc, curr) => acc + curr.change, 0) / results.length;
    if (avgChange > 0.5) setMarketBias('bullish');
    else if (avgChange < -0.5) setMarketBias('bearish');
    else setMarketBias('neutral');

    setStocks(results);
  }, [symbols]);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 60000);
    return () => clearInterval(interval);
  }, [refreshData]);

  // Subtle price oscillation for visual interest
  useEffect(() => {
    const subInterval = setInterval(() => {
      setStocks(prev => prev.map(s => ({
        ...s,
        price: s.price + (Math.random() * 0.1 - 0.05)
      })));
    }, 2000);
    return () => clearInterval(subInterval);
  }, []);

  const getGlowColor = () => {
    if (marketBias === 'bullish') return 'via-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.8)]';
    if (marketBias === 'bearish') return 'via-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.8)]';
    return 'via-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.8)]';
  };

  return (
    <div className={`relative w-full overflow-hidden h-10 flex items-center bg-slate-950 border-b transition-colors duration-1000 ${
      marketBias === 'bullish' ? 'border-emerald-500/20' : 
      marketBias === 'bearish' ? 'border-rose-500/20' : 
      'border-cyan-500/20'
    }`}>
      {/* Dynamic Molten Glow Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${getGlowColor()} to-transparent animate-pulse`}></div>
        <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${
          marketBias === 'bullish' ? 'via-emerald-400' : 
          marketBias === 'bearish' ? 'via-rose-400' : 
          'via-cyan-400'
        } to-transparent`}></div>
      </div>

      <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
        {[...stocks, ...stocks].map((stock, i) => (
          <div key={`${stock.symbol}-${i}`} className="inline-flex items-center mx-8 gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stock.symbol}</span>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight">
                ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-1 ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)}%
              </span>
            </div>

            {stock.sentiment && (
              <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border tracking-widest ${
                stock.change >= 0 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}>
                {stock.sentiment}
              </span>
            )}
            
            <div className={`w-12 h-[2px] bg-gradient-to-r from-transparent ${
              stock.change >= 0 ? 'via-emerald-500/40' : 'via-rose-500/40'
            } to-transparent rounded-full blur-[1px]`}></div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 80s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default StockTicker;
