
import React, { useState, useMemo } from 'react';
import { analyzeTaxSituation } from '../services/gemini';
import AIDisclaimer from '../components/AIDisclaimer';

const TaxCalculatorView: React.FC = () => {
  const [income, setIncome] = useState<number>(75000);
  const [deductions, setDeductions] = useState<number>(14600); 
  const [credits, setCredits] = useState<number>(0);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');

  const calculation = useMemo(() => {
    const taxableIncome = Math.max(0, income - deductions);
    
    const brackets = filingStatus === 'single' ? [
      { rate: 0.10, limit: 11600 },
      { rate: 0.12, limit: 47150 },
      { rate: 0.22, limit: 100525 },
      { rate: 0.24, limit: 191950 },
      { rate: 0.32, limit: 243725 },
      { rate: 0.35, limit: 609350 },
      { rate: 0.37, limit: Infinity }
    ] : [ 
      { rate: 0.10, limit: 23200 },
      { rate: 0.12, limit: 94300 },
      { rate: 0.22, limit: 201050 },
      { rate: 0.24, limit: 383900 },
      { rate: 0.32, limit: 487450 },
      { rate: 0.35, limit: 731200 },
      { rate: 0.37, limit: Infinity }
    ];

    let tax = 0;
    let previousLimit = 0;
    
    for (const bracket of brackets) {
      if (taxableIncome > previousLimit) {
        const taxableInThisBracket = Math.min(taxableIncome, bracket.limit) - previousLimit;
        tax += taxableInThisBracket * bracket.rate;
        previousLimit = bracket.limit;
      } else {
        break;
      }
    }

    const finalTax = Math.max(0, tax - credits);
    const effectiveRate = income > 0 ? (finalTax / income) * 100 : 0;
    const takeHome = Math.max(0, income - finalTax);

    return {
      taxableIncome,
      estimatedTax: finalTax,
      effectiveRate,
      takeHome,
      deductionsPercent: (deductions / income) * 100,
      taxPercent: (finalTax / income) * 100,
      takeHomePercent: (takeHome / income) * 100
    };
  }, [income, deductions, credits, filingStatus]);

  const handleGetAIInsight = async () => {
    setIsAnalyzing(true);
    try {
      const res = await analyzeTaxSituation(income, deductions, credits, calculation.estimatedTax);
      setAnalysis(res);
    } catch (e) {
      setAnalysis("Error retrieving tax insights.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderDonut = () => {
    const radius = 70;
    const strokeWidth = 20;
    const circumference = 2 * Math.PI * radius;
    
    // Percentages adjusted to ensure they sum appropriately for the visual
    const total = income || 1;
    const takeHomeRatio = calculation.takeHome / total;
    const taxRatio = calculation.estimatedTax / total;
    const deductionRatio = deductions / total;

    const takeHomeDash = takeHomeRatio * circumference;
    const taxDash = taxRatio * circumference;
    const deductionDash = deductionRatio * circumference;

    return (
      <div className="relative flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-sm">
          <circle 
            cx="100" cy="100" r={radius} 
            fill="transparent" stroke="#f1f5f9" strokeWidth={strokeWidth} 
          />
          {/* Take Home */}
          <circle 
            cx="100" cy="100" r={radius} 
            fill="transparent" stroke="#10b981" strokeWidth={strokeWidth} 
            strokeDasharray={`${takeHomeDash} ${circumference}`}
            strokeDashoffset="0"
            transform="rotate(-90 100 100)"
            className="transition-all duration-700"
          />
          {/* Tax */}
          <circle 
            cx="100" cy="100" r={radius} 
            fill="transparent" stroke="#f43f5e" strokeWidth={strokeWidth} 
            strokeDasharray={`${taxDash} ${circumference}`}
            strokeDashoffset={-takeHomeDash}
            transform="rotate(-90 100 100)"
            className="transition-all duration-700"
          />
          {/* Deductions */}
          <circle 
            cx="100" cy="100" r={radius} 
            fill="transparent" stroke="#94a3b8" strokeWidth={strokeWidth} 
            strokeDasharray={`${deductionDash} ${circumference}`}
            strokeDashoffset={-(takeHomeDash + taxDash)}
            transform="rotate(-90 100 100)"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-slate-800">{calculation.effectiveRate.toFixed(1)}%</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Effective</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Tax Strategy Lab</h1>
        <p className="text-slate-500 text-lg">Decode your federal liability and optimize your net worth with AI guidance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Inputs Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-lg font-bold mb-8 text-slate-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-slate-900 rounded-full"></span>
              Filing Parameters
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Status</label>
                <div className="flex p-1 bg-slate-50 rounded-2xl">
                  <button 
                    onClick={() => { setFilingStatus('single'); setDeductions(14600); }}
                    className={`flex-grow py-3 px-4 rounded-xl text-xs font-bold transition-all ${filingStatus === 'single' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    Single
                  </button>
                  <button 
                    onClick={() => { setFilingStatus('married'); setDeductions(29200); }}
                    className={`flex-grow py-3 px-4 rounded-xl text-xs font-bold transition-all ${filingStatus === 'married' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    Joint
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Annual Gross Income</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl pl-8 pr-4 py-4 focus:ring-4 focus:ring-emerald-500/10 outline-none font-bold text-slate-900 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Total Deductions</label>
                <input 
                  type="number"
                  value={deductions}
                  onChange={(e) => setDeductions(Number(e.target.value))}
                  className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl px-4 py-4 focus:ring-4 focus:ring-emerald-500/10 outline-none font-bold text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tax Credits</label>
                <input 
                  type="number"
                  value={credits}
                  onChange={(e) => setCredits(Number(e.target.value))}
                  className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-emerald-500 rounded-2xl px-4 py-4 focus:ring-4 focus:ring-emerald-500/10 outline-none font-bold text-slate-900 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center">
              {renderDonut()}
              <div className="mt-8 grid grid-cols-3 gap-4 w-full text-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Take Home</p>
                  <p className="text-sm font-bold text-emerald-600">${calculation.takeHome.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tax</p>
                  <p className="text-sm font-bold text-rose-500">${calculation.estimatedTax.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Deducted</p>
                  <p className="text-sm font-bold text-slate-500">${deductions.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl">
              <div>
                <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-2">Liability Summary</p>
                <h2 className="text-4xl font-bold mb-6">${calculation.estimatedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm py-2 border-b border-white/5">
                    <span className="text-slate-400">Taxable Income</span>
                    <span className="font-bold">${calculation.taxableIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-white/5">
                    <span className="text-slate-400">Effective Rate</span>
                    <span className="font-bold text-emerald-400">{calculation.effectiveRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-white/5 rounded-2xl p-4 text-[10px] text-slate-400 italic">
                Calculated using simplified 2024 Federal Income Tax Brackets.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden min-h-[300px] flex flex-col">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">AI Tax Analysis</h3>
                  <p className="text-xs text-slate-400 tracking-tight">Personalized strategies from Finny</p>
                </div>
              </div>
              <button 
                onClick={handleGetAIInsight}
                disabled={isAnalyzing}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-6 py-2.5 rounded-full font-bold transition-all disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Refresh Report'}
              </button>
            </div>

            <div className="p-8 flex-grow">
              {isAnalyzing ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 py-12">
                   <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                   <p className="text-slate-400 font-medium animate-pulse">Running advanced tax scenarios...</p>
                </div>
              ) : analysis ? (
                <div className="prose prose-slate max-w-none prose-sm leading-relaxed text-slate-600">
                   {analysis.split('\n').map((line, i) => (
                     <p key={i} className="mb-4">{line}</p>
                   ))}
                   <AIDisclaimer />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                  <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <p className="max-w-xs mx-auto text-sm italic italic text-slate-500">Click "Refresh Report" to receive tailored tax-saving insights from our AI engine based on your current inputs.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculatorView;
