package org.nutrichild.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "vaccination_records")
public class VaccinationRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long childId;

    @Column(nullable = false)
    private String vaccineCode; // e.g. BCG, OPV_0, HEP_B, PENTA_1, ROTA_1, PCV_1, MR_1

    @Column(nullable = false)
    private String vaccineName;

    private Integer targetAgeWeeks;

    @Column(nullable = false)
    private LocalDate dueDate;

    private LocalDate administeredDate;

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, ADMINISTERED, OVERDUE

    private String batchNumber;
    private String administeredBy;
    private String notes;

    public VaccinationRecord() {}

    public VaccinationRecord(Long childId, String vaccineCode, String vaccineName, Integer targetAgeWeeks, LocalDate dueDate, String status) {
        this.childId = childId;
        this.vaccineCode = vaccineCode;
        this.vaccineName = vaccineName;
        this.targetAgeWeeks = targetAgeWeeks;
        this.dueDate = dueDate;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getChildId() { return childId; }
    public void setChildId(Long childId) { this.childId = childId; }

    public String getVaccineCode() { return vaccineCode; }
    public void setVaccineCode(String vaccineCode) { this.vaccineCode = vaccineCode; }

    public String getVaccineName() { return vaccineName; }
    public void setVaccineName(String vaccineName) { this.vaccineName = vaccineName; }

    public Integer getTargetAgeWeeks() { return targetAgeWeeks; }
    public void setTargetAgeWeeks(Integer targetAgeWeeks) { this.targetAgeWeeks = targetAgeWeeks; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public LocalDate getAdministeredDate() { return administeredDate; }
    public void setAdministeredDate(LocalDate administeredDate) { this.administeredDate = administeredDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }

    public String getAdministeredBy() { return administeredBy; }
    public void setAdministeredBy(String administeredBy) { this.administeredBy = administeredBy; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
