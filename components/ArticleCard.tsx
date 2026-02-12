
import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onClick: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <div 
      onClick={() => onClick(article.id)}
      className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 dark:border-slate-700/50 flex flex-col"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <meta itemProp="mainEntityOfPage" content={`https://fintools.tech/blog/${article.id}`} />
      <div className="aspect-[16/10] overflow-hidden relative">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          itemProp="image"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg" itemProp="articleSection">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">
          <time itemProp="datePublished" dateTime={new Date(article.date).toISOString().split('T')[0]}>{article.date}</time>
          <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
          <span>{article.readTime} read</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight" itemProp="headline">
          {article.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed" itemProp="description">
          {article.excerpt}
        </p>
        <div className="pt-6 border-t border-slate-50 dark:border-slate-700/50 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-tight" itemProp="author" itemScope itemType="https://schema.org/Person">
            By <span itemProp="name">{article.author}</span>
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
