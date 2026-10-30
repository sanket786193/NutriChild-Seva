import React, { useState } from 'react';
import {
  Layers, Database, Wifi, Shield, ArrowRight,
  Server, Cpu, Smartphone, HeartPulse, CheckCircle2,
  FileSpreadsheet, Lock, Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ArchitectureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tiers' | 'offline' | 'who'>('tiers');

  return (
    <section id="clinical" className="py-20 sm:py-24 bg-[#fafafa] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 text-xs font-bold uppercase tracking-wider mb-4">
            <Layers size={14} className="text-emerald-600" />
            <span>Enterprise Healthcare Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight font-['Outfit']">
            From Remote Hamlets to District Command
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 mt-4 leading-relaxed font-normal">
            A resilient, modular healthcare continuum designed to operate under zero-connectivity constraints while maintaining centralized governance standards.
          </p>

          {/* Interactive Architecture View Switcher */}
          <div className="mt-8 inline-flex p-1.5 bg-white rounded-full border border-zinc-200 shadow-sm">
            <button
              onClick={() => setActiveTab('tiers')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                activeTab === 'tiers'
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              3-Tier Care Continuum
            </button>
            <button
              onClick={() => setActiveTab('offline')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                activeTab === 'offline'
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              Offline Sync Engine
            </button>
            <button
              onClick={() => setActiveTab('who')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                activeTab === 'who'
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              WHO Pediatric Logic
            </button>
          </div>
        </div>

        {/* Dynamic Architecture Big Boxes Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'tiers' && (
            <motion.div
              key="tiers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Tier 1 */}
              <div className="bg-white rounded-[2rem] p-8 lg:p-9 border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-zinc-950 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Tier 1 · Village Frontline
                    </span>
                    <Smartphone size={20} className="text-zinc-800" />
                  </div>
                  <h3 className="text-xl font-black text-zinc-950 mb-3">
                    ASHA &amp; Anganwadi Mobile Field Kit
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-6 font-normal">
                    Voice-assisted, offline PWA deployed on field workers’ smartphones. Logs weight, height, MUAC tape, and hemoglobin in local dialects.
                  </p>

                  <ul className="space-y-3 text-xs text-zinc-700 border-t border-zinc-100 pt-5">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span className="font-medium">Speech-to-text in 7 regional Indian languages</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span className="font-medium">Instant QR Card Generation &amp; Sub-second Scan</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span className="font-medium">Poshan 2.0 Take-Home Ration allotment</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-500">Target Users</span>
                  <span className="font-black text-zinc-950">120,000+ Field Staff</span>
                </div>
              </div>

              {/* Tier 2 */}
              <div className="bg-white rounded-[2rem] p-8 lg:p-9 border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-zinc-950 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                      Tier 2 · Primary Care
                    </span>
                    <HeartPulse size={20} className="text-zinc-800" />
                  </div>
                  <h3 className="text-xl font-black text-zinc-950 mb-3">
                    PHC &amp; NRC Clinical Inpatient Triage
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-6 font-normal">
                    Pediatrician &amp; Medical Officer workstation. Tracks Severe Acute Malnutrition (SAM) admissions, therapeutic milk (F-75/F-100), and RUTF courses.
                  </p>

                  <ul className="space-y-3 text-xs text-zinc-700 border-t border-zinc-100 pt-5">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-blue-600 shrink-0" />
                      <span className="font-medium">14-day NRC inpatient stabilization tracking</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-blue-600 shrink-0" />
                      <span className="font-medium">Pediatric e-prescription &amp; pharmacy sync</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-blue-600 shrink-0" />
                      <span className="font-medium">108 Ambulance automated dispatch coordinates</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-500">Target Facilities</span>
                  <span className="font-black text-zinc-950">PHCs, CHCs, &amp; NRCs</span>
                </div>
              </div>

              {/* Tier 3 */}
              <div className="bg-white rounded-[2rem] p-8 lg:p-9 border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-zinc-950 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">
                      Tier 3 · Governance
                    </span>
                    <Server size={20} className="text-zinc-800" />
                  </div>
                  <h3 className="text-xl font-black text-zinc-950 mb-3">
                    District CDPO &amp; State Heatmaps
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-6 font-normal">
                    Macro analytics for District Collectors and Child Development Project Officers (CDPO). Identifies village stunting clusters and vaccine coverage gaps.
                  </p>

                  <ul className="space-y-3 text-xs text-zinc-700 border-t border-zinc-100 pt-5">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-zinc-900 shrink-0" />
                      <span className="font-medium">Geospatial village malnutrition heatmaps</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-zinc-900 shrink-0" />
                      <span className="font-medium">Universal Immunization drop-out detection</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-zinc-900 shrink-0" />
                      <span className="font-medium">ABDM M1/M2/M3 compliance auditing</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-500">Target Administrators</span>
                  <span className="font-black text-zinc-950">CDPOs &amp; State Missions</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'offline' && (
            <motion.div
              key="offline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-bold">
                    <Database size={14} />
                    <span>Dexie.js IndexedDB Mesh Architecture</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                    Zero Data Loss Guarantee in Remote Tribal Zones
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                    Most rural villages in Rayagada have intermittent or zero cellular connectivity. NutriChild+ treats offline mode as the default operational state:
                  </p>

                  <div className="space-y-3.5 pt-2 text-xs">
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <strong className="text-zinc-950 text-sm font-bold block mb-1">1. Local Client-Side Commit:</strong>
                      <span className="text-zinc-600 font-medium">Every child registration, growth record, and vaccine dose is instantly persisted to browser IndexedDB with a unique cryptographic UUID token.</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <strong className="text-zinc-950 text-sm font-bold block mb-1">2. Resilient Background Queue:</strong>
                      <span className="text-zinc-600 font-medium">Changes are recorded in a pending sync transaction queue. No user action is blocked or delayed by network timeouts.</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <strong className="text-zinc-950 text-sm font-bold block mb-1">3. Automated Batch Reconciliation:</strong>
                      <span className="text-zinc-600 font-medium">When cellular signal is re-acquired, the service worker pushes idempotent sync packets with vector clock conflict resolution.</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#fafafa] rounded-3xl p-8 border border-zinc-200 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-500">
                      Offline Diagnostics Telemetry
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      Client Engine Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-zinc-200">
                      <span className="text-[11px] text-zinc-500 font-medium">Client Storage Engine</span>
                      <strong className="text-sm text-zinc-950 block mt-1">IndexedDB / Dexie v4</strong>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-zinc-200">
                      <span className="text-[11px] text-zinc-500 font-medium">Max Offline Capacity</span>
                      <strong className="text-sm text-zinc-950 block mt-1">10,000+ Child Records</strong>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-zinc-200">
                      <span className="text-[11px] text-zinc-500 font-medium">Sync Protocol</span>
                      <strong className="text-sm text-zinc-950 block mt-1">Idempotent Batch Mesh</strong>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-zinc-200">
                      <span className="text-[11px] text-zinc-500 font-medium">Encryption at Rest</span>
                      <strong className="text-sm text-zinc-950 block mt-1">AES-GCM WebCrypto</strong>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'who' && (
            <motion.div
              key="who"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-bold">
                  <Shield size={14} />
                  <span>WHO Multicentre Growth Reference Study</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                  WHO Anthro Growth Standard Equations
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  NutriChild+ implements the LMS (Lambda-Mu-Sigma) methodology to compute standardized Z-scores across all age and gender cohorts (0–60 months).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-400 block mb-2">
                      WAZ Index
                    </span>
                    <strong className="text-base text-zinc-950 block mb-2">Weight-for-Age Z-Score</strong>
                    <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                      Identifies acute underweight lag. Children below -3 SD qualify for intensive supplementary nutrition.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-400 block mb-2">
                      HAZ Index
                    </span>
                    <strong className="text-base text-zinc-950 block mb-2">Height-for-Age Z-Score</strong>
                    <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                      Detects irreversible stunting and linear skeletal growth deficits resulting from prolonged chronic undernutrition.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-400 block mb-2">
                      WHZ Index
                    </span>
                    <strong className="text-base text-zinc-950 block mb-2">Weight-for-Height Z-Score</strong>
                    <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                      Gold-standard clinical measure for acute wasting. Scores below -3 SD trigger mandatory NRC triage admission.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
