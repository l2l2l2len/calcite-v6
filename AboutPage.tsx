
import React from 'react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="px-6 py-6 pb-32 bg-surface-secondary dark:bg-navy min-h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-2xl font-bold dark:text-white tracking-tight">About CalcSite Pro</h1>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="card-enterprise p-6 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-purple rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-accent">
              C
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">CalcSite Pro</h2>
              <p className="text-sm text-slate-light">Industrial Grade Engineering Suite</p>
            </div>
          </div>
          <p className="text-slate-light leading-relaxed">
            CalcSite Pro is a comprehensive construction calculator suite designed for civil engineers, contractors, architects, and construction professionals. Built with precision and speed in mind, it eliminates manual calculations and reduces costly on-site errors.
          </p>
        </div>

        {/* What We Offer */}
        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What We Offer</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">200+ Calculators</h4>
                <p className="text-sm text-slate-light">From concrete mix ratios to steel reinforcement, covering every aspect of construction estimation.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Smart Bill of Quantities</h4>
                <p className="text-sm text-slate-light">Automatically generate professional BOQ documents from your calculations with one click.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">AI Engineering Assistant</h4>
                <p className="text-sm text-slate-light">Get instant answers on rebar sizing, concrete standards (IS 456, ACI 318), and structural calculations.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Multi-Currency Support</h4>
                <p className="text-sm text-slate-light">Get real-time cost estimations in INR, USD, GBP, with customizable material rates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Standards */}
        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technical Standards</h3>
          <p className="text-sm text-slate-light mb-4">
            All calculations in CalcSite Pro follow established engineering codes and standards:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-tertiary dark:bg-white/5 p-3 rounded-xl">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">IS 456:2000</span>
              <p className="text-xs text-slate-light">Plain & Reinforced Concrete</p>
            </div>
            <div className="bg-surface-tertiary dark:bg-white/5 p-3 rounded-xl">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">IS 875</span>
              <p className="text-xs text-slate-light">Design Loads</p>
            </div>
            <div className="bg-surface-tertiary dark:bg-white/5 p-3 rounded-xl">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">ACI 318</span>
              <p className="text-xs text-slate-light">Building Code Requirements</p>
            </div>
            <div className="bg-surface-tertiary dark:bg-white/5 p-3 rounded-xl">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">NEC 2020</span>
              <p className="text-xs text-slate-light">Electrical Code</p>
            </div>
          </div>
        </div>

        {/* Free & Open */}
        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Free & Open Access</h3>
          <p className="text-sm text-slate-light leading-relaxed">
            CalcSite Pro is completely free to use. No registration, no login, no account required. All your data is stored locally on your device, giving you full control over your information. Simply open the app and start calculating.
          </p>
        </div>

        {/* Version Info */}
        <div className="text-center py-6">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Version 6.0.0</p>
          <p className="text-xs text-slate-light mt-1">Made with precision by Gregorious Studio</p>
          <p className="text-xs text-slate-light mt-1">© 2024 CalcSite Pro. All calculations for reference only.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
