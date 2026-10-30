package org.nutrichild.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.nutrichild.audit.AuditLogService;
import org.nutrichild.common.PrivacyUtils;
import org.nutrichild.model.Child;
import org.nutrichild.model.GrowthRecord;
import org.nutrichild.model.UserRole;
import org.nutrichild.model.VaccinationRecord;
import org.nutrichild.repository.ChildRepository;
import org.nutrichild.repository.GrowthRecordRepository;
import org.nutrichild.repository.VaccinationRecordRepository;
import org.nutrichild.service.VaccinationScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/children")
public class ChildController {

    private final ChildRepository childRepo;
    private final GrowthRecordRepository growthRepo;
    private final VaccinationRecordRepository vaccineRepo;
    private final VaccinationScheduleService vaccinationScheduleService;
    private final AuditLogService auditLogService;

    public ChildController(ChildRepository childRepo, GrowthRecordRepository growthRepo,
                           VaccinationRecordRepository vaccineRepo,
                           VaccinationScheduleService vaccinationScheduleService,
                           AuditLogService auditLogService) {
        this.childRepo = childRepo;
        this.growthRepo = growthRepo;
        this.vaccineRepo = vaccineRepo;
        this.vaccinationScheduleService = vaccinationScheduleService;
        this.auditLogService = auditLogService;
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllChildren(
            @RequestParam(required = false) String village,
            @RequestParam(required = false) String anganwadi,
            @RequestParam(defaultValue = "false") boolean unmask) {

        List<Child> children;
        if (village != null && !village.isEmpty()) {
            children = childRepo.findByVillage(village);
        } else if (anganwadi != null && !anganwadi.isEmpty()) {
            children = childRepo.findByAnganwadiCenter(anganwadi);
        } else {
            children = childRepo.findAll();
        }

        boolean canUnmask = isAuthorizedToUnmask() && unmask;

        List<Map<String, Object>> response = new ArrayList<>();
        for (Child c : children) {
            Map<String, Object> dto = new HashMap<>();
            dto.put("id", c.getId());
            dto.put("uhid", c.getUhid());
            dto.put("fullName", c.getFullName());
            dto.put("dateOfBirth", c.getDateOfBirth());
            dto.put("gender", c.getGender());
            dto.put("birthWeightKg", c.getBirthWeightKg());
            dto.put("parentName", c.getParentName());

            // Field-level privacy protection for contact details
            dto.put("parentPhone", canUnmask ? c.getParentPhone() : PrivacyUtils.maskPhone(c.getParentPhone()));
            dto.put("isPhoneMasked", !canUnmask);

            dto.put("village", c.getVillage());
            dto.put("district", c.getDistrict());
            dto.put("anganwadiCenter", c.getAnganwadiCenter());
            dto.put("qrToken", c.getQrToken());

            // Latest growth & risk status
            Optional<GrowthRecord> latest = growthRepo.findFirstByChildIdOrderByRecordedAtDesc(c.getId());
            if (latest.isPresent()) {
                dto.put("latestRiskCategory", latest.get().getRiskCategory());
                dto.put("latestWeightKg", latest.get().getWeightKg());
                dto.put("latestHeightCm", latest.get().getHeightCm());
                dto.put("latestMuacCm", latest.get().getMuacCm());
                dto.put("latestAnemiaLevel", latest.get().getAnemiaLevel());
                dto.put("wastingStatus", latest.get().getWastingStatus());
            } else {
                dto.put("latestRiskCategory", "GREEN");
                dto.put("latestWeightKg", c.getBirthWeightKg());
            }

            // Vaccination summary
            List<VaccinationRecord> overdue = vaccineRepo.findByChildIdAndStatus(c.getId(), "OVERDUE");
            dto.put("overdueVaccinesCount", overdue.size());

            response.add(dto);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> registerChild(@RequestBody Child child, HttpServletRequest request) {
        if (child.getFullName() == null || child.getFullName().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Child full name is mandatory"));
        }
        if (child.getDateOfBirth() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Date of birth is mandatory"));
        }
        if (child.getBirthWeightKg() != null && (child.getBirthWeightKg() < 0.5 || child.getBirthWeightKg() > 10.0)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Birth weight must be between 0.5 kg and 10.0 kg"));
        }

        Child saved = childRepo.save(child);
        // Automatically generate National UIP vaccination timeline
        vaccinationScheduleService.generateUipSchedule(saved);

        auditLogService.logAsync("FIELD_WORKER", "Health Worker", UserRole.ASHA,
                "REGISTER_CHILD", saved.getUhid(), "Registered child: " + saved.getFullName(),
                request.getRemoteAddr(), "SUCCESS");

        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getChildDetails(@PathVariable Long id, @RequestParam(defaultValue = "false") boolean unmask) {
        Optional<Child> childOpt = childRepo.findById(id);
        if (childOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Child child = childOpt.get();

        boolean canUnmask = isAuthorizedToUnmask() && unmask;
        if (!canUnmask) {
            child.setParentPhone(PrivacyUtils.maskPhone(child.getParentPhone()));
        }

        List<GrowthRecord> growthHistory = growthRepo.findByChildIdOrderByRecordedAtDesc(child.getId());
        List<VaccinationRecord> vaccines = vaccineRepo.findByChildIdOrderByDueDateAsc(child.getId());

        Map<String, Object> resp = new HashMap<>();
        resp.put("child", child);
        resp.put("growthHistory", growthHistory);
        resp.put("vaccinations", vaccines);
        resp.put("latestGrowth", growthHistory.isEmpty() ? null : growthHistory.get(0));

        return ResponseEntity.ok(resp);
    }

    @GetMapping("/qr/{token}")
    public ResponseEntity<?> getChildByQrToken(@PathVariable String token) {
        Optional<Child> childOpt = childRepo.findByQrToken(token);
        if (childOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Child health card not found for QR token: " + token));
        }

        Child child = childOpt.get();
        // Public QR scans always mask parent phone number
        child.setParentPhone(PrivacyUtils.maskPhone(child.getParentPhone()));

        List<GrowthRecord> growthHistory = growthRepo.findByChildIdOrderByRecordedAtDesc(child.getId());
        List<VaccinationRecord> vaccines = vaccineRepo.findByChildIdOrderByDueDateAsc(child.getId());

        Map<String, Object> resp = new HashMap<>();
        resp.put("child", child);
        resp.put("latestGrowth", growthHistory.isEmpty() ? null : growthHistory.get(0));
        resp.put("vaccinations", vaccines);
        resp.put("growthHistory", growthHistory);

        return ResponseEntity.ok(resp);
    }

    private boolean isAuthorizedToUnmask() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return false;
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_DOCTOR") || a.getAuthority().equals("ROLE_ADMIN"));
    }
}
