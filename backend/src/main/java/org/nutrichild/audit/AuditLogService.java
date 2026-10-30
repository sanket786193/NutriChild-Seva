package org.nutrichild.audit;

import org.nutrichild.model.UserRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogService {

    private static final Logger log = LoggerFactory.getLogger(AuditLogService.class);
    private final AuditLogRepository auditRepo;

    public AuditLogService(AuditLogRepository auditRepo) {
        this.auditRepo = auditRepo;
    }

    @Async
    public void logAsync(String actorPhone, String actorName, UserRole actorRole, String action,
                         String targetUhid, String details, String clientIp, String status) {
        try {
            AuditLog audit = new AuditLog(actorPhone, actorName, actorRole, action, targetUhid, details, clientIp, status);
            auditRepo.save(audit);
            log.info("[AUDIT] Action: {} | Role: {} | Target: {} | Status: {}", action, actorRole, targetUhid, status);
        } catch (Exception e) {
            log.error("Failed to record audit log: {}", e.getMessage());
        }
    }

    public void logSync(String actorPhone, String actorName, UserRole actorRole, String action,
                        String targetUhid, String details, String clientIp, String status) {
        AuditLog audit = new AuditLog(actorPhone, actorName, actorRole, action, targetUhid, details, clientIp, status);
        auditRepo.save(audit);
    }

    public List<AuditLog> getRecentLogs(int limit) {
        Page<AuditLog> page = auditRepo.findAllByOrderByTimestampDesc(PageRequest.of(0, limit));
        return page.getContent();
    }

    public List<AuditLog> getAllLogs() {
        return auditRepo.findAllByOrderByTimestampDesc();
    }
}
