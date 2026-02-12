
import React, { useState } from 'react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="p-12 md:p-16">
          {isSuccess ? (
            <div className="text-center space-y-6 py-8">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">You're in!</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Welcome to the inner circle. Our next market briefing will arrive in your inbox shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <span className="inline-block bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-500/20">
                  Priority Access
                </span>
                <h3 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tighter mb-4">Master Your Capital</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  Join 50,000+ investors receiving our weekly AI-curated market signals and tax optimization strategies.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Professional Email</label>
                  <input 
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-6 py-5 font-bold text-slate-900 dark:text-white outline-none transition-all"
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-emerald-600/20 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Transmitting...' : 'Join the Inner Circle'}
                </button>
                <p className="text-center text-[10px] text-slate-400 font-medium">
                  By joining, you agree to our <a href="#" className="underline">Privacy Policy</a>. No spam, ever.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
