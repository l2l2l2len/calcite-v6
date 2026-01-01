
import React, { useState, useMemo } from 'react';
import { BOQItem } from '../types';
import { MIX_RATIOS } from '../constants';

interface ColumnCalcProps {
  onBack: () => void;
  onAddBOQ: (item: Omit<BOQItem, 'id' | 'projectId' | 'timestamp' | 'currencySymbol'>) => void;
}

const ColumnCalc: React.FC<ColumnCalcProps> = ({ onBack, onAddBOQ }) => {
  const [width, setWidth] = useState(300);
  const [depth, setDepth] = useState(450);
  const [height, setHeight] = useState(3);
  const [qty, setQty] = useState(1);

  const results = useMemo(() => {
    const W = width / 1000;
    const D = depth / 1000;
    const H = height;
    const volume = W * D * H * qty;
    const dryVol = volume * 1.54;
    const mix = MIX_RATIOS['M25'];
    const totalParts = mix.c + mix.s + mix.a;
    const cementKg = (dryVol * mix.c / totalParts) * 1440;
    const sandM3 = (dryVol * mix.s / totalParts);
    const aggM3 = (dryVol * mix.a / totalParts);
    const cost = volume * 8000;

    return { volume, cementKg, sandM3, aggM3, cost };
  }, [width, depth, height, qty]);

  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-4 mb-7">
        <button onClick={onBack} className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-white active:bg-peach-light transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <div>
          <div className="text-[11px] font-bold text-coral uppercase tracking-widest mb-1">Concrete</div>
          <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">Column Calculator</h1>
        </div>
      </div>

      <div className="space-y-5 mb-8">
        {[
          { label: 'Width (mm)', val: width, set: setWidth },
          { label: 'Depth (mm)', val: depth, set: setDepth },
          { label: 'Height (m)', val: height, set: setHeight },
          { label: 'Number of Columns', val: qty, set: setQty },
        ].map((f, i) => (
          <div key={i} className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-600 dark:text-gray-400 ml-1">{f.label}</label>
            <input type="number" min="0" placeholder="0" value={f.val || ''} onWheel={e => (e.target as HTMLInputElement).blur()} onFocus={e => e.target.select()} onChange={e => { const v = parseFloat(e.target.value); f.set(!isNaN(v) && v >= 0 ? v : 0); }} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/5 rounded-2xl font-mono text-xl font-bold focus:border-coral outline-none dark:text-white" />
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[24px] overflow-hidden shadow-xl border border-coral/10 dark:border-white/5">
        <div className="bg-gradient-to-br from-peach-light to-cream dark:from-gray-700 dark:to-gray-800 px-6 py-10 text-center">
          <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Total Volume</div>
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-mono text-5xl font-bold text-gray-900 dark:text-white">{results.volume.toFixed(2)}</span>
            <span className="text-xl font-bold text-coral">m³</span>
          </div>
        </div>
        <div className="p-5 grid grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border-l-4 border-gray-500">
            <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Cement</div>
            <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">{Math.round(results.cementKg)} kg</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border-l-4 border-gold">
            <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Sand</div>
            <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">{results.sandM3.toFixed(2)} m³</div>
          </div>
          <div className="col-span-2 p-4 bg-mint/5 rounded-2xl border-l-4 border-mint">
            <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Est. Cost (M25)</div>
            <div className="font-mono text-2xl font-bold text-gray-900 dark:text-white">₹{Math.round(results.cost).toLocaleString()}</div>
          </div>
        </div>
        <div className="p-5">
          <button
            onClick={() => onAddBOQ({ name: 'RCC Columns', detail: `${qty}nos x ${width}x${depth}mm`, amount: results.cost, type: 'column' })}
            className="w-full py-4 bg-gradient-to-br from-coral to-coral-deep text-white rounded-2xl font-bold shadow-lg"
          >
            Add to BOQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnCalc;
