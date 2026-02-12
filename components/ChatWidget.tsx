
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { chatWithExpert } from '../services/gemini';
import AIDisclaimer from './AIDisclaimer';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi there! I'm Finny, your AI finance expert. How can I help you reach your goals today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithExpert([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error: Could not reach the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white dark:bg-slate-900 w-80 sm:w-[400px] h-[600px] rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-slate-900 dark:bg-slate-950 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center font-black text-emerald-950 shadow-lg shadow-emerald-500/30">F</div>
              <div>
                <h4 className="font-bold text-sm tracking-tight">Finny AI Expert</h4>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400/50"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Optimizing Capital</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50 dark:bg-slate-950/50 scroll-smooth">
            <div className="mb-4">
               <AIDisclaimer />
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-none shadow-emerald-600/10' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 rounded-bl-none">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="flex gap-3 items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query our database..."
                className="flex-grow bg-slate-50 dark:bg-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 border-2 border-transparent focus:border-emerald-500 dark:focus:border-emerald-400 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-emerald-600 dark:bg-emerald-500 text-white p-4 rounded-2xl disabled:opacity-50 hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-600/20 active:scale-90"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(16,185,129,0.3)] transition-all transform hover:scale-110 active:scale-95 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-xl">Finny Assistant</span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
