package org.nutrichild.controller;

import org.nutrichild.model.User;
import org.nutrichild.model.UserRole;
import org.nutrichild.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class DatabaseTestController {

    private final UserRepository userRepository;
    private final JdbcTemplate jdbcTemplate;

    public DatabaseTestController(UserRepository userRepository, JdbcTemplate jdbcTemplate) {
        this.userRepository = userRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/test-db")
    public ResponseEntity<Map<String, Object>> testDatabase() {
        Map<String, Object> response = new LinkedHashMap<>();

        try {
            // Check underlying database name & version via SQL
            String dbVersion = jdbcTemplate.queryForObject("SELECT version()", String.class);
            String currentDb = jdbcTemplate.queryForObject("SELECT current_database()", String.class);

            // Test insertion of a designated test record
            String testPhone = "9999999999";
            Optional<User> existing = userRepository.findByPhone(testPhone);
            existing.ifPresent(userRepository::delete);

            User testUser = new User();
            testUser.setPhone(testPhone);
            testUser.setPassword("test_encrypted_pw");
            testUser.setFullName("Supabase Integration Test User");
            testUser.setRole(UserRole.ADMIN);
            testUser.setLanguageCode("en");
            testUser.setVillage("Test Village");
            testUser.setDistrict("Test District");

            User saved = userRepository.save(testUser);
            boolean recordInserted = saved.getId() != null;

            // Fetch it back
            Optional<User> fetched = userRepository.findByPhone(testPhone);
            boolean recordFetched = fetched.isPresent();

            response.put("status", "SUCCESS");
            response.put("database", "Connected");
            response.put("engine", dbVersion != null ? (dbVersion.length() > 60 ? dbVersion.substring(0, 60) + "..." : dbVersion) : "PostgreSQL");
            response.put("databaseName", currentDb);
            response.put("recordInserted", recordInserted);
            response.put("recordFetched", recordFetched);
            response.put("testUserId", saved.getId());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "FAILED");
            response.put("database", "Error");
            response.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
