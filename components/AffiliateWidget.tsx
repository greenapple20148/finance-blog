
import React from 'react';

interface Product {
  name: string;
  type: string;
  perk: string;
  cta: string;
  brandColor: string;
  url: string;
}

const PRODUCTS: Product[] = [
  { 
    name: 'SoFi Savings', 
    type: 'HYSA', 
    perk: 'Up to 4.60% APY', 
    cta: 'Open Account', 
    brandColor: 'bg-blue-600',
    url: 'https://www.sofi.com/banking/'
  },
  { 
    name: 'Fidelity', 
    type: 'Brokerage', 
    perk: '$0 Fee Index Funds', 
    cta: 'Start Investing', 
    brandColor: 'bg-emerald-700',
    url: 'https://www.fidelity.com/trading/overview'
  },
  { 
    name: 'Chase Freedom', 
    type: 'Credit Card', 
    perk: 'Unlimited 1.5% Back', 
    cta: 'Apply Now', 
    brandColor: 'bg-blue-800',
    url: 'https://creditcards.chase.com/freedom-cards'
  }
];

const AffiliateWidget: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white tracking-tight">Editor's Picks</h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tested & Verified</p>
        </div>
      </div>

      <div className="space-y-4">
        {PRODUCTS.map((p, idx) => (
          <div key={idx} className="group p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-transparent hover:border-emerald-500/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">{p.type}</span>
                <h5 className="font-bold text-slate-900 dark:text-white">{p.name}</h5>
              </div>
              <div className="px-2 py-1 bg-white dark:bg-slate-800 rounded text-[9px] font-bold text-slate-400 border border-slate-100 dark:border-slate-700">
                Top Rated
              </div>
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-5">{p.perk}</p>
            <a 
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-3 rounded-2xl text-white text-[10px] text-center font-black uppercase tracking-[0.15em] transition-all shadow-lg active:scale-95 ${p.brandColor} hover:opacity-90`}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[9px] text-slate-400 font-medium text-center leading-relaxed italic">
        *Disclaimer: We may receive compensation from the companies featured above.
      </p>
    </div>
  );
};

export default AffiliateWidget;
