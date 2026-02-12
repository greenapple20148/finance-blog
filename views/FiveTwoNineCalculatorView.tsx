
import React, { useState, useMemo } from 'react';
import { analyzeFiveTwoNine } from '../services/gemini';

const FiveTwoNineCalculatorView: React.FC = () => {
  const [childAge, setChildAge] = useState<number>(3);
  const [currentSavings, setCurrentSavings] = useState<number>(5000);
  const [annualContribution, setAnnualContribution] = useState<number>(3600);
  const [rate, setRate] = useState<number>(7);
  const [yearsUntilCollege, setYearsUntilCollege] = useState<number>(15);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');

  const stats = useMemo(() => {
    const r = rate / 100;
    const n = yearsUntilCollege;
    
    // Yearly data for chart
    const chartData = [];
    for (let i = 0; i <= n; i++) {
      // Future Value formula for annual compounding and annual contributions
      // FV = P(1+r)^t + PMT * [ ((1+r)^t - 1) / r ]
      const fvPrincipal = currentSavings * Math.pow(1 + r, i);
      const fvAnnuity = r === 0 ? (annualContribution * i) : (annualContribution * ((Math.pow(1 + r, i) - 1) / r));
      const total = fvPrincipal + fvAnnuity;
      const contributed = currentSavings + (annualContribution * i);
      chartData.push({ year: i, total, contributed });
    }

    const final = chartData[chartData.length - 1];
    const totalGrowth = final.total - final.contributed;

    return {
      totalValue: final.total,
      totalContributed: final.contributed,
      totalGrowth,
      chartData
    };
  }, [currentSavings, annualContribution, rate, yearsUntilCollege]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis('');
    try {
      const res = await analyzeFiveTwoNine(childAge, currentSavings, annualContribution, rate, yearsUntilCollege, stats.totalValue);
      setAnalysis(res);
    } catch (e) {
      setAnalysis("AI Analysis failed. Please check your inputs and try again.");
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
    const getX = (year: number) => padding + (year / yearsUntilCollege) * chartW;
    const getY = (val: number) => (height - padding) - (val / maxVal) * chartH;

    const totalPath = stats.chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.year)} ${getY(d.total)}`).join(' ');
    const contributedPath = stats.chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.year)} ${getY(d.contributed)}`).join(' ');
    
    const totalArea = `${totalPath} L ${getX(yearsUntilCollege)} ${height - padding} L ${getX(0)} ${height - padding} Z`;
    const contributedArea = `${contributedPath} L ${getX(yearsUntilCollege)} ${height - padding} L ${getX(0)} ${height - padding} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-sm overflow-visible">
        <defs>
          <linearGradient id="total529Gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="contrib529Gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
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

        <path d={totalArea} fill="url(#total529Gradient)" />
        <path d={contributedArea} fill="url(#contrib529Gradient)" />

        <path d={totalPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" className="transition-all duration-700" />
        <path d={contributedPath} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" className="transition-all duration-700" />

        <text x={padding} y={height - 10} fontSize="10" className="fill-slate-400 font-bold">Age {childAge}</text>
        <text x={width - padding} y={height - 10} fontSize="10" className="fill-slate-400 font-bold" textAnchor="end">Age {childAge + yearsUntilCollege}</text>
      </svg>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">529 College Savings Lab</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Engineer your child's educational future with AI-powered capital modeling.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold mb-8 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-600 rounded-full"></span>
              Plan Parameters
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Child's Age</label>
                    <input 
                    type="number" value={childAge} onChange={e => setChildAge(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Years to Start</label>
                    <input 
                    type="number" value={yearsUntilCollege} onChange={e => setYearsUntilCollege(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                    />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Current Savings ($)</label>
                <input 
                  type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Annual Contribution ($)</label>
                <input 
                  type="number" value={annualContribution} onChange={e => setAnnualContribution(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Expected Return ({rate}%)</label>
                <input 
                  type="range" min="0" max="15" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-900 dark:bg-emerald-950 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl transition-transform group-hover:scale-110"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-2">Investment Growth</p>
            <h2 className="text-4xl font-black mb-4">${stats.totalGrowth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
            <p className="text-xs font-medium text-emerald-100/60 leading-relaxed">
              Tax-free earnings projected through compounding.
            </p>
          </div>
        </div>

        {/* Results Dashboard */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                <div>
                   <p className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">Projected Educational Capital</p>
                   <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">${stats.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
                </div>
                <div className="flex gap-8">
                   <div className="text-right">
                      <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Contributed</p>
                      <p className="font-bold text-slate-600 dark:text-slate-400">${stats.totalContributed.toLocaleString()}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-emerald-500 text-[9px] font-black uppercase tracking-widest">Growth (Earnings)</p>
                      <p className="font-bold text-emerald-600">+${stats.totalGrowth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                   </div>
                </div>
             </div>

             <div className="mb-12">
                {renderChart()}
             </div>

             <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Account Value</span>
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
                         <h3 className="text-2xl font-bold tracking-tight">Finny's 529 Audit</h3>
                         <p className="text-slate-400 text-xs tracking-tight uppercase font-black">AI Powered Portfolio Simulation</p>
                      </div>
                   </div>
                   <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-50"
                   >
                     {isAnalyzing ? 'Simulating Inflation...' : 'Extract AI Roadmap'}
                   </button>
                </div>

                <div className="min-h-[220px] bg-white/5 rounded-[2.5rem] p-8 border border-white/10 backdrop-blur-md">
                   {isAnalyzing ? (
                      <div className="h-full flex flex-col items-center justify-center py-12 gap-4">
                         <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-emerald-400 font-bold animate-pulse tracking-widest uppercase text-[10px]">Comparing returns to tuition benchmarks...</p>
                      </div>
                   ) : analysis ? (
                      <div className="prose prose-invert prose-emerald max-w-none text-slate-300 font-medium leading-relaxed prose-p:mb-4">
                         <div className="whitespace-pre-wrap">{analysis}</div>
                      </div>
                   ) : (
                      <div className="text-center py-12 text-slate-500 italic font-medium">
                         Project your child's college fund and let Gemini audit the strategy for maximum growth and tax efficiency.
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

export default FiveTwoNineCalculatorView;
