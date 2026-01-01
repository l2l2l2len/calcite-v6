
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
    <div className="px-6 py-6 pb-32">
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold leading-tight mb-3 text-gray-900 dark:text-white">Technical <span className="text-coral">Library.</span></h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Professional codes and verified engineering rules.</p>
      </div>

      <div className="relative mb-8">
        <input 
          type="text" 
          placeholder="Search codes (IS 456, NEC...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-6 pr-6 py-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm outline-none font-bold text-sm text-coral"
        />
      </div>

      <div className="space-y-4">
        {filteredTables.map((table) => (
          <div key={table.id} className="bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden border border-gray-50 dark:border-white/5 shadow-sm">
            <button 
              onClick={() => toggle(table.id)}
              className={`w-full flex justify-between items-center p-6 text-left font-bold transition-all ${openSection === table.id ? 'bg-coral/5 text-coral' : 'text-gray-900 dark:text-white'}`}
            >
              <span className="text-[16px]">{table.title}</span>
              <svg className={`w-5 h-5 transition-transform duration-300 ${openSection === table.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`overflow-x-auto transition-all duration-300 ${openSection === table.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b dark:border-white/10">
                      {table.rows[0].map((h, i) => (
                        <th key={i} className="py-3 px-2 font-black uppercase text-gray-400 tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.slice(1).map((row, ri) => (
                      <tr key={ri} className="border-b dark:border-white/5 last:border-0">
                        {row.map((cell, ci) => (
                          <td key={ci} className="py-4 px-2 font-mono font-bold dark:text-gray-300">{cell}</td>
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
          <div key={section.id} className="bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden border border-gray-50 dark:border-white/5 shadow-sm">
            <button 
              onClick={() => toggle(section.id)}
              className={`w-full flex justify-between items-center p-6 text-left font-bold transition-all ${openSection === section.id ? 'bg-coral/5 text-coral' : 'text-gray-900 dark:text-white'}`}
            >
              <span className="text-[16px]">{section.title}</span>
              <svg className={`w-5 h-5 transition-transform duration-300 ${openSection === section.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`transition-all duration-300 ${openSection === section.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 border-t border-gray-50 dark:border-white/5">
                <div className="space-y-4 pt-6">
                  {section.data.map((row, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b dark:border-white/5 last:border-0">
                      <span className="text-[11px] font-black text-gray-400 uppercase tracking-tight pr-4">{row.item}</span>
                      <span className="font-mono font-black text-gray-900 dark:text-white text-right">{row.rule}</span>
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
