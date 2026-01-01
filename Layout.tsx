
import React, { useContext } from 'react';
import { Screen } from './types';
import { AppContext } from './App';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onSwitchScreen: (s: Screen) => void;
  boqCount: number;
  onOpenAI: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onSwitchScreen, boqCount, onOpenAI }) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { activeProject, viewMode, setViewMode } = context;

  const isTabActive = (tab: Screen) => {
    if (tab === 'home' && !['boq', 'settings', 'projects', 'reference'].includes(currentScreen)) return true;
    return currentScreen === tab;
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Fixed Header */}
      <nav className="z-50 px-5 py-4 flex justify-between items-center glass dark:bg-gray-900/90 border-b border-coral/10 dark:border-white/5">
        <div className="flex flex-col cursor-pointer active:scale-95 transition-all" onClick={() => onSwitchScreen('home')}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-coral to-gold rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-coral/30">C</div>
            <span className="font-serif text-xl font-bold tracking-tight dark:text-white">Calc<span className="text-coral">Pro</span></span>
          </div>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Site: {activeProject.name}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onSwitchScreen('projects')}
            className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 active:scale-90 transition-all"
            title="Projects"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
          </button>
          <button
            onClick={onOpenAI}
            className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center text-coral active:scale-90 transition-all shadow-sm border border-coral/20"
            title="AI Assistant"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </button>
        </div>
      </nav>

      {/* Main Content Area - pb-24 accounts for bottom nav height */}
      <div className={`flex-1 overflow-y-auto pb-24 ${viewMode === 'mobile' ? 'no-scrollbar' : ''}`}>
        {children}
      </div>

      {/* Fixed Bottom Navigation */}
      <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full ${viewMode === 'desktop' ? 'max-w-6xl' : 'max-w-md'} glass dark:bg-gray-900/95 border-t border-coral/10 dark:border-white/5 p-2 pb-6 flex justify-around items-center z-50 transition-all duration-300`}>
        {[
          { id: 'home', label: 'Suite', icon: <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /> },
          { id: 'reference', label: 'Library', icon: <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> },
          { id: 'boq', label: 'Estimates', icon: <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />, badge: boqCount },
          { id: 'settings', label: 'Profile', icon: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onSwitchScreen(item.id as Screen)}
            className={`relative flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all active:scale-90 ${isTabActive(item.id as Screen) ? 'text-coral scale-110 font-bold' : 'text-gray-400 dark:text-gray-500'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
              {item.icon}
            </svg>
            <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute top-1 right-1 bg-coral text-white text-[9px] font-bold min-w-[16px] h-[16px] flex items-center justify-center rounded-full border-2 border-cream dark:border-gray-900">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
