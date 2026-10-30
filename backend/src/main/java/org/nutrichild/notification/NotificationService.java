package org.nutrichild.notification;

import org.nutrichild.model.Child;
import org.nutrichild.model.GrowthRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);
    private final HealthAlertRepository alertRepo;

    public NotificationService(HealthAlertRepository alertRepo) {
        this.alertRepo = alertRepo;
    }

    @Async
    public void createSamMalnutritionAlert(Child child, GrowthRecord record) {
        try {
            String msg = String.format("URGENT: Child %s (%s) diagnosed with Severe Acute Malnutrition (SAM). Weight: %.1f kg, Height: %.1f cm, MUAC: %.1f cm.",
                    child.getFullName(), child.getUhid(), record.getWeightKg(), record.getHeightCm(),
                    record.getMuacCm() != null ? record.getMuacCm() : 0.0);

            HealthAlert alert = new HealthAlert(
                    child.getId(),
                    child.getUhid(),
                    child.getFullName(),
                    "SAM_MALNUTRITION",
                    "CRITICAL",
                    msg,
                    "Immediate referral to Nutrition Rehabilitation Centre (NRC) or Medical Officer review required."
            );
            alertRepo.save(alert);
            log.warn("[HEALTH ALERT] Critical SAM registered for UHID: {}", child.getUhid());
        } catch (Exception e) {
            log.error("Failed to generate SAM alert: {}", e.getMessage());
        }
    }

    @Async
    public void createOverdueVaccineAlert(Child child, String vaccineName, String dueDate) {
        try {
            String msg = String.format("Child %s (%s) has overdue UIP vaccine: %s (Due since %s).",
                    child.getFullName(), child.getUhid(), vaccineName, dueDate);

            HealthAlert alert = new HealthAlert(
                    child.getId(),
                    child.getUhid(),
                    child.getFullName(),
                    "OVERDUE_VACCINE",
                    "WARNING",
                    msg,
                    "Schedule home outreach or Anganwadi immunisation session."
            );
            alertRepo.save(alert);
        } catch (Exception e) {
            log.error("Failed to generate overdue vaccine alert: {}", e.getMessage());
        }
    }

    public List<HealthAlert> getAllAlerts(boolean unreadOnly) {
        return unreadOnly ? alertRepo.findByIsReadFalseOrderByCreatedAtDesc() : alertRepo.findAllByOrderByCreatedAtDesc();
    }

    public boolean markAsRead(Long alertId) {
        Optional<HealthAlert> opt = alertRepo.findById(alertId);
        if (opt.isPresent()) {
            HealthAlert a = opt.get();
            a.setRead(true);
            alertRepo.save(a);
            return true;
        }
        return false;
    }

    public Map<String, Object> getAlertSummary() {
        long unread = alertRepo.countByIsReadFalse();
        long critical = alertRepo.findBySeverityOrderByCreatedAtDesc("CRITICAL").stream().filter(a -> !a.isRead()).count();
        long warning = alertRepo.findBySeverityOrderByCreatedAtDesc("WARNING").stream().filter(a -> !a.isRead()).count();

        return Map.of(
            "totalUnread", unread,
            "criticalAlerts", critical,
            "warnings", warning
        );
    }
}
