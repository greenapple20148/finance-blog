
import React, { useState } from 'react';
import TaxCalculatorView from './TaxCalculatorView';
import InvestmentCalculatorView from './InvestmentCalculatorView';
import DebtManagerView from './DebtManagerView';
import FortyOneKCalculatorView from './FortyOneKCalculatorView';
import FutureValueAnnuityView from './FutureValueAnnuityView';
import MortgageCalculatorView from './MortgageCalculatorView';
import AmortizationCalculatorView from './AmortizationCalculatorView';
import FiveTwoNineCalculatorView from './FiveTwoNineCalculatorView';

const ToolsView: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'tax' | 'investment' | 'debt' | '401k' | 'annuity' | 'mortgage' | 'amortization' | '529'>('investment');

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Compliance Notice */}
        <div className="mb-10 p-5 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-3xl flex items-start gap-4 shadow-sm animate-in fade-in duration-1000">
          <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
             <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">AI-Powered Simulation Lab</h4>
             <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                These tools use mathematical models and Google Gemini AI to provide strategic projections. All calculations are <strong>session-based</strong> and do not store your personal data. Results are estimates and should not be used as professional financial or tax dictates.
             </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12 bg-white dark:bg-slate-900 p-2 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 self-start inline-flex transition-all overflow-x-auto no-scrollbar max-w-full">
          <button 
            onClick={() => setActiveTool('investment')}
            className={`whitespace-nowrap flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${
              activeTool === 'investment' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
              : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            Investment
          </button>
          <button 
            onClick={() => setActiveTool('529')}
            className={`whitespace-nowrap flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${
              activeTool === '529' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
              : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
            529 Plan
          </button>
          <button 
            onClick={() => setActiveTool('annuity')}
            className={`whitespace-nowrap flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${
              activeTool === 'annuity' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
              : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Annuity Lab
          </button>
          <button 
            onClick={() => setActiveTool('mortgage')}
            className={`whitespace-nowrap flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${
              activeTool === 'mortgage' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
              : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Mortgage
          </button>
          <button 
            onClick={() => setActiveTool('amortization')}
            className={`whitespace-nowrap flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${
              activeTool === 'amortization' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
              : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Amortization
          </button>
          <button 
            onClick={() => setActiveTool('401k')}
            className={`whitespace-nowrap flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${
              activeTool === '401k' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
              : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            401(k) Lab
          </button>
          <button 
            onClick={() => setActiveTool('debt')}
            className={`whitespace-nowrap flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${
              activeTool === 'debt' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
              : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Debt Exit
          </button>
          <button 
            onClick={() => setActiveTool('tax')}
            className={`whitespace-nowrap flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${
              activeTool === 'tax' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
              : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            Tax Strategy
          </button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {activeTool === 'tax' && <TaxCalculatorView />}
          {activeTool === 'investment' && <InvestmentCalculatorView />}
          {activeTool === 'debt' && <DebtManagerView />}
          {activeTool === '401k' && <FortyOneKCalculatorView />}
          {activeTool === 'annuity' && <FutureValueAnnuityView />}
          {activeTool === 'mortgage' && <MortgageCalculatorView />}
          {activeTool === 'amortization' && <AmortizationCalculatorView />}
          {activeTool === '529' && <FiveTwoNineCalculatorView />}
        </div>
      </div>
    </div>
  );
};

export default ToolsView;
