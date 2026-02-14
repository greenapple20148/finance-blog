
import React, { useState, useEffect, useCallback } from 'react';
import { NewsItem } from '../types';
import { fetchFinnhubNews, FinnhubNewsItem } from '../services/externalApis';

const NewsSkeleton: React.FC = () => (
  <div className="shimmer-wrapper bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-full">
    <div className="flex justify-between items-start mb-6">
      <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse"></div>
      <div className="h-5 w-12 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse"></div>
    </div>
    <div className="space-y-3 mb-6">
      <div className="h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
      <div className="h-6 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
    </div>
    <div className="space-y-2 mb-8 flex-grow">
      <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-md animate-pulse"></div>
      <div className="h-3 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-md animate-pulse mt-2"></div>
    </div>
  </div>
);

const NewsView: React.FC = () => {
  const [combinedNews, setCombinedNews] = useState<(NewsItem & { datetime?: number })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadNews = useCallback(async (query: string = 'general') => {
    setIsLoading(true);
    try {
      const fhData = await fetchFinnhubNews(query);

      // Map Finnhub to NewsItem
      const mappedFh = (fhData || []).map((item: FinnhubNewsItem) => ({
        id: `fh-${item.id}`,
        title: item.headline,
        source: item.source,
        excerpt: item.summary,
        url: item.url,
        ticker: item.related,
        datetime: item.datetime
      }));

      setCombinedNews(mappedFh.slice(0, 24));
    } catch (e) {
      console.error("Failed to load news", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() / 1000) - timestamp);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 transition-colors duration-300">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Market Intelligence</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Real-time capital market signals aggregated from global institutional sources.</p>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Live RSS Signal Stream</h2>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Connected: Yahoo Finance
        </div>
      </div>

      {/* Market Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <NewsSkeleton key={i} />)
        ) : (
          combinedNews.map(item => (
            <div key={item.id} className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group h-full">
              <div className="flex justify-between items-start mb-6">
                 <div className="flex flex-col gap-1">
                    <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-800">
                        {item.source}
                    </span>
                    {item.datetime && (
                      <span className="text-[8px] font-bold text-slate-400 ml-1">
                        {getTimeAgo(item.datetime)}
                      </span>
                    )}
                 </div>
                 {item.ticker && (
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                      ${item.ticker}
                    </span>
                 )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-3 leading-tight group-hover:text-emerald-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 line-clamp-4 flex-grow font-medium leading-relaxed">
                {item.excerpt}
              </p>

              <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-2"
                  >
                    Full Intelligence Report
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {!isLoading && combinedNews.length === 0 && (
        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
           <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No signals found for this sector.</p>
        </div>
      )}
    </div>
  );
};

export default NewsView;
