package org.nutrichild.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    private String languageCode = "hi"; // Default: Hindi ("hi", "mr", "bn", "te", "ta", "en")

    private String village;
    private String district;
    private String anganwadiCenterId;

    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}

    public User(String phone, String password, String fullName, UserRole role, String languageCode, String village, String district) {
        this.phone = phone;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
        this.languageCode = languageCode;
        this.village = village;
        this.district = district;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public String getLanguageCode() { return languageCode; }
    public void setLanguageCode(String languageCode) { this.languageCode = languageCode; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getAnganwadiCenterId() { return anganwadiCenterId; }
    public void setAnganwadiCenterId(String anganwadiCenterId) { this.anganwadiCenterId = anganwadiCenterId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
