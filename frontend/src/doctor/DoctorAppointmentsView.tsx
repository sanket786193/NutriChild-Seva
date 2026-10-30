import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Video,
  Phone,
  UserCheck,
  Plus,
  CheckCircle,
  XCircle,
  X,
  MapPin,
  FileText
} from 'lucide-react';
import type { Child, LanguageCode } from '../types';
import { api } from '../services/api';

interface DoctorAppointmentsViewProps {
  language: LanguageCode;
  onOpenPrescriptionForChild?: (child: Child) => void;
}

export const DoctorAppointmentsView: React.FC<DoctorAppointmentsViewProps> = ({
  onOpenPrescriptionForChild
}) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [filterType, setFilterType] = useState('ALL');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<any>(null);

  // New Appointment Form
  const [selectedChildId, setSelectedChildId] = useState<number>(1);
  const [aptDate, setAptDate] = useState(new Date().toISOString().split('T')[0]);
  const [aptTime, setAptTime] = useState('11:00 AM');
  const [aptType, setAptType] = useState('IN_PERSON');
  const [aptReason, setAptReason] = useState('Nutritional Growth Follow-up');

  const loadAppointments = () => {
    fetch('/api/v1/doctor/appointments')
      .then(res => res.ok ? res.json() : [])
      .then(setAppointments)
      .catch(() => {});
  };

  useEffect(() => {
    loadAppointments();
    api.getChildren().then(setChildren);
  }, []);

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const child = children.find(c => c.id === selectedChildId);
    if (!child) return;

    const payload = {
      childId: child.id,
      childName: child.fullName,
      childUhid: child.uhid,
      parentName: child.parentName || 'Parent',
      parentPhone: child.parentPhone || '9876500000',
      village: child.village || 'Kalyanpur',
      appointmentDate: aptDate,
      timeSlot: aptTime,
      consultationType: aptType,
      reason: aptReason,
      status: 'SCHEDULED'
    };

    const res = await fetch('/api/v1/doctor/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      loadAppointments();
      setIsNewModalOpen(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    await fetch(`/api/v1/doctor/appointments/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    loadAppointments();
  };

  const filtered = appointments.filter(a => {
    if (filterType === 'ALL') return true;
    return a.consultationType === filterType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Clinical Consultations & Telemedicine Schedule
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage outpatient OPD, rural video teleconsultations, and follow-up reviews
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Consultation Type Filter */}
          <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-xl transition-all ${filterType === 'ALL' ? 'bg-white text-blue-700 shadow-2xs font-extrabold' : 'text-slate-600'}`}
            >
              All Types
            </button>
            <button
              onClick={() => setFilterType('VIDEO')}
              className={`px-3 py-1.5 rounded-xl transition-all ${filterType === 'VIDEO' ? 'bg-white text-indigo-700 shadow-2xs font-extrabold' : 'text-slate-600'}`}
            >
              Video
            </button>
            <button
              onClick={() => setFilterType('IN_PERSON')}
              className={`px-3 py-1.5 rounded-xl transition-all ${filterType === 'IN_PERSON' ? 'bg-white text-teal-700 shadow-2xs font-extrabold' : 'text-slate-600'}`}
            >
              In-Person
            </button>
          </div>

          <button
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Appointment</span>
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((apt) => {
          const isDone = apt.status === 'COMPLETED';

          return (
            <div
              key={apt.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                isDone
                  ? 'bg-slate-50 border-slate-200 opacity-70'
                  : 'bg-white border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300'
              }`}
            >
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                    apt.consultationType === 'VIDEO'
                      ? 'bg-indigo-100 text-indigo-800'
                      : apt.consultationType === 'AUDIO'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {apt.consultationType === 'VIDEO' ? <Video className="w-3.5 h-3.5" /> : apt.consultationType === 'AUDIO' ? <Phone className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                    {apt.consultationType}
                  </span>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isDone ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {apt.status}
                  </span>
                </div>

                {/* Child and Guardian Details */}
                <div>
                  <h4 className="text-base font-black text-slate-900 leading-tight">
                    {apt.childName}
                  </h4>
                  <p className="text-xs font-mono font-bold text-blue-700 mt-0.5">
                    {apt.childUhid}
                  </p>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Mother: {apt.parentName} • 📞 {apt.parentPhone}
                  </p>
                </div>

                {/* Reason & Time */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{apt.appointmentDate} at {apt.timeSlot}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                    Reason: {apt.reason}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                {apt.consultationType === 'VIDEO' && !isDone && (
                  <button
                    onClick={() => setActiveVideoModal(apt)}
                    className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-all"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Video</span>
                  </button>
                )}

                {!isDone ? (
                  <button
                    onClick={() => handleUpdateStatus(apt.id, 'COMPLETED')}
                    className="flex-1 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-all"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Complete</span>
                  </button>
                ) : (
                  <span className="text-xs font-bold text-slate-400">Consultation Finished</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Consultation Simulation Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 text-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-800 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <h3 className="font-extrabold text-sm">
                  Live Tele-Consultation: {activeVideoModal.childName} ({activeVideoModal.childUhid})
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-full bg-slate-700 hover:bg-slate-600 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Viewport Simulation */}
            <div className="p-6 flex flex-col items-center justify-center space-y-4 min-h-[300px] bg-radial from-slate-800 to-slate-950">
              <div className="w-24 h-24 rounded-full bg-indigo-600/30 border-2 border-indigo-400 flex items-center justify-center text-4xl shadow-xl animate-pulse">
                👧
              </div>
              <div className="text-center">
                <h4 className="text-lg font-black">{activeVideoModal.childName} & Mother {activeVideoModal.parentName}</h4>
                <p className="text-xs text-indigo-300 font-mono mt-0.5">Kalyanpur Anganwadi Center Video Link • Encrypted WebRTC</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 max-w-md text-center">
                Clinical Observation: Child appears alert, bilateral edema absent. Mother reports tolerance to therapeutic ragi porridge.
              </div>
            </div>

            {/* In-Call Controls */}
            <div className="p-4 bg-slate-800 border-t border-slate-700 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  handleUpdateStatus(activeVideoModal.id, 'COMPLETED');
                  setActiveVideoModal(null);
                }}
                className="px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md active:scale-95 transition-all"
              >
                End Call & Mark Completed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Appointment Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-blue-100 overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-blue-900 to-teal-900 p-4 text-white flex items-center justify-between">
              <h3 className="font-extrabold text-sm">Schedule Clinical Consultation</h3>
              <button onClick={() => setIsNewModalOpen(false)} className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Patient *</label>
                <select
                  value={selectedChildId}
                  onChange={(e) => setSelectedChildId(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                >
                  {children.map(c => (
                    <option key={c.id} value={c.id}>{c.fullName} ({c.uhid})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={aptDate}
                    onChange={(e) => setAptDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={aptTime}
                    onChange={(e) => setAptTime(e.target.value)}
                    placeholder="10:30 AM"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Consultation Mode</label>
                <select
                  value={aptType}
                  onChange={(e) => setAptType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                >
                  <option value="IN_PERSON">In-Person OPD Clinic</option>
                  <option value="VIDEO">Video Teleconsultation (WebRTC)</option>
                  <option value="AUDIO">Audio Call Follow-up</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Reason for Visit</label>
                <input
                  type="text"
                  value={aptReason}
                  onChange={(e) => setAptReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-sm active:scale-95 transition-all"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
