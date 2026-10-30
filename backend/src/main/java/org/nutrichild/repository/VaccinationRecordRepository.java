package org.nutrichild.repository;

import org.nutrichild.model.VaccinationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VaccinationRecordRepository extends JpaRepository<VaccinationRecord, Long> {
    List<VaccinationRecord> findByChildIdOrderByDueDateAsc(Long childId);
    List<VaccinationRecord> findByChildIdAndStatus(Long childId, String status);
}
