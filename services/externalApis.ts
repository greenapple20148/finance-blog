
/**
 * External Data Simulation Service
 * Provides high-fidelity simulated market data and news.
 */

export interface FinnhubNewsItem {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export interface StockQuote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High
  l: number;  // Low
  o: number;  // Open
  pc: number; // Previous close
}

/**
 * Returns simulated news items based on a preset library of financial updates.
 */
export const fetchFinnhubNews = async (query: string = 'general'): Promise<FinnhubNewsItem[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  return [
    {
      category: "general",
      datetime: Date.now() / 1000,
      headline: "Treasury Yields Stabilize as Inflation Signals Soften",
      id: 201,
      image: "",
      related: "SPY",
      source: "CNBC",
      summary: "Market participants are recalibrating expectations for H2 as consumer price indices show consistent cooling trends in key sectors.",
      url: "https://www.cnbc.com/economy/"
    },
    {
      category: "general",
      datetime: Date.now() / 1000,
      headline: "Artificial Intelligence Compute Demand Reaches New Quarterly Peak",
      id: 202,
      image: "",
      related: "NVDA",
      source: "Reuters",
      summary: "Hyperscalers continue to accelerate infrastructure deployment, driving double-digit growth in specialized hardware procurement.",
      url: "https://www.reuters.com/technology/"
    },
    {
      category: "general",
      datetime: Date.now() / 1000,
      headline: "Consumer Sentiment Index Rises on Improved Labor Market Outlook",
      id: 203,
      image: "",
      related: "WMT",
      source: "Bloomberg",
      summary: "Real-time tracking of retail transactions suggests a shift towards value-oriented spending and increased savings rates.",
      url: "https://www.bloomberg.com/markets"
    },
    {
      category: "general",
      datetime: Date.now() / 1000,
      headline: "Renewable Energy Infrastructure Bonds See Record Inflows",
      id: 204,
      image: "",
      related: "ICLN",
      source: "WSJ",
      summary: "ESG-focused capital is increasingly targeting long-duration grid modernization projects following new legislative incentives.",
      url: "https://www.wsj.com/market-data"
    },
    {
      category: "general",
      datetime: Date.now() / 1000,
      headline: "Global Central Banks Signal Divergent Rate Paths for 2025",
      id: 205,
      image: "",
      related: "QQQ",
      source: "Financial Times",
      summary: "Inflation dynamics in Europe vs North America lead to varying timelines for quantitative tightening measures.",
      url: "https://www.ft.com/markets"
    },
    {
      category: "general",
      datetime: Date.now() / 1000,
      headline: "Semiconductor Supply Chains Modernize with Localized Foundries",
      id: 206,
      image: "",
      related: "TSM",
      source: "MarketWatch",
      summary: "The shift toward domestic production gains momentum as logistical costs and geopolitical risks reshape industrial planning.",
      url: "https://www.marketwatch.com/latest-news"
    }
  ];
};

/**
 * Returns a simulated quote for a symbol.
 */
export const fetchStockQuote = async (symbol: string): Promise<StockQuote | null> => {
  const seed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const basePrice = (seed % 500) + 50;
  const vol = (seed % 10) / 100; // 0-10% volatility
  
  const currentPrice = basePrice + (Math.random() * basePrice * vol);
  const prevClose = basePrice;
  const change = currentPrice - prevClose;
  const percentChange = (change / prevClose) * 100;

  return {
    c: currentPrice,
    d: change,
    dp: percentChange,
    h: currentPrice * 1.02,
    l: currentPrice * 0.98,
    o: prevClose,
    pc: prevClose
  };
};

/**
 * Returns simulated 7-day price history.
 */
export const fetchStockHistory = async (ticker: string): Promise<number[]> => {
  const seed = ticker.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const base = 150 + (seed % 200);
  return Array.from({ length: 7 }, (_, i) => base + Math.sin(seed + i) * 10 + (i * 2));
};
