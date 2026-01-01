
import React, { useState, useMemo } from 'react';
import { BOQItem, Currency } from '../types';
import { STEEL_DIAMETERS, UNIT_TO_M } from '../constants';

interface SteelCalcProps {
  onBack: () => void;
  // Fix: omit projectId as it is added in App.tsx
  onAddBOQ: (item: Omit<BOQItem, 'id' | 'projectId' | 'timestamp' | 'currencySymbol'>) => void;
  currency: Currency;
}

const SteelCalc: React.FC<SteelCalcProps> = ({ onBack, onAddBOQ, currency }) => {
  const [dia, setDia] = useState(12);
  const [length, setLength] = useState(12);
  const [lUnit, setLUnit] = useState<'m' | 'ft'>('m');
  const [qty, setQty] = useState(10);

  const results = useMemo(() => {
    const L = length * UNIT_TO_M[lUnit];
    const weightPerM = (dia * dia) / 162;
    const singleBarWeight = weightPerM * L;
    const totalWeight = singleBarWeight * qty;

    const baseCostInInr = totalWeight * 75; // Average market rate per kg in INR
    const cost = baseCostInInr / currency.rateToInr;

    return { weightPerM, singleBarWeight, totalWeight, cost };
  }, [dia, length, lUnit, qty, currency]);

  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-4 mb-7">
        <button onClick={onBack} className="w-12 h-12 rounded-full border border-coral/20 bg-white flex items-center justify-center text-coral shadow-sm transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <div>
          <div className="text-[11px] font-bold text-coral uppercase tracking-widest leading-none mb-1">Steel Reinforcement</div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Rebar Estimator</h1>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-8 mb-6 shadow-xl border border-coral/5 flex flex-col items-center">
        <div className="w-full h-24 mb-6">
          <svg viewBox="0 0 300 100" className="w-full h-full">
            <rect x="25" y="30" width="250" height="40" rx="20" fill="#7CC4D8" opacity="0.4" stroke="#2D5A6A" strokeWidth="2" />
            <g stroke="#2D5A6A" strokeWidth="2" opacity="0.35">
              {[65, 105, 145, 185, 225].map(x => <line key={x} x1={x} y1="25" x2={x} y2="75" />)}
            </g>
          </svg>
        </div>
        <div className="text-center">
          <div className="text-[13px] font-bold text-gray-500 uppercase tracking-widest mb-1">Current Bar Size</div>
          <div className="font-mono text-3xl font-bold text-coral">Ø {dia} mm</div>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-gray-600 ml-1">Diameter selection</label>
          <div className="flex flex-wrap gap-2">
            {STEEL_DIAMETERS.map((d) => (
              <button
                key={d}
                onClick={() => setDia(d)}
                className={`px-4 py-2.5 min-w-[56px] rounded-xl text-sm font-bold border-2 transition-all ${dia === d ? 'bg-coral border-coral text-white shadow-lg' : 'bg-white border-gray-100 text-gray-600'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-gray-600 ml-1">Total length per bar</label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              placeholder="0"
              value={length || ''}
              onWheel={e => (e.target as HTMLInputElement).blur()}
              onFocus={e => e.target.select()}
              onChange={(e) => { const v = parseFloat(e.target.value); setLength(!isNaN(v) && v >= 0 ? v : 0); }}
              className="flex-1 px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl font-mono text-xl font-bold outline-none"
            />
            <select
              value={lUnit}
              onChange={(e) => setLUnit(e.target.value as any)}
              className="px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-coral text-sm"
            >
              <option value="m">m</option><option value="ft">ft</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-gray-600 ml-1">Quantity (no. of bars)</label>
          <input
            type="number"
            min="0"
            placeholder="0"
            value={qty || ''}
            onWheel={e => (e.target as HTMLInputElement).blur()}
            onFocus={e => e.target.select()}
            onChange={(e) => { const v = parseInt(e.target.value); setQty(!isNaN(v) && v >= 0 ? v : 0); }}
            className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl font-mono text-xl font-bold outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-coral/5">
        <div className="bg-gray-900 px-6 py-10 text-center text-white">
          <div className="text-[11px] font-bold opacity-60 uppercase tracking-widest mb-2">Cumulative Steel Weight</div>
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-mono text-6xl font-bold leading-none">{results.totalWeight.toFixed(2)}</span>
            <span className="text-xl font-bold opacity-70">kg</span>
          </div>
        </div>
        <div className="p-8 grid grid-cols-2 gap-3">
          {[
            { label: 'Weight/Meter', val: results.weightPerM.toFixed(3), unit: 'kg/m' },
            { label: 'Single Bar', val: results.singleBarWeight.toFixed(2), unit: 'kg' },
            { label: `Cost Est. (${currency.code})`, val: `${currency.symbol}${Math.round(results.cost).toLocaleString()}`, unit: '', full: true, color: 'border-mint bg-mint/5' },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 bg-gray-50 rounded-2xl border-l-4 border-gray-300 ${item.full ? 'col-span-2 ' + item.color : ''}`}>
              <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">{item.label}</div>
              <div className="flex items-baseline gap-1">
                <span className={`font-mono font-bold text-gray-900 ${item.full ? 'text-2xl' : 'text-xl'}`}>{item.val}</span>
                <span className="text-xs text-gray-500 font-bold">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 border-t border-gray-100">
          <button
            onClick={() => onAddBOQ({ name: 'Steel Bars', detail: `Ø${dia}mm x ${qty} bars`, amount: results.cost, type: 'steel' })}
            className="w-full py-5 bg-coral text-white rounded-[20px] font-bold shadow-xl active:scale-95 transition-all"
          >
            Add to Project BOQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default SteelCalc;
