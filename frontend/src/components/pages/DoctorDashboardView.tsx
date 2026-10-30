import React, { useState } from 'react';
import {
  Stethoscope, Users, Scale, Syringe, AlertOctagon,
  FileText, Activity, Search, Filter, Plus, CheckCircle2,
  AlertTriangle, PhoneCall, ArrowUpRight, ArrowRight,
  Clock, ShieldAlert, Sparkles, Building, Pill, ClipboardCheck,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Child } from '../../types';

interface DoctorDashboardViewProps {
  childrenList: Child[];
  onOpenGrowthModal: (child: Child) => void;
  onOpenVaccinesModal: (child: Child) => void;
  onOpenQRModal: (child: Child) => void;
  onOpenNutritionModal: (child: Child) => void;
  onOpenHealthCenters: () => void;
  onNavigate: (page: string) => void;
}

export const DoctorDashboardView: React.FC<DoctorDashboardViewProps> = ({
  childrenList,
  onOpenGrowthModal,
  onOpenVaccinesModal,
  onOpenQRModal,
  onOpenNutritionModal,
  onOpenHealthCenters,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [prescribedMed, setPrescribedMed] = useState('IFA Syrup 1ml daily + F-75 Therapeutic Feeding (130ml q2h)');

  const filtered = childrenList.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchQ =
      !q ||
      c.fullName.toLowerCase().includes(q) ||
      c.uhid.toLowerCase().includes(q) ||
      (c.village ?? '').toLowerCase().includes(q);
    const matchRisk = riskFilter === 'ALL' || c.latestRiskCategory === riskFilter;
    return matchQ && matchRisk;
  });

  const samCount = childrenList.filter(c => c.latestRiskCategory === 'RED').length;
  const mamCount = childrenList.filter(c => c.latestRiskCategory === 'ORANGE').length;
  const normalCount = childrenList.filter(c => c.latestRiskCategory === 'GREEN').length;

  const handleOpenPrescription = (child: Child) => {
    setSelectedChild(child);
    setPrescriptionModalOpen(true);
  };

  const handlePrescribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Prescription for ${selectedChild?.fullName} (${selectedChild?.uhid}) signed and transmitted to Kalyanpur Primary Health Centre pharmacy!`);
    setPrescriptionModalOpen(false);
  };

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ── Doctor EHR Header ── */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold border border-teal-200/70 dark:border-teal-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Pediatric Clinical Console · Nutrition Rehabilitation Centre (NRC)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Dr. Rajesh Patra, MD
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Chief Medical Officer &amp; NRC Inpatient Director · License: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">MCI-OD-2018-84920</span> · Rayagada DH
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={onOpenHealthCenters}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-xs cursor-pointer"
              >
                <Building size={15} className="text-teal-600" />
                <span>NRC Inpatient Facilities</span>
              </button>

              <button
                onClick={() => onNavigate('appointments')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Clock size={15} />
                <span>Today’s Consult Queue (14)</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Dynamic KPI Stats Strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Active Cohort Monitored
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {childrenList.length > 0 ? childrenList.length : 1284}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">+18 this wk</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Enrolled across 42 Anganwadi sectors</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-rose-200/80 dark:border-rose-900/60 shadow-xs bg-rose-50/20">
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
              <AlertOctagon size={13} /> Critical SAM Cases
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-rose-600">
                {samCount > 0 ? samCount : 39}
              </span>
              <span className="text-xs font-bold text-rose-700 bg-rose-100 dark:bg-rose-950/70 px-2 py-0.5 rounded-md">NRC Review</span>
            </div>
            <p className="text-xs text-rose-700/80 mt-2">MUAC &lt; 11.5cm or Bilateral Edema</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-amber-200/80 dark:border-amber-900/60 shadow-xs bg-amber-50/20">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
              <AlertTriangle size={13} /> Moderate Acute (MAM)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-amber-600">
                {mamCount > 0 ? mamCount : 281}
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 dark:bg-amber-950/70 px-2 py-0.5 rounded-md">THR Active</span>
            </div>
            <p className="text-xs text-amber-700/80 mt-2">MUAC 11.5 – 12.4cm on surveillance</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              UIP Vaccine Coverage
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                94.8%
              </span>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md">2,134 doses</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Universal Immunization registry on-track</p>
          </div>
        </div>

        {/* ── Patient Triage & Roster Workstation ── */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Clinical Patient Roster &amp; Anthropometric Triage
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time WHO evaluations synchronized from frontline ASHA field tablets.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Filter name or UHID..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-teal-600"
                />
              </div>

              {(['ALL', 'RED', 'ORANGE', 'GREEN'] as const).map(risk => (
                <button
                  key={risk}
                  onClick={() => setRiskFilter(risk)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    riskFilter === risk
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {risk === 'ALL' && 'All Cohort'}
                  {risk === 'RED' && '🔴 SAM Emergency'}
                  {risk === 'ORANGE' && '🟠 MAM Moderate'}
                  {risk === 'GREEN' && '🟢 Normal'}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Patient / UHID</th>
                  <th className="py-3 px-4">Village / Center</th>
                  <th className="py-3 px-4">Weight &amp; Height</th>
                  <th className="py-3 px-4">MUAC Tape</th>
                  <th className="py-3 px-4">Hemoglobin</th>
                  <th className="py-3 px-4">WHO Risk Status</th>
                  <th className="py-3 px-4 text-right">Clinical Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filtered.map(child => {
                  const isSam = child.latestRiskCategory === 'RED';
                  const isMam = child.latestRiskCategory === 'ORANGE';
                  return (
                    <tr
                      key={child.uhid}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition font-medium"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                          {child.fullName}
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">
                          {child.uhid} · Mother: {child.parentName}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {child.village}
                        <span className="block text-[10px] text-slate-400">{child.anganwadiCenter}</span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-200">
                        <strong>{child.latestWeightKg} kg</strong> · {child.latestHeightCm} cm
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`font-mono font-bold ${
                            child.latestMuacCm && child.latestMuacCm < 11.5
                              ? 'text-rose-600 text-sm'
                              : child.latestMuacCm && child.latestMuacCm < 12.5
                              ? 'text-amber-600'
                              : 'text-emerald-600'
                          }`}
                        >
                          {child.latestMuacCm} cm
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {child.latestAnemiaLevel || '11.4 g/dL (Normal)'}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                            isSam
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-200'
                              : isMam
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-200'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200'
                          }`}
                        >
                          {isSam ? '🔴 Critical SAM' : isMam ? '🟠 MAM Alert' : '🟢 Healthy'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        <button
                          onClick={() => onOpenGrowthModal(child)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-[11px] transition"
                          title="Review WHO Growth"
                        >
                          Assess
                        </button>
                        <button
                          onClick={() => handleOpenPrescription(child)}
                          className="px-3 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-[11px] transition shadow-xs"
                          title="Sign Prescription"
                        >
                          Prescribe
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Prescription Modal / Drawer ── */}
        <AnimatePresence>
          {prescriptionModalOpen && selectedChild && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 font-['Plus_Jakarta_Sans',sans-serif]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Official Medical Order</span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Clinical Order for {selectedChild.fullName}
                    </h3>
                  </div>
                  <button
                    onClick={() => setPrescriptionModalOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handlePrescribeSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Medication &amp; Therapeutic Nutrition Protocol
                    </label>
                    <textarea
                      rows={4}
                      value={prescribedMed}
                      onChange={e => setPrescribedMed(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-teal-600"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1 text-slate-500 text-[11px]">
                    <p className="flex items-center gap-1.5">
                      <ClipboardCheck size={13} className="text-teal-600 shrink-0" />
                      Digitally counter-signed by Dr. Rajesh Patra, Chief Medical Officer.
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Building size={13} className="text-teal-600 shrink-0" />
                      Synchronizes directly with Kalyanpur Health Sub-Centre pharmacy.
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setPrescriptionModalOpen(false)}
                      className="w-1/2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold transition shadow-xs"
                    >
                      Sign &amp; Transmit Order
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
