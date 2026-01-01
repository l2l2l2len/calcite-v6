
import React, { useState, useMemo } from 'react';
import { BOQItem, Currency } from './types';

interface StairCalcProps {
  onBack: () => void;
  onAddBOQ: (item: Omit<BOQItem, 'id' | 'projectId' | 'timestamp' | 'currencySymbol'>) => void;
  currency: Currency;
  rates: Record<string, number>;
}

const StairCalc: React.FC<StairCalcProps> = ({ onBack, onAddBOQ, currency, rates }) => {
  const [height, setHeight] = useState(3000); // mm
  const [riser, setRiser] = useState(150); // mm
  const [tread, setTread] = useState(300); // mm
  const [width, setWidth] = useState(1200); // mm
  const [waist, setWaist] = useState(150); // mm

  const results = useMemo(() => {
    const H = height / 1000;
    const R = riser / 1000;
    const T = tread / 1000;
    const W = width / 1000;
    const WS = waist / 1000;

    const numRisers = Math.max(1, Math.round(height / riser));
    const numTreads = numRisers - 1;
    const going = numTreads * T;

    // Steps volume (Triangular prisms)
    const stepsVol = 0.5 * R * T * W * numTreads;
    // Waist slab volume (Inclined rectangle)
    const hypotenuse = Math.sqrt(H * H + going * going);
    const waistVol = hypotenuse * W * WS;

    const totalVol = stepsVol + waistVol;

    // Cost calculation using dynamic rates
    const costInInr = totalVol * 7500; // Base market rate per m3 concrete works
    const cost = costInInr / currency.rateToInr;

    return { numRisers, numTreads, going, totalVol, cost };
  }, [height, riser, tread, width, waist, currency]);

  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-12 h-12 rounded-full border border-coral/20 bg-white dark:bg-gray-800 flex items-center justify-center text-coral shadow-sm active:bg-peach-light transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <div>
          <p className="text-[11px] font-bold text-coral uppercase tracking-widest leading-none mb-1">RCC Structure</p>
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">Staircase Calc</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[32px] p-6 mb-8 shadow-xl border border-coral/5 dark:border-white/5 relative overflow-hidden h-52 flex items-center justify-center">
        <div className="absolute top-4 left-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sectional Diagram</div>
        <svg viewBox="0 0 300 160" className="w-full h-full">
          <path d="M 50 140 L 90 140 L 90 110 L 130 110 L 130 80 L 170 80 L 170 50 L 210 50 L 210 20 L 250 20" fill="none" stroke="#D4857A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 50 140 L 50 155 L 265 35 L 250 20" fill="#EABEAB" opacity="0.3" />
          <line x1="30" y1="20" x2="30" y2="140" stroke="#D4857A" strokeWidth="1" strokeDasharray="4 2" />
          <text x="25" y="80" fill="#D4857A" fontSize="10" transform="rotate(-90, 25, 80)" className="font-mono font-bold uppercase">Height: {height}mm</text>
        </svg>
      </div>

      <div className="space-y-6 mb-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-gray-500 dark:text-gray-400 ml-1">Total Height (mm)</label>
            <input type="number" min="0" placeholder="0" value={height || ''} onWheel={e => (e.target as HTMLInputElement).blur()} onFocus={e => e.target.select()} onChange={e => { const v = parseFloat(e.target.value); setHeight(!isNaN(v) && v >= 0 ? v : 0); }} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/5 rounded-2xl font-mono text-xl font-bold focus:border-coral outline-none transition-all dark:text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-gray-500 dark:text-gray-400 ml-1">Stair Width (mm)</label>
            <input type="number" min="0" placeholder="0" value={width || ''} onWheel={e => (e.target as HTMLInputElement).blur()} onFocus={e => e.target.select()} onChange={e => { const v = parseFloat(e.target.value); setWidth(!isNaN(v) && v >= 0 ? v : 0); }} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/5 rounded-2xl font-mono text-xl font-bold focus:border-coral outline-none transition-all dark:text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-gray-500 dark:text-gray-400 ml-1">Riser (mm)</label>
            <input type="number" min="0" placeholder="0" value={riser || ''} onWheel={e => (e.target as HTMLInputElement).blur()} onFocus={e => e.target.select()} onChange={e => { const v = parseFloat(e.target.value); setRiser(!isNaN(v) && v >= 0 ? v : 0); }} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/5 rounded-2xl font-mono text-xl font-bold focus:border-coral outline-none transition-all dark:text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-gray-500 dark:text-gray-400 ml-1">Tread (mm)</label>
            <input type="number" min="0" placeholder="0" value={tread || ''} onWheel={e => (e.target as HTMLInputElement).blur()} onFocus={e => e.target.select()} onChange={e => { const v = parseFloat(e.target.value); setTread(!isNaN(v) && v >= 0 ? v : 0); }} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/5 rounded-2xl font-mono text-xl font-bold focus:border-coral outline-none transition-all dark:text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[12px] font-bold text-gray-500 dark:text-gray-400 ml-1">Waist Slab Thickness (mm)</label>
          <input type="number" min="0" placeholder="0" value={waist || ''} onWheel={e => (e.target as HTMLInputElement).blur()} onFocus={e => e.target.select()} onChange={e => { const v = parseFloat(e.target.value); setWaist(!isNaN(v) && v >= 0 ? v : 0); }} className="w-full px-5 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-white/5 rounded-2xl font-mono text-xl font-bold focus:border-coral outline-none transition-all dark:text-white" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden shadow-2xl border border-coral/5 dark:border-white/5 mb-8">
        <div className="bg-gradient-to-br from-coral to-coral-deep p-10 text-center text-white">
          <div className="text-[11px] font-bold opacity-60 uppercase tracking-widest mb-3">Total Risers Required</div>
          <div className="flex items-baseline justify-center gap-3">
            <span className="font-mono text-6xl font-bold leading-none">{results.numRisers}</span>
            <span className="text-2xl font-bold opacity-70">nos</span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Treads', val: results.numTreads, unit: 'nos', color: 'border-gray-800 dark:border-white/20' },
              { label: 'Total Volume', val: results.totalVol.toFixed(3), unit: 'm³', color: 'border-coral' },
              { label: 'Going Length', val: results.going.toFixed(2), unit: 'm', color: 'border-gold' },
              { label: 'Total Cost', val: `${currency.symbol}${Math.round(results.cost).toLocaleString()}`, unit: '', color: 'border-mint bg-mint/[0.03] dark:bg-mint/5' },
            ].map((it, i) => (
              <div key={i} className={`p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border-l-4 ${it.color}`}>
                <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">{it.label}</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xl font-bold text-gray-900 dark:text-white leading-none">{it.val}</span>
                  <span className="text-[11px] font-bold text-gray-400">{it.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={() => onAddBOQ({ name: 'RCC Staircase', detail: `${results.numRisers} Risers x ${width}mm Width`, amount: results.cost, type: 'stair' })}
              className="w-full py-5 bg-gray-900 dark:bg-coral text-white rounded-[22px] font-bold shadow-xl active:scale-95 transition-all text-[16px]"
            >
              Save to Project BOQ
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-peach-light/20 dark:bg-white/5 rounded-[28px] border border-coral/10">
        <h4 className="text-[13px] font-bold text-coral mb-3 uppercase tracking-widest">Structural Rules</h4>
        <ul className="space-y-2.5 text-[12px] text-gray-600 dark:text-gray-400 font-medium">
          <li className="flex gap-2"><span>•</span> <span>Ideal Riser height for residential: 150mm to 175mm</span></li>
          <li className="flex gap-2"><span>•</span> <span>Ideal Tread width: 250mm to 300mm</span></li>
          <li className="flex gap-2"><span>•</span> <span>Standard Rule: 2 x Riser + Tread = 600mm to 650mm</span></li>
        </ul>
      </div>
    </div>
  );
};

export default StairCalc;
