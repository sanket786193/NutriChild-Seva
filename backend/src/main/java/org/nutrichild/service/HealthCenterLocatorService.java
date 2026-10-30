package org.nutrichild.service;

import org.nutrichild.model.HealthCenter;
import org.nutrichild.repository.HealthCenterRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HealthCenterLocatorService {

    private final HealthCenterRepository healthCenterRepo;
    private static final double EARTH_RADIUS_KM = 6371.0;

    public HealthCenterLocatorService(HealthCenterRepository healthCenterRepo) {
        this.healthCenterRepo = healthCenterRepo;
    }

    public List<Map<String, Object>> findNearestCenters(Double userLat, Double userLng, int limit) {
        List<HealthCenter> allCenters = healthCenterRepo.findAll();
        List<Map<String, Object>> results = new ArrayList<>();

        for (HealthCenter center : allCenters) {
            double distance = calculateDistanceKm(userLat, userLng, center.getLatitude(), center.getLongitude());
            Map<String, Object> item = new HashMap<>();
            item.put("id", center.getId());
            item.put("name", center.getName());
            item.put("type", center.getType());
            item.put("village", center.getVillage());
            item.put("block", center.getBlock());
            item.put("district", center.getDistrict());
            item.put("state", center.getState());
            item.put("latitude", center.getLatitude());
            item.put("longitude", center.getLongitude());
            item.put("emergencyPhone", center.getEmergencyPhone());
            item.put("ambulancePhone", center.getAmbulancePhone());
            item.put("hasNRC", center.getHasNRC());
            item.put("doctorAvailable", center.getDoctorAvailable());
            item.put("distanceKm", Math.round(distance * 10.0) / 10.0);
            results.add(item);
        }

        // Sort by distance ascending
        results.sort(Comparator.comparingDouble(o -> (Double) o.get("distanceKm")));

        return results.subList(0, Math.min(limit, results.size()));
    }

    private double calculateDistanceKm(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double rLat1 = Math.toRadians(lat1);
        double rLat2 = Math.toRadians(lat2);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(rLat1) * Math.cos(rLat2) *
                   Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }
}
