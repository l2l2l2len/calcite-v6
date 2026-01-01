
import React, { useState, useMemo } from 'react';
import { Screen } from './types';
import { CATEGORIES, CALCULATORS, REFERENCE_TABLES, THUMB_RULES, TRADE_ICONS } from './constants';

interface HomeProps {
  onSelectCalc: (s: Screen) => void;
  onSelectCategory: (id: string) => void;
  selectedTrades: string[];
}

// Moved outside component to prevent recreation on every render
const NATIVE_CALCULATORS = [
  { id: 'slab', name: 'Slab Concrete', trade: 'General Contractor', description: 'Volume & dry mix materials' },
  { id: 'steel', name: 'Steel Reinforcement', trade: 'General Contractor', description: 'D²/162 weight tool' },
  { id: 'brick', name: 'Brick Masonry', trade: 'General Contractor', description: 'Wall & mortar estimator' },
  { id: 'stair', name: 'RCC Staircase', trade: 'General Contractor', description: 'Riser/Tread concrete' },
  { id: 'column', name: 'RCC Column', trade: 'General Contractor', description: 'Mix & rebar sizing' },
  { id: 'footing', name: 'RCC Footing', trade: 'General Contractor', description: 'Volume & base concrete' },
  { id: 'convert', name: 'Unit Converter', trade: 'General Contractor', description: 'Global precision switching' }
];

const Home: React.FC<HomeProps> = ({ onSelectCalc, onSelectCategory, selectedTrades }) => {
  const [search, setSearch] = useState('');

  const searchResults = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();

    const calcs = [...NATIVE_CALCULATORS, ...CALCULATORS].filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q) ||
      c.trade.toLowerCase().includes(q)
    );

    const refs = [...REFERENCE_TABLES, ...THUMB_RULES].filter(r =>
      (r as any).title?.toLowerCase().includes(q)
    );

    return { calcs, refs };
  }, [search]);

  return (
    <div className="px-6 py-6 space-y-8 animate-in fade-in duration-500 overflow-y-auto no-scrollbar h-full">
      <div className="mb-2">
        <h1 className="font-serif text-3xl font-bold dark:text-white leading-tight">CalcSite <span className="text-coral">Pro.</span></h1>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 uppercase font-black tracking-widest mt-1">Industrial Grade Engineering Suite</p>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
        </div>
        <input
          type="text"
          placeholder="Search tools, mix grades, codes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-5 bg-white dark:bg-gray-800 rounded-[28px] border border-gray-100 dark:border-white/5 shadow-xl focus:border-coral outline-none text-[15px] font-medium transition-all dark:text-white"
        />
      </div>

      {searchResults ? (
        <div className="space-y-8 animate-in slide-in-from-bottom duration-300">
          {searchResults.calcs.length > 0 && (
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-2">Matched Calculators</h3>
              <div className="space-y-3">
                {searchResults.calcs.map(c => (
                  <button key={c.id} onClick={() => onSelectCalc(c.id)} className="w-full flex items-center p-5 bg-white dark:bg-gray-800 rounded-[24px] border border-gray-50 dark:border-white/5 shadow-md text-left active:scale-[0.98] transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-2xl mr-4">{TRADE_ICONS[c.trade as any] || '🏗️'}</div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white leading-tight">{c.name}</div>
                      <div className="text-[10px] font-bold text-coral uppercase tracking-tight mt-0.5">{c.trade}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {searchResults.refs.length > 0 && (
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-2">Library Topics</h3>
              <div className="space-y-3">
                {searchResults.refs.map((r: any, idx) => (
                  <button key={idx} onClick={() => onSelectCalc('reference')} className="w-full flex items-center p-5 bg-blue-50/50 dark:bg-blue-900/10 rounded-[24px] border border-blue-100 dark:border-blue-900/20 text-left active:scale-[0.98] transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl mr-4">📚</div>
                    <div>
                      <div className="font-bold text-blue-900 dark:text-blue-300 leading-tight">{r.title}</div>
                      <div className="text-[10px] font-bold text-blue-400 uppercase tracking-tight mt-0.5">Reference Document</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <>
          <section>
            <div className="flex justify-between items-center mb-5 px-1">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tool Categories</h3>
              <span className="text-[10px] font-bold text-coral">Deep Library</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="p-6 bg-white dark:bg-gray-800 rounded-[32px] border border-gray-50 dark:border-white/5 shadow-sm text-left group active:scale-95 transition-all"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-2xl mb-4 group-hover:bg-coral group-hover:text-white transition-all shadow-inner`}>
                    {cat.icon}
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white leading-tight">{cat.name}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1">{cat.count} Workflows</div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-5 px-1">Core Essentials</h3>
            <div className="space-y-4">
              {NATIVE_CALCULATORS.map(calc => (
                <button
                  key={calc.id}
                  onClick={() => onSelectCalc(calc.id as Screen)}
                  className="w-full bg-white dark:bg-gray-800 p-6 rounded-[32px] border border-gray-50 dark:border-white/5 shadow-sm text-left flex items-center group active:scale-[0.98] transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-coral/10 text-coral flex items-center justify-center text-3xl mr-5 group-hover:bg-coral group-hover:text-white transition-all shadow-lg shadow-coral/5">
                    {TRADE_ICONS[calc.trade as any] || '🏗️'}
                  </div>
                  <div className="flex-1">
                    <span className="block font-bold text-lg text-gray-900 dark:text-white leading-tight">{calc.name}</span>
                    <span className="block text-[11px] text-gray-400 font-bold uppercase tracking-tight mt-1">{calc.description}</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
