package org.nutrichild.backup;

import org.nutrichild.common.ApiResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/backup")
public class BackupController {

    private final BackupService backupService;
    private final ObjectMapper objectMapper;

    public BackupController(BackupService backupService, ObjectMapper objectMapper) {
        this.backupService = backupService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportBackupJson() throws Exception {
        Map<String, Object> snapshot = backupService.createBackupSnapshot();
        String json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(snapshot);
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);

        String filename = "nutrichild_backup_" + LocalDate.now() + ".json";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.APPLICATION_JSON)
                .body(bytes);
    }

    @PostMapping("/restore")
    public ResponseEntity<ApiResponse<Map<String, Object>>> restoreBackup(
            @RequestBody Map<String, Object> backupPayload) {

        Map<String, Object> result = backupService.restoreFromSnapshot(backupPayload);
        return ResponseEntity.ok(ApiResponse.ok("Backup restored successfully", result));
    }
}
