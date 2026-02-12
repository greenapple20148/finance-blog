
import React, { useState, useEffect, useCallback } from 'react';
import { NewsItem } from '../types';
import { fetchFinnhubNews, FinnhubNewsItem } from '../services/externalApis';
import { summarizeArticle } from '../services/gemini';

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
  const [combinedNews, setCombinedNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Summary states
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [summarizingIds, setSummarizingIds] = useState<Set<string>>(new Set());

  const loadNews = useCallback(async (query: string = 'general') => {
    setIsLoading(true);
    try {
      const fhData = await fetchFinnhubNews(query);

      // Map Finnhub to NewsItem
      const mappedFh: NewsItem[] = (fhData || []).map((item: FinnhubNewsItem) => ({
        id: `fh-${item.id}`,
        title: item.headline,
        source: item.source,
        excerpt: item.summary,
        url: item.url,
        ticker: item.related
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

  const handleSummarize = async (item: NewsItem) => {
    if (summaries[item.id] || summarizingIds.has(item.id)) return;
    
    setSummarizingIds(prev => new Set(prev).add(item.id));
    try {
      const summaryContent = `${item.title}\n\n${item.excerpt}`;
      const res = await summarizeArticle(summaryContent);
      setSummaries(prev => ({ ...prev, [item.id]: res }));
    } catch (e) {
      console.error("Summary failed", e);
      setSummaries(prev => ({ ...prev, [item.id]: "Unable to generate summary at this time." }));
    } finally {
      setSummarizingIds(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 transition-colors duration-300">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Market Intelligence</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Real-time capital market signals aggregated from global institutional sources.</p>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Real-Time News Feed</h2>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Live Stream
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
                 <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-800">
                    {item.source}
                 </span>
                 {item.ticker && (
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                      ${item.ticker}
                    </span>
                 )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
                {item.title}
              </h3>
              
              {/* AI Summary Box */}
              {summaries[item.id] ? (
                <div className="mb-6 p-5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.586 15.657l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414zM4.414 14.243l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414z" /></svg>
                    AI 3-Point Brief
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed space-y-2">
                    {summaries[item.id].split('\n').filter(l => l.trim()).slice(0, 3).map((line, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-emerald-500">•</span>
                        <span>{line.replace(/^[-*•\d.]\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 line-clamp-4 flex-grow font-medium leading-relaxed">
                  {item.excerpt}
                </p>
              )}

              <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-2"
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                  
                  {!summaries[item.id] && (
                    <button 
                      onClick={() => handleSummarize(item)}
                      disabled={summarizingIds.has(item.id)}
                      className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {summarizingIds.has(item.id) ? (
                        <div className="w-3 h-3 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.586 15.657l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414zM4.414 14.243l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414z" /></svg>
                      )}
                      AI Summary
                    </button>
                  )}
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
