import React, { useState } from 'react';
import {
  FileText, Download, Printer, Search, Filter,
  CheckCircle2, AlertOctagon, Scale, Syringe, Eye, X,
  ShieldCheck, ArrowUpRight, Activity, Calendar, User,
  HeartPulse, Share2, AlertTriangle, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReportsView: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    {
      id: 'REP-2026-891',
      title: 'Quarterly WHO Growth & Anthropometric Evaluation',
      category: 'GROWTH',
      child: 'Aarav Kumar',
      uhid: 'NC-2026-101',
      age: '18 Months',
      gender: 'Male',
      village: 'Kalyanpur',
      date: 'Oct 28, 2026',
      examiner: 'Dr. Rajesh Patra, MD & Kamla Bai (ASHA)',
      examinerTitle: 'Chief Pediatric Medical Officer · Rayagada DH',
      status: 'Verified',
      statusType: 'success',
      vitals: {
        weight: '11.2 kg',
        height: '82.5 cm',
        muac: '14.2 cm',
        muacStatus: 'NORMAL (GREEN)',
        waz: '-0.8 SD (Normal)',
        haz: '-0.4 SD (Normal)',
        whz: '-0.6 SD (Normal)',
        hb: '11.2 g/dL (Adequate)',
        edema: 'Absent'
      },
      summary: 'Weight: 11.2 kg, Height: 82.5 cm, MUAC: 14.2 cm. Normal standard deviations across all 3 WHO curves.',
      findings: 'Child exhibits optimal nutrition and linear height velocity. Cognitive and motor milestones are on schedule. Continue bi-weekly Take-Home Ration and routine IFA syrup.',
      recommendations: [
        'Continue Poshan Abhiyaan complementary feeding (egg, ragi, pulses)',
        'Next routine anthropometry due in 90 days (January 2027)',
        'Administer Vitamin A biannual prophylactic dose at AWC'
      ],
      qrToken: 'NCQR-AARAV-891'
    },
    {
      id: 'REP-2026-892',
      title: 'Severe Acute Malnutrition (SAM) NRC Inpatient Admission Dossier',
      category: 'SAM',
      child: 'Priyanka Soren',
      uhid: 'NC-2026-102',
      age: '24 Months',
      gender: 'Female',
      village: 'Singapur',
      date: 'Oct 24, 2026',
      examiner: 'Dr. Rajesh Patra, Chief Medical Officer',
      examinerTitle: 'Director · Nutrition Rehabilitation Centre (NRC)',
      status: 'Critical Alert',
      statusType: 'critical',
      vitals: {
        weight: '6.4 kg',
        height: '69.0 cm',
        muac: '11.1 cm',
        muacStatus: 'SEVERE WASTING (RED)',
        waz: '-3.8 SD (Severe Underweight)',
        haz: '-2.9 SD (Moderate Stunting)',
        whz: '-3.5 SD (Severe Wasting)',
        hb: '6.8 g/dL (Severe Anemia)',
        edema: 'Bilateral Pitting Grade 1'
      },
      summary: 'Weight: 6.4 kg, Height: 69.0 cm, MUAC: 11.1 cm, Hb: 6.8 g/dL. Severe wasting with bilateral grade-1 pitting edema.',
      findings: 'Critical SAM presentation requiring immediate inpatient NRC admission. Commenced therapeutic F-75 formula feeding schedule. Monitored 24/7 for hypothermia, hypoglycemia, and electrolyte stabilization.',
      recommendations: [
        '14-Day structured inpatient therapeutic nutrition protocol',
        'F-75 starter diet 130ml every 2 hours with micronutrient supplementation',
        'Daily weight tracking and pediatric medical rounds',
        '108 Emergency Ambulance transport coordinated'
      ],
      qrToken: 'NCQR-PRIYA-892'
    },
    {
      id: 'REP-2026-893',
      title: 'Universal Immunization Programme (UIP) Verification Certificate',
      category: 'VACCINE',
      child: 'Aarav Kumar',
      uhid: 'NC-2026-101',
      age: '18 Months',
      gender: 'Male',
      village: 'Kalyanpur',
      date: 'Oct 10, 2026',
      examiner: 'Meera Sharma (Anganwadi Supervisor)',
      examinerTitle: 'Certified Vaccinator · Sub-Centre Singapur',
      status: 'Completed',
      statusType: 'success',
      vitals: {
        weight: '11.0 kg',
        height: '82.0 cm',
        muac: '14.1 cm',
        muacStatus: 'NORMAL',
        waz: '-0.7 SD',
        haz: '-0.4 SD',
        whz: '-0.5 SD',
        hb: '11.0 g/dL',
        edema: 'Absent'
      },
      summary: 'Pentavalent-3, OPV-3, Rotavirus-3 administered with verified batch #PV-8402. Zero adverse events following immunization (AEFI).',
      findings: 'Child is fully protected through 14 weeks. Next scheduled vaccine is MR-1 (Measles-Rubella) with Vitamin A on November 15, 2026.',
      recommendations: [
        'Administered Pentavalent-3 (Batch: PV-8402)',
        'Administered OPV-3 (Batch: OP-1192)',
        'Administered Rotavirus-3 (Batch: RV-9921)',
        'Vaccine card stamped and synchronized with U-WIN central registry'
      ],
      qrToken: 'NCQR-UWIN-893'
    },
    {
      id: 'REP-2026-894',
      title: 'Moderate Acute Malnutrition (MAM) Dietary Assessment',
      category: 'GROWTH',
      child: 'Manav Majhi',
      uhid: 'NC-2026-103',
      age: '36 Months',
      gender: 'Male',
      village: 'Tikiri',
      date: 'Sep 30, 2026',
      examiner: 'Dr. Shalini Rao (Nutrition Specialist)',
      examinerTitle: 'State Poshan Consultant · Rayagada Division',
      status: 'Under Care',
      statusType: 'warning',
      vitals: {
        weight: '9.2 kg',
        height: '81.0 cm',
        muac: '12.1 cm',
        muacStatus: 'MODERATE WASTING (YELLOW)',
        waz: '-2.4 SD (Moderate Underweight)',
        haz: '-1.8 SD (Mild Stunting)',
        whz: '-2.2 SD (Moderate Wasting)',
        hb: '9.4 g/dL (Mild Anemia)',
        edema: 'Absent'
      },
      summary: 'Weight: 9.2 kg, Height: 81.0 cm, MUAC: 12.1 cm. Moderate muscle wasting between -2SD and -3SD.',
      findings: 'Enrolled in Poshan Abhiyaan Take-Home Ration supplementary calorie booster. Family supplied with energy-dense peanut-millet paste.',
      recommendations: [
        'Weekly ASHA home follow-up and arm circumference check',
        'Daily supplementary Take-Home Ration (500 kcal booster)',
        'Oral Iron syrup 15mg daily for 60 days'
      ],
      qrToken: 'NCQR-MANAV-894'
    },
  ];

  const filteredReports = reports.filter(r => {
    const matchesFilter = filterType === 'ALL' || r.category === filterType;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.child.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.uhid.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── Top Header Banner ── */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold border border-teal-200/70 dark:border-teal-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>CLINICAL DOCUMENTATION &amp; CERTIFIED EHR</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Reports &amp; Diagnostic Records
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                Cryptographically signed electronic health records, WHO Z-Score growth telemetry dossiers, and certified immunization histories.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 self-start lg:self-auto overflow-x-auto">
              {['ALL', 'GROWTH', 'SAM', 'VACCINE'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterType(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    filterType === cat
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {cat === 'ALL' ? 'All Records' : cat === 'GROWTH' ? 'Growth' : cat === 'SAM' ? 'SAM Triage' : 'Vaccines'}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by child name, UHID (e.g. NC-2026-101), or report title..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-600"
              />
            </div>
          </div>
        </div>

        {/* ── 4 KPI Summary Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Dossiers</span>
              <FileText size={16} className="text-teal-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">48 Files</div>
            <p className="text-xs text-slate-500 mt-1">Rayagada District Registry</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-rose-200/80 dark:border-rose-900/60 shadow-xs bg-rose-50/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Critical SAM Triage</span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            </div>
            <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">3 Cases</div>
            <p className="text-xs text-rose-700/80 mt-1">NRC inpatient care active</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Vaccine Passports</span>
              <ShieldCheck size={16} className="text-teal-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">12 Verified</div>
            <p className="text-xs text-slate-500 mt-1">U-WIN synchronized</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Optimal Growth</span>
              <CheckCircle2 size={16} className="text-teal-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">33 Children</div>
            <p className="text-xs text-slate-500 mt-1">Normal WHO standard curve</p>
          </div>
        </div>

        {/* ── Reports List ── */}
        <div className="space-y-4">
          {filteredReports.map(rep => (
            <motion.div
              key={rep.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4"
            >
              {/* Top Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold shadow-xs shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {rep.title}
                      </h3>
                      <span className="font-mono text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md">
                        {rep.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Examined by: <span className="font-bold text-slate-800 dark:text-slate-200">{rep.examiner}</span> ({rep.examinerTitle}) · {rep.date}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-start lg:self-auto">
                  {rep.statusType === 'critical' ? (
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 flex items-center gap-1.5 border border-rose-200">
                      <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                      CRITICAL SAM ALERT
                    </span>
                  ) : rep.statusType === 'warning' ? (
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 flex items-center gap-1.5 border border-amber-200">
                      <AlertTriangle size={13} />
                      MODERATE UNDER CARE
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1.5 border border-emerald-200">
                      <CheckCircle2 size={13} />
                      AUTHENTICATED &amp; VERIFIED
                    </span>
                  )}
                </div>
              </div>

              {/* Patient Profile Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Patient Name</span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{rep.child}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">National UHID</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{rep.uhid}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Demographics</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{rep.age} · {rep.gender}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Anganwadi Village</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{rep.village}</span>
                </div>
              </div>

              {/* Telemetry Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Weight-for-Age (WAZ)</span>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white">{rep.vitals.waz}</strong>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Height-for-Age (HAZ)</span>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white">{rep.vitals.haz}</strong>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">MUAC Arm Tape</span>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white">{rep.vitals.muac}</strong>
                  <span className="text-[10px] font-medium block text-slate-500 mt-0.5">{rep.vitals.muacStatus}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Hemoglobin (Hb)</span>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white">{rep.vitals.hb}</strong>
                </div>
              </div>

              {/* Clinical Summary */}
              <div className="bg-slate-50 dark:bg-slate-800/20 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Physician Diagnostic Findings
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {rep.findings}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <ShieldCheck size={15} className="text-teal-600" />
                  <span>National Health Mission Digital Signature Verified</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setSelectedReport(rep)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>Inspect Full Diagnostic Dossier</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                    title="Download Official PDF"
                  >
                    <Download size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Interactive Diagnostic Dossier Modal ── */}
        <AnimatePresence>
          {selectedReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            >
              <div className="w-full max-w-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl my-8 font-['Plus_Jakarta_Sans',sans-serif]">
                {/* Modal Header */}
                <div className="p-5 sm:p-6 bg-[#0B1528] text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
                      POSHAN ABHIYAAN · CENTRAL HEALTH DOSSIER
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold">{selectedReport.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Ref: {selectedReport.id} · Issued {selectedReport.date}</p>
                  </div>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm">
                  {/* Patient Banner */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{selectedReport.child}</h4>
                      <p className="text-xs text-slate-500 font-mono">UHID: {selectedReport.uhid} · {selectedReport.age} · {selectedReport.gender}</p>
                      <p className="text-xs text-slate-500">Village: {selectedReport.village} (Rayagada Block)</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Status</span>
                      <strong className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{selectedReport.status}</strong>
                    </div>
                  </div>

                  {/* Vitals Telemetry Grid */}
                  <div>
                    <h5 className="font-bold uppercase text-[10px] tracking-wider text-slate-400 mb-2.5">
                      Validated Clinical Anthropometry
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Weight</span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white">{selectedReport.vitals.weight}</strong>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Height</span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white">{selectedReport.vitals.height}</strong>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">MUAC Tape</span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white">{selectedReport.vitals.muac}</strong>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Hemoglobin</span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white">{selectedReport.vitals.hb}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Physician Findings & Directives */}
                  <div className="space-y-2">
                    <h5 className="font-bold uppercase text-[10px] tracking-wider text-slate-400">
                      Clinical Findings &amp; Prognosis
                    </h5>
                    <p className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 leading-relaxed text-slate-800 dark:text-slate-200 text-xs">
                      {selectedReport.findings}
                    </p>
                  </div>

                  {/* Recommendations List */}
                  <div className="space-y-2">
                    <h5 className="font-bold uppercase text-[10px] tracking-wider text-slate-400">
                      Prescribed Clinical Actions
                    </h5>
                    <div className="space-y-1.5">
                      {selectedReport.recommendations.map((rec: string, i: number) => (
                        <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100">
                          <CheckCircle2 size={14} className="text-teal-600 shrink-0" />
                          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Signoff & Stamp */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Certified Examining Officer</span>
                      <strong className="text-xs font-bold text-slate-900 dark:text-white">{selectedReport.examiner}</strong>
                      <p className="text-[11px] text-slate-500">{selectedReport.examinerTitle}</p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs cursor-pointer"
                      >
                        <Printer size={14} />
                        <span>Print Dossier (PDF)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
