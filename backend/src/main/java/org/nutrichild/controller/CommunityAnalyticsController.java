package org.nutrichild.controller;

import org.nutrichild.model.Child;
import org.nutrichild.model.GrowthRecord;
import org.nutrichild.model.VaccinationRecord;
import org.nutrichild.repository.ChildRepository;
import org.nutrichild.repository.GrowthRecordRepository;
import org.nutrichild.repository.VaccinationRecordRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/analytics")
public class CommunityAnalyticsController {

    private final ChildRepository childRepo;
    private final GrowthRecordRepository growthRepo;
    private final VaccinationRecordRepository vaccineRepo;

    public CommunityAnalyticsController(ChildRepository childRepo, GrowthRecordRepository growthRepo, VaccinationRecordRepository vaccineRepo) {
        this.childRepo = childRepo;
        this.growthRepo = growthRepo;
        this.vaccineRepo = vaccineRepo;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getCommunityDashboard() {
        List<Child> children = childRepo.findAll();
        int totalChildren = children.size();

        int redCount = 0;
        int orangeCount = 0;
        int yellowCount = 0;
        int greenCount = 0;

        int stuntedCount = 0;
        int wastedCount = 0;
        int anemicCount = 0;

        Map<String, Map<String, Integer>> villageStats = new HashMap<>();

        for (Child c : children) {
            String v = c.getVillage() != null ? c.getVillage() : "Unknown";
            villageStats.putIfAbsent(v, new HashMap<>(Map.of("total", 0, "sam", 0, "mam", 0, "healthy", 0)));
            Map<String, Integer> vStat = villageStats.get(v);
            vStat.put("total", vStat.get("total") + 1);

            Optional<GrowthRecord> latest = growthRepo.findFirstByChildIdOrderByRecordedAtDesc(c.getId());
            if (latest.isPresent()) {
                GrowthRecord g = latest.get();
                String risk = g.getRiskCategory();
                if ("RED".equals(risk)) {
                    redCount++;
                    vStat.put("sam", vStat.get("sam") + 1);
                } else if ("ORANGE".equals(risk)) {
                    orangeCount++;
                    vStat.put("mam", vStat.get("mam") + 1);
                } else if ("YELLOW".equals(risk)) {
                    yellowCount++;
                } else {
                    greenCount++;
                    vStat.put("healthy", vStat.get("healthy") + 1);
                }

                if (g.getStuntingStatus() != null && g.getStuntingStatus().contains("STUNTED")) stuntedCount++;
                if ("SAM".equals(g.getWastingStatus()) || "MAM".equals(g.getWastingStatus())) wastedCount++;
                if (g.getAnemiaLevel() != null && (g.getAnemiaLevel().equals("SEVERE") || g.getAnemiaLevel().equals("MODERATE"))) anemicCount++;
            } else {
                greenCount++;
                vStat.put("healthy", vStat.get("healthy") + 1);
            }
        }

        // Vaccination stats
        List<VaccinationRecord> allVaccines = vaccineRepo.findAll();
        long administeredCount = allVaccines.stream().filter(v -> "ADMINISTERED".equals(v.getStatus())).count();
        double vaccineCoverage = allVaccines.isEmpty() ? 100.0 : Math.round((administeredCount * 100.0 / allVaccines.size()) * 10.0) / 10.0;

        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("totalChildrenRegistered", totalChildren);
        summary.put("riskBreakdown", Map.of(
            "redCriticalSam", redCount,
            "orangeHighRiskMam", orangeCount,
            "yellowModerateRisk", yellowCount,
            "greenHealthy", greenCount
        ));
        summary.put("indicators", Map.of(
            "stuntingRatePercent", totalChildren > 0 ? Math.round((stuntedCount * 100.0 / totalChildren) * 10.0) / 10.0 : 0.0,
            "wastingRatePercent", totalChildren > 0 ? Math.round((wastedCount * 100.0 / totalChildren) * 10.0) / 10.0 : 0.0,
            "anemiaRatePercent", totalChildren > 0 ? Math.round((anemicCount * 100.0 / totalChildren) * 10.0) / 10.0 : 0.0,
            "vaccinationCoveragePercent", vaccineCoverage
        ));
        summary.put("villageHeatmap", villageStats);

        return ResponseEntity.ok(summary);
    }
}
