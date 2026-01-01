
import React, { useState } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: '📐',
      title: '200+ Calculators',
      desc: 'From concrete mix to steel weight'
    },
    {
      icon: '📊',
      title: 'Smart BOQ',
      desc: 'Auto-generate bill of quantities'
    },
    {
      icon: '🤖',
      title: 'AI Assistant',
      desc: 'Get instant construction advice'
    },
    {
      icon: '💰',
      title: 'Cost Estimation',
      desc: 'Real-time pricing in any currency'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-peach-light dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-y-auto no-scrollbar">
      {/* Hero Section */}
      <div className="relative px-6 pt-12 pb-8">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-ocean/10 rounded-full blur-3xl -z-10" />

        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-coral to-gold rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-coral/30">
            C
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight dark:text-white">
            Calc<span className="text-coral">Site</span> Pro
          </span>
        </div>

        {/* Hero Content */}
        <div className="mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Building Dreams,<br />
            <span className="text-coral">One Calculation</span><br />
            at a Time.
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            The most powerful construction calculator suite trusted by engineers, contractors, and builders worldwide.
          </p>
        </div>

        {/* Illustration */}
        <div className="relative bg-white dark:bg-gray-800 rounded-[32px] p-6 shadow-2xl border border-gray-100 dark:border-white/5 mb-10">
          <div className="flex items-center justify-center h-40">
            <svg viewBox="0 0 200 120" className="w-full h-full max-w-xs">
              {/* Building illustration */}
              <rect x="20" y="40" width="50" height="70" fill="#D4857A" rx="4" />
              <rect x="30" y="50" width="12" height="15" fill="#FDF8F5" rx="2" />
              <rect x="48" y="50" width="12" height="15" fill="#FDF8F5" rx="2" />
              <rect x="30" y="75" width="12" height="15" fill="#FDF8F5" rx="2" />
              <rect x="48" y="75" width="12" height="15" fill="#FDF8F5" rx="2" />

              <rect x="80" y="20" width="60" height="90" fill="#7CC4D8" rx="4" />
              <rect x="90" y="30" width="15" height="20" fill="#FDF8F5" rx="2" />
              <rect x="115" y="30" width="15" height="20" fill="#FDF8F5" rx="2" />
              <rect x="90" y="60" width="15" height="20" fill="#FDF8F5" rx="2" />
              <rect x="115" y="60" width="15" height="20" fill="#FDF8F5" rx="2" />
              <rect x="100" y="90" width="20" height="20" fill="#E8B864" rx="2" />

              <rect x="150" y="50" width="35" height="60" fill="#E8B864" rx="4" />
              <rect x="158" y="60" width="10" height="12" fill="#FDF8F5" rx="1" />
              <rect x="158" y="80" width="10" height="12" fill="#FDF8F5" rx="1" />

              {/* Ground */}
              <rect x="10" y="110" width="180" height="4" fill="#2D5A6A" rx="2" />

              {/* Crane */}
              <line x1="170" y1="10" x2="170" y2="50" stroke="#2D5A6A" strokeWidth="3" />
              <line x1="170" y1="10" x2="130" y2="10" stroke="#2D5A6A" strokeWidth="2" />
              <line x1="140" y1="10" x2="140" y2="30" stroke="#2D5A6A" strokeWidth="1" strokeDasharray="2" />
            </svg>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-coral text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            Trusted by 50,000+ Professionals
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="px-6 py-10 bg-white/50 dark:bg-white/5">
        <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Why CalcSite Pro?
        </h2>

        <div className="space-y-6">
          {/* Story Card 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-[24px] border border-gray-100 dark:border-white/5 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-coral/10 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                😤
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">The Problem</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Every day, engineers and contractors waste hours on manual calculations.
                  Spreadsheets get messy. Formulas break. Costly mistakes happen on-site.
                  <span className="text-coral font-semibold"> Sound familiar?</span>
                </p>
              </div>
            </div>
          </div>

          {/* Story Card 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-[24px] border border-gray-100 dark:border-white/5 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-ocean/10 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                💡
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">The Solution</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  We built CalcSite Pro with real engineers, for real projects.
                  Every formula is battle-tested. Every calculation follows
                  <span className="text-ocean font-semibold"> IS codes and international standards.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Story Card 3 */}
          <div className="bg-gradient-to-br from-coral to-coral-deep p-6 rounded-[24px] shadow-xl text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                🚀
              </div>
              <div>
                <h3 className="font-bold mb-2">The Result</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Projects completed 3x faster. Zero calculation errors.
                  Professional BOQ reports generated in seconds.
                  <span className="font-bold"> Join the revolution.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-6 py-10">
        <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Everything You Need
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-5 rounded-[20px] border border-gray-100 dark:border-white/5 shadow-md hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="px-6 py-8">
        <div className="bg-gray-900 dark:bg-gray-800 p-6 rounded-[28px] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 text-8xl opacity-10 font-serif">"</div>
          <p className="text-white/90 text-sm leading-relaxed mb-4 relative z-10">
            "CalcSite Pro has transformed how we estimate projects. What used to take
            my team hours now takes minutes. It's not just a calculator — it's our
            competitive advantage."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-coral rounded-full flex items-center justify-center font-bold">
              RK
            </div>
            <div>
              <div className="font-bold text-sm">Rajesh Kumar</div>
              <div className="text-white/50 text-xs">Senior Civil Engineer, L&T</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 pt-6 pb-12">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Build Smarter?
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Join thousands of professionals who've upgraded their workflow.
          </p>
        </div>

        <button
          onClick={onGetStarted}
          className="w-full bg-gradient-to-r from-coral to-coral-deep text-white py-5 rounded-[24px] font-black text-lg shadow-2xl shadow-coral/30 active:scale-95 transition-all flex items-center justify-center gap-3 group"
        >
          <span>Try CalcSite Pro Free</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="3"
          >
            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <p className="text-center text-gray-400 text-xs mt-4">
          No signup required • Works offline • 100% Free
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 py-6 border-t border-gray-100 dark:border-white/5 text-center">
        <p className="text-gray-400 text-xs">
          Made with ❤️ for the construction industry
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
