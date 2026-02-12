
import React from 'react';

const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter">Privacy Policy</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
          How FinBlog protects your data and respects your privacy rights.
        </p>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-100 dark:border-slate-800 shadow-xl space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            1. Data Controller Identification
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            The data controller for FinBlog is <strong>RZeal Solutions, Virginia</strong>. For any inquiries regarding your data, please contact us at <span className="text-emerald-600 font-bold">support@rzealinc.com</span>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            2. User Rights (GDPR & CCPA)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            We respect your rights under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). You have the right to:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 font-medium ml-4">
            <li><strong>Access</strong>: Request a copy of the personal data we hold about you.</li>
            <li><strong>Erasure</strong>: Request the deletion of your personal data (e.g., your subscription email).</li>
            <li><strong>Objection</strong>: Object to the processing of your data for marketing purposes.</li>
            <li><strong>Portability</strong>: Request the transfer of your data to another service provider.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            3. Third-Party AI Data Processing
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            When using our AI tools, your prompts are sent to <strong>Google Gemini (Alphabet Inc.)</strong> for processing. FinBlog does not store your specific financial inputs or chat prompts on our servers for model training. Google's data handling is governed by their <a href="https://ai.google.dev/privacy" className="text-emerald-600 underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            4. Local-First Security
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Most calculation data remains in your local browser session. We do not log sensitive inputs like account balances or income levels to any remote database.
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

export default PrivacyView;
