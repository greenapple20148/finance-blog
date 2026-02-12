
import React, { useState, useMemo, useEffect } from 'react';
import { DebtItem } from '../types';
import { analyzeDebtStrategy, fetchDebtCoachTip, CoachInsight } from '../services/gemini';

const DebtManagerView: React.FC = () => {
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: '1', name: 'Credit Card A', balance: 5000, interestRate: 18.9, minPayment: 150 },
    { id: '2', name: 'Student Loan', balance: 15000, interestRate: 4.5, minPayment: 200 },
    { id: '3', name: 'Car Loan', balance: 8000, interestRate: 6.2, minPayment: 250 },
  ]);
  const [extraPayment, setExtraPayment] = useState<number>(200);
  const [method, setMethod] = useState<'snowball' | 'avalanche'>('avalanche');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string>('');
  
  // AI Coach state
  const [coachInsight, setCoachInsight] = useState<CoachInsight>({
    status: "Steady Flow",
    tip: "Add your liabilities to begin engineering your path to zero balance.",
    motivationScore: 0,
    strategicNote: "Ready to start."
  });
  const [isCoachThinking, setIsCoachThinking] = useState(false);

  // Add Debt state
  const [newName, setNewName] = useState('');
  const [newBal, setNewBal] = useState('');
  const [newRate, setNewRate] = useState('');
  const [newMin, setNewMin] = useState('');

  const addDebt = () => {
    if (!newName || !newBal || !newRate || !newMin) return;
    setDebts([...debts, {
      id: Date.now().toString(),
      name: newName,
      balance: Number(newBal),
      interestRate: Number(newRate),
      minPayment: Number(newMin)
    }]);
    setNewName(''); setNewBal(''); setNewRate(''); setNewMin('');
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const totals = useMemo(() => {
    const totalBalance = debts.reduce((acc, d) => acc + d.balance, 0);
    const totalMin = debts.reduce((acc, d) => acc + d.minPayment, 0);
    return { totalBalance, totalMin };
  }, [debts]);

  const handleGetAIStrategy = async () => {
    if (debts.length === 0) return;
    setIsAnalyzing(true);
    setAiReport('');
    try {
      const res = await analyzeDebtStrategy(debts, extraPayment, method);
      setAiReport(res);
    } catch (e) {
      setAiReport("Failed to generate AI debt strategy.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Proactive Coach Updates on Data Change
  useEffect(() => {
    const updateCoach = async () => {
      if (debts.length === 0) return;
      setIsCoachThinking(true);
      try {
        const insight = await fetchDebtCoachTip(debts, method);
        setCoachInsight(insight);
      } catch (e) {
        // Fallback
      } finally {
        setIsCoachThinking(false);
      }
    };

    const timer = setTimeout(updateCoach, 1500); 
    return () => clearTimeout(timer);
  }, [debts, method]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Debt Exit Lab</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Engineer your escape from liability using mathematical models and AI foresight.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Input Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* AI Coach Card */}
          <div className="bg-emerald-900 dark:bg-emerald-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-white/10 transition-all"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white text-emerald-950 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">F</div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 block">Debt Coach</span>
                    <h3 className="font-bold text-white uppercase text-xs tracking-tighter">{isCoachThinking ? "Refining Analysis..." : coachInsight.status}</h3>
                  </div>
                </div>
                {isCoachThinking ? (
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                ) : (
                  <div className="bg-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                    Live
                  </div>
                )}
              </div>

              <div className="mb-8 p-5 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm min-h-[100px] flex items-center">
                 <p className="text-sm font-medium leading-relaxed italic text-emerald-50">
                    "{coachInsight.tip}"
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 block mb-1">Momentum</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black">{coachInsight.motivationScore}</span>
                      <span className="text-[10px] font-bold text-white/40">/100</span>
                    </div>
                 </div>
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 block mb-1">Impact Note</span>
                    <p className="text-[10px] font-bold leading-tight uppercase tracking-tight text-white/80">{coachInsight.strategicNote}</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <h3 className="text-lg font-bold mb-8 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-600 rounded-full"></span>
              Add Liability
            </h3>
            <div className="space-y-4">
              <input 
                type="text" placeholder="Debt Name" value={newName} onChange={e => setNewName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" placeholder="Balance ($)" value={newBal} onChange={e => setNewBal(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
                <input 
                  type="number" placeholder="Rate (%)" value={newRate} onChange={e => setNewRate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
              <input 
                type="number" placeholder="Min Payment ($)" value={newMin} onChange={e => setNewMin(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none transition-all"
              />
              <button onClick={addDebt} className="w-full bg-slate-900 dark:bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95">Add to Portfolio</button>
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
             <h3 className="text-lg font-bold mb-6">Acceleration Engine</h3>
             <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Extra Monthly Capital ($)</label>
             <input 
                type="number" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))}
                className="w-full bg-white/10 border-2 border-transparent focus:border-emerald-400 rounded-2xl px-5 py-4 font-bold text-white outline-none transition-all mb-6"
             />
             <div className="space-y-3">
                <button 
                  onClick={() => setMethod('snowball')}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between px-5 ${method === 'snowball' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
                >
                  Snowball Method
                  {method === 'snowball' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                </button>
                <button 
                  onClick={() => setMethod('avalanche')}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between px-5 ${method === 'avalanche' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
                >
                  Avalanche Method
                  {method === 'avalanche' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                </button>
             </div>
          </div>
        </div>

        {/* Dashboard Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Aggregate Liability</p>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">${totals.totalBalance.toLocaleString()}</h2>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Monthly Min. Requirement</p>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">${totals.totalMin.toLocaleString()}</h2>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
             <div className="p-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 dark:text-white tracking-tight">Active Debt Stack</h3>
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{debts.length} Accounts Found</span>
             </div>
             <div className="p-8">
                {debts.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 font-medium italic">No liabilities detected. Ready to start your wealth journey.</div>
                ) : (
                  <div className="space-y-4">
                    {debts.map(d => (
                      <div key={d.id} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30 transition-all group">
                        <div className="flex flex-col">
                           <span className="font-black text-slate-900 dark:text-white">{d.name}</span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d.interestRate}% APR</span>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="text-right">
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Balance</span>
                              <span className="font-black text-slate-900 dark:text-white">${d.balance.toLocaleString()}</span>
                           </div>
                           <button onClick={() => removeDebt(d.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-300 hover:text-rose-500">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
             </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
             <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
                         <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <div>
                         <h3 className="text-2xl font-bold tracking-tight">Finny's Deep Strategy</h3>
                         <p className="text-slate-400 text-xs tracking-tight uppercase font-black">AI Powered Capital Reallocation</p>
                      </div>
                   </div>
                   <button 
                    onClick={handleGetAIStrategy}
                    disabled={isAnalyzing || debts.length === 0}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
                   >
                     {isAnalyzing ? 'Processing Logic...' : 'Extract AI Roadmap'}
                   </button>
                </div>

                <div className="min-h-[200px] bg-white/5 rounded-[2.5rem] p-8 border border-white/10">
                   {isAnalyzing ? (
                      <div className="h-full flex flex-col items-center justify-center py-12 gap-4">
                         <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-emerald-400 font-bold animate-pulse tracking-widest uppercase text-[10px]">Optimizing debt repayment sequences...</p>
                      </div>
                   ) : aiReport ? (
                      <div className="prose prose-invert prose-emerald max-w-none text-slate-300 font-medium leading-relaxed prose-p:mb-4">
                         <div className="whitespace-pre-wrap">{aiReport}</div>
                      </div>
                   ) : (
                      <div className="text-center py-12 text-slate-500 italic">
                         Enter your debts and click the roadmap button to see how Gemini can accelerate your path to zero balance.
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

export default DebtManagerView;
