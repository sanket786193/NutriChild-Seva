import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  FileText,
  Brain,
  Calendar,
  MessageSquare,
  FileCheck,
  Settings,
  ShieldAlert,
  Stethoscope,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X,
  PhoneCall,
  Activity,
  Sparkles
} from 'lucide-react';
import type { LanguageCode, Child, UserRole } from '../types';

// Sub-views
import { DoctorDashboardView } from './DoctorDashboardView';
import { DoctorChildrenView } from './DoctorChildrenView';
import { DoctorGrowthChartsView } from './DoctorGrowthChartsView';
import { DoctorPrescriptionsView } from './DoctorPrescriptionsView';
import { DoctorAiRiskView } from './DoctorAiRiskView';
import { DoctorAppointmentsView } from './DoctorAppointmentsView';
import { DoctorMessagesView } from './DoctorMessagesView';
import { DoctorReportsView } from './DoctorReportsView';
import { DoctorSettingsView } from './DoctorSettingsView';

interface DoctorPortalProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onSwitchRole: (role: UserRole) => void;
  onEmergencySos: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export type DoctorTab =
  | 'dashboard'
  | 'patients'
  | 'growth'
  | 'prescriptions'
  | 'airisk'
  | 'appointments'
  | 'messages'
  | 'reports'
  | 'settings';

export const DoctorPortal: React.FC<DoctorPortalProps> = ({
  language,
  onLanguageChange,
  onSwitchRole,
  onEmergencySos,
  highContrast,
  onToggleHighContrast
}) => {
  const [activeTab, setActiveTab] = useState<DoctorTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedChildForPrescription, setSelectedChildForPrescription] = useState<Child | null>(null);
  const [selectedChildForAi, setSelectedChildForAi] = useState<Child | null>(null);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Clinical Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'patients',
      label: 'Patients & Dossiers',
      icon: Users,
      badge: '1 SAM'
    },
    {
      id: 'growth',
      label: 'WHO Growth Curves',
      icon: TrendingUp,
      badge: null
    },
    {
      id: 'prescriptions',
      label: 'Pediatric Rx Pad',
      icon: FileText,
      badge: null
    },
    {
      id: 'airisk',
      label: 'AI Risk & CDSS',
      icon: Brain,
      badge: 'Explainable'
    },
    {
      id: 'appointments',
      label: 'Consultations & Telehealth',
      icon: Calendar,
      badge: '2 Today'
    },
    {
      id: 'messages',
      label: 'ASHA & Anganwadi Chat',
      icon: MessageSquare,
      badge: '3'
    },
    {
      id: 'reports',
      label: 'NRC Letters & Audits',
      icon: FileCheck,
      badge: null
    },
    {
      id: 'settings',
      label: 'Practice & CDSS Settings',
      icon: Settings,
      badge: null
    }
  ];

  const handleOpenPrescriptionForChild = (child: Child) => {
    setSelectedChildForPrescription(child);
    setActiveTab('prescriptions');
  };

  const handleOpenGrowthAssessment = (_child: Child) => {
    setActiveTab('growth');
  };

  const handleOpenAiRisk = (child: Child) => {
    setSelectedChildForAi(child);
    setActiveTab('airisk');
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col ${highContrast ? 'high-contrast' : ''}`}>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-700 via-teal-600 to-blue-600 text-white flex items-center justify-center shadow-[0_12px_24px_rgba(15,118,110,0.2)]">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 tracking-tight text-base sm:text-lg">
                    NutriChild<span className="text-teal-700">+</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[10px] font-black tracking-[0.12em] uppercase border border-teal-100">
                    Doctor Portal
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-semibold hidden sm:block">
                  CHC Barwani • Pediatric Telehealth & Clinical Decision Support
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onSwitchRole('ASHA')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all"
              title="Switch to ASHA & Anganwadi Field Worker View"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
              Field View
            </button>

            <button
              onClick={onToggleHighContrast}
              className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                highContrast
                  ? 'bg-amber-400 text-slate-950 border-amber-500'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title="High Contrast Accessibility Mode"
            >
              <span className="text-[11px] font-mono font-black">A/A</span>
            </button>

            <button
              onClick={onEmergencySos}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center gap-1.5 shadow-[0_10px_20px_rgba(220,38,38,0.25)] transition-all"
              title="Emergency 108 Ambulance & NRC Dispatch"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">108 SOS</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 text-teal-800 flex items-center justify-center font-black text-xs ring-2 ring-teal-600/20">
                PS
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-black text-slate-800 leading-tight">Dr. Priya Sharma</div>
                <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online • OPD
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col lg:flex-row gap-6">
        <aside className={`lg:w-68 shrink-0 space-y-1.5 lg:block ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-[0_18px_40px_rgba(15,23,42,0.05)] p-3 sticky top-24 space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
              Pediatric Clinical Suite
            </div>

            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as DoctorTab);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-700 to-teal-600 text-white shadow-[0_12px_20px_rgba(15,118,110,0.18)]'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isActive
                          ? 'bg-teal-900/30 text-teal-50'
                          : item.badge.includes('SAM')
                          ? 'bg-rose-100 text-rose-800'
                          : item.badge.includes('Today') || item.badge.includes('Explainable')
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 mt-3 border-t border-slate-100 px-3 pb-1">
              <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.12em] mb-2">
                Live queue
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Scheduled visits</span>
                  <span className="font-bold text-slate-900">2 patients</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>SAM referrals</span>
                  <span className="font-bold text-rose-600">1 child</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Avg. wait</span>
                  <span className="font-bold text-emerald-600">7 min</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center / Right Content Panel */}
        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && (
            <DoctorDashboardView
              language={language}
              onNavigateTab={(tab) => setActiveTab(tab as DoctorTab)}
              onSelectChildForPrescription={(childId) => {
                const dummyChild: any = { id: childId, fullName: 'Priyanka Soren', uhid: 'NC-697749' };
                handleOpenPrescriptionForChild(dummyChild);
              }}
            />
          )}

          {activeTab === 'patients' && (
            <DoctorChildrenView
              language={language}
              onOpenPrescriptionForChild={handleOpenPrescriptionForChild}
              onOpenGrowthAssessment={handleOpenGrowthAssessment}
              onOpenAiRisk={handleOpenAiRisk}
            />
          )}

          {activeTab === 'growth' && (
            <DoctorGrowthChartsView language={language} />
          )}

          {activeTab === 'prescriptions' && (
            <DoctorPrescriptionsView
              language={language}
              selectedChildForPrescription={selectedChildForPrescription}
            />
          )}

          {activeTab === 'airisk' && (
            <DoctorAiRiskView
              language={language}
              selectedChildForAi={selectedChildForAi}
            />
          )}

          {activeTab === 'appointments' && (
            <DoctorAppointmentsView
              language={language}
              onOpenPrescriptionForChild={handleOpenPrescriptionForChild}
            />
          )}

          {activeTab === 'messages' && (
            <DoctorMessagesView language={language} />
          )}

          {activeTab === 'reports' && (
            <DoctorReportsView language={language} />
          )}

          {activeTab === 'settings' && (
            <DoctorSettingsView language={language} />
          )}
        </main>
      </div>
    </div>
  );
};
