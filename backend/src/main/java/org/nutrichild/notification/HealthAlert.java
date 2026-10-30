package org.nutrichild.notification;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_alerts", indexes = {
    @Index(name = "idx_alert_child_id", columnList = "childId"),
    @Index(name = "idx_alert_severity", columnList = "severity"),
    @Index(name = "idx_alert_is_read", columnList = "isRead"),
    @Index(name = "idx_alert_created_at", columnList = "createdAt")
})
public class HealthAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long childId;

    private String uhid;
    private String childName;

    @Column(nullable = false)
    private String alertType; // SAM_MALNUTRITION, OVERDUE_VACCINE, GROWTH_FALTERING, APPOINTMENT_REMINDER

    @Column(nullable = false)
    private String severity; // CRITICAL, WARNING, INFO

    @Column(nullable = false, length = 1000)
    private String message;

    private String actionRequired;

    private boolean isRead = false;

    private LocalDateTime createdAt = LocalDateTime.now();

    public HealthAlert() {}

    public HealthAlert(Long childId, String uhid, String childName, String alertType,
                       String severity, String message, String actionRequired) {
        this.childId = childId;
        this.uhid = uhid;
        this.childName = childName;
        this.alertType = alertType;
        this.severity = severity;
        this.message = message;
        this.actionRequired = actionRequired;
        this.isRead = false;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getChildId() { return childId; }
    public void setChildId(Long childId) { this.childId = childId; }

    public String getUhid() { return uhid; }
    public void setUhid(String uhid) { this.uhid = uhid; }

    public String getChildName() { return childName; }
    public void setChildName(String childName) { this.childName = childName; }

    public String getAlertType() { return alertType; }
    public void setAlertType(String alertType) { this.alertType = alertType; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getActionRequired() { return actionRequired; }
    public void setActionRequired(String actionRequired) { this.actionRequired = actionRequired; }

    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
