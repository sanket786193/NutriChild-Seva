package org.nutrichild.service;

import org.nutrichild.model.Child;
import org.nutrichild.model.GrowthRecord;
import org.nutrichild.repository.ChildRepository;
import org.nutrichild.repository.GrowthRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class OfflineSyncService {

    private final ChildRepository childRepo;
    private final GrowthRecordRepository growthRepo;
    private final GrowthAssessmentService growthAssessmentService;
    private final VaccinationScheduleService vaccinationScheduleService;

    public OfflineSyncService(ChildRepository childRepo, GrowthRecordRepository growthRepo,
                              GrowthAssessmentService growthAssessmentService,
                              VaccinationScheduleService vaccinationScheduleService) {
        this.childRepo = childRepo;
        this.growthRepo = growthRepo;
        this.growthAssessmentService = growthAssessmentService;
        this.vaccinationScheduleService = vaccinationScheduleService;
    }

    @Transactional
    public Map<String, Object> processSyncBatch(List<Map<String, Object>> items) {
        int syncedChildren = 0;
        int syncedGrowthRecords = 0;
        List<String> processedSyncIds = new ArrayList<>();

        for (Map<String, Object> item : items) {
            String entityType = (String) item.get("entityType"); // "CHILD" or "GROWTH"
            String syncId = (String) item.get("clientSyncId");

            if ("CHILD".equalsIgnoreCase(entityType)) {
                // Upsert Child
                String uhid = (String) item.get("uhid");
                Optional<Child> existing = uhid != null ? childRepo.findByUhid(uhid) : Optional.empty();
                Child child = existing.orElse(new Child());

                child.setFullName((String) item.get("fullName"));
                child.setGender((String) item.get("gender"));
                child.setParentName((String) item.get("parentName"));
                child.setParentPhone((String) item.get("parentPhone"));
                child.setVillage((String) item.get("village"));
                child.setDistrict((String) item.get("district"));
                child.setAnganwadiCenter((String) item.get("anganwadiCenter"));

                if (item.get("birthWeightKg") != null) {
                    child.setBirthWeightKg(Double.valueOf(item.get("birthWeightKg").toString()));
                }
                if (item.get("dateOfBirth") != null) {
                    child.setDateOfBirth(java.time.LocalDate.parse((String) item.get("dateOfBirth")));
                }

                Child saved = childRepo.save(child);
                if (existing.isEmpty()) {
                    vaccinationScheduleService.generateUipSchedule(saved);
                }
                syncedChildren++;
                processedSyncIds.add(syncId != null ? syncId : "child-" + saved.getId());

            } else if ("GROWTH".equalsIgnoreCase(entityType)) {
                // Upsert Growth Checkup
                Long childId = item.get("childId") != null ? Long.valueOf(item.get("childId").toString()) : null;
                if (childId != null && childRepo.existsById(childId)) {
                    Child child = childRepo.findById(childId).get();
                    GrowthRecord record = new GrowthRecord();
                    record.setChildId(childId);
                    if (item.get("weightKg") != null) record.setWeightKg(Double.valueOf(item.get("weightKg").toString()));
                    if (item.get("heightCm") != null) record.setHeightCm(Double.valueOf(item.get("heightCm").toString()));
                    if (item.get("muacCm") != null) record.setMuacCm(Double.valueOf(item.get("muacCm").toString()));
                    if (item.get("hemoglobinGdl") != null) record.setHemoglobinGdl(Double.valueOf(item.get("hemoglobinGdl").toString()));
                    if (item.get("recordedByRole") != null) record.setRecordedByRole((String) item.get("recordedByRole"));
                    if (item.get("recordedByName") != null) record.setRecordedByName((String) item.get("recordedByName"));

                    growthAssessmentService.assessGrowth(child, record);
                    growthRepo.save(record);
                    syncedGrowthRecords++;
                    processedSyncIds.add(syncId != null ? syncId : "growth-" + record.getId());
                }
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("status", "SUCCESS");
        result.put("syncedChildrenCount", syncedChildren);
        result.put("syncedGrowthRecordsCount", syncedGrowthRecords);
        result.put("acknowledgedSyncIds", processedSyncIds);
        result.put("serverTimestamp", System.currentTimeMillis());
        return result;
    }
}
