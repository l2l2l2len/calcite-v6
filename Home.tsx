
import React, { useState, useMemo } from 'react';
import { Screen } from './types';
import { CATEGORIES, CALCULATORS, REFERENCE_TABLES, THUMB_RULES, TRADE_ICONS } from './constants';

interface HomeProps {
  onSelectCalc: (s: Screen) => void;
  onSelectCategory: (id: string) => void;
  selectedTrades: string[];
}

// Features to display on home page with icons
const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: '200+ Calculators',
    desc: 'From concrete mix to steel weight'
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Smart BOQ',
    desc: 'Auto-generate bill of quantities'
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'AI Assistant',
    desc: 'Get instant construction advice'
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Cost Estimation',
    desc: 'Real-time pricing in any currency'
  }
];

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
    <div className="px-6 py-6 space-y-8 animate-in fade-in duration-500 overflow-y-auto no-scrollbar h-full bg-surface-secondary dark:bg-navy">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold dark:text-white leading-tight tracking-tight">CalcSite <span className="text-accent">Pro.</span></h1>
        <p className="text-[12px] text-slate-light uppercase font-semibold tracking-widest mt-1">Industrial Grade Engineering Suite</p>
      </div>

      {/* Features Section - Clean Card Grid */}
      <div className="grid grid-cols-2 gap-3">
        {FEATURES.map((feature, idx) => (
          <div
            key={idx}
            className="card-enterprise p-4 rounded-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-3">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{feature.title}</h3>
            <p className="text-slate-light text-[11px] mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Search Bar - Enterprise Style */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
        </div>
        <input
          type="text"
          placeholder="Search tools, mix grades, codes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-4 bg-white dark:bg-navy-light/20 rounded-2xl border border-gray-200 dark:border-white/10 shadow-enterprise focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-[15px] font-medium transition-all dark:text-white placeholder:text-slate-light"
        />
      </div>

      {searchResults ? (
        <div className="space-y-8 animate-in slide-in-from-bottom duration-300">
          {searchResults.calcs.length > 0 && (
            <section>
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-light mb-4 px-2">Matched Calculators</h3>
              <div className="space-y-3">
                {searchResults.calcs.map(c => (
                  <button key={c.id} onClick={() => onSelectCalc(c.id)} className="w-full flex items-center p-5 card-enterprise rounded-2xl text-left active:scale-[0.98] transition-all">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-2xl mr-4">{TRADE_ICONS[c.trade as any] || '🏗️'}</div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white leading-tight">{c.name}</div>
                      <div className="text-[10px] font-semibold text-accent uppercase tracking-tight mt-0.5">{c.trade}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {searchResults.refs.length > 0 && (
            <section>
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-light mb-4 px-2">Library Topics</h3>
              <div className="space-y-3">
                {searchResults.refs.map((r: any, idx) => (
                  <button key={idx} onClick={() => onSelectCalc('reference')} className="w-full flex items-center p-5 bg-accent/5 dark:bg-accent/10 rounded-2xl border border-accent/20 text-left active:scale-[0.98] transition-all">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center text-2xl mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-accent-deep dark:text-accent-light leading-tight">{r.title}</div>
                      <div className="text-[10px] font-semibold text-accent/70 uppercase tracking-tight mt-0.5">Reference Document</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <>
          {/* Tool Categories */}
          <section>
            <div className="flex justify-between items-center mb-5 px-1">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-light">Tool Categories</h3>
              <span className="text-[10px] font-semibold text-accent">Deep Library</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="p-6 card-enterprise rounded-3xl text-left group active:scale-95 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-2xl mb-4 group-hover:bg-accent group-hover:text-white transition-all">
                    {cat.icon}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white leading-tight">{cat.name}</div>
                  <div className="text-[10px] text-slate-light font-semibold uppercase tracking-tight mt-1">{cat.count} Workflows</div>
                </button>
              ))}
            </div>
          </section>

          {/* Core Essentials */}
          <section>
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-light mb-5 px-1">Core Essentials</h3>
            <div className="space-y-3">
              {NATIVE_CALCULATORS.map(calc => (
                <button
                  key={calc.id}
                  onClick={() => onSelectCalc(calc.id as Screen)}
                  className="w-full card-enterprise p-5 rounded-2xl text-left flex items-center group active:scale-[0.98] transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent-purple/10 text-accent flex items-center justify-center text-3xl mr-5 group-hover:from-accent group-hover:to-accent-purple group-hover:text-white transition-all shadow-sm">
                    {TRADE_ICONS[calc.trade as any] || '🏗️'}
                  </div>
                  <div className="flex-1">
                    <span className="block font-semibold text-lg text-gray-900 dark:text-white leading-tight">{calc.name}</span>
                    <span className="block text-[11px] text-slate-light font-semibold uppercase tracking-tight mt-1">{calc.description}</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-light group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
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
