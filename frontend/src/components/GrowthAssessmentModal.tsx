import React, { useState } from 'react';
import {
  Scale, Ruler, Activity, Droplets, AlertOctagon,
  CheckCircle, X, Volume2, Save, Loader2, ShieldCheck,
  AlertTriangle, ArrowRight, HeartPulse
} from 'lucide-react';
import type { Child, GrowthRecord, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SpeechEngine } from '../services/speech';
import { api } from '../services/api';

interface GrowthAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child | null;
  language: LanguageCode;
  onSaved: (record: GrowthRecord) => void;
}

export const GrowthAssessmentModal: React.FC<GrowthAssessmentModalProps> = ({
  isOpen, onClose, child, language, onSaved
}) => {
  if (!isOpen || !child) return null;

  const t = TRANSLATIONS[language] || TRANSLATIONS.hi;

  const [weight,     setWeight]     = useState<number>(child.latestWeightKg  || 9.0);
  const [height,     setHeight]     = useState<number>(child.latestHeightCm  || 78.0);
  const [muac,       setMuac]       = useState<number>(child.latestMuacCm    || 13.0);
  const [hemoglobin, setHemoglobin] = useState<number>(11.0);
  const [edema,      setEdema]      = useState<boolean>(false);
  const [isSaving,   setIsSaving]   = useState(false);

  // Live WHO risk computation
  let liveRisk: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED' = 'GREEN';
  let liveStatus = 'Normal Growth (Optimal Nutrition)';

  if (edema || muac < 11.5 || hemoglobin < 7.0) {
    liveRisk   = 'RED';
    liveStatus = 'Critical SAM — Severe Acute Malnutrition (Immediate NRC Referral Required)';
  } else if (muac < 12.5 || hemoglobin < 10.0) {
    liveRisk   = 'ORANGE';
    liveStatus = 'Moderate MAM — Moderate Acute Malnutrition (THR Supplementation)';
  } else if (hemoglobin < 11.0) {
    liveRisk   = 'YELLOW';
    liveStatus = 'Mild Anaemia — Supplement with Iron-Folic Acid';
  }

  const handleSpeakGuidance = () => {
    let guide = `Child anthropometry recorded. Weight: ${weight} kg, Height: ${height} cm, MUAC: ${muac} cm. Status: ${liveStatus}.`;
    SpeechEngine.speak(guide, language);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const rec = await api.recordGrowth({
        childId: child.id,
        weightKg: Number(weight),
        heightCm: Number(height),
        muacCm: Number(muac),
        hemoglobinGdl: Number(hemoglobin),
        edemaPresent: edema,
        recordedByRole: 'ASHA',
        recordedByName: 'Health Officer'
      });
      onSaved(rec);
      onClose();
    } catch (e) {
      console.error(e);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-8 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Scale size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">
                WHO Anthropometric Growth Evaluation
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Standardized Z-Score telemetry · {child.fullName} (UHID: {child.uhid})
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

          {/* Live Dynamic Status Banner */}
          <div
            className={`p-5 rounded-3xl border flex items-center justify-between gap-4 transition-colors ${
              liveRisk === 'RED'
                ? 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-200'
                : liveRisk === 'ORANGE'
                ? 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-200'
                : liveRisk === 'YELLOW'
                ? 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/40 dark:border-yellow-900 dark:text-yellow-200'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {liveRisk === 'RED' ? (
                <AlertOctagon size={24} className="text-rose-600 animate-pulse shrink-0" />
              ) : liveRisk === 'ORANGE' || liveRisk === 'YELLOW' ? (
                <AlertTriangle size={24} className="text-amber-600 shrink-0" />
              ) : (
                <CheckCircle size={24} className="text-emerald-600 shrink-0" />
              )}
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">
                  LIVE WHO CLASSIFICATION
                </span>
                <strong className="text-xs sm:text-sm font-black">{liveStatus}</strong>
              </div>
            </div>

            <button
              onClick={handleSpeakGuidance}
              className="p-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:scale-105 transition shadow-xs cursor-pointer shrink-0"
              title="Voice Guidance"
            >
              <Volume2 size={16} />
            </button>
          </div>

          {/* Input Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Weight */}
            <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Weight (kg)</label>
                <span className="text-lg font-black text-zinc-950 dark:text-white font-mono">{weight.toFixed(1)} kg</span>
              </div>
              <input
                type="range"
                min={2.0}
                max={25.0}
                step={0.1}
                value={weight}
                onChange={e => setWeight(parseFloat(e.target.value))}
                className="w-full accent-black dark:accent-white cursor-pointer"
              />
              <span className="text-[11px] text-zinc-400 block">WHO Target Range: 8.5 kg - 12.4 kg</span>
            </div>

            {/* Height */}
            <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Height (cm)</label>
                <span className="text-lg font-black text-zinc-950 dark:text-white font-mono">{height.toFixed(1)} cm</span>
              </div>
              <input
                type="range"
                min={45.0}
                max={120.0}
                step={0.5}
                value={height}
                onChange={e => setHeight(parseFloat(e.target.value))}
                className="w-full accent-black dark:accent-white cursor-pointer"
              />
              <span className="text-[11px] text-zinc-400 block">WHO Stunting Cutoff: &lt; 74.0 cm</span>
            </div>

            {/* MUAC */}
            <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">MUAC Arm Circumference</label>
                <span className="text-lg font-black text-zinc-950 dark:text-white font-mono">{muac.toFixed(1)} cm</span>
              </div>
              <input
                type="range"
                min={8.0}
                max={18.0}
                step={0.1}
                value={muac}
                onChange={e => setMuac(parseFloat(e.target.value))}
                className="w-full accent-black dark:accent-white cursor-pointer"
              />
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-rose-600">&lt;11.5cm (SAM)</span>
                <span className="text-amber-600">11.5-12.5cm (MAM)</span>
                <span className="text-emerald-600">&gt;12.5cm (Normal)</span>
              </div>
            </div>

            {/* Hemoglobin */}
            <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Hemoglobin (g/dL)</label>
                <span className="text-lg font-black text-zinc-950 dark:text-white font-mono">{hemoglobin.toFixed(1)} g/dL</span>
              </div>
              <input
                type="range"
                min={4.0}
                max={16.0}
                step={0.1}
                value={hemoglobin}
                onChange={e => setHemoglobin(parseFloat(e.target.value))}
                className="w-full accent-black dark:accent-white cursor-pointer"
              />
              <span className="text-[11px] text-zinc-400 block">Anaemia Target: &gt; 11.0 g/dL</span>
            </div>
          </div>

          {/* Bilateral Pitting Edema Toggle */}
          <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <strong className="text-sm font-black text-zinc-950 dark:text-white block">
                Bilateral Pitting Edema (Kwashiorkor)
              </strong>
              <p className="text-xs text-zinc-500">Press thumb on dorsum of both feet for 3 seconds.</p>
            </div>
            <button
              type="button"
              onClick={() => setEdema(e => !e)}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition cursor-pointer ${
                edema
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {edema ? 'Edema Present (+)' : 'No Edema'}
            </button>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              <span>{isSaving ? 'Synchronizing Record...' : 'Save & Certify Growth Record'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
