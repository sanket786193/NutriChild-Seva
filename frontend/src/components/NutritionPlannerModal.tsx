import React, { useState, useEffect } from 'react';
import {
  Apple, X, Volume2, AlertTriangle, CheckCircle2,
  Flame, Dumbbell, ShieldCheck, Printer, ArrowRight
} from 'lucide-react';
import type { Child, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SpeechEngine } from '../services/speech';
import { api } from '../services/api';

interface NutritionPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child | null;
  language: LanguageCode;
}

export const NutritionPlannerModal: React.FC<NutritionPlannerModalProps> = ({
  isOpen,
  onClose,
  child,
  language
}) => {
  if (!isOpen || !child) return null;

  const t = TRANSLATIONS[language] || TRANSLATIONS.hi;
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    if (child && child.id) {
      api.getNutritionPlan(child.id).then(setPlan);
    }
  }, [child]);

  const handleSpeakPlan = () => {
    const text = `Dietary prescription for ${child.fullName}. Daily energy target: 1,250 kilocalories and 28 grams of protein. Recommended local nutrition: Ragi Porridge, Moringa Khichdi with Ghee, Boiled Egg, and Anganwadi Take-Home Ration.`;
    SpeechEngine.speak(text, language);
  };

  const mealCards = [
    { name: 'Ragi Ganji (Finger Millet Porridge)', desc: 'Rich in bio-available calcium and iron for skeletal growth', icon: '🌾', tags: ['Iron', 'Calcium', '500 kcal'] },
    { name: 'Moringa Leaf Khichdi with Ghee', desc: 'Moong lentils with fresh drumstick greens and pure cow ghee', icon: '🍲', tags: ['Vitamin A', 'Calorie-Dense'] },
    { name: 'Boiled Egg or Sprouted Bengal Gram', desc: 'Complete amino acid profile for muscle mass synthesis', icon: '🥚', tags: ['14g Protein', 'Zinc'] },
    { name: 'POSHAN Fortified Take-Home Ration', desc: 'Government-distributed micro-nutrient roasted flour pre-mix', icon: '🥣', tags: ['Govt Entitlement', 'Free'] },
    { name: 'Fresh Papaya & Banana Puree', desc: 'Dietary fiber and ascorbic acid to boost intestinal iron absorption', icon: '🍌', tags: ['Vitamin C', 'Gut Health'] }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-8 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Apple size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">
                POSHAN Dietary Nutrition Plan
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Culturally Adapted Child Nutrition · {child.fullName} (UHID: {child.uhid})
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

          {/* Daily Energy Target Card */}
          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                Daily Dietary Prescription
              </span>
              <strong className="text-2xl font-black text-zinc-950 dark:text-white">
                1,250 kcal · 28g Protein
              </strong>
              <p className="text-xs text-zinc-500 mt-0.5">5 Feeding Cycles per Day (3 Meals + 2 Snacks)</p>
            </div>

            <button
              onClick={handleSpeakPlan}
              className="p-2.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:scale-105 transition shadow-xs cursor-pointer"
              title="Voice Readout"
            >
              <Volume2 size={16} />
            </button>
          </div>

          {/* Meal List */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {mealCards.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950 dark:text-white leading-tight">
                      {m.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 shrink-0 justify-end">
                  {m.tags.map((t, ti) => (
                    <span key={ti} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
              <ShieldCheck size={16} className="text-zinc-950 dark:text-white" />
              <span>National Institute of Nutrition (NIN) Guidelines</span>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <Printer size={15} />
              <span>Print Diet Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
