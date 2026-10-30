package org.nutrichild.controller;

import org.nutrichild.service.OfflineSyncService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/sync")
public class OfflineSyncController {

    private final OfflineSyncService syncService;

    public OfflineSyncController(OfflineSyncService syncService) {
        this.syncService = syncService;
    }

    @PostMapping("/batch")
    public ResponseEntity<?> syncOfflineBatch(@RequestBody Map<String, Object> request) {
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> items = (List<Map<String, Object>>) request.getOrDefault("items", Collections.emptyList());

        Map<String, Object> result = syncService.processSyncBatch(items);
        return ResponseEntity.ok(result);
    }
}
