import React, { useState } from 'react';
import {
  Stethoscope, User, Lock, Mail, Phone, Building,
  ShieldCheck, Eye, EyeOff, ArrowRight, ArrowLeft,
  CheckCircle2, Sparkles, AlertCircle, Heart, KeyRound,
  FileCheck, Shield, ChevronRight, Activity, Award,
  Users, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UserRole } from '../../types';
import type { UserSession } from '../navigation/MainHeader';

interface AuthViewProps {
  initialMode?: 'login' | 'register';
  initialRole?: 'DOCTOR' | 'PATIENT';
  onLoginSuccess: (session: UserSession) => void;
  onCancel: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialMode = 'login',
  initialRole = 'PATIENT',
  onLoginSuccess,
  onCancel,
}) => {
  const [authRole, setAuthRole] = useState<'DOCTOR' | 'PATIENT' | 'ASHA'>(
    initialRole === 'DOCTOR' ? 'DOCTOR' : 'PATIENT'
  );
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('9876543210');
  const [loginPassword, setLoginPassword] = useState('1234');
  const [loginStaffRole, setLoginStaffRole] = useState<UserRole>('DOCTOR');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Doctor Registration Form State
  const [docName, setDocName] = useState('Dr. Rajesh Patra');
  const [docSpecialization, setDocSpecialization] = useState('Pediatric Specialist & Nutritionist');
  const [docHospital, setDocHospital] = useState('District Headquarters Hospital & NRC Rayagada');
  const [docRegId, setDocRegId] = useState('MCI-OD-2018-84920');
  const [docEmail, setDocEmail] = useState('dr.patra@health.gov.in');
  const [docPhone, setDocPhone] = useState('9876500003');
  const [docPassword, setDocPassword] = useState('doctor123');

  // Patient Multi-Step Registration Form State
  const [patientStep, setPatientStep] = useState(1);
  const [patGuardianName, setPatGuardianName] = useState('Sunita Devi');
  const [patChildName, setPatChildName] = useState('Aarav Kumar');
  const [patChildAgeMonths, setPatChildAgeMonths] = useState('18');
  const [patGender, setPatGender] = useState('MALE');
  const [patPhone, setPatPhone] = useState('9876543210');
  const [patVillage, setPatVillage] = useState('Kalyanpur');
  const [patConcerns, setPatConcerns] = useState<string[]>(['Growth Monitoring', 'UIP Vaccines']);
  const [patPassword, setPatPassword] = useState('1234');

  // ASHA Worker Registration State
  const [ashaName, setAshaName] = useState('Kamla Bai');
  const [ashaSectorId, setAshaSectorId] = useState('SEC-RAY-042');
  const [ashaVillage, setAshaVillage] = useState('Kalyanpur');
  const [ashaPhone, setAshaPhone] = useState('9876500001');

  // Toggle Health Concerns
  const toggleConcern = (concern: string) => {
    setPatConcerns(prev =>
      prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
    );
  };

  // Quick Demo Autofills
  const handleAutofillDoctor = () => {
    setAuthRole('DOCTOR');
    setAuthMode('login');
    setLoginIdentifier('dr.patra@health.gov.in');
    setLoginPassword('1234');
    setLoginStaffRole('DOCTOR');
    setErrorMessage('');
  };

  const handleAutofillPatient = () => {
    setAuthRole('PATIENT');
    setAuthMode('login');
    setLoginIdentifier('9876543210');
    setLoginPassword('1234');
    setErrorMessage('');
  };

  const handleAutofillAsha = () => {
    setAuthRole('ASHA');
    setAuthMode('login');
    setLoginIdentifier('9876500001');
    setLoginPassword('1234');
    setLoginStaffRole('ASHA');
    setErrorMessage('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsSubmitting(false);
      if (authRole === 'DOCTOR') {
        onLoginSuccess({
          isLoggedIn: true,
          name: 'Dr. Rajesh Patra, MD',
          role: loginStaffRole,
          emailOrPhone: loginIdentifier,
          avatarInitial: 'RP',
        });
      } else if (authRole === 'ASHA') {
        onLoginSuccess({
          isLoggedIn: true,
          name: 'Kamla Bai (ASHA Lead)',
          role: 'ASHA',
          emailOrPhone: loginIdentifier,
          avatarInitial: 'KB',
        });
      } else {
        onLoginSuccess({
          isLoggedIn: true,
          name: 'Sunita Devi (Parent)',
          role: 'PARENT',
          emailOrPhone: loginIdentifier,
          avatarInitial: 'SD',
        });
      }
    }, 600);
  };

  const handleDoctorRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        isLoggedIn: true,
        name: docName,
        role: 'DOCTOR',
        emailOrPhone: docEmail,
        avatarInitial: docName.split(' ')[1]?.charAt(0) || 'D',
      });
    }, 700);
  };

  const handlePatientRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        isLoggedIn: true,
        name: `${patGuardianName} (Parent)`,
        role: 'PARENT',
        emailOrPhone: patPhone,
        avatarInitial: patGuardianName.charAt(0),
      });
    }, 700);
  };

  const handleAshaRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        isLoggedIn: true,
        name: `${ashaName} (ASHA)`,
        role: 'ASHA',
        emailOrPhone: ashaPhone,
        avatarInitial: ashaName.charAt(0),
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mx-auto max-w-6xl">
        {/* Top Header Bar */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-200/80 pb-4">
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Return to Public Platform</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>National Health Mission · ABDM M3 Certified</span>
          </div>
        </div>

        {/* Two-Column Structured Medical Card */}
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.3fr] items-stretch">
          {/* Left Column: Official Government / Health Agency Overview */}
          <div className="rounded-3xl bg-[#0B1528] p-8 text-white shadow-lg border border-slate-800/80 flex flex-col justify-between">
            <div>
              {/* Official Branding Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold">
                    <Activity size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-bold tracking-tight text-white block">
                      NutriChild<span className="text-teal-400">+</span>
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      National Child Health Platform
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-teal-950 text-teal-300 border border-teal-800">
                  Secure Grid
                </span>
              </div>

              {/* Mission Statement */}
              <div className="mt-8 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                  Government-Grade Clinical Care
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  Evidence-based child nutrition &amp; clinical governance.
                </h1>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Connecting frontline ASHA workers, Primary Health Centres, and Nutrition Rehabilitation Centres (NRC) to eliminate severe stunting and acute malnutrition.
                </p>
              </div>

              {/* Verified District Indicators */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span className="text-slate-200 font-medium">1,284 Enrolled Children Tracked</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold">Rayagada District</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
                    <span className="text-slate-200 font-medium">94.8% UIP Vaccination Completion</span>
                  </div>
                  <span className="text-[11px] text-blue-400 font-semibold">National Protocol</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                    <span className="text-slate-200 font-medium">100% Offline Dexie.js Resilience</span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-semibold">Zero Data Loss</span>
                </div>
              </div>
            </div>

            {/* Statutory Security & Support Footer */}
            <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-teal-400" />
                  <span>DPDP Act 2023 Compliant</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Lock size={13} className="text-teal-400" />
                  <span>256-Bit SHA-3 Encryption</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                Ministry of Health &amp; Family Welfare · Poshan Abhiyaan 2.0 · Central Health Architecture
              </p>
            </div>
          </div>

          {/* Right Column: Refined Authentication & Onboarding Card */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              {/* Header: Title and Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                    {authRole === 'DOCTOR'
                      ? 'Clinical Station Credentials'
                      : authRole === 'ASHA'
                      ? 'Frontline Field Kit Access'
                      : 'Family Health Passport Access'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                    {authMode === 'login'
                      ? authRole === 'DOCTOR'
                        ? 'Medical Officer Sign In'
                        : authRole === 'ASHA'
                        ? 'ASHA Worker Sign In'
                        : 'Family Account Sign In'
                      : authRole === 'DOCTOR'
                      ? 'Doctor Clinical Registration'
                      : authRole === 'ASHA'
                      ? 'ASHA Field Registration'
                      : 'New Patient Enrollment'}
                  </h2>
                </div>

                {/* Sign In vs Register Toggle */}
                <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold self-start sm:self-auto">
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      authMode === 'login'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setAuthMode('register')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      authMode === 'register'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* Persona Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 my-6 p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setAuthRole('PATIENT')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    authRole === 'PATIENT'
                      ? 'bg-white text-teal-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User size={14} />
                  <span>Patient / Parent</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthRole('DOCTOR')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    authRole === 'DOCTOR'
                      ? 'bg-white text-teal-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Stethoscope size={14} />
                  <span>Doctor / MO</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthRole('ASHA')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    authRole === 'ASHA'
                      ? 'bg-white text-teal-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users size={14} />
                  <span>ASHA Worker</span>
                </button>
              </div>

              {/* Quick Demo Autofill Bar */}
              <div className="mb-6 flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-teal-50/70 border border-teal-200/80 text-[11px]">
                <span className="font-bold text-teal-900 shrink-0">Demo Shortcuts:</span>
                <button
                  type="button"
                  onClick={handleAutofillPatient}
                  className="px-2.5 py-1 rounded-md bg-white border border-teal-300 text-teal-800 hover:bg-teal-100 font-semibold transition cursor-pointer"
                >
                  Parent (Sunita)
                </button>
                <button
                  type="button"
                  onClick={handleAutofillDoctor}
                  className="px-2.5 py-1 rounded-md bg-white border border-teal-300 text-teal-800 hover:bg-teal-100 font-semibold transition cursor-pointer"
                >
                  Doctor (Dr. Patra)
                </button>
                <button
                  type="button"
                  onClick={handleAutofillAsha}
                  className="px-2.5 py-1 rounded-md bg-white border border-teal-300 text-teal-800 hover:bg-teal-100 font-semibold transition cursor-pointer"
                >
                  ASHA (Kamla Bai)
                </button>
              </div>

              {/* FORM RENDERING */}
              {authMode === 'login' ? (
                /* ── LOGIN FORM ── */
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {authRole === 'DOCTOR' && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        Clinical Designation / Role
                      </label>
                      <select
                        value={loginStaffRole}
                        onChange={e => setLoginStaffRole(e.target.value as UserRole)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-hidden focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                      >
                        <option value="DOCTOR">Medical Officer / Pediatrician (MO)</option>
                        <option value="ADMIN">Child Development Project Officer (CDPO)</option>
                        <option value="ANM">Auxiliary Nurse Midwife (ANM)</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      {authRole === 'DOCTOR'
                        ? 'Official Email or Medical License ID *'
                        : authRole === 'ASHA'
                        ? 'Registered Mobile Number or ASHA ID *'
                        : 'Registered Mobile Number or ABHA ID *'}
                    </label>
                    <div className="relative">
                      {authRole === 'DOCTOR' ? (
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      ) : (
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      )}
                      <input
                        type="text"
                        required
                        value={loginIdentifier}
                        onChange={e => setLoginIdentifier(e.target.value)}
                        placeholder={
                          authRole === 'DOCTOR'
                            ? 'dr.patra@health.gov.in or MCI-OD-2018'
                            : '9876543210'
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        {authRole === 'DOCTOR' ? 'Workstation Password *' : 'Password / Security PIN *'}
                      </label>
                      <a href="#forgot" className="text-[11px] font-semibold text-teal-700 hover:underline">
                        Forgot credentials?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-700 focus:ring-1 focus:ring-teal-700 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(p => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                        className="rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                      />
                      <span>Keep signed in on this workstation</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                  >
                    <span>{isSubmitting ? 'Verifying Credentials...' : 'Access Healthcare Workspace'}</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              ) : authRole === 'DOCTOR' ? (
                /* ── DOCTOR REGISTRATION FORM ── */
                <form onSubmit={handleDoctorRegisterSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Doctor Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={docName}
                        onChange={e => setDocName(e.target.value)}
                        placeholder="Dr. Rajesh Patra"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Medical Council Reg. ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={docRegId}
                        onChange={e => setDocRegId(e.target.value)}
                        placeholder="MCI-OD-2018-84920"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono text-slate-900 focus:outline-hidden focus:border-teal-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Clinical Specialization *
                      </label>
                      <input
                        type="text"
                        required
                        value={docSpecialization}
                        onChange={e => setDocSpecialization(e.target.value)}
                        placeholder="Pediatric Nutrition & Inpatient Care"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Primary Facility / NRC *
                      </label>
                      <input
                        type="text"
                        required
                        value={docHospital}
                        onChange={e => setDocHospital(e.target.value)}
                        placeholder="District Headquarters Hospital, Rayagada"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Official Health Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={docEmail}
                        onChange={e => setDocEmail(e.target.value)}
                        placeholder="dr.patra@health.gov.in"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={docPhone}
                        onChange={e => setDocPhone(e.target.value)}
                        placeholder="9876500003"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Set Workstation Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={docPassword}
                      onChange={e => setDocPassword(e.target.value)}
                      placeholder="Minimum 8 characters with numbers"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Submit Clinical License Credentials</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              ) : authRole === 'ASHA' ? (
                /* ── ASHA REGISTRATION FORM ── */
                <form onSubmit={handleAshaRegisterSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        ASHA Worker Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={ashaName}
                        onChange={e => setAshaName(e.target.value)}
                        placeholder="Kamla Bai"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Sector / Anganwadi ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={ashaSectorId}
                        onChange={e => setAshaSectorId(e.target.value)}
                        placeholder="SEC-RAY-042"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono text-slate-900 focus:outline-hidden focus:border-teal-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Assigned Village *
                      </label>
                      <input
                        type="text"
                        required
                        value={ashaVillage}
                        onChange={e => setAshaVillage(e.target.value)}
                        placeholder="Kalyanpur"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={ashaPhone}
                        onChange={e => setAshaPhone(e.target.value)}
                        placeholder="9876500001"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Activate Frontline Field Kit</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              ) : (
                /* ── PATIENT MULTI-STEP REGISTRATION ── */
                <form onSubmit={handlePatientRegisterSubmit} className="space-y-4">
                  {/* Step Progress Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <span className="font-bold text-teal-800">
                      Step {patientStep} of 3: {patientStep === 1 ? 'Parent Details' : patientStep === 2 ? 'Child Details' : 'Health Priorities'}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(s => (
                        <span
                          key={s}
                          className={`w-6 h-1.5 rounded-full ${
                            s <= patientStep ? 'bg-teal-700' : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {patientStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Mother / Guardian Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={patGuardianName}
                          onChange={e => setPatGuardianName(e.target.value)}
                          placeholder="Sunita Devi"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Mobile Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={patPhone}
                            onChange={e => setPatPhone(e.target.value)}
                            placeholder="9876543210"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Village / Locality *
                          </label>
                          <input
                            type="text"
                            required
                            value={patVillage}
                            onChange={e => setPatVillage(e.target.value)}
                            placeholder="Kalyanpur"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setPatientStep(2)}
                        className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                      >
                        <span>Continue to Child Details</span>
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  )}

                  {patientStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Child Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={patChildName}
                          onChange={e => setPatChildName(e.target.value)}
                          placeholder="Aarav Kumar"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Age in Months *
                          </label>
                          <input
                            type="number"
                            required
                            min="0"
                            max="60"
                            value={patChildAgeMonths}
                            onChange={e => setPatChildAgeMonths(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Gender *
                          </label>
                          <select
                            value={patGender}
                            onChange={e => setPatGender(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700"
                          >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setPatientStep(1)}
                          className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setPatientStep(3)}
                          className="w-2/3 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                        >
                          <span>Health Priorities</span>
                          <ChevronRight size={15} />
                        </button>
                      </div>
                    </div>
                  )}

                  {patientStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-2">
                          Select Care Priorities for {patChildName || 'Child'}
                        </label>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {[
                            'Growth Monitoring',
                            'UIP Vaccines',
                            'Nutritional Counselling',
                            'Fever & Illness Triage',
                            'Poshan Ration Benefits',
                            'Emergency 108 Support',
                          ].map(c => {
                            const active = patConcerns.includes(c);
                            return (
                              <button
                                key={c}
                                type="button"
                                onClick={() => toggleConcern(c)}
                                className={`p-2.5 rounded-xl text-left border transition cursor-pointer flex items-center justify-between ${
                                  active
                                    ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                                    : 'bg-white border-slate-200 text-slate-700 font-medium'
                                }`}
                              >
                                <span>{c}</span>
                                {active && <Check size={14} className="text-teal-700 shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Set Security PIN / Password *
                        </label>
                        <input
                          type="password"
                          required
                          value={patPassword}
                          onChange={e => setPatPassword(e.target.value)}
                          placeholder="4-digit PIN or password"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-teal-700 font-mono"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setPatientStep(2)}
                          className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-2/3 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <span>Complete Registration</span>
                          <CheckCircle2 size={15} />
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Bottom Card Reassurance */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-teal-700" />
                <span>Verified by Rayagada District Health Society</span>
              </span>
              <a href="#help" className="text-teal-800 font-semibold hover:underline">
                Helpline 104
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
