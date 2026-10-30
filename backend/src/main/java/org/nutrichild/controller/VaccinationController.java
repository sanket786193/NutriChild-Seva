package org.nutrichild.controller;

import org.nutrichild.model.VaccinationRecord;
import org.nutrichild.repository.VaccinationRecordRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/v1/vaccinations")
public class VaccinationController {

    private final VaccinationRecordRepository vaccineRepo;

    public VaccinationController(VaccinationRecordRepository vaccineRepo) {
        this.vaccineRepo = vaccineRepo;
    }

    @GetMapping("/child/{childId}")
    public ResponseEntity<?> getChildVaccines(@PathVariable Long childId) {
        List<VaccinationRecord> list = vaccineRepo.findByChildIdOrderByDueDateAsc(childId);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/{id}/administer")
    public ResponseEntity<?> administerVaccine(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> payload) {

        Optional<VaccinationRecord> opt = vaccineRepo.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        VaccinationRecord rec = opt.get();
        rec.setStatus("ADMINISTERED");
        rec.setAdministeredDate(LocalDate.now());

        if (payload != null) {
            if (payload.containsKey("batchNumber")) rec.setBatchNumber(payload.get("batchNumber"));
            if (payload.containsKey("administeredBy")) rec.setAdministeredBy(payload.get("administeredBy"));
            if (payload.containsKey("notes")) rec.setNotes(payload.get("notes"));
        }

        vaccineRepo.save(rec);
        return ResponseEntity.ok(rec);
    }
}
