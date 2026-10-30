package org.nutrichild.controller;

import org.nutrichild.model.Child;
import org.nutrichild.model.GovtScheme;
import org.nutrichild.model.GrowthRecord;
import org.nutrichild.repository.ChildRepository;
import org.nutrichild.repository.GrowthRecordRepository;
import org.nutrichild.service.GovtSchemeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/schemes")
public class GovtSchemeController {

    private final GovtSchemeService schemeService;
    private final ChildRepository childRepo;
    private final GrowthRecordRepository growthRepo;

    public GovtSchemeController(GovtSchemeService schemeService, ChildRepository childRepo, GrowthRecordRepository growthRepo) {
        this.schemeService = schemeService;
        this.childRepo = childRepo;
        this.growthRepo = growthRepo;
    }

    @GetMapping
    public ResponseEntity<List<GovtScheme>> getAllSchemes() {
        return ResponseEntity.ok(schemeService.getAllSchemes());
    }

    @GetMapping("/check/{childId}")
    public ResponseEntity<?> checkSchemesForChild(@PathVariable Long childId) {
        Optional<Child> childOpt = childRepo.findById(childId);
        if (childOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<GrowthRecord> latest = growthRepo.findFirstByChildIdOrderByRecordedAtDesc(childId);
        List<Map<String, Object>> recs = schemeService.recommendSchemesForChild(childOpt.get(), latest.orElse(null));

        return ResponseEntity.ok(Map.of(
            "childId", childId,
            "childName", childOpt.get().getFullName(),
            "eligibleSchemes", recs
        ));
    }
}
