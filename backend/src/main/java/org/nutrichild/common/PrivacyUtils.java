package org.nutrichild.common;

/**
 * Data Privacy & Protection Utilities
 * Aligned with DPDP Act 2023 & NDHM / ABDM Health Data Security Guidelines
 */
public class PrivacyUtils {

    /**
     * Masks a 10-digit mobile phone number: e.g., "9876543210" -> "98765*****"
     */
    public static String maskPhone(String phone) {
        if (phone == null || phone.isBlank()) return "—";
        String clean = phone.trim();
        if (clean.length() <= 5) return "*****";
        return clean.substring(0, 5) + "*****";
    }

    /**
     * Masks an ABHA or UHID number: e.g., "ABHA-9821-4451-2291" -> "ABHA-****-****-2291"
     */
    public static String maskAbha(String abha) {
        if (abha == null || abha.isBlank()) return "ABHA-****-****-4412";
        String[] parts = abha.split("-");
        if (parts.length >= 4) {
            return parts[0] + "-****-****-" + parts[parts.length - 1];
        }
        if (abha.length() > 4) {
            return "****-****-" + abha.substring(abha.length() - 4);
        }
        return "****-****-****";
    }

    /**
     * Masks confidential parent names or addresses if viewing role is unprivileged.
     */
    public static String maskIdentity(String name) {
        if (name == null || name.isBlank()) return "Anonymous";
        String[] tokens = name.trim().split("\\s+");
        if (tokens.length > 1) {
            return tokens[0] + " " + tokens[1].charAt(0) + ".";
        }
        return tokens[0];
    }
}
