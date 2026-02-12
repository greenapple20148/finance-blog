
import React, { useState } from 'react';

const ContactView: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter">Get in Touch</h1>
        <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto">
          Have a question about our tools or interested in a partnership? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl">
          {isSuccess ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Thank you for reaching out. A FinBlog strategist will review your message and get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-widest hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                  placeholder="John Doe" 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-6 py-5 font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                  placeholder="john@example.com" 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-6 py-5 font-bold text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                  placeholder="How can we assist you?" 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-6 py-5 font-bold text-slate-900 dark:text-white outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-6 rounded-2xl shadow-xl shadow-emerald-600/20 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Transmitting...' : 'Dispatch Message'}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-12 lg:pt-10">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Immediate AI Support</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Don't want to wait for an email? Our virtual analyst <span className="text-emerald-600 dark:text-emerald-400 font-bold">Finny</span> is available 24/7 in the bottom-right corner to help you navigate our calculators and libraries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-4">Email</span>
              <p className="font-bold text-slate-900 dark:text-white text-lg">strategy@fintools.tech</p>
            </div>
            <div className="p-8 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-4">Location</span>
              <p className="font-bold text-slate-900 dark:text-white text-lg">Silicon Valley, CA</p>
            </div>
          </div>

          <div className="p-10 bg-emerald-950 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
             <h4 className="text-xl font-bold mb-4">Professional Consultation</h4>
             <p className="text-emerald-100/60 text-sm leading-relaxed mb-8">
               For institutional inquiries or high-net-worth portfolio analysis, please specify "PRO" in your subject line for priority routing.
             </p>
             <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Response time: &lt; 2 hours
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
