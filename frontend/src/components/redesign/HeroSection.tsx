import React from 'react';
import {
  ArrowRight, ShieldCheck, Sparkles, Activity,
  Mic, PlayCircle, Layers, CheckCircle2, HeartHandshake,
  FileCheck, Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LiveTelemetryPanel } from './LiveTelemetryPanel';
import type { Child } from '../../types';

interface HeroSectionProps {
  childrenList: Child[];
  onOpenGrowthModal: (child: Child) => void;
  onOpenVaccinesModal: (child: Child) => void;
  onOpenQRModal: (child: Child) => void;
  onOpenPlateScanner: () => void;
  onOpenVoiceAssistant: () => void;
  onOpenRegisterModal: () => void;
  onExploreConsole: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  childrenList,
  onOpenGrowthModal,
  onOpenVaccinesModal,
  onOpenQRModal,
  onOpenPlateScanner,
  onOpenVoiceAssistant,
  onOpenRegisterModal,
  onExploreConsole,
}) => {
  return (
    <section id="overview" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute top-12 left-10 w-96 h-96 bg-teal-200/30 dark:bg-teal-900/15 rounded-full blur-3xl" />
        <div className="absolute top-24 right-10 w-96 h-96 bg-blue-200/25 dark:bg-blue-900/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── Left Column: Headline, Description & Action Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Live Program Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200/80 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              <span>National Health Mission · Poshan Abhiyaan 2.0 Integration</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12] font-['Plus_Jakarta_Sans',sans-serif]">
              Next-Generation{' '}
              <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Child Nutrition &amp; Telemetry
              </span>{' '}
              for Rural Healthcare.
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
              Equipping <strong className="text-slate-900 dark:text-white">120,000+ frontline Anganwadi and ASHA workers</strong> with automated WHO Z-Score growth analytics, offline-resilient sync, vernacular voice diagnosis, and critical SAM inpatient triage.
            </p>

            {/* CTA Button Cluster */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreConsole}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 shadow-md shadow-teal-700/25 hover:shadow-lg hover:shadow-teal-700/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Activity size={17} />
                <span>Explore Live Clinical Console</span>
                <ArrowRight size={15} />
              </button>

              <a
                href="#consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                <span>Request District Pilot</span>
              </a>

              <button
                onClick={onOpenVoiceAssistant}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-xs text-teal-700 dark:text-teal-300 bg-teal-50/80 dark:bg-teal-950/50 hover:bg-teal-100/80 border border-teal-200 dark:border-teal-800 transition cursor-pointer"
              >
                <Mic size={15} className="text-teal-600 dark:text-teal-400" />
                <span>Voice AI Demo</span>
              </button>
            </div>

            {/* Trust Micro-Pills */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>WHO Child Standards (±0.01 SD)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Dexie.js Offline Multi-Sync</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>7 Indian Vernacular Dialects</span>
              </span>
            </div>
          </motion.div>

          {/* ── Right Column: Strong Visual Healthcare Panel ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <LiveTelemetryPanel
              childrenList={childrenList}
              onOpenGrowthModal={onOpenGrowthModal}
              onOpenVaccinesModal={onOpenVaccinesModal}
              onOpenQRModal={onOpenQRModal}
              onOpenPlateScanner={onOpenPlateScanner}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

