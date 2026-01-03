
import React, { useState, useMemo } from 'react';
import { TOOLS_LIBRARY } from './constants';
import { Currency, BOQItem } from './types';

interface Props {
  toolId: string;
  onBack: () => void;
  onAddBOQ: (item: Omit<BOQItem, 'id' | 'projectId' | 'timestamp' | 'currencySymbol'>) => void;
  currency: Currency;
  rates: Record<string, number>;
}

const GenericCalc: React.FC<Props> = ({ toolId, onBack, onAddBOQ, currency, rates }) => {
  const tool = TOOLS_LIBRARY[toolId];

  // Early return if tool doesn't exist - must be before any hooks that depend on tool
  if (!tool) {
    return (
      <div className="px-6 py-6 flex flex-col items-center justify-center h-full bg-surface-secondary dark:bg-navy">
        <div className="card-enterprise rounded-2xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Tool Not Found</h3>
          <p className="text-sm text-slate-light mb-6">The requested calculator could not be loaded.</p>
          <button onClick={onBack} className="px-8 py-3 btn-primary text-white rounded-xl font-semibold">Go Back</button>
        </div>
      </div>
    );
  }

  const [values, setValues] = useState<Record<string, number | string>>(
    tool.inputs.reduce((acc: Record<string, number | string>, curr: any) => ({ ...acc, [curr.key]: curr.default }), {})
  );

  const results = useMemo(() => {
    return tool.formula(values, rates);
  }, [values, rates, tool]);

  const handleInputChange = (key: string, value: string, type: string = 'number') => {
    if (type === 'number') {
      const v = parseFloat(value);
      setValues({ ...values, [key]: !isNaN(v) && v >= 0 ? v : 0 });
    } else {
      setValues({ ...values, [key]: value });
    }
  };

  return (
    <div className="px-6 py-6 pb-32 overflow-y-auto no-scrollbar h-full bg-surface-secondary dark:bg-navy animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <div>
          <div className="text-[10px] font-semibold text-accent uppercase tracking-widest leading-none mb-1">{tool.category?.toUpperCase()} WORKFLOW</div>
          <h1 className="text-2xl font-bold dark:text-white leading-tight tracking-tight">{tool.name}</h1>
        </div>
      </div>

      {/* Result Card */}
      <div className="card-enterprise rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center text-3xl">
            {tool.icon}
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-semibold text-slate-light uppercase tracking-widest mb-1">Result</div>
            <div className="font-mono text-3xl font-bold text-accent flex items-baseline gap-2">
              {typeof results.mainValue === 'number' ? results.mainValue.toFixed(2) : results.mainValue}
              <span className="text-sm opacity-60 uppercase">{results.mainUnit}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-light mb-4">{tool.description}</p>
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-6">
        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-light px-1">Input Parameters</h3>
        {tool.inputs.map((input: any) => (
          <div key={input.key} className="card-enterprise p-4 rounded-xl">
            <label className="text-[12px] font-semibold text-slate-light mb-2 block">{input.label}</label>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                min="0"
                placeholder="0"
                value={values[input.key] || ''}
                onWheel={e => (e.target as HTMLInputElement).blur()}
                onFocus={e => e.target.select()}
                onChange={e => handleInputChange(input.key, e.target.value, 'number')}
                className="flex-1 px-4 py-3 bg-surface-tertiary dark:bg-white/5 rounded-xl font-mono text-lg font-semibold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none border border-gray-200 dark:border-white/10 transition-all dark:text-white"
              />
              {input.unit && (
                <div className="min-w-[60px] px-3 py-3 flex items-center justify-center font-semibold text-xs text-accent bg-accent/5 rounded-xl border border-accent/10">
                  {input.unit}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Details Breakdown */}
      {results.details && results.details.length > 0 && (
        <div className="bg-navy dark:bg-navy-light/20 rounded-2xl p-5 mb-6">
          <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/60 mb-4">Calculation Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {results.details.map((d: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border-l-2 border-accent">
                <div className="text-[9px] font-semibold text-white/50 uppercase tracking-widest mb-1">{d.label}</div>
                <div className="font-mono text-base font-bold text-white leading-none">
                  {d.value} <span className="text-[10px] opacity-40">{d.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cost and BOQ Button */}
      <div className="card-enterprise rounded-2xl p-6">
        {results.cost > 0 && (
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
            <span className="text-sm font-semibold text-slate-light uppercase tracking-widest">Est. Cost</span>
            <span className="font-mono text-2xl font-bold text-gray-900 dark:text-white">
              {currency.symbol}{Math.round(results.cost).toLocaleString()}
            </span>
          </div>
        )}

        <button
          onClick={() => onAddBOQ({
            name: tool.name,
            detail: Object.entries(values).map(([k, v]) => `${k}:${v}`).join(', '),
            amount: results.cost || 0,
            type: tool.id
          })}
          className="w-full py-4 btn-primary text-white rounded-xl font-semibold shadow-accent active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add to BOQ
        </button>
      </div>
    </div>
  );
};

export default GenericCalc;
