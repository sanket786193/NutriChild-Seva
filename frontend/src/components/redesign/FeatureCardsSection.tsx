import React from 'react';
import {
  Activity, Mic, QrCode, WifiOff, Apple,
  AlertOctagon, ArrowRight, Sparkles, CheckCircle2,
  FileText, ShieldCheck, HeartPulse
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardsSectionProps {
  onOpenVoiceAssistant: () => void;
  onOpenHealthCenters: () => void;
  onOpenPlateScanner: () => void;
  onOpenGovtSchemes: () => void;
  onOpenRegisterModal: () => void;
}

export const FeatureCardsSection: React.FC<FeatureCardsSectionProps> = ({
  onOpenVoiceAssistant,
  onOpenHealthCenters,
  onOpenPlateScanner,
  onOpenGovtSchemes,
  onOpenRegisterModal,
}) => {
  const features = [
    {
      id: 'who-growth',
      eyebrow: 'CLINICAL TELEMETRY',
      title: 'Automated WHO Growth & Z-Score Engine',
      description:
        'Calculates Weight-for-Age (WAZ), Height-for-Age (HAZ), and Weight-for-Height (WHZ) with ±0.01 SD accuracy. Instant detection of stunting, acute wasting, and bilateral pitting edema.',
      icon: Activity,
      color: 'teal',
      badge: 'WHO Standards',
      metric: '±0.01 SD Precision',
      actionText: 'Inspect Z-Score Matrix',
      actionHref: '#simulator',
    },
    {
      id: 'voice-ai',
      eyebrow: 'VERNACULAR ACCESSIBILITY',
      title: 'Multilingual Voice Diagnostic Assistant',
      description:
        'Voice-first interface supporting Hindi, Odia, Marathi, Bengali, Telugu, Tamil, and English. Empowers low-literacy families and Anganwadi workers to query symptoms and triage guidance naturally.',
      icon: Mic,
      color: 'blue',
      badge: 'Gemini AI Powered',
      metric: '7 Indian Languages',
      actionText: 'Launch Voice Assistant',
      onClick: onOpenVoiceAssistant,
    },
    {
      id: 'digital-qr',
      eyebrow: 'DIGITAL IDENTITY',
      title: 'Offline-Scannable QR Child Health Cards',
      description:
        'Each registered child receives a cryptographically signed QR card. Frontline health workers can scan and access immunization history and growth milestones in sub-second offline lookups.',
      icon: QrCode,
      color: 'emerald',
      badge: 'ABDM Sandbox Ready',
      metric: '<0.4s Offline Scan',
      actionText: 'Register Child Record',
      onClick: onOpenRegisterModal,
    },
    {
      id: 'offline-sync',
      eyebrow: 'ZERO-CONNECTIVITY RESILIENCE',
      title: 'Dexie.js IndexedDB Offline-First Architecture',
      description:
        'Engineered for deep tribal valleys with zero mobile coverage. Vitals and vaccine logs queue locally with idempotent sync tokens and automatic multi-device conflict resolution.',
      icon: WifiOff,
      color: 'indigo',
      badge: 'Zero Data Loss',
      metric: '100% Offline-Capable',
      actionText: 'View Sync Architecture',
      actionHref: '#clinical',
    },
    {
      id: 'nutrition-ai',
      eyebrow: 'POSHAN ABHIYAAN 2.0',
      title: 'Smart Dietary & Take-Home Ration (THR) Planner',
      description:
        'Translates clinical deficits into culturally authentic local diets (Ragi Ganji, Moringa Khichdi) and calculates Take-Home Ration allocation from Anganwadi centers.',
      icon: Apple,
      color: 'amber',
      badge: 'Nutrition AI Engine',
      metric: 'Plate Visual Scanner',
      actionText: 'Scan Food Plate',
      onClick: onOpenPlateScanner,
    },
    {
      id: 'sam-referral',
      eyebrow: 'CRITICAL EMERGENCIES',
      title: 'Severe Acute Malnutrition (SAM) NRC Referral Grid',
      description:
        'Automated red-flag trigger for MUAC < 11.5 cm or severe anemia (< 7 g/dL). Automatically locates nearest Nutrition Rehabilitation Centre (NRC) and dispatches 108 ambulance coordinates.',
      icon: AlertOctagon,
      color: 'rose',
      badge: '108 Ambulance Linked',
      metric: '<48h NRC Admission',
      actionText: 'Locate Health Centres',
      onClick: onOpenHealthCenters,
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} className="text-emerald-600" />
            <span>Comprehensive Pediatric Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight font-['Outfit']">
            Designed for Frontline Rigor. Built for Scale.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 mt-4 leading-relaxed font-normal">
            NutriChild+ bridges the gap between field-level anthropometric measurements and district-level clinical governance with medical-grade reliability.
          </p>
        </div>

        {/* Feature Big Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative bg-white rounded-[2rem] p-8 lg:p-9 border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] hover:border-zinc-950 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-100 text-zinc-900 border border-zinc-200 group-hover:bg-zinc-950 group-hover:text-white transition-all duration-300">
                      <Icon size={26} />
                    </div>

                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Eyebrow & Title */}
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-500 block mb-2">
                    {feature.eyebrow}
                  </span>
                  <h3 className="text-xl font-black text-zinc-950 mb-3 group-hover:text-zinc-900 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 leading-relaxed mb-6 font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Footer Action & Micro-Metric */}
                <div className="pt-5 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500">
                    {feature.metric}
                  </span>

                  {feature.onClick ? (
                    <button
                      onClick={feature.onClick}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 hover:text-emerald-700 transition cursor-pointer"
                    >
                      <span>{feature.actionText}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <a
                      href={feature.actionHref}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 hover:text-emerald-700 transition"
                    >
                      <span>{feature.actionText}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
