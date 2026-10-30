package org.nutrichild.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long childId;

    private String childName;
    private String childUhid;

    private String doctorName = "Dr. Rajesh Patra, MBBS, DCH";
    private String doctorRegistrationNo = "MCI-OD-2015-4421";
    private String hospitalClinic = "Rayagada District Hospital & CHC";

    private LocalDate prescriptionDate = LocalDate.now();

    private String primaryDiagnosis;
    private String clinicalNotes;

    @Column(length = 2000)
    private String medicineListJson; // JSON list of items: name, dose, timing (morning/noon/night), meal relation, duration

    private String dietaryAdvice;
    private LocalDate followUpDate;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Prescription() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getChildId() { return childId; }
    public void setChildId(Long childId) { this.childId = childId; }

    public String getChildName() { return childName; }
    public void setChildName(String childName) { this.childName = childName; }

    public String getChildUhid() { return childUhid; }
    public void setChildUhid(String childUhid) { this.childUhid = childUhid; }

    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }

    public String getDoctorRegistrationNo() { return doctorRegistrationNo; }
    public void setDoctorRegistrationNo(String doctorRegistrationNo) { this.doctorRegistrationNo = doctorRegistrationNo; }

    public String getHospitalClinic() { return hospitalClinic; }
    public void setHospitalClinic(String hospitalClinic) { this.hospitalClinic = hospitalClinic; }

    public LocalDate getPrescriptionDate() { return prescriptionDate; }
    public void setPrescriptionDate(LocalDate prescriptionDate) { this.prescriptionDate = prescriptionDate; }

    public String getPrimaryDiagnosis() { return primaryDiagnosis; }
    public void setPrimaryDiagnosis(String primaryDiagnosis) { this.primaryDiagnosis = primaryDiagnosis; }

    public String getClinicalNotes() { return clinicalNotes; }
    public void setClinicalNotes(String clinicalNotes) { this.clinicalNotes = clinicalNotes; }

    public String getMedicineListJson() { return medicineListJson; }
    public void setMedicineListJson(String medicineListJson) { this.medicineListJson = medicineListJson; }

    public String getDietaryAdvice() { return dietaryAdvice; }
    public void setDietaryAdvice(String dietaryAdvice) { this.dietaryAdvice = dietaryAdvice; }

    public LocalDate getFollowUpDate() { return followUpDate; }
    public void setFollowUpDate(LocalDate followUpDate) { this.followUpDate = followUpDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
