import React, { useState } from 'react';
import {
  Activity, ShieldAlert, CheckCircle2, AlertTriangle,
  Wifi, Sparkles, TrendingUp, Heart, ArrowUpRight,
  QrCode, Syringe, Scale, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { Child } from '../../types';

interface LiveTelemetryPanelProps {
  childrenList: Child[];
  onOpenGrowthModal: (child: Child) => void;
  onOpenVaccinesModal: (child: Child) => void;
  onOpenQRModal: (child: Child) => void;
  onOpenPlateScanner: () => void;
}

export const LiveTelemetryPanel: React.FC<LiveTelemetryPanelProps> = ({
  childrenList,
  onOpenGrowthModal,
  onOpenVaccinesModal,
  onOpenQRModal,
  onOpenPlateScanner,
}) => {
  const [selectedChildIndex, setSelectedChildIndex] = useState(1); // Priyanka Soren (SAM) default
  const [activeMetricTab, setActiveMetricTab] = useState<'waz' | 'haz' | 'muac'>('waz');

  const displayChildren = childrenList.slice(0, 3);
  const activeChild = displayChildren[selectedChildIndex] || displayChildren[0];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Ambient background glow effects */}
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-emerald-500/10 to-blue-500/20 rounded-3xl blur-2xl -z-10 opacity-70" />

      {/* Main Glassmorphic Dashboard Panel Container */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Top Control Bar */}
        <div className="px-4 py-3 bg-slate-50/90 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-slate-300 dark:text-slate-600 font-light">|</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <Activity size={13} className="text-teal-600 dark:text-teal-400" />
              <span>Rayagada Health Node · 19.168°N, 83.415°E</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sync Online
            </span>
            <span className="text-slate-400 font-mono text-[10px]">22ms</span>
          </div>
        </div>

        {/* Live Metrics Header Ribbon */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                Live Cohort Telemetry
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Nutritional Triage &amp; Risk Matrix
              </h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Updated 2m ago
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block truncate">
                Active Cohort
              </span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                1,284
              </span>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold block">
                +18 this wk
              </span>
            </div>

            <div className="bg-emerald-50/50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-800/40">
              <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-300 block truncate">
                Normal (Green)
              </span>
              <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-300">
                964
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                75.1%
              </span>
            </div>

            <div className="bg-amber-50/50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-100 dark:border-amber-800/40">
              <span className="text-[10px] font-medium text-amber-700 dark:text-amber-300 block truncate">
                MAM (Orange)
              </span>
              <span className="text-base font-extrabold text-amber-700 dark:text-amber-300">
                281
              </span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block">
                Take-Home Rtn
              </span>
            </div>

            <div className="bg-rose-50/50 dark:bg-rose-950/30 p-2.5 rounded-xl border border-rose-100 dark:border-rose-800/40">
              <span className="text-[10px] font-medium text-rose-700 dark:text-rose-300 block truncate">
                SAM (Critical)
              </span>
              <span className="text-base font-extrabold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                39
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping inline-block" />
              </span>
              <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold block">
                NRC Referrals
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic WHO Growth Standard Visualization (Interactive SVG Curves) */}
        <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-50/40 to-white dark:from-slate-900/60 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                WHO Anthropometry Curve
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                {activeMetricTab.toUpperCase()} Standards
              </span>
            </div>

            <div className="flex gap-1">
              {(['waz', 'haz', 'muac'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveMetricTab(tab)}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition ${
                    activeMetricTab === tab
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab === 'waz' ? 'Weight' : tab === 'haz' ? 'Height' : 'MUAC'}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Growth Curve Area with WHO percentiles */}
          <div className="relative h-44 w-full bg-white dark:bg-slate-950/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3 flex flex-col justify-between overflow-hidden">
            <svg
              viewBox="0 0 460 140"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="healthyBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="criticalBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="35" x2="460" y2="35" stroke="#94A3B8" strokeOpacity="0.15" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="460" y2="70" stroke="#94A3B8" strokeOpacity="0.15" strokeDasharray="3 3" />
              <line x1="0" y1="105" x2="460" y2="105" stroke="#94A3B8" strokeOpacity="0.15" strokeDasharray="3 3" />

              {/* WHO Median Standard Curve (Green line) */}
              <path
                d="M 10 115 Q 120 75, 230 45 T 450 18"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* -2SD Moderate Curve (Amber line) */}
              <path
                d="M 10 125 Q 120 95, 230 72 T 450 48"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.8"
                strokeDasharray="4 3"
                strokeLinecap="round"
              />

              {/* -3SD Severe Acute Malnutrition Cutoff (Red line) */}
              <path
                d="M 10 135 Q 120 112, 230 96 T 450 78"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="3 3"
                strokeLinecap="round"
              />

              {/* Child 1 Data Point: Aarav (Healthy - on median) */}
              <circle cx="280" cy="38" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer" />
              <text x="288" y="36" fill="#10B981" fontSize="9" fontWeight="bold">Aarav (Green)</text>

              {/* Child 2 Data Point: Priyanka (SAM - below -3SD) */}
              <circle cx="210" cy="118" r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" className="animate-ping" opacity="0.4" />
              <circle cx="210" cy="118" r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer" />
              <text x="222" y="122" fill="#EF4444" fontSize="9" fontWeight="bold">Priyanka (SAM -3.4 SD)</text>

              {/* Child 3 Data Point: Manav (MAM - between -2 and -3) */}
              <circle cx="370" cy="62" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer" />
              <text x="378" y="60" fill="#F59E0B" fontSize="9" fontWeight="bold">Manav (MAM)</text>
            </svg>

            {/* Bottom Curve Labels */}
            <div className="flex items-center justify-between text-[9.5px] font-semibold text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-0.5 bg-emerald-500 inline-block" /> WHO Median (Normal)
              </span>
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <span className="w-2 h-0.5 bg-amber-500 inline-block" /> -2 SD (MAM Underweight)
              </span>
              <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                <span className="w-2 h-0.5 bg-rose-500 inline-block" /> -3 SD (Critical SAM)
              </span>
            </div>
          </div>
        </div>

        {/* Live Patient Triage Feed / Quick Action List */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Priority Patient Inspection
            </span>
            <span className="text-[11px] text-slate-500">
              Click patient to examine
            </span>
          </div>

          <div className="space-y-2">
            {displayChildren.map((child, index) => {
              const isSelected = index === selectedChildIndex;
              const isSam = child.latestRiskCategory === 'RED';
              const isMam = child.latestRiskCategory === 'ORANGE';

              return (
                <div
                  key={child.uhid}
                  onClick={() => setSelectedChildIndex(index)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/60 dark:bg-teal-950/40 border-teal-500/50 shadow-xs'
                      : 'bg-white dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isSam
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            : isMam
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {child.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {child.fullName}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {child.uhid}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {child.village} · MUAC: {child.latestMuacCm ?? 12.0}cm · Wt: {child.latestWeightKg}kg
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isSam
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-200'
                            : isMam
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-200'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200'
                        }`}
                      >
                        {isSam ? '🔴 SAM Alert' : isMam ? '🟠 MAM Care' : '🟢 Healthy'}
                      </span>

                      {isSelected && (
                        <div className="flex items-center gap-1 ml-1">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              onOpenGrowthModal(child);
                            }}
                            className="p-1 rounded-md bg-teal-700 text-white hover:bg-teal-800 transition shadow-2xs"
                            title="Growth Assessment"
                          >
                            <Scale size={11} />
                          </button>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              onOpenVaccinesModal(child);
                            }}
                            className="p-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow-2xs"
                            title="Vaccines Schedule"
                          >
                            <Syringe size={11} />
                          </button>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              onOpenQRModal(child);
                            }}
                            className="p-1 rounded-md bg-slate-800 text-white hover:bg-slate-900 transition shadow-2xs"
                            title="Digital QR Card"
                          >
                            <QrCode size={11} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Quick Feature Bar at Bottom */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={onOpenPlateScanner}
            className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-400 font-medium transition cursor-pointer"
          >
            <Zap size={13} className="text-amber-500" />
            <span>AI Food Plate Scanner</span>
          </button>
          <span className="text-slate-400 text-[11px]">
            Dexie.js Offline Cache · 0 Pending Syncs
          </span>
        </div>
      </div>
    </div>
  );
};

