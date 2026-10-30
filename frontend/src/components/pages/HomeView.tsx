import React, { useState } from 'react';
import {
  Activity, ArrowRight, ShieldCheck, CheckCircle2,
  Calendar, Stethoscope, Heart, Users, Play,
  Sparkles, Smartphone, QrCode, WifiOff, FileText,
  PhoneCall, Zap, Clock, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Child } from '../../types';

interface HomeViewProps {
  onNavigate: (page: string) => void;
  onOpenAuth: (mode: 'login' | 'register', roleTarget?: 'DOCTOR' | 'PATIENT') => void;
  onOpenVoiceAssistant: () => void;
  onEmergencySos: () => void;
  onSelectChildModal?: (child: Child) => void;
  childrenList: Child[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenAuth,
  onOpenVoiceAssistant,
  onEmergencySos,
  childrenList,
}) => {
  const [activeCareTab, setActiveCareTab] = useState<'personalized' | 'pediatric' | 'growth' | 'support' | 'virtual'>('personalized');

  const careTabContent = {
    personalized: {
      tag: 'PREVENTIVE CARE',
      headline: 'Everything you need, in one place',
      description:
        'Start with NutriChild for any clinical, nutritional, or developmental question concerning your child’s care. We connect the full picture of your child’s health, vaccination timeline, and Anganwadi benefits to ensure healthy milestones.',
      bullets: [
        'Routine Universal Immunization tracking with instant SMS alerts',
        'Direct consultation booking with certified pediatric medical officers',
        'Culturally customized Take-Home Ration (THR) supplementary meal planning',
      ],
      badge: '94.8% Immunization Coverage',
      imgLabel: 'Virtual care consultation active',
    },
    pediatric: {
      tag: 'SPECIALIZED PEDIATRICS',
      headline: 'Immediate triage from qualified medical officers',
      description:
        'Our network of District Hospital pediatricians and Primary Health Centre doctors review vital signs, severe anemia, and acute malnutrition cases with evidence-based clinical protocols.',
      bullets: [
        'Direct e-prescriptions sent to village Anganwadi centers',
        'Automated referral pathway to Nutrition Rehabilitation Centres (NRC)',
        'Continuous clinical follow-ups for high-risk SAM and MAM cohorts',
      ],
      badge: '<48h NRC Inpatient Admission',
      imgLabel: 'Pediatric specialist on call',
    },
    growth: {
      tag: 'GROWTH ENGINE',
      headline: 'Automated WHO Z-Score growth telemetry',
      description:
        'Eliminate diagnostic guesswork. Frontline health workers capture weight, height, and MUAC arm circumference to calculate WAZ, HAZ, and WHZ against global WHO standards in real time.',
      bullets: [
        'Instant detection of stunting, acute wasting, and kwashiorkor edema',
        'Works 100% offline in remote tribal valleys with zero mobile network',
        'Cryptographically signed Digital QR Health Cards for every child',
      ],
      badge: '±0.01 SD WHO Accuracy',
      imgLabel: 'WHO standard curve verified',
    },
    support: {
      tag: '24/7 HELPLINE',
      headline: 'Dedicated care champions at every step',
      description:
        'From resolving Poshan scheme entitlements to coordinating emergency ambulance transfers, our round-the-clock district support team ensures no family is left behind.',
      bullets: [
        'National 108 Emergency Ambulance direct coordinate dispatch',
        'Childline 1098 and Poshan 14408 scheme integration',
        'Voice AI assistant diagnostic guidance in 7 regional Indian languages',
      ],
      badge: '24/7 Multilingual Support',
      imgLabel: 'Care coordinator connected',
    },
    virtual: {
      tag: 'HYBRID CARE',
      headline: 'In-person or virtual care, anytime',
      description:
        'Whether visiting your village Health Sub-Centre, meeting your local ASHA worker at home, or video-consulting a pediatric specialist from your phone, care is seamlessly synchronized.',
      bullets: [
        'HD video tele-consultation simulator for remote villages',
        'Central health passport synchronized across all government hospitals',
        'Offline Dexie.js auto-sync on mobile reconnect',
      ],
      badge: 'Zero Packet Loss Guaranteed',
      imgLabel: 'Hybrid clinic operational',
    },
  };

  const activeContent = careTabContent[activeCareTab];

  return (
    <div className="w-full bg-white text-zinc-950 font-['Outfit'] transition-colors">
      <section className="relative w-full overflow-hidden bg-[#fafafa] border-b border-zinc-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.08),transparent_36%),linear-gradient(135deg,#ffffff_0%,#f8faf7_40%,#f4f5f0_100%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-zinc-200 bg-white/90 p-8 sm:p-10 lg:p-12 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-700">
                <span className="h-2.5 w-2.5 rounded-full bg-black animate-pulse" />
                healthcare operations platform
              </div>

              <h1 className="mt-6 max-w-xl text-4xl font-black tracking-[-0.06em] text-zinc-950 sm:text-5xl lg:text-6xl">
                Trusted care for every patient, family, and clinician.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
                Coordinate nutrition programs, growth monitoring, vaccinations, and specialist referrals from one secure healthcare workspace designed for modern care teams.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => onOpenAuth('register', 'PATIENT')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-4 text-sm font-bold text-white shadow-[0_18px_36px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-zinc-800 sm:w-auto"
                >
                  <span>Create patient account</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => onOpenAuth('login')}
                  className="inline-flex w-full items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-4 text-sm font-bold text-zinc-900 transition hover:-translate-y-0.5 hover:border-zinc-900 sm:w-auto"
                >
                  Sign in
                </button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-zinc-200 pt-6 text-xs font-semibold text-zinc-600">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> National Health Mission</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> WHO growth standards</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> Secure ABHA-linked records</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 text-white shadow-[0_32px_70px_rgba(0,0,0,0.28)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.22),transparent_35%)]" />
              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-300">live operational view</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400">Rayagada District</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-900/90 p-5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                      <span>children monitored</span>
                      <span className="text-emerald-400">+18 this week</span>
                    </div>
                    <div className="mt-3 text-4xl font-black tracking-[-0.06em]">1,284</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-[1.4rem] border border-zinc-800 bg-zinc-900 p-4">
                      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">vaccination coverage</div>
                      <div className="mt-2 text-2xl font-black">94.8%</div>
                    </div>
                    <div className="rounded-[1.4rem] border border-zinc-800 bg-zinc-900 p-4">
                      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">critical cases</div>
                      <div className="mt-2 text-2xl font-black text-rose-400">39</div>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-900/80 p-4">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                      <span>care coordination</span>
                      <span className="text-emerald-400">online</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between rounded-full bg-zinc-800 px-3 py-2 text-sm text-zinc-100"><span>Pharmacists</span><span className="font-semibold text-emerald-400">12 active</span></div>
                      <div className="flex items-center justify-between rounded-full bg-zinc-800 px-3 py-2 text-sm text-zinc-100"><span>Home visits</span><span className="font-semibold text-white">28 scheduled</span></div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('doctor-dashboard')}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-black text-zinc-950 transition hover:bg-zinc-100"
                >
                  <span>Launch clinical workstation</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Segmented Care Bar (Exact Screenshot 2 Pattern) ── */}
      <section className="py-20 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-2">
              COMPLETE CARE FROM A SINGLE PLATFORM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
              Care for malnutrition, fever, vaccines, and everything in between.
            </h2>
          </div>

          {/* Segmented Pill Switcher */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
            <div className="inline-flex p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-inner">
              <button
                onClick={() => setActiveCareTab('personalized')}
                className={`ih-pill-tab ${activeCareTab === 'personalized' ? 'active' : ''}`}
              >
                Personalized care
              </button>
              <button
                onClick={() => setActiveCareTab('pediatric')}
                className={`ih-pill-tab ${activeCareTab === 'pediatric' ? 'active' : ''}`}
              >
                Pediatric triage
              </button>
              <button
                onClick={() => setActiveCareTab('growth')}
                className={`ih-pill-tab ${activeCareTab === 'growth' ? 'active' : ''}`}
              >
                WHO growth engine
              </button>
              <button
                onClick={() => setActiveCareTab('support')}
                className={`ih-pill-tab ${activeCareTab === 'support' ? 'active' : ''}`}
              >
                24/7 support
              </button>
              <button
                onClick={() => setActiveCareTab('virtual')}
                className={`ih-pill-tab ${activeCareTab === 'virtual' ? 'active' : ''}`}
              >
                In-person or virtual care
              </button>
            </div>
          </div>

          {/* Tab Content Display Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCareTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-zinc-50 dark:bg-zinc-900/60 rounded-[2.5rem] p-8 sm:p-12 border border-zinc-200/80 dark:border-zinc-800"
            >
              {/* Left Column: Visual Card */}
              <div className="lg:col-span-6 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-md">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    {activeContent.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                    {activeContent.badge}
                  </span>
                </div>

                <div className="bg-zinc-100 dark:bg-zinc-800/60 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold">
                      <Stethoscope size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                        {activeContent.imgLabel}
                      </h4>
                      <p className="text-xs text-zinc-500">Live operational link</p>
                    </div>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-zinc-900 dark:bg-white h-full w-4/5 rounded-full" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  {activeContent.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                      <CheckCircle2 size={15} className="text-zinc-900 dark:text-white shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Copy */}
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">
                  INTEGRATED CLINICAL EXCELLENCE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
                  {activeContent.headline}
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {activeContent.description}
                </p>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate('appointments')}
                    className="ih-btn-primary"
                  >
                    Schedule an appointment
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={onOpenVoiceAssistant}
                    className="ih-btn-secondary"
                  >
                    Try voice diagnostic demo
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
};

