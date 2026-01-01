
import React, { useState, useMemo } from 'react';
import { BOQItem } from '../types';
import { UNIT_TO_M } from '../constants';

interface BrickCalcProps {
  onBack: () => void;
  onAddBOQ: (item: Omit<BOQItem, 'id' | 'projectId' | 'timestamp' | 'currencySymbol'>) => void;
}

const BrickCalc: React.FC<BrickCalcProps> = ({ onBack, onAddBOQ }) => {
  const [length, setLength] = useState(10);
  const [height, setHeight] = useState(3);
  const [thickness, setThickness] = useState(230); // Default 9" wall
  const [lUnit, setLUnit] = useState<'m' | 'ft'>('m');
  const [hUnit, setHUnit] = useState<'m' | 'ft'>('m');

  const results = useMemo(() => {
    const L = length * UNIT_TO_M[lUnit];
    const H = height * UNIT_TO_M[hUnit];
    const T = thickness / 1000;

    const area = L * H;
    const volume = area * T;

    // Standard modular brick with mortar: 200x100x100mm -> 500 per m3
    const brickCount = Math.ceil(volume * 500 * 1.05); // 5% wastage
    const mortarVol = volume * 0.25 * 1.33; // 25% mortar, 1.33 dry factor
    const cementKg = mortarVol * (1 / 7) * 1440; // 1:6 ratio
    const sandM3 = mortarVol * (6 / 7);
    const cost = brickCount * 10 + Math.ceil(cementKg / 50) * 450 + sandM3 * 3000;

    return { area, volume, brickCount, cementKg, sandM3, cost };
  }, [length, height, thickness, lUnit, hUnit]);

  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-4 mb-7">
        <button onClick={onBack} className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-white active:bg-peach-light transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <div>
          <div className="text-[11px] font-bold text-coral uppercase tracking-widest leading-none mb-1">Masonry</div>
          <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">Brick Wall Calculator</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[24px] p-6 mb-6 shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-center h-32">
        <svg viewBox="0 0 300 100" className="w-full h-full">
          <g>
            {[0, 46, 92, 138, 184, 230].map(x => <rect key={x} x={15 + x} y={10} width="44" height="20" rx="2" fill="#E89B8C" stroke="#B8857A" />)}
            {[0, 46, 92, 138, 184].map(x => <rect key={x} x={38 + x} y={32} width="44" height="20" rx="2" fill="#E8A090" stroke="#B8857A" />)}
            {[0, 46, 92, 138, 184, 230].map(x => <rect key={x} x={15 + x} y={54} width="44" height="20" rx="2" fill="#E89B8C" stroke="#B8857A" />)}
          </g>
          <text x="150" y="90" fill="#D4857A" fontSize="12" className="font-mono font-bold" textAnchor="middle">{length}m x {height}m</text>
        </svg>
      </div>

      <div className="space-y-5 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-gray-600 dark:text-gray-400 ml-1">Wall Length</label>
          <div className="flex gap-2">
            <input type="number" min="0" placeholder="0" value={length || ''} onWheel={e => (e.target as HTMLInputElement).blur()} onFocus={e => e.target.select()} onChange={e => { const v = parseFloat(e.target.value); setLength(!isNaN(v) && v >= 0 ? v : 0); }} className="flex-1 px-5 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/5 rounded-2xl font-mono text-xl font-bold focus:border-coral outline-none dark:text-white" />
            <select value={lUnit} onChange={e => setLUnit(e.target.value as any)} className="px-4 py-4 bg-gray-100 dark:bg-gray-700 rounded-2xl font-bold text-coral text-sm outline-none">
              <option value="m">m</option><option value="ft">ft</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-gray-600 dark:text-gray-400 ml-1">Wall Height</label>
          <div className="flex gap-2">
            <input type="number" min="0" placeholder="0" value={height || ''} onWheel={e => (e.target as HTMLInputElement).blur()} onFocus={e => e.target.select()} onChange={e => { const v = parseFloat(e.target.value); setHeight(!isNaN(v) && v >= 0 ? v : 0); }} className="flex-1 px-5 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/5 rounded-2xl font-mono text-xl font-bold focus:border-coral outline-none dark:text-white" />
            <select value={hUnit} onChange={e => setHUnit(e.target.value as any)} className="px-4 py-4 bg-gray-100 dark:bg-gray-700 rounded-2xl font-bold text-coral text-sm outline-none">
              <option value="m">m</option><option value="ft">ft</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-gray-600 dark:text-gray-400 ml-1">Wall Thickness</label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: '4.5" (Half)', val: 115 },
              { label: '9" (Full)', val: 230 },
              { label: '13.5"', val: 345 }
            ].map((t) => (
              <button
                key={t.val}
                onClick={() => setThickness(t.val)}
                className={`flex-1 px-3 py-3 rounded-xl text-xs font-bold border-2 transition-all ${thickness === t.val ? 'bg-gradient-to-br from-coral to-coral-deep border-coral text-white' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-300'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[24px] overflow-hidden shadow-xl border border-coral/10 dark:border-white/5">
        <div className="bg-gradient-to-br from-peach-light to-cream dark:from-gray-700 dark:to-gray-800 px-6 py-10 text-center relative overflow-hidden">
          <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Bricks Required</div>
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-mono text-5xl font-bold text-gray-900 dark:text-white leading-none">{results.brickCount.toLocaleString()}</span>
            <span className="text-xl font-bold text-coral">nos</span>
          </div>
        </div>
        <div className="p-5 grid grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border-l-4 border-gray-300">
            <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Area</div>
            <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">{results.area.toFixed(2)} m²</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border-l-4 border-gray-300">
            <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Volume</div>
            <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">{results.volume.toFixed(2)} m³</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border-l-4 border-gray-500">
            <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Cement (1:6)</div>
            <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">{Math.round(results.cementKg)} kg</div>
            <div className="text-[10px] font-bold text-coral">{Math.ceil(results.cementKg / 50)} bags</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border-l-4 border-gold">
            <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Sand</div>
            <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">{results.sandM3.toFixed(2)} m³</div>
          </div>
          <div className="col-span-2 p-4 bg-mint/5 rounded-2xl border-l-4 border-mint">
            <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Estimated Cost</div>
            <div className="font-mono text-2xl font-bold text-gray-900 dark:text-white">₹{Math.round(results.cost).toLocaleString()}</div>
          </div>
        </div>
        <div className="p-5">
          <button
            onClick={() => onAddBOQ({ name: 'Brick Masonry', detail: `${length}x${height}m @ ${thickness}mm`, amount: results.cost, type: 'brick' })}
            className="w-full py-4 bg-gradient-to-br from-coral to-coral-deep text-white rounded-2xl font-bold shadow-lg"
          >
            Add to BOQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrickCalc;
