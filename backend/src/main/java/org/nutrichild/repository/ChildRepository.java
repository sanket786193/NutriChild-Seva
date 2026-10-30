package org.nutrichild.repository;

import org.nutrichild.model.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ChildRepository extends JpaRepository<Child, Long> {
    Optional<Child> findByQrToken(String qrToken);
    Optional<Child> findByUhid(String uhid);
    boolean existsByUhid(String uhid);
    List<Child> findByParentPhone(String parentPhone);
    List<Child> findByVillage(String village);
    List<Child> findByAnganwadiCenter(String anganwadiCenter);
}
