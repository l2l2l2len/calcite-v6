
import { CalculatorTool, Trade, Currency } from './types';

export const TRADES: Trade[] = [
  'Electrician', 'Plumber', 'HVAC', 'Carpenter', 'Tile', 'Painter', 'General Contractor'
];

export const TRADE_ICONS: Record<Trade, string> = {
  'Electrician': '⚡',
  'Plumber': '🚰',
  'HVAC': '❄️',
  'Carpenter': '🪚',
  'Tile': '🧱',
  'Painter': '🖌️',
  'General Contractor': '🏗️'
};

export const CALCULATORS: CalculatorTool[] = [
  {
    id: 'elec-load',
    name: 'NEC Load Calculator',
    trade: 'Electrician',
    description: 'General lighting load, appliance demand factors, and service sizing per NEC 220.',
    inputs: [
      { id: 'sqft', label: 'Living Area', type: 'number', unit: 'sq ft', defaultValue: 2000 },
      { id: 'appliances', label: 'Fastened Appliances (Qty)', type: 'number', defaultValue: 4 },
      { id: 'applianceVA', label: 'Total Appliance VA', type: 'number', unit: 'VA', defaultValue: 6000 },
      { id: 'ranges', label: 'Electric Ranges (Qty)', type: 'number', defaultValue: 1 }
    ],
    calculate: (v) => {
      const lightingVA = (v.sqft || 0) * 3; 
      let lightingDemand = lightingVA;
      if (lightingVA > 3000) {
        lightingDemand = 3000 + (lightingVA - 3000) * 0.35;
      }
      let appDemand = v.applianceVA || 0;
      if (v.appliances >= 4) appDemand *= 0.75;
      const rangeDemand = (v.ranges || 0) > 0 ? 8000 : 0;
      const totalVA = lightingDemand + appDemand + rangeDemand;
      const amps = Math.ceil(totalVA / 240);
      return {
        result: `${amps}A Service`,
        numericValue: amps,
        unit: 'Amps',
        breakdown: [
          `Lighting Load: ${v.sqft} sqft × 3 VA = ${lightingVA} VA`,
          `Lighting Demand (NEC 220.42): ${lightingDemand.toFixed(0)} VA`,
          `Appliance Demand (NEC 220.53): ${appDemand.toFixed(0)} VA`,
          `Range Demand: ${rangeDemand} VA`,
          `Total VA: ${totalVA.toFixed(0)} VA`,
          `Sizing: ${totalVA.toFixed(0)} / 240V = ${amps}A`
        ]
      };
    }
  },
  {
    id: 'wire-size',
    name: 'Wire Size & VD',
    trade: 'Electrician',
    description: 'Sizing conductors, ampacity, bundling, and voltage drop calculations per NEC 310.15.',
    inputs: [
      { id: 'load', label: 'Load Current', type: 'number', unit: 'A', defaultValue: 20 },
      { id: 'dist', label: 'Distance', type: 'number', unit: 'ft', defaultValue: 100 },
      { id: 'voltage', label: 'Voltage', type: 'select', options: ['120', '240', '277', '480'], defaultValue: '120' }
    ],
    calculate: (v) => {
      const current = (v.load || 0) * 1.25;
      const res = 11.2; 
      const cm = 10380; 
      const vd = (2 * (v.load || 0) * (v.dist || 0) * res) / cm;
      const vdPct = (vd / parseFloat(v.voltage)) * 100;
      return {
        result: `${vdPct.toFixed(2)}% VD`,
        numericValue: vdPct,
        unit: '%',
        breakdown: [
          `Design Current: ${v.load}A × 1.25 = ${current}A`,
          `Formula: (2 × I × L × R) / CM`,
          `Total Voltage Drop: ${vd.toFixed(2)}V`,
          `Percentage: ${vdPct.toFixed(2)}% (Target < 3%)`
        ]
      };
    }
  },
  {
    id: 'hvac-load',
    name: 'HVAC Load (Manual J)',
    trade: 'HVAC',
    description: 'Cooling load tonnage, heating requirements, and BTU calculations.',
    inputs: [
      { id: 'sqft', label: 'Area', type: 'number', unit: 'sq ft', defaultValue: 1500 },
      { id: 'type', label: 'Building Type', type: 'select', options: ['Residential', 'Office', 'Restaurant'], defaultValue: 'Residential' }
    ],
    calculate: (v) => {
      const factors: Record<string, number> = { Residential: 30, Office: 40, Restaurant: 55 };
      const btu = (v.sqft || 0) * (factors[v.type] || 30);
      const tons = btu / 12000;
      return {
        result: `${tons.toFixed(1)} Tons`,
        numericValue: tons,
        unit: 'Tons',
        breakdown: [
          `Base Factor: ${factors[v.type]} BTU/sqft`,
          `Total BTU: ${btu.toLocaleString()}`,
          `Tonnage: ${btu} / 12,000 = ${tons.toFixed(1)} Tons`
        ]
      };
    }
  }
];

export const REFERENCE_TABLES = [
  {
    title: 'Concrete Mix Ratios (IS 456)',
    id: 'mix-ratios',
    rows: [
      ['Grade', 'Ratio (C:S:A)', 'Compressive Strength'],
      ['M10', '1 : 3 : 6', '10 N/mm²'],
      ['M15', '1 : 2 : 4', '15 N/mm²'],
      ['M20', '1 : 1.5 : 3', '20 N/mm²'],
      ['M25', '1 : 1 : 2', '25 N/mm²'],
      ['M30', 'Design Mix', '30 N/mm²']
    ]
  },
  {
    title: 'Standard Clear Cover',
    id: 'clear-cover',
    rows: [
      ['Structural Element', 'Minimum Cover'],
      ['Slab', '20 mm'],
      ['Beam', '25 mm'],
      ['Column', '40 mm'],
      ['Footing', '50 mm'],
      ['Retaining Wall', '30 mm']
    ]
  },
  {
    title: 'Steel Rebar Unit Weights',
    id: 'steel-weights',
    rows: [
      ['Diameter', 'Weight (kg/m)', 'Cross Area (mm²)'],
      ['8 mm', '0.395', '50.27'],
      ['10 mm', '0.617', '78.54'],
      ['12 mm', '0.888', '113.10'],
      ['16 mm', '1.580', '201.06'],
      ['20 mm', '2.470', '314.16'],
      ['25 mm', '3.850', '490.87']
    ]
  }
];

export const THUMB_RULES = [
  {
    id: 'masonry-rules',
    title: 'Masonry & Plastering',
    data: [
      { item: 'Bricks per m³', rule: '500 Nos' },
      { item: 'Mortar (1:6) per m³', rule: '0.25 m³' },
      { item: 'Cement (Plastering)', rule: '1 Bag per 100 sqft' },
      { item: 'Sand (Plastering)', rule: '0.15 m³ per 100 sqft' }
    ]
  },
  {
    id: 'structural-rules',
    title: 'Steel Requirements',
    data: [
      { item: 'RCC Slab', rule: '80 kg/m³' },
      { item: 'RCC Beam', rule: '120 kg/m³' },
      { item: 'RCC Column', rule: '160 kg/m³' },
      { item: 'RCC Footing', rule: '100 kg/m³' }
    ]
  }
];

export const UNIT_TO_M = { m: 1, ft: 0.3048, mm: 0.001 };
export const CONVERSION_RATES: Record<string, Record<string, number>> = {
  length: { m: 1, ft: 3.28084, in: 39.3701, mm: 1000 },
  area: { 'sq m': 1, 'sq ft': 10.7639, 'sq yd': 1.19599, acre: 0.000247 },
  volume: { 'm³': 1, 'ft³': 35.3147, liter: 1000, gallon: 264.172 },
  weight: { kg: 1, lb: 2.20462, ton: 0.001, oz: 35.274 }
};

export const MIX_RATIOS = {
  M15: { c: 1, s: 2, a: 4 },
  M20: { c: 1, s: 1.5, a: 3 },
  M25: { c: 1, s: 1, a: 2 },
};

export const STEEL_DIAMETERS = [8, 10, 12, 16, 20, 25, 32];
export const CURRENCIES: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateToInr: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rateToInr: 83 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rateToInr: 105 }
];

export const CATEGORIES = [
  { id: 'concrete', name: 'Concrete', icon: '🏗️', count: 6 },
  { id: 'steel', name: 'Steel', icon: '⚙️', count: 4 },
  { id: 'masonry', name: 'Masonry', icon: '🧱', count: 3 },
  { id: 'finishing', name: 'Finishing', icon: '🖌️', count: 5 },
  { id: 'electrical', name: 'Electrical', icon: '⚡', count: 2 },
  { id: 'hvac', name: 'HVAC', icon: '❄️', count: 1 }
];

export const TOOLS_LIBRARY: Record<string, any> = {
  // Electrical Tools
  'elec-load': {
    id: 'elec-load',
    name: 'NEC Load Calculator',
    category: 'electrical',
    icon: '⚡',
    description: 'General lighting load, appliance demand, and service sizing per NEC 220.',
    inputs: [
      { key: 'sqft', label: 'Living Area', default: 2000, unit: 'sq ft' },
      { key: 'appliances', label: 'Fastened Appliances (Qty)', default: 4, unit: 'nos' },
      { key: 'applianceVA', label: 'Total Appliance VA', default: 6000, unit: 'VA' },
      { key: 'ranges', label: 'Electric Ranges (Qty)', default: 1, unit: 'nos' }
    ],
    formula: (v: any) => {
      const lightingVA = (v.sqft || 0) * 3;
      let lightingDemand = lightingVA;
      if (lightingVA > 3000) {
        lightingDemand = 3000 + (lightingVA - 3000) * 0.35;
      }
      let appDemand = v.applianceVA || 0;
      if (v.appliances >= 4) appDemand *= 0.75;
      const rangeDemand = (v.ranges || 0) > 0 ? 8000 : 0;
      const totalVA = lightingDemand + appDemand + rangeDemand;
      const amps = Math.ceil(totalVA / 240);
      return {
        mainValue: amps,
        mainUnit: 'A Service',
        details: [
          { label: 'Lighting Load', value: `${lightingVA}`, unit: 'VA' },
          { label: 'Lighting Demand (NEC 220.42)', value: lightingDemand.toFixed(0), unit: 'VA' },
          { label: 'Appliance Demand', value: appDemand.toFixed(0), unit: 'VA' },
          { label: 'Range Demand', value: `${rangeDemand}`, unit: 'VA' },
          { label: 'Total VA', value: totalVA.toFixed(0), unit: 'VA' }
        ],
        cost: 0
      };
    }
  },
  'wire-size': {
    id: 'wire-size',
    name: 'Wire Size & Voltage Drop',
    category: 'electrical',
    icon: '🔌',
    description: 'Conductor sizing, ampacity, and voltage drop per NEC 310.15.',
    inputs: [
      { key: 'load', label: 'Load Current', default: 20, unit: 'A' },
      { key: 'dist', label: 'Distance', default: 100, unit: 'ft' },
      { key: 'voltage', label: 'Voltage', default: 120, unit: 'V' }
    ],
    formula: (v: any) => {
      const current = (v.load || 0) * 1.25;
      const res = 11.2;
      const cm = 10380;
      const vd = (2 * (v.load || 0) * (v.dist || 0) * res) / cm;
      const vdPct = (vd / (v.voltage || 120)) * 100;
      const status = vdPct < 3 ? 'OK' : 'High - Consider larger wire';
      return {
        mainValue: vdPct.toFixed(2),
        mainUnit: '% VD',
        details: [
          { label: 'Design Current (×1.25)', value: current.toFixed(1), unit: 'A' },
          { label: 'Voltage Drop', value: vd.toFixed(2), unit: 'V' },
          { label: 'Status', value: status, unit: '' }
        ],
        cost: 0
      };
    }
  },
  // HVAC Tools
  'hvac-load': {
    id: 'hvac-load',
    name: 'HVAC Load (Manual J)',
    category: 'hvac',
    icon: '❄️',
    description: 'Cooling load tonnage, heating requirements, and BTU calculations.',
    inputs: [
      { key: 'sqft', label: 'Area', default: 1500, unit: 'sq ft' },
      { key: 'type', label: 'Building Type', default: 'Residential', unit: '' }
    ],
    formula: (v: any) => {
      const factors: Record<string, number> = { Residential: 30, Office: 40, Restaurant: 55 };
      const btu = (v.sqft || 0) * (factors[v.type] || 30);
      const tons = btu / 12000;
      return {
        mainValue: tons.toFixed(1),
        mainUnit: 'Tons',
        details: [
          { label: 'Base Factor', value: `${factors[v.type] || 30}`, unit: 'BTU/sqft' },
          { label: 'Total BTU', value: btu.toLocaleString(), unit: 'BTU' },
          { label: 'Formula', value: `${btu.toLocaleString()} / 12,000`, unit: '' }
        ],
        cost: 0
      };
    }
  },
  // Original tools
  'excavation': {
    id: 'excavation',
    name: 'Earthwork / Excavation',
    category: 'concrete',
    icon: '🚜',
    description: 'Volume and trench soil calculation.',
    inputs: [
      { key: 'l', label: 'Trench Length', default: 10, unit: 'm' },
      { key: 'w', label: 'Trench Width', default: 1.5, unit: 'm' },
      { key: 'd', label: 'Trench Depth', default: 1.5, unit: 'm' }
    ],
    formula: (v: any) => {
      const vol = v.l * v.w * v.d;
      return {
        mainValue: vol,
        mainUnit: 'm³',
        details: [
          { label: 'Loose Volume (30%)', value: (vol * 1.3).toFixed(2), unit: 'm³' },
          { label: 'Surface Area', value: (v.l * v.w).toFixed(1), unit: 'm²' }
        ],
        cost: vol * 450
      };
    }
  },
  'painting': {
    id: 'painting',
    name: 'Wall Painting',
    category: 'finishing',
    icon: '🖌️',
    description: 'Paint consumption and area coverage.',
    inputs: [
      { key: 'area', label: 'Total Wall Area', default: 500, unit: 'sqft' },
      { key: 'coats', label: 'Number of Coats', default: 2, unit: 'nos' }
    ],
    formula: (v: any) => {
      const coveragePerLiter = 65; // Average sqft per liter for 2 coats
      const liters = (v.area * v.coats) / 120; // Approx liters
      return {
        mainValue: liters,
        mainUnit: 'L',
        details: [
          { label: 'Area Coverage', value: v.area, unit: 'sqft' },
          { label: 'Primer Req.', value: (v.area / 100).toFixed(1), unit: 'L' }
        ],
        cost: liters * 350
      };
    }
  },
  'tiling': {
    id: 'tiling',
    name: 'Flooring / Tiling',
    category: 'finishing',
    icon: '🔳',
    description: 'Tile count and mortar requirement.',
    inputs: [
      { key: 'area', label: 'Floor Area', default: 200, unit: 'sqft' },
      { key: 'tile_l', label: 'Tile Length', default: 2, unit: 'ft' },
      { key: 'tile_w', label: 'Tile Width', default: 2, unit: 'ft' }
    ],
    formula: (v: any) => {
      const tileArea = v.tile_l * v.tile_w;
      const count = Math.ceil((v.area / tileArea) * 1.1); // 10% wastage
      return {
        mainValue: count,
        mainUnit: 'Tiles',
        details: [
          { label: 'Net Area', value: v.area, unit: 'sqft' },
          { label: 'Adhesive Req.', value: (v.area / 40).toFixed(1), unit: 'Bags' }
        ],
        cost: count * 150
      };
    }
  }
};
