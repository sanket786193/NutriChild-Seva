import React, { useState } from 'react';
import {
  Menu, Search, Mic, Bell, Moon, Sun, Eye,
  Languages, UserCheck, Wifi, WifiOff, RefreshCw,
  Phone, Volume2, ChevronDown, Activity
} from 'lucide-react';
import type { UserRole, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SpeechEngine } from '../services/speech';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  isOnline: boolean;
  pendingSyncCount: number;
  onSync: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  onOpenVoiceAssistant: () => void;
  onEmergencySos: () => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const ROLES: { value: UserRole; label: string; emoji: string }[] = [
  { value: 'PARENT',       label: 'Parent / माता-पिता',     emoji: '👤' },
  { value: 'ASHA',         label: 'ASHA Worker',             emoji: '🩺' },
  { value: 'ANGANWADI',    label: 'Anganwadi Worker',        emoji: '🏡' },
  { value: 'DOCTOR',       label: 'Medical Officer',         emoji: '👨‍⚕️' },
  { value: 'GOVT_OFFICER', label: 'Government Officer',      emoji: '🏛️' },
  { value: 'ADMIN',        label: 'Administrator',           emoji: '⚙️' },
];

const LANGUAGES: { value: LanguageCode; label: string }[] = [
  { value: 'hi', label: 'हिंदी' },
  { value: 'or', label: 'ଓଡ଼ିଆ' },
  { value: 'mr', label: 'मराठी' },
  { value: 'bn', label: 'বাংলা' },
  { value: 'te', label: 'తెలుగు' },
  { value: 'ta', label: 'தமிழ்' },
  { value: 'en', label: 'English' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentRole, onRoleChange,
  language, onLanguageChange,
  isOnline, pendingSyncCount, onSync,
  highContrast, onToggleHighContrast,
  onOpenVoiceAssistant, onEmergencySos,
  sidebarCollapsed, onToggleSidebar,
  darkMode, onToggleDark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[language] || TRANSLATIONS.hi;

  const handleSpeak = () => {
    SpeechEngine.speak(`${t.appName}. ${t.tagline}. ${t.voicePrompts?.welcome ?? ''}`, language);
  };

  const currentRoleObj = ROLES.find(r => r.value === currentRole);

  return (
    <header className="nc-header">
      {/* ── Brand + sidebar toggle ── */}
      <div className="nc-header__brand">
        <button
          className="nc-sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <Menu size={16} />
        </button>
        <div className="nc-header__logo" aria-hidden="true">N+</div>
        <div className="nc-header__app-name">
          <strong>NutriChild+</strong>
          <span>Ministry of Health &amp; Family Welfare</span>
        </div>
      </div>

      {/* ── Global search ── */}
      <div className="nc-header__center">
        <div className="nc-search">
          <Search size={15} className="nc-search__icon" />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search child, UHID, village, parent…"
            aria-label="Global search"
          />
          <button className="nc-search__voice" onClick={onOpenVoiceAssistant} title="Voice search">
            <Mic size={14} />
          </button>
        </div>

        {/* Online / sync pill */}
        <button
          className={`nc-sync-pill ${isOnline ? 'online' : 'offline'}`}
          onClick={onSync}
          title={isOnline ? 'Connected – click to sync' : 'Offline – data saved locally'}
        >
          {isOnline
            ? <Wifi size={13} />
            : <WifiOff size={13} />}
          <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
          {pendingSyncCount > 0 && (
            <span style={{
              background: '#DC2626', color: 'white',
              fontSize: 10, fontWeight: 700,
              padding: '1px 6px', borderRadius: 10
            }}>
              {pendingSyncCount}
            </span>
          )}
          <RefreshCw size={12} className={pendingSyncCount > 0 ? 'audio-active' : ''} />
        </button>
      </div>

      {/* ── Right action cluster ── */}
      <div className="nc-header__right">
        {/* Language selector */}
        <select
          className="nc-header-select"
          value={language}
          onChange={e => onLanguageChange(e.target.value as LanguageCode)}
          aria-label="Select language"
          title="Language / भाषा"
        >
          {LANGUAGES.map(l => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>

        {/* Role selector */}
        <select
          className="nc-header-select"
          value={currentRole}
          onChange={e => onRoleChange(e.target.value as UserRole)}
          aria-label="Select role"
          title="Current role"
          style={{ maxWidth: 160 }}
        >
          {ROLES.map(r => (
            <option key={r.value} value={r.value}>{r.emoji} {r.label}</option>
          ))}
        </select>

        <div style={{ width: 1, height: 24, background: 'var(--nc-border)', margin: '0 4px' }} />

        {/* TTS – speak screen */}
        <button className="nc-hbtn" onClick={handleSpeak} title="Read screen aloud" aria-label="Text to speech">
          <Volume2 size={17} />
        </button>

        {/* Voice assistant */}
        <button className="nc-hbtn" onClick={onOpenVoiceAssistant} title="AI Voice Assistant" aria-label="Voice assistant">
          <Activity size={17} />
          <span className="nc-badge" style={{ background: 'var(--nc-healthy)' }} />
        </button>

        {/* Notifications */}
        <button className="nc-hbtn" title="Notifications" aria-label="Notifications">
          <Bell size={17} />
          <span className="nc-badge" />
        </button>

        {/* High contrast */}
        <button
          className="nc-hbtn"
          onClick={onToggleHighContrast}
          title="High contrast mode"
          aria-label="Toggle high contrast"
          aria-pressed={highContrast}
          style={highContrast ? { background: '#000', color: '#FACC15' } : {}}
        >
          <Eye size={17} />
        </button>

        {/* Dark mode */}
        <button
          className="nc-hbtn"
          onClick={onToggleDark}
          title="Toggle dark mode"
          aria-label="Toggle dark mode"
          aria-pressed={darkMode}
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Emergency SOS */}
        <button
          className="nc-hbtn nc-hbtn--sos"
          onClick={onEmergencySos}
          title="Emergency SOS – 108 Ambulance"
          aria-label="Emergency SOS"
        >
          <Phone size={14} />
          <span>108 SOS</span>
        </button>
      </div>
    </header>
  );
};
