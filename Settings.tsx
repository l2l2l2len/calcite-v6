
import React, { useContext } from 'react';
import { AppContext } from './App';
import { CURRENCIES } from './constants';

const Settings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { currency, setCurrency, darkMode, setDarkMode, rates, updateRate } = context;

  return (
    <div className="px-6 py-6 bg-surface-secondary dark:bg-navy min-h-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-2xl font-bold dark:text-white tracking-tight">Profile & Preferences</h1>
      </div>

      <div className="space-y-6">
        {/* UI Preferences Card */}
        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-[11px] font-semibold text-accent uppercase tracking-widest mb-4">UI Preferences</h3>
          <div className="flex justify-between items-center py-2">
            <span className="font-medium dark:text-white">Dark Mode Appearance</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${darkMode ? 'bg-gradient-to-r from-accent to-accent-purple' : 'bg-gray-200'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-all ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
          <div className="flex justify-between items-center py-4 border-t border-gray-100 dark:border-white/5 mt-2">
            <span className="font-medium dark:text-white">Global Currency</span>
            <select
              value={currency.code}
              onChange={(e) => setCurrency(CURRENCIES.find(c => c.code === e.target.value)!)}
              className="bg-surface-tertiary dark:bg-white/5 p-2 rounded-xl text-sm font-semibold text-accent outline-none border border-gray-200 dark:border-white/10 focus:border-accent transition-all"
            >
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>)}
            </select>
          </div>
        </div>

        {/* Material Rates Card */}
        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-[11px] font-semibold text-accent uppercase tracking-widest mb-4">Custom Material Rates</h3>
          <p className="text-[10px] text-slate-light mb-6">Set rates in your local {currency.code} to update all 200+ calculators instantly.</p>

          <div className="space-y-4">
            {[
              { id: 'cement_bag', label: 'Cement Bag', unit: 'bag' },
              { id: 'steel_kg', label: 'Rebar Steel', unit: 'kg' },
              { id: 'brick_nos', label: 'Standard Brick', unit: 'nos' },
              { id: 'labor_sqft', label: 'Labour Cost', unit: 'sft' },
            ].map(rate => (
              <div key={rate.id} className="flex justify-between items-center">
                <span className="text-sm dark:text-gray-300 font-medium">{rate.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-light">{currency.symbol}</span>
                  <input
                    type="number"
                    min="1"
                    value={rates[rate.id]}
                    onFocus={e => e.target.select()}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value) && value > 0) {
                        updateRate(rate.id, value);
                      } else if (e.target.value === '') {
                        updateRate(rate.id, 1);
                      }
                    }}
                    className={`w-20 bg-surface-tertiary dark:bg-white/5 text-right p-2 rounded-xl font-mono text-sm font-semibold dark:text-white border outline-none transition-all ${rates[rate.id] < 1 ? 'border-red-500' : 'border-gray-200 dark:border-white/10 focus:border-accent'}`}
                  />
                  <span className="text-[10px] font-semibold text-slate-light uppercase w-8">/{rate.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Card - Navy Gradient */}
        <div className="bg-navy dark:bg-navy-light/20 p-8 rounded-2xl text-white text-center relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-purple/10 opacity-50" />

          <div className="relative z-10">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-1">CalcSite Pro Premium</h4>
            <p className="text-xs text-white/60 mb-6">You are using the most advanced construction engine on the market.</p>
            <button className="w-full py-4 btn-primary rounded-xl font-semibold shadow-accent">Check for Updates</button>
          </div>
        </div>

        {/* About Section */}
        <div className="text-center py-4">
          <p className="text-xs text-slate-light">Version 6.0.0</p>
          <p className="text-xs text-slate-light mt-1">Made with precision by Gregorious Studio</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
