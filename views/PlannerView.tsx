
import React, { useState } from 'react';
import { BudgetItem } from '../types';
import { analyzeBudget } from '../services/gemini';
import AIDisclaimer from '../components/AIDisclaimer';

const PlannerView: React.FC = () => {
  const [items, setItems] = useState<BudgetItem[]>([
    { id: '1', category: 'Housing', amount: 1500 },
    { id: '2', category: 'Food', amount: 500 },
    { id: '3', category: 'Transport', amount: 300 },
    { id: '4', category: 'Leisure', amount: 400 },
  ]);
  const [newCat, setNewCat] = useState('');
  const [newAmt, setNewAmt] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addItem = () => {
    if (!newCat || !newAmt) return;
    setItems([...items, { id: Date.now().toString(), category: newCat, amount: Number(newAmt) }]);
    setNewCat('');
    setNewAmt('');
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const total = items.reduce((acc, curr) => acc + curr.amount, 0);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis('');
    try {
      const res = await analyzeBudget(items);
      setAnalysis(res);
    } catch (e) {
      setAnalysis("Could not generate analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 transition-colors duration-300">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter">AI Capital Planner</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">Map out your cash flow and receive high-level strategic optimization tips from Gemini.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-10">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white tracking-tight">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            Flow Management
          </h3>
          
          <div className="space-y-4 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl group border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/30 transition-all">
                <span className="font-bold text-slate-700 dark:text-slate-300">{item.category}</span>
                <div className="flex items-center gap-6">
                  <span className="font-black text-slate-900 dark:text-white text-lg">${item.amount.toLocaleString()}</span>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="col-span-1">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">Category</label>
              <input 
                type="text" 
                placeholder="e.g. Rent" 
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 dark:focus:border-emerald-400 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">Amount ($)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={newAmt}
                onChange={(e) => setNewAmt(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 dark:focus:border-emerald-400 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
              />
            </div>
            <button 
              onClick={addItem}
              className="col-span-2 bg-slate-900 dark:bg-emerald-600 text-white font-black py-5 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-slate-900/10 dark:shadow-emerald-600/20 transform active:scale-95"
            >
              Log Entry
            </button>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Total Commitment</span>
            <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">${total.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="bg-emerald-900 dark:bg-emerald-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 tracking-tight">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              Strategic Analysis
            </h3>
            <p className="text-emerald-100/70 text-lg mb-10 leading-relaxed font-medium">
              Gemini will evaluate your current flow against institutional wealth benchmarks and the 50/30/20 capital allocation rule.
            </p>
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || items.length === 0}
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black px-10 py-5 rounded-2xl w-full transition-all shadow-2xl shadow-emerald-500/20 disabled:opacity-50 transform hover:-translate-y-1 active:scale-95"
            >
              {isAnalyzing ? 'Computing Ratios...' : 'Extract Optimization Roadmap'}
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-10 flex-grow min-h-[400px]">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-full gap-6 text-slate-400 py-16">
                <div className="w-12 h-12 border-4 border-emerald-600 dark:border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold animate-pulse tracking-widest uppercase text-xs">Modeling financial future...</p>
              </div>
            ) : analysis ? (
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The Analysis Report</h4>
                <div className="text-slate-600 dark:text-slate-400 space-y-6 whitespace-pre-wrap font-medium leading-relaxed">
                  {analysis}
                </div>
                <AIDisclaimer />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-200 dark:text-slate-700 mb-8">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <p className="text-slate-400 dark:text-slate-600 font-bold text-sm max-w-xs mx-auto italic leading-relaxed">"A budget is telling your money where to go instead of wondering where it went." - Populate the list to unlock AI strategy.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerView;
