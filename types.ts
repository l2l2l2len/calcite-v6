
export type Trade = 'Electrician' | 'Plumber' | 'HVAC' | 'Carpenter' | 'Tile' | 'Painter' | 'General Contractor';

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'toggle';
  unit?: string;
  options?: string[];
  // Fix: boolean added to support toggle defaults
  defaultValue?: number | string | boolean;
  description?: string;
}

export interface CalculationResult {
  result: string;
  numericValue: number;
  unit: string;
  breakdown: string[];
}

export interface CalculatorTool {
  id: string;
  name: string;
  trade: Trade;
  description: string;
  inputs: CalculatorInput[];
  calculate: (inputs: Record<string, any>, isMetric: boolean) => CalculationResult;
}

export interface JobConfig {
  id: string;
  calcId: string;
  name: string;
  inputs: Record<string, any>;
  timestamp: number;
}

export interface HistoryItem {
  id: string;
  calcId: string;
  calcName: string;
  trade: Trade;
  timestamp: number;
  inputs: Record<string, any>;
  output: string;
  jobName: string;
  notes?: string;
}

export interface BOQItem {
  id: string;
  projectId: string;
  name: string;
  detail: string;
  amount: number;
  type: string;
  timestamp: number;
  currencySymbol: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rateToInr: number;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  timestamp: number;
}

export interface AppState {
  onboarded: boolean;
  selectedTrades: Trade[];
  units: 'imperial' | 'metric';
  history: HistoryItem[];
  favorites: string[];
  jobConfigs: JobConfig[];
}

export type Screen = 'onboarding' | 'home' | 'calculator' | 'history' | 'reference' | 'settings' | 'projects' | 'boq' | 'slab' | 'steel' | 'brick' | 'convert' | 'stair' | 'column' | 'footing' | string;
