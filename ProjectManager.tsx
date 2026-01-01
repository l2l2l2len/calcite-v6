
import React, { useContext, useState } from 'react';
import { AppContext } from './App';
import { Project } from './types';

const ProjectManager: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { activeProject, setActiveProject } = context;
  const [projects, setProjects] = useState<Project[]>([activeProject]);

  const addNew = () => {
    const p: Project = { id: Math.random().toString(), name: 'New Site Estimate', location: 'TBD', timestamp: Date.now() };
    setProjects([...projects, p]);
    setActiveProject(p);
  };

  return (
    <div className="px-6 py-6">
      <div className="mb-10">
        <p className="text-[11px] font-bold text-coral uppercase tracking-widest mb-3">Multi-Site Engine</p>
        <h1 className="font-serif text-4xl font-bold dark:text-white leading-tight">My <span className="text-coral">Projects.</span></h1>
      </div>

      <div className="space-y-4">
        {projects.map(p => (
          <button
            key={p.id}
            onClick={() => setActiveProject(p)}
            className={`w-full p-6 rounded-3xl border-2 text-left transition-all relative overflow-hidden ${activeProject.id === p.id ? 'bg-white dark:bg-gray-800 border-coral shadow-xl' : 'bg-gray-50 dark:bg-white/5 border-transparent opacity-60'}`}
          >
            {activeProject.id === p.id && <div className="absolute top-0 right-0 p-3 text-coral text-xs font-bold uppercase tracking-tighter bg-coral/10 rounded-bl-xl">Active Site</div>}
            <div className="font-bold text-lg dark:text-white mb-1">{p.name}</div>
            <div className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {p.location}
            </div>
          </button>
        ))}

        <button
          onClick={addNew}
          className="w-full p-6 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 text-center text-gray-400 font-bold hover:border-coral hover:text-coral transition-all"
        >
          + Create New Site Estimate
        </button>
      </div>

      <div className="mt-12 p-8 bg-peach-light/20 rounded-3xl border border-coral/10">
        <h4 className="text-xs font-bold text-coral uppercase tracking-widest mb-4">Pro Insight</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium italic">
          "Each project keeps a distinct Bill of Quantities. Switching projects allows you to estimate multiple properties without data overlap."
        </p>
      </div>
    </div>
  );
};

export default ProjectManager;
