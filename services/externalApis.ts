
/**
 * External API Service for Finnhub.io
 * Directly provides real-time market news and stock telemetry.
 */

// Safe helper to access environment variables without throwing ReferenceError
const getSafeEnv = (key: string): string => {
  try {
    // Check for process existence safely
    if (typeof process !== 'undefined' && process.env) {
      // Use literal access for common bundlers to replace at build time
      if (key === 'FINNHUB_API_KEY') return process.env.FINNHUB_API_KEY || 'd63a8u1r01qnpqg0cgigd63a8u1r01qnpqg0cgj0';
      if (key === 'API_KEY') return process.env.API_KEY || '22cb06a6-e48c-44c9-a631-aae28215a4bb';
    }
  } catch (e) {
    // Fallback if process.env is not accessible
  }
  return '';
};

const getFinnhubKey = (): string => {
  return localStorage.getItem('FINNHUB_API_KEY') || getSafeEnv('FINNHUB_API_KEY') || '';
};

/**
 * Fetches news from Finnhub. Supports general categories or specific company news if query is a ticker.
 */
export const fetchFinnhubNews = async (query: string = 'general'): Promise<FinnhubNewsItem[]> => {
  const key = getFinnhubKey();
  if (!key) {
    console.warn("FINNHUB_API_KEY missing. Providing simulation data.");
    return MOCK_FINNHUB;
  }

  const cleanQuery = query.trim().toUpperCase();

  try {
    // Check if query is a potential stock symbol (1-5 characters)
    if (/^[A-Z1-9]{1,5}$/.test(cleanQuery)) {
      const to = Math.floor(Date.now() / 1000);
      const from = to - (60 * 24 * 60 * 60); // Look back 60 days for company news
      const response = await fetch(
        `https://finnhub.io/api/v1/company-news?symbol=${cleanQuery}&from=${from}&to=${to}&token=${key}`
      );
      const data = await response.json();
      return Array.isArray(data) ? data : MOCK_FINNHUB;
    }

    // Otherwise, treat as a category or default to general
    const validCategories = ['general', 'forex', 'crypto', 'merger'];
    const category = validCategories.includes(query.toLowerCase()) ? query.toLowerCase() : 'general';
    const response = await fetch(
      `https://finnhub.io/api/v1/news?category=${category}&token=${key}`
    );
    const data = await response.json();
    return Array.isArray(data) ? data : MOCK_FINNHUB;
  } catch (error) {
    console.error("Failed to fetch news from Finnhub", error);
    return MOCK_FINNHUB;
  }
};

export const fetchStockHistory = async (ticker: string): Promise<number[]> => {
  const key = getFinnhubKey();
  if (!key) {
    const seed = ticker.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Array.from({ length: 7 }, (_, i) => 150 + Math.sin(seed + i) * 10 + (i * 2));
  }

  try {
    const to = Math.floor(Date.now() / 1000);
    const from = to - (7 * 24 * 60 * 60); 
    
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${from}&to=${to}&token=${key}`
    );
    const data = await response.json();
    
    if (data.s === 'ok' && Array.isArray(data.c)) {
      return data.c; 
    }
    return [];
  } catch (error) {
    console.error(`Failed to fetch stock data for ${ticker}`, error);
    return [];
  }
};

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

const MOCK_FINNHUB: FinnhubNewsItem[] = [
  {
    category: "general",
    datetime: Date.now() / 1000,
    headline: "Tesla Expands Gigafactory Production in Europe",
    id: 101,
    image: "",
    related: "TSLA",
    source: "Finnhub Analytics",
    summary: "Production capacity is expected to increase by 20% by the end of the fiscal year, boosting local delivery speed.",
    url: "https://example.com/tsla-news"
  },
  {
    category: "general",
    datetime: Date.now() / 1000,
    headline: "Global Semiconductor Supply Stabilizes After Two Years",
    id: 102,
    image: "",
    related: "NVDA",
    source: "Tech Finance",
    summary: "New manufacturing plants in Ohio and Arizona are beginning to output significant volume for the automotive industry.",
    url: "https://example.com/semi-news"
  }
];
