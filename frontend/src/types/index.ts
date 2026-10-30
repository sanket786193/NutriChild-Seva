export type UserRole = 'PARENT' | 'ASHA' | 'ANGANWADI' | 'DOCTOR' | 'GOVT_OFFICER' | 'ADMIN';

export type LanguageCode = 'hi' | 'or' | 'mr' | 'te' | 'ta' | 'bn' | 'en';

export type RiskCategory = 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';

export interface Child {
  id?: number;
  uhid: string;
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  birthWeightKg?: number;
  bloodGroup?: string;
  parentName?: string;
  parentPhone?: string;
  village?: string;
  district?: string;
  anganwadiCenter?: string;
  qrToken?: string;
  photoUrl?: string;

  // Computed summary fields
  latestRiskCategory?: RiskCategory;
  latestWeightKg?: number;
  latestHeightCm?: number;
  latestMuacCm?: number;
  latestAnemiaLevel?: string;
  wastingStatus?: string;
  overdueVaccinesCount?: number;
}

export interface GrowthRecord {
  id?: number;
  childId: number;
  recordedAt?: string;
  recordedByRole?: string;
  recordedByName?: string;
  ageMonths?: number;
  weightKg: number;
  heightCm: number;
  muacCm?: number;
  hemoglobinGdl?: number;
  bmi?: number;
  edemaPresent?: boolean;
  wastingStatus?: string;
  stuntingStatus?: string;
  underweightStatus?: string;
  anemiaLevel?: string;
  riskCategory: RiskCategory;
  actionSummary?: string;
  notes?: string;
}

export interface VaccinationRecord {
  id?: number;
  childId: number;
  vaccineCode: string;
  vaccineName: string;
  targetAgeWeeks?: number;
  dueDate: string;
  administeredDate?: string;
  status: 'PENDING' | 'ADMINISTERED' | 'OVERDUE';
  batchNumber?: string;
  administeredBy?: string;
}

export interface HealthCenter {
  id: number;
  name: string;
  type: string;
  village: string;
  block: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  emergencyPhone?: string;
  ambulancePhone?: string;
  hasNRC: boolean;
  doctorAvailable: boolean;
  distanceKm?: number;
}

export interface GovtScheme {
  id: number;
  code: string;
  name: string;
  targetCategory: string;
  description: string;
  financialAssistance?: string;
  foodAssistance?: string;
  eligibilityCriteria?: string;
  documentsRequired?: string;
  officialPortalUrl?: string;
}

export interface SyncQueueItem {
  id?: number;
  clientSyncId: string;
  entityType: 'CHILD' | 'GROWTH';
  payload: any;
  timestamp: number;
  synced: boolean;
}

export type AuditActionType =
  | 'LOGIN'
  | 'LOGOUT'
  | 'VIEW_RECORD'
  | 'REGISTER_CHILD'
  | 'RECORD_GROWTH'
  | 'RECORD_VACCINE'
  | 'SIGN_PRESCRIPTION'
  | 'REFERRAL_NRC'
  | 'EXPORT_BACKUP'
  | 'RESTORE_BACKUP'
  | 'CHANGE_ROLE'
  | 'UNMASK_PII';

export interface AuditLogEntry {
  id?: number;
  logId: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: AuditActionType;
  targetUhid?: string;
  details: string;
  ipOrDevice: string;
  status: 'SUCCESS' | 'DENIED' | 'FAILED';
}

