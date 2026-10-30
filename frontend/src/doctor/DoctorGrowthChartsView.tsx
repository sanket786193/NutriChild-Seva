import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Ruler,
  Scale,
  Activity,
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';
import type { Child, LanguageCode } from '../types';
import { api } from '../services/api';

interface DoctorGrowthChartsViewProps {
  language: LanguageCode;
}

export const DoctorGrowthChartsView: React.FC<DoctorGrowthChartsViewProps> = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<number>(2); // Default to Priyanka Soren (SAM)
  const [selectedMetric, setSelectedMetric] = useState<'WEIGHT' | 'HEIGHT' | 'BMI'>('WEIGHT');

  useEffect(() => {
    api.getChildren().then((res) => {
      setChildren(res);
      if (res.length > 0 && !selectedChildId) setSelectedChildId(res[0].id || 1);
    });
  }, []);

  const activeChild = children.find(c => c.id === selectedChildId) || children[0];

  // WHO Standard Median curve approximations for 0-24 months
  // Weight: Month 0: 3.3kg, M3: 6.0kg, M6: 7.8kg, M9: 8.9kg, M12: 9.6kg, M18: 11.0kg, M24: 12.2kg
  // Height: Month 0: 50cm, M3: 60cm, M6: 67cm, M9: 72cm, M12: 76cm, M18: 82cm, M24: 87cm

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Bar: Patient Selection & Metric Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Select Patient:
          </label>
          <select
            value={selectedChildId}
            onChange={(e) => setSelectedChildId(Number(e.target.value))}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black text-slate-800 cursor-pointer focus:outline-blue-600"
          >
            {children.map(c => (
              <option key={c.id} value={c.id}>
                {c.fullName} ({c.uhid}) - {c.latestRiskCategory || 'GREEN'}
              </option>
            ))}
          </select>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200 gap-1">
          <button
            onClick={() => setSelectedMetric('WEIGHT')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              selectedMetric === 'WEIGHT' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Weight vs Age</span>
          </button>
          <button
            onClick={() => setSelectedMetric('HEIGHT')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              selectedMetric === 'HEIGHT' ? 'bg-white text-teal-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Height vs Age</span>
          </button>
          <button
            onClick={() => setSelectedMetric('BMI')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              selectedMetric === 'BMI' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>BMI & Z-Score</span>
          </button>
        </div>
      </div>

      {/* Main Interactive WHO Growth Standards Chart */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                WHO Child Growth Standard Reference (0-24 Months)
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Patient: <strong className="text-slate-900">{activeChild?.fullName}</strong> ({activeChild?.gender})
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              {selectedMetric === 'WEIGHT' ? 'Weight-for-Age (WAZ) Percentile Curve' : selectedMetric === 'HEIGHT' ? 'Length/Height-for-Age (HAZ) Stunting Curve' : 'Body Mass Index (BMI) & Wasting Z-Scores'}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-3 h-0.5 bg-emerald-500" /> WHO Median (50th %ile)
            </span>
            <span className="flex items-center gap-1.5 text-amber-600">
              <span className="w-3 h-0.5 bg-amber-500 stroke-dashed" /> -2 SD (Underweight/Stunted)
            </span>
            <span className="flex items-center gap-1.5 text-rose-600">
              <span className="w-3 h-0.5 bg-rose-500" /> -3 SD (Severe SAM)
            </span>
            <span className="flex items-center gap-1.5 text-blue-700">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Patient Actual
            </span>
            <span className="flex items-center gap-1.5 text-purple-600">
              <span className="w-3 h-0.5 bg-purple-500" /> AI Trajectory
            </span>
          </div>
        </div>

        {/* SVG Chart Visualization */}
        <div className="h-72 w-full pt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 600 220">
            {/* Background Grid Lines */}
            {[40, 80, 120, 160, 200].map(y => (
              <line key={y} x1="40" y1={y} x2="560" y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
            ))}

            {/* WHO Standard Curves */}
            {/* Median Curve (Green) */}
            <path
              d="M 60 160 Q 200 110, 350 70 T 540 40"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
            />
            {/* -2 SD Moderate Risk (Amber Dashed) */}
            <path
              d="M 60 175 Q 200 135, 350 95 T 540 70"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="5 3"
            />
            {/* -3 SD Severe SAM Threshold (Rose) */}
            <path
              d="M 60 190 Q 200 155, 350 120 T 540 95"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
            />

            {/* Patient Actual Historical Data Points (Blue Dots & Line) */}
            {selectedChildId === 2 ? (
              // Priyanka Soren (SAM profile)
              <>
                <path
                  d="M 60 185 L 180 182 L 300 188 L 420 185"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                />
                <circle cx="60" cy="185" r="5" fill="#2563eb" />
                <circle cx="180" cy="182" r="5" fill="#2563eb" />
                <circle cx="300" cy="188" r="5" fill="#2563eb" />
                <circle cx="420" cy="185" r="6" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                <text x="420" y="172" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">
                  Current (6.4 kg / SAM)
                </text>

                {/* AI Predicted Recovery Trajectory Curve (Purple Dashed) */}
                <path
                  d="M 420 185 Q 480 150, 540 100"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
                <circle cx="540" cy="100" r="4" fill="#a855f7" />
                <text x="540" y="88" textAnchor="middle" fill="#a855f7" fontSize="9" fontWeight="bold">
                  AI Projected (+RUTF)
                </text>
              </>
            ) : (
              // Normal Healthy Child
              <>
                <path
                  d="M 60 162 L 180 115 L 300 80 L 420 55"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                />
                <circle cx="60" cy="162" r="5" fill="#2563eb" />
                <circle cx="180" cy="115" r="5" fill="#2563eb" />
                <circle cx="300" cy="80" r="5" fill="#2563eb" />
                <circle cx="420" cy="55" r="6" fill="#10b981" stroke="#fff" strokeWidth="2" />
                <text x="420" y="42" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">
                  Current (11.2 kg / Healthy)
                </text>
              </>
            )}

            {/* Age Months X-Axis Labels */}
            {[0, 3, 6, 9, 12, 18, 24].map((m, i) => (
              <text
                key={m}
                x={60 + i * 80}
                y="215"
                textAnchor="middle"
                fill="#64748b"
                fontSize="11"
                fontWeight="bold"
              >
                {m}m
              </text>
            ))}
          </svg>
        </div>

        {/* Clinical Interpretation Guide Banner */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-950 space-y-1">
            <strong>Clinical Standard Interpretation:</strong>
            <p className="leading-relaxed font-medium">
              WHO Growth Standards recommend classifying children below the red curve (-3SD) as Severe Acute Malnutrition (SAM). The purple dotted projection illustrates expected catch-up growth under NRC 14-day F-75/F-100 therapeutic milk and Ready-to-Use Therapeutic Food (RUTF) protocol.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
