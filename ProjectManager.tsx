
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './App';
import { Project } from './types';

const STORAGE_KEY = 'calcsite_projects';

const safeJsonParse = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Failed to parse localStorage key "${key}":`, e);
    return fallback;
  }
};

const ProjectManager: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { activeProject, setActiveProject } = context;

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = safeJsonParse<Project[]>(STORAGE_KEY, []);
    // Ensure active project is in the list
    if (saved.length === 0) {
      return [activeProject];
    }
    const hasActive = saved.some(p => p.id === activeProject.id);
    return hasActive ? saved : [...saved, activeProject];
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editLocation, setEditLocation] = useState('');

  // Persist projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addNew = () => {
    const p: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Site Estimate',
      location: 'Location TBD',
      timestamp: Date.now()
    };
    setProjects(prev => [...prev, p]);
    setActiveProject(p);
    // Start editing the new project immediately
    setEditingId(p.id);
    setEditName(p.name);
    setEditLocation(p.location);
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setEditName(p.name);
    setEditLocation(p.location);
  };

  const saveEdit = () => {
    if (!editingId) return;
    setProjects(prev => prev.map(p =>
      p.id === editingId
        ? { ...p, name: editName.trim() || 'Untitled Project', location: editLocation.trim() || 'No location' }
        : p
    ));
    // Update active project if it's the one being edited
    if (activeProject.id === editingId) {
      setActiveProject({
        ...activeProject,
        name: editName.trim() || 'Untitled Project',
        location: editLocation.trim() || 'No location'
      });
    }
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditLocation('');
  };

  const deleteProject = (id: string) => {
    if (projects.length <= 1) {
      alert('You must have at least one project.');
      return;
    }
    if (!confirm('Delete this project? This cannot be undone.')) return;

    const newProjects = projects.filter(p => p.id !== id);
    setProjects(newProjects);

    // If deleting active project, switch to first remaining project
    if (activeProject.id === id && newProjects.length > 0) {
      setActiveProject(newProjects[0]);
    }
  };

  return (
    <div className="px-6 py-6 pb-32 min-h-full overflow-y-auto no-scrollbar bg-surface-secondary dark:bg-navy">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <div>
          <p className="text-[11px] font-bold text-accent uppercase tracking-widest mb-1">Multi-Site Engine</p>
          <h1 className="text-2xl font-bold dark:text-white tracking-tight">My Projects</h1>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map(p => (
          <div
            key={p.id}
            className={`p-5 rounded-2xl transition-all relative overflow-hidden ${
              activeProject.id === p.id
                ? 'card-enterprise border-2 border-accent shadow-lg'
                : 'card-enterprise opacity-70 hover:opacity-100'
            }`}
          >
            {activeProject.id === p.id && (
              <div className="absolute top-0 right-0 px-3 py-1.5 text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 rounded-bl-xl">
                Active
              </div>
            )}

            {editingId === p.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Project name"
                  className="w-full px-4 py-3 bg-surface-tertiary dark:bg-white/5 rounded-xl outline-none font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  autoFocus
                />
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  placeholder="Location"
                  className="w-full px-4 py-3 bg-surface-tertiary dark:bg-white/5 rounded-xl outline-none text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="flex-1 py-3 btn-primary text-white rounded-xl font-semibold text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-6 py-3 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-200 dark:hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <button
                  onClick={() => setActiveProject(p)}
                  className="flex-1 text-left"
                >
                  <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">{p.name}</div>
                  <div className="text-xs text-slate-light flex items-center gap-1.5 font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {p.location}
                  </div>
                  <div className="text-[10px] text-slate-light mt-2">
                    Created {new Date(p.timestamp).toLocaleDateString()}
                  </div>
                </button>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => startEdit(p)}
                    className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-slate-light hover:text-accent hover:bg-accent/10 transition-all"
                    title="Edit project"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  {projects.length > 1 && (
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
                      title="Delete project"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addNew}
          className="w-full p-5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 text-center text-slate-light font-semibold hover:border-accent hover:text-accent transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New Project
        </button>
      </div>

      <div className="mt-8 p-6 bg-accent/5 rounded-2xl border border-accent/10">
        <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Pro Tip</h4>
        <p className="text-sm text-slate-light leading-relaxed">
          Each project maintains its own Bill of Quantities. Switch between projects to manage estimates for multiple properties without data overlap.
        </p>
      </div>
    </div>
  );
};

export default ProjectManager;
