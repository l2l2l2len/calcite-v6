
import React from 'react';
import { BOQItem, Currency } from './types';

interface BOQProps {
  items: BOQItem[];
  currency: Currency;
  onRemove: (id: string) => void;
  onClear: () => void;
  onGoHome: () => void;
}

const BOQ: React.FC<BOQProps> = ({ items, currency, onRemove, onClear, onGoHome }) => {
  const total = items.reduce((acc, curr) => acc + curr.amount, 0);

  const exportProject = () => {
    let text = `🏗️ CALCSITE PRO - PROJECT BILL OF QUANTITIES\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Date: ${new Date().toLocaleDateString()}\n`;
    text += `Project Status: ACTIVE ESTIMATION\n`;
    text += `Currency: ${currency.code}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    items.forEach((it, i) => {
      text += `${i + 1}. ${it.name}\n`;
      text += `   Specification: ${it.detail}\n`;
      text += `   Est. Cost: ${it.currencySymbol}${Math.round(it.amount).toLocaleString()}\n\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `GRAND TOTAL ESTIMATE: ${currency.symbol}${Math.round(total).toLocaleString()}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    text += `Generated with CalcSite Pro Excellence Suite`;

    if (navigator.share) {
      navigator.share({
        title: 'CalcSite Pro Project Export',
        text: text
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Estimation Bill copied to clipboard!');
    }
  };

  return (
    <div className="px-6 py-6 pb-48 min-h-full overflow-y-auto no-scrollbar">
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold leading-none mb-3 text-gray-900 dark:text-white">Estimate <span className="text-coral">BOQ.</span></h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium italic">Professional-grade itemized bill of quantities.</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-xl animate-in fade-in">
          <div className="text-7xl mb-6 opacity-20">📝</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Estimate Empty</h3>
          <p className="text-gray-400 mb-10 max-w-[240px] mx-auto text-sm font-medium">Add results from any workflow to build your project's technical bill.</p>
          <button
            onClick={onGoHome}
            className="px-10 py-4 bg-coral text-white rounded-2xl font-bold shadow-xl shadow-coral/30 hover:scale-105 active:scale-95 transition-all"
          >
            Start Estimation
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
          <div className="flex justify-between items-center mb-6 px-2">
            <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">{items.length} Workflows Saved</span>
            <button
              onClick={() => { if (confirm("Permanently clear this project bill?")) onClear() }}
              className="text-[12px] font-bold text-red-500 bg-red-50 dark:bg-red-900/10 px-4 py-2 rounded-full active:scale-95 transition-all"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-3 pb-10">
            {items.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-[32px] border border-gray-50 dark:border-white/5 flex justify-between items-center shadow-lg group">
                <div className="flex-1 pr-4">
                  <div className="font-bold text-[17px] text-gray-900 dark:text-white mb-1 leading-tight">{item.name}</div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{item.detail}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-mono text-[18px] font-bold text-coral leading-none">{item.currencySymbol}{Math.round(item.amount).toLocaleString()}</div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center active:scale-90 transition-all opacity-40 group-hover:opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Fixed Industrial Footer - positioned above bottom nav */}
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-40">
            <div className="bg-slate-900 dark:bg-gray-800 p-8 rounded-[40px] text-white shadow-3xl border border-white/5 flex justify-between items-center animate-in slide-in-from-bottom duration-500">
              <div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Consolidated Total</p>
                <div className="font-mono text-4xl font-bold flex items-baseline gap-1">
                  <span className="text-coral text-2xl">{currency.symbol}</span>
                  <span>{Math.round(total).toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={exportProject}
                className="w-16 h-16 rounded-2xl bg-coral text-white flex flex-col items-center justify-center shadow-xl active:scale-90 transition-all gap-1"
                title="Export Specification"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <span className="text-[8px] font-black uppercase tracking-widest">Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BOQ;
