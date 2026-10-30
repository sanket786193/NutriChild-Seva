package org.nutrichild.notification;

import org.nutrichild.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<HealthAlert>>> getAlerts(
            @RequestParam(defaultValue = "false") boolean unreadOnly) {
        List<HealthAlert> alerts = notificationService.getAllAlerts(unreadOnly);
        return ResponseEntity.ok(ApiResponse.ok("Alerts retrieved", alerts));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@PathVariable Long id) {
        boolean updated = notificationService.markAsRead(id);
        if (!updated) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Alert not found with ID: " + id));
        }
        return ResponseEntity.ok(ApiResponse.ok("Alert marked as read", null));
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getSummary() {
        return ResponseEntity.ok(ApiResponse.ok("Summary retrieved", notificationService.getAlertSummary()));
    }
}
