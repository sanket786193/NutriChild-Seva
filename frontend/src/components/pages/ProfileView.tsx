import React from 'react';
import {
  User, ShieldCheck, Mail, Phone, Building,
  QrCode, Stethoscope, Heart, Calendar, Award
} from 'lucide-react';
import type { UserSession } from '../navigation/MainHeader';

interface ProfileViewProps {
  session: UserSession;
  onOpenQRModal?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ session, onOpenQRModal }) => {
  const isDoctor = session.role === 'DOCTOR';

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-teal-700 text-white text-2xl font-black flex items-center justify-center shrink-0 shadow-sm">
              {session.avatarInitial || (isDoctor ? 'RP' : 'SD')}
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold border border-teal-200/70 dark:border-teal-800">
                <ShieldCheck size={13} className="text-teal-600" />
                <span>{isDoctor ? 'Verified Clinical License' : 'Verified Family Health ID'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {session.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {isDoctor
                  ? 'Pediatric Specialist & Director, Nutrition Rehabilitation Centre'
                  : 'Registered Parent & Health Passport Custodian'}
              </p>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              {isDoctor ? 'Clinical Affiliation' : 'Demographic Record'}
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Account Type</span>
                <strong className="text-slate-900 dark:text-white capitalize">{session.role.toLowerCase()}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Registration / ABHA ID</span>
                <strong className="text-slate-900 dark:text-white font-mono">
                  {isDoctor ? 'MCI-OD-2018-84920' : 'ABHA-9824-1029-4412'}
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Primary Facility</span>
                <strong className="text-slate-900 dark:text-white">Rayagada District Hospital</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Location / Block</span>
                <strong className="text-slate-900 dark:text-white">Rayagada, Odisha</strong>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              Communication &amp; Security
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Email Address</span>
                <strong className="text-slate-900 dark:text-white">{session.emailOrPhone}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Registered Phone</span>
                <strong className="text-slate-900 dark:text-white">+91 {session.emailOrPhone}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Two-Factor Authentication</span>
                <span className="text-teal-600 font-bold">Enabled via SMS OTP</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Data Sovereignty</span>
                <span className="text-slate-700 dark:text-slate-300 font-semibold">DPDP Act Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
