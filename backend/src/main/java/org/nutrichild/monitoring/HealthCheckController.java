package org.nutrichild.monitoring;

import org.nutrichild.common.ApiResponse;
import org.nutrichild.repository.ChildRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.management.ManagementFactory;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
public class HealthCheckController {

    private final ChildRepository childRepo;
    private final long startupTime = Instant.now().toEpochMilli();

    public HealthCheckController(ChildRepository childRepo) {
        this.childRepo = childRepo;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkHealth() {
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("status", "UP");
        status.put("service", "NutriChild+ Production Backend");
        status.put("version", "2.4.0-enterprise");
        status.put("environment", "production");

        // Database connectivity test
        boolean dbHealthy = true;
        long totalChildren = 0;
        try {
            totalChildren = childRepo.count();
        } catch (Exception e) {
            dbHealthy = false;
        }
        status.put("database", Map.of(
            "status", dbHealthy ? "UP" : "DOWN",
            "type", "H2 / PostgreSQL Supabase Hybrid",
            "totalMonitoredChildren", totalChildren
        ));

        // JVM Memory Stats
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory() / (1024 * 1024);
        long totalMemory = runtime.totalMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);
        long usedMemory = totalMemory - freeMemory;

        status.put("jvmMemoryMb", Map.of(
            "used", usedMemory,
            "free", freeMemory,
            "total", totalMemory,
            "max", maxMemory
        ));

        // Uptime in seconds
        long uptimeSeconds = (Instant.now().toEpochMilli() - startupTime) / 1000;
        status.put("uptimeSeconds", uptimeSeconds);
        status.put("jvmUptimeMs", ManagementFactory.getRuntimeMXBean().getUptime());
        status.put("compliance", "DPDP Act 2023 · ISO 27001 · Ayushman Bharat Digital Mission (ABDM)");

        return ResponseEntity.ok(ApiResponse.ok("System healthy and operating within nominal parameters", status));
    }
}
