
/**
 * External Data Service
 * Provides live market data and news using RSS feeds and simulated quotes.
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

const RSS_FEED_URL = 'https://finance.yahoo.com/news/rssindex';
const CORS_PROXY = 'https://api.allorigins.win/get?url=';

/**
 * Fetches live news items from Yahoo Finance RSS via a CORS proxy.
 */
export const fetchFinnhubNews = async (query: string = 'general'): Promise<FinnhubNewsItem[]> => {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(RSS_FEED_URL)}`);
    const data = await response.json();
    const xmlString = data.contents;
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const items = xmlDoc.querySelectorAll("item");
    
    const newsItems: FinnhubNewsItem[] = Array.from(items).map((item, index) => {
      const title = item.querySelector("title")?.textContent || "Market Update";
      const link = item.querySelector("link")?.textContent || "#";
      const description = item.querySelector("description")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const source = item.querySelector("source")?.textContent || "Yahoo Finance";
      
      // Clean up description (remove HTML if present)
      const cleanSummary = description.replace(/<[^>]*>?/gm, '').split('. ')[0] + '.';

      return {
        category: "general",
        datetime: pubDate ? new Date(pubDate).getTime() / 1000 : Date.now() / 1000,
        headline: title,
        id: index + 1000,
        image: "",
        related: "MARKET", // RSS doesn't always provide specific tickers easily
        source: source,
        summary: cleanSummary,
        url: link
      };
    });

    return newsItems;
  } catch (e) {
    console.error("RSS Fetch Error:", e);
    // Fallback to static data if the live feed fails
    return [
      {
        category: "general",
        datetime: Date.now() / 1000,
        headline: "Live Feed Interrupted: Using Cached Market Signals",
        id: 999,
        image: "",
        related: "SYSTEM",
        source: "FinBlog",
        summary: "We are currently experiencing connectivity issues with the live news server. Market analysis remains functional.",
        url: "#"
      }
    ];
  }
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
