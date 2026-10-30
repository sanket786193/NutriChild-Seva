import type { UserRole } from '../types';

/**
 * Data Privacy & Protection Utilities
 * Aligned with DPDP Act 2023 & NDHM / ABDM Health Data Security Guidelines
 */

/**
 * Masks a phone number so only first 5 digits or last 2 digits are visible.
 * Example: 9876543210 -> 98765*****
 */
export function maskPhone(phone?: string | null): string {
  if (!phone) return '—';
  const clean = phone.trim();
  if (clean.length < 6) return '******';
  return clean.slice(0, 5) + '*****';
}

/**
 * Masks an ABHA (Ayushman Bharat Health Account) or Aadhaar-linked ID.
 * Example: ABHA-9821-4451-2291 -> ABHA-****-****-2291
 */
export function maskAbha(abha?: string | null): string {
  if (!abha) return 'ABHA-****-****-4412';
  const parts = abha.split('-');
  if (parts.length >= 4) {
    return `${parts[0]}-****-****-${parts[parts.length - 1]}`;
  }
  if (abha.length > 4) {
    return '****-****-' + abha.slice(-4);
  }
  return '****-****-****';
}

/**
 * Masks sensitive clinical notes for non-clinical roles.
 */
export function maskClinicalNotes(notes?: string | null, role?: UserRole): string {
  if (!notes) return 'No notes recorded.';
  if (role === 'DOCTOR' || role === 'ADMIN' || role === 'ASHA') {
    return notes;
  }
  return 'Restricted: Detailed clinical diagnostic findings reserved for Medical Officers.';
}

/**
 * Checks whether the current user role is authorized to view unmasked PII.
 */
export function canViewUnmaskedPII(role: UserRole): boolean {
  return role === 'DOCTOR' || role === 'ADMIN' || role === 'GOVT_OFFICER';
}

/**
 * Input sanitization to protect against XSS (Cross-Site Scripting).
 * Escapes HTML control characters.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates biometric / physical parameters within realistic clinical limits.
 */
export function validateVitals(weightKg?: number, heightCm?: number, muacCm?: number): { valid: boolean; error?: string } {
  if (weightKg !== undefined && (weightKg < 1 || weightKg > 50)) {
    return { valid: false, error: 'Weight must be between 1.0 kg and 50.0 kg.' };
  }
  if (heightCm !== undefined && (heightCm < 30 || heightCm > 160)) {
    return { valid: false, error: 'Height must be between 30.0 cm and 160.0 cm.' };
  }
  if (muacCm !== undefined && (muacCm < 5 || muacCm > 25)) {
    return { valid: false, error: 'MUAC must be between 5.0 cm and 25.0 cm.' };
  }
  return { valid: true };
}
