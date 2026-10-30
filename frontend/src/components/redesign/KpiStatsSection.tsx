import React, { useState } from 'react';
import {
  Users, Syringe, AlertCircle, RefreshCw,
  TrendingUp, ArrowUpRight, ArrowDownRight, ShieldCheck,
  Calendar, CheckCircle2, Activity, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export const KpiStatsSection: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | 'ytd'>('30d');

  const statsData = {
    '24h': {
      monitored: '1,284',
      monitoredDelta: '+18 today',
      monitoredPositive: true,
      vaccineRate: '96.2%',
      vaccineDelta: '+2.1% daily pace',
      vaccinePositive: true,
      samTriage: '39',
      samDelta: '3 referred to NRC',
      samPositive: false,
      syncReliability: '100%',
      syncDelta: '0 packets dropped',
      syncPositive: true,
    },
    '7d': {
      monitored: '8,420',
      monitoredDelta: '+6.4% vs last week',
      monitoredPositive: true,
      vaccineRate: '95.1%',
      vaccineDelta: '412 doses administered',
      vaccinePositive: true,
      samTriage: '184',
      samDelta: '89.4% in therapeutic care',
      samPositive: true,
      syncReliability: '99.98%',
      syncDelta: '14.2s avg sync latency',
      syncPositive: true,
    },
    '30d': {
      monitored: '48,920',
      monitoredDelta: '+14.2% YoY growth',
      monitoredPositive: true,
      vaccineRate: '94.8%',
      vaccineDelta: '6.4% above state baseline',
      vaccinePositive: true,
      samTriage: '1,842',
      samDelta: '98.1% early stabilization',
      samPositive: true,
      syncReliability: '99.94%',
      syncDelta: 'Zero data loss verified',
      syncPositive: true,
    },
    'ytd': {
      monitored: '142,800',
      monitoredDelta: '+32.8% district coverage',
      monitoredPositive: true,
      vaccineRate: '94.2%',
      vaccineDelta: '28,400 UIP courses',
      vaccinePositive: true,
      samTriage: '5,290',
      samDelta: '97.6% discharged safely',
      samPositive: true,
      syncReliability: '99.96%',
      syncDelta: 'Audit certified (ABDM)',
      syncPositive: true,
    },
  };

  const currentStats = statsData[timeframe];

  const cards = [
    {
      title: 'Monitored Children',
      value: currentStats.monitored,
      delta: currentStats.monitoredDelta,
      isPositive: currentStats.monitoredPositive,
      icon: Users,
      badge: 'Active Census',
      accentBg: 'bg-teal-50 text-teal-800 border-teal-200',
      progress: 88,
      footnote: 'Tracked across 42 Anganwadi sectors & 8 PHCs',
    },
    {
      title: 'UIP Vaccine Completion',
      value: currentStats.vaccineRate,
      delta: currentStats.vaccineDelta,
      isPositive: currentStats.vaccinePositive,
      icon: Syringe,
      badge: 'National Schedule',
      accentBg: 'bg-blue-50 text-blue-800 border-blue-200',
      progress: 94.8,
      footnote: 'Universal Immunization Programme compliance',
    },
    {
      title: 'Acute Malnutrition Interventions',
      value: currentStats.samTriage,
      delta: currentStats.samDelta,
      isPositive: currentStats.samPositive,
      icon: AlertCircle,
      badge: 'NRC Protocol',
      accentBg: 'bg-amber-50 text-amber-800 border-amber-200',
      progress: 74,
      footnote: 'Identified before clinical irreversible stunting',
    },
    {
      title: 'Offline Sync Reliability',
      value: currentStats.syncReliability,
      delta: currentStats.syncDelta,
      isPositive: currentStats.syncPositive,
      icon: RefreshCw,
      badge: 'Dexie Mesh',
      accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      progress: 99.9,
      footnote: 'Local IndexedDB queue with auto-retry mesh',
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-white border-y border-slate-200/90 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Timeframe Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
              <span>Operational Telemetry &amp; Field Health Metrics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Measurable Child Health Outcomes
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl font-normal">
              Continuous population health indicators verified by Rayagada District Health Society, Poshan Mission, and Ministry of Health.
            </p>
          </div>

          {/* Timeframe Switcher Pills */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold self-start md:self-auto">
            {(['24h', '7d', '30d', 'ytd'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setTimeframe(tab)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  timeframe === tab
                    ? 'bg-white text-teal-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === '24h' ? '24 Hours' : tab === '7d' ? '7 Days' : tab === '30d' ? '30 Days' : 'Year to Date'}
              </button>
            ))}
          </div>
        </div>

        {/* Professional KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {card.badge}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${card.accentBg}`}>
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-slate-700 mb-1.5">
                    {card.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                      {card.value}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold mb-4">
                    {card.isPositive ? (
                      <ArrowUpRight size={15} className="text-emerald-700" />
                    ) : (
                      <ArrowDownRight size={15} className="text-amber-700" />
                    )}
                    <span className={card.isPositive ? 'text-emerald-700' : 'text-amber-700'}>
                      {card.delta}
                    </span>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-100">
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-700 transition-all duration-700"
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-1 font-normal">
                    {card.footnote}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
