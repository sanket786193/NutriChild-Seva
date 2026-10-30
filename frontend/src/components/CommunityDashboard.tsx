import React, { useState, useEffect } from 'react';
import {
  Users, Activity, AlertTriangle, ShieldCheck,
  Building, Volume2, TrendingDown, PieChart,
  BarChart3, CheckCircle2, ArrowRight
} from 'lucide-react';
import type { LanguageCode } from '../types';
import { SpeechEngine } from '../services/speech';

interface CommunityDashboardProps {
  language: LanguageCode;
}

export const CommunityDashboard: React.FC<CommunityDashboardProps> = ({ language }) => {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetch('/api/v1/analytics/dashboard')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) setAnalytics(data);
        else {
          setAnalytics({
            totalChildrenRegistered: 48,
            riskBreakdown: {
              redCriticalSam: 3,
              orangeHighRiskMam: 7,
              yellowModerateRisk: 12,
              greenHealthy: 26
            },
            indicators: {
              stuntingRatePercent: 29.2,
              wastingRatePercent: 14.5,
              anemiaRatePercent: 41.6,
              vaccinationCoveragePercent: 88.5
            },
            villageHeatmap: {
              'Kalyanpur': { total: 22, sam: 2, mam: 4, healthy: 16 },
              'Gunduriguda': { total: 15, sam: 1, mam: 2, healthy: 12 },
              'Singapur': { total: 11, sam: 0, mam: 1, healthy: 10 }
            }
          });
        }
      })
      .catch(() => {
        setAnalytics({
          totalChildrenRegistered: 48,
          riskBreakdown: { redCriticalSam: 3, orangeHighRiskMam: 7, yellowModerateRisk: 12, greenHealthy: 26 },
          indicators: { stuntingRatePercent: 29.2, wastingRatePercent: 14.5, anemiaRatePercent: 41.6, vaccinationCoveragePercent: 88.5 },
          villageHeatmap: {
            'Kalyanpur': { total: 22, sam: 2, mam: 4, healthy: 16 },
            'Gunduriguda': { total: 15, sam: 1, mam: 2, healthy: 12 },
            'Singapur': { total: 11, sam: 0, mam: 1, healthy: 10 }
          }
        });
      });
  }, []);

  const handleSpeakDashboard = () => {
    if (!analytics) return;
    const text = `Community Child Health Analytics. Total enrolled children: ${analytics.totalChildrenRegistered}. Severe Acute Malnutrition cases: ${analytics.riskBreakdown.redCriticalSam}. Universal Immunization Coverage: ${analytics.indicators.vaccinationCoveragePercent} percent.`;
    SpeechEngine.speak(text, 'en');
  };

  if (!analytics) return null;

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Banner with Officer Context */}
      <div className="bg-[#0B1528] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-3xl bg-zinc-800 text-white flex items-center justify-center font-black shrink-0">
            <Building size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              DISTRICT HEALTH MONITORING · RAYAGADA DIVISION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Community Pediatric Health &amp; Nutrition Console
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Field surveillance reporting for Child Development Project Officers (CDPO) &amp; Medical Officers
            </p>
          </div>
        </div>

        <button
          onClick={handleSpeakDashboard}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-100 transition shadow-md cursor-pointer shrink-0"
        >
          <Volume2 size={16} />
          <span>Listen to Summary Report</span>
        </button>
      </div>

      {/* Traffic Light Breakdown Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Children */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase mb-2">
            <span>Enrolled Children</span>
            <Users size={18} className="text-zinc-950 dark:text-white" />
          </div>
          <p className="text-4xl font-black text-zinc-950 dark:text-white">{analytics.totalChildrenRegistered}</p>
          <span className="text-xs font-semibold text-zinc-500 mt-2 block">Across 3 Anganwadi Sub-Centres</span>
        </div>

        {/* Normal Green */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase mb-2">
            <span>Normal Growth (Green)</span>
            <ShieldCheck size={18} className="text-emerald-600" />
          </div>
          <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400">{analytics.riskBreakdown.greenHealthy}</p>
          <span className="text-xs font-semibold text-zinc-500 mt-2 block">Optimal WHO Z-Score percentiles</span>
        </div>

        {/* MAM Orange */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase mb-2">
            <span>Moderate Wasting (MAM)</span>
            <Activity size={18} className="text-amber-600" />
          </div>
          <p className="text-4xl font-black text-amber-600 dark:text-amber-400">{analytics.riskBreakdown.orangeHighRiskMam}</p>
          <span className="text-xs font-semibold text-zinc-500 mt-2 block">Enrolled in Take-Home Ration diet</span>
        </div>

        {/* SAM Red Alert */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase mb-2">
            <span>Severe Malnutrition (SAM)</span>
            <AlertTriangle size={18} className="text-rose-600 animate-pulse" />
          </div>
          <p className="text-4xl font-black text-rose-600 dark:text-rose-400">{analytics.riskBreakdown.redCriticalSam}</p>
          <span className="text-xs font-semibold text-zinc-500 mt-2 block">NRC Inpatient Admission Required</span>
        </div>
      </div>

      {/* 4 Core Health Indicators */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            CLINICAL BENCHMARKS
          </span>
          <h3 className="text-xl font-black text-zinc-950 dark:text-white flex items-center gap-2">
            <BarChart3 size={20} className="text-zinc-950 dark:text-white" />
            <span>WHO &amp; Poshan Abhiyaan Health Indicators</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <span className="text-xs text-zinc-500 font-bold block uppercase">Stunting Rate (HAZ &lt; -2SD)</span>
            <span className="text-2xl font-black text-zinc-950 dark:text-white mt-1 block">{analytics.indicators.stuntingRatePercent}%</span>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-zinc-950 dark:bg-white h-full rounded-full" style={{ width: `${analytics.indicators.stuntingRatePercent}%` }} />
            </div>
          </div>

          <div className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <span className="text-xs text-zinc-500 font-bold block uppercase">Wasting Rate (WHZ &lt; -2SD)</span>
            <span className="text-2xl font-black text-zinc-950 dark:text-white mt-1 block">{analytics.indicators.wastingRatePercent}%</span>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-zinc-950 dark:bg-white h-full rounded-full" style={{ width: `${analytics.indicators.wastingRatePercent}%` }} />
            </div>
          </div>

          <div className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <span className="text-xs text-zinc-500 font-bold block uppercase">Anemia Prevalence (Hb &lt; 11g)</span>
            <span className="text-2xl font-black text-zinc-950 dark:text-white mt-1 block">{analytics.indicators.anemiaRatePercent}%</span>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-zinc-950 dark:bg-white h-full rounded-full" style={{ width: `${analytics.indicators.anemiaRatePercent}%` }} />
            </div>
          </div>

          <div className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <span className="text-xs text-zinc-500 font-bold block uppercase">UIP Vaccine Coverage</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">{analytics.indicators.vaccinationCoveragePercent}%</span>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${analytics.indicators.vaccinationCoveragePercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Village Heatmap Breakdown Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            GEOGRAPHIC SURVEILLANCE
          </span>
          <h3 className="text-xl font-black text-zinc-950 dark:text-white">
            Village-Level Malnutrition &amp; Triage Heatmap
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Village Name</th>
                <th className="py-3 px-4">Total Children</th>
                <th className="py-3 px-4 text-emerald-600">Normal (Green)</th>
                <th className="py-3 px-4 text-amber-600">Moderate MAM</th>
                <th className="py-3 px-4 text-rose-600">Severe SAM</th>
                <th className="py-3 px-4">Triage Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {Object.entries(analytics.villageHeatmap || {}).map(([vName, stat]: [string, any]) => (
                <tr key={vName} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="py-4 px-4 font-black text-zinc-950 dark:text-white">{vName}</td>
                  <td className="py-4 px-4 font-bold text-zinc-700 dark:text-zinc-300">{stat.total}</td>
                  <td className="py-4 px-4 font-bold text-emerald-600">{stat.healthy}</td>
                  <td className="py-4 px-4 font-bold text-amber-600">{stat.mam}</td>
                  <td className="py-4 px-4 font-bold text-rose-600">{stat.sam}</td>
                  <td className="py-4 px-4">
                    {stat.sam > 0 ? (
                      <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 text-[10px] font-black border border-rose-300">
                        NRC Referral Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-black border border-emerald-300">
                        Normal Cohort
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
