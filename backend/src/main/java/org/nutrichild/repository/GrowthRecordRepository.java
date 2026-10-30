package org.nutrichild.repository;

import org.nutrichild.model.GrowthRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface GrowthRecordRepository extends JpaRepository<GrowthRecord, Long> {
    List<GrowthRecord> findByChildIdOrderByRecordedAtDesc(Long childId);
    Optional<GrowthRecord> findFirstByChildIdOrderByRecordedAtDesc(Long childId);
    List<GrowthRecord> findByRiskCategory(String riskCategory);
}
