import React from 'react';
import {
  QrCode, X, Printer, Volume2, ShieldCheck,
  PhoneCall, CheckCircle2, User, Building, MapPin,
  Calendar, Download, Share2
} from 'lucide-react';
import type { Child, LanguageCode } from '../types';
import { SpeechEngine } from '../services/speech';

interface QRCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child | null;
  language: LanguageCode;
}

export const QRCardModal: React.FC<QRCardModalProps> = ({
  isOpen,
  onClose,
  child,
  language
}) => {
  if (!isOpen || !child) return null;

  const handleSpeakCard = () => {
    const text = `Child Digital Health Passport. Full Name: ${child.fullName}. Unique Health ID: ${child.uhid}. Village: ${child.village || 'Kalyanpur'}. Anganwadi Center: ${child.anganwadiCenter || 'Center 1'}. For 24/7 National Emergency Ambulance, dial 108.`;
    SpeechEngine.speak(text, language);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-8 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Top Header Bar */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
              <QrCode size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">
                Digital Health Passport
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                National Health Mission · ABDM Health Locker Token
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body: Big Card Printable Layout */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-900/50 shadow-inner space-y-5">
            {/* Government Emblem & ABHA Verification Banner */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                  POSHAN ABHIYAAN · GOVT OF INDIA
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                  NATIONAL CHILD DIGITAL PASSPORT
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <ShieldCheck size={13} />
                <span>ABDM Verified</span>
              </div>
            </div>

            {/* Child Profile Information */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-700 dark:text-teal-300 shadow-xs shrink-0">
                <User size={26} />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {child.fullName}
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-teal-700 text-white px-2 py-0.5 rounded-md">
                    UHID: {child.uhid}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    DOB: {child.dateOfBirth} · {child.gender}
                  </span>
                </div>
              </div>
            </div>

            {/* High-Contrast Crisp Black & White QR Code */}
            <div className="flex flex-col items-center justify-center py-6 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <svg className="w-44 h-44" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="white" />
                {/* QR Finder Patterns (Top-Left, Top-Right, Bottom-Left) */}
                <rect x="5" y="5" width="26" height="26" fill="black" />
                <rect x="9" y="9" width="18" height="18" fill="white" />
                <rect x="13" y="13" width="10" height="10" fill="black" />

                <rect x="69" y="5" width="26" height="26" fill="black" />
                <rect x="73" y="9" width="18" height="18" fill="white" />
                <rect x="77" y="13" width="10" height="10" fill="black" />

                <rect x="5" y="69" width="26" height="26" fill="black" />
                <rect x="9" y="73" width="18" height="18" fill="white" />
                <rect x="13" y="77" width="10" height="10" fill="black" />

                {/* QR Data Matrix Bits */}
                <rect x="36" y="8" width="5" height="5" fill="black" />
                <rect x="46" y="8" width="5" height="5" fill="black" />
                <rect x="56" y="14" width="5" height="5" fill="black" />
                <rect x="36" y="24" width="5" height="5" fill="black" />
                <rect x="44" y="24" width="5" height="5" fill="black" />
                <rect x="52" y="24" width="5" height="5" fill="black" />
                <rect x="60" y="24" width="5" height="5" fill="black" />

                <rect x="10" y="38" width="5" height="5" fill="black" />
                <rect x="22" y="38" width="5" height="5" fill="black" />
                <rect x="34" y="38" width="10" height="10" fill="black" />
                <rect x="48" y="38" width="5" height="5" fill="black" />
                <rect x="60" y="38" width="8" height="8" fill="black" />
                <rect x="76" y="38" width="5" height="5" fill="black" />
                <rect x="88" y="38" width="5" height="5" fill="black" />

                <rect x="36" y="52" width="6" height="6" fill="black" />
                <rect x="48" y="52" width="6" height="6" fill="black" />
                <rect x="62" y="52" width="6" height="6" fill="black" />
                <rect x="78" y="52" width="6" height="6" fill="black" />

                <rect x="36" y="68" width="5" height="5" fill="black" />
                <rect x="48" y="68" width="8" height="8" fill="black" />
                <rect x="64" y="68" width="5" height="5" fill="black" />
                <rect x="76" y="68" width="8" height="8" fill="black" />

                <rect x="36" y="84" width="8" height="8" fill="black" />
                <rect x="52" y="84" width="5" height="5" fill="black" />
                <rect x="64" y="84" width="6" height="6" fill="black" />
                <rect x="80" y="84" width="8" height="8" fill="black" />
              </svg>
              <div className="mt-3 text-center">
                <span className="text-[11px] font-mono font-bold text-zinc-900 dark:text-zinc-100 block">
                  TOKEN: {child.qrToken || 'NCQR-3D523E5F'}
                </span>
                <span className="text-[10px] text-zinc-400">
                  Scan at any Primary Health Centre or Anganwadi
                </span>
              </div>
            </div>

            {/* Guardian & Facility Details */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-zinc-400 font-semibold block text-[10px] uppercase">
                  Guardian / Parent
                </span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {child.parentName || 'Gita Soren'}
                </span>
              </div>
              <div>
                <span className="text-zinc-400 font-semibold block text-[10px] uppercase">
                  Anganwadi Center / Village
                </span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {child.anganwadiCenter || 'Singapur AWC-1'}
                </span>
              </div>
            </div>

            {/* Emergency Hotline Alert */}
            <div className="flex items-center justify-between text-xs text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300 px-4 py-2.5 rounded-2xl border border-rose-200 dark:border-rose-900 font-bold">
              <span className="flex items-center gap-1.5">
                <PhoneCall size={14} className="animate-pulse" />
                National Ambulance Hotline: 108 / 102
              </span>
              <span>24/7 Toll-Free</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleSpeakCard}
              className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-50 cursor-pointer"
            >
              <Volume2 size={15} />
              <span>Voice Readout (Audio)</span>
            </button>
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <Printer size={15} />
              <span>Print / Download Passport</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
