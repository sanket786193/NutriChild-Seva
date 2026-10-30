package org.nutrichild.controller;

import org.nutrichild.service.HealthCenterLocatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/healthcenters")
public class HealthCenterController {

    private final HealthCenterLocatorService locatorService;

    public HealthCenterController(HealthCenterLocatorService locatorService) {
        this.locatorService = locatorService;
    }

    @GetMapping("/nearest")
    public ResponseEntity<?> getNearestCenters(
            @RequestParam(defaultValue = "19.1685") Double lat,
            @RequestParam(defaultValue = "83.4150") Double lng,
            @RequestParam(defaultValue = "10") int limit) {
        
        List<Map<String, Object>> centers = locatorService.findNearestCenters(lat, lng, limit);
        return ResponseEntity.ok(centers);
    }
}
