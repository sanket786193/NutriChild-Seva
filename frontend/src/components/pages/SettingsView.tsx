import React, { useState } from 'react';
import {
  Settings, Shield, Bell, Languages, Database,
  Lock, Check, RefreshCw
} from 'lucide-react';
import type { LanguageCode } from '../../types';

interface SettingsViewProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onSync: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  onLanguageChange,
  onSync,
}) => {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [voicePrompts, setVoicePrompts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
            CONFIGURATION &amp; PREFERENCES
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Account &amp; System Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage regional languages, clinical alert thresholds, and offline storage synchronization.
          </p>
        </div>

        <div className="space-y-4">
          {/* Regional Languages */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <Languages size={17} className="text-teal-600" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Regional Vernacular Language
              </h3>
            </div>

            <p className="text-xs text-slate-500">
              Select your preferred language for visual display and Web Speech STT/TTS voice synthesis.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {[
                { code: 'hi', label: 'हिंदी (Hindi)' },
                { code: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
                { code: 'mr', label: 'मराठी (Marathi)' },
                { code: 'bn', label: 'বাংলা (Bengali)' },
                { code: 'te', label: 'తెలుగు (Telugu)' },
                { code: 'ta', label: 'தமிழ் (Tamil)' },
                { code: 'en', label: 'English (UK/IN)' },
              ].map(l => (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code as LanguageCode)}
                  className={`p-2.5 rounded-xl text-left font-medium border transition cursor-pointer ${
                    language === l.code
                      ? 'bg-teal-700 text-white border-teal-700 font-bold shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <Bell size={17} className="text-teal-600" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Alert Preferences
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer">
                <div>
                  <strong className="text-slate-900 dark:text-white block">SMS &amp; WhatsApp Due Date Alerts</strong>
                  <span className="text-slate-500">Receive automated reminders 3 days before scheduled immunizations.</span>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={e => setSmsAlerts(e.target.checked)}
                  className="rounded text-teal-700 focus:ring-teal-700 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer">
                <div>
                  <strong className="text-slate-900 dark:text-white block">Voice-First Guidance Prompts</strong>
                  <span className="text-slate-500">Audio playback of clinical instructions in regional language.</span>
                </div>
                <input
                  type="checkbox"
                  checked={voicePrompts}
                  onChange={e => setVoicePrompts(e.target.checked)}
                  className="rounded text-teal-700 focus:ring-teal-700 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Offline Database */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <Database size={17} className="text-teal-600" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Dexie.js Offline Cache &amp; Storage
              </h3>
            </div>

            <p className="text-xs text-slate-500">
              All child anthropometric records, WHO growth standards, and UIP timelines are persisted in your local browser IndexedDB.
            </p>

            <button
              onClick={onSync}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 transition shadow-xs cursor-pointer"
            >
              <RefreshCw size={13} className="text-teal-600" />
              <span>Force Synchronize Offline Batch</span>
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition shadow-xs cursor-pointer"
            >
              {saved ? '✓ Preferences Saved' : 'Save System Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
