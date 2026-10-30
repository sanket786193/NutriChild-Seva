import React, { useState } from 'react';
import {
  User,
  Shield,
  Clock,
  Sliders,
  Bell,
  Save,
  CheckCircle,
  Stethoscope,
  Building,
  Phone,
  Mail,
  FileBadge,
  Sparkles
} from 'lucide-react';
import type { LanguageCode } from '../types';

interface DoctorSettingsViewProps {
  language: LanguageCode;
}

export const DoctorSettingsView: React.FC<DoctorSettingsViewProps> = () => {
  const [name, setName] = useState('Dr. Priya Sharma');
  const [qualifications, setQualifications] = useState('MBBS, DCH (Pediatrics)');
  const [regNo, setRegNo] = useState('MCI-2018-98421');
  const [facility, setFacility] = useState('Community Health Centre (CHC) Barwani');
  const [email, setEmail] = useState('dr.priya.sharma@health.mp.gov.in');
  const [phone, setPhone] = useState('+91 94250 11223');
  const [opdStartTime, setOpdStartTime] = useState('09:00');
  const [opdEndTime, setOpdEndTime] = useState('14:00');
  const [teleStartTime, setTeleStartTime] = useState('15:00');
  const [teleEndTime, setTeleEndTime] = useState('17:00');
  const [muacThreshold, setMuacThreshold] = useState('11.5');
  const [hbThreshold, setHbThreshold] = useState('7.0');
  const [autoNrcPrompt, setAutoNrcPrompt] = useState(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" />
            <span>Clinical Practice & System Configuration</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Practice & Doctor Settings</h2>
          <p className="text-slate-500 text-xs">
            Manage your medical credentials, OPD / Telemedicine hours, ABDM health registration, and AI clinical triggers.
          </p>
        </div>

        {savedToast && (
          <div className="px-4 py-2 rounded-2xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-bounce">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Settings Successfully Saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Professional Demographics & Medical Council */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-black text-sm uppercase tracking-wider border-b border-slate-100 pb-3">
            <Stethoscope className="w-4 h-4 text-teal-700" />
            Medical Practitioner Identity (ABDM Verified)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Doctor Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Degrees & Specialization</label>
              <input
                type="text"
                value={qualifications}
                onChange={e => setQualifications(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Medical Council Registration No</label>
              <div className="relative">
                <input
                  type="text"
                  value={regNo}
                  onChange={e => setRegNo(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-bold text-blue-700 font-mono focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50 focus:bg-white"
                />
                <span className="absolute right-3 top-2.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  VERIFIED
                </span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Assigned Health Center / Hospital</label>
              <input
                type="text"
                value={facility}
                onChange={e => setFacility(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Government Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Mobile / Emergency Escalation</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: OPD & Telemedicine Consultation Timings */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-black text-sm uppercase tracking-wider border-b border-slate-100 pb-3">
            <Clock className="w-4 h-4 text-blue-600" />
            Clinic & Teleconsultation Availability Schedule
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
              <span className="font-bold text-blue-900 block text-sm">Physical OPD Hours (CHC Clinic)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">Start Time</label>
                  <input
                    type="time"
                    value={opdStartTime}
                    onChange={e => setOpdStartTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 font-bold text-slate-800 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">End Time</label>
                  <input
                    type="time"
                    value={opdEndTime}
                    onChange={e => setOpdEndTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 font-bold text-slate-800 bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-3">
              <span className="font-bold text-teal-900 block text-sm">Teleconsultation Slots (WebRTC / Voice)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">Start Time</label>
                  <input
                    type="time"
                    value={teleStartTime}
                    onChange={e => setTeleStartTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 font-bold text-slate-800 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">End Time</label>
                  <input
                    type="time"
                    value={teleEndTime}
                    onChange={e => setTeleEndTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 font-bold text-slate-800 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Clinical Decision Support & AI Alerts */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-black text-sm uppercase tracking-wider border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Clinical Decision Support System (CDSS) & Automated Alerts
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">MUAC Red Flag Emergency Threshold (cm)</label>
              <input
                type="number"
                step="0.1"
                value={muacThreshold}
                onChange={e => setMuacThreshold(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-bold text-slate-800 bg-slate-50 focus:bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">Standard WHO/NHM SAM trigger is &lt; 11.5 cm</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Critical Hemoglobin Cut-Off (g/dL)</label>
              <input
                type="number"
                step="0.1"
                value={hbThreshold}
                onChange={e => setHbThreshold(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-bold text-slate-800 bg-slate-50 focus:bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">Severe pediatric anemia is &lt; 7.0 g/dL</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoNrcPrompt}
                onChange={e => setAutoNrcPrompt(e.target.checked)}
                className="w-4 h-4 text-teal-700 rounded border-slate-300 focus:ring-teal-700"
              />
              <div>
                <span className="font-bold text-slate-800 text-xs block">Automated NRC Admission Recommendation</span>
                <span className="text-[11px] text-slate-500">
                  Prompt doctor with 1-click NRC referral form whenever weight-for-height falls below -3 SD or MUAC &lt; 11.5 cm.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsAlertsEnabled}
                onChange={e => setSmsAlertsEnabled(e.target.checked)}
                className="w-4 h-4 text-teal-700 rounded border-slate-300 focus:ring-teal-700"
              />
              <div>
                <span className="font-bold text-slate-800 text-xs block">SMS Escalations to ASHA & Anganwadi Workers</span>
                <span className="text-[11px] text-slate-500">
                  Send immediate SMS notification to village ASHA whenever a high-risk prescription or follow-up is booked.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            Save Practice Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
