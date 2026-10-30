import type { UserRole } from '../types';

export type Permission =
  | 'VIEW_TRIAGE'
  | 'REGISTER_CHILD'
  | 'RECORD_GROWTH'
  | 'RECORD_VACCINE'
  | 'SIGN_PRESCRIPTION'
  | 'REFERRAL_NRC'
  | 'VIEW_AUDIT_LOGS'
  | 'EXPORT_DATABASE'
  | 'RESTORE_DATABASE'
  | 'VIEW_UNMASKED_PII'
  | 'CHANGE_SYSTEM_SETTINGS';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  DOCTOR: [
    'VIEW_TRIAGE',
    'RECORD_GROWTH',
    'RECORD_VACCINE',
    'SIGN_PRESCRIPTION',
    'REFERRAL_NRC',
    'VIEW_AUDIT_LOGS',
    'VIEW_UNMASKED_PII',
  ],
  ASHA: [
    'VIEW_TRIAGE',
    'REGISTER_CHILD',
    'RECORD_GROWTH',
    'RECORD_VACCINE',
  ],
  ANGANWADI: [
    'VIEW_TRIAGE',
    'REGISTER_CHILD',
    'RECORD_GROWTH',
    'RECORD_VACCINE',
  ],
  PARENT: [
    'VIEW_TRIAGE',
  ],
  GOVT_OFFICER: [
    'VIEW_TRIAGE',
    'VIEW_AUDIT_LOGS',
    'VIEW_UNMASKED_PII',
    'EXPORT_DATABASE',
  ],
  ADMIN: [
    'VIEW_TRIAGE',
    'REGISTER_CHILD',
    'RECORD_GROWTH',
    'RECORD_VACCINE',
    'SIGN_PRESCRIPTION',
    'REFERRAL_NRC',
    'VIEW_AUDIT_LOGS',
    'EXPORT_DATABASE',
    'RESTORE_DATABASE',
    'VIEW_UNMASKED_PII',
    'CHANGE_SYSTEM_SETTINGS',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const allowed = ROLE_PERMISSIONS[role] || [];
  return allowed.includes(permission);
}

export function getRoleBadgeInfo(role: UserRole): { label: string; badgeClass: string; description: string } {
  switch (role) {
    case 'DOCTOR':
      return {
        label: 'Medical Officer (Doctor)',
        badgeClass: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800',
        description: 'Authorized for clinical diagnoses, prescriptions, and SAM emergency referrals.',
      };
    case 'ASHA':
      return {
        label: 'ASHA Facilitator',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
        description: 'Community health worker authorized for field growth checks and vaccine tracking.',
      };
    case 'ANGANWADI':
      return {
        label: 'Anganwadi Worker (AWW)',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
        description: 'Center focal point for nutrition rations, preschool monitoring, and child intake.',
      };
    case 'PARENT':
      return {
        label: 'Parent / Family Member',
        badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
        description: 'Guardian access to growth card, milestone tracker, and scheduled immunisations.',
      };
    case 'GOVT_OFFICER':
      return {
        label: 'District Health Officer',
        badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
        description: 'Programme supervisory access for policy analytics, supplies, and district audits.',
      };
    case 'ADMIN':
      return {
        label: 'System Administrator',
        badgeClass: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
        description: 'Full administrative access for system configuration, backups, and security policies.',
      };
  }
}
