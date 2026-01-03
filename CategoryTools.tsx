
import React from 'react';
import { CATEGORIES, TOOLS_LIBRARY } from './constants';
import { Screen } from './types';

interface Props {
  categoryId: string;
  onBack: () => void;
  onSelectTool: (id: string) => void;
  onSelectNative: (s: Screen) => void;
}

const CategoryTools: React.FC<Props> = ({ categoryId, onBack, onSelectTool, onSelectNative }) => {
  const category = CATEGORIES.find(c => c.id === categoryId);

  // Custom tools (native screens) mapping
  const nativeTools: Record<string, { id: string; name: string; description: string }[]> = {
    concrete: [
      { id: 'slab', name: 'Slab Concrete', description: 'Volume & dry mix materials' },
      { id: 'column', name: 'RCC Column', description: 'Mix & rebar sizing' },
      { id: 'footing', name: 'RCC Footing', description: 'Volume & base concrete' },
      { id: 'stair', name: 'RCC Staircase', description: 'Riser/Tread concrete' }
    ],
    steel: [
      { id: 'steel', name: 'Steel Reinforcement', description: 'D²/162 weight tool' }
    ],
    masonry: [
      { id: 'brick', name: 'Brick Masonry', description: 'Wall & mortar estimator' }
    ],
  };

  const getTools = () => {
    const list = (Object.values(TOOLS_LIBRARY) as any[]).filter(t => t.category === categoryId);
    return list;
  };

  const nativeList = nativeTools[categoryId] || [];
  const tools = getTools();

  return (
    <div className="px-6 py-6 overflow-y-auto no-scrollbar h-full pb-32 bg-surface-secondary dark:bg-navy animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{category?.icon}</span>
            <h1 className="text-2xl font-bold dark:text-white tracking-tight">{category?.name}</h1>
          </div>
          <p className="text-[11px] font-semibold text-accent uppercase tracking-widest mt-1">Professional Workflows</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Native Tools (Built-in Calculators) */}
        {nativeList.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-light mb-4 px-1">Full Estimation Screens</h3>
            <div className="space-y-3">
              {nativeList.map(t => (
                <button
                  key={t.id}
                  onClick={() => onSelectNative(t.id as Screen)}
                  className="w-full p-5 card-enterprise rounded-2xl flex items-center gap-4 active:scale-[0.98] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent-purple/10 flex items-center justify-center text-2xl group-hover:from-accent group-hover:to-accent-purple group-hover:text-white transition-all">
                    ✨
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-[16px] text-gray-900 dark:text-white leading-tight">{t.name}</div>
                    <div className="text-[11px] text-slate-light font-semibold uppercase tracking-tight mt-1">{t.description}</div>
                  </div>
                  <svg className="w-5 h-5 text-slate-light group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Library Tools */}
        {tools.length > 0 && (
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-light mb-4 px-1">Quick Calculators</h3>
            <div className="space-y-3">
              {tools.map((t: any) => (
                <button
                  key={t.id}
                  onClick={() => onSelectTool(t.id)}
                  className="w-full p-5 card-enterprise rounded-2xl flex items-center gap-4 active:scale-[0.98] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl group-hover:bg-accent group-hover:text-white transition-all">
                    {t.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-[16px] text-gray-900 dark:text-white leading-tight">{t.name}</div>
                    <div className="text-[11px] text-slate-light font-semibold uppercase tracking-tight mt-1">{t.description}</div>
                  </div>
                  <svg className="w-5 h-5 text-slate-light group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {nativeList.length === 0 && tools.length === 0 && (
          <div className="py-20 text-center card-enterprise rounded-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Coming Soon</h3>
            <p className="text-sm text-slate-light">Tools for this category are under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTools;
