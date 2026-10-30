import React, { useState, useEffect } from 'react';
import {
  MapPin, PhoneCall, X, Volume2, Navigation,
  ShieldAlert, Hospital, ShieldCheck, ArrowRight
} from 'lucide-react';
import type { HealthCenter, LanguageCode } from '../types';
import { SpeechEngine } from '../services/speech';
import { api } from '../services/api';

interface HealthCenterFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
}

export const HealthCenterFinderModal: React.FC<HealthCenterFinderModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  const [centers, setCenters] = useState<HealthCenter[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          api.getNearestCenters(pos.coords.latitude, pos.coords.longitude).then(setCenters);
        },
        () => {
          api.getNearestCenters().then(setCenters);
        }
      );
    } else {
      api.getNearestCenters().then(setCenters);
    }
  }, []);

  const handleSpeakCenterList = () => {
    if (centers.length === 0) return;
    const first = centers[0];
    const text = `Nearest clinical facility is ${first.name}, located approximately ${first.distanceKm || 1} kilometers away. For 24/7 National Emergency Ambulance, dial 108.`;
    SpeechEngine.speak(text, 'en');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-8 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Hospital size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">
                Healthcare Centres &amp; Inpatient NRC Facilities
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                GPS Geolocation · District Health Network
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakCenterList}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="Voice Readout"
            >
              <Volume2 size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* 108 Emergency Banner */}
        <div className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <PhoneCall size={18} className="text-rose-500 animate-pulse" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">National 24/7 Ambulance Hotline</span>
              <span className="text-sm font-extrabold text-white">Dial Toll-Free: 108 or 102</span>
            </div>
          </div>
          <a
            href="tel:108"
            className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md transition"
          >
            Call 108 Now
          </a>
        </div>

        {/* Center List */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 max-h-[460px]">
          {centers.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:border-black dark:hover:border-zinc-500 transition-all flex flex-col justify-between gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-zinc-950 dark:text-white leading-tight">
                      {c.name}
                    </h4>
                    {c.hasNRC && (
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300">
                        NRC Inpatient Unit
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-zinc-500 mt-1 flex items-center gap-1.5">
                    <MapPin size={12} className="text-zinc-400" />
                    <span>{c.village}, {c.district}</span>
                  </p>
                </div>
                {c.distanceKm !== undefined && (
                  <span className="text-xs font-black text-zinc-900 dark:text-white bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-full shrink-0">
                    {c.distanceKm} km away
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-semibold">
                  {c.doctorAvailable ? 'Medical Officer on Duty' : 'Health Supervisor on Duty'}
                </span>
                <a
                  href={`tel:${c.emergencyPhone || '108'}`}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition cursor-pointer shadow-xs"
                >
                  <PhoneCall size={12} />
                  <span>Call Facility</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
