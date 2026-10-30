package org.nutrichild.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthAlertRepository extends JpaRepository<HealthAlert, Long> {

    List<HealthAlert> findAllByOrderByCreatedAtDesc();

    List<HealthAlert> findByIsReadFalseOrderByCreatedAtDesc();

    List<HealthAlert> findByChildIdOrderByCreatedAtDesc(Long childId);

    List<HealthAlert> findBySeverityOrderByCreatedAtDesc(String severity);

    long countByIsReadFalse();
}
