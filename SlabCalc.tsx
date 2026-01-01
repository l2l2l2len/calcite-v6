
import React, { useState, useMemo } from 'react';
import { BOQItem, Currency } from '../types';
import { MIX_RATIOS, UNIT_TO_M } from '../constants';

interface SlabCalcProps {
  onBack: () => void;
  // Fix: omit projectId as it is added in App.tsx
  onAddBOQ: (item: Omit<BOQItem, 'id' | 'projectId' | 'timestamp' | 'currencySymbol'>) => void;
  currency: Currency;
}

const SlabCalc: React.FC<SlabCalcProps> = ({ onBack, onAddBOQ, currency }) => {
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(4);
  const [thickness, setThickness] = useState(150);
  const [lUnit, setLUnit] = useState<'m' | 'ft'>('m');
  const [wUnit, setWUnit] = useState<'m' | 'ft'>('m');
  const [tUnit, setTUnit] = useState<'mm' | 'm'>('mm');
  const [grade, setGrade] = useState<keyof typeof MIX_RATIOS>('M20');

  const results = useMemo(() => {
    const L = length * UNIT_TO_M[lUnit];
    const W = width * UNIT_TO_M[wUnit];
    const T = tUnit === 'mm' ? thickness / 1000 : thickness;
    const volume = L * W * T;
    const dryVolume = volume * 1.54;
    const mix = MIX_RATIOS[grade];
    const totalParts = mix.c + mix.s + mix.a;

    const cementKg = (dryVolume * mix.c / totalParts) * 1440;
    const sandM3 = (dryVolume * mix.s / totalParts);
    const aggM3 = (dryVolume * mix.a / totalParts);

    const baseCostInInr = volume * 7200;
    const cost = baseCostInInr / currency.rateToInr;

    return { volume, cementKg, sandM3, aggM3, cost };
  }, [length, width, thickness, lUnit, wUnit, tUnit, grade, currency]);

  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-12 h-12 rounded-full border border-coral/20 bg-white dark:bg-gray-800 flex items-center justify-center text-coral shadow-sm active:bg-peach-light transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <div>
          <p className="text-[11px] font-bold text-coral uppercase tracking-widest leading-none mb-1">RCC Structure</p>
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">Slab Calculator</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[32px] p-6 mb-8 shadow-xl border border-coral/5 dark:border-white/5 h-48 flex items-center justify-center">
        <svg viewBox="0 0 300 160" className="w-full h-full">
          <path d="M 45 65 L 155 40 L 255 70 L 145 95 Z" fill="#EABEAB" stroke="#B8857A" strokeWidth="2" />
          <path d="M 155 40 L 255 70 L 255 100 L 155 70 Z" fill="#D4A494" stroke="#B8857A" strokeWidth="2" />
          <path d="M 45 65 L 145 95 L 145 125 L 45 95 Z" fill="#EABEAB" opacity="0.6" stroke="#B8857A" strokeWidth="2" />
        </svg>
      </div>

      <div className="space-y-6 mb-10">
        {[
          { label: 'Length', val: length, set: setLength, unit: lUnit, setUnit: setLUnit, options: ['m', 'ft'] },
          { label: 'Width', val: width, set: setWidth, unit: wUnit, setUnit: setWUnit, options: ['m', 'ft'] },
          { label: 'Thickness', val: thickness, set: setThickness, unit: tUnit, setUnit: setTUnit, options: ['mm', 'm'] },
        ].map((f, i) => (
          <div key={i} className="space-y-2">
            <label className="text-[13px] font-bold text-gray-500 ml-1">{f.label}</label>
            <div className="flex gap-2">
              <input type="number" min="0" placeholder="0" value={f.val || ''} onWheel={e => (e.target as HTMLInputElement).blur()} onFocus={e => e.target.select()} onChange={e => { const v = parseFloat(e.target.value); f.set(!isNaN(v) && v >= 0 ? v : 0); }} className="flex-1 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/5 rounded-2xl font-mono text-xl font-bold focus:border-coral outline-none transition-all dark:text-white" />
              <select value={f.unit} onChange={e => f.setUnit(e.target.value as any)} className="w-20 px-4 bg-gray-50 dark:bg-gray-700 rounded-2xl font-bold text-coral text-sm appearance-none border-2 border-gray-100 dark:border-white/5 outline-none">
                {f.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
        ))}

        <div className="space-y-2">
          <label className="text-[13px] font-bold text-gray-500 dark:text-gray-400 ml-1">Concrete Mix Grade</label>
          <div className="grid grid-cols-4 gap-2">
            {Object.keys(MIX_RATIOS).map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g as any)}
                className={`py-3.5 rounded-xl font-bold text-sm border-2 transition-all ${grade === g ? 'bg-coral border-coral text-white' : 'bg-white border-gray-100 text-gray-400'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden shadow-2xl border border-coral/5 dark:border-white/5">
        <div className="bg-gray-900 p-10 text-center text-white">
          <div className="text-[11px] font-bold opacity-60 uppercase tracking-widest mb-3">Net Concrete Volume</div>
          <div className="flex items-baseline justify-center gap-3">
            <span className="font-mono text-6xl font-bold leading-none">{results.volume.toFixed(2)}</span>
            <span className="text-2xl font-bold opacity-70">m³</span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Cement', val: Math.round(results.cementKg), unit: 'kg', sub: `${Math.ceil(results.cementKg / 50)} bags`, color: 'border-gray-800' },
              { label: 'Sand', val: results.sandM3.toFixed(2), unit: 'm³', color: 'border-gold' },
              { label: 'Aggregate', val: results.aggM3.toFixed(2), unit: 'm³', color: 'border-coral' },
              { label: 'Cost Est.', val: `${currency.symbol}${Math.round(results.cost).toLocaleString()}`, unit: '', color: 'border-mint bg-mint/[0.03]' },
            ].map((it, i) => (
              <div key={i} className={`p-5 bg-gray-50 rounded-2xl border-l-4 ${it.color}`}>
                <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">{it.label}</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xl font-bold text-gray-900 dark:text-white leading-none">{it.val}</span>
                  <span className="text-[11px] font-bold text-gray-400">{it.unit}</span>
                </div>
                {it.sub && <div className="text-[10px] font-bold text-coral mt-1.5">{it.sub}</div>}
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => onAddBOQ({ name: 'Slab Concrete', detail: `${length}x${width}m @ ${thickness}mm`, amount: results.cost, type: 'slab' })}
              className="w-full py-5 bg-coral text-white rounded-[20px] font-bold shadow-xl active:scale-95 transition-all"
            >
              Add to Project BOQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlabCalc;
