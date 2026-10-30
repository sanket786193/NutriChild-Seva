package org.nutrichild.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "growth_records")
public class GrowthRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long childId;

    @Column(nullable = false)
    private LocalDateTime recordedAt = LocalDateTime.now();

    private String recordedByRole; // ASHA, ANGANWADI, DOCTOR
    private String recordedByName;

    private Integer ageMonths;
    private Double weightKg;
    private Double heightCm;
    private Double muacCm; // Mid-Upper Arm Circumference
    private Double hemoglobinGdl;
    private Double bmi;

    private Boolean edemaPresent = false; // Bilateral pitting edema indicator

    // WHO Classifications
    private String wastingStatus;      // NORMAL, MAM (Moderate Acute Malnutrition), SAM (Severe Acute Malnutrition)
    private String stuntingStatus;     // NORMAL, MODERATE, SEVERE
    private String underweightStatus;  // NORMAL, MODERATE, SEVERE
    private String anemiaLevel;        // NORMAL (>=11.0), MILD (10.0-10.9), MODERATE (7.0-9.9), SEVERE (<7.0)

    // Traffic Light Status: GREEN, YELLOW, ORANGE, RED
    @Column(nullable = false)
    private String riskCategory = "GREEN";

    private String actionSummary;
    private String notes;

    public GrowthRecord() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getChildId() { return childId; }
    public void setChildId(Long childId) { this.childId = childId; }

    public LocalDateTime getRecordedAt() { return recordedAt; }
    public void setRecordedAt(LocalDateTime recordedAt) { this.recordedAt = recordedAt; }

    public String getRecordedByRole() { return recordedByRole; }
    public void setRecordedByRole(String recordedByRole) { this.recordedByRole = recordedByRole; }

    public String getRecordedByName() { return recordedByName; }
    public void setRecordedByName(String recordedByName) { this.recordedByName = recordedByName; }

    public Integer getAgeMonths() { return ageMonths; }
    public void setAgeMonths(Integer ageMonths) { this.ageMonths = ageMonths; }

    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }

    public Double getHeightCm() { return heightCm; }
    public void setHeightCm(Double heightCm) { this.heightCm = heightCm; }

    public Double getMuacCm() { return muacCm; }
    public void setMuacCm(Double muacCm) { this.muacCm = muacCm; }

    public Double getHemoglobinGdl() { return hemoglobinGdl; }
    public void setHemoglobinGdl(Double hemoglobinGdl) { this.hemoglobinGdl = hemoglobinGdl; }

    public Double getBmi() { return bmi; }
    public void setBmi(Double bmi) { this.bmi = bmi; }

    public Boolean getEdemaPresent() { return edemaPresent; }
    public void setEdemaPresent(Boolean edemaPresent) { this.edemaPresent = edemaPresent; }

    public String getWastingStatus() { return wastingStatus; }
    public void setWastingStatus(String wastingStatus) { this.wastingStatus = wastingStatus; }

    public String getStuntingStatus() { return stuntingStatus; }
    public void setStuntingStatus(String stuntingStatus) { this.stuntingStatus = stuntingStatus; }

    public String getUnderweightStatus() { return underweightStatus; }
    public void setUnderweightStatus(String underweightStatus) { this.underweightStatus = underweightStatus; }

    public String getAnemiaLevel() { return anemiaLevel; }
    public void setAnemiaLevel(String anemiaLevel) { this.anemiaLevel = anemiaLevel; }

    public String getRiskCategory() { return riskCategory; }
    public void setRiskCategory(String riskCategory) { this.riskCategory = riskCategory; }

    public String getActionSummary() { return actionSummary; }
    public void setActionSummary(String actionSummary) { this.actionSummary = actionSummary; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
