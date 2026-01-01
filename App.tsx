
import React, { useState, useEffect, useMemo, createContext } from 'react';
import { Trade, AppState, Screen, CalculatorTool, HistoryItem, Project, Currency, BOQItem } from './types';
import { TRADES, CALCULATORS, CURRENCIES } from './constants';

import Layout from './Layout';
import Toast from './Toast';
import Home from './Home';
import LandingPage from './LandingPage';
import SlabCalc from './SlabCalc';
import SteelCalc from './SteelCalc';
import BrickCalc from './BrickCalc';
import Converter from './Converter';
import Reference from './Reference';
import Settings from './Settings';
import ProjectManager from './ProjectManager';
import BOQ from './BOQ';
import StairCalc from './StairCalc';
import ColumnCalc from './ColumnCalc';
import FootingCalc from './FootingCalc';
import AIAssistant from './AIAssistant';
import CategoryTools from './CategoryTools';
import GenericCalc from './GenericCalc';

export const AppContext = createContext<{
  activeProject: Project;
  setActiveProject: (p: Project) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  rates: Record<string, number>;
  updateRate: (id: string, val: number) => void;
  viewMode: 'mobile' | 'desktop';
  setViewMode: (mode: 'mobile' | 'desktop') => void;
} | null>(null);

const App: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project>(() => {
    const s = localStorage.getItem('active_project');
    return s ? JSON.parse(s) : { id: 'default', name: 'Main Site Estate', location: 'City Center', timestamp: Date.now() };
  });

  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [rates, setRates] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('custom_rates');
    return saved ? JSON.parse(saved) : {
      cement_bag: 450,
      steel_kg: 75,
      brick_nos: 10,
      labor_sqft: 200,
      concrete_m3: 6500
    };
  });

  const updateRate = (id: string, val: number) => {
    setRates(prev => ({ ...prev, [id]: val }));
  };

  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 'desktop' : 'mobile'
  );

  // Auto-detect view mode based on screen size
  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth >= 768 ? 'desktop' : 'mobile');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [boqItems, setBoqItems] = useState<BOQItem[]>(() => {
    const s = localStorage.getItem('boq_data');
    return s ? JSON.parse(s) : [];
  });

  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem('tradecalc_state_v4');
    return saved ? JSON.parse(saved) : { onboarded: false, selectedTrades: [], units: 'imperial', history: [], favorites: [], jobConfigs: [] };
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>(appState.onboarded ? 'home' : 'onboarding');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [toast, setToast] = useState<{ show: boolean, msg: string }>({ show: false, msg: '' });
  const [showLanding, setShowLanding] = useState(() => {
    const hasSeenLanding = localStorage.getItem('has_seen_landing');
    return !hasSeenLanding && !appState.onboarded;
  });

  useEffect(() => {
    localStorage.setItem('tradecalc_state_v4', JSON.stringify(appState));
    localStorage.setItem('boq_data', JSON.stringify(boqItems));
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('active_project', JSON.stringify(activeProject));
    localStorage.setItem('custom_rates', JSON.stringify(rates));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [appState, boqItems, darkMode, activeProject, rates]);

  const triggerToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 2500);
  };

  const addBOQItem = (item: Omit<BOQItem, 'id' | 'projectId' | 'timestamp' | 'currencySymbol'>) => {
    const newItem: BOQItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      projectId: activeProject.id,
      timestamp: Date.now(),
      currencySymbol: currency.symbol
    };
    setBoqItems(prev => [...prev, newItem]);
    triggerToast('Added to Estimate BOQ');
  };

  const handleOnboard = (trades: Trade[]) => {
    setAppState(prev => ({ ...prev, onboarded: true, selectedTrades: trades }));
    setCurrentScreen('home');
  };

  const handleLandingCTA = () => {
    localStorage.setItem('has_seen_landing', 'true');
    setShowLanding(false);
  };

  const renderContent = () => {
    if (selectedToolId) {
      return (
        <GenericCalc
          toolId={selectedToolId}
          onBack={() => setSelectedToolId(null)}
          onAddBOQ={addBOQItem}
          currency={currency}
          rates={rates}
        />
      );
    }

    if (selectedCategoryId) {
      return (
        <CategoryTools
          categoryId={selectedCategoryId}
          onBack={() => setSelectedCategoryId(null)}
          onSelectTool={(id) => setSelectedToolId(id)}
          onSelectNative={(s) => { setCurrentScreen(s); setSelectedCategoryId(null); }}
        />
      );
    }

    switch (currentScreen) {
      case 'onboarding':
        return (
          <div className="flex flex-col h-full bg-cream dark:bg-gray-900 p-8 overflow-y-auto no-scrollbar">
            <div className="mt-16 mb-12">
              <h1 className="font-serif text-5xl font-bold text-gray-900 dark:text-white leading-tight">TradeCalc <span className="text-coral">Pro.</span></h1>
              <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium">Precision engineering suite. Personalized for your workflow.</p>
            </div>
            <div className="space-y-4 mb-24">
              {TRADES.map(trade => {
                const isSelected = appState.selectedTrades.includes(trade);
                return (
                  <button
                    key={trade}
                    onClick={() => setAppState(p => ({ ...p, selectedTrades: isSelected ? p.selectedTrades.filter(t => t !== trade) : [...p.selectedTrades, trade] }))}
                    className={`w-full flex items-center p-6 rounded-3xl border-2 transition-all active:scale-95 ${isSelected ? 'border-coral bg-white dark:bg-gray-800' : 'border-gray-100 dark:border-white/5 bg-white dark:bg-gray-800'}`}
                  >
                    <span className="text-3xl mr-5">{TRADES.indexOf(trade) % 2 === 0 ? '👷' : '🏗️'}</span>
                    <span className={`text-lg font-bold ${isSelected ? 'text-coral' : 'text-gray-600 dark:text-gray-300'}`}>{trade}</span>
                  </button>
                );
              })}
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-cream/80 dark:bg-gray-900/80 backdrop-blur-md max-w-md mx-auto">
              <button
                onClick={() => handleOnboard(appState.selectedTrades)}
                disabled={appState.selectedTrades.length === 0}
                className="w-full bg-slate-900 dark:bg-coral text-white py-5 rounded-[24px] font-black text-lg shadow-2xl disabled:opacity-50 active:scale-95 transition-all"
              >
                Launch Workplace
              </button>
            </div>
          </div>
        );
      case 'home':
        return <Home onSelectCalc={setCurrentScreen} onSelectCategory={setSelectedCategoryId} selectedTrades={appState.selectedTrades} />;
      case 'boq':
        return <BOQ items={boqItems} currency={currency} onRemove={(id) => setBoqItems(p => p.filter(i => i.id !== id))} onClear={() => setBoqItems([])} onGoHome={() => setCurrentScreen('home')} />;
      case 'reference':
        return <Reference />;
      case 'settings':
        return <Settings onBack={() => setCurrentScreen('home')} />;
      case 'projects':
        return <ProjectManager onBack={() => setCurrentScreen('home')} />;
      case 'slab':
        return <SlabCalc onBack={() => setCurrentScreen('home')} onAddBOQ={addBOQItem} currency={currency} />;
      case 'steel':
        return <SteelCalc onBack={() => setCurrentScreen('home')} onAddBOQ={addBOQItem} currency={currency} />;
      case 'brick':
        return <BrickCalc onBack={() => setCurrentScreen('home')} onAddBOQ={addBOQItem} />;
      case 'convert':
        return <Converter />;
      case 'stair':
        return <StairCalc onBack={() => setCurrentScreen('home')} onAddBOQ={addBOQItem} currency={currency} rates={rates} />;
      case 'column':
        return <ColumnCalc onBack={() => setCurrentScreen('home')} onAddBOQ={addBOQItem} />;
      case 'footing':
        return <FootingCalc onBack={() => setCurrentScreen('home')} onAddBOQ={addBOQItem} />;
      default:
        return <Home onSelectCalc={setCurrentScreen} onSelectCategory={setSelectedCategoryId} selectedTrades={appState.selectedTrades} />;
    }
  };

  // Show landing page first for new users
  if (showLanding) {
    return (
      <div className={`${viewMode === 'desktop' ? 'max-w-6xl' : 'max-w-md'} mx-auto h-screen bg-cream dark:bg-gray-900 overflow-hidden relative font-sans transition-all duration-300`}>
        <LandingPage onGetStarted={handleLandingCTA} />
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ activeProject, setActiveProject, currency, setCurrency, darkMode, setDarkMode, rates, updateRate, viewMode, setViewMode }}>
      <div className={`${viewMode === 'desktop' ? 'max-w-6xl' : 'max-w-md'} mx-auto h-screen bg-cream dark:bg-gray-900 overflow-hidden relative font-sans flex flex-col transition-all duration-300`}>
        {currentScreen === 'onboarding' ? (
          renderContent()
        ) : (
          <Layout
            currentScreen={currentScreen}
            onSwitchScreen={setCurrentScreen}
            boqCount={boqItems.length}
            onOpenAI={() => setShowAI(true)}
          >
            {renderContent()}
          </Layout>
        )}

        {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
        <Toast msg={toast.msg} show={toast.show} />
      </div>
    </AppContext.Provider>
  );
};

export default App;
