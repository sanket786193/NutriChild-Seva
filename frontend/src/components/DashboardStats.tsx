import React, { useEffect, useRef } from 'react';
import { Users, AlertTriangle, Syringe, Calendar, Apple, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Child } from '../types';

interface DashboardStatsProps {
  children: Child[];
}

function animateCount(el: HTMLElement, target: number, duration = 800) {
  const start = performance.now();
  const from = 0;
  const update = (time: number) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.round(from + (target - from) * eased));
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

interface StatCardProps {
  label: string;
  value: number;
  iconType: 'healthy' | 'warning' | 'high' | 'critical' | 'primary' | 'blue';
  icon: React.ElementType;
  trend: 'up' | 'down' | 'flat';
  trendLabel: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, iconType, icon: Icon, trend, trendLabel }) => {
  const valRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (valRef.current) animateCount(valRef.current, value);
  }, [value]);

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className={`nc-stat-card nc-stat-card--${iconType}`}>
      <div className="nc-stat-card__header">
        <div className={`nc-stat-card__icon ${iconType}`}>
          <Icon size={20} aria-hidden="true" />
        </div>
        <span className={`nc-stat-card__trend ${trend}`} aria-label={`Trend: ${trendLabel}`}>
          <TrendIcon size={11} aria-hidden="true" />
          {trendLabel}
        </span>
      </div>
      <div>
        <p className="nc-stat-card__value" aria-live="polite">
          <span ref={valRef}>0</span>
        </p>
        <p className="nc-stat-card__label">{label}</p>
      </div>
    </div>
  );
};

export const DashboardStats: React.FC<DashboardStatsProps> = ({ children }) => {
  const healthy   = children.filter(c => c.latestRiskCategory === 'GREEN').length;
  const moderate  = children.filter(c => c.latestRiskCategory === 'YELLOW' || c.latestRiskCategory === 'ORANGE').length;
  const critical  = children.filter(c => c.latestRiskCategory === 'RED').length;
  const overduVax = children.filter(c => (c.overdueVaccinesCount ?? 0) > 0).length;
  const anemia    = children.filter(c => c.latestAnemiaLevel && c.latestAnemiaLevel !== 'NORMAL').length;
  const total     = children.length;

  const stats: StatCardProps[] = [
    { label: 'Healthy Children',        value: healthy,  iconType: 'healthy',  icon: Users,          trend: 'up',   trendLabel: '+5%' },
    { label: 'Moderate Risk (MAM)',      value: moderate, iconType: 'warning',  icon: AlertTriangle,  trend: 'down', trendLabel: '-2%' },
    { label: 'Critical Cases (SAM)',     value: critical, iconType: 'critical', icon: AlertTriangle,  trend: 'up',   trendLabel: '+1%' },
    { label: 'Overdue Vaccinations',     value: overduVax,iconType: 'high',     icon: Syringe,        trend: 'flat', trendLabel: '0%'  },
    { label: 'Anaemia Alerts',           value: anemia,   iconType: 'primary',  icon: Apple,          trend: 'down', trendLabel: '-3%' },
    { label: 'Total Registered',         value: total,    iconType: 'blue',     icon: Calendar,       trend: 'up',   trendLabel: '+12%'},
  ];

  return (
    <section className="nc-stats-grid" aria-label="Summary statistics">
      {stats.map(s => (
        <StatCard key={s.label} {...s} />
      ))}
    </section>
  );
};
