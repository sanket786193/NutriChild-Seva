package org.nutrichild.controller;

import org.nutrichild.model.Child;
import org.nutrichild.model.GrowthRecord;
import org.nutrichild.repository.ChildRepository;
import org.nutrichild.repository.GrowthRecordRepository;
import org.nutrichild.service.NutritionPlannerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Period;
import java.util.*;

@RestController
@RequestMapping("/api/v1/nutrition")
public class NutritionController {

    private final ChildRepository childRepo;
    private final GrowthRecordRepository growthRepo;
    private final NutritionPlannerService nutritionPlannerService;

    public NutritionController(ChildRepository childRepo, GrowthRecordRepository growthRepo,
                               NutritionPlannerService nutritionPlannerService) {
        this.childRepo = childRepo;
        this.growthRepo = growthRepo;
        this.nutritionPlannerService = nutritionPlannerService;
    }

    @GetMapping("/recommend/{childId}")
    public ResponseEntity<?> getNutritionRecommendations(@PathVariable Long childId) {
        Optional<Child> childOpt = childRepo.findById(childId);
        if (childOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Child child = childOpt.get();

        int ageMonths = Period.between(child.getDateOfBirth(), LocalDate.now()).getYears() * 12 +
                        Period.between(child.getDateOfBirth(), LocalDate.now()).getMonths();

        Optional<GrowthRecord> latest = growthRepo.findFirstByChildIdOrderByRecordedAtDesc(child.getId());
        String riskCategory = latest.isPresent() ? latest.get().getRiskCategory() : "GREEN";

        Map<String, Object> plan = nutritionPlannerService.getNutritionPlan(ageMonths, riskCategory, child.getGender());
        plan.put("childName", child.getFullName());
        plan.put("uhid", child.getUhid());

        return ResponseEntity.ok(plan);
    }
}
