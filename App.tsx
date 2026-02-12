
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Home from './views/Home';
import ArticleView from './views/ArticleView';
import PlannerView from './views/PlannerView';
import ToolsView from './views/ToolsView';
import NewsView from './views/NewsView';
import DisclaimerView from './views/DisclaimerView';
import PrivacyView from './views/PrivacyView';
import TermsOfServiceView from './views/TermsOfServiceView';
import ContactView from './views/ContactView';
import ChatWidget from './components/ChatWidget';
import CookieBanner from './components/CookieBanner';
import SubscribeModal from './components/SubscribeModal';
import { ARTICLES } from './constants';
import ArticleCard from './components/ArticleCard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const selectedArticle = ARTICLES.find(a => a.id === selectedArticleId);

  // Dynamic SEO Title & Meta Management
  useEffect(() => {
    let title = 'FinBlog | AI-Powered Personal Finance';
    let description = 'Master your money with FinBlog AI. Free financial tools, news, and insights.';

    if (selectedArticle) {
      title = `${selectedArticle.title} | FinBlog`;
      description = selectedArticle.excerpt;
    } else {
      switch (activeTab) {
        case 'news':
          title = 'Real-time Financial News & AI Analysis | FinBlog';
          description = 'Stay ahead with the latest capital market signals curated directly from institutional sources.';
          break;
        case 'tools':
          title = 'AI Financial Tools & Calculators | FinBlog';
          description = 'Free AI-powered calculators for 401(k), 529 plans, taxes, and investments.';
          break;
        case 'planner':
          title = 'AI Capital Planner | Strategic Cash Flow | FinBlog';
          description = 'Map your cash flow and receive high-level strategic optimization from Gemini.';
          break;
        case 'blog':
          title = 'Financial Knowledge Library | FinBlog';
          description = 'Deep dives into the mechanics of wealth building and strategic tax planning.';
          break;
      }
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
  }, [activeTab, selectedArticle]);

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setSelectedArticleId(null);
    window.scrollTo(0, 0);
  };

  const handleSelectArticle = (id: string) => {
    setSelectedArticleId(id);
    setActiveTab('blog');
    window.scrollTo(0, 0);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Analytics />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Layout 
          activeTab={activeTab} 
          onNavigate={handleNavigate} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onSubscribeClick={() => setIsSubscribeModalOpen(true)}
        >
          {activeTab === 'home' && (
            <Home 
              onSelectArticle={handleSelectArticle} 
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'blog' && (
            selectedArticle ? (
              <ArticleView 
                article={selectedArticle} 
                onBack={() => setSelectedArticleId(null)} 
              />
            ) : (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <header className="mb-16 text-center">
                  <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter">Knowledge Library</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                    Deep dives into the mechanics of wealth building and strategic tax planning.
                  </p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {ARTICLES.map(article => (
                    <ArticleCard key={article.id} article={article} onClick={handleSelectArticle} />
                  ))}
                </div>
              </div>
            )
          )}

          {activeTab === 'news' && <NewsView />}
          {activeTab === 'tools' && <ToolsView />}
          {activeTab === 'planner' && <PlannerView />}
          {activeTab === 'disclaimer' && <DisclaimerView />}
          {activeTab === 'privacy' && <PrivacyView />}
          {activeTab === 'tos' && <TermsOfServiceView />}
          {activeTab === 'contact' && <ContactView />}

          <ChatWidget />
          <CookieBanner />
          <SubscribeModal isOpen={isSubscribeModalOpen} onClose={() => setIsSubscribeModalOpen(false)} />
        </Layout>
      </div>
    </div>
  );
};

export default App;
