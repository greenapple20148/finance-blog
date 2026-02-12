
import React from 'react';

const TermsOfServiceView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter">Terms of Service</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
          The legal framework governing your use of FinBlog, provided by RZeal Solutions.
        </p>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-100 dark:border-slate-800 shadow-xl space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            1. No Professional Financial Advice
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            FinBlog, operated by <strong>RZeal Solutions</strong>, is a technology and media platform. We provide general informational and educational content and AI-driven simulation tools. <strong>We do not provide personalized financial, investment, legal, or tax advice.</strong> No professional-client relationship is formed by your use of this site. Always consult with a certified professional before making significant financial decisions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            2. Limitation of Liability
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            To the maximum extent permitted by law, RZeal Solutions and its affiliates shall not be liable for any financial losses, damages, or outcomes resulting from your use of our calculators, AI insights, or articles. You assume full responsibility for any actions taken based on the information provided on this platform.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            3. AI Output Limitation & Disclosures
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Our tools utilize third-party Large Language Models (LLMs) including Google Gemini. AI output is probabilistic and may contain errors, "hallucinations," or outdated information. RZeal Solutions makes no warranties regarding the accuracy or reliability of AI-generated insights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            4. Acceptable Use & Prohibited Activities
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            You agree not to: (a) Use the services for any illegal purpose; (b) Scrape or automatedly collect data from our news feeds or calculators; (c) Attempt to reverse-engineer our AI prompts or proprietary logic; (d) Use the platform to harass or spread misinformation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            5. Intellectual Property
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            All original content, designs, and proprietary code are the property of RZeal Solutions. Market data is provided via licensing agreements with third parties (e.g., Finnhub) and may not be redistributed without their express permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            6. Governing Law & Jurisdiction
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            These Terms shall be governed by and construed in accordance with the laws of the State of <strong>Virginia, United States</strong>, without regard to its conflict of law provisions. Any legal action shall be filed in the courts located in Virginia.
          </p>
        </section>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center">
            Last Updated: May 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServiceView;
