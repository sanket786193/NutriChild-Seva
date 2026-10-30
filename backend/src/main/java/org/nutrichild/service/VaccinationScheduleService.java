package org.nutrichild.service;

import org.nutrichild.model.Child;
import org.nutrichild.model.VaccinationRecord;
import org.nutrichild.repository.VaccinationRecordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class VaccinationScheduleService {

    private final VaccinationRecordRepository vaccinationRepo;

    public VaccinationScheduleService(VaccinationRecordRepository vaccinationRepo) {
        this.vaccinationRepo = vaccinationRepo;
    }

    /**
     * Initializes the full National UIP (Universal Immunization Programme) schedule for a child.
     */
    public List<VaccinationRecord> generateUipSchedule(Child child) {
        LocalDate dob = child.getDateOfBirth();
        List<VaccinationRecord> schedule = new ArrayList<>();

        // At Birth (0 weeks)
        schedule.add(new VaccinationRecord(child.getId(), "BCG", "BCG (Tuberculosis)", 0, dob, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "OPV_0", "OPV-0 (Oral Polio)", 0, dob, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "HEP_B_0", "Hepatitis B (Birth Dose)", 0, dob, "PENDING"));

        // 6 Weeks
        LocalDate sixWeeks = dob.plusWeeks(6);
        schedule.add(new VaccinationRecord(child.getId(), "OPV_1", "OPV-1 (Oral Polio)", 6, sixWeeks, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "PENTA_1", "Pentavalent-1 (DPT+HepB+Hib)", 6, sixWeeks, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "ROTA_1", "Rotavirus-1 (Diarrhea)", 6, sixWeeks, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "FIPV_1", "Fractional IPV-1 (Injectable Polio)", 6, sixWeeks, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "PCV_1", "PCV-1 (Pneumococcal)", 6, sixWeeks, "PENDING"));

        // 10 Weeks
        LocalDate tenWeeks = dob.plusWeeks(10);
        schedule.add(new VaccinationRecord(child.getId(), "OPV_2", "OPV-2 (Oral Polio)", 10, tenWeeks, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "PENTA_2", "Pentavalent-2", 10, tenWeeks, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "ROTA_2", "Rotavirus-2", 10, tenWeeks, "PENDING"));

        // 14 Weeks
        LocalDate fourteenWeeks = dob.plusWeeks(14);
        schedule.add(new VaccinationRecord(child.getId(), "OPV_3", "OPV-3 (Oral Polio)", 14, fourteenWeeks, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "PENTA_3", "Pentavalent-3", 14, fourteenWeeks, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "ROTA_3", "Rotavirus-3", 14, fourteenWeeks, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "FIPV_2", "Fractional IPV-2", 14, fourteenWeeks, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "PCV_2", "PCV-2", 14, fourteenWeeks, "PENDING"));

        // 9 to 12 Months
        LocalDate nineMonths = dob.plusMonths(9);
        schedule.add(new VaccinationRecord(child.getId(), "MR_1", "Measles & Rubella-1 (MR-1)", 39, nineMonths, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "JE_1", "Japanese Encephalitis-1", 39, nineMonths, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "PCV_BOOSTER", "PCV Booster", 39, nineMonths, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "VIT_A_1", "Vitamin A (1st Dose - 1 Lakh IU)", 39, nineMonths, "PENDING"));

        // 16 to 24 Months
        LocalDate sixteenMonths = dob.plusMonths(16);
        schedule.add(new VaccinationRecord(child.getId(), "MR_2", "Measles & Rubella-2 (MR-2)", 69, sixteenMonths, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "DPT_BOOSTER_1", "DPT Booster-1", 69, sixteenMonths, "PENDING"));
        schedule.add(new VaccinationRecord(child.getId(), "OPV_BOOSTER", "OPV Booster", 69, sixteenMonths, "PENDING"));

        // 5 to 6 Years
        LocalDate fiveYears = dob.plusYears(5);
        schedule.add(new VaccinationRecord(child.getId(), "DPT_BOOSTER_2", "DPT Booster-2", 260, fiveYears, "PENDING"));

        // Update overdue status if due date is in the past
        LocalDate today = LocalDate.now();
        for (VaccinationRecord v : schedule) {
            if ("PENDING".equals(v.getStatus()) && v.getDueDate().isBefore(today)) {
                v.setStatus("OVERDUE");
            }
        }

        return vaccinationRepo.saveAll(schedule);
    }
}
