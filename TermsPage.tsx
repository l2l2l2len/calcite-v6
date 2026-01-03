
import React from 'react';

interface TermsPageProps {
  onBack: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
  return (
    <div className="px-6 py-6 pb-32 bg-surface-secondary dark:bg-navy min-h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-2xl font-bold dark:text-white tracking-tight">Terms of Service</h1>
      </div>

      <div className="space-y-6">
        <div className="card-enterprise p-6 rounded-2xl">
          <p className="text-sm text-slate-light mb-4">
            <strong className="text-gray-900 dark:text-white">Last Updated:</strong> January 2024
          </p>
          <p className="text-sm text-slate-light leading-relaxed">
            By using CalcSite Pro ("the Application"), you agree to these Terms of Service. Please read them carefully before using our services.
          </p>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h3>
          <p className="text-sm text-slate-light leading-relaxed">
            By accessing or using CalcSite Pro, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use the Application.
          </p>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">2. Description of Service</h3>
          <p className="text-sm text-slate-light leading-relaxed mb-3">
            CalcSite Pro provides construction calculation tools, bill of quantities generation, unit conversion, and AI-assisted engineering guidance. The Application is provided free of charge with no registration required.
          </p>
          <p className="text-sm text-slate-light leading-relaxed">
            All calculations are provided for reference and estimation purposes only. Users must verify all calculations with qualified professionals before use in actual construction projects.
          </p>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">3. User Responsibilities</h3>
          <ul className="text-sm text-slate-light space-y-2">
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>You are responsible for verifying all calculation results with qualified engineers before implementation.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>You must not rely solely on this Application for critical structural or safety-related decisions.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>You agree to use the Application in compliance with all applicable laws and regulations.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>You are responsible for maintaining the security of your local device and stored data.</span>
            </li>
          </ul>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">4. Disclaimer of Warranties</h3>
          <p className="text-sm text-slate-light leading-relaxed mb-3">
            THE APPLICATION IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. We do not warrant that:
          </p>
          <ul className="text-sm text-slate-light space-y-2">
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>Calculations will be error-free or accurate for all scenarios</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>The Application will be uninterrupted or available at all times</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>Results are suitable for any particular purpose or use case</span>
            </li>
          </ul>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">5. Limitation of Liability</h3>
          <p className="text-sm text-slate-light leading-relaxed">
            To the maximum extent permitted by law, CalcSite Pro and its creators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the Application, including but not limited to construction errors, material waste, or project delays resulting from reliance on calculations provided by this tool.
          </p>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">6. Intellectual Property</h3>
          <p className="text-sm text-slate-light leading-relaxed">
            All content, design, code, and functionality of CalcSite Pro are the intellectual property of Gregorious Studio. You may not copy, modify, distribute, or reverse engineer any part of the Application without prior written consent.
          </p>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">7. Data Storage</h3>
          <p className="text-sm text-slate-light leading-relaxed">
            All data (projects, calculations, preferences) is stored locally on your device using browser localStorage. We do not collect, transmit, or store any personal data on external servers. You are responsible for backing up your data; clearing browser data will permanently delete all saved information.
          </p>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">8. AI Assistant Disclaimer</h3>
          <p className="text-sm text-slate-light leading-relaxed">
            The AI Engineering Assistant uses third-party AI services (Google Gemini) to provide responses. AI-generated content is for informational purposes only and should not replace professional engineering advice. We are not responsible for the accuracy of AI-generated responses.
          </p>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">9. Modifications to Terms</h3>
          <p className="text-sm text-slate-light leading-relaxed">
            We reserve the right to modify these Terms at any time. Continued use of the Application after changes constitutes acceptance of the new Terms.
          </p>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">10. Contact</h3>
          <p className="text-sm text-slate-light leading-relaxed">
            For questions about these Terms of Service, please contact us through the Help section in the Application.
          </p>
        </div>

        <div className="text-center py-6">
          <p className="text-xs text-slate-light">© 2024 CalcSite Pro by Gregorious Studio</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
