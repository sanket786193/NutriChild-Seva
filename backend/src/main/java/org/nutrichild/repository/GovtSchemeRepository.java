package org.nutrichild.repository;

import org.nutrichild.model.GovtScheme;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface GovtSchemeRepository extends JpaRepository<GovtScheme, Long> {
    Optional<GovtScheme> findByCode(String code);
}
