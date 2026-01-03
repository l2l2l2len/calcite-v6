
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
    let text = `CALCSITE PRO - PROJECT BILL OF QUANTITIES\n`;
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
    <div className="px-6 py-6 pb-48 min-h-full overflow-y-auto no-scrollbar bg-surface-secondary dark:bg-navy">
      <div className="mb-10">
        <h1 className="text-3xl font-bold leading-none mb-3 text-gray-900 dark:text-white tracking-tight">Estimate <span className="text-accent">BOQ.</span></h1>
        <p className="text-slate-light font-medium">Professional-grade itemized bill of quantities.</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 card-enterprise rounded-3xl animate-in fade-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Estimate Empty</h3>
          <p className="text-slate-light mb-10 max-w-[240px] mx-auto text-sm font-medium">Add results from any workflow to build your project's technical bill.</p>
          <button
            onClick={onGoHome}
            className="px-10 py-4 btn-primary text-white rounded-xl font-semibold shadow-accent hover:scale-105 active:scale-95 transition-all"
          >
            Start Estimation
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
          <div className="flex justify-between items-center mb-6 px-2">
            <span className="text-[12px] font-semibold text-slate-light uppercase tracking-widest">{items.length} Workflows Saved</span>
            <button
              onClick={() => { if (confirm("Permanently clear this project bill?")) onClear() }}
              className="text-[12px] font-semibold text-red-500 bg-red-50 dark:bg-red-900/10 px-4 py-2 rounded-full active:scale-95 transition-all"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-3 pb-10">
            {items.map((item) => (
              <div key={item.id} className="card-enterprise p-5 rounded-2xl flex justify-between items-center group">
                <div className="flex-1 pr-4">
                  <div className="font-semibold text-[16px] text-gray-900 dark:text-white mb-1 leading-tight">{item.name}</div>
                  <div className="text-[11px] font-semibold text-slate-light uppercase tracking-tight">{item.detail}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-mono text-[17px] font-bold text-accent leading-none">{item.currencySymbol}{Math.round(item.amount).toLocaleString()}</div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center active:scale-90 transition-all opacity-40 group-hover:opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Fixed Industrial Footer - positioned above bottom nav */}
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-40">
            <div className="bg-navy dark:bg-navy-light/30 p-6 rounded-2xl text-white shadow-2xl border border-white/10 flex justify-between items-center animate-in slide-in-from-bottom duration-500">
              <div>
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-1">Consolidated Total</p>
                <div className="font-mono text-3xl font-bold flex items-baseline gap-1">
                  <span className="text-accent-light text-xl">{currency.symbol}</span>
                  <span>{Math.round(total).toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={exportProject}
                className="w-14 h-14 rounded-xl btn-primary text-white flex flex-col items-center justify-center shadow-accent active:scale-90 transition-all gap-0.5"
                title="Export Specification"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <span className="text-[8px] font-semibold uppercase tracking-widest">Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BOQ;
