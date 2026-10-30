import React, { useState } from 'react';
import {
  Users, UserPlus, Search, Filter, Scale, Syringe,
  QrCode, Apple, AlertTriangle, CheckCircle2, Hospital,
  FileText, Camera, ChevronRight, RefreshCw, Sparkles,
  ArrowUpRight, Heart, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Child, RiskCategory, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';

interface InteractiveConsoleSectionProps {
  childrenList: Child[];
  language: LanguageCode;
  onOpenGrowthModal: (child: Child) => void;
  onOpenVaccinesModal: (child: Child) => void;
  onOpenQRModal: (child: Child) => void;
  onOpenNutritionModal: (child: Child) => void;
  onOpenRegisterModal: () => void;
  onOpenHealthCenters: () => void;
  onOpenPlateScanner: () => void;
  onOpenGovtSchemes: () => void;
}

export const InteractiveConsoleSection: React.FC<InteractiveConsoleSectionProps> = ({
  childrenList,
  language,
  onOpenGrowthModal,
  onOpenVaccinesModal,
  onOpenQRModal,
  onOpenNutritionModal,
  onOpenRegisterModal,
  onOpenHealthCenters,
  onOpenPlateScanner,
  onOpenGovtSchemes,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('ALL');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  const villages = Array.from(new Set(childrenList.map(c => c.village).filter(Boolean)));

  const filtered = childrenList.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchQ =
      !q ||
      c.fullName.toLowerCase().includes(q) ||
      c.uhid.toLowerCase().includes(q) ||
      (c.village ?? '').toLowerCase().includes(q) ||
      (c.parentName ?? '').toLowerCase().includes(q);

    const matchVillage = selectedVillage === 'ALL' || c.village === selectedVillage;
    const matchRisk = filterRisk === 'ALL' || c.latestRiskCategory === filterRisk;

    return matchQ && matchVillage && matchRisk;
  });

  const getRiskBadge = (risk?: RiskCategory) => {
    switch (risk) {
      case 'RED':
        return {
          label: 'Critical SAM',
          color: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-600',
        };
      case 'ORANGE':
        return {
          label: 'MAM High Risk',
          color: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-600',
        };
      case 'YELLOW':
        return {
          label: 'Mild Concern',
          color: 'bg-yellow-50 text-yellow-800 border-yellow-200',
          dot: 'bg-yellow-600',
        };
      default:
        return {
          label: 'Healthy Normal',
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-600',
        };
    }
  };

  return (
    <section id="registry" className="py-20 sm:py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 text-xs font-bold uppercase tracking-wider">
              <Activity size={14} className="text-emerald-600" />
              <span>LIVE CLINICAL REGISTRY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight font-['Outfit']">
              District Patient Operations Console
            </h2>
            <p className="text-base text-zinc-600 max-w-2xl font-normal">
              Real-time monitoring across 42 Anganwadi sectors with one-click WHO growth assessment, immunization tracking, and NRC referrals.
            </p>
          </div>

          {/* Quick Utility Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenRegisterModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-bold shadow-md transition cursor-pointer"
            >
              <UserPlus size={15} />
              <span>Register Child</span>
            </button>

            <button
              onClick={onOpenPlateScanner}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-bold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition cursor-pointer"
            >
              <Camera size={15} />
              <span>Plate Scanner</span>
            </button>

            <button
              onClick={onOpenHealthCenters}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-bold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition cursor-pointer"
            >
              <Hospital size={15} />
              <span>NRC Facilities</span>
            </button>

            <button
              onClick={onOpenGovtSchemes}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-bold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition cursor-pointer"
            >
              <FileText size={15} />
              <span>Govt Schemes</span>
            </button>
          </div>
        </div>

        {/* Big Spacious Filter Bar */}
        <div className="bg-[#f8f9fa] rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-xs mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by child name, UHID, village, parent name..."
              className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-2xl border border-zinc-200 focus:outline-hidden focus:ring-2 focus:ring-zinc-950 text-zinc-900 shadow-2xs font-medium"
            />
          </div>

          {/* Village & Risk Chips */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <select
              value={selectedVillage}
              onChange={e => setSelectedVillage(e.target.value)}
              className="px-4 py-3 text-xs font-bold bg-white rounded-2xl border border-zinc-200 text-zinc-800 focus:outline-hidden cursor-pointer shadow-2xs"
            >
              <option value="ALL">All Villages ({villages.length})</option>
              {villages.map(v => (
                <option key={v} value={v!}>{v}</option>
              ))}
            </select>

            {/* Risk filter buttons */}
            {(['ALL', 'GREEN', 'YELLOW', 'ORANGE', 'RED'] as const).map(risk => (
              <button
                key={risk}
                onClick={() => setFilterRisk(risk)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  filterRisk === risk
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                {risk === 'ALL' && 'All Cohort'}
                {risk === 'GREEN' && '🟢 Normal'}
                {risk === 'YELLOW' && '🟡 Mild'}
                {risk === 'ORANGE' && '🟠 MAM'}
                {risk === 'RED' && '🔴 SAM'}
              </button>
            ))}

            {(searchQuery || selectedVillage !== 'ALL' || filterRisk !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedVillage('ALL');
                  setFilterRisk('ALL');
                }}
                className="px-3.5 py-2 rounded-full text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Big Children Cards Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-zinc-200 p-16 text-center shadow-xs">
            <Users size={44} className="mx-auto text-zinc-300 mb-4" />
            <h3 className="text-lg font-bold text-zinc-800">
              No matching child records found
            </h3>
            <p className="text-sm text-zinc-500 mt-1 max-w-sm mx-auto">
              No records matched your search query or selected village filter. Try resetting filters or register a new child record.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedVillage('ALL');
                setFilterRisk('ALL');
              }}
              className="mt-6 px-5 py-2.5 rounded-full text-xs font-bold text-zinc-950 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((child, idx) => {
              const riskMeta = getRiskBadge(child.latestRiskCategory);
              return (
                <motion.div
                  key={child.uhid}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-[2rem] p-7 lg:p-8 border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-zinc-950 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Name + Risk Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-black text-zinc-950">
                            {child.fullName}
                          </h4>
                          <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md font-bold">
                            {child.uhid}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">
                          Mother: <strong className="text-zinc-700 font-semibold">{child.parentName || 'Gita Devi'}</strong> · {child.village || 'Kalyanpur'}
                        </p>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${riskMeta.color} shrink-0`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${riskMeta.dot}`} />
                        <span>{riskMeta.label}</span>
                      </span>
                    </div>

                    {/* Vitals Metric Big Boxes */}
                    <div className="grid grid-cols-3 gap-2.5 py-4 my-4 bg-zinc-50 rounded-2xl p-4 border border-zinc-100 text-center">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          Weight
                        </span>
                        <span className="text-sm font-black text-zinc-950">
                          {child.latestWeightKg ? `${child.latestWeightKg} kg` : '—'}
                        </span>
                      </div>
                      <div className="border-x border-zinc-200">
                        <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          Height
                        </span>
                        <span className="text-sm font-black text-zinc-950">
                          {child.latestHeightCm ? `${child.latestHeightCm} cm` : '—'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          MUAC
                        </span>
                        <span
                          className={`text-sm font-black ${
                            child.latestMuacCm && child.latestMuacCm < 11.5
                              ? 'text-rose-700'
                              : child.latestMuacCm && child.latestMuacCm < 12.5
                              ? 'text-amber-700'
                              : 'text-emerald-700'
                          }`}
                        >
                          {child.latestMuacCm ? `${child.latestMuacCm} cm` : '—'}
                        </span>
                      </div>
                    </div>

                    {/* Clinical Details List */}
                    <div className="space-y-1.5 text-xs text-zinc-600 mb-6">
                      <div className="flex items-center justify-between">
                        <span>Hemoglobin:</span>
                        <strong className="text-zinc-800 font-bold">
                          {child.latestRiskCategory === 'RED' ? 'SEVERE (<7 g/dL)' : child.latestRiskCategory === 'ORANGE' ? 'MODERATE (8.4 g/dL)' : 'NORMAL (11.2 g/dL)'}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Wasting Status:</span>
                        <strong className="text-zinc-800 font-bold">
                          {child.wastingStatus || (child.latestRiskCategory === 'RED' ? 'SAM' : child.latestRiskCategory === 'ORANGE' ? 'MAM' : 'NORMAL')}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>UIP Vaccines:</span>
                        <span className="text-amber-700 font-bold text-[11px]">
                          {child.overdueVaccinesCount ?? 0} Overdue Doses
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Big Action Buttons Row */}
                  <div className="pt-4 border-t border-zinc-100 grid grid-cols-4 gap-2">
                    <button
                      onClick={() => onOpenGrowthModal(child)}
                      className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 transition cursor-pointer text-[10px] font-bold gap-1"
                      title="WHO Growth Assessment"
                    >
                      <Scale size={15} />
                      <span>Growth</span>
                    </button>

                    <button
                      onClick={() => onOpenVaccinesModal(child)}
                      className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 transition cursor-pointer text-[10px] font-bold gap-1"
                      title="Vaccine Timeline"
                    >
                      <Syringe size={15} />
                      <span>Vaccines</span>
                    </button>

                    <button
                      onClick={() => onOpenQRModal(child)}
                      className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 transition cursor-pointer text-[10px] font-bold gap-1"
                      title="Digital QR Card"
                    >
                      <QrCode size={15} />
                      <span>QR Card</span>
                    </button>

                    <button
                      onClick={() => onOpenNutritionModal(child)}
                      className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 transition cursor-pointer text-[10px] font-bold gap-1"
                      title="Dietary Plan"
                    >
                      <Apple size={15} />
                      <span>Diet Plan</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
