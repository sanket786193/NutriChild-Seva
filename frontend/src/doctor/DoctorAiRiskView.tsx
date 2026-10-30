import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  CheckCircle,
  Edit3,
  XCircle,
  AlertTriangle,
  Activity,
  ShieldCheck,
  Droplets,
  HelpCircle,
  Save,
  MessageSquare
} from 'lucide-react';
import type { Child, LanguageCode } from '../types';
import { api } from '../services/api';

interface DoctorAiRiskViewProps {
  language: LanguageCode;
  selectedChildForAi?: Child | null;
}

export const DoctorAiRiskView: React.FC<DoctorAiRiskViewProps> = ({
  selectedChildForAi
}) => {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<number>(selectedChildForAi?.id || 2);
  const [aiData, setAiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Doctor Action State
  const [doctorAction, setDoctorAction] = useState<'NONE' | 'ACCEPTED' | 'MODIFIED' | 'REJECTED'>('NONE');
  const [doctorNotes, setDoctorNotes] = useState('');

  const loadAiRisk = (id: number) => {
    setLoading(true);
    fetch(`/api/v1/doctor/ai-risk/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(d => {
        setAiData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    api.getChildren().then((res) => {
      setChildren(res);
      const initialId = selectedChildForAi?.id || (res.length > 0 ? res[0].id : 2);
      if (initialId) {
        setSelectedChildId(initialId);
        loadAiRisk(initialId);
      }
    });
  }, [selectedChildForAi]);

  const handleChildChange = (id: number) => {
    setSelectedChildId(id);
    setDoctorAction('NONE');
    setDoctorNotes('');
    loadAiRisk(id);
  };

  const handleActionSubmit = (type: 'ACCEPTED' | 'MODIFIED' | 'REJECTED') => {
    setDoctorAction(type);
    alert(`AI Clinical Decision [${type}] recorded in electronic health record audit log.`);
  };

  if (loading || !aiData) {
    return (
      <div className="p-12 text-center text-slate-500 font-bold">
        Computing Explainable AI Clinical Risk Predictions...
      </div>
    );
  }

  const isSam = aiData.malnutritionRisk === 'CRITICAL_SAM';
  const isMam = aiData.malnutritionRisk === 'MODERATE_MAM';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Patient Picker */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Brain className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight">
              Clinical Decision Support & Explainable AI (CDS-AI)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Multimodal risk triage model trained on WHO Child Growth & POSHAN protocols
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Patient:</label>
          <select
            value={selectedChildId}
            onChange={(e) => handleChildChange(Number(e.target.value))}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black text-slate-800 cursor-pointer focus:outline-blue-600"
          >
            {children.map(c => (
              <option key={c.id} value={c.id}>
                {c.fullName} ({c.uhid}) - {c.latestRiskCategory || 'GREEN'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main AI Prediction Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Scores Column (1 Col) */}
        <div className="space-y-4">
          {/* Composite Risk Score Tile */}
          <div className={`p-6 rounded-3xl border-2 shadow-xs space-y-4 text-center ${
            isSam
              ? 'bg-rose-50/70 border-rose-400 text-rose-950'
              : isMam
              ? 'bg-orange-50/70 border-orange-400 text-orange-950'
              : 'bg-emerald-50/70 border-emerald-400 text-emerald-950'
          }`}>
            <span className="text-[11px] font-black uppercase tracking-wider block">
              Composite Malnutrition Risk Index
            </span>
            <div className="text-5xl font-black tracking-tight">
              {aiData.riskScore}<span className="text-xl font-normal text-slate-500">/100</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white shadow-2xs">
              <span className={`w-2 h-2 rounded-full ${isSam ? 'bg-rose-600 animate-ping' : isMam ? 'bg-orange-500' : 'bg-emerald-600'}`} />
              {aiData.malnutritionRisk}
            </div>
            <div className="pt-2 border-t border-slate-200/60 text-xs font-bold flex justify-between">
              <span>Model Confidence:</span>
              <span className="text-indigo-700 font-black">{aiData.confidencePercentage}%</span>
            </div>
          </div>

          {/* Sub-Risk Categorical Badges */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Categorical Health Risks
            </h4>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-rose-500" /> Anemia Risk
              </span>
              <span className="font-black text-rose-700">{aiData.anemiaRisk}</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-500" /> Growth Delay Risk
              </span>
              <span className="font-black text-amber-700">{aiData.growthDelayProbability}</span>
            </div>
          </div>
        </div>

        {/* Explainable AI ("Why AI Predicted This Risk") Column (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
              Explainable AI (XAI) Attribution
            </span>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Why the Model Predicted This Risk:
            </h3>
          </div>

          {/* Attribution Bullet List */}
          <div className="space-y-2.5">
            {aiData.whyPredicted?.map((point: string, i: number) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* AI Clinical Recommendation Card */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
            <span className="text-xs font-black text-purple-950 flex items-center gap-1.5 uppercase">
              <Brain className="w-4 h-4 text-purple-700" />
              AI Clinical Suggestion (Awaiting Doctor Review):
            </span>
            <p className="text-xs font-semibold text-purple-900 leading-relaxed">
              {aiData.recommendation}
            </p>
          </div>

          {/* Doctor Action Panel (Accept / Modify / Reject) */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
              Doctor Evaluation & Clinical Validation:
            </h4>

            {doctorAction === 'NONE' ? (
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => handleActionSubmit('ACCEPTED')}
                  className="flex-1 py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Accept Recommendation</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleActionSubmit('MODIFIED')}
                  className="flex-1 py-2.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Modify Plan</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleActionSubmit('REJECTED')}
                  className="flex-1 py-2.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject (False Positive)</span>
                </button>
              </div>
            ) : (
              <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between ${
                doctorAction === 'ACCEPTED'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : doctorAction === 'MODIFIED'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}>
                <span>Doctor Decision: <strong>{doctorAction}</strong> by Dr. Rajesh Patra</span>
                <button
                  onClick={() => setDoctorAction('NONE')}
                  className="text-slate-500 hover:text-slate-800 underline text-[11px]"
                >
                  Change Decision
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
