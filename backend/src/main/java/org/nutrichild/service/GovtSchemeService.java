package org.nutrichild.service;

import org.nutrichild.model.Child;
import org.nutrichild.model.GovtScheme;
import org.nutrichild.model.GrowthRecord;
import org.nutrichild.repository.GovtSchemeRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.*;

@Service
public class GovtSchemeService {

    private final GovtSchemeRepository schemeRepo;

    public GovtSchemeService(GovtSchemeRepository schemeRepo) {
        this.schemeRepo = schemeRepo;
    }

    @Cacheable("govtSchemes")
    public List<GovtScheme> getAllSchemes() {
        return schemeRepo.findAll();
    }

    public List<Map<String, Object>> recommendSchemesForChild(Child child, GrowthRecord latestGrowth) {
        List<GovtScheme> allSchemes = schemeRepo.findAll();
        List<Map<String, Object>> recommendations = new ArrayList<>();

        int ageMonths = Period.between(child.getDateOfBirth(), LocalDate.now()).getYears() * 12 +
                        Period.between(child.getDateOfBirth(), LocalDate.now()).getMonths();

        for (GovtScheme scheme : allSchemes) {
            boolean eligible = false;
            String reason = "";

            if (scheme.getCode().equals("POSHAN_2_0")) {
                eligible = ageMonths < 72; // Children 0 to 6 years
                reason = "Eligible for Poshan 2.0 Supplementary Nutrition & Growth Monitoring at Anganwadi";
            } else if (scheme.getCode().equals("ICDS_THR")) {
                eligible = ageMonths >= 6 && ageMonths < 36;
                reason = "Eligible for bi-weekly Take-Home Rations (THR) fortified halwa/upma mix";
            } else if (scheme.getCode().equals("AMB_IFA")) {
                eligible = ageMonths >= 6 && ageMonths <= 59;
                reason = "Eligible for weekly bi-color Iron Folic Acid (IFA) syrup distribution by ASHA";
            } else if (scheme.getCode().equals("NRC_SAM_SUPPORT")) {
                if (latestGrowth != null && ("RED".equals(latestGrowth.getRiskCategory()) || "SAM".equals(latestGrowth.getWastingStatus()))) {
                    eligible = true;
                    reason = "CRITICAL ELIGIBILITY: Child qualifies for free 14-day inpatient NRC therapeutic care and wage compensation for mother";
                }
            } else {
                eligible = true;
                reason = "Universal maternal and child health support";
            }

            if (eligible) {
                Map<String, Object> item = new HashMap<>();
                item.put("scheme", scheme);
                item.put("eligible", true);
                item.put("benefitHighlight", scheme.getFinancialAssistance() != null ? scheme.getFinancialAssistance() : scheme.getFoodAssistance());
                item.put("eligibilityReason", reason);
                recommendations.add(item);
            }
        }

        return recommendations;
    }
}
