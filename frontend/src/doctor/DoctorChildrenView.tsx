import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Users,
  AlertTriangle,
  Activity,
  ShieldCheck,
  Stethoscope,
  FileText,
  Calendar,
  Ruler,
  Scale,
  Droplets,
  QrCode,
  MapPin,
  Phone,
  Eye,
  X,
  Plus
} from 'lucide-react';
import type { Child, LanguageCode } from '../types';
import { api } from '../services/api';

interface DoctorChildrenViewProps {
  language: LanguageCode;
  onOpenPrescriptionForChild: (child: Child) => void;
  onOpenGrowthAssessment: (child: Child) => void;
  onOpenAiRisk: (child: Child) => void;
}

export const DoctorChildrenView: React.FC<DoctorChildrenViewProps> = ({
  onOpenPrescriptionForChild,
  onOpenGrowthAssessment,
  onOpenAiRisk
}) => {
  const [children, setChildren] = useState<Child[]>([]);
  const [search, setSearch] = useState('');
  const [filterVillage, setFilterVillage] = useState('ALL');
  const [filterNutrition, setFilterNutrition] = useState('ALL');
  const [selectedChildDossier, setSelectedChildDossier] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getChildren().then((data) => {
      setChildren(data);
      setLoading(false);
    });
  }, []);

  const openDossier = async (c: Child) => {
    if (!c.id) return;
    const details = await api.getChildDetails(c.id);
    setSelectedChildDossier(details);
  };

  const filtered = children.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch =
      c.fullName.toLowerCase().includes(q) ||
      c.uhid.toLowerCase().includes(q) ||
      (c.village && c.village.toLowerCase().includes(q));

    const matchesVillage = filterVillage === 'ALL' || c.village === filterVillage;

    let matchesNutrition = true;
    if (filterNutrition === 'SAM') matchesNutrition = c.latestRiskCategory === 'RED' || c.wastingStatus === 'SAM';
    else if (filterNutrition === 'MAM') matchesNutrition = c.latestRiskCategory === 'ORANGE' || c.wastingStatus === 'MAM';
    else if (filterNutrition === 'NORMAL') matchesNutrition = c.latestRiskCategory === 'GREEN';

    return matchesSearch && matchesVillage && matchesNutrition;
  });

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Controls: Search & Healthcare Filters */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient by Name, UHID, Mother, or Village..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-blue-600"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Village Filter */}
          <select
            value={filterVillage}
            onChange={(e) => setFilterVillage(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 cursor-pointer focus:outline-blue-600"
          >
            <option value="ALL">All Villages (Rayagada)</option>
            <option value="Kalyanpur">Kalyanpur</option>
            <option value="Gunduriguda">Gunduriguda</option>
            <option value="Singapur">Singapur</option>
          </select>

          {/* Nutritional Triage Status Filter */}
          <select
            value={filterNutrition}
            onChange={(e) => setFilterNutrition(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 cursor-pointer focus:outline-blue-600"
          >
            <option value="ALL">All Nutrition Triage</option>
            <option value="SAM">🔴 Critical SAM (Severe)</option>
            <option value="MAM">🟠 Moderate MAM</option>
            <option value="NORMAL">🟢 Normal (Healthy)</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Assigned Pediatric Patients ({filtered.length})</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            Rayagada Block Health Directorate
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Patient UHID & Name</th>
                <th className="py-3 px-4">Gender & Age</th>
                <th className="py-3 px-4">Vitals (Weight / Height / MUAC)</th>
                <th className="py-3 px-4">Hemoglobin (Hb)</th>
                <th className="py-3 px-4">Nutritional Status</th>
                <th className="py-3 px-4">Assigned Center</th>
                <th className="py-3 px-4 text-right">Clinical Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => {
                const isSam = c.latestRiskCategory === 'RED' || c.wastingStatus === 'SAM';
                const isMam = c.latestRiskCategory === 'ORANGE' || c.wastingStatus === 'MAM';

                return (
                  <tr key={c.id || c.uhid} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-2xs ${
                          c.gender === 'FEMALE' ? 'bg-pink-500' : 'bg-blue-600'
                        }`}>
                          {c.gender === 'FEMALE' ? '👧' : '👦'}
                        </div>
                        <div>
                          <strong className="text-sm font-extrabold text-slate-900 block leading-tight">
                            {c.fullName}
                          </strong>
                          <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded-md font-bold inline-block">
                            {c.uhid}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      {c.gender} • DOB: {c.dateOfBirth}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="text-slate-800 font-bold block">
                          ⚖️ {c.latestWeightKg ? `${c.latestWeightKg} kg` : '--'} • 📏 {c.latestHeightCm ? `${c.latestHeightCm} cm` : '--'}
                        </span>
                        {c.latestMuacCm && (
                          <span className="text-[10px] text-slate-500 font-semibold block">
                            MUAC Tape: <strong className={isSam ? 'text-rose-600' : isMam ? 'text-orange-600' : 'text-emerald-700'}>{c.latestMuacCm} cm</strong>
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {c.latestAnemiaLevel ? (
                        <span className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] ${
                          c.latestAnemiaLevel === 'SEVERE'
                            ? 'bg-rose-100 text-rose-800'
                            : c.latestAnemiaLevel === 'MODERATE'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {c.latestAnemiaLevel}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">--</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-xl text-[11px] font-black border flex items-center gap-1.5 w-fit shadow-2xs ${
                        isSam
                          ? 'bg-rose-50 text-rose-900 border-rose-300 animate-pulse'
                          : isMam
                          ? 'bg-orange-50 text-orange-900 border-orange-300'
                          : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${isSam ? 'bg-rose-600' : isMam ? 'bg-orange-500' : 'bg-emerald-600'}`} />
                        {isSam ? 'SAM (Severe Acute)' : isMam ? 'MAM (Moderate)' : 'Normal (Healthy)'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-600">
                      <div>{c.village || 'Kalyanpur'}</div>
                      <span className="text-[10px] text-slate-400 block">{c.anganwadiCenter || 'AWC-1'}</span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openDossier(c)}
                          className="p-1.5 rounded-xl bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800 active:scale-95 transition-all"
                          title="Open Clinical Dossier"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenPrescriptionForChild(c)}
                          className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Prescribe</span>
                        </button>
                        <button
                          onClick={() => onOpenAiRisk(c)}
                          className="px-2.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
                        >
                          <Stethoscope className="w-3.5 h-3.5" />
                          <span>AI Triage</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Patient Dossier Modal */}
      {selectedChildDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-blue-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-teal-900 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-black">
                  {selectedChildDossier.child?.gender === 'FEMALE' ? '👧' : '👦'}
                </div>
                <div>
                  <h3 className="font-extrabold text-base tracking-tight">
                    {selectedChildDossier.child?.fullName}
                  </h3>
                  <p className="text-xs text-blue-200 font-mono">
                    UHID: {selectedChildDossier.child?.uhid} • QR: {selectedChildDossier.child?.qrToken}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedChildDossier(null)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dossier Content */}
            <div className="p-6 overflow-y-auto space-y-4">
              {/* Demographics & Guardian Tile */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Date of Birth</span>
                  <span className="font-bold text-slate-800">{selectedChildDossier.child?.dateOfBirth}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Birth Weight</span>
                  <span className="font-bold text-slate-800">{selectedChildDossier.child?.birthWeightKg || 3.0} kg</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Mother / Guardian</span>
                  <span className="font-bold text-slate-800">{selectedChildDossier.child?.parentName || 'Mother'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Emergency Phone</span>
                  <span className="font-bold text-slate-800">{selectedChildDossier.child?.parentPhone || '9876500000'}</span>
                </div>
              </div>

              {/* Latest Vitals & WHO Status */}
              <div>
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">
                  Clinical Examination & Vitals
                </h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                    <span className="text-[10px] font-bold text-blue-700 uppercase block">Weight</span>
                    <span className="text-base font-black text-slate-900">{selectedChildDossier.latestGrowth?.weightKg || selectedChildDossier.child?.latestWeightKg} kg</span>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200">
                    <span className="text-[10px] font-bold text-teal-700 uppercase block">Height</span>
                    <span className="text-base font-black text-slate-900">{selectedChildDossier.latestGrowth?.heightCm || selectedChildDossier.child?.latestHeightCm} cm</span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                    <span className="text-[10px] font-bold text-amber-700 uppercase block">MUAC Tape</span>
                    <span className="text-base font-black text-slate-900">{selectedChildDossier.latestGrowth?.muacCm || 12.0} cm</span>
                  </div>
                  <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
                    <span className="text-[10px] font-bold text-rose-700 uppercase block">Hemoglobin</span>
                    <span className="text-base font-black text-slate-900">{selectedChildDossier.latestGrowth?.hemoglobinGdl || 10.5} g/dL</span>
                  </div>
                </div>
              </div>

              {/* Growth History Timeline */}
              <div>
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">
                  Growth Assessment History
                </h4>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {selectedChildDossier.growthHistory?.length === 0 ? (
                    <p className="text-xs text-slate-400">No previous checkups recorded.</p>
                  ) : (
                    selectedChildDossier.growthHistory?.map((g: any, i: number) => (
                      <div key={i} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">📅 {g.recordedAt?.substring(0, 10)}</span>
                        <span>{g.weightKg} kg • {g.heightCm} cm • MUAC {g.muacCm} cm</span>
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          g.riskCategory === 'RED' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {g.riskCategory}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Action Buttons in Dossier */}
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    onOpenPrescriptionForChild(selectedChildDossier.child);
                    setSelectedChildDossier(null);
                  }}
                  className="flex-1 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Write Digital Prescription</span>
                </button>
                <button
                  onClick={() => {
                    onOpenAiRisk(selectedChildDossier.child);
                    setSelectedChildDossier(null);
                  }}
                  className="flex-1 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Clinical AI Decision Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
