package org.nutrichild.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.nutrichild.audit.AuditLogService;
import org.nutrichild.common.ApiResponse;
import org.nutrichild.model.Child;
import org.nutrichild.model.GrowthRecord;
import org.nutrichild.model.UserRole;
import org.nutrichild.notification.NotificationService;
import org.nutrichild.repository.ChildRepository;
import org.nutrichild.repository.GrowthRecordRepository;
import org.nutrichild.service.GrowthAssessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/growth")
public class GrowthController {

    private final GrowthRecordRepository growthRepo;
    private final ChildRepository childRepo;
    private final GrowthAssessmentService growthAssessmentService;
    private final NotificationService notificationService;
    private final AuditLogService auditLogService;

    public GrowthController(GrowthRecordRepository growthRepo, ChildRepository childRepo,
                            GrowthAssessmentService growthAssessmentService,
                            NotificationService notificationService,
                            AuditLogService auditLogService) {
        this.growthRepo = growthRepo;
        this.childRepo = childRepo;
        this.growthAssessmentService = growthAssessmentService;
        this.notificationService = notificationService;
        this.auditLogService = auditLogService;
    }

    @PostMapping("/assess")
    public ResponseEntity<ApiResponse<?>> assessAndSaveGrowth(
            @RequestBody GrowthRecord record, HttpServletRequest httpRequest) {

        if (record.getChildId() == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("childId is mandatory"));
        }
        if (record.getWeightKg() == null || record.getWeightKg() < 1.0 || record.getWeightKg() > 50.0) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Weight must be between 1.0 kg and 50.0 kg"));
        }
        if (record.getHeightCm() == null || record.getHeightCm() < 30.0 || record.getHeightCm() > 160.0) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Height must be between 30.0 cm and 160.0 cm"));
        }

        Optional<Child> childOpt = childRepo.findById(record.getChildId());
        if (childOpt.isEmpty()) {
            return ResponseEntity.status(404).body(ApiResponse.error("Child not found with ID: " + record.getChildId()));
        }

        Child child = childOpt.get();

        // Run WHO Multidimensional Assessment Engine
        growthAssessmentService.assessGrowth(child, record);
        GrowthRecord saved = growthRepo.save(record);

        // Proactive alert trigger if Severe Acute Malnutrition (SAM) or RED triage
        if ("RED".equalsIgnoreCase(saved.getRiskCategory()) || "SAM".equalsIgnoreCase(saved.getWastingStatus())) {
            notificationService.createSamMalnutritionAlert(child, saved);
        }

        // Audit Trail Recording
        auditLogService.logAsync(
                record.getRecordedByName() != null ? record.getRecordedByName() : "HEALTH_WORKER",
                record.getRecordedByName() != null ? record.getRecordedByName() : "ASHA / Doctor",
                UserRole.ASHA,
                "RECORD_GROWTH",
                child.getUhid(),
                String.format("Logged vitals: W=%.1fkg, H=%.1fcm, Risk=%s", saved.getWeightKg(), saved.getHeightCm(), saved.getRiskCategory()),
                httpRequest.getRemoteAddr(),
                "SUCCESS"
        );

        return ResponseEntity.ok(ApiResponse.ok("Growth assessment computed and saved successfully", saved));
    }

    @GetMapping("/child/{childId}")
    public ResponseEntity<ApiResponse<List<GrowthRecord>>> getChildGrowthHistory(@PathVariable Long childId) {
        List<GrowthRecord> list = growthRepo.findByChildIdOrderByRecordedAtDesc(childId);
        return ResponseEntity.ok(ApiResponse.ok("Growth history retrieved", list));
    }
}
