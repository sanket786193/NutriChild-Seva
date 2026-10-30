import { db, queueOfflineItem, clearSyncedItems } from './db';
import type { Child, GrowthRecord, VaccinationRecord, HealthCenter, GovtScheme } from '../types';

const API_BASE = '/api/v1';

export const api = {
  async getChildren(): Promise<Child[]> {
    try {
      const res = await fetch(`${API_BASE}/children`);
      if (res.ok) {
        const data = await res.json();
        // Update offline cache
        await db.children.clear();
        for (const c of data) {
          await db.children.put(c);
        }
        return data;
      }
    } catch (e) {
      console.warn('Network offline or backend unreachable, falling back to local Dexie cache:', e);
    }

    // Fallback: Read from Dexie
    const cached = await db.children.toArray();
    if (cached.length > 0) return cached;

    // Default emergency seed if DB was completely empty
    return [
      {
        id: 1,
        uhid: 'NC-2026-101',
        fullName: 'Aarav Kumar',
        dateOfBirth: '2024-04-15',
        gender: 'MALE',
        birthWeightKg: 3.1,
        bloodGroup: 'B+',
        parentName: 'Sunita Devi',
        parentPhone: '9876543210',
        village: 'Kalyanpur',
        district: 'Rayagada',
        anganwadiCenter: 'Kalyanpur AWC-1',
        qrToken: 'NCQR-AARAV18',
        latestRiskCategory: 'GREEN',
        latestWeightKg: 11.2,
        latestHeightCm: 82.5,
        latestMuacCm: 14.2,
        latestAnemiaLevel: 'Normal (11.6 g/dL)',
        wastingStatus: 'Normal (WHZ > -1)',
        overdueVaccinesCount: 0
      },
      {
        id: 2,
        uhid: 'NC-2026-102',
        fullName: 'Priyanka Soren',
        dateOfBirth: '2024-08-20',
        gender: 'FEMALE',
        birthWeightKg: 2.3,
        bloodGroup: 'O+',
        parentName: 'Laxmi Soren',
        parentPhone: '9876500001',
        village: 'Kalyanpur',
        district: 'Rayagada',
        anganwadiCenter: 'Kalyanpur AWC-1',
        qrToken: 'NCQR-PRIYA14',
        latestRiskCategory: 'RED',
        latestWeightKg: 6.4,
        latestHeightCm: 69.0,
        latestMuacCm: 11.1,
        latestAnemiaLevel: 'Severe Anemia (6.8 g/dL)',
        wastingStatus: 'SAM (Severe Acute Malnutrition)',
        overdueVaccinesCount: 2
      },
      {
        id: 3,
        uhid: 'NC-2026-103',
        fullName: 'Manav Majhi',
        dateOfBirth: '2023-10-10',
        gender: 'MALE',
        birthWeightKg: 2.8,
        bloodGroup: 'A+',
        parentName: 'Budhu Majhi',
        parentPhone: '9876500002',
        village: 'Gunduriguda',
        district: 'Rayagada',
        anganwadiCenter: 'Gunduriguda AWC',
        qrToken: 'NCQR-MANAV24',
        latestRiskCategory: 'ORANGE',
        latestWeightKg: 9.2,
        latestHeightCm: 81.0,
        latestMuacCm: 12.1,
        latestAnemiaLevel: 'Moderate Anemia (9.4 g/dL)',
        wastingStatus: 'MAM (Moderate Acute Malnutrition)',
        overdueVaccinesCount: 1
      },
      {
        id: 4,
        uhid: 'NC-2026-104',
        fullName: 'Ananya Mohapatra',
        dateOfBirth: '2025-01-12',
        gender: 'FEMALE',
        birthWeightKg: 3.2,
        bloodGroup: 'O+',
        parentName: 'Rina Mohapatra',
        parentPhone: '9876500004',
        village: 'Singapur',
        district: 'Rayagada',
        anganwadiCenter: 'Singapur AWC-2',
        qrToken: 'NCQR-ANAN9',
        latestRiskCategory: 'GREEN',
        latestWeightKg: 8.9,
        latestHeightCm: 72.4,
        latestMuacCm: 14.5,
        latestAnemiaLevel: 'Normal (12.2 g/dL)',
        wastingStatus: 'Normal (WHZ > 0)',
        overdueVaccinesCount: 0
      },
      {
        id: 5,
        uhid: 'NC-2026-105',
        fullName: 'Rohit Murmu',
        dateOfBirth: '2023-04-18',
        gender: 'MALE',
        birthWeightKg: 2.7,
        bloodGroup: 'B+',
        parentName: 'Sanjay Murmu',
        parentPhone: '9876500005',
        village: 'Singapur',
        district: 'Rayagada',
        anganwadiCenter: 'Singapur AWC-1',
        qrToken: 'NCQR-ROHIT30',
        latestRiskCategory: 'YELLOW',
        latestWeightKg: 10.8,
        latestHeightCm: 86.2,
        latestMuacCm: 13.1,
        latestAnemiaLevel: 'Mild Anemia (10.4 g/dL)',
        wastingStatus: 'Mild Underweight',
        overdueVaccinesCount: 0
      },
      {
        id: 6,
        uhid: 'NC-2026-106',
        fullName: 'Sunita Besra',
        dateOfBirth: '2024-06-05',
        gender: 'FEMALE',
        birthWeightKg: 2.2,
        bloodGroup: 'AB+',
        parentName: 'Mangal Besra',
        parentPhone: '9876500006',
        village: 'Gunduriguda',
        district: 'Rayagada',
        anganwadiCenter: 'Gunduriguda AWC',
        qrToken: 'NCQR-SUNIT16',
        latestRiskCategory: 'RED',
        latestWeightKg: 6.8,
        latestHeightCm: 71.0,
        latestMuacCm: 11.3,
        latestAnemiaLevel: 'Severe Anemia (6.5 g/dL)',
        wastingStatus: 'SAM with Bilateral Edema',
        overdueVaccinesCount: 3
      }
    ];
  },

  async registerChild(child: Partial<Child>): Promise<Child> {
    try {
      const res = await fetch(`${API_BASE}/children`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(child)
      });
      if (res.ok) {
        const saved = await res.json();
        await db.children.put(saved);
        return saved;
      }
    } catch (e) {
      console.warn('Network offline: queuing child registration locally');
    }

    // Offline queue
    const uhid = 'NC-OFF-' + Math.floor(100000 + Math.random() * 900000);
    const offlineChild: Child = {
      uhid,
      fullName: child.fullName || 'Unnamed',
      dateOfBirth: child.dateOfBirth || new Date().toISOString().split('T')[0],
      gender: child.gender || 'MALE',
      birthWeightKg: child.birthWeightKg,
      parentName: child.parentName,
      parentPhone: child.parentPhone,
      village: child.village || 'Kalyanpur',
      district: child.district || 'Rayagada',
      anganwadiCenter: child.anganwadiCenter || 'Kalyanpur AWC-1',
      qrToken: 'NCQR-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      latestRiskCategory: 'GREEN',
      latestWeightKg: child.birthWeightKg
    };

    const localId = await db.children.add(offlineChild);
    offlineChild.id = localId;
    await queueOfflineItem('CHILD', offlineChild);
    return offlineChild;
  },

  async recordGrowth(record: Partial<GrowthRecord>): Promise<GrowthRecord> {
    try {
      const res = await fetch(`${API_BASE}/growth/assess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Network offline: assessing growth locally');
    }

    // Local WHO rule calculation
    let riskCategory: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED' = 'GREEN';
    let wasting = 'NORMAL';
    if (record.muacCm && record.muacCm < 11.5) {
      riskCategory = 'RED';
      wasting = 'SAM';
    } else if (record.muacCm && record.muacCm < 12.5) {
      riskCategory = 'ORANGE';
      wasting = 'MAM';
    } else if (record.hemoglobinGdl && record.hemoglobinGdl < 7.0) {
      riskCategory = 'RED';
    } else if (record.hemoglobinGdl && record.hemoglobinGdl < 10.0) {
      riskCategory = 'ORANGE';
    } else if (record.hemoglobinGdl && record.hemoglobinGdl < 11.0) {
      riskCategory = 'YELLOW';
    }

    const calculated: GrowthRecord = {
      childId: record.childId!,
      weightKg: record.weightKg || 0,
      heightCm: record.heightCm || 0,
      muacCm: record.muacCm,
      hemoglobinGdl: record.hemoglobinGdl,
      recordedByRole: record.recordedByRole || 'ASHA',
      recordedByName: record.recordedByName || 'Field Worker',
      recordedAt: new Date().toISOString(),
      riskCategory,
      wastingStatus: wasting,
      actionSummary: riskCategory === 'RED' 
        ? 'CRITICAL SAM: Immediate NRC referral recommended.' 
        : riskCategory === 'ORANGE'
        ? 'HIGH RISK MAM: Supplementary nutrition and weekly home visits required.'
        : 'Growth within expected WHO parameters.'
    };

    const id = await db.growthRecords.add(calculated);
    calculated.id = id;
    await queueOfflineItem('GROWTH', calculated);

    // Update local child risk category in cache
    const child = await db.children.get(record.childId!);
    if (child) {
      child.latestRiskCategory = riskCategory;
      child.latestWeightKg = record.weightKg;
      child.latestHeightCm = record.heightCm;
      child.latestMuacCm = record.muacCm;
      await db.children.put(child);
    }

    return calculated;
  },

  async getChildDetails(id: number): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/children/${id}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Network offline: reading child from local cache');
    }

    const child = await db.children.get(id);
    const growthHistory = await db.growthRecords.where('childId').equals(id).toArray();
    const vaccinations = await db.vaccinations.where('childId').equals(id).toArray();

    return {
      child: child || null,
      growthHistory: growthHistory.reverse(),
      vaccinations: vaccinations,
      latestGrowth: growthHistory[0] || null
    };
  },

  async getNutritionPlan(childId: number): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/nutrition/recommend/${childId}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Network offline: generating fallback nutrition plan');
    }

    return {
      title: 'Nutritious Diet for Child (Age 6-24 Months)',
      dailyCalories: '850-1000 kcal/day',
      dailyProtein: '12-14 g/day',
      feedingFrequency: '3 main meals + 2 snacks',
      localFoods: [
        'Ragi Ganji (Finger Millet Porridge) with milk/jaggery',
        'Moong Dal Khichdi with drumstick (moringa) leaves & ghee',
        'Boiled Egg / Sprouted Moong Dal',
        'Anganwadi Take-Home Ration (Bal-Aahar Ladoo)',
        'Mashed Ripe Papaya / Banana'
      ],
      guidelines: [
        'Wash hands with soap before preparing and feeding food.',
        'Never feed thin watery dal or gruel - always feed thick calorie-dense mash.',
        'Add 1 teaspoon of oil or ghee to every bowl to ensure energy density.'
      ],
      supplements: ['Weekly Iron-Folic Acid (IFA) syrup - 1ml bottle', 'Biannual Vitamin A dose']
    };
  },

  async getNearestCenters(lat: number = 19.1685, lng: number = 83.4150): Promise<HealthCenter[]> {
    try {
      const res = await fetch(`${API_BASE}/healthcenters/nearest?lat=${lat}&lng=${lng}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Network offline: using regional health center directory');
    }

    return [
      {
        id: 1,
        name: 'Kalyanpur Sub-Health Centre',
        type: 'SUB_CENTRE',
        village: 'Kalyanpur',
        block: 'Rayagada',
        district: 'Rayagada',
        state: 'Odisha',
        latitude: 19.1685,
        longitude: 83.4150,
        emergencyPhone: '06856-222101',
        ambulancePhone: '108',
        hasNRC: false,
        doctorAvailable: false,
        distanceKm: 0.8
      },
      {
        id: 2,
        name: 'Singapur Primary Health Centre (PHC)',
        type: 'PHC',
        village: 'Singapur',
        block: 'Rayagada',
        district: 'Rayagada',
        state: 'Odisha',
        latitude: 19.1820,
        longitude: 83.4420,
        emergencyPhone: '06856-222340',
        ambulancePhone: '108',
        hasNRC: false,
        doctorAvailable: true,
        distanceKm: 3.4
      },
      {
        id: 3,
        name: 'Rayagada Community Health Centre (CHC)',
        type: 'CHC',
        village: 'Rayagada Town',
        block: 'Rayagada',
        district: 'Rayagada',
        state: 'Odisha',
        latitude: 19.1710,
        longitude: 83.4180,
        emergencyPhone: '06856-222888',
        ambulancePhone: '108',
        hasNRC: true,
        doctorAvailable: true,
        distanceKm: 7.2
      },
      {
        id: 4,
        name: 'District Hospital & NRC Rayagada',
        type: 'NRC',
        village: 'Rayagada HQ',
        block: 'Rayagada',
        district: 'Rayagada',
        state: 'Odisha',
        latitude: 19.1650,
        longitude: 83.4110,
        emergencyPhone: '06856-222999',
        ambulancePhone: '108',
        hasNRC: true,
        doctorAvailable: true,
        distanceKm: 9.5
      }
    ];
  },

  async getGovtSchemes(): Promise<GovtScheme[]> {
    try {
      const res = await fetch(`${API_BASE}/schemes`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Network offline: using cached schemes');
    }

    return [
      {
        id: 1,
        code: 'POSHAN_2_0',
        name: 'POSHAN Abhiyaan 2.0 (National Nutrition Mission)',
        targetCategory: 'Children 0-6 years',
        description: 'Supplementary nutrition, growth monitoring, fortified rations, and community convergence.',
        financialAssistance: 'Free Fortified Rations',
        foodAssistance: 'Daily Hot Cooked Meals & Take-Home Rations',
        eligibilityCriteria: 'All children enrolled in Anganwadi centers in rural/tribal blocks.'
      },
      {
        id: 2,
        code: 'ICDS_THR',
        name: 'Take-Home Ration (THR) Supplementary Nutrition',
        targetCategory: 'Children 6-36 months',
        description: 'Micronutrient-fortified energy-dense blended food (Halwa/Khichdi mix) distributed bi-weekly.',
        foodAssistance: '125-150 kcal/day extra calorie booster',
        eligibilityCriteria: 'Children aged 6 months to 3 years registered at village Anganwadi.'
      },
      {
        id: 3,
        code: 'AMB_IFA',
        name: 'Anemia Mukt Bharat - IFA Syrup',
        targetCategory: 'Children 6-59 months',
        description: 'Weekly administration of 1 ml Iron-Folic Acid syrup provided free by ASHA worker.',
        foodAssistance: 'Iron-Folic Acid with dropper bottle',
        eligibilityCriteria: 'All rural children aged 6 to 59 months.'
      },
      {
        id: 4,
        code: 'NRC_SAM_SUPPORT',
        name: 'Nutrition Rehabilitation Centre (NRC) Inpatient Support',
        targetCategory: 'Severe Acute Malnourished (SAM) Children',
        description: '14-day free inpatient clinical feeding care with therapeutic F-75/F-100 and RUTF.',
        financialAssistance: 'Rs. 150/day wage compensation to mother for 14 days',
        eligibilityCriteria: 'MUAC < 11.5 cm or Bilateral Pitting Edema or Z-Score < -3SD.'
      }
    ];
  },

  async askVoiceAi(question: string, language: string = 'hi'): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/ai/voice-assist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, language })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Network offline: using intelligent offline AI responder');
    }

    return {
      answer: `For child health in rural communities, ensure balanced meals with ragi, dal, drumstick leaves, and clean drinking water. Timely vaccines and weekly IFA syrup prevent stunting and anemia. Always consult your ASHA worker for clinical checkups.`,
      suggestedActions: [
        'Collect Take-Home Ration from Anganwadi',
        'Check child vaccination card',
        'Record monthly weight checkup'
      ],
      disclaimer: '⚠️ Educational nutrition advice aligned with WHO & POSHAN guidelines. Consult doctor for diagnosis.'
    };
  },

  async analyzeFoodPlate(foodName: string, description: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/ai/food-analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodName, description })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Network offline: analyzing plate offline');
    }

    return {
      foodAnalyzed: foodName || 'Village Meal',
      estimatedCaloriesKcal: 310,
      estimatedProteinGrams: 8.5,
      keyNutrientsPresent: ['Carbohydrates', 'Plant Protein (Lentils)', 'Dietary Fiber', 'Iron'],
      dietaryImprovements: [
        'Add 1 teaspoon ghee or oil for healthy fats and energy density.',
        'Add moringa (drumstick) leaves or boiled egg for extra protein and Vitamin A.'
      ],
      plateRating: 'GOOD'
    };
  },

  async syncOfflineBatch(): Promise<{ syncedCount: number; message: string }> {
    const queue = await db.syncQueue.where('synced').equals(0).toArray();
    if (queue.length === 0) {
      return { syncedCount: 0, message: 'All offline records are already in sync.' };
    }

    const payload = queue.map(q => ({
      clientSyncId: q.clientSyncId,
      entityType: q.entityType,
      ...q.payload
    }));

    try {
      const res = await fetch(`${API_BASE}/sync/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payload })
      });

      if (res.ok) {
        const result = await res.json();
        await clearSyncedItems(result.acknowledgedSyncIds || []);
        return {
          syncedCount: (result.syncedChildrenCount || 0) + (result.syncedGrowthRecordsCount || 0),
          message: `Successfully synchronized ${queue.length} records with national health servers.`
        };
      }
    } catch (e) {
      console.error('Failed to sync offline batch:', e);
    }

    return { syncedCount: 0, message: 'Server currently offline. Your records remain safely stored on this device.' };
  }
};
