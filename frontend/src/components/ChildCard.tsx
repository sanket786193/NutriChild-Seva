import React from 'react';
import {
  Scale, Ruler, Activity, QrCode, Volume2, Syringe, Apple, MapPin,
  AlertTriangle, TrendingUp, User
} from 'lucide-react';
import type { Child, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SpeechEngine } from '../services/speech';

interface ChildCardProps {
  child: Child;
  language: LanguageCode;
  onOpenGrowthModal: (child: Child) => void;
  onOpenVaccinesModal: (child: Child) => void;
  onOpenQRModal: (child: Child) => void;
  onOpenNutritionModal: (child: Child) => void;
}

type RiskKey = 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';

const RISK_META: Record<RiskKey, { label: string; dotColor: string }> = {
  GREEN:  { label: 'Healthy',        dotColor: '#16A34A' },
  YELLOW: { label: 'Mild Risk',      dotColor: '#EAB308' },
  ORANGE: { label: 'Moderate (MAM)', dotColor: '#EA580C' },
  RED:    { label: 'Critical (SAM)', dotColor: '#DC2626' },
};

function calcAgeMonths(dob: string): number {
  const birth = new Date(dob);
  const now = new Date();
  return Math.max(0, (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth()));
}

function calcBMI(weightKg?: number, heightCm?: number): string {
  if (!weightKg || !heightCm) return '—';
  const h = heightCm / 100;
  return (weightKg / (h * h)).toFixed(1);
}

// Fake vaccine progress (overdue means lower percentage)
function vaccProgress(overdue?: number): number {
  if (!overdue) return 95;
  return Math.max(10, 100 - overdue * 4);
}

export const ChildCard: React.FC<ChildCardProps> = ({
  child, language,
  onOpenGrowthModal, onOpenVaccinesModal, onOpenQRModal, onOpenNutritionModal,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.hi;
  const risk = (child.latestRiskCategory ?? 'GREEN') as RiskKey;
  const meta = RISK_META[risk];
  const ageMonths = calcAgeMonths(child.dateOfBirth);
  const ageLabel = ageMonths >= 12
    ? `${Math.floor(ageMonths / 12)}y ${ageMonths % 12}m`
    : `${ageMonths}m`;
  const bmi = calcBMI(child.latestWeightKg, child.latestHeightCm);
  const vaxPct = vaccProgress(child.overdueVaccinesCount);

  const handleSpeak = () => {
    let msg = `${child.fullName}. Age: ${ageLabel}. `;
    if (child.latestWeightKg) msg += `Weight: ${child.latestWeightKg} kg. `;
    if (risk === 'RED')    msg += t.voicePrompts?.samAlert    ?? 'Critical – immediate care needed.';
    if (risk === 'ORANGE') msg += t.voicePrompts?.mamAlert    ?? 'Moderate risk – follow up required.';
    if (risk === 'GREEN')  msg += t.voicePrompts?.healthyChild ?? 'Child is healthy.';
    SpeechEngine.speak(msg, language);
  };

  const nutritionScore = Math.max(42, Math.min(96, 100 - (risk === 'RED' ? 34 : risk === 'ORANGE' ? 20 : risk === 'YELLOW' ? 10 : 2) - (child.overdueVaccinesCount ?? 0) * 3));
  const reviewWindow = (child.overdueVaccinesCount ?? 0) > 0 ? `${child.overdueVaccinesCount} due` : 'Up to date';

  return (
    <article className={`nc-child-card ${risk}`} aria-label={`Child: ${child.fullName}`}>
      <div className="nc-child-card__body">
        <div className="nc-child-card__top">
          <div className={`nc-child-avatar ${child.gender === 'FEMALE' ? 'female' : 'male'}`} aria-hidden="true">
            {child.gender === 'FEMALE' ? '👧' : '👦'}
          </div>

          <div className="nc-child-card__info">
            <div className="nc-child-card__heading-row">
              <h3 className="nc-child-card__name">{child.fullName}</h3>
              <button
                className="nc-speak-btn"
                onClick={handleSpeak}
                title="Listen to status"
                aria-label={`Read status of ${child.fullName}`}
              >
                <Volume2 size={12} />
              </button>
            </div>

            <div className="nc-child-card__meta-row">
              <span className="nc-child-card__meta-pill">
                <MapPin size={11} aria-hidden="true" />
                {child.village ?? 'Unknown'}
              </span>
              <span className="nc-child-card__meta-pill">
                <strong>{child.uhid}</strong>
              </span>
              <span className="nc-child-card__meta-pill">{ageLabel}</span>
            </div>
          </div>

          <span className={`nc-risk-badge ${risk}`} aria-label={`Risk: ${meta.label}`}>
            <span className="dot" style={{ background: meta.dotColor }} aria-hidden="true" />
            {meta.label}
          </span>
        </div>

        <div className="nc-child-card__status-row">
          <span className="nc-status-live"><span className="live-indicator" aria-hidden="true" />Live record</span>
          <span className="nc-status-update">Updated 14m ago</span>
        </div>

        <div className="nc-vitals-grid">
          <div className="nc-vital-tile">
            <span className="nc-vital-tile__label">Weight</span>
            <span className="nc-vital-tile__value">
              {child.latestWeightKg ?? '—'}<span className="nc-vital-tile__unit"> kg</span>
            </span>
          </div>
          <div className="nc-vital-tile">
            <span className="nc-vital-tile__label">Height</span>
            <span className="nc-vital-tile__value">
              {child.latestHeightCm ?? '—'}<span className="nc-vital-tile__unit"> cm</span>
            </span>
          </div>
          <div className="nc-vital-tile">
            <span className="nc-vital-tile__label">BMI</span>
            <span className="nc-vital-tile__value">{bmi}</span>
          </div>
          <div className="nc-vital-tile nc-vital-tile--accent">
            <span className="nc-vital-tile__label">MUAC</span>
            <span className="nc-vital-tile__value">{child.latestMuacCm ?? '—'}<span className="nc-vital-tile__unit"> cm</span></span>
          </div>
        </div>

        <div className="nc-child-card__summary">
          <div className="nc-summary-pill">
            <span className="nc-summary-pill__label">Nutrition</span>
            <strong>{Math.round(nutritionScore)}%</strong>
          </div>
          <div className="nc-summary-pill">
            <span className="nc-summary-pill__label">Review</span>
            <strong>{reviewWindow}</strong>
          </div>
        </div>

        {child.latestMuacCm && (
          <div className="nc-muac-row">
            <span className="nc-muac-row__label">
              <Activity size={13} style={{ verticalAlign: 'middle', marginRight: 4, color: '#DC2626' }} aria-hidden="true" />
              MUAC status
            </span>
            <span className="nc-muac-row__value">{child.latestMuacCm} cm</span>
            {child.wastingStatus && child.wastingStatus !== 'NORMAL' && (
              <span className="nc-muac-row__chip">
                <AlertTriangle size={10} style={{ verticalAlign: 'middle', marginRight: 3 }} aria-hidden="true" />
                {child.wastingStatus}
              </span>
            )}
          </div>
        )}

        <div className="nc-vax-bar">
          <div className="nc-vax-bar__header">
            <span>Vaccination coverage</span>
            {(child.overdueVaccinesCount ?? 0) > 0 ? (
              <strong>⚠ {child.overdueVaccinesCount} overdue</strong>
            ) : (
              <strong>Up to date</strong>
            )}
          </div>
          <div className="nc-progress-track" role="progressbar" aria-valuenow={vaxPct} aria-valuemin={0} aria-valuemax={100} aria-label="Vaccination progress">
            <div className="nc-progress-fill" style={{ width: `${vaxPct}%` }} />
          </div>
        </div>

        {child.latestAnemiaLevel && child.latestAnemiaLevel !== 'NORMAL' && (
          <div className="nc-anemia-banner">
            <AlertTriangle size={13} aria-hidden="true" />
            Anemia: {child.latestAnemiaLevel}
          </div>
        )}
      </div>

      <div className="nc-child-card__actions" role="toolbar" aria-label="Quick actions">
        <button
          className="nc-action-btn"
          onClick={() => onOpenGrowthModal(child)}
          aria-label={`Record growth for ${child.fullName}`}
        >
          <Scale aria-hidden="true" />
          Growth
        </button>
        <button
          className="nc-action-btn"
          onClick={() => onOpenVaccinesModal(child)}
          aria-label={`View vaccines for ${child.fullName}`}
          style={(child.overdueVaccinesCount ?? 0) > 0 ? { color: '#DC2626' } : {}}
        >
          <Syringe aria-hidden="true" />
          Vaccines
        </button>
        <button
          className="nc-action-btn"
          onClick={() => onOpenNutritionModal(child)}
          aria-label={`Nutrition plan for ${child.fullName}`}
        >
          <Apple aria-hidden="true" />
          Nutrition
        </button>
        <button
          className="nc-action-btn qr"
          onClick={() => onOpenQRModal(child)}
          aria-label={`QR Health Card for ${child.fullName}`}
        >
          <QrCode aria-hidden="true" />
          QR Card
        </button>
      </div>
    </article>
  );
};
