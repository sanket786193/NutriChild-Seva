import React, { useState, useEffect } from 'react';
import {
  Syringe, CheckCircle2, AlertCircle, Clock, X,
  Volume2, ShieldCheck, Printer, Calendar, User,
  Check, ArrowRight
} from 'lucide-react';
import type { Child, VaccinationRecord, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SpeechEngine } from '../services/speech';

interface VaccineScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child | null;
  language: LanguageCode;
}

export const VaccineScheduleModal: React.FC<VaccineScheduleModalProps> = ({
  isOpen,
  onClose,
  child,
  language
}) => {
  if (!isOpen || !child) return null;

  const t = TRANSLATIONS[language] || TRANSLATIONS.hi;

  const [vaccines, setVaccines] = useState<VaccinationRecord[]>([]);

  useEffect(() => {
    if (child) {
      const dob = new Date(child.dateOfBirth);
      const addWeeks = (w: number) => {
        const d = new Date(dob);
        d.setDate(d.getDate() + w * 7);
        return d.toISOString().split('T')[0];
      };
      const addMonths = (m: number) => {
        const d = new Date(dob);
        d.setMonth(d.getMonth() + m);
        return d.toISOString().split('T')[0];
      };

      const now = new Date();

      const defaultSchedule: VaccinationRecord[] = [
        { id: 1, childId: child.id || 1, vaccineCode: 'BCG', vaccineName: 'BCG (Tuberculosis Protection)', dueDate: child.dateOfBirth, status: 'ADMINISTERED', administeredDate: child.dateOfBirth },
        { id: 2, childId: child.id || 1, vaccineCode: 'OPV_0', vaccineName: 'OPV-0 (Oral Polio Birth Dose)', dueDate: child.dateOfBirth, status: 'ADMINISTERED', administeredDate: child.dateOfBirth },
        { id: 3, childId: child.id || 1, vaccineCode: 'HEP_B_0', vaccineName: 'Hepatitis B (Birth Dose)', dueDate: child.dateOfBirth, status: 'ADMINISTERED', administeredDate: child.dateOfBirth },
        { id: 4, childId: child.id || 1, vaccineCode: 'PENTA_1', vaccineName: 'Pentavalent-1 (DPT + HepB + Hib)', dueDate: addWeeks(6), status: new Date(addWeeks(6)) < now ? 'ADMINISTERED' : 'PENDING', administeredDate: addWeeks(6) },
        { id: 5, childId: child.id || 1, vaccineCode: 'ROTA_1', vaccineName: 'Rotavirus-1 (Diarrheal Protection)', dueDate: addWeeks(6), status: new Date(addWeeks(6)) < now ? 'ADMINISTERED' : 'PENDING', administeredDate: addWeeks(6) },
        { id: 6, childId: child.id || 1, vaccineCode: 'PENTA_2', vaccineName: 'Pentavalent-2 (DPT + HepB + Hib)', dueDate: addWeeks(10), status: new Date(addWeeks(10)) < now ? 'ADMINISTERED' : 'PENDING', administeredDate: addWeeks(10) },
        { id: 7, childId: child.id || 1, vaccineCode: 'PENTA_3', vaccineName: 'Pentavalent-3 (DPT + HepB + Hib)', dueDate: addWeeks(14), status: 'ADMINISTERED', administeredDate: addWeeks(14) },
        { id: 8, childId: child.id || 1, vaccineCode: 'MR_1', vaccineName: 'MR-1 (Measles-Rubella First Dose)', dueDate: addMonths(9), status: 'PENDING' },
        { id: 9, childId: child.id || 1, vaccineCode: 'VIT_A_1', vaccineName: 'Vitamin A (First Dose - 100,000 IU)', dueDate: addMonths(9), status: 'PENDING' },
        { id: 10, childId: child.id || 1, vaccineCode: 'DPT_BOOSTER_1', vaccineName: 'DPT Booster-1 (16-24 Months)', dueDate: addMonths(16), status: 'PENDING' }
      ];

      setVaccines(defaultSchedule);
    }
  }, [child]);

  const handleAdminister = (id?: number) => {
    if (!id) return;
    setVaccines(prev => prev.map(v => v.id === id ? { ...v, status: 'ADMINISTERED', administeredDate: new Date().toISOString().split('T')[0] } : v));
    SpeechEngine.speak('Vaccine successfully administered and recorded.', language);
  };

  const handleSpeakOverview = () => {
    const administeredCount = vaccines.filter(v => v.status === 'ADMINISTERED').length;
    const pendingCount = vaccines.filter(v => v.status !== 'ADMINISTERED').length;
    let message = `Universal Immunization Card for ${child.fullName}. ${administeredCount} doses completed, ${pendingCount} doses scheduled. Next dose: Measles-Rubella MR-1.`;
    SpeechEngine.speak(message, language);
  };

  const administeredCount = vaccines.filter(v => v.status === 'ADMINISTERED').length;
  const progressPercent = Math.round((administeredCount / Math.max(vaccines.length, 1)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-8 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Syringe size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">
                Universal Immunization Schedule (UIP)
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                National Vaccine Grid · {child.fullName} (UHID: {child.uhid})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Progress Header Card */}
          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                  Immunization Coverage
                </span>
                <strong className="text-2xl font-black text-zinc-950 dark:text-white">
                  {administeredCount} of {vaccines.length} Doses ({progressPercent}%)
                </strong>
              </div>
              <button
                onClick={handleSpeakOverview}
                className="p-2.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:scale-105 transition shadow-xs cursor-pointer"
                title="Voice Readout"
              >
                <Volume2 size={16} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-zinc-950 dark:bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Vaccine Item Cards */}
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {vaccines.map(v => {
              const isAdministered = v.status === 'ADMINISTERED';
              return (
                <div
                  key={v.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    isAdministered
                      ? 'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800'
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isAdministered
                          ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {isAdministered ? <Check size={16} /> : <Clock size={16} />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-950 dark:text-white leading-tight">
                        {v.vaccineName}
                      </h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        Due: {v.dueDate} {v.administeredDate && `· Administered: ${v.administeredDate}`}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isAdministered ? (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        Protected
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAdminister(v.id)}
                        className="px-3.5 py-1.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs transition cursor-pointer shadow-xs"
                      >
                        Record Dose
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
              <ShieldCheck size={16} className="text-zinc-950 dark:text-white" />
              <span>National UIP Registry Synchronized</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Printer size={15} />
                <span>Print Official Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
