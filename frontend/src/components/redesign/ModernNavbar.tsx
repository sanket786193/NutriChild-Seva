import React, { useState, useEffect } from 'react';
import {
  Activity, Search, Mic, PhoneCall, Moon, Sun, Eye,
  Languages, UserCheck, ShieldCheck, ChevronDown,
  Menu, X, Sparkles, Layers, ArrowUpRight, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UserRole, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import { SpeechEngine } from '../../services/speech';

interface ModernNavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  isOnline: boolean;
  pendingSyncCount: number;
  onSync: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  onOpenVoiceAssistant: () => void;
  onEmergencySos: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  activeView: 'platform' | 'workstation';
  onToggleView: (view: 'platform' | 'workstation') => void;
  onOpenSearch: () => void;
}

const ROLES: { value: UserRole; label: string; badge: string }[] = [
  { value: 'ASHA',         label: 'ASHA Field Worker',    badge: 'Frontline' },
  { value: 'ANGANWADI',    label: 'Anganwadi Worker (AWW)',badge: 'Poshan 2.0' },
  { value: 'DOCTOR',       label: 'Medical Officer (MO)',  badge: 'Clinical' },
  { value: 'GOVT_OFFICER', label: 'Govt CDPO / Collector', badge: 'Governance' },
  { value: 'PARENT',       label: 'Mother / Parent',       badge: 'Family' },
  { value: 'ADMIN',        label: 'System Administrator',  badge: 'Root' },
];

const LANGUAGES: { value: LanguageCode; label: string; native: string }[] = [
  { value: 'en', label: 'English', native: 'English' },
  { value: 'hi', label: 'Hindi',   native: 'हिंदी' },
  { value: 'or', label: 'Odia',    native: 'ଓଡ଼ିଆ' },
  { value: 'mr', label: 'Marathi', native: 'मराठी' },
  { value: 'bn', label: 'Bengali', native: 'বাংলা' },
  { value: 'te', label: 'Telugu',  native: 'తెలుగు' },
  { value: 'ta', label: 'Tamil',   native: 'தமிழ்' },
];

export const ModernNavbar: React.FC<ModernNavbarProps> = ({
  currentRole,
  onRoleChange,
  language,
  onLanguageChange,
  isOnline,
  pendingSyncCount,
  onSync,
  highContrast,
  onToggleHighContrast,
  onOpenVoiceAssistant,
  onEmergencySos,
  darkMode,
  onToggleDark,
  activeView,
  onToggleView,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentRoleObj = ROLES.find(r => r.value === currentRole) || ROLES[0];
  const currentLangObj = LANGUAGES.find(l => l.value === language) || LANGUAGES[0];

  const handleSpeakWelcome = () => {
    SpeechEngine.speak(
      `${t.appName}. AI-Powered Child Nutrition and Telemetry Grid. System status: Operational.`,
      language
    );
  };

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Live Operations', href: '#operations' },
    { label: 'Core Platform', href: '#features' },
    { label: 'WHO Growth Engine', href: '#clinical' },
    { label: 'Vitals Simulator', href: '#simulator' },
    { label: 'Impact & Trust', href: '#trust' },
    { label: 'Consultation', href: '#consultation' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* ── Top Micro-Bar: District Live Ticker & Quick SOS ── */}
      <div className="bg-slate-900 text-slate-300 border-b border-slate-800 text-[11px] font-medium tracking-wide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              LIVE GRID
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-300 truncate">
              Rayagada District Health Mesh · 1,284 Children Screened · Dexie Sync Active
            </span>
            <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px]">
              <ShieldCheck size={11} /> ABDM &amp; NHM Compliant
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Sync status */}
            <button
              onClick={onSync}
              className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-slate-200 transition"
              title="Force offline batch synchronization"
            >
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-teal-400' : 'bg-amber-400'}`} />
              <span>{isOnline ? (pendingSyncCount > 0 ? `${pendingSyncCount} queued` : 'Synced') : 'Offline'}</span>
            </button>

            {/* Quick 108 Emergency Ambulance Trigger */}
            <button
              onClick={onEmergencySos}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white font-semibold text-[10px] transition shadow-xs cursor-pointer focus:outline-hidden"
              aria-label="Call 108 Emergency Ambulance"
            >
              <PhoneCall size={10} className="animate-pulse" />
              <span>108 SOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Glassmorphic Navigation Bar ── */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800'
            : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* ── Brand Logo Lockup ── */}
            <div className="flex items-center gap-3">
              <a
                href="#overview"
                className="group flex items-center gap-2.5 focus:outline-hidden"
                onClick={() => onToggleView('platform')}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 p-0.5 shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-teal-900/20 backdrop-blur-xs rounded-[10px] flex items-center justify-center text-white">
                    <Activity size={20} className="text-white group-hover:rotate-12 transition-transform" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
                      NutriChild<span className="text-teal-600 dark:text-teal-400">+</span>
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800">
                      v2.4
                    </span>
                  </div>
                  <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                    Pediatric Health &amp; Telemetry
                  </p>
                </div>
              </a>
            </div>

            {/* ── Desktop Center Navigation Links ── */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* ── Right Action Controls ── */}
            <div className="flex items-center gap-2">
              {/* Global Search Button */}
              <button
                onClick={onOpenSearch}
                className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                aria-label="Search registry"
              >
                <Search size={13} />
                <span className="hidden md:inline">Search records…</span>
                <kbd className="hidden md:inline text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-700">
                  ⌘K
                </kbd>
              </button>

              {/* Voice AI Diagnostic Trigger */}
              <button
                onClick={onOpenVoiceAssistant}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200/80 dark:border-teal-800 transition cursor-pointer"
                title="Launch Vernacular AI Voice Assistant"
              >
                <Mic size={14} className="text-teal-600 dark:text-teal-400" />
                <span className="hidden sm:inline">Voice AI</span>
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
                </span>
              </button>

              {/* Language Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setLangDropdownOpen(p => !p);
                    setRoleDropdownOpen(false);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700 rounded-lg border border-slate-200/80 dark:border-slate-700 transition"
                  aria-label="Select language"
                  aria-expanded={langDropdownOpen}
                >
                  <Languages size={13} className="text-slate-500" />
                  <span className="font-semibold">{currentLangObj.native}</span>
                  <ChevronDown size={11} className="text-slate-400" />
                </button>

                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50"
                    >
                      <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Regional Languages
                      </div>
                      {LANGUAGES.map(l => (
                        <button
                          key={l.value}
                          onClick={() => {
                            onLanguageChange(l.value);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-teal-50 dark:hover:bg-slate-700/60 transition ${
                            language === l.value
                              ? 'text-teal-700 dark:text-teal-300 font-bold bg-teal-50/70 dark:bg-slate-700/80'
                              : 'text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <span>{l.label}</span>
                          <span className="text-xs text-slate-400 font-medium">{l.native}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Role Switcher Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => {
                    setRoleDropdownOpen(p => !p);
                    setLangDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700 rounded-lg border border-slate-200/80 dark:border-slate-700 transition"
                  aria-label="Switch User Persona Role"
                  aria-expanded={roleDropdownOpen}
                >
                  <UserCheck size={13} className="text-teal-600 dark:text-teal-400" />
                  <span className="font-medium truncate max-w-[110px]">{currentRoleObj.label}</span>
                  <ChevronDown size={11} className="text-slate-400" />
                </button>

                <AnimatePresence>
                  {roleDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50"
                    >
                      <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Select Healthcare Persona
                      </div>
                      {ROLES.map(r => (
                        <button
                          key={r.value}
                          onClick={() => {
                            onRoleChange(r.value);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-teal-50 dark:hover:bg-slate-700/60 transition ${
                            currentRole === r.value
                              ? 'text-teal-700 dark:text-teal-300 font-bold bg-teal-50/70 dark:bg-slate-700/80'
                              : 'text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <div>
                            <div>{r.label}</div>
                            <span className="text-[10px] text-slate-400 font-normal">{r.badge}</span>
                          </div>
                          {currentRole === r.value && (
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme & Accessibility Toggles */}
              <div className="flex items-center border-l border-slate-200 dark:border-slate-800 pl-2 gap-1">
                <button
                  onClick={onToggleDark}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={15} /> : <Moon size={15} />}
                </button>
                <button
                  onClick={onToggleHighContrast}
                  className={`p-1.5 rounded-lg transition ${
                    highContrast
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  aria-label="Toggle high contrast accessibility mode"
                  title="High Contrast (WCAG 2.2 AAA)"
                >
                  <Eye size={15} />
                </button>
              </div>

              {/* View Switcher: Platform vs Clinical Workstation */}
              <button
                onClick={() => onToggleView(activeView === 'platform' ? 'workstation' : 'platform')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 shadow-sm shadow-teal-700/30 hover:shadow-md hover:shadow-teal-700/40 transition cursor-pointer"
              >
                <Layers size={13} />
                <span>{activeView === 'platform' ? 'Clinical Console' : 'Platform Overview'}</span>
                <ArrowUpRight size={12} className="opacity-70" />
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(p => !p)}
                className="lg:hidden p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <button
                  onClick={() => {
                    onToggleView(activeView === 'platform' ? 'workstation' : 'platform');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-teal-700 hover:bg-teal-800 shadow-sm"
                >
                  <Layers size={16} />
                  <span>{activeView === 'platform' ? 'Open Clinical Console' : 'Switch to Platform Overview'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

