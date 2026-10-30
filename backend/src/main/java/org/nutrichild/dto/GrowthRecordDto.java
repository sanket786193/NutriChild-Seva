package org.nutrichild.dto;

import jakarta.validation.constraints.*;

public class GrowthRecordDto {

    @NotNull(message = "Child ID is required")
    private Long childId;

    private Integer ageMonths;

    @NotNull(message = "Weight is required")
    @DecimalMin(value = "1.0", message = "Weight must be at least 1.0 kg")
    @DecimalMax(value = "50.0", message = "Weight cannot exceed 50.0 kg")
    private Double weightKg;

    @NotNull(message = "Height is required")
    @DecimalMin(value = "30.0", message = "Height must be at least 30.0 cm")
    @DecimalMax(value = "160.0", message = "Height cannot exceed 160.0 cm")
    private Double heightCm;

    @DecimalMin(value = "5.0", message = "MUAC must be at least 5.0 cm")
    @DecimalMax(value = "25.0", message = "MUAC cannot exceed 25.0 cm")
    private Double muacCm;

    @DecimalMin(value = "2.0", message = "Hemoglobin must be at least 2.0 g/dL")
    @DecimalMax(value = "20.0", message = "Hemoglobin cannot exceed 20.0 g/dL")
    private Double hemoglobinGdl;

    private Boolean edemaPresent = false;
    private String recordedByName;
    private String recordedByRole;
    private String notes;

    public GrowthRecordDto() {}

    public Long getChildId() { return childId; }
    public void setChildId(Long childId) { this.childId = childId; }

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

    public Boolean getEdemaPresent() { return edemaPresent; }
    public void setEdemaPresent(Boolean edemaPresent) { this.edemaPresent = edemaPresent; }

    public String getRecordedByName() { return recordedByName; }
    public void setRecordedByName(String recordedByName) { this.recordedByName = recordedByName; }

    public String getRecordedByRole() { return recordedByRole; }
    public void setRecordedByRole(String recordedByRole) { this.recordedByRole = recordedByRole; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
