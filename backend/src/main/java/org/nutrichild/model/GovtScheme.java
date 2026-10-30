package org.nutrichild.model;

import jakarta.persistence.*;

@Entity
@Table(name = "govt_schemes")
public class GovtScheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code; // POSHAN_2_0, PMMVY, WBNP, KCR_KIT, ICDS_THR

    @Column(nullable = false)
    private String name;

    private String targetCategory; // "Infants (0-6m)", "Children (6m-6y)", "Lactating Mothers", "SAM/MAM Children"

    @Column(length = 2000)
    private String description;

    private String financialAssistance;
    private String foodAssistance;

    @Column(length = 1000)
    private String eligibilityCriteria;

    private String documentsRequired;
    private String officialPortalUrl;

    public GovtScheme() {}

    public GovtScheme(String code, String name, String targetCategory, String description, String financialAssistance, String foodAssistance, String eligibilityCriteria, String documentsRequired) {
        this.code = code;
        this.name = name;
        this.targetCategory = targetCategory;
        this.description = description;
        this.financialAssistance = financialAssistance;
        this.foodAssistance = foodAssistance;
        this.eligibilityCriteria = eligibilityCriteria;
        this.documentsRequired = documentsRequired;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTargetCategory() { return targetCategory; }
    public void setTargetCategory(String targetCategory) { this.targetCategory = targetCategory; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getFinancialAssistance() { return financialAssistance; }
    public void setFinancialAssistance(String financialAssistance) { this.financialAssistance = financialAssistance; }

    public String getFoodAssistance() { return foodAssistance; }
    public void setFoodAssistance(String foodAssistance) { this.foodAssistance = foodAssistance; }

    public String getEligibilityCriteria() { return eligibilityCriteria; }
    public void setEligibilityCriteria(String eligibilityCriteria) { this.eligibilityCriteria = eligibilityCriteria; }

    public String getDocumentsRequired() { return documentsRequired; }
    public void setDocumentsRequired(String documentsRequired) { this.documentsRequired = documentsRequired; }

    public String getOfficialPortalUrl() { return officialPortalUrl; }
    public void setOfficialPortalUrl(String officialPortalUrl) { this.officialPortalUrl = officialPortalUrl; }
}
