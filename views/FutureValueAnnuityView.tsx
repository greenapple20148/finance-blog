
import React, { useState, useMemo } from 'react';
import { analyzeAnnuity } from '../services/gemini';

const FutureValueAnnuityView: React.FC = () => {
  const [monthly, setMonthly] = useState<number>(1000);
  const [rate, setRate] = useState<number>(8);
  const [years, setYears] = useState<number>(25);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');

  const stats = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    
    // Yearly data for chart
    const chartData = [];
    for (let i = 0; i <= years; i++) {
      const currentN = i * 12;
      const fv = r === 0 ? (monthly * currentN) : (monthly * ((Math.pow(1 + r, currentN) - 1) / r));
      const totalContributed = monthly * currentN;
      chartData.push({ year: i, total: fv, contributed: totalContributed });
    }

    const final = chartData[chartData.length - 1];
    const totalInterest = final.total - final.contributed;

    return {
      totalValue: final.total,
      totalContributed: final.contributed,
      totalInterest,
      chartData
    };
  }, [monthly, rate, years]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis('');
    try {
      const res = await analyzeAnnuity(monthly, rate, years, stats.totalValue);
      setAnalysis(res);
    } catch (e) {
      setAnalysis("Annuity analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // SVG Chart Helper
  const renderChart = () => {
    const width = 800;
    const height = 300;
    const padding = 40;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;

    const maxVal = Math.max(...stats.chartData.map(d => d.total));
    const getX = (year: number) => padding + (year / years) * chartW;
    const getY = (val: number) => (height - padding) - (val / maxVal) * chartH;

    const totalPath = stats.chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.year)} ${getY(d.total)}`).join(' ');
    const contributedPath = stats.chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.year)} ${getY(d.contributed)}`).join(' ');
    
    const totalArea = `${totalPath} L ${getX(years)} ${height - padding} L ${getX(0)} ${height - padding} Z`;
    const contributedArea = `${contributedPath} L ${getX(years)} ${height - padding} L ${getX(0)} ${height - padding} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-sm overflow-visible">
        <defs>
          <linearGradient id="totalAnnuityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="contribAnnuityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
        {/* Horizontal Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(p => (
          <line 
            key={p} 
            x1={padding} 
            y1={padding + p * chartH} 
            x2={width - padding} 
            y2={padding + p * chartH} 
            stroke="currentColor" 
            className="text-slate-100 dark:text-slate-800"
            strokeWidth="1" 
          />
        ))}

        {/* Areas */}
        <path d={totalArea} fill="url(#totalAnnuityGradient)" />
        <path d={contributedArea} fill="url(#contribAnnuityGradient)" />

        {/* Lines */}
        <path d={totalPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" className="transition-all duration-700" />
        <path d={contributedPath} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" className="transition-all duration-700" />

        {/* Labels */}
        <text x={padding} y={height - 10} fontSize="10" className="fill-slate-400 font-bold">Start</text>
        <text x={width - padding} y={height - 10} fontSize="10" className="fill-slate-400 font-bold" textAnchor="end">{years} Years</text>
      </svg>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Annuity Strategy Lab</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Project the long-term impact of consistent, periodic contributions with AI foresight.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold mb-8 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-600 rounded-full"></span>
              Flow Parameters
            </h3>
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Monthly Contribution ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    type="number" value={monthly} onChange={e => setMonthly(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl pl-8 pr-4 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Expected Annual Return ({rate}%)</label>
                <input 
                  type="range" min="0" max="20" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Time Horizon ({years} Years)</label>
                <input 
                  type="range" min="1" max="50" value={years} onChange={e => setYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-900 dark:bg-emerald-950 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl transition-transform group-hover:scale-110"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-2">Total Wealth Gained</p>
            <h2 className="text-4xl font-black mb-4">${stats.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
            <p className="text-xs font-medium text-emerald-100/60 leading-relaxed">
              This is the "pure growth" earned through compound interest on your periodic contributions.
            </p>
          </div>
        </div>

        {/* Dashboard Main Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                <div>
                   <p className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">Projected Future Value</p>
                   <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">${stats.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
                </div>
                <div className="flex gap-8">
                   <div className="text-right">
                      <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Contributed</p>
                      <p className="font-bold text-slate-600 dark:text-slate-400">${stats.totalContributed.toLocaleString()}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-emerald-500 text-[9px] font-black uppercase tracking-widest">Compound Int.</p>
                      <p className="font-bold text-emerald-600">+${stats.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                   </div>
                </div>
             </div>

             <div className="mb-12">
                {renderChart()}
             </div>

             <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Accumulation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-300 dark:bg-slate-700 rounded-full border-2 border-slate-200 dark:border-slate-600 border-dashed"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Principal Contribution</span>
                </div>
             </div>
          </div>

          {/* AI Strategy Module */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
             <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 font-black text-2xl">F</div>
                      <div>
                         <h3 className="text-2xl font-bold tracking-tight">Finny's Annuity Audit</h3>
                         <p className="text-slate-400 text-xs tracking-tight uppercase font-black">AI Powered Yield Simulation</p>
                      </div>
                   </div>
                   <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-50"
                   >
                     {isAnalyzing ? 'Simulating Cycles...' : 'Extract AI Roadmap'}
                   </button>
                </div>

                <div className="min-h-[220px] bg-white/5 rounded-[2.5rem] p-8 border border-white/10 backdrop-blur-md">
                   {isAnalyzing ? (
                      <div className="h-full flex flex-col items-center justify-center py-12 gap-4">
                         <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-emerald-400 font-bold animate-pulse tracking-widest uppercase text-[10px]">Calculating cost of procrastination & growth escalation...</p>
                      </div>
                   ) : analysis ? (
                      <div className="prose prose-invert prose-emerald max-w-none text-slate-300 font-medium leading-relaxed prose-p:mb-4">
                         <div className="whitespace-pre-wrap">{analysis}</div>
                      </div>
                   ) : (
                      <div className="text-center py-12 text-slate-500 italic font-medium">
                         Input your monthly savings target and click the roadmap button to see how Gemini evaluates your path to geometric wealth.
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

export default FutureValueAnnuityView;
