import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Printer,
  Share2,
  Calendar,
  Building,
  CheckCircle,
  AlertTriangle,
  Award,
  ChevronDown,
  Sparkles,
  BarChart2
} from 'lucide-react';
import type { Child, LanguageCode } from '../types';
import { api } from '../services/api';

interface DoctorReportsViewProps {
  language: LanguageCode;
}

export const DoctorReportsView: React.FC<DoctorReportsViewProps> = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [reportType, setReportType] = useState<'NRC_REFERRAL' | 'BLOCK_AUDIT' | 'IMMUNIZATION_AUDIT'>('NRC_REFERRAL');
  const [selectedChildId, setSelectedChildId] = useState<number>(2); // Default SAM child Priyanka Soren
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    api.getChildren().then((res) => {
      setChildren(res);
      if (res.length > 0 && !selectedChildId) {
        setSelectedChildId(res[0].id || 1);
      }
    });
  }, []);

  const selectedChild = children.find(c => c.id === selectedChildId) || children[0] || {
    id: 2,
    fullName: 'Priyanka Soren',
    uhid: 'NC-697749',
    gender: 'FEMALE',
    dateOfBirth: '2025-06-12',
    village: 'Kalyanpur',
    district: 'Barwani',
    latestWeightKg: 7.1,
    latestHeightCm: 76.0,
    latestMuacCm: 11.2,
    latestAnemiaLevel: 'MODERATE',
    parentName: 'Sunita Soren',
    parentPhone: '+91 98765 43210'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Report Selection Tabs */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Official Clinical & Epidemiological Documentation</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Reports & Referral Letters</h2>
          <p className="text-slate-500 text-xs">
            Generate MoHFW-compliant NRC referral letters, Poshan Tracker synchronizable audits, and block-level pediatric reviews.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            {isCopied ? 'Link Copied!' : 'Share Document'}
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setReportType('NRC_REFERRAL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            reportType === 'NRC_REFERRAL'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Building className="w-4 h-4" />
          NRC Emergency Referral Letter
        </button>
        <button
          onClick={() => setReportType('BLOCK_AUDIT')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            reportType === 'BLOCK_AUDIT'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Block Malnutrition Audit (Barwani CHC)
        </button>
        <button
          onClick={() => setReportType('IMMUNIZATION_AUDIT')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            reportType === 'IMMUNIZATION_AUDIT'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          Universal Immunization Dropout Report
        </button>
      </div>

      {/* VIEW 1: NRC Referral Letter */}
      {reportType === 'NRC_REFERRAL' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Selector */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4 text-teal-700" />
              Referral Target & Patient
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Select Beneficiary</label>
              <select
                value={selectedChildId}
                onChange={(e) => setSelectedChildId(Number(e.target.value))}
                className="w-full text-xs font-bold rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700"
              >
                {children.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.fullName} ({c.uhid}) - {c.latestRiskCategory || 'UNKNOWN'}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                NRC Admission Criteria (Govt of India):
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-amber-800">
                <li>Weight-for-Height &lt; -3 SD (Severe Wasting)</li>
                <li>MUAC &lt; 11.5 cm for children 6-59 months</li>
                <li>Presence of bilateral pitting edema</li>
                <li>Failed Appetite Test / Complications</li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Destination Center:</span>
                <span className="font-bold text-slate-800">District Hospital Barwani NRC</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Accompanying Worker:</span>
                <span className="font-bold text-slate-800">Kamla Bai (ASHA)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">108 Ambulance Status:</span>
                <span className="font-bold text-emerald-600">Dispatched & Notified</span>
              </div>
            </div>
          </div>

          {/* Right: Printable Official NRC Letter Sheet */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border-2 border-slate-300 shadow-md print:shadow-none print:border-none space-y-6 text-slate-900">
            {/* MoHFW Header */}
            <div className="text-center border-b-2 border-teal-800 pb-4">
              <div className="text-[11px] font-black uppercase tracking-widest text-teal-800">
                Ministry of Health & Family Welfare • National Health Mission (NHM)
              </div>
              <h1 className="text-xl font-black text-slate-900 mt-1 uppercase">
                Nutritional Rehabilitation Centre (NRC) Urgent Referral Slip
              </h1>
              <div className="text-xs text-slate-500 mt-0.5">
                Community Health Centre (CHC) Barwani • District Health Society, MP
              </div>
            </div>

            {/* Referral Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Referral No</span>
                <span className="font-black text-slate-800">NRC/2026/BAR-0482</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Referral Date</span>
                <span className="font-bold text-slate-800">{new Date().toLocaleDateString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">ABHA / UHID</span>
                <span className="font-mono font-bold text-blue-700">{selectedChild?.uhid || 'NC-697749'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Priority Triage</span>
                <span className="font-black text-rose-600 uppercase">Emergency Inpatient</span>
              </div>
            </div>

            {/* Child & Guardian Demographics */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
              <div className="font-bold text-slate-800 border-b border-slate-100 pb-1 text-sm">
                1. Patient Identification & Demographics
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-500 block">Child's Full Name:</span>
                  <span className="font-bold text-slate-800">{selectedChild?.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Sex / Age:</span>
                  <span className="font-bold text-slate-800">
                    {selectedChild?.gender} • DOB: {selectedChild?.dateOfBirth}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Mother / Guardian:</span>
                  <span className="font-bold text-slate-800">{selectedChild?.parentName || 'Sunita Soren'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Village & Gram Panchayat:</span>
                  <span className="font-bold text-slate-800">{selectedChild?.village || 'Kalyanpur'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Contact Phone:</span>
                  <span className="font-bold text-slate-800">{selectedChild?.parentPhone || '+91 98765 43210'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">District:</span>
                  <span className="font-bold text-slate-800">{selectedChild?.district || 'Barwani, MP'}</span>
                </div>
              </div>
            </div>

            {/* Anthropometry & Clinical Triage Table */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
              <div className="font-bold text-slate-800 border-b border-slate-100 pb-1 text-sm">
                2. Anthropometric Status at Time of Referral
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold text-[11px]">
                    <th className="py-1">Parameter</th>
                    <th className="py-1">Clinical Value</th>
                    <th className="py-1">WHO Reference Cutoff</th>
                    <th className="py-1">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  <tr>
                    <td className="py-1.5 font-bold">Current Weight</td>
                    <td className="py-1.5 font-black text-rose-600">{selectedChild?.latestWeightKg || 7.1} kg</td>
                    <td className="py-1.5 text-slate-500">&gt; 9.5 kg (WHO Median)</td>
                    <td className="py-1.5 font-bold text-rose-600">Severe Wasting (-3.1 SD)</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold">Current Height</td>
                    <td className="py-1.5 font-black text-slate-800">{selectedChild?.latestHeightCm || 76.0} cm</td>
                    <td className="py-1.5 text-slate-500">80.5 cm</td>
                    <td className="py-1.5 font-bold text-amber-600">Moderate Stunting</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold">MUAC (Shakir Tape)</td>
                    <td className="py-1.5 font-black text-rose-600">{selectedChild?.latestMuacCm || 11.2} cm</td>
                    <td className="py-1.5 text-slate-500">&ge; 12.5 cm (Normal)</td>
                    <td className="py-1.5 font-bold text-rose-600">RED ZONE (&lt; 11.5 cm)</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold">Bilateral Pitting Edema</td>
                    <td className="py-1.5 font-bold text-emerald-600">Absent (Grade 0)</td>
                    <td className="py-1.5 text-slate-500">None</td>
                    <td className="py-1.5 text-slate-600">Marasmic Presentation</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Doctor's Reason for Referral & Pre-referral Treatment */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
              <div className="font-bold text-slate-800 border-b border-slate-100 pb-1 text-sm">
                3. Clinical Diagnosis & Pre-Referral Stabilization
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Provisional Diagnosis:</strong> Severe Acute Malnutrition (SAM) without active medical complications; secondary moderate microcytic hypochromic anemia (Hb 8.2 g/dL).
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Pre-Referral Actions Administered at CHC:</strong>
                <br />• 10% Dextrose bolus (50 ml oral) administered to prevent hypoglycemia during transit.
                <br />• First dose of Amoxicillin 125mg oral dispersible given.
                <br />• Child kept warm via Kangaroo Mother Care (KMC) during transport.
                <br />• 108 Emergency Transport requisitioned; ASHA worker Kamla Bai accompanying.
              </p>
            </div>

            {/* Doctor Sign-off & Stamp */}
            <div className="pt-4 flex justify-between items-end border-t border-slate-200">
              <div className="space-y-1 text-[11px] text-slate-500">
                <div>NRC Destination: Ward 4, District Hospital Barwani</div>
                <div>Emergency Helpline: 108 / NRC Direct: 07290-222401</div>
                <div>Generated via NutriChild+ ABDM-compliant Telehealth Engine</div>
              </div>

              <div className="text-right">
                <div className="inline-block p-3 border border-dashed border-teal-700 rounded-xl bg-teal-50/50 text-left mb-1">
                  <div className="text-[10px] text-teal-800 uppercase font-black">Digitally Verified & Signed</div>
                  <div className="text-xs font-black text-teal-900">Dr. Priya Sharma, MBBS, DCH</div>
                  <div className="text-[10px] text-slate-600">Reg No: MCI-2018-98421</div>
                  <div className="text-[10px] text-slate-500">CHC Barwani • Medical Officer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Block Malnutrition Audit */}
      {reportType === 'BLOCK_AUDIT' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                CHC Barwani Catchment Area — Monthly Malnutrition Audit
              </h3>
              <p className="text-xs text-slate-500">
                Epidemiological surveillance across 8 Gram Panchayats (October 2026)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Total Monitored Cohort:</span>
              <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black">
                1,420 Under-5 Children
              </span>
            </div>
          </div>

          {/* Audit Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-800 uppercase block">Normal Growth</span>
              <span className="text-2xl font-black text-emerald-700">1,108</span>
              <span className="text-[11px] text-emerald-600 block mt-1">78.0% of cohort</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-bold text-amber-800 uppercase block">MAM (Moderate)</span>
              <span className="text-2xl font-black text-amber-700">242</span>
              <span className="text-[11px] text-amber-600 block mt-1">17.0% (In ASHA feeding)</span>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <span className="text-xs font-bold text-rose-800 uppercase block">SAM (Severe)</span>
              <span className="text-2xl font-black text-rose-700">70</span>
              <span className="text-[11px] text-rose-600 block mt-1">4.9% (NRC protocol)</span>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
              <span className="text-xs font-bold text-blue-800 uppercase block">NRC Recovery Rate</span>
              <span className="text-2xl font-black text-blue-700">88.4%</span>
              <span className="text-[11px] text-blue-600 block mt-1">+3.2% vs previous quarter</span>
            </div>
          </div>

          {/* Gram Panchayat Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                  <th className="py-2.5">Gram Panchayat</th>
                  <th className="py-2.5">Total Under-5</th>
                  <th className="py-2.5">SAM Count</th>
                  <th className="py-2.5">MAM Count</th>
                  <th className="py-2.5">Anemia (&lt;11g/dL)</th>
                  <th className="py-2.5">RUTF Packets Distributed</th>
                  <th className="py-2.5">Triage Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-slate-800">Kalyanpur</td>
                  <td className="py-3">185</td>
                  <td className="py-3 font-bold text-rose-600">12 (6.5%)</td>
                  <td className="py-3 text-amber-600 font-bold">34</td>
                  <td className="py-3">48%</td>
                  <td className="py-3">280 pkts</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                      Intensive Village Drive
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-slate-800">Bijasan</td>
                  <td className="py-3">210</td>
                  <td className="py-3 font-bold text-rose-600">14 (6.7%)</td>
                  <td className="py-3 text-amber-600 font-bold">42</td>
                  <td className="py-3">52%</td>
                  <td className="py-3">340 pkts</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                      NRC Camp Scheduled
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-slate-800">Mengaon</td>
                  <td className="py-3">160</td>
                  <td className="py-3 font-bold text-amber-600">6 (3.8%)</td>
                  <td className="py-3 text-amber-600 font-bold">25</td>
                  <td className="py-3">38%</td>
                  <td className="py-3">180 pkts</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                      ASHA Home Visits
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-slate-800">Sendhwa Rural</td>
                  <td className="py-3">240</td>
                  <td className="py-3 font-bold text-emerald-600">8 (3.3%)</td>
                  <td className="py-3 text-amber-600 font-bold">38</td>
                  <td className="py-3">31%</td>
                  <td className="py-3">210 pkts</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Stable / Monitoring
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: Universal Immunization Audit */}
      {reportType === 'IMMUNIZATION_AUDIT' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Mission Indradhanush UIP Vaccination Coverage Audit
              </h3>
              <p className="text-xs text-slate-500">
                Tracking zero-dose & dropout infants across Barwani CHC sector (2026)
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
              92.4% Full Immunization Rate
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-700">BCG & Birth Polio / HepB0</span>
              <div className="text-2xl font-black text-slate-900">98.2%</div>
              <p className="text-[11px] text-emerald-600 font-bold">Excellent institutional delivery coverage</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-700">Pentavalent-3 & Rota-3 (14 Wks)</span>
              <div className="text-2xl font-black text-slate-900">89.4%</div>
              <p className="text-[11px] text-amber-600 font-bold">8.8% Dropout observed after migration season</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-700">Measles-Rubella (MR-1) (9 Months)</span>
              <div className="text-2xl font-black text-slate-900">91.7%</div>
              <p className="text-[11px] text-emerald-600 font-bold">Vit-A 100k IU co-administered</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
