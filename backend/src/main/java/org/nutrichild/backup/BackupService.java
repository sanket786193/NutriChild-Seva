package org.nutrichild.backup;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.nutrichild.audit.AuditLogService;
import org.nutrichild.model.*;
import org.nutrichild.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class BackupService {

    private static final Logger log = LoggerFactory.getLogger(BackupService.class);

    private final ChildRepository childRepo;
    private final GrowthRecordRepository growthRepo;
    private final VaccinationRecordRepository vaccineRepo;
    private final PrescriptionRepository prescriptionRepo;
    private final AppointmentRepository appointmentRepo;
    private final AuditLogService auditLogService;
    private final ObjectMapper objectMapper;

    public BackupService(ChildRepository childRepo, GrowthRecordRepository growthRepo,
                         VaccinationRecordRepository vaccineRepo, PrescriptionRepository prescriptionRepo,
                         AppointmentRepository appointmentRepo, AuditLogService auditLogService,
                         ObjectMapper objectMapper) {
        this.childRepo = childRepo;
        this.growthRepo = growthRepo;
        this.vaccineRepo = vaccineRepo;
        this.prescriptionRepo = prescriptionRepo;
        this.appointmentRepo = appointmentRepo;
        this.auditLogService = auditLogService;
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> createBackupSnapshot() {
        Map<String, Object> snapshot = new LinkedHashMap<>();
        snapshot.put("platform", "NutriChild+");
        snapshot.put("version", "2.4.0-enterprise");
        snapshot.put("exportedAt", LocalDateTime.now().toString());
        snapshot.put("schemaVersion", 2);

        snapshot.put("children", childRepo.findAll());
        snapshot.put("growthRecords", growthRepo.findAll());
        snapshot.put("vaccinations", vaccineRepo.findAll());
        snapshot.put("prescriptions", prescriptionRepo.findAll());
        snapshot.put("appointments", appointmentRepo.findAll());

        auditLogService.logAsync("SYSTEM", "System Administrator", UserRole.ADMIN,
                "EXPORT_BACKUP", "DISTRICT-ALL", "Full district backup snapshot exported", "127.0.0.1", "SUCCESS");

        return snapshot;
    }

    @Transactional
    public Map<String, Object> restoreFromSnapshot(Map<String, Object> backupData) {
        if (!"NutriChild+".equals(backupData.get("platform"))) {
            throw new IllegalArgumentException("Invalid backup archive: missing NutriChild+ platform signature");
        }

        int restoredChildren = 0;
        int restoredGrowth = 0;

        try {
            // Restore children if present
            List<?> childrenList = (List<?>) backupData.get("children");
            if (childrenList != null) {
                for (Object item : childrenList) {
                    Child c = objectMapper.convertValue(item, Child.class);
                    if (c != null && c.getUhid() != null && !childRepo.existsByUhid(c.getUhid())) {
                        c.setId(null); // allow DB ID auto-generation
                        childRepo.save(c);
                        restoredChildren++;
                    }
                }
            }

            auditLogService.logAsync("SYSTEM", "System Administrator", UserRole.ADMIN,
                    "RESTORE_BACKUP", "DISTRICT-ALL",
                    String.format("Restored %d children records from backup archive", restoredChildren),
                    "127.0.0.1", "SUCCESS");

            return Map.of(
                "status", "RESTORE_COMPLETE",
                "restoredChildrenCount", restoredChildren,
                "timestamp", LocalDateTime.now().toString()
            );
        } catch (Exception e) {
            log.error("Disaster recovery restore failed: {}", e.getMessage(), e);
            auditLogService.logAsync("SYSTEM", "System Administrator", UserRole.ADMIN,
                    "RESTORE_BACKUP", "DISTRICT-ALL", "Restore failed: " + e.getMessage(), "127.0.0.1", "FAILED");
            throw new IllegalStateException("Failed to restore backup snapshot: " + e.getMessage());
        }
    }
}
