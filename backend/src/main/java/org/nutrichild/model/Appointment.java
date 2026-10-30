package org.nutrichild.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long childId;

    private String childName;
    private String childUhid;
    private String parentName;
    private String parentPhone;
    private String village;

    @Column(nullable = false)
    private LocalDate appointmentDate;

    private String timeSlot = "10:30 AM";
    private String consultationType = "IN_PERSON"; // IN_PERSON, VIDEO, AUDIO
    private String reason; // "SAM Followup", "Vaccine checkup", "Persistent Fever & Diarrhea"
    private String status = "SCHEDULED"; // SCHEDULED, COMPLETED, RESCHEDULED, CANCELLED

    private String clinicalNotes;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Appointment() {}

    public Appointment(Long childId, String childName, String childUhid, String parentName, String parentPhone, String village, LocalDate appointmentDate, String timeSlot, String consultationType, String reason, String status) {
        this.childId = childId;
        this.childName = childName;
        this.childUhid = childUhid;
        this.parentName = parentName;
        this.parentPhone = parentPhone;
        this.village = village;
        this.appointmentDate = appointmentDate;
        this.timeSlot = timeSlot;
        this.consultationType = consultationType;
        this.reason = reason;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getChildId() { return childId; }
    public void setChildId(Long childId) { this.childId = childId; }

    public String getChildName() { return childName; }
    public void setChildName(String childName) { this.childName = childName; }

    public String getChildUhid() { return childUhid; }
    public void setChildUhid(String childUhid) { this.childUhid = childUhid; }

    public String getParentName() { return parentName; }
    public void setParentName(String parentName) { this.parentName = parentName; }

    public String getParentPhone() { return parentPhone; }
    public void setParentPhone(String parentPhone) { this.parentPhone = parentPhone; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getConsultationType() { return consultationType; }
    public void setConsultationType(String consultationType) { this.consultationType = consultationType; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getClinicalNotes() { return clinicalNotes; }
    public void setClinicalNotes(String clinicalNotes) { this.clinicalNotes = clinicalNotes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
