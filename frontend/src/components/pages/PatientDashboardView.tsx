import React from 'react';
import {
  User, QrCode, Calendar, Heart, Activity,
  Syringe, Apple, AlertTriangle, CheckCircle2,
  PhoneCall, Mic, Clock, ArrowRight, ShieldCheck,
  ChevronRight, Sparkles, Scale, HeartPulse
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { Child } from '../../types';

interface PatientDashboardViewProps {
  onNavigate: (page: string) => void;
  onOpenQRModal: (child: Child) => void;
  onOpenGrowthModal: (child: Child) => void;
  onOpenVaccinesModal: (child: Child) => void;
  onOpenNutritionModal: (child: Child) => void;
  onOpenVoiceAssistant: () => void;
  onEmergencySos: () => void;
  patientChild: Child;
}

export const PatientDashboardView: React.FC<PatientDashboardViewProps> = ({
  onNavigate,
  onOpenQRModal,
  onOpenGrowthModal,
  onOpenVaccinesModal,
  onOpenNutritionModal,
  onOpenVoiceAssistant,
  onEmergencySos,
  patientChild,
}) => {
  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Member Welcome Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold border border-teal-200/70 dark:border-teal-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Family Health Passport · Ayushman Bharat Digital Mission (ABDM) Linked</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Welcome, Sunita Devi
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Tracking clinical health progression for <strong className="text-slate-900 dark:text-white font-bold">{patientChild.fullName}</strong> ({patientChild.uhid}) · {patientChild.village}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onOpenQRModal(patientChild)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-xs cursor-pointer"
              >
                <QrCode size={15} className="text-teal-600" />
                <span>Digital QR ABHA Card</span>
              </button>

              <button
                onClick={onOpenVoiceAssistant}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Mic size={15} />
                <span>Ask Voice Assistant</span>
              </button>

              <button
                onClick={onEmergencySos}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                <PhoneCall size={14} className="animate-pulse" />
                <span>108 SOS</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Key Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Growth & Vitals */}
          <div className="lg:col-span-8 space-y-6">
            {/* Child Vitals & Health Indicator Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    CLINICAL TELEMETRY
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {patientChild.fullName}’s Current Growth Metrics
                  </h3>
                </div>

                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>🟢 Normal Healthy Growth</span>
                </span>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-center">
                  <span className="text-xs text-slate-500 block mb-1">Body Weight</span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {patientChild.latestWeightKg} kg
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                    On WHO Median
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-center">
                  <span className="text-xs text-slate-500 block mb-1">Length / Height</span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {patientChild.latestHeightCm} cm
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                    Age-appropriate
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-center">
                  <span className="text-xs text-slate-500 block mb-1">MUAC Arm Tape</span>
                  <span className="text-2xl font-extrabold text-emerald-600">
                    {patientChild.latestMuacCm} cm
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                    &ge; 12.5 cm (Healthy)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500">
                  Last verified by ASHA Kamla Bai · Kalyanpur Sector
                </span>
                <button
                  onClick={() => onOpenGrowthModal(patientChild)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  <Scale size={14} />
                  <span>View Detailed WHO Growth Curve</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Universal Immunization Schedule Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    NATIONAL IMMUNIZATION TIMELINE
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Universal Immunization Status (U-WIN Verified)
                  </h3>
                </div>

                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                  All Due Doses Completed ✓
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        Pentavalent-3 &amp; Rotavirus-3
                      </h4>
                      <p className="text-[11px] text-slate-500">Administered at 14 weeks · Batch #PV-8402</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    Completed
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-slate-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        MR-1 (Measles &amp; Rubella) + Vitamin A (1st Dose)
                      </h4>
                      <p className="text-[11px] text-slate-500">Target Age: 9–12 months · Due: November 15, 2026</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Scheduled
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex justify-end">
                <button
                  onClick={() => onOpenVaccinesModal(patientChild)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  <Syringe size={14} />
                  <span>Inspect UIP Vaccine Dossier</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Appointments & Nutrition Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Upcoming Consultations Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Next Clinical Appointment
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
                  Confirmed
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-slate-600 dark:text-slate-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Monday, Nov 2, 2026 at 10:30 AM
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Virtual Tele-Consultation with <strong>Dr. Rajesh Patra</strong> (Pediatrics)
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('appointments')}
                    className="w-full py-2 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition"
                  >
                    View Appointment Details
                  </button>
                </div>
              </div>

              <button
                onClick={() => onNavigate('appointments')}
                className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition cursor-pointer"
              >
                Book New Consultation
              </button>
            </div>

            {/* Take-Home Ration & Nutrition Guidance */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Take-Home Ration &amp; Diet Plan
                </h3>
                <Apple size={16} className="text-teal-600" />
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Bi-weekly micronutrient fortified blended flour allocation from Kalyanpur AWC-1.
              </p>

              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-teal-600 shrink-0" />
                  <span>Ragi Ganji (Finger Millet Porridge)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-teal-600 shrink-0" />
                  <span>Moong Dal Khichdi with drumstick leaves</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-teal-600 shrink-0" />
                  <span>Weekly IFA Syrup (1ml)</span>
                </div>
              </div>

              <button
                onClick={() => onOpenNutritionModal(patientChild)}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-200 transition cursor-pointer"
              >
                Inspect Tailored Meal Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
