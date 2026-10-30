import Dexie, { type Table } from 'dexie';
import type { Child, GrowthRecord, VaccinationRecord, SyncQueueItem, AuditLogEntry } from '../types';

export class NutriChildDatabase extends Dexie {
  children!: Table<Child, number>;
  growthRecords!: Table<GrowthRecord, number>;
  vaccinations!: Table<VaccinationRecord, number>;
  syncQueue!: Table<SyncQueueItem, number>;
  auditLogs!: Table<AuditLogEntry, number>;

  constructor() {
    super('NutriChildOfflineDB');
    this.version(1).stores({
      children: '++id, uhid, qrToken, parentPhone, village, anganwadiCenter',
      growthRecords: '++id, childId, recordedAt, riskCategory',
      vaccinations: '++id, childId, status, dueDate',
      syncQueue: '++id, clientSyncId, entityType, timestamp, synced'
    });
    this.version(2).stores({
      auditLogs: '++id, logId, timestamp, actorRole, action, targetUhid, status'
    });
  }
}

export const db = new NutriChildDatabase();

export async function queueOfflineItem(entityType: 'CHILD' | 'GROWTH', payload: any) {
  const syncItem: SyncQueueItem = {
    clientSyncId: 'offline-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    entityType,
    payload,
    timestamp: Date.now(),
    synced: false
  };
  await db.syncQueue.add(syncItem);
  return syncItem;
}

export async function getPendingSyncCount(): Promise<number> {
  return await db.syncQueue.where('synced').equals(0).count();
}

export async function clearSyncedItems(acknowledgedIds: string[]) {
  const allQueue = await db.syncQueue.toArray();
  for (const item of allQueue) {
    if (acknowledgedIds.includes(item.clientSyncId)) {
      if (item.id) await db.syncQueue.delete(item.id);
    }
  }
}
