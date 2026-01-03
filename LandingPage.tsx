
import React, { useState } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: '200+ Calculators',
      desc: 'From concrete mix to steel weight'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Smart BOQ',
      desc: 'Auto-generate bill of quantities'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'AI Assistant',
      desc: 'Get instant construction advice'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Cost Estimation',
      desc: 'Real-time pricing in any currency'
    }
  ];

  const solutions = [
    {
      title: 'For Engineers',
      desc: 'Precision calculations following IS codes and international standards',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      )
    },
    {
      title: 'For Contractors',
      desc: 'Quick estimates and BOQ generation for competitive bidding',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      )
    },
    {
      title: 'For Teams',
      desc: 'Multi-project management with shared reference library',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-navy overflow-y-auto no-scrollbar">
      {/* Hero Section - Dark Navy Background */}
      <div className="relative bg-navy dark:bg-navy-deep text-white overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/20 to-navy opacity-90" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative px-6 pt-12 pb-16">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-purple rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-accent/30">
              C
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Calc<span className="text-accent-light">Site</span> Pro
            </span>
          </div>

          {/* Hero Content */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
              Professional
              <br />
              Construction
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent-purple">
                Intelligence
              </span>
            </h1>
            <p className="text-slate-light text-lg leading-relaxed max-w-md">
              The most powerful construction calculator suite trusted by engineers, contractors, and builders worldwide.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onGetStarted}
              className="btn-primary px-8 py-4 rounded-xl font-semibold text-white shadow-accent flex items-center justify-center gap-2 group"
            >
              <span>Get Started Free</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="px-8 py-4 rounded-xl font-semibold text-white/80 border border-white/20 hover:bg-white/5 transition-all">
              Learn More
            </button>
          </div>

          {/* Trust indicator */}
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-2">
              {['RK', 'SP', 'AM', 'VK'].map((initials, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-xs font-bold border-2 border-navy">
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-light">
              Trusted by <span className="text-white font-semibold">50,000+</span> professionals
            </p>
          </div>
        </div>
      </div>

      {/* Features Section - White Background */}
      <div className="px-6 py-16 bg-surface-secondary dark:bg-navy-light/10">
        <div className="mb-10">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Features</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Everything You Need
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="card-enterprise p-5 rounded-2xl"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{feature.title}</h3>
              <p className="text-slate-light text-xs leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions Section */}
      <div className="px-6 py-16 bg-white dark:bg-navy">
        <div className="mb-10">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Solutions</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Built for Your Workflow
          </h2>
        </div>

        <div className="space-y-4">
          {solutions.map((solution, idx) => (
            <div
              key={idx}
              className="card-enterprise p-6 rounded-2xl flex items-start gap-4"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent-purple/10 text-accent flex items-center justify-center flex-shrink-0">
                {solution.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{solution.title}</h3>
                <p className="text-slate-light text-sm leading-relaxed">{solution.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why CalcSite Pro Section */}
      <div className="px-6 py-16 bg-surface-tertiary dark:bg-navy-light/5">
        <div className="mb-10">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Why Choose Us</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Why CalcSite Pro?
          </h2>
        </div>

        <div className="space-y-4">
          {/* Problem Card */}
          <div className="card-enterprise p-6 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-red-500 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">The Problem</h3>
                <p className="text-slate-light text-sm leading-relaxed">
                  Every day, engineers and contractors waste hours on manual calculations.
                  Spreadsheets get messy. Formulas break.
                  <span className="text-red-500 font-medium"> Costly mistakes happen on-site.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Solution Card */}
          <div className="card-enterprise p-6 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">The Solution</h3>
                <p className="text-slate-light text-sm leading-relaxed">
                  We built CalcSite Pro with real engineers, for real projects.
                  Every formula is battle-tested. Every calculation follows
                  <span className="text-accent font-medium"> IS codes and international standards.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Result Card - Gradient */}
          <div className="bg-gradient-to-br from-accent to-accent-purple p-6 rounded-2xl text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">The Result</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Projects completed 3x faster. Zero calculation errors.
                  Professional BOQ reports generated in seconds.
                  <span className="font-semibold"> Join the revolution.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="px-6 py-12 bg-white dark:bg-navy">
        <div className="bg-navy dark:bg-navy-light/20 p-6 rounded-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-4 text-7xl opacity-10 font-serif">"</div>
          <p className="text-white/90 text-sm leading-relaxed mb-4 relative z-10">
            "CalcSite Pro has transformed how we estimate projects. What used to take
            my team hours now takes minutes. It's not just a calculator — it's our
            competitive advantage."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-purple rounded-full flex items-center justify-center font-bold text-sm">
              RK
            </div>
            <div>
              <div className="font-semibold text-sm">Rajesh Kumar</div>
              <div className="text-white/50 text-xs">Senior Civil Engineer, L&T</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 pt-8 pb-16 bg-surface-secondary dark:bg-navy-light/5">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Build Smarter?
          </h2>
          <p className="text-slate-light">
            Join thousands of professionals who've upgraded their workflow.
          </p>
        </div>

        <button
          onClick={onGetStarted}
          className="w-full btn-primary text-white py-4 rounded-xl font-semibold shadow-accent flex items-center justify-center gap-3 group"
        >
          <span>Try CalcSite Pro Free</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <p className="text-center text-slate-light text-xs mt-4">
          No signup required • Works offline • 100% Free
        </p>
      </div>

      {/* Footer - Dark Navy */}
      <div className="px-6 py-8 bg-navy text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-purple rounded-lg flex items-center justify-center text-white text-sm font-bold">
              C
            </div>
            <span className="font-semibold">CalcSite Pro</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="text-white/40 text-xs text-center">
            Made with precision for the construction industry
          </p>
          <p className="text-white/60 text-xs text-center mt-1 font-medium">
            Gregorious Studio
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
