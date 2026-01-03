
import React, { useState, useMemo } from 'react';
import { THUMB_RULES, REFERENCE_TABLES } from './constants';

const Reference: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>('mix-ratios');
  const [search, setSearch] = useState('');

  const toggle = (id: string) => setOpenSection(openSection === id ? null : id);

  const filteredTables = useMemo(() => {
    if (!search.trim()) return REFERENCE_TABLES;
    return REFERENCE_TABLES.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const filteredRules = useMemo(() => {
    if (!search.trim()) return THUMB_RULES;
    return THUMB_RULES.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div className="px-6 py-6 pb-32 bg-surface-secondary dark:bg-navy min-h-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold leading-tight mb-3 text-gray-900 dark:text-white tracking-tight">Technical <span className="text-accent">Library.</span></h1>
        <p className="text-slate-light font-medium">Professional codes and verified engineering rules.</p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
        </div>
        <input
          type="text"
          placeholder="Search codes (IS 456, NEC...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-4 bg-white dark:bg-navy-light/20 rounded-2xl border border-gray-200 dark:border-white/10 shadow-enterprise outline-none font-semibold text-sm text-accent focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all dark:text-white placeholder:text-slate-light"
        />
      </div>

      <div className="space-y-4">
        {filteredTables.map((table) => (
          <div key={table.id} className="card-enterprise rounded-2xl overflow-hidden">
            <button
              onClick={() => toggle(table.id)}
              className={`w-full flex justify-between items-center p-5 text-left font-semibold transition-all ${openSection === table.id ? 'bg-accent/5 text-accent' : 'text-gray-900 dark:text-white'}`}
            >
              <span className="text-[15px]">{table.title}</span>
              <svg className={`w-5 h-5 transition-transform duration-300 ${openSection === table.id ? 'rotate-180 text-accent' : 'text-slate-light'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`overflow-x-auto transition-all duration-300 ${openSection === table.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-5 pt-0 border-t border-gray-100 dark:border-white/5">
                <table className="w-full text-left text-xs mt-4">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-white/10">
                      {table.rows[0].map((h, i) => (
                        <th key={i} className="py-3 px-2 font-semibold uppercase text-slate-light tracking-wider text-[10px]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.slice(1).map((row, ri) => (
                      <tr key={ri} className="border-b border-gray-50 dark:border-white/5 last:border-0">
                        {row.map((cell, ci) => (
                          <td key={ci} className="py-3 px-2 font-mono font-semibold dark:text-gray-300 text-[13px]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}

        {filteredRules.map((section) => (
          <div key={section.id} className="card-enterprise rounded-2xl overflow-hidden">
            <button
              onClick={() => toggle(section.id)}
              className={`w-full flex justify-between items-center p-5 text-left font-semibold transition-all ${openSection === section.id ? 'bg-accent/5 text-accent' : 'text-gray-900 dark:text-white'}`}
            >
              <span className="text-[15px]">{section.title}</span>
              <svg className={`w-5 h-5 transition-transform duration-300 ${openSection === section.id ? 'rotate-180 text-accent' : 'text-slate-light'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`transition-all duration-300 ${openSection === section.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-5 pt-0 border-t border-gray-100 dark:border-white/5">
                <div className="space-y-3 pt-4">
                  {section.data.map((row, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-white/5 last:border-0">
                      <span className="text-[11px] font-semibold text-slate-light uppercase tracking-tight pr-4">{row.item}</span>
                      <span className="font-mono font-semibold text-gray-900 dark:text-white text-right">{row.rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reference;
