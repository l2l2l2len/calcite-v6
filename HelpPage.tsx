
import React, { useState } from 'react';

interface HelpPageProps {
  onBack: () => void;
}

const HelpPage: React.FC<HelpPageProps> = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I use the calculators?",
      a: "Navigate to the Suite tab, select a category or calculator from the Core Essentials section. Enter your dimensions in the input fields and the calculation updates automatically in real-time. Click 'Add to BOQ' to save the result to your estimate."
    },
    {
      q: "How do I save my calculations?",
      a: "After completing a calculation, click the 'Add to BOQ' or 'Save to BOQ' button. This adds the result to your Bill of Quantities which you can view in the Estimates tab. All data is saved automatically to your browser's local storage."
    },
    {
      q: "Can I use this offline?",
      a: "Yes! Once loaded, the calculator suite works offline. Your data is stored locally in your browser. However, the AI Assistant feature requires an internet connection."
    },
    {
      q: "How accurate are the calculations?",
      a: "All formulas follow established engineering codes (IS 456, ACI 318, NEC). However, these are estimates for reference only. Always verify calculations with qualified engineers before implementation on actual projects."
    },
    {
      q: "How do I change the currency?",
      a: "Go to Profile (Settings) and select your preferred currency from the dropdown (INR, USD, or GBP). All cost estimates will update automatically across the app."
    },
    {
      q: "How do I customize material rates?",
      a: "In Profile (Settings), scroll to 'Custom Material Rates' and enter your local prices for cement, steel, bricks, and labor. These rates will be used in all cost calculations."
    },
    {
      q: "What is the D²/162 formula for steel?",
      a: "This is the standard Indian formula for calculating steel bar weight. Weight (kg/m) = Diameter² / 162, where diameter is in mm. For example, a 12mm bar weighs 12²/162 = 0.888 kg per meter."
    },
    {
      q: "How do I export my BOQ?",
      a: "In the Estimates tab, click the Share button at the bottom. This will copy a formatted text version of your BOQ to your clipboard, or open the native share dialog on mobile devices."
    },
    {
      q: "How do I switch between projects?",
      a: "Click the folder icon in the header to open the Project Manager. You can create new projects or switch between existing ones. Each project maintains its own separate Bill of Quantities."
    },
    {
      q: "Is my data stored online?",
      a: "No. All your data (projects, calculations, preferences) is stored locally in your browser. We don't have servers that collect your information. Clearing browser data will delete all saved information."
    },
    {
      q: "Why isn't the AI Assistant responding?",
      a: "The AI Assistant requires an internet connection and a valid API key. If it's not responding, check your connection. If you're self-hosting, ensure the GEMINI_API_KEY environment variable is configured."
    },
    {
      q: "What units are used in calculations?",
      a: "Most calculators use metric units (meters, m², m³) with support for converting inputs. Use the Unit Converter tool for quick conversions between metric and imperial units."
    }
  ];

  const guides = [
    {
      title: "Calculating Concrete Volume",
      icon: "🏗️",
      steps: [
        "Go to Suite → Slab Concrete calculator",
        "Enter Length, Width, and Thickness in meters",
        "Select the concrete mix grade (M15, M20, M25)",
        "View the volume, cement bags, sand, and aggregate quantities",
        "Click 'Add to BOQ' to save the estimate"
      ]
    },
    {
      title: "Steel Reinforcement Estimation",
      icon: "⚙️",
      steps: [
        "Go to Suite → Steel Reinforcement",
        "Select the bar diameter (8mm to 32mm)",
        "Enter the total bar length and quantity",
        "View weight per meter and total weight",
        "Multiply by current steel rate for cost"
      ]
    },
    {
      title: "Creating a Bill of Quantities",
      icon: "📊",
      steps: [
        "Complete calculations for different elements",
        "Click 'Add to BOQ' after each calculation",
        "Go to Estimates tab to view all items",
        "Review the consolidated total",
        "Click Share to export the BOQ"
      ]
    }
  ];

  return (
    <div className="px-6 py-6 pb-32 bg-surface-secondary dark:bg-navy min-h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-2xl font-bold dark:text-white tracking-tight">Help & FAQ</h1>
      </div>

      <div className="space-y-8">
        {/* Quick Start */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Start Guides</h2>
          <div className="space-y-4">
            {guides.map((guide, idx) => (
              <div key={idx} className="card-enterprise p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{guide.icon}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{guide.title}</h3>
                </div>
                <ol className="space-y-2">
                  {guide.steps.map((step, sIdx) => (
                    <li key={sIdx} className="flex gap-3 text-sm text-slate-light">
                      <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card-enterprise rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className={`w-full flex justify-between items-center p-4 text-left font-semibold transition-all ${openFaq === idx ? 'bg-accent/5 text-accent' : 'text-gray-900 dark:text-white'}`}
                >
                  <span className="text-sm pr-4">{faq.q}</span>
                  <svg className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-accent' : 'text-slate-light'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`transition-all duration-300 ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <div className="px-4 pb-4 pt-0 border-t border-gray-100 dark:border-white/5">
                    <p className="text-sm text-slate-light leading-relaxed pt-3">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formulas Reference */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Formulas Used</h2>
          <div className="card-enterprise p-5 rounded-2xl">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Steel Bar Weight</h4>
                <code className="text-xs bg-surface-tertiary dark:bg-white/5 px-2 py-1 rounded font-mono">Weight (kg/m) = D² / 162</code>
                <p className="text-xs text-slate-light mt-1">where D = diameter in mm</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Concrete Dry Volume</h4>
                <code className="text-xs bg-surface-tertiary dark:bg-white/5 px-2 py-1 rounded font-mono">Dry Volume = Wet Volume × 1.54</code>
                <p className="text-xs text-slate-light mt-1">Accounts for voids and compaction</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Brick Count</h4>
                <code className="text-xs bg-surface-tertiary dark:bg-white/5 px-2 py-1 rounded font-mono">Bricks = Volume (m³) × 500 × 1.05</code>
                <p className="text-xs text-slate-light mt-1">500 bricks per m³ + 5% wastage</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Excavation Loose Volume</h4>
                <code className="text-xs bg-surface-tertiary dark:bg-white/5 px-2 py-1 rounded font-mono">Loose Volume = In-situ × 1.3</code>
                <p className="text-xs text-slate-light mt-1">30% swelling factor for excavated soil</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Still Need Help?</h2>
          <div className="card-enterprise p-6 rounded-2xl text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Ask the AI Assistant</h3>
            <p className="text-sm text-slate-light mb-4">
              Click the lightning bolt icon in the header to chat with our AI engineering assistant for specific technical questions.
            </p>
            <p className="text-xs text-slate-light">
              For feedback and suggestions, visit our GitHub repository.
            </p>
          </div>
        </section>

        <div className="text-center py-6">
          <p className="text-xs text-slate-light">CalcSite Pro v6.0.0 | Gregorious Studio</p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
