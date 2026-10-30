package org.nutrichild.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class LoginRequestDto {

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be a valid 10-digit mobile number")
    private String phone;

    @NotBlank(message = "Password or PIN is required")
    @Size(min = 4, max = 100, message = "Password must be at least 4 characters")
    private String password;

    public LoginRequestDto() {}

    public LoginRequestDto(String phone, String password) {
        this.phone = phone;
        this.password = password;
    }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
