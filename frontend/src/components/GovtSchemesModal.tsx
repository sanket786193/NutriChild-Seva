import React, { useState, useEffect } from 'react';
import {
  FileText, X, Volume2, CheckCircle2, Gift,
  Building, ExternalLink, ShieldCheck, ArrowRight
} from 'lucide-react';
import type { GovtScheme, LanguageCode } from '../types';
import { SpeechEngine } from '../services/speech';
import { api } from '../services/api';

interface GovtSchemesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
}

export const GovtSchemesModal: React.FC<GovtSchemesModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  const [schemes, setSchemes] = useState<GovtScheme[]>([]);

  useEffect(() => {
    api.getGovtSchemes().then(data => {
      if (data && data.length > 0) {
        setSchemes(data);
      } else {
        // High-quality English fallback schemes
        setSchemes([
          {
            id: 1,
            code: 'POSHAN_2',
            name: 'POSHAN Abhiyaan 2.0 (National Nutrition Mission)',
            targetCategory: 'Children 0-6 Years & Lactating Mothers',
            description: 'Central flagship nutrition initiative providing specialized micronutrient monitoring, growth tracking, and acute malnutrition interventions.',
            foodAssistance: 'Fortified Take-Home Ration (THR) & Supplementary Morning Snacks',
            eligibilityCriteria: 'All rural children registered under Anganwadi Services',
          },
          {
            id: 2,
            code: 'PMMVY',
            name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
            targetCategory: 'Pregnant Women & Lactating Mothers',
            description: 'Direct Benefit Transfer (DBT) cash incentive providing wage compensation and maternal nutrition support for institutional delivery.',
            financialAssistance: '₹5,000 in direct bank transfers across 2 tranches',
            eligibilityCriteria: 'First live birth with ANC registration at Sub-Centre',
          },
          {
            id: 3,
            code: 'AMB',
            name: 'Anemia Mukt Bharat (AMB Strategy)',
            targetCategory: 'Infants, Adolescents & Women',
            description: 'Life-cycle prophylactic iron and folic acid (IFA) supplementation, biannual deworming, and digital hemoglobin screening.',
            foodAssistance: 'Weekly IFA Syrup drops + Albendazole 200mg deworming tablets',
            eligibilityCriteria: 'Universal coverage across all Anganwadi centers',
          },
          {
            id: 4,
            code: 'NRC',
            name: 'Nutrition Rehabilitation Centre (NRC) Inpatient Protocol',
            targetCategory: 'Severe Acute Malnutrition (SAM) with Medical Complications',
            description: 'Free 14-day inpatient clinical stabilization, therapeutic milk formulas (F-75 & F-100), and maternal wage loss compensation.',
            financialAssistance: 'Free treatment + ₹150/day maternal wage incentive + 108 transport',
            eligibilityCriteria: 'MUAC < 11.5 cm or Bilateral Pitting Edema confirmed by MO',
          }
        ]);
      }
    });
  }, []);

  const handleSpeakSchemes = () => {
    const text = `National healthcare and nutrition schemes: POSHAN Abhiyaan 2.0, Pradhan Mantri Matru Vandana Yojana, Anemia Mukt Bharat, and Nutrition Rehabilitation Centres. Consult your Anganwadi officer for registration.`;
    SpeechEngine.speak(text, 'en');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-8 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Gift size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">
                Government Healthcare &amp; Nutrition Schemes
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                National Health Mission &amp; Poshan Abhiyaan Entitlements
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakSchemes}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="Voice Readout"
            >
              <Volume2 size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {schemes.map((s) => (
            <div
              key={s.id}
              className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:border-black dark:hover:border-zinc-500 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full inline-block">
                    {s.targetCategory}
                  </span>
                  <h4 className="text-base font-black text-zinc-950 dark:text-white mt-1.5 leading-tight">
                    {s.name}
                  </h4>
                </div>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                {s.description}
              </p>

              {/* Benefits Box */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
                <Gift size={16} className="text-zinc-950 dark:text-white shrink-0" />
                <span>Benefit: <strong>{s.financialAssistance || s.foodAssistance}</strong></span>
              </div>

              {/* Eligibility */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 font-medium flex items-center justify-between">
                <span>Eligibility: {s.eligibilityCriteria}</span>
                <span className="font-bold text-zinc-950 dark:text-white">Verify at Anganwadi →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
            <ShieldCheck size={16} className="text-zinc-950 dark:text-white" />
            <span>Ministry of Women &amp; Child Development (MWCD)</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition shadow-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
