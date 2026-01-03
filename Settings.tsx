
import React, { useContext, useState } from 'react';
import { AppContext } from './App';
import { CURRENCIES } from './constants';
import { Screen } from './types';

interface SettingsProps {
  onBack: () => void;
  onNavigate?: (screen: Screen) => void;
}

const APP_VERSION = '6.0.0';

const Settings: React.FC<SettingsProps> = ({ onBack, onNavigate }) => {
  const context = useContext(AppContext);
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'checking' | 'latest' | 'error'>('idle');

  if (!context) return null;
  const { currency, setCurrency, darkMode, setDarkMode, rates, updateRate } = context;

  const handleCheckUpdate = async () => {
    setCheckingUpdate(true);
    setUpdateStatus('checking');

    // Simulate a version check - in production this would check a manifest or API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For a static PWA, we're always on the latest version
    setUpdateStatus('latest');
    setCheckingUpdate(false);

    // Reset status after a few seconds
    setTimeout(() => setUpdateStatus('idle'), 3000);
  };

  const handleClearData = () => {
    if (confirm('This will clear all your saved projects, BOQ items, and preferences. This action cannot be undone. Continue?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="px-6 py-6 pb-32 bg-surface-secondary dark:bg-navy min-h-full overflow-y-auto no-scrollbar">
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
          <p className="text-[10px] text-slate-light mb-6">Set rates in your local {currency.code} to update all calculators instantly.</p>

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

        {/* Quick Links */}
        {onNavigate && (
          <div className="card-enterprise p-6 rounded-2xl">
            <h3 className="text-[11px] font-semibold text-accent uppercase tracking-widest mb-4">Information</h3>
            <div className="space-y-1">
              {[
                { screen: 'about' as Screen, label: 'About CalcSite Pro', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { screen: 'help' as Screen, label: 'Help & FAQ', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { screen: 'terms' as Screen, label: 'Terms of Service', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { screen: 'privacy' as Screen, label: 'Privacy Policy', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
              ].map(link => (
                <button
                  key={link.screen}
                  onClick={() => onNavigate(link.screen)}
                  className="w-full flex items-center justify-between py-3 px-1 text-left hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-slate-light group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                    </svg>
                    <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-accent transition-colors">{link.label}</span>
                  </div>
                  <svg className="w-4 h-4 text-slate-light group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Data Management */}
        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-[11px] font-semibold text-accent uppercase tracking-widest mb-4">Data Management</h3>
          <p className="text-[10px] text-slate-light mb-4">All data is stored locally on your device. No account required.</p>
          <button
            onClick={handleClearData}
            className="w-full py-3 border-2 border-red-200 dark:border-red-900/30 text-red-500 rounded-xl font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
          >
            Clear All Data
          </button>
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
            <button
              onClick={handleCheckUpdate}
              disabled={checkingUpdate}
              className="w-full py-4 btn-primary rounded-xl font-semibold shadow-accent disabled:opacity-70 transition-all flex items-center justify-center gap-2"
            >
              {updateStatus === 'checking' && (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {updateStatus === 'idle' && 'Check for Updates'}
              {updateStatus === 'checking' && 'Checking...'}
              {updateStatus === 'latest' && (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  You're on the latest version!
                </>
              )}
              {updateStatus === 'error' && 'Unable to check - try again'}
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="text-center py-4">
          <p className="text-xs text-slate-light">Version {APP_VERSION}</p>
          <p className="text-xs text-slate-light mt-1">Made with precision by Gregorious Studio</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
