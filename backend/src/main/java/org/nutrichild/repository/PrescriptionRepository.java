package org.nutrichild.repository;

import org.nutrichild.model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByChildIdOrderByPrescriptionDateDesc(Long childId);
    List<Prescription> findAllByOrderByPrescriptionDateDesc();
}
