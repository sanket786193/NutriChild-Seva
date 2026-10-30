import React from 'react';
import {
  Activity, ShieldCheck, Heart, ArrowUp, PhoneCall,
  ExternalLink, FileText, Lock
} from 'lucide-react';

export const ModernFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 text-xs border-t border-zinc-900 font-['Outfit']">
      {/* Upper Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Status */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-zinc-950 flex items-center justify-center font-black text-sm shadow-md">
                <Activity size={20} />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight font-['Outfit'] block">
                  NutriChild<span className="text-zinc-500">+</span>
                </span>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                  Healthcare Platform · ABDM M3 Ready
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-normal">
              An enterprise, voice-first, offline-resilient healthcare monitoring platform engineered to combat severe acute malnutrition, stunting, and preventable mortality across rural and tribal communities.
            </p>

            {/* Central Grid Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-bold text-zinc-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Central Health Grid v2.4.8 · All Systems Live</span>
            </div>
          </div>

          {/* Column 2: Clinical Core */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Clinical Core
            </h4>
            <ul className="space-y-2.5 text-zinc-400 font-medium">
              <li>
                <a href="#simulator" className="hover:text-white transition">WHO Z-Score Engine</a>
              </li>
              <li>
                <a href="#registry" className="hover:text-white transition">UIP Vaccine Tracker</a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-white transition">Anemia &amp; MUAC Triage</a>
              </li>
              <li>
                <a href="#registry" className="hover:text-white transition">NRC Inpatient Referral</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">Clinical Prescriptions</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Frontline Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Field Solutions
            </h4>
            <ul className="space-y-2.5 text-zinc-400 font-medium">
              <li>
                <a href="#clinical" className="hover:text-white transition">Offline Dexie.js Mesh</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">Vernacular Speech AI</a>
              </li>
              <li>
                <a href="#registry" className="hover:text-white transition">Digital QR Health Cards</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">Take-Home Ration (THR)</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">AI Food Plate Analyzer</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Emergency Helplines
            </h4>
            <ul className="space-y-2.5 text-zinc-300 font-medium">
              <li className="flex items-center justify-between">
                <span>Ambulance SOS:</span>
                <strong className="text-rose-400 font-black font-mono">108</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Childline India:</span>
                <strong className="text-amber-400 font-black font-mono">1098</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Poshan Helpline:</span>
                <strong className="text-emerald-400 font-black font-mono">14408</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Women Helpline:</span>
                <strong className="text-blue-400 font-black font-mono">181</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Legal & Attribution */}
      <div className="border-t border-zinc-900 py-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-500 text-center sm:text-left">
            © {new Date().getFullYear()} NutriChild+ · Supported by National Health Mission &amp; Ministry of Women and Child Development.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>DPDP Act 2023 Compliant</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Lock size={14} className="text-emerald-500" />
              <span>256-bit Encryption</span>
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition ml-2 cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
