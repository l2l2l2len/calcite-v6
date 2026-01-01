
import React, { useState, useMemo, useContext } from 'react';
import { TOOLS_LIBRARY } from './constants';
import { Currency, BOQItem } from './types';
import { AppContext } from './App';

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
      <div className="px-5 py-6 flex flex-col items-center justify-center h-full">
        <div className="text-5xl mb-4 opacity-30">⚠️</div>
        <p className="font-bold text-gray-500 dark:text-gray-400">Tool not found</p>
        <button onClick={onBack} className="mt-6 px-6 py-3 bg-coral text-white rounded-xl font-bold">Go Back</button>
      </div>
    );
  }

  const [values, setValues] = useState<Record<string, number>>(
    tool.inputs.reduce((acc: Record<string, number>, curr: any) => ({ ...acc, [curr.key]: curr.default }), {})
  );

  const results = useMemo(() => {
    return tool.formula(values, rates);
  }, [values, rates, tool]);

  return (
    <div className="px-5 py-6 animate-slide-in">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white active:scale-90 transition-all shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <div>
          <div className="text-[10px] font-bold text-coral uppercase tracking-widest leading-none mb-1">{tool.category} WORK</div>
          <h1 className="font-serif text-3xl font-bold dark:text-white leading-tight">{tool.name}</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 mb-8 shadow-xl border border-coral/5 dark:border-white/5 flex flex-col items-center">
        <div className="w-full h-32 mb-6 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center">
          <div className="text-6xl animate-pulse">{tool.icon}</div>
        </div>
        <div className="text-center">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Output</div>
          <div className="font-mono text-4xl font-bold text-coral flex items-baseline gap-2 justify-center">
            {results.mainValue.toFixed(2)}
            <span className="text-lg opacity-60 uppercase">{results.mainUnit}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-10">
        {tool.inputs.map(input => (
          <div key={input.key} className="space-y-2">
            <label className="text-[13px] font-bold text-gray-500 dark:text-gray-400 ml-1">{input.label}</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                placeholder="0"
                value={values[input.key] || ''}
                onWheel={e => (e.target as HTMLInputElement).blur()}
                onFocus={e => e.target.select()}
                onChange={e => { const v = parseFloat(e.target.value); setValues({ ...values, [input.key]: !isNaN(v) && v >= 0 ? v : 0 }); }}
                className="flex-1 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/5 rounded-2xl font-mono text-xl font-bold focus:border-coral outline-none transition-all dark:text-white shadow-sm"
              />
              <div className="w-16 flex items-center justify-center font-bold text-xs text-coral bg-coral/5 rounded-2xl border-2 border-coral/10">
                {input.unit}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden shadow-2xl border border-coral/5 dark:border-white/5 mb-8">
        <div className="bg-gray-900 p-8">
          <div className="grid grid-cols-2 gap-4">
            {results.details.map((d, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border-l-2 border-coral">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">{d.label}</div>
                <div className="font-mono text-lg font-bold text-white leading-none">{d.value} <span className="text-[10px] opacity-40">{d.unit}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-8 px-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Est. Cost</span>
            <span className="font-mono text-2xl font-bold text-gray-900 dark:text-white">
              {currency.symbol}{Math.round(results.cost).toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => onAddBOQ({
              name: tool.name,
              detail: Object.entries(values).map(([k, v]) => `${k}:${v}`).join(', '),
              amount: results.cost,
              type: tool.id
            })}
            className="w-full py-5 bg-coral text-white rounded-[22px] font-bold shadow-xl active:scale-95 transition-all text-lg"
          >
            Save to BOQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericCalc;
