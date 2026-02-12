
import React, { useState, useMemo } from 'react';
import { analyzeFortyOneK } from '../services/gemini';

const FortyOneKCalculatorView: React.FC = () => {
  const [salary, setSalary] = useState<number>(100000);
  const [contribution, setContribution] = useState<number>(4); // Defaulted lower to show optimization potential
  const [match, setMatch] = useState<number>(50);
  const [matchLimit, setMatchLimit] = useState<number>(6);
  const [currentBalance, setCurrentBalance] = useState<number>(25000);
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(30);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');

  const stats = useMemo(() => {
    const annualContrib = salary * (contribution / 100);
    
    // Standard match formula: matching X% of contributions up to Y% of salary
    // Match = min(contribution%, matchLimit%) * salary * (matchRate/100)
    const effectiveMatchPercent = Math.min(contribution, matchLimit);
    const annualMatch = salary * (effectiveMatchPercent / 100) * (match / 100);
    const totalAnnualInvestment = annualContrib + annualMatch;
    
    // Max possible match if they contribute at least matchLimit
    const maxPossibleMatch = salary * (matchLimit / 100) * (match / 100);
    const isFullMatch = contribution >= matchLimit;
    const matchShortfall = maxPossibleMatch - annualMatch;

    const r = rate / 100 / 12;
    const n = years * 12;
    const monthlyInvest = totalAnnualInvestment / 12;

    const fvBalance = currentBalance * Math.pow(1 + r, n);
    const fvAnnuity = r === 0 ? (monthlyInvest * n) : (monthlyInvest * ((Math.pow(1 + r, n) - 1) / r));
    const totalValue = fvBalance + fvAnnuity;

    const totalPersonal = annualContrib * years + currentBalance;
    const totalEmployer = annualMatch * years;
    const totalInterest = totalValue - totalPersonal - totalEmployer;

    return {
      totalValue,
      totalPersonal,
      totalEmployer,
      totalInterest,
      annualMatch,
      annualContrib,
      maxPossibleMatch,
      isFullMatch,
      matchShortfall,
      contributionTowardsMatch: Math.min(contribution, matchLimit)
    };
  }, [salary, contribution, match, matchLimit, currentBalance, rate, years]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis('');
    try {
      const res = await analyzeFortyOneK(salary, contribution, match, matchLimit, currentBalance, rate, years, stats.totalValue);
      setAnalysis(res);
    } catch (e) {
      setAnalysis("Retirement analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">401(k) Strategy Lab</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Engineer your ultimate retirement nest egg with precision matching and AI foresight.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Inputs Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold mb-8 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-600 rounded-full"></span>
              Plan Parameters
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Annual Gross Salary ($)</label>
                <input 
                  type="number" value={salary} onChange={e => setSalary(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Contrib (%)</label>
                  <input 
                    type="number" value={contribution} onChange={e => setContribution(Number(e.target.value))}
                    className={`w-full bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all ${!stats.isFullMatch ? 'border-amber-400/30' : 'border-transparent focus:border-emerald-500'}`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Match Rate (%)</label>
                  <input 
                    type="number" value={match} onChange={e => setMatch(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Employer Limit (% of salary)</label>
                <input 
                  type="number" value={matchLimit} onChange={e => setMatchLimit(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Market Return (%)</label>
                    <input 
                      type="number" value={rate} onChange={e => setRate(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Horizon (Years)</label>
                    <input 
                      type="number" value={years} onChange={e => setYears(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                    />
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-900 dark:bg-emerald-950 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl transition-transform group-hover:scale-110"></div>
             <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-2">Portfolio Net Gain</p>
             <h2 className="text-4xl font-black mb-4">${(stats.totalValue - stats.totalPersonal).toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
             <div className="flex items-center gap-2 text-xs font-bold text-emerald-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                Compound Interest & Match
             </div>
          </div>
        </div>

        {/* Dashboard Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Stats */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-full -mr-16 -mt-16 blur-2xl opacity-50"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Projected Retirement Value</p>
                <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">${stats.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
              </div>
              <div className="flex gap-8">
                <div className="text-right">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Personal Contrib.</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">${stats.annualContrib.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Employer Match</p>
                  <p className="text-xl font-bold text-emerald-600">${stats.annualMatch.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* NEW: Employer Match Optimizer Visual */}
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                   Employer Match Optimizer
                   {stats.isFullMatch ? (
                      <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">Full Match Secured</span>
                   ) : (
                      <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-amber-500/20">Optimization Needed</span>
                   )}
                </h3>
             </div>

             <div className="space-y-10">
                <div className="space-y-4">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Contribution Match Progress</span>
                      <span className={stats.isFullMatch ? 'text-emerald-600' : 'text-amber-500'}>
                        {contribution}% of {matchLimit}% limit
                      </span>
                   </div>
                   <div className="relative h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                      {/* Full match target line */}
                      <div className="absolute top-0 bottom-0 w-1 bg-slate-400/30 z-10" style={{ left: '100%' }}></div>
                      
                      {/* Actual progress */}
                      <div 
                        className={`h-full transition-all duration-1000 ease-out ${stats.isFullMatch ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-400 to-amber-500'}`} 
                        style={{ width: `${Math.min((contribution / matchLimit) * 100, 100)}%` }}
                      >
                         <div className="h-full w-full bg-white/20 animate-shimmer"></div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Current Match</p>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">${stats.annualMatch.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-slate-500 mt-1">per year</p>
                   </div>
                   <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Max Potential Match</p>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">${stats.maxPossibleMatch.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-slate-500 mt-1">based on salary</p>
                   </div>
                   <div className={`p-6 rounded-3xl border ${stats.isFullMatch ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800'}`}>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Strategy Note</p>
                      {stats.isFullMatch ? (
                         <>
                            <p className="text-lg font-black text-emerald-700 dark:text-emerald-400">Peak Efficiency</p>
                            <p className="text-[10px] font-bold text-emerald-600/70 mt-1">No capital left behind.</p>
                         </>
                      ) : (
                         <>
                            <p className="text-lg font-black text-amber-700 dark:text-amber-400">-${stats.matchShortfall.toLocaleString()} Lost</p>
                            <p className="text-[10px] font-bold text-amber-600/70 mt-1">Increase to {matchLimit}% to claim.</p>
                         </>
                      )}
                   </div>
                </div>
             </div>
          </div>

          {/* Breakdown Bars */}
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">Total Portfolio Composition</h3>
            <div className="space-y-8">
               <div className="space-y-3">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                     <span>Personal Capital</span>
                     <span className="text-slate-900 dark:text-white">${stats.totalPersonal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-slate-400 transition-all duration-1000" style={{ width: `${(stats.totalPersonal / stats.totalValue) * 100}%` }}></div>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-emerald-500">
                     <span>Employer Contributions</span>
                     <span className="text-emerald-600 font-black">${stats.totalEmployer.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(stats.totalEmployer / stats.totalValue) * 100}%` }}></div>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-indigo-500">
                     <span>Compound Interest</span>
                     <span className="text-indigo-600 font-black">${stats.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${(stats.totalInterest / stats.totalValue) * 100}%` }}></div>
                  </div>
               </div>
            </div>
          </div>

          {/* AI Insight Section */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
             <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 font-black text-2xl shadow-lg">F</div>
                      <div>
                         <h3 className="text-2xl font-bold tracking-tight">Finny's Retirement Audit</h3>
                         <p className="text-slate-400 text-[10px] tracking-widest uppercase font-black">AI Powered Portfolio Simulation</p>
                      </div>
                   </div>
                   <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-50"
                   >
                     {isAnalyzing ? 'Decoding Plan...' : 'Extract AI Roadmap'}
                   </button>
                </div>

                <div className="min-h-[220px] bg-white/5 rounded-[2.5rem] p-8 border border-white/10 backdrop-blur-md">
                   {isAnalyzing ? (
                      <div className="h-full flex flex-col items-center justify-center py-12 gap-4">
                         <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-emerald-400 font-bold animate-pulse tracking-widest uppercase text-[10px]">Simulating market cycles & inflation impact...</p>
                      </div>
                   ) : analysis ? (
                      <div className="prose prose-invert prose-emerald max-w-none text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
                         {analysis}
                      </div>
                   ) : (
                      <div className="text-center py-12 text-slate-500 italic font-medium">
                         Populate your 401(k) details and let Gemini audit your retirement strategy for efficiency, match optimization, and long-term sustainability.
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

export default FortyOneKCalculatorView;
