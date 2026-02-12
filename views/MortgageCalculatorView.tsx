
import React, { useState, useMemo } from 'react';
import { analyzeMortgage } from '../services/gemini';

const MortgageCalculatorView: React.FC = () => {
  const [price, setPrice] = useState<number>(450000);
  const [down, setDown] = useState<number>(90000);
  const [rate, setRate] = useState<number>(6.5);
  const [term, setTerm] = useState<number>(30);
  const [propertyTax, setPropertyTax] = useState<number>(1.2);
  const [insurance, setInsurance] = useState<number>(1500);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');

  const stats = useMemo(() => {
    const principal = price - down;
    const monthlyRate = rate / 100 / 12;
    const n = term * 12;

    const monthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const monthlyTax = (price * (propertyTax / 100)) / 12;
    const monthlyInsurance = insurance / 12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance;

    return {
      principal,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      totalMonthly,
      totalPayment: totalMonthly * n,
      downPercent: (down / price) * 100
    };
  }, [price, down, rate, term, propertyTax, insurance]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis('');
    try {
      const res = await analyzeMortgage(price, down, rate, term, stats.monthlyPI);
      setAnalysis(res);
    } catch (e) {
      setAnalysis("Mortgage analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Mortgage Affordability Lab</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Calculate your real monthly costs and receive AI guidance on home ownership strategy.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold mb-8 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-600 rounded-full"></span>
              Loan Details
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Home Price ($)</label>
                <input 
                  type="number" value={price} onChange={e => setPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Down Payment ($)</label>
                <div className="flex gap-4">
                    <input 
                    type="number" value={down} onChange={e => setDown(Number(e.target.value))}
                    className="flex-grow bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                    />
                    <div className="bg-slate-100 dark:bg-slate-800 flex items-center justify-center px-4 rounded-2xl text-[10px] font-black text-slate-500">
                        {stats.downPercent.toFixed(1)}%
                    </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Interest Rate (%)</label>
                  <input 
                    type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Loan Term (Yrs)</label>
                  <select 
                    value={term} onChange={e => setTerm(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all appearance-none"
                  >
                    <option value={30}>30 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={15}>15 Years</option>
                    <option value={10}>10 Years</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Property Tax (%)</label>
                <input 
                  type="number" step="0.1" value={propertyTax} onChange={e => setPropertyTax(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Dashboard */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Estimated Monthly Total</p>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">${stats.totalMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
              <div className="mt-8 space-y-3">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Principal & Interest</span>
                    <span className="font-bold text-slate-900 dark:text-white">${stats.monthlyPI.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Property Taxes</span>
                    <span className="font-bold text-slate-900 dark:text-white">${stats.monthlyTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Home Insurance</span>
                    <span className="font-bold text-slate-900 dark:text-white">${stats.monthlyInsurance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                 </div>
              </div>
            </div>
            
            <div className="bg-emerald-900 dark:bg-emerald-950 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
               <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-2">Loan Principal</p>
               <h2 className="text-4xl font-black mb-4">${stats.principal.toLocaleString()}</h2>
               <div className="flex items-center gap-2 text-xs font-bold text-emerald-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Based on {stats.downPercent.toFixed(1)}% Down Payment
               </div>
            </div>
          </div>

          {/* AI Analysis Section */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
             <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 font-black text-2xl">F</div>
                      <div>
                         <h3 className="text-2xl font-bold tracking-tight">Finny's Mortgage Audit</h3>
                         <p className="text-slate-400 text-xs tracking-tight uppercase font-black">AI Risk & Opportunity Simulation</p>
                      </div>
                   </div>
                   <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-50"
                   >
                     {isAnalyzing ? 'Scanning Markets...' : 'Extract AI Roadmap'}
                   </button>
                </div>

                <div className="min-h-[220px] bg-white/5 rounded-[2.5rem] p-8 border border-white/10">
                   {isAnalyzing ? (
                      <div className="h-full flex flex-col items-center justify-center py-12 gap-4">
                         <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-emerald-400 font-bold animate-pulse tracking-widest uppercase text-[10px]">Analyzing debt-to-income ratios...</p>
                      </div>
                   ) : analysis ? (
                      <div className="prose prose-invert prose-emerald max-w-none text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
                         {analysis}
                      </div>
                   ) : (
                      <div className="text-center py-12 text-slate-500 italic">
                         Enter your home loan parameters and let Gemini audit your mortgage for long-term financial health.
                      </div>
                   )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculatorView;
