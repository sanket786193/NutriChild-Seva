package org.nutrichild.audit;

import org.nutrichild.common.ApiResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/audit")
public class AuditController {

    private final AuditLogRepository auditRepo;

    public AuditController(AuditLogRepository auditRepo) {
        this.auditRepo = auditRepo;
    }

    @GetMapping("/logs")
    public ResponseEntity<ApiResponse<List<AuditLog>>> getLogs(
            @RequestParam(defaultValue = "50") int limit,
            @RequestParam(required = false) String action,
            @RequestParam(required = false) String uhid) {

        List<AuditLog> logs;
        if (action != null && !action.isBlank()) {
            logs = auditRepo.findByActionOrderByTimestampDesc(action);
        } else if (uhid != null && !uhid.isBlank()) {
            logs = auditRepo.findByTargetUhidOrderByTimestampDesc(uhid);
        } else {
            logs = auditRepo.findAllByOrderByTimestampDesc().stream().limit(limit).toList();
        }

        return ResponseEntity.ok(ApiResponse.ok("Retrieved " + logs.size() + " audit log entries", logs));
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportCsv() {
        List<AuditLog> logs = auditRepo.findAllByOrderByTimestampDesc();
        DateTimeFormatter dtf = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        StringBuilder sb = new StringBuilder();
        sb.append("LogID,Timestamp,ActorPhone,ActorName,ActorRole,Action,TargetUHID,Status,ClientIP,Details\n");

        for (AuditLog log : logs) {
            sb.append(log.getId()).append(",")
              .append(log.getTimestamp() != null ? log.getTimestamp().format(dtf) : "").append(",")
              .append("\"").append(log.getActorPhone() != null ? log.getActorPhone() : "").append("\",")
              .append("\"").append(log.getActorName() != null ? log.getActorName() : "").append("\",")
              .append(log.getActorRole() != null ? log.getActorRole().name() : "").append(",")
              .append(log.getAction()).append(",")
              .append(log.getTargetUhid() != null ? log.getTargetUhid() : "").append(",")
              .append(log.getStatus()).append(",")
              .append(log.getClientIp() != null ? log.getClientIp() : "").append(",")
              .append("\"").append(log.getDetails() != null ? log.getDetails().replace("\"", "\"\"") : "").append("\"\n");
        }

        byte[] csvBytes = sb.toString().getBytes(StandardCharsets.UTF_8);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"nutrichild_audit_trail.csv\"")
                .contentType(MediaType.parseMediaType("text/csv; charset=UTF-8"))
                .body(csvBytes);
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAuditSummary() {
        long total = auditRepo.count();
        long successCount = auditRepo.findAll().stream().filter(l -> "SUCCESS".equalsIgnoreCase(l.getStatus())).count();
        long deniedCount = auditRepo.findAll().stream().filter(l -> "DENIED".equalsIgnoreCase(l.getStatus())).count();

        Map<String, Object> summary = Map.of(
            "totalLogs", total,
            "successEvents", successCount,
            "deniedEvents", deniedCount,
            "complianceStandard", "DPDP Act 2023 & NDHM EHR Guidelines"
        );
        return ResponseEntity.ok(ApiResponse.ok(summary));
    }
}
