
import React, { useState, useMemo } from 'react';
import { analyzeAmortization } from '../services/gemini';

const AmortizationCalculatorView: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [rate, setRate] = useState<number>(6.5);
  const [term, setTerm] = useState<number>(30);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');

  const stats = useMemo(() => {
    const r = rate / 100 / 12;
    const n = term * 12;
    const monthlyPayment = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    let remaining = loanAmount;
    let totalInterest = 0;
    const schedule = [];
    
    // Yearly snapshots
    for (let m = 1; m <= n; m++) {
      const interestPayment = remaining * r;
      const principalPayment = monthlyPayment - interestPayment;
      remaining -= principalPayment;
      totalInterest += interestPayment;
      
      if (m % 12 === 0 || m === n) {
        schedule.push({
          year: m / 12,
          interestPaid: totalInterest,
          principalPaid: loanAmount - remaining,
          remaining
        });
      }
    }

    return {
      monthlyPayment,
      totalInterest,
      totalPaid: monthlyPayment * n,
      schedule
    };
  }, [loanAmount, rate, term]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis('');
    try {
      const res = await analyzeAmortization(stats.totalInterest, loanAmount);
      setAnalysis(res);
    } catch (e) {
      setAnalysis("Amortization analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderAmortChart = () => {
    const width = 800;
    const height = 300;
    const padding = 40;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;

    const maxVal = stats.totalPaid;
    const getX = (year: number) => padding + (year / term) * chartW;
    const getY = (val: number) => (height - padding) - (val / maxVal) * chartH;

    const principalPoints = stats.schedule.map((d) => `${getX(d.year)},${getY(d.principalPaid)}`).join(' ');
    const interestPoints = stats.schedule.map((d) => `${getX(d.year)},${getY(d.interestPaid)}`).join(' ');

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-sm overflow-visible">
        <defs>
          <linearGradient id="amortPrincipalGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="amortInterestGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
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
            stroke="currentColor" 
            className="text-slate-100 dark:text-slate-800"
            strokeWidth="1" 
          />
        ))}

        {/* Principal Path */}
        <path d={`M ${padding},${height - padding} L ${principalPoints} L ${width - padding},${height - padding} Z`} fill="url(#amortPrincipalGradient)" />
        <path d={`M ${padding},${height - padding} L ${principalPoints}`} fill="none" stroke="#10b981" strokeWidth="3" />

        {/* Interest Path */}
        <path d={`M ${padding},${height - padding} L ${interestPoints} L ${width - padding},${height - padding} Z`} fill="url(#amortInterestGradient)" />
        <path d={`M ${padding},${height - padding} L ${interestPoints}`} fill="none" stroke="#f43f5e" strokeWidth="3" />

        <text x={padding} y={height - 10} fontSize="10" className="fill-slate-400 font-bold">Start</text>
        <text x={width - padding} y={height - 10} fontSize="10" className="fill-slate-400 font-bold" textAnchor="end">{term} Years</text>
      </svg>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Loan Amortization Explorer</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Visualize how interest and principal shift over the life of your debt.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold mb-8 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-600 rounded-full"></span>
              Loan Input
            </h3>
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Total Loan Amount ($)</label>
                <input 
                  type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Interest Rate ({rate}%)</label>
                <input 
                  type="range" min="0" max="15" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Loan Term ({term} Years)</label>
                <input 
                  type="range" min="1" max="40" value={term} onChange={e => setTerm(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-rose-900 dark:bg-rose-950 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl"></div>
             <p className="text-[10px] font-black uppercase tracking-widest text-rose-300 mb-2">Total Interest Cost</p>
             <h2 className="text-4xl font-black mb-4">${stats.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
             <p className="text-xs font-medium text-rose-100/60 leading-relaxed">
               This is the amount of pure interest you will pay over {term} years.
             </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                <div>
                   <p className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">Monthly Principal & Interest</p>
                   <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">${stats.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
                </div>
                <div className="flex gap-8">
                   <div className="text-right">
                      <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Original Loan</p>
                      <p className="font-bold text-slate-600 dark:text-slate-400">${loanAmount.toLocaleString()}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-rose-500 text-[9px] font-black uppercase tracking-widest">Total Payback</p>
                      <p className="font-bold text-rose-600">${stats.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                   </div>
                </div>
             </div>

             <div className="mb-12">
                {renderAmortChart()}
             </div>

             <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Principal Accumulated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Interest Accumulated</span>
                </div>
             </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
             <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 font-black text-2xl">F</div>
                      <div>
                         <h3 className="text-2xl font-bold tracking-tight">Finny's Amortization Audit</h3>
                         <p className="text-slate-400 text-xs tracking-tight uppercase font-black">AI Efficiency Scoring</p>
                      </div>
                   </div>
                   <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-50"
                   >
                     {isAnalyzing ? 'Mapping Cash Flow...' : 'Extract AI Roadmap'}
                   </button>
                </div>

                <div className="min-h-[200px] bg-white/5 rounded-[2.5rem] p-8 border border-white/10">
                   {isAnalyzing ? (
                      <div className="h-full flex flex-col items-center justify-center py-12 gap-4">
                         <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-emerald-400 font-bold animate-pulse tracking-widest uppercase text-[10px]">Projecting payment schedules...</p>
                      </div>
                   ) : analysis ? (
                      <div className="prose prose-invert prose-emerald max-w-none text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
                         {analysis}
                      </div>
                   ) : (
                      <div className="text-center py-12 text-slate-500 italic">
                         Adjust your loan terms and let Gemini reveal the true cost of interest vs. speed of payoff.
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

export default AmortizationCalculatorView;
