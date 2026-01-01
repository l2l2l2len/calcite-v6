
import React, { useState, useMemo } from 'react';
import { CONVERSION_RATES } from './constants';

const Converter: React.FC = () => {
  const [type, setType] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [fromValue, setFromValue] = useState<number>(1);

  const result = useMemo(() => {
    const rates = CONVERSION_RATES[type];
    if (!rates) return 0;
    const base = fromValue / rates[fromUnit];
    return base * rates[toUnit];
  }, [type, fromUnit, toUnit, fromValue]);

  const swap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    setFromValue(parseFloat(result.toFixed(4)));
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    const units = Object.keys(CONVERSION_RATES[newType]);
    setFromUnit(units[0]);
    setToUnit(units[1]);
  };

  return (
    <div className="px-6 py-6 h-full overflow-y-auto no-scrollbar">
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold leading-tight mb-3 text-gray-900 dark:text-white">Unit <span className="text-coral">Converter.</span></h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium italic">Instant precision for international site standards.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[40px] p-8 border border-gray-100 dark:border-white/5 shadow-2xl">
        <div className="flex gap-2 p-1.5 bg-gray-100 dark:bg-gray-900 rounded-2xl mb-10 overflow-x-auto no-scrollbar">
          {Object.keys(CONVERSION_RATES).map((t) => (
            <button
              key={t}
              onClick={() => handleTypeChange(t)}
              className={`flex-1 py-3.5 px-6 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 ${type === t ? 'bg-white dark:bg-gray-800 text-coral shadow-sm' : 'text-gray-400'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Input Value</label>
            <div className="flex items-stretch gap-3">
              <input
                type="number"
                min="0"
                placeholder="0"
                value={fromValue || ''}
                onWheel={e => (e.target as HTMLInputElement).blur()}
                onFocus={e => e.target.select()}
                onChange={e => { const v = parseFloat(e.target.value); setFromValue(!isNaN(v) && v >= 0 ? v : 0); }}
                className="flex-1 min-w-0 px-6 py-5 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl font-mono text-2xl font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-coral/20"
              />
              <select
                value={fromUnit}
                onChange={e => setFromUnit(e.target.value)}
                className="w-24 shrink-0 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/10 rounded-2xl px-3 font-bold text-coral text-sm outline-none appearance-none text-center"
              >
                {Object.keys(CONVERSION_RATES[type]).map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-center py-2">
            <button
              onClick={swap}
              className="w-14 h-14 bg-slate-900 dark:bg-coral text-white rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-all"
              title="Swap Units"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Converted Result</label>
            <div className="flex items-stretch gap-3">
              <div className="flex-1 min-w-0 px-6 py-5 bg-coral/10 rounded-2xl font-mono text-2xl font-bold text-coral flex items-center overflow-hidden">
                <span className="truncate">{result.toFixed(4)}</span>
              </div>
              <select
                value={toUnit}
                onChange={e => setToUnit(e.target.value)}
                className="w-24 shrink-0 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/10 rounded-2xl px-3 font-bold text-coral text-sm outline-none appearance-none text-center"
              >
                {Object.keys(CONVERSION_RATES[type]).map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t dark:border-white/5">
          <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-5 px-1">Common Equivalents</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-3xl flex flex-col items-center justify-center text-center shadow-inner">
              <span className="text-[9px] font-black text-gray-400 uppercase mb-2">1 {fromUnit} is</span>
              <span className="font-mono font-black text-coral text-xl">{(1 / CONVERSION_RATES[type][fromUnit] * CONVERSION_RATES[type][toUnit]).toFixed(3)}</span>
              <span className="text-[9px] font-black text-gray-400 uppercase mt-1">{toUnit}</span>
            </div>
            <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-3xl flex flex-col items-center justify-center text-center shadow-inner">
              <span className="text-[9px] font-black text-gray-400 uppercase mb-2">1 {toUnit} is</span>
              <span className="font-mono font-black text-coral text-xl">{(1 / CONVERSION_RATES[type][toUnit] * CONVERSION_RATES[type][fromUnit]).toFixed(3)}</span>
              <span className="text-[9px] font-black text-gray-400 uppercase mt-1">{fromUnit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
