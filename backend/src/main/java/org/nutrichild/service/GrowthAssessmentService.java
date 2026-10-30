package org.nutrichild.service;

import org.nutrichild.model.Child;
import org.nutrichild.model.GrowthRecord;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

@Service
public class GrowthAssessmentService {

    /**
     * Assesses growth vitals against WHO growth curves, MUAC, and Hemoglobin criteria.
     */
    public GrowthRecord assessGrowth(Child child, GrowthRecord record) {
        // 1. Calculate age in months
        LocalDate assessDate = record.getRecordedAt() != null ? record.getRecordedAt().toLocalDate() : LocalDate.now();
        Period period = Period.between(child.getDateOfBirth(), assessDate);
        int ageMonths = period.getYears() * 12 + period.getMonths();
        record.setAgeMonths(Math.max(0, ageMonths));

        // 2. Calculate BMI = weight (kg) / [height (m)]^2
        if (record.getWeightKg() != null && record.getHeightCm() != null && record.getHeightCm() > 0) {
            double heightM = record.getHeightCm() / 100.0;
            double bmi = record.getWeightKg() / (heightM * heightM);
            record.setBmi(Math.round(bmi * 10.0) / 10.0);
        }

        // 3. WHO Stunting Assessment (Height for Age)
        // Standard median height ~ 50cm at birth, 75cm at 1yr, 87cm at 2yr, 96cm at 3yr, 103cm at 4yr, 110cm at 5yr
        double expectedHeight = calculateMedianHeightForAge(ageMonths);
        if (record.getHeightCm() != null && expectedHeight > 0) {
            double heightRatio = record.getHeightCm() / expectedHeight;
            if (heightRatio < 0.85) {
                record.setStuntingStatus("SEVERELY_STUNTED");
            } else if (heightRatio < 0.92) {
                record.setStuntingStatus("MODERATELY_STUNTED");
            } else {
                record.setStuntingStatus("NORMAL");
            }
        } else {
            record.setStuntingStatus("NORMAL");
        }

        // 4. WHO Underweight Assessment (Weight for Age)
        // Standard median weight ~ 3.3kg at birth, 9.5kg at 1yr, 12kg at 2yr, 14kg at 3yr, 16kg at 4yr, 18kg at 5yr
        double expectedWeight = calculateMedianWeightForAge(ageMonths);
        if (record.getWeightKg() != null && expectedWeight > 0) {
            double weightRatio = record.getWeightKg() / expectedWeight;
            if (weightRatio < 0.70) {
                record.setUnderweightStatus("SEVERELY_UNDERWEIGHT");
            } else if (weightRatio < 0.82) {
                record.setUnderweightStatus("MODERATELY_UNDERWEIGHT");
            } else {
                record.setUnderweightStatus("NORMAL");
            }
        } else {
            record.setUnderweightStatus("NORMAL");
        }

        // 5. WHO Wasting Assessment (Weight for Height & MUAC)
        // MUAC is the gold-standard field test for children 6-59 months
        String wasting = "NORMAL";
        if (record.getEdemaPresent() != null && record.getEdemaPresent()) {
            wasting = "SAM"; // Bilateral pitting edema automatically classifies as SAM (Kwashiorkor)
        } else if (record.getMuacCm() != null && ageMonths >= 6) {
            if (record.getMuacCm() < 11.5) {
                wasting = "SAM"; // Severe Acute Malnutrition (< 11.5 cm)
            } else if (record.getMuacCm() < 12.5) {
                wasting = "MAM"; // Moderate Acute Malnutrition (11.5 to 12.4 cm)
            }
        } else if (record.getWeightKg() != null && record.getHeightCm() != null) {
            // Estimate Weight-for-Height ratio
            double expectedWeightForHeight = (record.getHeightCm() - 45) * 0.28 + 2.5;
            if (expectedWeightForHeight > 0 && (record.getWeightKg() / expectedWeightForHeight) < 0.70) {
                wasting = "SAM";
            } else if (expectedWeightForHeight > 0 && (record.getWeightKg() / expectedWeightForHeight) < 0.80) {
                wasting = "MAM";
            }
        }
        record.setWastingStatus(wasting);

        // 6. Hemoglobin Anemia Assessment
        if (record.getHemoglobinGdl() != null) {
            double hb = record.getHemoglobinGdl();
            if (hb < 7.0) {
                record.setAnemiaLevel("SEVERE");
            } else if (hb < 10.0) {
                record.setAnemiaLevel("MODERATE");
            } else if (hb < 11.0) {
                record.setAnemiaLevel("MILD");
            } else {
                record.setAnemiaLevel("NORMAL");
            }
        } else {
            record.setAnemiaLevel("NOT_TESTED");
        }

        // 7. Overall Traffic Light Status & Action Summary
        if ("SAM".equals(record.getWastingStatus()) || 
            "SEVERE".equals(record.getAnemiaLevel()) || 
            Boolean.TRUE.equals(record.getEdemaPresent())) {
            record.setRiskCategory("RED");
            record.setActionSummary("CRITICAL: Severe malnutrition or severe anemia detected. Immediate referral required to the nearest Nutrition Rehabilitation Centre (NRC) or Medical Officer.");
        } else if ("MAM".equals(record.getWastingStatus()) || 
                   "SEVERELY_STUNTED".equals(record.getStuntingStatus()) || 
                   "SEVERELY_UNDERWEIGHT".equals(record.getUnderweightStatus()) ||
                   "MODERATE".equals(record.getAnemiaLevel())) {
            record.setRiskCategory("ORANGE");
            record.setActionSummary("HIGH RISK: Moderate Acute Malnutrition or moderate anemia. Schedule ASHA weekly home visit, double Take-Home Ration (THR), and IFA syrup.");
        } else if ("MODERATELY_STUNTED".equals(record.getStuntingStatus()) || 
                   "MODERATELY_UNDERWEIGHT".equals(record.getUnderweightStatus()) || 
                   "MILD".equals(record.getAnemiaLevel())) {
            record.setRiskCategory("YELLOW");
            record.setActionSummary("MODERATE RISK: Mild growth lag or mild anemia. Recommend daily energy-dense foods (eggs, dal, ragi, moringa leaves) and monthly growth monitoring.");
        } else {
            record.setRiskCategory("GREEN");
            record.setActionSummary("HEALTHY: Child's growth and vitals are within normal WHO growth standards. Continue balanced age-appropriate nutrition and timely vaccinations.");
        }

        return record;
    }

    private double calculateMedianHeightForAge(int months) {
        if (months <= 0) return 50.0;
        if (months <= 6) return 50.0 + (months * 2.5);
        if (months <= 12) return 65.0 + ((months - 6) * 1.6);
        if (months <= 24) return 75.0 + ((months - 12) * 1.0);
        if (months <= 60) return 87.0 + ((months - 24) * 0.65);
        return 110.0;
    }

    private double calculateMedianWeightForAge(int months) {
        if (months <= 0) return 3.3;
        if (months <= 6) return 3.3 + (months * 0.75);
        if (months <= 12) return 7.8 + ((months - 6) * 0.35);
        if (months <= 24) return 9.6 + ((months - 12) * 0.20);
        if (months <= 60) return 12.0 + ((months - 24) * 0.17);
        return 18.0;
    }
}
