
import React from 'react';

interface PrivacyPageProps {
  onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <div className="px-6 py-6 pb-32 bg-surface-secondary dark:bg-navy min-h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-2xl font-bold dark:text-white tracking-tight">Privacy Policy</h1>
      </div>

      <div className="space-y-6">
        <div className="card-enterprise p-6 rounded-2xl">
          <p className="text-sm text-slate-light mb-4">
            <strong className="text-gray-900 dark:text-white">Last Updated:</strong> January 2024
          </p>
          <p className="text-sm text-slate-light leading-relaxed">
            Your privacy is important to us. This Privacy Policy explains how CalcSite Pro handles your information. The short version: we don't collect your personal data.
          </p>
        </div>

        {/* Key Highlight */}
        <div className="bg-gradient-to-br from-accent/10 to-accent-purple/10 p-6 rounded-2xl border border-accent/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">100% Local Storage</h3>
          </div>
          <p className="text-sm text-slate-light leading-relaxed">
            CalcSite Pro stores all your data locally on your device. We do not have servers that collect, store, or process your personal information. Your calculations, projects, and preferences never leave your device.
          </p>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Data We Don't Collect</h3>
          <ul className="text-sm text-slate-light space-y-2">
            <li className="flex gap-2 items-start">
              <svg className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>Personal identification information (name, email, phone)</span>
            </li>
            <li className="flex gap-2 items-start">
              <svg className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>Location data or GPS information</span>
            </li>
            <li className="flex gap-2 items-start">
              <svg className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>Your calculation data or project details</span>
            </li>
            <li className="flex gap-2 items-start">
              <svg className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>Device identifiers or fingerprints</span>
            </li>
            <li className="flex gap-2 items-start">
              <svg className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>Usage analytics or behavior tracking</span>
            </li>
          </ul>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Local Data Storage</h3>
          <p className="text-sm text-slate-light leading-relaxed mb-4">
            The following data is stored locally in your browser's localStorage:
          </p>
          <div className="space-y-3">
            <div className="bg-surface-tertiary dark:bg-white/5 p-3 rounded-xl">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Projects & BOQ</span>
              <p className="text-xs text-slate-light">Your project names, locations, and bill of quantities items</p>
            </div>
            <div className="bg-surface-tertiary dark:bg-white/5 p-3 rounded-xl">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Preferences</span>
              <p className="text-xs text-slate-light">Dark mode setting, currency selection, custom material rates</p>
            </div>
            <div className="bg-surface-tertiary dark:bg-white/5 p-3 rounded-xl">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Onboarding State</span>
              <p className="text-xs text-slate-light">Selected trades and app configuration</p>
            </div>
          </div>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">AI Assistant Data</h3>
          <p className="text-sm text-slate-light leading-relaxed mb-3">
            When you use the AI Engineering Assistant feature:
          </p>
          <ul className="text-sm text-slate-light space-y-2">
            <li className="flex gap-2 items-start">
              <span className="text-accent">•</span>
              <span>Your questions are sent to Google's Gemini AI service for processing</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-accent">•</span>
              <span>Google's privacy policy applies to data processed by their AI service</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-accent">•</span>
              <span>Conversation history is stored only in your current browser session and is not persisted</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-accent">•</span>
              <span>We do not store or have access to your AI conversations</span>
            </li>
          </ul>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Data Deletion</h3>
          <p className="text-sm text-slate-light leading-relaxed mb-3">
            Since all data is stored locally, you have complete control over deletion:
          </p>
          <ul className="text-sm text-slate-light space-y-2">
            <li className="flex gap-2 items-start">
              <span className="text-accent">•</span>
              <span><strong>Clear individual items:</strong> Use the reset/delete buttons within the app</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-accent">•</span>
              <span><strong>Clear all data:</strong> Clear your browser's localStorage for this site</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-accent">•</span>
              <span><strong>Uninstall:</strong> Simply close the browser tab; no installation needed</span>
            </li>
          </ul>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Cookies</h3>
          <p className="text-sm text-slate-light leading-relaxed">
            CalcSite Pro does not use cookies. We use browser localStorage solely for saving your preferences and work data locally on your device.
          </p>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Third-Party Services</h3>
          <p className="text-sm text-slate-light leading-relaxed mb-3">
            The only third-party service used is:
          </p>
          <div className="bg-surface-tertiary dark:bg-white/5 p-4 rounded-xl">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Google Gemini AI</span>
            <p className="text-xs text-slate-light mt-1">Used for the AI Engineering Assistant feature. Subject to Google's Privacy Policy when in use.</p>
          </div>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Children's Privacy</h3>
          <p className="text-sm text-slate-light leading-relaxed">
            CalcSite Pro is designed for professional use by engineers and contractors. We do not knowingly collect information from children under 13 years of age.
          </p>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Changes to This Policy</h3>
          <p className="text-sm text-slate-light leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify users of any material changes by updating the "Last Updated" date at the top of this page.
          </p>
        </div>

        <div className="card-enterprise p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Contact Us</h3>
          <p className="text-sm text-slate-light leading-relaxed">
            If you have questions about this Privacy Policy, please contact us through the Help section in the Application.
          </p>
        </div>

        <div className="text-center py-6">
          <p className="text-xs text-slate-light">© 2024 CalcSite Pro by Gregorious Studio</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
