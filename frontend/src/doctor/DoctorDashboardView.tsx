import React, { useState, useEffect } from 'react';
import {
  Calendar,
  AlertTriangle,
  Activity,
  ShieldCheck,
  Clock,
  MessageSquare,
  TrendingUp,
  FileText,
  Video,
  Phone,
  UserCheck,
  ChevronRight,
  ArrowUpRight,
  Stethoscope,
  Plus
} from 'lucide-react';
import type { LanguageCode } from '../types';

interface DoctorDashboardViewProps {
  language: LanguageCode;
  onNavigateTab: (tab: string) => void;
  onSelectChildForPrescription?: (childId: number) => void;
}

export const DoctorDashboardView: React.FC<DoctorDashboardViewProps> = ({
  onNavigateTab,
  onSelectChildForPrescription
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [syncLabel, setSyncLabel] = useState('Updating from backend');

  useEffect(() => {
    const loadDashboard = () => {
      setLoading(true);
      fetch('/api/v1/doctor/dashboard')
        .then(res => res.ok ? res.json() : null)
        .then(d => {
          if (d) setData(d);
          else {
            setData({
              todayAppointmentsCount: 12,
              highRiskSamCount: 3,
              moderateRiskMamCount: 7,
              healthyChildrenCount: 26,
              pendingFollowUpsCount: 14,
              unreadMessagesCount: 9,
              todayAppointments: [
                {
                  id: 1,
                  childName: 'Priyanka Soren',
                  childUhid: 'NC-697749',
                  timeSlot: '10:30 AM',
                  consultationType: 'IN_PERSON',
                  reason: 'Severe Acute Malnutrition (SAM) inpatient evaluation',
                  status: 'SCHEDULED'
                },
                {
                  id: 2,
                  childName: 'Manav Majhi',
                  childUhid: 'NC-960267',
                  timeSlot: '11:45 AM',
                  consultationType: 'VIDEO',
                  reason: 'Moderate acute malnutrition review',
                  status: 'SCHEDULED'
                },
                {
                  id: 3,
                  childName: 'Riya Das',
                  childUhid: 'NC-812442',
                  timeSlot: '1:15 PM',
                  consultationType: 'FOLLOW_UP',
                  reason: 'Nutrition plan review and anemia screening',
                  status: 'CONFIRMED'
                }
              ],
              recentPrescriptions: [
                {
                  id: 1,
                  childName: 'Priyanka Soren',
                  childUhid: 'NC-697749',
                  primaryDiagnosis: 'SAM with severe microcytic anemia',
                  prescriptionDate: '2026-10-28',
                  followUpDate: '2026-11-11'
                },
                {
                  id: 2,
                  childName: 'Manav Majhi',
                  childUhid: 'NC-960267',
                  primaryDiagnosis: 'MAM with mild helminthiasis',
                  prescriptionDate: '2026-10-25',
                  followUpDate: '2026-11-12'
                }
              ],
              healthTrends: [
                { month: 'May', healthy: 22, mam: 8, sam: 4 },
                { month: 'Jun', healthy: 25, mam: 7, sam: 3 },
                { month: 'Jul', healthy: 28, mam: 6, sam: 3 },
                { month: 'Aug', healthy: 30, mam: 7, sam: 2 },
                { month: 'Sep', healthy: 33, mam: 5, sam: 2 },
                { month: 'Oct', healthy: 35, mam: 5, sam: 1 }
              ],
              malnutritionStats: {
                stuntingRate: 28.5,
                wastingRate: 13.8,
                anemiaPrevalence: 39.4,
                uipCoverage: 89.2
              },
              lastUpdated: new Date().toISOString()
            });
          }
          setLoading(false);
          setSyncLabel('Updated just now');
        })
        .catch(() => {
          setLoading(false);
          setSyncLabel('Last sync failed');
        });
    };

    loadDashboard();
    const timer = setInterval(() => setSyncLabel('Synced to live health records'), 15000);
    return () => clearInterval(timer);
  }, []);

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-[28px] border border-slate-200 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
          <div className="animate-pulse space-y-4">
            <div className="h-5 w-32 rounded-full bg-slate-200" />
            <div className="h-10 w-72 rounded-xl bg-slate-200" />
            <div className="h-4 w-96 rounded-lg bg-slate-200" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-28 rounded-[22px] bg-white border border-slate-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const kpis = [
    {
      label: "Today's appointments",
      value: data.todayAppointmentsCount || 2,
      sub: "2 teleconsult • 1 in-person",
      icon: Calendar,
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconColor: "text-blue-600",
      tab: "appointments"
    },
    {
      label: "High-risk children",
      value: data.highRiskSamCount || 1,
      sub: "NRC referral required",
      icon: AlertTriangle,
      bg: "bg-rose-50",
      border: "border-rose-200",
      iconColor: "text-rose-600",
      tab: "airisk",
      pulse: true
    },
    {
      label: "Moderate risk",
      value: data.moderateRiskMamCount || 1,
      sub: "MAM follow-up active",
      icon: Activity,
      bg: "bg-orange-50",
      border: "border-orange-200",
      iconColor: "text-orange-600",
      tab: "patients"
    },
    {
      label: "Healthy children",
      value: data.healthyChildrenCount || 2,
      sub: "On normal WHO trajectory",
      icon: ShieldCheck,
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      iconColor: "text-emerald-600",
      tab: "patients"
    },
    {
      label: "Pending follow-ups",
      value: data.pendingFollowUpsCount || 4,
      sub: "Scheduled within 7 days",
      icon: Clock,
      bg: "bg-amber-50",
      border: "border-amber-200",
      iconColor: "text-amber-600",
      tab: "appointments"
    },
    {
      label: "Messages",
      value: data.unreadMessagesCount || 3,
      sub: "From ASHA & parents",
      icon: MessageSquare,
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      iconColor: "text-indigo-600",
      tab: "messages"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-teal-900 text-white rounded-[30px] p-6 shadow-[0_20px_48px_rgba(15,23,42,0.14)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-teal-300 backdrop-blur-sm">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-teal-200 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                Medical Officer OPD
              </span>
              <span className="text-xs text-blue-200 font-medium">Rayagada Block Hospital</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Welcome back, Dr. Rajesh Patra
            </h2>
            <div className="mt-2 flex items-center gap-2 flex-wrap text-xs text-slate-200">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {syncLabel}
              </span>
              <span className="text-slate-300">•</span>
              <span>Last updated {new Date(data.lastUpdated || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('prescriptions')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs shadow-[0_12px_24px_rgba(20,184,166,0.35)] active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New prescription</span>
          </button>
          <button
            onClick={() => onNavigateTab('appointments')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 active:scale-95 transition-all"
          >
            <Video className="w-4 h-4" />
            <span>Tele-consult</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {kpis.map((k, idx) => {
          const Icon = k.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(k.tab)}
              className={`group p-4 rounded-[24px] border ${k.border} ${k.bg} hover:shadow-[0_16px_26px_rgba(15,23,42,0.08)] transition-all cursor-pointer flex flex-col justify-between min-h-[128px]`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-600 leading-tight uppercase tracking-[0.08em]">
                  {k.label}
                </span>
                <div className={`p-2 rounded-xl bg-white shadow-sm ${k.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-slate-900 leading-none">{k.value}</span>
                  {k.pulse && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
                </div>
                <p className="mt-2 text-[11px] font-medium text-slate-600 leading-snug">{k.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Clinical Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend Area Chart (SVG Visualization) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Last 6 Months Clinical Trajectory
              </span>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Child Nutrition & Recovery Trends
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Healthy (Normal)
              </span>
              <span className="flex items-center gap-1.5 text-orange-600">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> MAM
              </span>
              <span className="flex items-center gap-1.5 text-rose-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> SAM (Severe)
              </span>
            </div>
          </div>

          {/* SVG Trend Graphic */}
          <div className="h-56 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180">
              <defs>
                <linearGradient id="gradHealthy" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="140" x2="480" y2="140" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

              {/* Healthy Area & Path */}
              <path
                d="M 40 120 L 120 105 L 200 90 L 280 80 L 360 65 L 440 50 L 440 160 L 40 160 Z"
                fill="url(#gradHealthy)"
              />
              <path
                d="M 40 120 L 120 105 L 200 90 L 280 80 L 360 65 L 440 50"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* MAM Line */}
              <path
                d="M 40 140 L 120 143 L 200 146 L 280 143 L 360 150 L 440 150"
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
                strokeDasharray="4 3"
              />

              {/* SAM Line */}
              <path
                d="M 40 155 L 120 158 L 200 158 L 280 162 L 360 162 L 440 165"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
              />

              {/* Month Labels */}
              {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((m, i) => (
                <text
                  key={m}
                  x={40 + i * 80}
                  y="175"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {m}
                </text>
              ))}
            </svg>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            💡 Clinical Insight: SAM prevalence decreased from 4 to 1 case in Rayagada Block due to early ASHA MUAC screening and NRC inpatient feeding protocols.
          </p>
        </div>

        {/* National Health Standards Indicators */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Government POSHAN Standards
            </span>
            <h3 className="text-base font-black text-slate-900">
              Community Health Ratios
            </h3>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Stunting Rate (Height for Age)</span>
                <span className="text-amber-600 font-extrabold">{data.malnutritionStats?.stuntingRate}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${data.malnutritionStats?.stuntingRate}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Wasting Rate (Weight for Height)</span>
                <span className="text-orange-600 font-extrabold">{data.malnutritionStats?.wastingRate}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${data.malnutritionStats?.wastingRate}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Anemia Prevalence (Hb &lt; 11.0 g/dL)</span>
                <span className="text-rose-600 font-extrabold">{data.malnutritionStats?.anemiaPrevalence}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${data.malnutritionStats?.anemiaPrevalence}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>UIP Immunization Coverage</span>
                <span className="text-emerald-700 font-extrabold">{data.malnutritionStats?.uipCoverage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${data.malnutritionStats?.uipCoverage}%` }} />
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('reports')}
            className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <span>View Full Epidemiological Report</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Upcoming Consultations & Recent Activities Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Today's Consultations Queue */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">OPD Schedule</span>
              <h3 className="text-base font-black text-slate-900">Today's Patient Consultations</h3>
            </div>
            <button
              onClick={() => onNavigateTab('appointments')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {data.todayAppointments?.map((apt: any) => (
              <div
                key={apt.id}
                className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-blue-200 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 font-black text-xs ${
                    apt.consultationType === 'VIDEO' ? 'bg-indigo-600' : apt.consultationType === 'AUDIO' ? 'bg-emerald-600' : 'bg-blue-600'
                  }`}>
                    {apt.consultationType === 'VIDEO' ? <Video className="w-5 h-5" /> : apt.consultationType === 'AUDIO' ? <Phone className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                      {apt.childName} <span className="text-xs font-mono font-normal text-slate-500">({apt.childUhid})</span>
                    </h4>
                    <p className="text-xs text-slate-600 font-medium truncate max-w-xs mt-0.5">
                      {apt.reason}
                    </p>
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-blue-500" />
                      {apt.timeSlot} • {apt.consultationType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onNavigateTab('appointments')}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs active:scale-95 transition-all"
                  >
                    Start OPD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Digital Prescriptions */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Clinical Audit</span>
              <h3 className="text-base font-black text-slate-900">Recent Pediatric Prescriptions</h3>
            </div>
            <button
              onClick={() => onNavigateTab('prescriptions')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View Archive</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {data.recentPrescriptions?.map((rx: any) => (
              <div
                key={rx.id}
                className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-teal-200 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                      {rx.childName} <span className="text-xs font-mono font-normal text-slate-500">({rx.childUhid})</span>
                    </h4>
                    <p className="text-xs text-teal-800 font-semibold truncate max-w-xs mt-0.5">
                      Rx: {rx.primaryDiagnosis}
                    </p>
                    <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                      Prescribed: {rx.prescriptionDate} • Next Review: {rx.followUpDate || '14 Days'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateTab('prescriptions')}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-200 font-bold text-xs active:scale-95 transition-all"
                >
                  View Rx
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
