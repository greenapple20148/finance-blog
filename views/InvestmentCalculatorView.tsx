
import React, { useState, useMemo } from 'react';
import { analyzeInvestment } from '../services/gemini';

const InvestmentCalculatorView: React.FC = () => {
  const [initial, setInitial] = useState<number>(10000);
  const [monthly, setMonthly] = useState<number>(500);
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(20);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');

  const { projection, chartData } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    
    // Yearly data for chart
    const data = [];
    for (let i = 0; i <= years; i++) {
      const monthCount = i * 12;
      const fvInit = initial * Math.pow(1 + r, monthCount);
      const fvMo = r === 0 ? (monthly * monthCount) : (monthly * ((Math.pow(1 + r, monthCount) - 1) / r));
      const total = fvInit + fvMo;
      const contributed = initial + (monthly * monthCount);
      data.push({ year: i, total, contributed });
    }

    const last = data[data.length - 1];
    return {
      projection: {
        totalValue: last.total,
        totalContributed: last.contributed,
        totalInterest: last.total - last.contributed
      },
      chartData: data
    };
  }, [initial, monthly, rate, years]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis('');
    try {
      const res = await analyzeInvestment(initial, monthly, rate, years, projection.totalValue);
      setAnalysis(res);
    } catch (e) {
      setAnalysis("Could not generate AI analysis.");
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

    const maxVal = Math.max(...chartData.map(d => d.total));
    const getX = (year: number) => padding + (year / years) * chartW;
    const getY = (val: number) => (height - padding) - (val / maxVal) * chartH;

    const totalPath = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.year)} ${getY(d.total)}`).join(' ');
    const contributedPath = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.year)} ${getY(d.contributed)}`).join(' ');
    
    const totalArea = `${totalPath} L ${getX(years)} ${height - padding} L ${getX(0)} ${height - padding} Z`;
    const contributedArea = `${contributedPath} L ${getX(years)} ${height - padding} L ${getX(0)} ${height - padding} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-sm">
        <defs>
          <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="contribGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(p => (
          <line 
            key={p} 
            x1={padding} 
            y1={padding + p * chartH} 
            x2={width - padding} 
            y2={padding + p * chartH} 
            stroke="#f1f5f9" 
            strokeWidth="1" 
          />
        ))}

        {/* Areas */}
        <path d={totalArea} fill="url(#totalGradient)" />
        <path d={contributedArea} fill="url(#contribGradient)" />

        {/* Lines */}
        <path d={totalPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" className="transition-all duration-700" />
        <path d={contributedPath} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" className="transition-all duration-700" />

        {/* Labels */}
        <text x={padding} y={height - 10} fontSize="10" fill="#94a3b8" fontWeight="bold">Year 0</text>
        <text x={width - padding} y={height - 10} fontSize="10" fill="#94a3b8" fontWeight="bold" textAnchor="end">Year {years}</text>
      </svg>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Compound Interest Engine</h1>
        <p className="text-slate-500 text-lg">Visualize your path to financial independence with interactive projections.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-lg font-bold mb-8 text-slate-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
              Growth Parameters
            </h3>
            <div className="space-y-8">
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Initial Balance</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    type="number" 
                    value={initial}
                    onChange={(e) => setInitial(Number(e.target.value))}
                    className="w-full bg-slate-50 border-2 border-transparent group-hover:bg-white group-hover:border-slate-100 focus:bg-white focus:border-emerald-500 rounded-2xl pl-8 pr-4 py-4 focus:ring-4 focus:ring-emerald-500/10 outline-none font-bold text-slate-900 transition-all"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Monthly Contribution</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    type="number" 
                    value={monthly}
                    onChange={(e) => setMonthly(Number(e.target.value))}
                    className="w-full bg-slate-50 border-2 border-transparent group-hover:bg-white group-hover:border-slate-100 focus:bg-white focus:border-emerald-500 rounded-2xl pl-8 pr-4 py-4 focus:ring-4 focus:ring-emerald-500/10 outline-none font-bold text-slate-900 transition-all"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Return Rate ({rate}%)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="20"
                  step="0.5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Time Horizon ({years} Years)</label>
                <input 
                  type="range" 
                  min="1" 
                  max="50"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Projections */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Estimated Wealth</p>
                <h2 className="text-5xl font-bold text-slate-900">${projection.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Contributions</p>
                  <p className="font-bold text-slate-600">${projection.totalContributed.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Profit</p>
                  <p className="font-bold text-emerald-600">+${projection.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              {renderChart()}
            </div>

            <div className="flex flex-wrap gap-6 text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-slate-500">Total Portfolio Value</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                <span className="text-slate-500">Principal Contribution</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white overflow-hidden relative min-h-[300px]">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Finny's Strategic Insight</h3>
                    <p className="text-slate-400 text-xs tracking-tight">AI Analysis of your investment parameters</p>
                  </div>
                </div>
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs px-6 py-2.5 rounded-full font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Calculating...
                    </>
                  ) : 'Refresh Insights'}
                </button>
              </div>

              <div className="flex-grow">
                {isAnalyzing ? (
                  <div className="h-full flex flex-col items-center justify-center gap-4 py-12">
                     <p className="text-slate-400 font-medium animate-pulse">Running Monte Carlo simulations...</p>
                  </div>
                ) : analysis ? (
                  <div className="prose prose-invert max-w-none prose-sm leading-relaxed text-slate-300">
                     {analysis.split('\n').map((line, i) => (
                       <p key={i} className="mb-4">{line}</p>
                     ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
                    <p className="max-w-xs mx-auto text-sm italic">"The best time to plant a tree was 20 years ago. The second best time is now." - Click analyze to see how your current plan stacks up against historical inflation and market cycles.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculatorView;
