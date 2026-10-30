import React, { useState } from 'react';
import {
  Camera, Upload, Sparkles, X, Volume2, CheckCircle2,
  AlertCircle, Flame, Dumbbell, Loader2, ShieldCheck,
  ArrowRight
} from 'lucide-react';
import type { LanguageCode } from '../types';
import { SpeechEngine } from '../services/speech';
import { api } from '../services/api';

interface FoodPlateScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
}

export const FoodPlateScannerModal: React.FC<FoodPlateScannerModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  const [selectedPreset, setSelectedPreset] = useState<string>('Khichdi with Moringa Leaves');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const mealPresets = [
    { name: 'Moringa Leaf Lentil Khichdi', desc: 'Rice, moong dal, drumstick leaves, and 1 tsp pure cow ghee', icon: '🍲' },
    { name: 'Finger Millet (Ragi Ganji) with Jaggery', desc: 'Fortified ragi porridge, whole milk, and iron-rich jaggery', icon: '🌾' },
    { name: 'Boiled Egg with Whole Wheat Roti', desc: '1 whole hard-boiled egg with soft chapati', icon: '🥚' },
    { name: 'POSHAN Fortified Take-Home Ration Halwa', desc: 'Micronutrient-dense roasted premix supplementary sweetmeal', icon: '🥣' },
    { name: 'Watery Dal with Plain White Rice', desc: 'Low nutrient density watery broth (Warning: Energy deficit)', icon: '⚠️' }
  ];

  const handleAnalyze = async (mealName?: string) => {
    const target = mealName || selectedPreset;
    setAnalyzing(true);
    setAnalysisResult(null);

    const result = await api.analyzeFoodPlate(target, 'Rural child meal plate');
    setAnalysisResult(result);
    setAnalyzing(false);

    const speech = `Meal Analysis for ${result.foodAnalyzed}. Estimated Energy: ${result.estimatedCaloriesKcal} calories. Protein: ${result.estimatedProteinGrams} grams. Clinical suggestion: ${result.dietaryImprovements ? result.dietaryImprovements[0] : ''}`;
    SpeechEngine.speak(speech, 'en');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-8 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Camera size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">
                AI Dietary Plate &amp; Nutrition Analyzer
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Computer Vision &amp; Macro-Nutrient Biomarker Screening
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Camera Upload Mock Area */}
          <div className="border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center mx-auto shadow-md">
              <Camera size={24} />
            </div>
            <h4 className="text-base font-black text-zinc-950 dark:text-white">
              Scan Child’s Meal Plate
            </h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto font-normal">
              Capture a photo using device camera or choose from standardized Anganwadi nutrition presets below.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleAnalyze()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Sparkles size={15} />
                <span>Run AI Plate Analysis</span>
              </button>
            </div>
          </div>

          {/* Preset Meal Options */}
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-2.5">
              Or Select Common Anganwadi Meal:
            </span>
            <div className="space-y-2">
              {mealPresets.map((m, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedPreset(m.name);
                    handleAnalyze(m.name);
                  }}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                    selectedPreset === m.name
                      ? 'bg-zinc-100 dark:bg-zinc-800 border-black dark:border-white shadow-sm'
                      : 'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className="text-2xl w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-xs shrink-0">
                    {m.icon}
                  </span>
                  <div className="flex-1">
                    <span className="text-xs font-black text-zinc-950 dark:text-white block">{m.name}</span>
                    <span className="text-[11px] text-zinc-500">{m.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Loading Indicator */}
          {analyzing && (
            <div className="p-6 text-center space-y-2 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <Loader2 size={24} className="animate-spin text-zinc-950 dark:text-white mx-auto" />
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">AI Vision Engine analyzing food density and macronutrients...</p>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                    AI Nutritional Biomarkers
                  </span>
                  <h4 className="text-lg font-black text-zinc-950 dark:text-white">{analysisResult.foodAnalyzed}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const speech = `Meal Analysis for ${analysisResult.foodAnalyzed}. Energy: ${analysisResult.estimatedCaloriesKcal} calories. Protein: ${analysisResult.estimatedProteinGrams} grams.`;
                    SpeechEngine.speak(speech, 'en');
                  }}
                  className="p-2.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white shadow-xs cursor-pointer"
                  title="Voice Readout"
                >
                  <Volume2 size={16} />
                </button>
              </div>

              {/* Nutrients Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-3">
                  <Flame size={20} className="text-amber-500 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 block uppercase">Energy Content</span>
                    <span className="text-base font-black text-zinc-950 dark:text-white">{analysisResult.estimatedCaloriesKcal} kcal</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-3">
                  <Dumbbell size={20} className="text-zinc-950 dark:text-white shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 block uppercase">Bio-Protein</span>
                    <span className="text-base font-black text-zinc-950 dark:text-white">{analysisResult.estimatedProteinGrams} g</span>
                  </div>
                </div>
              </div>

              {/* Key Nutrients */}
              <div>
                <span className="text-xs font-bold text-zinc-500 block mb-1.5">Identified Nutrients:</span>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.keyNutrientsPresent.map((nut: string, i: number) => (
                    <span key={i} className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      ✓ {nut}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clinical Advice */}
              <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-1.5">
                <span className="text-xs font-black text-zinc-950 dark:text-white flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-amber-500" />
                  Clinical Dietary Advice:
                </span>
                <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-1 list-disc list-inside">
                  {analysisResult.dietaryImprovements.map((imp: string, i: number) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
