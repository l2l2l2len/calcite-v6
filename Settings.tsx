
import React, { useContext } from 'react';
import { AppContext } from './App';
import { CURRENCIES } from './constants';

const Settings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { currency, setCurrency, darkMode, setDarkMode, rates, updateRate } = context;

  return (
    <div className="px-6 py-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center dark:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <h1 className="font-serif text-2xl font-bold dark:text-white">Profile & Preferences</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
          <h3 className="text-[11px] font-bold text-coral uppercase tracking-widest mb-4">UI Preferences</h3>
          <div className="flex justify-between items-center py-2">
            <span className="font-medium dark:text-white">Dark Mode Appearance</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${darkMode ? 'bg-coral' : 'bg-gray-200'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-all ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
          <div className="flex justify-between items-center py-4 border-t border-gray-50 dark:border-white/5 mt-2">
            <span className="font-medium dark:text-white">Global Currency</span>
            <select
              value={currency.code}
              onChange={(e) => setCurrency(CURRENCIES.find(c => c.code === e.target.value)!)}
              className="bg-gray-50 dark:bg-white/5 p-2 rounded-lg text-sm font-bold text-coral outline-none"
            >
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
          <h3 className="text-[11px] font-bold text-coral uppercase tracking-widest mb-4">Custom Material Rates</h3>
          <p className="text-[10px] text-gray-400 mb-6 italic">Set rates in your local {currency.code} to update all 200+ calculators instantly.</p>

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
                  <span className="text-xs text-gray-400">{currency.symbol}</span>
                  <input
                    type="number"
                    min="1"
                    value={rates[rate.id]}
                    onFocus={e => e.target.select()}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      // Only update if value is valid (positive number)
                      if (!isNaN(value) && value > 0) {
                        updateRate(rate.id, value);
                      } else if (e.target.value === '') {
                        // Allow empty input temporarily (user is typing)
                        updateRate(rate.id, 1);
                      }
                    }}
                    className={`w-20 bg-gray-50 dark:bg-white/5 text-right p-2 rounded-lg font-mono text-sm font-bold dark:text-white border outline-none ${rates[rate.id] < 1 ? 'border-red-500' : 'border-transparent focus:border-coral'}`}
                  />
                  <span className="text-[10px] font-bold text-gray-400 uppercase w-8">/{rate.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-[32px] text-white text-center">
          <div className="text-2xl mb-2">🏆</div>
          <h4 className="font-bold text-lg mb-1">CalcSite Pro Premium</h4>
          <p className="text-xs text-gray-400 mb-6">You are using the most advanced construction engine on the market.</p>
          <button className="w-full py-4 bg-coral rounded-2xl font-bold shadow-xl shadow-coral/20">Check for Updates</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
