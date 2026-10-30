import React from 'react';
import {
  LayoutDashboard, Users, UserPlus, TrendingUp, Apple,
  Syringe, Calendar, Stethoscope, BarChart3, MapPin,
  FileText, Cpu, Settings, LogOut, HeartPulse
} from 'lucide-react';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  id: string;
  badge?: number;
  section?: string;
}

const NAV_ITEMS: SidebarItem[] = [
  { id: 'dashboard',   icon: LayoutDashboard, label: 'Dashboard',           section: 'MAIN' },
  { id: 'children',    icon: Users,           label: 'Children',            section: 'MAIN' },
  { id: 'registration',icon: UserPlus,        label: 'Registration',        section: 'MAIN' },
  { id: 'growth',      icon: TrendingUp,      label: 'Growth Monitoring',   section: 'CLINICAL' },
  { id: 'nutrition',   icon: Apple,           label: 'Nutrition',           section: 'CLINICAL' },
  { id: 'vaccination', icon: Syringe,         label: 'Vaccination',         section: 'CLINICAL' },
  { id: 'appointments',icon: Calendar,        label: 'Appointments',        section: 'CLINICAL' },
  { id: 'doctor',      icon: Stethoscope,     label: 'Doctor Portal',       section: 'CLINICAL' },
  { id: 'ai',          icon: Cpu,             label: 'AI Assistant',        section: 'ANALYTICS' },
  { id: 'community',   icon: BarChart3,       label: 'Analytics',           section: 'ANALYTICS' },
  { id: 'reports',     icon: FileText,        label: 'Reports',             section: 'ANALYTICS' },
  { id: 'centers',     icon: MapPin,          label: 'Health Centers',      section: 'RESOURCES' },
  { id: 'schemes',     icon: HeartPulse,      label: 'Govt Schemes',        section: 'RESOURCES' },
  { id: 'settings',    icon: Settings,        label: 'Settings',            section: 'SYSTEM' },
];

const SECTIONS: { key: string; label: string }[] = [
  { key: 'MAIN',      label: 'Main' },
  { key: 'CLINICAL',  label: 'Clinical' },
  { key: 'ANALYTICS', label: 'Analytics' },
  { key: 'RESOURCES', label: 'Resources' },
  { key: 'SYSTEM',    label: 'System' },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  collapsed: boolean;
  vaccinationAlertCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab, onTabChange, collapsed, vaccinationAlertCount = 0
}) => {
  const itemsWithBadges = NAV_ITEMS.map(item => ({
    ...item,
    badge: item.id === 'vaccination' && vaccinationAlertCount > 0 ? vaccinationAlertCount : undefined
  }));

  return (
    <aside className="nc-sidebar" aria-label="Main navigation">
      {SECTIONS.map(section => {
        const items = itemsWithBadges.filter(i => i.section === section.key && i.id !== 'settings');
        if (items.length === 0) return null;
        return (
          <div key={section.key}>
            {!collapsed && (
              <div className="nc-sidebar__section">
                <p className="nc-sidebar__section-label">{section.label}</p>
              </div>
            )}
            <ul className="nc-sidebar__nav" style={{ paddingTop: collapsed ? 6 : 2, paddingBottom: 2 }}>
              {items.map(item => (
                <li key={item.id}>
                  <button
                    className={`nc-sidebar__item${activeTab === item.id ? ' active' : ''}`}
                    onClick={() => onTabChange(item.id)}
                    title={collapsed ? item.label : undefined}
                    aria-current={activeTab === item.id ? 'page' : undefined}
                  >
                    <item.icon className="nc-sidebar__icon" aria-hidden="true" />
                    <span className="nc-sidebar__label">{item.label}</span>
                    {item.badge && (
                      <span className="nc-sidebar__badge">{item.badge}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {/* Footer: settings + logout */}
      <div className="nc-sidebar__footer">
        <ul className="nc-sidebar__nav" style={{ padding: 0, gap: 2 }}>
          <li>
            <button
              className={`nc-sidebar__item${activeTab === 'settings' ? ' active' : ''}`}
              onClick={() => onTabChange('settings')}
              title={collapsed ? 'Settings' : undefined}
            >
              <Settings className="nc-sidebar__icon" size={18} aria-hidden="true" />
              <span className="nc-sidebar__label">Settings</span>
            </button>
          </li>
          <li>
            <button
              className="nc-sidebar__item"
              style={{ color: '#F87171' }}
              title={collapsed ? 'Logout' : undefined}
            >
              <LogOut className="nc-sidebar__icon" size={18} aria-hidden="true" />
              <span className="nc-sidebar__label">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};
