package org.nutrichild.model;

import jakarta.persistence.*;

@Entity
@Table(name = "health_centers")
public class HealthCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type; // SUB_CENTRE, PHC (Primary Health Centre), CHC (Community Health Centre), NRC (Nutrition Rehab Centre), DISTRICT_HOSPITAL

    private String village;
    private String block;
    private String district;
    private String state;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    private String emergencyPhone;
    private String ambulancePhone = "108";
    private Boolean hasNRC = false;
    private Boolean doctorAvailable = true;
    private String operatingHours;

    public HealthCenter() {}

    public HealthCenter(String name, String type, String village, String block, String district, String state, Double latitude, Double longitude, String emergencyPhone, Boolean hasNRC) {
        this.name = name;
        this.type = type;
        this.village = village;
        this.block = block;
        this.district = district;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
        this.emergencyPhone = emergencyPhone;
        this.hasNRC = hasNRC;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getBlock() { return block; }
    public void setBlock(String block) { this.block = block; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getEmergencyPhone() { return emergencyPhone; }
    public void setEmergencyPhone(String emergencyPhone) { this.emergencyPhone = emergencyPhone; }

    public String getAmbulancePhone() { return ambulancePhone; }
    public void setAmbulancePhone(String ambulancePhone) { this.ambulancePhone = ambulancePhone; }

    public Boolean getHasNRC() { return hasNRC; }
    public void setHasNRC(Boolean hasNRC) { this.hasNRC = hasNRC; }

    public Boolean getDoctorAvailable() { return doctorAvailable; }
    public void setDoctorAvailable(Boolean doctorAvailable) { this.doctorAvailable = doctorAvailable; }

    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }
}
