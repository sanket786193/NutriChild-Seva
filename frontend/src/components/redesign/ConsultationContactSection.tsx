import React, { useState } from 'react';
import {
  Send, Mail, Phone, MapPin, CheckCircle2,
  Clock, ShieldCheck, Building, HelpCircle, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ConsultationContactSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [role, setRole] = useState('Govt Health Official / CDPO');
  const [targetPopulation, setTargetPopulation] = useState('10,000 - 50,000 Children (District)');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'WHO Growth Engine',
    'Offline Dexie Sync',
  ]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const modulesList = [
    'WHO Growth Engine',
    'Offline Dexie Sync',
    'UIP Vaccine Tracking',
    'Vernacular Voice AI',
    'SAM / NRC Referral',
    'Poshan Ration AI',
  ];

  const toggleModule = (mod: string) => {
    setSelectedModules(prev =>
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="consultation" className="py-20 sm:py-24 bg-[#fafafa] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Outreach & SLA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 text-xs font-bold uppercase tracking-wider">
              <Building size={14} className="text-zinc-800" />
              <span>Government &amp; Health Organization Desk</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight font-['Outfit']">
              Initiate a District Pilot or Clinical Consultation
            </h2>

            <p className="text-base text-zinc-600 leading-relaxed font-normal">
              We partner directly with District Collectors, Chief District Medical Officers (CDMO), CDPO supervisors, and global health foundations to deploy NutriChild+ across aspirational districts.
            </p>

            {/* Direct Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-zinc-950">
                    4-Hour Official Health SLA
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-0.5">
                    Official deployment inquiries are acknowledged within 4 business hours.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-zinc-950">
                    Direct Implementation Desk
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-0.5">
                    deploy@nutrichild.org.in · Rayagada Health Mission HQ
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-zinc-950">
                    Frontline Emergency Referral Coordinator
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-0.5">
                    Toll-Free Health Helpdesk: 1800-419-7000 (Odia, Hindi, English)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Big Form Card */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 sm:p-12 border border-zinc-200/90 shadow-[0_16px_50px_rgba(0,0,0,0.06)]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-black text-zinc-950 mb-2">
                  Consultation Request Dispatched
                </h3>
                <p className="text-sm text-zinc-600 max-w-md mx-auto mb-6">
                  Thank you, {fullName}. Our district deployment officer has received your brief and will connect within 4 hours to review sandbox credentials.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="px-6 py-3 rounded-full bg-zinc-950 text-white font-bold text-xs"
                >
                  Submit Another Inflow
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-zinc-950 mb-1">
                    Request Health Sandbox or Pilot
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium">
                    Fields marked with * are required for district clearance.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-zinc-800 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Dr. Rajesh Patra"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-950 bg-zinc-50 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-800 block mb-1.5">
                      Official Government / Agency Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. dr.patra@health.gov.in"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-950 bg-zinc-50 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-zinc-800 block mb-1.5">
                      Designation / Role
                    </label>
                    <select
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-950 bg-zinc-50 font-medium cursor-pointer"
                    >
                      <option>Govt Health Official / CDPO</option>
                      <option>Chief District Medical Officer (CDMO)</option>
                      <option>Pediatrician / Medical Officer</option>
                      <option>Health Foundation / NGO Director</option>
                      <option>Other Public Health Stakeholder</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-800 block mb-1.5">
                      Target Child Population
                    </label>
                    <select
                      value={targetPopulation}
                      onChange={e => setTargetPopulation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-950 bg-zinc-50 font-medium cursor-pointer"
                    >
                      <option>&lt; 5,000 Children (Sector/Block)</option>
                      <option>10,000 - 50,000 Children (District)</option>
                      <option>50,000 - 200,000 Children (Multi-District)</option>
                      <option>&gt; 200,000 Children (State Mission)</option>
                    </select>
                  </div>
                </div>

                {/* Modules of interest selection pills */}
                <div>
                  <label className="text-xs font-bold text-zinc-800 block mb-2">
                    Priority Infrastructure Modules
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {modulesList.map(mod => {
                      const sel = selectedModules.includes(mod);
                      return (
                        <button
                          key={mod}
                          type="button"
                          onClick={() => toggleModule(mod)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                            sel
                              ? 'bg-zinc-950 text-white shadow-xs'
                              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200'
                          }`}
                        >
                          {sel && '✓ '}
                          {mod}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-800 block mb-1.5">
                    Pilot Requirements / Geographic Constraints
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Specify target blocks, Anganwadi counts, or offline operational needs..."
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-950 bg-zinc-50 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Transmitting Request...' : 'Dispatch Deployment Brief'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
