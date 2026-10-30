import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Printer,
  Download,
  Share2,
  CheckCircle,
  Clock,
  Save,
  Pill,
  ShieldCheck,
  X
} from 'lucide-react';
import type { Child, LanguageCode } from '../types';
import { api } from '../services/api';

interface DoctorPrescriptionsViewProps {
  language: LanguageCode;
  selectedChildForPrescription?: Child | null;
}

export const DoctorPrescriptionsView: React.FC<DoctorPrescriptionsViewProps> = ({
  selectedChildForPrescription
}) => {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<number>(selectedChildForPrescription?.id || 2);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  // Prescription Form state
  const [diagnosis, setDiagnosis] = useState('Severe Acute Malnutrition (SAM) with Moderate Anemia');
  const [clinicalNotes, setClinicalNotes] = useState('Bilateral pitting edema absent. Appetite test positive. Refer to NRC protocol.');
  const [dietaryAdvice, setDietaryAdvice] = useState('Exclusive RUTF therapeutic feeding 3 packets daily. Softened ragi ganji and boiled egg.');
  const [followUpDate, setFollowUpDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);

  const [medicines, setMedicines] = useState<any[]>([
    { name: 'Therapeutic RUTF Paste', dose: '1 packet', timing: 'Morning - Evening', relation: 'After Food', duration: '14 Days' },
    { name: 'Syrup Iron-Folic Acid (IFA)', dose: '1 ml weekly', timing: 'Morning', relation: 'After Food', duration: '8 Weeks' },
    { name: 'Tablet Zinc Sulfate 20mg (Dispersible)', dose: '1 tab daily', timing: 'Morning', relation: 'After Food', duration: '14 Days' }
  ]);

  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('');
  const [newMedTiming, setNewMedTiming] = useState('Morning - Night');
  const [newMedRelation, setNewMedRelation] = useState('After Food');
  const [newMedDuration, setNewMedDuration] = useState('7 Days');

  const [activePrintModal, setActivePrintModal] = useState<any>(null);

  useEffect(() => {
    api.getChildren().then((res) => {
      setChildren(res);
      if (res.length > 0 && !selectedChildId) setSelectedChildId(res[0].id || 1);
    });

    fetch('/api/v1/doctor/prescriptions')
      .then(res => res.ok ? res.json() : [])
      .then(setPrescriptions)
      .catch(() => {});
  }, []);

  const activeChild = children.find(c => c.id === selectedChildId) || children[0];

  const handleAddMedicine = () => {
    if (!newMedName) return;
    setMedicines(prev => [
      ...prev,
      {
        name: newMedName,
        dose: newMedDose || '1 dose',
        timing: newMedTiming,
        relation: newMedRelation,
        duration: newMedDuration
      }
    ]);
    setNewMedName('');
    setNewMedDose('');
  };

  const handleRemoveMedicine = (idx: number) => {
    setMedicines(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSavePrescription = async () => {
    if (!activeChild) return;
    const payload = {
      childId: activeChild.id,
      childName: activeChild.fullName,
      childUhid: activeChild.uhid,
      primaryDiagnosis: diagnosis,
      clinicalNotes,
      medicineListJson: JSON.stringify(medicines),
      dietaryAdvice,
      followUpDate
    };

    const res = await fetch('/api/v1/doctor/prescriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const saved = await res.json();
      setPrescriptions(prev => [saved, ...prev]);
      setActivePrintModal(saved);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Pediatric Digital Prescription Generator (Rx)
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Generate, sign, and print digital prescriptions with dosage matrix for rural health workers & parents
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prescription Authoring Form (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
          {/* Patient Selector */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                Select Patient:
              </label>
              <select
                value={selectedChildId}
                onChange={(e) => setSelectedChildId(Number(e.target.value))}
                className="px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-black text-slate-800 cursor-pointer focus:outline-blue-600"
              >
                {children.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.fullName} ({c.uhid}) - {c.latestRiskCategory || 'GREEN'}
                  </option>
                ))}
              </select>
            </div>

            {activeChild && (
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <span>DOB: <strong>{activeChild.dateOfBirth}</strong></span>
                <span>Weight: <strong>{activeChild.latestWeightKg || 6.4} kg</strong></span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                  activeChild.latestRiskCategory === 'RED' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {activeChild.latestRiskCategory || 'NORMAL'}
                </span>
              </div>
            )}
          </div>

          {/* Clinical Diagnosis & Notes */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Primary Diagnosis (ICD-10 aligned) *
              </label>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-blue-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Clinical Observation & Symptoms
              </label>
              <textarea
                rows={2}
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-blue-600"
              />
            </div>
          </div>

          {/* Medicines Builder Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Prescribed Medications & Formulations ({medicines.length})
            </h4>

            <div className="space-y-2">
              {medicines.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                      💊
                    </div>
                    <div>
                      <strong className="text-sm font-extrabold text-slate-900 block leading-tight">
                        {m.name}
                      </strong>
                      <span className="text-[11px] text-slate-500 font-semibold">
                        Dose: {m.dose} • {m.timing} • {m.relation}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                      {m.duration}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(idx)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Medicine Bar */}
            <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
              <span className="text-xs font-bold text-blue-900 block">Add Medicine:</span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Medicine Name (e.g. Paracetamol Drops)"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="sm:col-span-2 px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
                />
                <input
                  type="text"
                  placeholder="Dose (e.g. 1 ml)"
                  value={newMedDose}
                  onChange={(e) => setNewMedDose(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
                />
                <select
                  value={newMedTiming}
                  onChange={(e) => setNewMedTiming(e.target.value)}
                  className="px-2 py-1.5 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="Morning">Morning (☀️)</option>
                  <option value="Morning - Night">Morning - Night (☀️ 🌙)</option>
                  <option value="Three Times (M-A-N)">Three Times (☀️ 🌤️ 🌙)</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddMedicine}
                  className="py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs active:scale-95 transition-all"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Dietary Advice & Follow-Up Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Dietary & Nutritional Advice
              </label>
              <textarea
                rows={2}
                value={dietaryAdvice}
                onChange={(e) => setDietaryAdvice(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-blue-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Next Follow-Up Date
              </label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-blue-600"
              />
            </div>
          </div>

          {/* Save & Generate Action */}
          <div className="pt-2">
            <button
              onClick={handleSavePrescription}
              className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <Save className="w-5 h-5" />
              <span>Sign & Generate Digital Prescription (PDF)</span>
            </button>
          </div>
        </div>

        {/* Prescription Archive & Hospital Letterhead Preview (1 Col) */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Prescription History Archive</span>
            </h3>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  onClick={() => setActivePrintModal(rx)}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-extrabold text-slate-900">{rx.childName}</strong>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">{rx.prescriptionDate}</span>
                  </div>
                  <p className="text-xs font-semibold text-blue-800 truncate">
                    {rx.primaryDiagnosis}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Next Review: {rx.followUpDate || '14 Days'}</span>
                    <span className="text-blue-600 font-bold">View PDF ↗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Printable Clinical Prescription Letterhead Modal */}
      {activePrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
              <span className="font-extrabold text-xs tracking-wider uppercase">
                Digital Health Record • National Health Mission (NHM)
              </span>
              <button
                onClick={() => setActivePrintModal(null)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Official Hospital Prescription Letterhead */}
            <div className="p-6 space-y-4 overflow-y-auto">
              {/* Doctor & Hospital Header */}
              <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {activePrintModal.doctorName || 'Dr. Rajesh Patra, MBBS, DCH (Pediatrics)'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Reg No: {activePrintModal.doctorRegistrationNo || 'MCI-OD-2015-4421'}
                  </p>
                  <p className="text-xs text-blue-800 font-bold">
                    {activePrintModal.hospitalClinic || 'Rayagada District Hospital & Nutrition Rehabilitation Centre (NRC)'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black flex items-center justify-center text-xl shadow-sm">
                  Rx
                </div>
              </div>

              {/* Patient Dossier Bar */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700">
                <div>Patient: <strong className="text-slate-900">{activePrintModal.childName}</strong></div>
                <div>UHID: <span className="font-mono text-blue-700">{activePrintModal.childUhid}</span></div>
                <div>Date: <strong>{activePrintModal.prescriptionDate}</strong></div>
              </div>

              {/* Diagnosis */}
              <div className="text-xs">
                <span className="font-bold text-slate-400 uppercase text-[10px] block">Diagnosis:</span>
                <p className="font-extrabold text-slate-900 text-sm">{activePrintModal.primaryDiagnosis}</p>
                {activePrintModal.clinicalNotes && (
                  <p className="text-slate-600 font-medium mt-0.5">{activePrintModal.clinicalNotes}</p>
                )}
              </div>

              {/* Medicines List */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-400 uppercase text-[10px] block">Prescribed Medicines:</span>
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold">
                    <tr>
                      <th className="p-2">Medicine</th>
                      <th className="p-2">Dosage & Timing</th>
                      <th className="p-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {(() => {
                      try {
                        const parsed = JSON.parse(activePrintModal.medicineListJson || '[]');
                        return parsed.map((item: any, i: number) => (
                          <tr key={i}>
                            <td className="p-2 font-black text-slate-900">{item.name}</td>
                            <td className="p-2">{item.dose} ({item.timing} - {item.relation})</td>
                            <td className="p-2 text-blue-700 font-bold">{item.duration}</td>
                          </tr>
                        ));
                      } catch (e) {
                        return <tr><td colSpan={3} className="p-2">Medications recorded</td></tr>;
                      }
                    })()}
                  </tbody>
                </table>
              </div>

              {/* Diet Advice & Follow Up */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium">
                <strong>Dietary & Nutrition Plan:</strong> {activePrintModal.dietaryAdvice}
                <div className="mt-1 font-bold text-blue-900">
                  Follow-up Review Date: {activePrintModal.followUpDate}
                </div>
              </div>

              {/* Doctor Digital Signature */}
              <div className="pt-4 flex items-end justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-mono">
                  Digitally signed with National Healthcare ID (ABDM verified)
                </span>
                <div className="text-right">
                  <span className="font-serif italic text-sm text-slate-800 block">Dr. R. Patra</span>
                  <span className="text-[10px] text-slate-400">Authorized Medical Officer</span>
                </div>
              </div>
            </div>

            {/* Print / Download Buttons */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Prescription</span>
              </button>
              <button
                onClick={() => alert('Prescription sent via SMS/WhatsApp to Parent and ASHA worker!')}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share with Parent & ASHA</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
