import React, { useState } from 'react';
import {
  UserPlus, X, Mic, Calendar, Scale, MapPin,
  Phone, Save, Loader2, ShieldCheck, ArrowRight
} from 'lucide-react';
import type { Child, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SpeechEngine } from '../services/speech';
import { api } from '../services/api';

interface RegisterChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  onChildRegistered: (child: Child) => void;
}

export const RegisterChildModal: React.FC<RegisterChildModalProps> = ({
  isOpen,
  onClose,
  language,
  onChildRegistered
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language] || TRANSLATIONS.hi;

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(new Date().toISOString().split('T')[0]);
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [birthWeight, setBirthWeight] = useState(3.0);
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [village, setVillage] = useState('Kalyanpur');
  const [anganwadi, setAnganwadi] = useState('Kalyanpur AWC-1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVoiceInputName = () => {
    SpeechEngine.startListening(
      language,
      (transcript) => {
        setFullName(transcript);
        SpeechEngine.speak(`Name recorded: ${transcript}`, language);
      },
      (err) => console.warn(err)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setIsSubmitting(true);
    const newChild = await api.registerChild({
      fullName,
      dateOfBirth: dob,
      gender,
      birthWeightKg: Number(birthWeight),
      parentName: parentName || 'Mother',
      parentPhone: parentPhone || '9876500000',
      village,
      anganwadiCenter: anganwadi
    });

    setIsSubmitting(false);
    SpeechEngine.speak(`${fullName} registered successfully into National Health Grid.`, language);
    onChildRegistered(newChild);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-8 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
              <UserPlus size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">
                New Child Enrollment
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                National Health Mission &amp; Poshan Abhiyaan Registry
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {/* Child Full Name with Voice Mic */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1.5">
              Child Full Name *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Aarav Kumar"
                className="flex-1 px-4 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm font-bold focus:outline-hidden focus:border-black"
              />
              <button
                type="button"
                onClick={handleVoiceInputName}
                className="p-3.5 rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:scale-105 transition shadow-xs cursor-pointer"
                title="Voice Dictate Name"
              >
                <Mic size={18} />
              </button>
            </div>
          </div>

          {/* Gender Buttons */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1.5">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('MALE')}
                className={`py-3.5 rounded-2xl border text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  gender === 'MALE'
                    ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 shadow-md'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <span>👦 Male Child</span>
              </button>
              <button
                type="button"
                onClick={() => setGender('FEMALE')}
                className={`py-3.5 rounded-2xl border text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  gender === 'FEMALE'
                    ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 shadow-md'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <span>👧 Female Child</span>
              </button>
            </div>
          </div>

          {/* Date of Birth & Birth Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-bold focus:outline-hidden focus:border-black"
              />
            </div>
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1.5">
                Birth Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="6.0"
                value={birthWeight}
                onChange={(e) => setBirthWeight(parseFloat(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-bold focus:outline-hidden focus:border-black"
              />
            </div>
          </div>

          {/* Parent/Guardian Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1.5">
                Parent / Guardian Name
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Sunita Devi"
                className="w-full px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-bold focus:outline-hidden focus:border-black"
              />
            </div>
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1.5">
                Mobile Number (SMS Alerts)
              </label>
              <input
                type="tel"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-bold focus:outline-hidden focus:border-black"
              />
            </div>
          </div>

          {/* Village & Anganwadi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1.5">
                Village / Ward
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-bold focus:outline-hidden focus:border-black"
              />
            </div>
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-1.5">
                Assigned Anganwadi Center
              </label>
              <input
                type="text"
                value={anganwadi}
                onChange={(e) => setAnganwadi(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-bold focus:outline-hidden focus:border-black"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              <span>{isSubmitting ? 'Registering Child...' : 'Enroll in National Health Grid'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
