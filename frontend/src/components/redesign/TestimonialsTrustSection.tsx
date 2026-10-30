import React from 'react';
import {
  Quote, ShieldCheck, Award, Heart, CheckCircle2,
  Building, Star, Users, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

export const TestimonialsTrustSection: React.FC = () => {
  const testimonials = [
    {
      id: 'mo-doctor',
      name: 'Dr. Rajesh Patra, MD (Pediatrics)',
      role: 'Chief Medical Officer & NRC Director',
      location: 'District Headquarters Hospital, Rayagada',
      avatarInitial: 'RP',
      avatarBg: 'bg-zinc-950 text-white',
      quote:
        '“In rural tribal blocks like Rayagada, identifying severe acute malnutrition early is literally the difference between life and death. NutriChild+ automates WHO Z-score calculations at the village doorstep so ASHA workers refer SAM children with edema to our NRC in hours rather than weeks.”',
      metric: '48hr Referral SLA Achieved',
      verified: 'Medical Officer Verified',
    },
    {
      id: 'asha-worker',
      name: 'Kamla Bai',
      role: 'Lead ASHA Health Worker (12 Years Service)',
      location: 'Kalyanpur Health Sector, Rayagada',
      avatarInitial: 'KB',
      avatarBg: 'bg-zinc-800 text-white',
      quote:
        '“Earlier, calculating growth charts with thick paper registers was very difficult and mistakes happened. With NutriChild+ voice assistant, I can speak in Odia or Hindi, measure the MUAC arm tape, and the app instantly tells the mother if her child needs fortified Take-Home Ration.”',
      metric: '100% Door-to-Door Screening',
      verified: 'Frontline ASHA Worker',
    },
    {
      id: 'cdpo-officer',
      name: 'Smt. Anuradha Das, OAS',
      role: 'Child Development Project Officer (CDPO)',
      location: 'Department of Women & Child Development',
      avatarInitial: 'AD',
      avatarBg: 'bg-zinc-900 text-white',
      quote:
        '“The offline sync engine is extraordinary. Even when our Anganwadi workers conduct Village Health Sanitation and Nutrition Days (VHSND) deep in the hills with zero network, records sync automatically the moment they return to the road. Our district coverage reached 94.8%.”',
      metric: '94.8% Immunization Coverage',
      verified: 'Government Officer (CDPO)',
    },
  ];

  const trustBadges = [
    {
      title: 'National Health Mission',
      sub: 'Standardized UIP Protocol',
      icon: ShieldCheck,
    },
    {
      title: 'POSHAN Abhiyaan 2.0',
      sub: 'Ministry of WCD Compliant',
      icon: Award,
    },
    {
      title: 'WHO MGRS Standards',
      sub: '±0.01 SD Pediatric Accuracy',
      icon: CheckCircle2,
    },
    {
      title: 'ABDM Sandbox Ready',
      sub: 'Ayushman Bharat Digital Grid',
      icon: Building,
    },
    {
      title: 'DPDP Act 2023 Compliant',
      sub: 'Cryptographic Health Privacy',
      icon: Star,
    },
  ];

  return (
    <section id="trust" className="py-20 sm:py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 text-xs font-bold uppercase tracking-wider mb-4">
            <Heart size={14} className="text-emerald-600" />
            <span>Field Validation &amp; Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight font-['Outfit']">
            Trusted by Doctors, ASHA Workers &amp; Health Officers
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 mt-4 leading-relaxed font-normal">
            Engineered in close collaboration with rural pediatricians and frontline village champions battling childhood stunting and mortality.
          </p>
        </div>

        {/* Big Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[#fafafa] rounded-[2rem] p-8 lg:p-9 border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-zinc-950 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white text-zinc-900 border border-zinc-200 shadow-2xs">
                    {item.metric}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-zinc-700 leading-relaxed italic mb-8 font-normal">
                  {item.quote}
                </p>
              </div>

              <div className="pt-5 border-t border-zinc-200 flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${item.avatarBg}`}>
                  {item.avatarInitial}
                </div>
                <div>
                  <h4 className="text-sm font-black text-zinc-950">
                    {item.name}
                  </h4>
                  <p className="text-xs text-zinc-700 font-bold">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-zinc-500 truncate">
                    {item.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Big Compliance & Standards Accreditation Box */}
        <div className="rounded-[2.5rem] bg-zinc-950 text-white p-8 sm:p-12 border border-zinc-900 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block mb-2">
              Statutory Accreditation &amp; Governance
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Compliant with National &amp; Global Healthcare Protocols
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {trustBadges.map(b => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center flex flex-col items-center justify-center hover:border-zinc-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-white border border-white/10 flex items-center justify-center mb-3">
                    <Icon size={18} />
                  </div>
                  <h5 className="text-xs font-black text-white">{b.title}</h5>
                  <p className="text-[11px] text-zinc-400 mt-1">{b.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
