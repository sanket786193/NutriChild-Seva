import React, { useState, useEffect } from 'react';
import {
  Users, UserPlus, Camera, FileText, Hospital,
  BarChart3, Stethoscope, Search, Filter
} from 'lucide-react';
import type { UserRole, LanguageCode, Child, GrowthRecord } from './types';
import { TRANSLATIONS } from './data/translations';
import { SpeechEngine } from './services/speech';
import { api } from './services/api';
import { getPendingSyncCount } from './services/db';

// Layout components
import { Navbar }  from './components/Navbar';
import { Sidebar } from './components/Sidebar';

// Feature components
import { ChildCard }             from './components/ChildCard';
import { DashboardStats }        from './components/DashboardStats';
import { VoiceAssistantModal }   from './components/VoiceAssistantModal';
import { QRCardModal }           from './components/QRCardModal';
import { GrowthAssessmentModal } from './components/GrowthAssessmentModal';
import { VaccineScheduleModal }  from './components/VaccineScheduleModal';
import { NutritionPlannerModal } from './components/NutritionPlannerModal';
import { HealthCenterFinderModal}from './components/HealthCenterFinderModal';
import { GovtSchemesModal }      from './components/GovtSchemesModal';
import { FoodPlateScannerModal } from './components/FoodPlateScannerModal';
import { RegisterChildModal }    from './components/RegisterChildModal';
import { CommunityDashboard }    from './components/CommunityDashboard';
import { DoctorPortal }          from './doctor/DoctorPortal';

// Navigation & Multi-Page Views (Included Health Theme)
import { MainHeader, type UserSession } from './components/navigation/MainHeader';
import { HomeView }                     from './components/pages/HomeView';
import { AuthView }                     from './components/pages/AuthView';
import { DoctorDashboardView }          from './components/pages/DoctorDashboardView';
import { PatientDashboardView }         from './components/pages/PatientDashboardView';
import { AppointmentsView }             from './components/pages/AppointmentsView';
import { ReportsView }                  from './components/pages/ReportsView';
import { NotificationsView }            from './components/pages/NotificationsView';
import { ProfileView }                  from './components/pages/ProfileView';
import { SettingsView }                 from './components/pages/SettingsView';

// Modern Redesign Sections
import { ModernNavbar }             from './components/redesign/ModernNavbar';
import { HeroSection }              from './components/redesign/HeroSection';
import { KpiStatsSection }          from './components/redesign/KpiStatsSection';
import { FeatureCardsSection }      from './components/redesign/FeatureCardsSection';
import { InteractiveConsoleSection }from './components/redesign/InteractiveConsoleSection';
import { VitalsSimulator }          from './components/redesign/VitalsSimulator';
import { ArchitectureSection }      from './components/redesign/ArchitectureSection';
import { TestimonialsTrustSection } from './components/redesign/TestimonialsTrustSection';
import { ConsultationContactSection } from './components/redesign/ConsultationContactSection';
import { ModernFooter }             from './components/redesign/ModernFooter';
import { SearchModal }              from './components/redesign/SearchModal';

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export const App: React.FC = () => {
  // Layout state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode,         setDarkMode]         = useState(false);
  const [highContrast,     setHighContrast]     = useState(false);

  // Multi-Page Navigation & Session State (Included Health Theme)
  const [currentPage,      setCurrentPage]      = useState<string>('home');
  const [session,          setSession]          = useState<UserSession>({
    isLoggedIn: false,
    name: 'Sunita Devi (Parent)',
    role: 'PARENT',
    emailOrPhone: '9876543210',
    avatarInitial: 'SD',
  });
  const [authInitialMode,  setAuthInitialMode]  = useState<'login' | 'register'>('login');
  const [authInitialRole,  setAuthInitialRole]  = useState<'DOCTOR' | 'PATIENT'>('PATIENT');

  // App state
  const [activeView,   setActiveView]   = useState<'platform' | 'workstation'>('platform');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentRole,  setCurrentRole]  = useState<UserRole>('ASHA');
  const [language,     setLanguage]     = useState<LanguageCode>('hi');
  const [isOnline,     setIsOnline]     = useState(navigator.onLine);
  const [pendingSync,  setPendingSync]  = useState(0);
  const [activeTab,    setActiveTab]    = useState('children');

  // Data
  const [children,       setChildren]       = useState<Child[]>([]);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [selectedVillage,setSelectedVillage]= useState('ALL');
  const [filterRisk,     setFilterRisk]     = useState('ALL');

  // Modals
  const [selectedChild,       setSelectedChild]       = useState<Child | null>(null);
  const [isGrowthModalOpen,   setIsGrowthModalOpen]   = useState(false);
  const [isVaccinesModalOpen, setIsVaccinesModalOpen] = useState(false);
  const [isQRModalOpen,       setIsQRModalOpen]       = useState(false);
  const [isNutritionModalOpen,setIsNutritionModalOpen]= useState(false);
  const [isVoiceOpen,         setIsVoiceOpen]         = useState(false);
  const [isHealthCenterOpen,  setIsHealthCenterOpen]  = useState(false);
  const [isGovtSchemesOpen,   setIsGovtSchemesOpen]   = useState(false);
  const [isPlateScannerOpen,  setIsPlateScannerOpen]  = useState(false);
  const [isRegisterOpen,      setIsRegisterOpen]      = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.hi;

  // Dark mode toggle on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Global search shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(p => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Online/offline detection
  useEffect(() => {
    const handleOnline  = () => { setIsOnline(true);  api.syncOfflineBatch().then(updatePending); };
    const handleOffline = () =>   setIsOnline(false);
    window.addEventListener('online',  handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online',  handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updatePending = async () => { setPendingSync(await getPendingSyncCount()); };

  const loadChildren = async () => {
    const list = await api.getChildren();
    setChildren(list);
    await updatePending();
  };

  useEffect(() => { loadChildren(); }, []);

  const handleManualSync = async () => {
    const res = await api.syncOfflineBatch();
    await loadChildren();
    SpeechEngine.speak(res.message, language);
  };

  const handleEmergencySos = () => {
    SpeechEngine.speak('आपातकालीन 108 एम्बुलेंस सेवा से संपर्क किया जा रहा है।', language);
    setIsHealthCenterOpen(true);
  };

  const handleGrowthSaved = (saved: GrowthRecord) => {
    setChildren(prev => prev.map(c =>
      c.id === saved.childId
        ? { ...c, latestRiskCategory: saved.riskCategory, latestWeightKg: saved.weightKg,
            latestHeightCm: saved.heightCm, latestMuacCm: saved.muacCm, wastingStatus: saved.wastingStatus }
        : c
    ));
    updatePending();
  };

  const handleChildRegistered = (child: Child) => {
    setChildren(prev => [child, ...prev]);
    updatePending();
  };

  // Filtered children list
  const filteredChildren = children.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchQ = !q
      || c.fullName.toLowerCase().includes(q)
      || c.uhid.toLowerCase().includes(q)
      || (c.village ?? '').toLowerCase().includes(q)
      || (c.parentName ?? '').toLowerCase().includes(q);
    const matchVillage = selectedVillage === 'ALL' || c.village === selectedVillage;
    const matchRisk    = filterRisk    === 'ALL' || c.latestRiskCategory === filterRisk;
    return matchQ && matchVillage && matchRisk;
  });

  // Unique villages from data
  const villages = Array.from(new Set(children.map(c => c.village).filter(Boolean)));

  // Overdue vax count for sidebar badge
  const overdueVaxCount = children.filter(c => (c.overdueVaccinesCount ?? 0) > 0).length;

  // Doctor portal shortcut
  const handleSidebarTab = (id: string) => {
    setActiveTab(id);
    if (id === 'doctor') setCurrentRole('DOCTOR');
  };

  const sectionMeta: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'District Nutritional Overview', subtitle: 'National Programme for Child Health & Nutrition · Rayagada District' },
    children: { title: 'Child Registry', subtitle: 'Track every child, entire family care journey, and follow-up progression.' },
    registration: { title: 'New Registration', subtitle: 'Capture and validate new child records before first follow-up.' },
    growth: { title: 'Growth Monitoring', subtitle: 'Review weight, height, MUAC and seasonal growth trend indicators.' },
    nutrition: { title: 'Nutrition Care', subtitle: 'Meal planning and nutrition support by risk level and age band.' },
    vaccination: { title: 'Vaccination Schedule', subtitle: 'Coverage tracking, overdue list and scheduled immunisation visits.' },
    appointments: { title: 'Appointments & Visits', subtitle: 'Upcoming outreach, checkups and counselling sessions for families.' },
    doctor: { title: 'Doctor Portal', subtitle: 'Clinical review and treatment decisions by qualified medical officers.' },
    ai: { title: 'AI Assistant', subtitle: 'AI-powered support for risk interpretation and patient advice.' },
    community: { title: 'Community Analytics', subtitle: 'Block-level trends, risk hotspots and programme performance by village.' },
    analytics: { title: 'Analytics & Insights', subtitle: 'Operational reporting across nutrition, vaccination and outreach performance.' },
    reports: { title: 'Reports & Exports', subtitle: 'Actionable summaries for field teams, supervision and government review.' },
    centers: { title: 'Health Centres', subtitle: 'Nearby facilities and referral pathways for child health services.' },
    schemes: { title: 'Government Schemes', subtitle: 'Entitlement and benefit programmes linked to child health support.' },
    settings: { title: 'System Settings', subtitle: 'Configuration, alerts, language settings and role preferences.' },
  };

  const primarySection = sectionMeta[activeTab] ?? sectionMeta.dashboard;

  const liveStats = {
    totalChildren: Math.max(children.length || 1284, 1284),
    healthy: Math.max(children.filter(c => c.latestRiskCategory === 'GREEN').length || 462, 462),
    moderate: Math.max(children.filter(c => c.latestRiskCategory === 'YELLOW' || c.latestRiskCategory === 'ORANGE').length || 281, 281),
    critical: Math.max(children.filter(c => c.latestRiskCategory === 'RED').length || 39, 39),
    vaccinationCoverage: 92,
    completeness: 89,
    outreach: 76,
    lastUpdated: new Date(Date.now() - 2 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    syncText: isOnline ? 'Live sync active' : 'Offline cache active'
  };

  const renderDashboardPage = () => (
    <>
      <DashboardStats children={children} />

      <div className="nc-live-panel">
        <div className="nc-live-panel__header">
          <div>
            <span className="nc-live-panel__label">Operational feed</span>
            <strong>District health sync · {liveStats.lastUpdated}</strong>
          </div>
          <span className="nc-live-panel__badge"><span className={`nc-online-dot ${isOnline ? 'online' : 'offline'}`} aria-hidden="true" />{liveStats.syncText}</span>
        </div>
        <div className="nc-metric-grid">
          {[
            { label: 'Children monitored', value: liveStats.totalChildren.toLocaleString(), delta: '+6.4% vs last week', tone: 'teal', progress: 82 },
            { label: 'Vaccination coverage', value: `${liveStats.vaccinationCoverage}%`, delta: '2,134 doses recorded', tone: 'blue', progress: 92 },
            { label: 'Growth checks', value: `${liveStats.completeness}%`, delta: 'Data quality stable', tone: 'green', progress: 89 },
            { label: 'High-risk alerts', value: liveStats.critical.toLocaleString(), delta: 'Need field review', tone: 'red', progress: 71 }
          ].map(item => (
            <article key={item.label} className={`nc-metric-card nc-metric-card--${item.tone}`}>
              <div className="nc-metric-card__top-row">
                <span>{item.label}</span>
                <span className="nc-metric-card__delta">{item.delta}</span>
              </div>
              <div className="nc-metric-card__value">{item.value}</div>
              <div className="nc-progress-track" aria-hidden="true"><span style={{ width: `${item.progress}%` }} /></div>
            </article>
          ))}
        </div>
      </div>

      <div className="nc-section-grid">
        <article className="nc-section-card nc-section-card--teal">
          <span className="nc-section-card__eyebrow">High-risk watchlist</span>
          <h3>Priority follow-up</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--danger">{liveStats.critical}</span> SAM cases need NRC review</li>
            <li><span className="nc-pill nc-pill--amber">{liveStats.moderate}</span> MAM children due nutrition counselling</li>
            <li><span className="nc-pill nc-pill--blue">12</span> scheduled outreach checks this week</li>
          </ul>
        </article>

        <article className="nc-section-card nc-section-card--white">
          <span className="nc-section-card__eyebrow">Field performance</span>
          <h3>Operational status</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--green">{liveStats.vaccinationCoverage}%</span> vaccination coverage</li>
            <li><span className="nc-pill nc-pill--teal">{liveStats.completeness}%</span> growth monitoring completion</li>
            <li><span className="nc-pill nc-pill--gray">16</span> pending child registrations</li>
          </ul>
        </article>

        <article className="nc-section-card nc-section-card--white">
          <span className="nc-section-card__eyebrow">Referrals</span>
          <h3>Care coordination</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--danger">4</span> urgent referrals to CHC</li>
            <li><span className="nc-pill nc-pill--amber">9</span> home visits pending</li>
            <li><span className="nc-pill nc-pill--blue">2</span> outreach camps planned</li>
          </ul>
        </article>
      </div>
    </>
  );

  const renderChildrenPage = () => (
    <div>
      <div className="nc-filter-bar" role="search">
        <div className="nc-filter-search">
          <Search size={15} className="nc-filter-search__icon" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, UHID, village, parent…"
            aria-label="Search children"
          />
        </div>

        <div className="nc-filter-chip-group" role="group" aria-label="Filters">
          <select
            className="nc-filter-chip"
            value={selectedVillage}
            onChange={e => setSelectedVillage(e.target.value)}
            aria-label="Filter by village"
          >
            <option value="ALL">All Villages</option>
            {villages.map(v => (
              <option key={v} value={v!}>{v}</option>
            ))}
          </select>

          {(['ALL','GREEN','ORANGE','RED'] as const).map(r => (
            <button
              key={r}
              className={`nc-risk-chip ${r.toLowerCase()}${filterRisk === r ? ' sel' : ''}`}
              onClick={() => setFilterRisk(r)}
              aria-pressed={filterRisk === r}
            >
              {r === 'ALL' && '⬤ All'}
              {r === 'GREEN' && '🟢 Healthy'}
              {r === 'ORANGE' && '🟠 MAM'}
              {r === 'RED' && '🔴 SAM'}
            </button>
          ))}

          {(searchQuery || selectedVillage !== 'ALL' || filterRisk !== 'ALL') && (
            <button
              className="nc-btn nc-btn--sm nc-btn--secondary"
              onClick={() => { setSearchQuery(''); setSelectedVillage('ALL'); setFilterRisk('ALL'); }}
              aria-label="Clear all filters"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredChildren.length === 0 ? (
        <div className="nc-empty" role="status">
          <div className="nc-empty__icon"><Users size={28} aria-hidden="true" /></div>
          <h4>No children found</h4>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="nc-children-grid" role="list" aria-label="Children list">
          {filteredChildren.map(c => (
            <ChildCard
              key={c.id ?? c.uhid}
              child={c}
              language={language}
              onOpenGrowthModal={child => { setSelectedChild(child); setIsGrowthModalOpen(true); }}
              onOpenVaccinesModal={child => { setSelectedChild(child); setIsVaccinesModalOpen(true); }}
              onOpenQRModal={child => { setSelectedChild(child); setIsQRModalOpen(true); }}
              onOpenNutritionModal={child => { setSelectedChild(child); setIsNutritionModalOpen(true); }}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderRegistrationPage = () => (
    <div className="nc-section-page">
      <div className="nc-live-panel">
        <div className="nc-live-panel__header">
          <div>
            <span className="nc-live-panel__label">Registration pipeline</span>
            <strong>Live intake queue · updated {liveStats.lastUpdated}</strong>
          </div>
          <span className="nc-live-panel__badge"><span className="nc-online-dot online" aria-hidden="true" />Synced to district server</span>
        </div>
        <div className="nc-metric-grid">
          {[
            { label: 'New registrations', value: '18', delta: '+4 this week', tone: 'teal', progress: 74 },
            { label: 'Forms pending review', value: '6', delta: '2 awaiting ASHA approval', tone: 'amber', progress: 46 },
            { label: 'Document completeness', value: '94%', delta: 'Up 2.1% this month', tone: 'green', progress: 94 },
            { label: 'Mother-child linkage', value: '87%', delta: 'Consistent across villages', tone: 'blue', progress: 87 }
          ].map(item => (
            <article key={item.label} className={`nc-metric-card nc-metric-card--${item.tone}`}>
              <div className="nc-metric-card__top-row">
                <span>{item.label}</span>
                <span className="nc-metric-card__delta">{item.delta}</span>
              </div>
              <div className="nc-metric-card__value">{item.value}</div>
              <div className="nc-progress-track" aria-hidden="true"><span style={{ width: `${item.progress}%` }} /></div>
            </article>
          ))}
        </div>
      </div>

      <div className="nc-section-grid">
        <article className="nc-section-card nc-section-card--teal">
          <span className="nc-section-card__eyebrow">Registration workflow</span>
          <h3>New child intake</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--green">1</span> Verify UHID and demographic details</li>
            <li><span className="nc-pill nc-pill--green">2</span> Record birth date and guardian information</li>
            <li><span className="nc-pill nc-pill--green">3</span> Schedule first growth and nutrition check</li>
          </ul>
        </article>

        <article className="nc-section-card nc-section-card--white">
          <span className="nc-section-card__eyebrow">Pending reviews</span>
          <h3>Admission queue</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--amber">6</span> forms waiting review</li>
            <li><span className="nc-pill nc-pill--blue">3</span> follow-up calls scheduled</li>
            <li><span className="nc-pill nc-pill--gray">2</span> documents incomplete</li>
          </ul>
        </article>
      </div>

      <div className="nc-section-card">
        <div className="nc-section-card__header">
          <div>
            <span className="nc-section-card__eyebrow">Compliance</span>
            <h3>Registration checklist</h3>
          </div>
          <button className="nc-btn nc-btn--primary" onClick={() => setIsRegisterOpen(true)}>
            <UserPlus size={15} aria-hidden="true" />
            Add new child
          </button>
        </div>
        <div className="nc-section-list">
          <div className="nc-section-list__row"><span>Birth certificate</span><strong>Verified</strong></div>
          <div className="nc-section-list__row"><span>Parent contact</span><strong>Captured</strong></div>
          <div className="nc-section-list__row"><span>Initial anthropometry</span><strong>Pending</strong></div>
          <div className="nc-section-list__row"><span>Village linkage</span><strong>Complete</strong></div>
        </div>
      </div>
    </div>
  );

  const renderGrowthPage = () => (
    <div className="nc-section-page">
      <div className="nc-live-panel">
        <div className="nc-live-panel__header">
          <div>
            <span className="nc-live-panel__label">Growth monitoring</span>
            <strong>Anthropometry feed · {liveStats.lastUpdated}</strong>
          </div>
          <span className="nc-live-panel__badge"><span className="nc-online-dot online" aria-hidden="true" />Data source: ANM app sync</span>
        </div>
        <div className="nc-metric-grid">
          {[
            { label: 'Healthy children', value: liveStats.healthy.toLocaleString(), delta: '+9 this week', tone: 'green', progress: 76 },
            { label: 'Moderate risk', value: liveStats.moderate.toLocaleString(), delta: '18 due recheck', tone: 'amber', progress: 58 },
            { label: 'Critical alerts', value: liveStats.critical.toLocaleString(), delta: 'NRC review queue', tone: 'red', progress: 42 },
            { label: 'Measurement compliance', value: '86%', delta: 'Updated 1h ago', tone: 'blue', progress: 86 }
          ].map(item => (
            <article key={item.label} className={`nc-metric-card nc-metric-card--${item.tone}`}>
              <div className="nc-metric-card__top-row">
                <span>{item.label}</span>
                <span className="nc-metric-card__delta">{item.delta}</span>
              </div>
              <div className="nc-metric-card__value">{item.value}</div>
              <div className="nc-progress-track" aria-hidden="true"><span style={{ width: `${item.progress}%` }} /></div>
            </article>
          ))}
        </div>
      </div>

      <div className="nc-section-grid">
        <article className="nc-section-card nc-section-card--teal">
          <span className="nc-section-card__eyebrow">Growth status</span>
          <h3>Anthropometric review</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--green">{children.filter(c => c.latestRiskCategory === 'GREEN').length || 462}</span> healthy children</li>
            <li><span className="nc-pill nc-pill--amber">{children.filter(c => c.latestRiskCategory === 'YELLOW' || c.latestRiskCategory === 'ORANGE').length || 281}</span> moderate concern</li>
            <li><span className="nc-pill nc-pill--danger">{children.filter(c => c.latestRiskCategory === 'RED').length || 39}</span> critical alerts</li>
          </ul>
        </article>

        <article className="nc-section-card nc-section-card--white">
          <span className="nc-section-card__eyebrow">Follow-up metrics</span>
          <h3>Monitoring score</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--blue">86%</span> measurement compliance</li>
            <li><span className="nc-pill nc-pill--teal">17</span> due for reassessment</li>
            <li><span className="nc-pill nc-pill--gray">4</span> overdue checks</li>
          </ul>
        </article>
      </div>

      <div className="nc-section-card">
        <div className="nc-section-card__header">
          <div>
            <span className="nc-section-card__eyebrow">Growth trend</span>
            <h3>Recent assessment timeline</h3>
          </div>
        </div>
        <div className="nc-section-list">
          {children.slice(0, 5).map(child => (
            <div className="nc-section-list__row" key={child.id ?? child.uhid}>
              <span>{child.fullName}</span>
              <strong>{child.latestWeightKg ?? '—'} kg / {child.latestHeightCm ?? '—'} cm</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNutritionPage = () => (
    <div className="nc-section-page">
      <div className="nc-live-panel">
        <div className="nc-live-panel__header">
          <div>
            <span className="nc-live-panel__label">Nutrition intake</span>
            <strong>Field counselling sync · {liveStats.lastUpdated}</strong>
          </div>
          <span className="nc-live-panel__badge"><span className="nc-online-dot online" aria-hidden="true" />Linked to ward supervisors</span>
        </div>
        <div className="nc-metric-grid">
          {[
            { label: 'Good nutrition', value: '184', delta: '+12 this month', tone: 'green', progress: 81 },
            { label: 'Moderate risk', value: '96', delta: '17 due follow-up', tone: 'amber', progress: 58 },
            { label: 'Severe cases', value: '26', delta: '3 newly escalated', tone: 'red', progress: 37 },
            { label: 'Adherence', value: '79%', delta: 'Stable this week', tone: 'blue', progress: 79 }
          ].map(item => (
            <article key={item.label} className={`nc-metric-card nc-metric-card--${item.tone}`}>
              <div className="nc-metric-card__top-row">
                <span>{item.label}</span>
                <span className="nc-metric-card__delta">{item.delta}</span>
              </div>
              <div className="nc-metric-card__value">{item.value}</div>
              <div className="nc-progress-track" aria-hidden="true"><span style={{ width: `${item.progress}%` }} /></div>
            </article>
          ))}
        </div>
      </div>

      <div className="nc-section-grid">
        <article className="nc-section-card nc-section-card--teal">
          <span className="nc-section-card__eyebrow">Nutrition risk</span>
          <h3>Diet support overview</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--green">18</span> children on good nutrition</li>
            <li><span className="nc-pill nc-pill--amber">11</span> moderate risk plans</li>
            <li><span className="nc-pill nc-pill--danger">7</span> severe deficiency cases</li>
          </ul>
        </article>

        <article className="nc-section-card nc-section-card--white">
          <span className="nc-section-card__eyebrow">Meal adherence</span>
          <h3>Counselling status</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--blue">79%</span> adherence rate</li>
            <li><span className="nc-pill nc-pill--teal">22</span> plan reviews due</li>
            <li><span className="nc-pill nc-pill--gray">5</span> household visits pending</li>
          </ul>
        </article>
      </div>

      <div className="nc-section-card">
        <div className="nc-section-card__header">
          <div>
            <span className="nc-section-card__eyebrow">Nutrition plans</span>
            <h3>Care plans by category</h3>
          </div>
        </div>
        <div className="nc-section-list">
          <div className="nc-section-list__row"><span>Balanced meal planning</span><strong>21 children</strong></div>
          <div className="nc-section-list__row"><span>Energy-dense supplements</span><strong>9 children</strong></div>
          <div className="nc-section-list__row"><span>Family counselling</span><strong>14 households</strong></div>
          <div className="nc-section-list__row"><span>Referral to nutrition unit</span><strong>3 children</strong></div>
        </div>
      </div>
    </div>
  );

  const renderVaccinationPage = () => (
    <div className="nc-section-page">
      <div className="nc-live-panel">
        <div className="nc-live-panel__header">
          <div>
            <span className="nc-live-panel__label">Immunisation status</span>
            <strong>Vaccine registry sync · {liveStats.lastUpdated}</strong>
          </div>
          <span className="nc-live-panel__badge"><span className="nc-online-dot online" aria-hidden="true" />Cold chain verified</span>
        </div>
        <div className="nc-metric-grid">
          {[
            { label: 'Coverage', value: '92%', delta: '+3.4% this month', tone: 'blue', progress: 92 },
            { label: 'Due this week', value: '14', delta: 'Across 6 villages', tone: 'amber', progress: 52 },
            { label: 'Missed doses', value: '6', delta: '1 severe follow-up', tone: 'red', progress: 34 },
            { label: 'Sessions booked', value: '4', delta: '2 mobile outreach', tone: 'green', progress: 74 }
          ].map(item => (
            <article key={item.label} className={`nc-metric-card nc-metric-card--${item.tone}`}>
              <div className="nc-metric-card__top-row">
                <span>{item.label}</span>
                <span className="nc-metric-card__delta">{item.delta}</span>
              </div>
              <div className="nc-metric-card__value">{item.value}</div>
              <div className="nc-progress-track" aria-hidden="true"><span style={{ width: `${item.progress}%` }} /></div>
            </article>
          ))}
        </div>
      </div>

      <div className="nc-section-grid">
        <article className="nc-section-card nc-section-card--teal">
          <span className="nc-section-card__eyebrow">Coverage</span>
          <h3>Immunisation overview</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--blue">92%</span> covered</li>
            <li><span className="nc-pill nc-pill--amber">14</span> due this week</li>
            <li><span className="nc-pill nc-pill--danger">6</span> missed doses</li>
          </ul>
        </article>

        <article className="nc-section-card nc-section-card--white">
          <span className="nc-section-card__eyebrow">Vaccine support</span>
          <h3>Session planning</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--green">4</span> mobile sessions</li>
            <li><span className="nc-pill nc-pill--teal">2</span> cold chain checks</li>
            <li><span className="nc-pill nc-pill--gray">1</span> stock review pending</li>
          </ul>
        </article>
      </div>

      <div className="nc-section-card">
        <div className="nc-section-card__header">
          <div>
            <span className="nc-section-card__eyebrow">Immunisation schedule</span>
            <h3>Due and upcoming visits</h3>
          </div>
        </div>
        <div className="nc-section-list">
          <div className="nc-section-list__row"><span>Measles + MR</span><strong>6 due</strong></div>
          <div className="nc-section-list__row"><span>Vitamin A</span><strong>9 due</strong></div>
          <div className="nc-section-list__row"><span>DPT booster</span><strong>5 due</strong></div>
          <div className="nc-section-list__row"><span>OPV booster</span><strong>3 due</strong></div>
        </div>
      </div>
    </div>
  );

  const renderAppointmentsPage = () => (
    <div className="nc-section-page">
      <div className="nc-live-panel">
        <div className="nc-live-panel__header">
          <div>
            <span className="nc-live-panel__label">Visit coordination</span>
            <strong>Community outreach timing · {liveStats.lastUpdated}</strong>
          </div>
          <span className="nc-live-panel__badge"><span className="nc-online-dot online" aria-hidden="true" />Route updated 8 minutes ago</span>
        </div>
        <div className="nc-metric-grid">
          {[
            { label: 'Total visits', value: '12', delta: '4 confirmed today', tone: 'blue', progress: 77 },
            { label: 'At-risk follow-ups', value: '4', delta: '2 require care escalation', tone: 'amber', progress: 49 },
            { label: 'Routine checkups', value: '8', delta: 'ASHA scheduling active', tone: 'green', progress: 80 },
            { label: 'Attendance rate', value: '86%', delta: 'Stable with field teams', tone: 'teal', progress: 86 }
          ].map(item => (
            <article key={item.label} className={`nc-metric-card nc-metric-card--${item.tone}`}>
              <div className="nc-metric-card__top-row">
                <span>{item.label}</span>
                <span className="nc-metric-card__delta">{item.delta}</span>
              </div>
              <div className="nc-metric-card__value">{item.value}</div>
              <div className="nc-progress-track" aria-hidden="true"><span style={{ width: `${item.progress}%` }} /></div>
            </article>
          ))}
        </div>
      </div>

      <div className="nc-section-grid">
        <article className="nc-section-card nc-section-card--teal">
          <span className="nc-section-card__eyebrow">Visits</span>
          <h3>Upcoming schedule</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--blue">12</span> total visits</li>
            <li><span className="nc-pill nc-pill--amber">4</span> at-risk follow-ups</li>
            <li><span className="nc-pill nc-pill--green">8</span> routine checkups</li>
          </ul>
        </article>

        <article className="nc-section-card nc-section-card--white">
          <span className="nc-section-card__eyebrow">Session quality</span>
          <h3>Outreach status</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--teal">86%</span> attendance</li>
            <li><span className="nc-pill nc-pill--gray">3</span> postponed</li>
            <li><span className="nc-pill nc-pill--blue">2</span> camp dates confirmed</li>
          </ul>
        </article>
      </div>

      <div className="nc-section-card">
        <div className="nc-section-card__header">
          <div>
            <span className="nc-section-card__eyebrow">This week</span>
            <h3>Appointment list</h3>
          </div>
        </div>
        <div className="nc-section-list">
          <div className="nc-section-list__row"><span>Nutrition counselling</span><strong>Tue · 10:30 AM</strong></div>
          <div className="nc-section-list__row"><span>Follow-up growth check</span><strong>Wed · 12:00 PM</strong></div>
          <div className="nc-section-list__row"><span>Vaccination drive</span><strong>Thu · 9:00 AM</strong></div>
          <div className="nc-section-list__row"><span>Referral review</span><strong>Fri · 2:00 PM</strong></div>
        </div>
      </div>
    </div>
  );

  const renderReportsPage = () => (
    <div className="nc-section-page">
      <div className="nc-live-panel">
        <div className="nc-live-panel__header">
          <div>
            <span className="nc-live-panel__label">Report generator</span>
            <strong>Government summary feed · {liveStats.lastUpdated}</strong>
          </div>
          <span className="nc-live-panel__badge"><span className="nc-online-dot online" aria-hidden="true" />Export ready</span>
        </div>
        <div className="nc-metric-grid">
          {[
            { label: 'Children tracked', value: '1,284', delta: '+46 this month', tone: 'teal', progress: 88 },
            { label: 'Data completeness', value: '89%', delta: '3 records pending', tone: 'green', progress: 89 },
            { label: 'Anomalies flagged', value: '2', delta: '1 requires review', tone: 'red', progress: 26 },
            { label: 'Reports exported', value: '9', delta: 'This week', tone: 'blue', progress: 70 }
          ].map(item => (
            <article key={item.label} className={`nc-metric-card nc-metric-card--${item.tone}`}>
              <div className="nc-metric-card__top-row">
                <span>{item.label}</span>
                <span className="nc-metric-card__delta">{item.delta}</span>
              </div>
              <div className="nc-metric-card__value">{item.value}</div>
              <div className="nc-progress-track" aria-hidden="true"><span style={{ width: `${item.progress}%` }} /></div>
            </article>
          ))}
        </div>
      </div>

      <div className="nc-section-grid">
        <article className="nc-section-card nc-section-card--teal">
          <span className="nc-section-card__eyebrow">Monthly report</span>
          <h3>Population summary</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--green">1,284</span> children tracked</li>
            <li><span className="nc-pill nc-pill--blue">89%</span> data completeness</li>
            <li><span className="nc-pill nc-pill--gray">17</span> outreach updates</li>
          </ul>
        </article>

        <article className="nc-section-card nc-section-card--white">
          <span className="nc-section-card__eyebrow">Supervision</span>
          <h3>Review notes</h3>
          <ul className="nc-mini-list">
            <li><span className="nc-pill nc-pill--amber">4</span> follow-up actions</li>
            <li><span className="nc-pill nc-pill--teal">9</span> reports exported</li>
            <li><span className="nc-pill nc-pill--danger">2</span> anomalies flagged</li>
          </ul>
        </article>
      </div>
    </div>
  );

  const renderCentersPage = () => (
    <div className="nc-section-page">
      <div className="nc-live-panel">
        <div className="nc-live-panel__header">
          <div>
            <span className="nc-live-panel__label">Facility registry</span>
            <strong>Referral network · {liveStats.lastUpdated}</strong>
          </div>
          <span className="nc-live-panel__badge"><span className="nc-online-dot online" aria-hidden="true" />Live facility feed</span>
        </div>
      </div>
      <div className="nc-section-grid">
        {[
          ['Rayagada CHC', '12 min away', 'Ambulatory child consultation', 'Available', 'Open'],
          ['Gajapati PHC', '16 min away', 'Vaccination and referral support', 'Limited', 'Open'],
          ['NRC Unit', '8 min away', 'Severe malnutrition monitoring', 'Critical', 'High priority'],
          ['Urban Clinic', '22 min away', 'Outreach and growth screening', 'Available', 'Open']
        ].map(([name, distance, detail, status, availability]) => (
          <article className="nc-section-card nc-section-card--white" key={name}>
            <span className="nc-section-card__eyebrow">Facility</span>
            <h3>{name}</h3>
            <p className="nc-section-card__meta">{distance}</p>
            <p className="nc-section-card__text">{detail}</p>
            <div className="nc-facility-row">
              <span className="nc-status-chip nc-status-chip--soft">{status}</span>
              <span className="nc-status-chip nc-status-chip--muted">{availability}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderSchemesPage = () => (
    <div className="nc-section-page">
      <div className="nc-live-panel">
        <div className="nc-live-panel__header">
          <div>
            <span className="nc-live-panel__label">Entitlements</span>
            <strong>Benefit coverage sync · {liveStats.lastUpdated}</strong>
          </div>
          <span className="nc-live-panel__badge"><span className="nc-online-dot online" aria-hidden="true" />Updated from PMU</span>
        </div>
      </div>
      <div className="nc-section-grid">
        {[
          ['POSHAN Abhiyaan', 'Nutrition support and counselling', '84%', '1,200 eligible'],
          ['Mission Indradhanush', 'Immunisation follow-up and coverage', '92%', '604 children enrolled'],
          ['PMMVY', 'Maternal and child support coverage', '71%', '298 households active'],
          ['Ayushman Bharat', 'Treatment referrals and assistance', '67%', '61 pending approvals']
        ].map(([name, detail, coverage, active]) => (
          <article className="nc-section-card nc-section-card--white" key={name}>
            <span className="nc-section-card__eyebrow">Programme</span>
            <h3>{name}</h3>
            <p className="nc-section-card__text">{detail}</p>
            <div className="nc-facility-row">
              <span className="nc-status-chip nc-status-chip--teal">{coverage}</span>
              <span className="nc-status-chip nc-status-chip--muted">{active}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderSettingsPage = () => (
    <div className="nc-section-page">
      <div className="nc-section-card">
        <div className="nc-section-card__header">
          <div>
            <span className="nc-section-card__eyebrow">Preferences</span>
            <h3>Configuration</h3>
          </div>
        </div>
        <div className="nc-section-list">
          <div className="nc-section-list__row"><span>Language</span><strong>{language.toUpperCase()}</strong></div>
          <div className="nc-section-list__row"><span>High contrast</span><strong>{highContrast ? 'Enabled' : 'Disabled'}</strong></div>
          <div className="nc-section-list__row"><span>Offline sync</span><strong>{isOnline ? 'Connected' : 'Waiting for network'}</strong></div>
          <div className="nc-section-list__row"><span>Alert thresholds</span><strong>Custom</strong></div>
        </div>
      </div>
      <div className="nc-section-card nc-section-card--white">
        <div className="nc-section-card__header">
          <div>
            <span className="nc-section-card__eyebrow">System controls</span>
            <h3>Live operation settings</h3>
          </div>
        </div>
        <div className="nc-settings-grid">
          <div className="nc-setting-row"><span>Auto sync</span><span className="nc-status-chip nc-status-chip--teal">Enabled</span></div>
          <div className="nc-setting-row"><span>Last health API sync</span><span className="nc-status-chip nc-status-chip--muted">{liveStats.lastUpdated}</span></div>
          <div className="nc-setting-row"><span>Notification policy</span><span className="nc-status-chip nc-status-chip--soft">Critical only</span></div>
          <div className="nc-setting-row"><span>Offline mode</span><span className="nc-status-chip nc-status-chip--soft">{isOnline ? 'Standby' : 'Active'}</span></div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'community' || activeTab === 'analytics') {
      return <CommunityDashboard language={language} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return renderDashboardPage();
      case 'children':
        return renderChildrenPage();
      case 'registration':
        return renderRegistrationPage();
      case 'growth':
        return renderGrowthPage();
      case 'nutrition':
        return renderNutritionPage();
      case 'vaccination':
        return renderVaccinationPage();
      case 'appointments':
        return renderAppointmentsPage();
      case 'reports':
        return renderReportsPage();
      case 'centers':
        return renderCentersPage();
      case 'schemes':
        return renderSchemesPage();
      case 'settings':
        return renderSettingsPage();
      default:
        return renderDashboardPage();
    }
  };

  /* ── Master Redesigned Healthcare Platform Shell ── */
  if (activeView === 'platform') {
    return (
      <div
        className={`min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-['Outfit'] antialiased selection:bg-zinc-900 selection:text-white ${
          highContrast ? 'high-contrast' : ''
        }`}
        data-theme={darkMode ? 'dark' : 'light'}
      >
        {/* Included Health Inspired Modern Header */}
        <MainHeader
          currentPage={currentPage}
          onNavigate={page => setCurrentPage(page)}
          session={session}
          onLogout={() => {
            setSession({
              isLoggedIn: false,
              name: '',
              role: 'PARENT',
              emailOrPhone: '',
              avatarInitial: '',
            });
            setCurrentPage('home');
          }}
          onOpenAuth={(mode, roleTarget) => {
            setAuthInitialMode(mode);
            if (roleTarget) setAuthInitialRole(roleTarget);
            setCurrentPage('auth');
          }}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenVoiceAssistant={() => setIsVoiceOpen(true)}
          onEmergencySos={handleEmergencySos}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(p => !p)}
          highContrast={highContrast}
          onToggleHighContrast={() => setHighContrast(p => !p)}
        />

        {/* ── Page Views Router ── */}
        <main>
          {currentPage === 'home' && (
            <>
              {/* Home Page (Included Health inspired layout) */}
              <HomeView
                onNavigate={setCurrentPage}
                onOpenAuth={(mode, roleTarget) => {
                  setAuthInitialMode(mode);
                  if (roleTarget) setAuthInitialRole(roleTarget);
                  setCurrentPage('auth');
                }}
                onOpenVoiceAssistant={() => setIsVoiceOpen(true)}
                onEmergencySos={handleEmergencySos}
                childrenList={children}
              />

              {/* Dynamic KPI Stats Cards */}
              <KpiStatsSection />

              {/* Core Feature Architecture Cards */}
              <FeatureCardsSection
                onOpenVoiceAssistant={() => setIsVoiceOpen(true)}
                onOpenHealthCenters={() => setIsHealthCenterOpen(true)}
                onOpenPlateScanner={() => setIsPlateScannerOpen(true)}
                onOpenGovtSchemes={() => setIsGovtSchemesOpen(true)}
                onOpenRegisterModal={() => setIsRegisterOpen(true)}
              />

              {/* Live District Operations Console (Child Cards & Actions) */}
              <InteractiveConsoleSection
                childrenList={children}
                language={language}
                onOpenGrowthModal={child => { setSelectedChild(child); setIsGrowthModalOpen(true); }}
                onOpenVaccinesModal={child => { setSelectedChild(child); setIsVaccinesModalOpen(true); }}
                onOpenQRModal={child => { setSelectedChild(child); setIsQRModalOpen(true); }}
                onOpenNutritionModal={child => { setSelectedChild(child); setIsNutritionModalOpen(true); }}
                onOpenRegisterModal={() => setIsRegisterOpen(true)}
                onOpenHealthCenters={() => setIsHealthCenterOpen(true)}
                onOpenPlateScanner={() => setIsPlateScannerOpen(true)}
                onOpenGovtSchemes={() => setIsGovtSchemesOpen(true)}
              />

              {/* Interactive WHO Vitals Simulator Tool */}
              <VitalsSimulator />

              {/* Sectioned Content Blocks: Architecture Continuum */}
              <ArchitectureSection />

              {/* Field Validation & Compliance Accreditations */}
              <TestimonialsTrustSection />

              {/* District Pilot Consultation Form */}
              <ConsultationContactSection />
            </>
          )}

          {currentPage === 'auth' && (
            <AuthView
              initialMode={authInitialMode}
              initialRole={authInitialRole}
              onLoginSuccess={newSession => {
                setSession(newSession);
                setCurrentRole(newSession.role);
                if (newSession.role === 'DOCTOR') {
                  setCurrentPage('doctor-dashboard');
                } else {
                  setCurrentPage('patient-dashboard');
                }
              }}
              onCancel={() => setCurrentPage('home')}
            />
          )}

          {currentPage === 'doctor-dashboard' && (
            <DoctorDashboardView
              childrenList={children}
              onOpenGrowthModal={child => { setSelectedChild(child); setIsGrowthModalOpen(true); }}
              onOpenVaccinesModal={child => { setSelectedChild(child); setIsVaccinesModalOpen(true); }}
              onOpenQRModal={child => { setSelectedChild(child); setIsQRModalOpen(true); }}
              onOpenNutritionModal={child => { setSelectedChild(child); setIsNutritionModalOpen(true); }}
              onOpenHealthCenters={() => setIsHealthCenterOpen(true)}
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'patient-dashboard' && (
            <PatientDashboardView
              onNavigate={setCurrentPage}
              onOpenQRModal={child => { setSelectedChild(child); setIsQRModalOpen(true); }}
              onOpenGrowthModal={child => { setSelectedChild(child); setIsGrowthModalOpen(true); }}
              onOpenVaccinesModal={child => { setSelectedChild(child); setIsVaccinesModalOpen(true); }}
              onOpenNutritionModal={child => { setSelectedChild(child); setIsNutritionModalOpen(true); }}
              onOpenVoiceAssistant={() => setIsVoiceOpen(true)}
              onEmergencySos={handleEmergencySos}
              patientChild={children[0] || {
                uhid: 'NC-2026-101',
                fullName: 'Aarav Kumar',
                dateOfBirth: '2024-04-15',
                gender: 'MALE',
                village: 'Kalyanpur',
                latestWeightKg: 11.2,
                latestHeightCm: 82.5,
                latestMuacCm: 14.2,
                latestRiskCategory: 'GREEN',
              }}
            />
          )}

          {currentPage === 'appointments' && (
            <AppointmentsView />
          )}

          {currentPage === 'reports' && (
            <ReportsView />
          )}

          {currentPage === 'notifications' && (
            <NotificationsView />
          )}

          {currentPage === 'profile' && (
            <ProfileView
              session={session}
              onOpenQRModal={() => {
                if (children[0]) {
                  setSelectedChild(children[0]);
                  setIsQRModalOpen(true);
                }
              }}
            />
          )}

          {currentPage === 'settings' && (
            <SettingsView
              language={language}
              onLanguageChange={setLanguage}
              onSync={handleManualSync}
            />
          )}
        </main>

        {/* Structured Clean Modern Footer */}
        {currentPage !== 'auth' && <ModernFooter />}

        {/* Global Search Modal (⌘K / Ctrl+K) */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          childrenList={children}
          onOpenGrowthModal={child => { setSelectedChild(child); setIsGrowthModalOpen(true); }}
          onOpenVaccinesModal={child => { setSelectedChild(child); setIsVaccinesModalOpen(true); }}
          onOpenQRModal={child => { setSelectedChild(child); setIsQRModalOpen(true); }}
          onOpenVoiceAssistant={() => setIsVoiceOpen(true)}
          onEmergencySos={handleEmergencySos}
        />

        {/* Modals */}
        <VoiceAssistantModal
          isOpen={isVoiceOpen}
          onClose={() => setIsVoiceOpen(false)}
          language={language}
        />
        <QRCardModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          child={selectedChild}
          language={language}
        />
        <GrowthAssessmentModal
          isOpen={isGrowthModalOpen}
          onClose={() => setIsGrowthModalOpen(false)}
          child={selectedChild}
          language={language}
          onSaved={handleGrowthSaved}
        />
        <VaccineScheduleModal
          isOpen={isVaccinesModalOpen}
          onClose={() => setIsVaccinesModalOpen(false)}
          child={selectedChild}
          language={language}
        />
        <NutritionPlannerModal
          isOpen={isNutritionModalOpen}
          onClose={() => setIsNutritionModalOpen(false)}
          child={selectedChild}
          language={language}
        />
        <HealthCenterFinderModal
          isOpen={isHealthCenterOpen}
          onClose={() => setIsHealthCenterOpen(false)}
          language={language}
        />
        <GovtSchemesModal
          isOpen={isGovtSchemesOpen}
          onClose={() => setIsGovtSchemesOpen(false)}
          language={language}
        />
        <FoodPlateScannerModal
          isOpen={isPlateScannerOpen}
          onClose={() => setIsPlateScannerOpen(false)}
          language={language}
        />
        <RegisterChildModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          language={language}
          onChildRegistered={handleChildRegistered}
        />
      </div>
    );
  }

  /* ── Doctor portal full-screen ── */
  if (currentRole === 'DOCTOR' && activeView === 'workstation') {
    return (
      <DoctorPortal
        language={language}
        onLanguageChange={setLanguage}
        onSwitchRole={role => {
          setCurrentRole(role);
          if (role !== 'DOCTOR') setActiveView('platform');
        }}
        onEmergencySos={handleEmergencySos}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(p => !p)}
      />
    );
  }

  /* ── Shell ── */
  return (
    <div
      className={`nc-app-shell${sidebarCollapsed ? ' sidebar-collapsed' : ''}${highContrast ? ' high-contrast' : ''}`}
      data-theme={darkMode ? 'dark' : 'light'}
    >
      {/* Sticky header spans full width */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        language={language}
        onLanguageChange={setLanguage}
        isOnline={isOnline}
        pendingSyncCount={pendingSync}
        onSync={handleManualSync}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(p => !p)}
        onOpenVoiceAssistant={() => setIsVoiceOpen(true)}
        onEmergencySos={handleEmergencySos}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(p => !p)}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(p => !p)}
      />

      {/* Collapsible sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleSidebarTab}
        collapsed={sidebarCollapsed}
        vaccinationAlertCount={overdueVaxCount}
      />

      {/* Scrollable main content */}
      <main className="nc-main" id="main-content">
        {/* Breadcrumb */}
        <nav className="nc-breadcrumb" aria-label="Breadcrumb">
          <span>NutriChild+</span>
          <span className="nc-breadcrumb__sep" aria-hidden="true">›</span>
          <span className="nc-breadcrumb__current" aria-current="page">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </span>
        </nav>

        {/* Page header */}
        <div className="nc-page-header">
          <div>
            <h1 className="nc-page-title">{primarySection.title}</h1>
            <p className="nc-page-subtitle">{primarySection.subtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              className="nc-btn nc-btn--secondary"
              onClick={() => setActiveView('platform')}
              style={{ fontWeight: 600 }}
              title="Return to the public platform overview"
            >
              ← Platform Overview
            </button>
            <button
              className="nc-btn nc-btn--primary"
              onClick={() => setIsRegisterOpen(true)}
              aria-label="Register a new child"
            >
              <UserPlus size={15} aria-hidden="true" />
              Register Child
            </button>
          </div>
        </div>

        {renderContent()}
      </main>

      {/* ── Modals ── */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        language={language}
      />
      <QRCardModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        child={selectedChild}
        language={language}
      />
      <GrowthAssessmentModal
        isOpen={isGrowthModalOpen}
        onClose={() => setIsGrowthModalOpen(false)}
        child={selectedChild}
        language={language}
        onSaved={handleGrowthSaved}
      />
      <VaccineScheduleModal
        isOpen={isVaccinesModalOpen}
        onClose={() => setIsVaccinesModalOpen(false)}
        child={selectedChild}
        language={language}
      />
      <NutritionPlannerModal
        isOpen={isNutritionModalOpen}
        onClose={() => setIsNutritionModalOpen(false)}
        child={selectedChild}
        language={language}
      />
      <HealthCenterFinderModal
        isOpen={isHealthCenterOpen}
        onClose={() => setIsHealthCenterOpen(false)}
        language={language}
      />
      <GovtSchemesModal
        isOpen={isGovtSchemesOpen}
        onClose={() => setIsGovtSchemesOpen(false)}
        language={language}
      />
      <FoodPlateScannerModal
        isOpen={isPlateScannerOpen}
        onClose={() => setIsPlateScannerOpen(false)}
        language={language}
      />
      <RegisterChildModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        language={language}
        onChildRegistered={handleChildRegistered}
      />
    </div>
  );
};

export default App;
