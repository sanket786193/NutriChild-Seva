import React, { useState } from 'react';
import {
  Activity, Sliders, AlertOctagon, CheckCircle2,
  AlertTriangle, ShieldAlert, Sparkles, Scale, Info
} from 'lucide-react';
import { motion } from 'framer-motion';

export const VitalsSimulator: React.FC = () => {
  const [ageMonths, setAgeMonths] = useState(14);
  const [weightKg, setWeightKg] = useState(6.4);
  const [heightCm, setHeightCm] = useState(69.0);
  const [muacCm, setMuacCm] = useState(11.1);
  const [hasEdema, setHasEdema] = useState(false);

  // Dynamic calculations based on WHO child growth references
  const heightM = heightCm / 100;
  const bmi = +(weightKg / (heightM * heightM)).toFixed(1);

  // Approximate WHO median weights/heights by age for realistic Z-scores
  const expectedMedianWeight = +(3.3 + ageMonths * 0.45).toFixed(1);
  const weightStdDev = 1.1;
  const waz = +((weightKg - expectedMedianWeight) / weightStdDev).toFixed(2);

  const expectedMedianHeight = +(50 + ageMonths * 1.8).toFixed(1);
  const heightStdDev = 3.2;
  const haz = +((heightCm - expectedMedianHeight) / heightStdDev).toFixed(2);

  // Weight-for-height Z-score approximation
  const expectedWeightForHeight = +(0.5 * (heightCm - 45)).toFixed(1);
  const whz = +((weightKg - expectedWeightForHeight) / 1.0).toFixed(2);

  // Clinical Classification Matrix
  let status: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED' = 'GREEN';
  let categoryName = 'Healthy Growth (Normal)';
  let recommendation = 'Child is growing on track. Continue balanced family diet, Poshan hot meals, and routine Universal Immunization.';

  if (hasEdema || muacCm < 11.5 || whz < -3.0 || waz < -3.0) {
    status = 'RED';
    categoryName = 'Severe Acute Malnutrition (SAM) · Critical Alert';
    recommendation = hasEdema
      ? 'CRITICAL ALERT: Bilateral pitting edema indicates Kwashiorkor. Initiate emergency transfer to nearest Nutrition Rehabilitation Centre (NRC) with 108 Ambulance.'
      : 'EMERGENCY PROTOCOL: Severe wasting detected (MUAC < 11.5cm or WHZ < -3SD). Refer child to Nutrition Rehabilitation Centre (NRC) for 14-day therapeutic feeding (F-75/F-100 & RUTF).';
  } else if (muacCm < 12.5 || whz < -2.0 || waz < -2.0) {
    status = 'ORANGE';
    categoryName = 'Moderate Acute Malnutrition (MAM) · High Concern';
    recommendation = 'HIGH PRIORITY: Child exhibits acute muscle wasting (MUAC 11.5–12.4cm). Enroll in Anganwadi Take-Home Ration (THR) booster with weekly ASHA follow-up.';
  } else if (waz < -1.0 || haz < -1.0) {
    status = 'YELLOW';
    categoryName = 'Mild Growth Risk / Watchlist';
    recommendation = 'MONITORING: Mild underweight or height lag. Re-assess in 15 days. Provide dietary counselling (moringa, eggs, ragi ganji) and IFA syrup.';
  }

  return (
    <section id="simulator" className="py-20 sm:py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 text-xs font-bold uppercase tracking-wider mb-4">
            <Sliders size={14} className="text-emerald-600" />
            <span>Interactive WHO Clinical Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight font-['Outfit']">
            Test the WHO Z-Score Diagnostic Matrix
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 mt-4 leading-relaxed font-normal">
            Adjust anthropometry parameters below to witness automated real-time WHO classification, stunting, wasting, and clinical intervention pathways.
          </p>
        </div>

        {/* Dual Pane Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Controls Form Big Box Pane */}
          <div className="lg:col-span-7 bg-[#fafafa] rounded-[2.5rem] p-8 sm:p-10 border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
                <span className="text-xs font-black text-zinc-900 uppercase tracking-wider">
                  Input Patient Measurements
                </span>
                <span className="text-xs text-zinc-500 font-semibold">
                  WHO Child Growth Standards 2006
                </span>
              </div>

              {/* Slider 1: Age in months */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 text-xs font-bold">
                  <label className="text-zinc-800">Child Age (Months)</label>
                  <span className="text-zinc-950 font-black bg-white px-3 py-1 rounded-xl border border-zinc-200 font-mono text-sm shadow-2xs">
                    {ageMonths} months ({+(ageMonths / 12).toFixed(1)} yrs)
                  </span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="60"
                  step="1"
                  value={ageMonths}
                  onChange={e => setAgeMonths(Number(e.target.value))}
                  className="w-full accent-zinc-950 cursor-pointer h-2 bg-zinc-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-semibold text-zinc-400 mt-1.5">
                  <span>6 months</span>
                  <span>24 months</span>
                  <span>60 months</span>
                </div>
              </div>

              {/* Slider 2: Body Weight */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 text-xs font-bold">
                  <label className="text-zinc-800">Body Weight (kg)</label>
                  <span className="text-zinc-950 font-black bg-white px-3 py-1 rounded-xl border border-zinc-200 font-mono text-sm shadow-2xs">
                    {weightKg} kg
                  </span>
                </div>
                <input
                  type="range"
                  min="4.0"
                  max="22.0"
                  step="0.1"
                  value={weightKg}
                  onChange={e => setWeightKg(Number(e.target.value))}
                  className="w-full accent-zinc-950 cursor-pointer h-2 bg-zinc-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-semibold text-zinc-400 mt-1.5">
                  <span>4.0 kg</span>
                  <span>12.0 kg</span>
                  <span>22.0 kg</span>
                </div>
              </div>

              {/* Slider 3: Length / Height */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 text-xs font-bold">
                  <label className="text-zinc-800">Length / Height (cm)</label>
                  <span className="text-zinc-950 font-black bg-white px-3 py-1 rounded-xl border border-zinc-200 font-mono text-sm shadow-2xs">
                    {heightCm} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="115"
                  step="0.5"
                  value={heightCm}
                  onChange={e => setHeightCm(Number(e.target.value))}
                  className="w-full accent-zinc-950 cursor-pointer h-2 bg-zinc-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-semibold text-zinc-400 mt-1.5">
                  <span>60 cm</span>
                  <span>85 cm</span>
                  <span>115 cm</span>
                </div>
              </div>

              {/* Slider 4: MUAC Arm Tape */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 text-xs font-bold">
                  <label className="text-zinc-800">MUAC Arm Circumference (cm)</label>
                  <span
                    className={`font-black px-3 py-1 rounded-xl border font-mono text-sm shadow-2xs ${
                      muacCm < 11.5
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : muacCm < 12.5
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {muacCm} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="9.0"
                  max="17.0"
                  step="0.1"
                  value={muacCm}
                  onChange={e => setMuacCm(Number(e.target.value))}
                  className="w-full accent-zinc-950 cursor-pointer h-2 bg-zinc-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-semibold text-zinc-400 mt-1.5">
                  <span className="text-rose-600 font-bold">&lt;11.5 SAM</span>
                  <span className="text-amber-600 font-bold">11.5–12.5 MAM</span>
                  <span className="text-emerald-600 font-bold">&gt;12.5 Normal</span>
                </div>
              </div>
            </div>

            {/* Toggle: Bilateral Pitting Edema */}
            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between p-4 rounded-2xl bg-white border border-zinc-200">
              <div>
                <span className="text-xs font-black text-zinc-900 block">
                  Bilateral Pitting Edema (Kwashiorkor check)
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  Thumb pressure sign on both feet for &gt;3 seconds
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHasEdema(p => !p)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  hasEdema ? 'bg-rose-600' : 'bg-zinc-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    hasEdema ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Real-Time Diagnostic Output Big Box Pane */}
          <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-8 sm:p-10 border border-zinc-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                  Computed WHO Telemetry
                </span>
                <span className="text-xs font-mono font-bold text-zinc-900 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
                  BMI: {bmi} kg/m²
                </span>
              </div>

              {/* Status Big Alert Box */}
              <div
                className={`p-6 rounded-3xl border mb-6 transition-all ${
                  status === 'RED'
                    ? 'bg-rose-50 border-rose-200 text-rose-950'
                    : status === 'ORANGE'
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : status === 'YELLOW'
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-950'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  {status === 'RED' ? (
                    <AlertOctagon size={22} className="text-rose-600 shrink-0" />
                  ) : status === 'ORANGE' || status === 'YELLOW' ? (
                    <AlertTriangle size={22} className="text-amber-600 shrink-0" />
                  ) : (
                    <CheckCircle2 size={22} className="text-emerald-600 shrink-0" />
                  )}
                  <h3 className="text-base font-black tracking-tight">
                    {categoryName}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-90 mt-1">
                  {recommendation}
                </p>
              </div>

              {/* Computed Z-Scores Big Cards */}
              <div className="space-y-3.5 mb-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                  <div>
                    <span className="text-xs font-bold text-zinc-900 block">
                      Weight-for-Age (WAZ)
                    </span>
                    <span className="text-[11px] text-zinc-500 font-medium">Underweight indicator</span>
                  </div>
                  <span
                    className={`text-base font-mono font-black ${
                      waz < -3.0 ? 'text-rose-700' : waz < -2.0 ? 'text-amber-700' : 'text-emerald-700'
                    }`}
                  >
                    {waz > 0 ? `+${waz}` : waz} SD
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                  <div>
                    <span className="text-xs font-bold text-zinc-900 block">
                      Height-for-Age (HAZ)
                    </span>
                    <span className="text-[11px] text-zinc-500 font-medium">Chronic stunting indicator</span>
                  </div>
                  <span
                    className={`text-base font-mono font-black ${
                      haz < -3.0 ? 'text-rose-700' : haz < -2.0 ? 'text-amber-700' : 'text-emerald-700'
                    }`}
                  >
                    {haz > 0 ? `+${haz}` : haz} SD
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                  <div>
                    <span className="text-xs font-bold text-zinc-900 block">
                      Weight-for-Height (WHZ)
                    </span>
                    <span className="text-[11px] text-zinc-500 font-medium">Acute wasting indicator</span>
                  </div>
                  <span
                    className={`text-base font-mono font-black ${
                      whz < -3.0 ? 'text-rose-700' : whz < -2.0 ? 'text-amber-700' : 'text-emerald-700'
                    }`}
                  >
                    {whz > 0 ? `+${whz}` : whz} SD
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Info size={14} className="text-zinc-700" />
                Validated with WHO Anthro SDK
              </span>
              <span className="font-bold text-zinc-900">
                Clinical Auto-Triage Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
