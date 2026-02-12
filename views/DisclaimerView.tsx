
import React from 'react';

const DisclaimerView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter">Legal Disclaimer</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
          Please read this comprehensive disclosure regarding our content, AI-generated tools, and professional limitations.
        </p>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-100 dark:border-slate-800 shadow-xl space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            Financial & Investment Warning
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            The content provided on FinBlog, including but not limited to articles, calculators, and AI chat responses, is for <strong>educational and informational purposes only</strong>. It does not constitute investment advice, financial advice, trading advice, or any other sort of professional recommendation. Past performance is not indicative of future results. All investments carry risk, including the possible loss of principal.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            AI Integrity & Accuracy
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Our platform utilizes Generative AI (Google Gemini) to synthesize market signals and provide strategic insights. While we strive for the highest quality telemetry, AI is subject to errors, hallucinations, and outdated information. <strong>Never make a significant financial decision based solely on AI-generated content.</strong> Always cross-verify with a certified financial planner (CFP) or tax professional.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            Affiliate & Advertisement Disclosure
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            FinBlog may contain links to third-party websites or services. Some of these links may be affiliate links, meaning we receive a small commission if you sign up or purchase through them, at no extra cost to you. We only recommend products we believe provide genuine value to our community.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            No Professional-Client Relationship
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Your use of this website or interaction with our AI assistant does not create a fiduciary or professional-client relationship between you and FinBlog. We are a media and technology platform, not a registered investment advisor or broker-dealer.
          </p>
        </section>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center">
            Last Reviewed: May 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerView;
