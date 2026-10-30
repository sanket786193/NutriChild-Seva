package org.nutrichild.repository;

import org.nutrichild.model.HealthCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HealthCenterRepository extends JpaRepository<HealthCenter, Long> {
    List<HealthCenter> findByDistrict(String district);
    List<HealthCenter> findByHasNRCTrue();
}
