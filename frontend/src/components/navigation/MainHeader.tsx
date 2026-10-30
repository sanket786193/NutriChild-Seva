import React, { useState } from 'react';
import {
  Search, Mic, PhoneCall, Moon, Sun, Eye,
  ChevronDown, User, LogOut, Settings, Calendar,
  FileText, Bell, Menu, X, HeartPulse, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UserRole } from '../../types';

export interface UserSession {
  isLoggedIn: boolean;
  name: string;
  role: UserRole;
  emailOrPhone: string;
  avatarInitial: string;
}

interface MainHeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  session: UserSession;
  onLogout: () => void;
  onOpenAuth: (mode: 'login' | 'register', roleTarget?: 'DOCTOR' | 'PATIENT') => void;
  onOpenSearch: () => void;
  onOpenVoiceAssistant: () => void;
  onEmergencySos: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  unreadCount?: number;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  currentPage,
  onNavigate,
  session,
  onLogout,
  onOpenAuth,
  onOpenSearch,
  onOpenVoiceAssistant,
  onEmergencySos,
  darkMode,
  onToggleDark,
  highContrast,
  onToggleHighContrast,
  unreadCount = 3,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] transition-colors font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ── Main Spacious Navigation Bar (Height: 80px) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* ── Left: Brand Identity & Breathing Room ── */}
          <div className="flex items-center gap-3.5 shrink-0 mr-4 lg:mr-8 xl:mr-12">
            <button
              onClick={() => onNavigate('home')}
              className="group flex items-center gap-3 text-left focus:outline-hidden cursor-pointer"
              aria-label="NutriChild Healthcare Home"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center font-bold shadow-xs transition-colors">
                <HeartPulse size={22} className="group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 leading-none">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    NutriChild<span className="text-teal-600 dark:text-teal-400">+</span>
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 tracking-wider uppercase mt-1 block">
                  Healthcare Platform
                </span>
              </div>
            </button>

            {/* Subtle Accreditation Pill */}
            <div className="hidden 2xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 text-[11px] font-medium text-slate-600 dark:text-slate-300 ml-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>National Health Grid · ABDM Ready</span>
            </div>
          </div>

          {/* ── Center: Navigation Links (Spacious with Generous Gap) ── */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-[13.5px] font-semibold tracking-tight transition-colors py-2 relative cursor-pointer ${
                currentPage === 'home'
                  ? 'text-teal-800 dark:text-teal-300 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-teal-700 dark:after:bg-teal-400 after:rounded-full'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => onNavigate('appointments')}
              className={`text-[13.5px] font-semibold tracking-tight transition-colors py-2 relative cursor-pointer ${
                currentPage === 'appointments'
                  ? 'text-teal-800 dark:text-teal-300 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-teal-700 dark:after:bg-teal-400 after:rounded-full'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Appointments
            </button>

            <button
              onClick={() => onNavigate('reports')}
              className={`text-[13.5px] font-semibold tracking-tight transition-colors py-2 relative cursor-pointer ${
                currentPage === 'reports'
                  ? 'text-teal-800 dark:text-teal-300 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-teal-700 dark:after:bg-teal-400 after:rounded-full'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Reports &amp; Labs
            </button>

            <button
              onClick={() => onNavigate('doctor-dashboard')}
              className={`text-[13.5px] font-semibold tracking-tight transition-colors py-2 relative cursor-pointer ${
                currentPage === 'doctor-dashboard'
                  ? 'text-teal-800 dark:text-teal-300 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-teal-700 dark:after:bg-teal-400 after:rounded-full'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              For Providers
            </button>

            <button
              onClick={() => onNavigate('patient-dashboard')}
              className={`text-[13.5px] font-semibold tracking-tight transition-colors py-2 relative cursor-pointer ${
                currentPage === 'patient-dashboard'
                  ? 'text-teal-800 dark:text-teal-300 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-teal-700 dark:after:bg-teal-400 after:rounded-full'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              For Members
            </button>
          </nav>

          {/* ── Right: Grouped Icons & Aligned Buttons ── */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">

            {/* Emergency Hotline Badge (Calm & Clear) */}
            <button
              onClick={onEmergencySos}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200/80 dark:border-rose-900/60 transition shadow-2xs cursor-pointer"
              aria-label="Call 108 Emergency Ambulance"
              title="108 National Emergency Ambulance"
            >
              <PhoneCall size={12} className="animate-pulse text-rose-600 dark:text-rose-400" />
              <span>108 SOS</span>
            </button>

            {/* Subtle Divider */}
            <div className="h-5 w-[1px] bg-slate-200/80 dark:bg-slate-700 hidden sm:block" />

            {/* Icon Group with Uniform 36x36px Sizing */}
            <div className="flex items-center gap-1">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Search records (⌘K / Ctrl+K)"
                aria-label="Search"
              >
                <Search size={17} />
              </button>

              {/* Vernacular Voice AI */}
              <button
                onClick={onOpenVoiceAssistant}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/60 transition cursor-pointer"
                title="AI Vernacular Voice Assistant"
                aria-label="Voice AI"
              >
                <Mic size={17} />
              </button>

              {/* Notifications */}
              <button
                onClick={() => onNavigate('notifications')}
                className="w-9 h-9 rounded-xl flex items-center justify-center relative text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Clinical Notifications"
                aria-label="Notifications"
              >
                <Bell size={17} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-600 ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>

              {/* Theme & Contrast Toggles */}
              <button
                onClick={onToggleDark}
                className="w-9 h-9 rounded-xl hidden md:flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                aria-label="Toggle Dark Mode"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button
                onClick={onToggleHighContrast}
                className={`w-9 h-9 rounded-xl hidden md:flex items-center justify-center transition cursor-pointer ${
                  highContrast
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Toggle High Contrast"
                aria-label="High Contrast"
              >
                <Eye size={16} />
              </button>
            </div>

            {/* Subtle Divider */}
            <div className="h-5 w-[1px] bg-slate-200/80 dark:bg-slate-700 hidden sm:block" />

            {/* Auth Buttons: "Log in" and "Register Portal" */}
            {session.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(p => !p)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <div className="w-6 h-6 rounded-lg bg-teal-700 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                    {session.avatarInitial || 'U'}
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white max-w-[105px] truncate">
                    {session.name}
                  </span>
                  <ChevronDown size={13} className="text-slate-400" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-xs"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="font-bold text-slate-900 dark:text-white">{session.name}</p>
                        <p className="text-[11px] text-slate-500 capitalize">{session.role.toLowerCase()} Account</p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigate(session.role === 'DOCTOR' ? 'doctor-dashboard' : 'patient-dashboard');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200"
                        >
                          <Activity size={14} className="text-teal-600" /> My Dashboard
                        </button>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigate('profile');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200"
                        >
                          <User size={14} className="text-teal-600" /> Clinical Profile
                        </button>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigate('appointments');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200"
                        >
                          <Calendar size={14} className="text-teal-600" /> Appointments
                        </button>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigate('settings');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200"
                        >
                          <Settings size={14} className="text-teal-600" /> System Settings
                        </button>
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onLogout();
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 font-semibold flex items-center gap-2"
                        >
                          <LogOut size={14} /> Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                {/* Refined "Log in" Button */}
                <button
                  onClick={() => onOpenAuth('login')}
                  className="h-9 px-4 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 transition shadow-2xs cursor-pointer flex items-center justify-center"
                >
                  Log in
                </button>

                {/* Professional "Register Portal" Button */}
                <button
                  onClick={() => onOpenAuth('register')}
                  className="h-9 px-4.5 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 transition shadow-xs hover:shadow-sm cursor-pointer flex items-center justify-center whitespace-nowrap"
                >
                  Register Portal
                </button>
              </div>
            )}

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(p => !p)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3"
          >
            <div className="flex flex-col space-y-1 text-xs font-semibold">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Overview
              </button>
              <button
                onClick={() => {
                  onNavigate('appointments');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Appointments &amp; Care Visits
              </button>
              <button
                onClick={() => {
                  onNavigate('reports');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Reports &amp; Diagnostic Records
              </button>
              <button
                onClick={() => {
                  onNavigate('doctor-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                For Healthcare Providers
              </button>
              <button
                onClick={() => {
                  onNavigate('patient-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                For Family Members
              </button>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              {!session.isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      onOpenAuth('login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-1/2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-200"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth('register');
                      setMobileMenuOpen(false);
                    }}
                    className="w-1/2 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs"
                  >
                    Register Portal
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-rose-600 font-bold text-xs"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
