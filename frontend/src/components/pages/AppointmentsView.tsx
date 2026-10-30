import React, { useState } from 'react';
import {
  Calendar, Clock, Video, MapPin, User, Stethoscope,
  Plus, CheckCircle2, ArrowRight, Phone, PhoneOff,
  Mic, MicOff, Camera, CameraOff, MessageSquare, X,
  ShieldCheck, FileText, Download, AlertCircle, HeartPulse,
  Activity, Star, Sparkles, Building, Pill
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AppointmentsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'book' | 'past'>('upcoming');
  const [virtualRoomOpen, setVirtualRoomOpen] = useState(false);
  const [activeCallDoctor, setActiveCallDoctor] = useState('Dr. Rajesh Patra, MD');
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [clinicalNotesModalOpen, setClinicalNotesModalOpen] = useState(false);
  const [selectedAppointmentNotes, setSelectedAppointmentNotes] = useState<any>(null);

  // New Booking State
  const [bookDoctor, setBookDoctor] = useState('Dr. Rajesh Patra, MD (Chief Pediatric Officer)');
  const [bookType, setBookType] = useState<'VIRTUAL' | 'IN_PERSON'>('VIRTUAL');
  const [bookChild, setBookChild] = useState('Aarav Kumar (NC-2026-101)');
  const [bookDate, setBookDate] = useState('2026-11-04');
  const [bookTime, setBookTime] = useState('11:00 AM');
  const [bookReason, setBookReason] = useState('Routine 18-month WHO anthropometry growth checkup');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const upcomingList = [
    {
      id: 'apt-101',
      doctor: 'Dr. Rajesh Patra, MD',
      doctorTitle: 'Chief Pediatric Medical Officer · Rayagada District Hospital',
      doctorReg: 'MCI-2018-94821',
      specialty: 'Pediatric Malnutrition & Inpatient Director',
      date: 'Monday, Nov 2, 2026',
      time: '10:30 AM',
      type: 'VIRTUAL',
      child: 'Aarav Kumar',
      uhid: 'NC-2026-101',
      token: 'TOKEN #04',
      reason: '18-Month WHO growth telemetry milestone verification and supplementary diet evaluation.',
      status: 'Confirmed & Doctor Ready',
      prescriptionPending: false,
    },
    {
      id: 'apt-102',
      doctor: 'Kamla Bai',
      doctorTitle: 'Senior ASHA Field Supervisor · Singapur Sub-Centre',
      doctorReg: 'ASHA-OD-2019-338',
      specialty: 'Door-to-Door MUAC Arm Tape & Growth Monitoring',
      date: 'Thursday, Nov 5, 2026',
      time: '09:00 AM',
      type: 'IN_PERSON',
      child: 'Aarav Kumar',
      uhid: 'NC-2026-101',
      token: 'FIELD VISIT',
      reason: 'Bi-weekly home visit for arm circumference measurement and Take-Home Ration verification.',
      status: 'Scheduled',
      prescriptionPending: false,
    },
    {
      id: 'apt-103',
      doctor: 'Dr. Shalini Rao, MD',
      doctorTitle: 'State Nutrition Specialist & Clinical Director',
      doctorReg: 'NMC-2016-10934',
      specialty: 'Severe Acute Malnutrition (SAM) Clinical Protocols',
      date: 'Tuesday, Nov 10, 2026',
      time: '02:00 PM',
      type: 'VIRTUAL',
      child: 'Priyanka Soren',
      uhid: 'NC-2026-102',
      token: 'TOKEN #01 (URGENT)',
      reason: 'Follow-up triage for Nutrition Rehabilitation Centre (NRC) inpatient transition protocol.',
      status: 'High Priority',
      prescriptionPending: true,
    },
  ];

  const pastList = [
    {
      id: 'apt-091',
      doctor: 'Dr. Rajesh Patra, MD',
      doctorTitle: 'Chief Pediatric Medical Officer',
      date: 'Oct 15, 2026 · 11:30 AM',
      child: 'Aarav Kumar (NC-2026-101)',
      type: 'VIRTUAL',
      diagnosis: 'Routine 18-month growth milestone verified. Normal WAZ (-0.8 SD) and HAZ (-0.4 SD). Hemoglobin 11.2 g/dL.',
      outcome: 'Cleared for next Universal Immunization Programme (UIP) booster. Prescribed multivitamin drops.',
      medicines: ['Multivitamin Pediatric Syrup 2.5ml OD for 30 days', 'Iron-Folic Acid supplementation'],
      doctorSign: 'Dr. R. Patra, MD (Reg: 94821)'
    },
    {
      id: 'apt-084',
      doctor: 'Meera Sharma (AWW)',
      doctorTitle: 'Anganwadi Worker & Nutrition Counsellor',
      date: 'Sep 28, 2026 · 10:00 AM',
      child: 'Aarav Kumar (NC-2026-101)',
      type: 'IN_PERSON',
      diagnosis: 'Take-Home Ration (THR) distribution and maternal dietary counselling session.',
      outcome: 'Supplementary millet-fortified flour (3.5 kg) provided. Mother advised on egg and pulse inclusion.',
      medicines: ['POSHAN Fortified Millet Pre-mix', 'Deworming Albendazole 200mg (Single Dose)'],
      doctorSign: 'Meera Sharma (AWC Singapur)'
    },
    {
      id: 'apt-079',
      doctor: 'Dr. Sunita Acharya, MBBS',
      doctorTitle: 'Medical Officer · CHC Gunupur',
      date: 'Aug 12, 2026 · 02:15 PM',
      child: 'Aarav Kumar (NC-2026-101)',
      type: 'IN_PERSON',
      diagnosis: 'Mild acute respiratory tract infection with low-grade pyrexia. Lungs clear on auscultation.',
      outcome: 'Resolved within 48 hours with oral paracetamol and oral hydration. No antibiotics required.',
      medicines: ['Paracetamol Pediatric Suspension 120mg/5ml SOS', 'ORS Solution Packets'],
      doctorSign: 'Dr. S. Acharya (Reg: 88412)'
    }
  ];

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setActiveTab('upcoming');
    }, 1500);
  };

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── Top Header Banner ── */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold border border-teal-200/70 dark:border-teal-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>CLINICAL CONSULTATIONS · ABDM TELEMEDICINE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Appointments &amp; Care Visits
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                Schedule virtual video telehealth appointments or in-person village checkups with verified pediatricians and frontline healthcare officers.
              </p>
            </div>

            {/* Segmented Tabs Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 self-start lg:self-auto">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'upcoming'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Upcoming ({upcomingList.length})
              </button>
              <button
                onClick={() => setActiveTab('book')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'book'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Book New Consult
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'past'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Past Visits ({pastList.length})
              </button>
            </div>
          </div>
        </div>

        {/* ── 4 KPI Summary Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Visits</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">3 Upcoming</div>
            <p className="text-xs text-slate-500 mt-1">Next session in 2h 45m</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed Reviews</span>
              <CheckCircle2 size={16} className="text-teal-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">24 Sessions</div>
            <p className="text-xs text-slate-500 mt-1">100% adherence rate</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">E-Prescriptions</span>
              <FileText size={16} className="text-teal-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">4 Active</div>
            <p className="text-xs text-slate-500 mt-1">Dispensed at AWC Singapur</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Telehealth Link</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">READY</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">HD WebRTC</div>
            <p className="text-xs text-slate-500 mt-1">Zero latency rural uplink</p>
          </div>
        </div>

        {/* ── Tab 1: Upcoming Appointments ── */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingList.map(apt => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 flex items-center justify-center font-black shadow-xs shrink-0">
                      <Stethoscope size={22} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                          {apt.doctor}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {apt.token}
                        </span>
                        {apt.type === 'VIRTUAL' ? (
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Virtual Video Telehealth
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/80 flex items-center gap-1.5">
                            <MapPin size={11} />
                            In-Person Health Checkup
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {apt.doctorTitle} · Reg: {apt.doctorReg}
                      </p>
                      <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 mt-0.5">
                        Specialty: {apt.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Scheduled Slot Badge */}
                  <div className="bg-slate-50 dark:bg-slate-800/80 px-5 py-3 rounded-xl border border-slate-200/80 dark:border-slate-700 flex flex-col justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Scheduled Date &amp; Time</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{apt.date}</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{apt.time} (Confirmed)</span>
                  </div>
                </div>

                {/* Patient Context & Clinical Reason */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <div className="md:col-span-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                      Enrolled Child
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{apt.child}</h4>
                    <span className="text-xs font-mono font-medium text-slate-500">UHID: {apt.uhid}</span>
                  </div>

                  <div className="md:col-span-8">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                      Consultation Purpose &amp; Symptoms
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      {apt.reason}
                    </p>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <ShieldCheck size={15} className="text-teal-600" />
                    <span>ABDM Telemedicine Compliant (EHR Synced)</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => {
                        setSelectedAppointmentNotes(apt);
                        setClinicalNotesModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
                    >
                      View Patient Notes
                    </button>

                    {apt.type === 'VIRTUAL' ? (
                      <button
                        onClick={() => {
                          setActiveCallDoctor(apt.doctor);
                          setVirtualRoomOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                      >
                        <Video size={14} />
                        <span>Launch Telehealth Room</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Directions to ${apt.doctorTitle}: Singapur Sub-Centre, Ward 4.`)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                      >
                        <MapPin size={14} />
                        <span>View Clinic Location</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Tab 2: Book New Consult ── */}
        {activeTab === 'book' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-xs"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  PATIENT PORTAL
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Book a Clinical Consultation
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with certified district hospital pediatricians or arrange a home visit with your village ASHA worker.
                </p>
              </div>

              {bookingConfirmed && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center gap-3">
                  <CheckCircle2 size={20} className="shrink-0 text-emerald-600" />
                  <div>
                    <h4 className="font-bold text-xs">Consultation Confirmed Successfully!</h4>
                    <p className="text-[11px]">SMS appointment slip and video conference token dispatched to registered mobile.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleBookSubmit} className="space-y-5">
                {/* Child Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    1. Select Enrolled Child
                  </label>
                  <select
                    value={bookChild}
                    onChange={e => setBookChild(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:border-teal-600"
                  >
                    <option>Aarav Kumar (NC-2026-101) · 18m Male</option>
                    <option>Priyanka Soren (NC-2026-102) · 24m Female</option>
                    <option>Manav Majhi (NC-2026-103) · 36m Male</option>
                  </select>
                </div>

                {/* Consultation Type Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    2. Choose Consultation Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBookType('VIRTUAL')}
                      className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                        bookType === 'VIRTUAL'
                          ? 'border-teal-600 bg-teal-50/60 dark:bg-teal-950/40 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold">
                          <Video size={16} />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-slate-900 dark:text-white block">Virtual Telehealth</strong>
                          <span className="text-[10px] text-slate-500">HD Video with Pediatrician</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        Join securely from any smartphone or tablet. Live growth telemetry sharing.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookType('IN_PERSON')}
                      className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                        bookType === 'IN_PERSON'
                          ? 'border-teal-600 bg-teal-50/60 dark:bg-teal-950/40 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-slate-900 dark:text-white block">In-Person Sub-Centre</strong>
                          <span className="text-[10px] text-slate-500">Anganwadi / CHC Visit</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        Meet ASHA worker or Medical Officer for physical MUAC tape and weighing.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Doctor Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    3. Select Medical Officer or Specialist
                  </label>
                  <select
                    value={bookDoctor}
                    onChange={e => setBookDoctor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:border-teal-600"
                  >
                    <option>Dr. Rajesh Patra, MD (Chief Pediatric Officer · District Hospital)</option>
                    <option>Dr. Shalini Rao, MD (State Malnutrition Specialist)</option>
                    <option>Kamla Bai (Senior ASHA Health Supervisor · Singapur)</option>
                    <option>Dr. Sunita Acharya, MBBS (Medical Officer · CHC Gunupur)</option>
                  </select>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      4. Preferred Date
                    </label>
                    <input
                      type="date"
                      value={bookDate}
                      onChange={e => setBookDate(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      5. Available Slot
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['09:30 AM', '11:00 AM', '02:30 PM', '04:15 PM'].map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setBookTime(slot)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                            bookTime === slot
                              ? 'bg-teal-700 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chief Complaint / Symptoms */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    6. Symptoms / Chief Clinical Concern
                  </label>
                  <textarea
                    rows={3}
                    value={bookReason}
                    onChange={e => setBookReason(e.target.value)}
                    placeholder="Describe child's symptoms: poor feeding, low weight gain, fever, diarrhea, vaccine inquiry..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-hidden focus:border-teal-600"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('upcoming')}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <span>Confirm Consultation Booking</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* ── Tab 3: Past Visits ── */}
        {activeTab === 'past' && (
          <div className="space-y-4">
            {pastList.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold">
                      <Stethoscope size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {item.doctor}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {item.doctorTitle} · {item.type === 'VIRTUAL' ? 'Telehealth Consultation' : 'In-Person Checkup'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Visit Date</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{item.date}</span>
                  </div>
                </div>

                {/* Clinical Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Clinical Findings &amp; Examination
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {item.diagnosis}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Clinical Outcome &amp; Advice
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {item.outcome}
                    </p>
                  </div>
                </div>

                {/* Prescribed Items & Signoff */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Prescribed:</span>
                    {item.medicines.map((m, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium">
                        {m}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-800 dark:text-white text-xs font-bold transition cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Download Clinical PDF</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Virtual Telehealth Room Simulator Modal ── */}
        <AnimatePresence>
          {virtualRoomOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <div className="w-full max-w-4xl bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
                {/* Room Top Header */}
                <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <h3 className="font-bold text-sm text-white">{activeCallDoctor}</h3>
                      <p className="text-[11px] text-slate-400">Encrypted High-Definition Telehealth Feed · Session #TH-8821</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setVirtualRoomOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Video Canvas Simulation */}
                <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 rounded-2xl bg-teal-950 border border-teal-700/60 mx-auto flex items-center justify-center text-teal-300 shadow-inner">
                      <Stethoscope size={36} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{activeCallDoctor}</h4>
                      <p className="text-xs text-emerald-400 font-mono">Connected · 1080p 60fps · Rayagada DH Rural Uplink</p>
                    </div>
                  </div>

                  {/* Patient PiP Video Preview */}
                  <div className="absolute bottom-5 right-5 w-32 sm:w-44 aspect-video bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-xl flex items-center justify-center">
                    {cameraOff ? (
                      <span className="text-xs text-slate-400 font-bold">Camera Off</span>
                    ) : (
                      <div className="text-center space-y-1">
                        <User size={20} className="mx-auto text-slate-400" />
                        <p className="text-[10px] text-slate-300 font-bold">Aarav Kumar (Self)</p>
                      </div>
                    )}
                  </div>

                  {/* Live Telemetry HUD Overlay */}
                  <div className="absolute top-5 left-5 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs space-y-0.5">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <HeartPulse size={13} className="animate-pulse" />
                      <span>Live Clinical Feed</span>
                    </div>
                    <p className="text-[11px] text-slate-300">WAZ: -0.8 SD · HAZ: -0.4 SD · MUAC: 13.8 cm</p>
                  </div>
                </div>

                {/* Call Control Footer */}
                <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setMicMuted(m => !m)}
                    className={`p-3 rounded-xl transition cursor-pointer ${
                      micMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                    title={micMuted ? 'Unmute Mic' : 'Mute Mic'}
                  >
                    {micMuted ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>

                  <button
                    onClick={() => setCameraOff(c => !c)}
                    className={`p-3 rounded-xl transition cursor-pointer ${
                      cameraOff ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                    title={cameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
                  >
                    {cameraOff ? <CameraOff size={18} /> : <Camera size={18} />}
                  </button>

                  <button
                    onClick={() => setVirtualRoomOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition cursor-pointer"
                  >
                    <PhoneOff size={16} />
                    <span>End Consultation</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Patient Notes Modal ── */}
        <AnimatePresence>
          {clinicalNotesModalOpen && selectedAppointmentNotes && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 font-['Plus_Jakarta_Sans',sans-serif]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient EHR Record</span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Clinical Notes for {selectedAppointmentNotes.child}
                    </h3>
                  </div>
                  <button
                    onClick={() => setClinicalNotesModalOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Consulting Clinician:</p>
                    <p className="text-slate-900 dark:text-white font-bold">{selectedAppointmentNotes.doctor}</p>
                    <p className="text-slate-500 text-[11px]">{selectedAppointmentNotes.doctorTitle}</p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Appointment Purpose:</p>
                    <p className="text-slate-700 dark:text-slate-300">{selectedAppointmentNotes.reason}</p>
                  </div>

                  <div className="p-3 bg-teal-50/60 dark:bg-teal-950/40 rounded-xl border border-teal-200/80 text-teal-900 dark:text-teal-200 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-teal-600" />
                      Status: {selectedAppointmentNotes.status}
                    </p>
                    <p className="text-[11px]">Appointment Token: {selectedAppointmentNotes.token} · Scheduled for {selectedAppointmentNotes.date} at {selectedAppointmentNotes.time}</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setClinicalNotesModalOpen(false)}
                    className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs"
                  >
                    Close Record
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
