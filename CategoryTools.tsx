
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
  const nativeTools: Record<string, string[]> = {
    concrete: ['slab', 'column', 'footing', 'stair'],
    steel: ['steel'],
    masonry: ['brick'],
  };

  const getTools = () => {
    // Fix: Cast to any[] to avoid property access errors on unknown
    const list = (Object.values(TOOLS_LIBRARY) as any[]).filter(t => t.category === categoryId);
    return list;
  };

  const nativeList = nativeTools[categoryId] || [];
  const tools = getTools();

  return (
    <div className="px-5 py-6 animate-slide-in overflow-y-auto h-full pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white active:scale-90 transition-all shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <div>
          <h1 className="font-serif text-3xl font-bold dark:text-white">{category?.name}</h1>
          <p className="text-[10px] font-bold text-coral uppercase tracking-widest mt-0.5">Professional Workflows</p>
        </div>
      </div>

      <div className="space-y-4">
        {nativeList.map(t => (
          <button 
            key={t}
            onClick={() => onSelectNative(t as Screen)}
            className="w-full p-5 bg-white dark:bg-gray-800 rounded-3xl border border-coral/10 dark:border-white/5 flex items-center gap-5 shadow-sm active:scale-[0.98] transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-coral/5 flex items-center justify-center text-2xl group-hover:bg-coral group-hover:text-white transition-all">✨</div>
            <div className="flex-1 text-left">
              <div className="font-bold text-[17px] dark:text-white capitalize">{t.replace('_', ' ')}</div>
              <div className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Full Estimation Screen</div>
            </div>
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        ))}

        {tools.map(t => (
          <button 
            key={t.id}
            onClick={() => onSelectTool(t.id)}
            className="w-full p-5 bg-white dark:bg-gray-800 rounded-3xl border border-gray-50 dark:border-white/5 flex items-center gap-5 shadow-sm active:scale-[0.98] transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-2xl group-hover:bg-coral group-hover:text-white transition-all">{t.icon}</div>
            <div className="flex-1 text-left">
              <div className="font-bold text-[17px] dark:text-white">{t.name}</div>
              <div className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">{t.description}</div>
            </div>
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        ))}

        {nativeList.length === 0 && tools.length === 0 && (
          <div className="py-20 text-center opacity-30">
            <div className="text-5xl mb-4">⚒️</div>
            <p className="font-bold text-sm">Tools under development...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTools;
