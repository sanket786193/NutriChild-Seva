package org.nutrichild.audit;

import jakarta.persistence.*;
import org.nutrichild.model.UserRole;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs", indexes = {
    @Index(name = "idx_audit_timestamp", columnList = "timestamp"),
    @Index(name = "idx_audit_actor_role", columnList = "actorRole"),
    @Index(name = "idx_audit_action", columnList = "action"),
    @Index(name = "idx_audit_target_uhid", columnList = "targetUhid")
})
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    private String actorPhone;
    private String actorName;

    @Enumerated(EnumType.STRING)
    private UserRole actorRole;

    @Column(nullable = false)
    private String action; // LOGIN, LOGOUT, VIEW_CHILD, CREATE_CHILD, RECORD_GROWTH, CREATE_PRESCRIPTION, REFERRAL_NRC, EXPORT_BACKUP, RESTORE_BACKUP

    private String targetUhid;

    @Column(length = 1000)
    private String details;

    private String clientIp;

    @Column(nullable = false)
    private String status; // SUCCESS, FAILED, DENIED

    public AuditLog() {
        this.timestamp = LocalDateTime.now();
    }

    public AuditLog(String actorPhone, String actorName, UserRole actorRole, String action,
                    String targetUhid, String details, String clientIp, String status) {
        this();
        this.actorPhone = actorPhone;
        this.actorName = actorName;
        this.actorRole = actorRole;
        this.action = action;
        this.targetUhid = targetUhid;
        this.details = details;
        this.clientIp = clientIp;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getActorPhone() { return actorPhone; }
    public void setActorPhone(String actorPhone) { this.actorPhone = actorPhone; }

    public String getActorName() { return actorName; }
    public void setActorName(String actorName) { this.actorName = actorName; }

    public UserRole getActorRole() { return actorRole; }
    public void setActorRole(UserRole actorRole) { this.actorRole = actorRole; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getTargetUhid() { return targetUhid; }
    public void setTargetUhid(String targetUhid) { this.targetUhid = targetUhid; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getClientIp() { return clientIp; }
    public void setClientIp(String clientIp) { this.clientIp = clientIp; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
