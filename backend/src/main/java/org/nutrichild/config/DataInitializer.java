package org.nutrichild.config;

import org.nutrichild.model.*;
import org.nutrichild.repository.*;
import org.nutrichild.service.GrowthAssessmentService;
import org.nutrichild.service.VaccinationScheduleService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepo;
    private final ChildRepository childRepo;
    private final GrowthRecordRepository growthRepo;
    private final HealthCenterRepository healthCenterRepo;
    private final GovtSchemeRepository schemeRepo;
    private final PrescriptionRepository prescriptionRepo;
    private final AppointmentRepository appointmentRepo;
    private final PasswordEncoder passwordEncoder;
    private final GrowthAssessmentService growthAssessmentService;
    private final VaccinationScheduleService vaccinationScheduleService;
    private final org.nutrichild.audit.AuditLogRepository auditRepo;
    private final org.nutrichild.notification.HealthAlertRepository alertRepo;

    public DataInitializer(UserRepository userRepo, ChildRepository childRepo,
                           GrowthRecordRepository growthRepo,
                           HealthCenterRepository healthCenterRepo,
                           GovtSchemeRepository schemeRepo,
                           PrescriptionRepository prescriptionRepo,
                           AppointmentRepository appointmentRepo,
                           PasswordEncoder passwordEncoder,
                           GrowthAssessmentService growthAssessmentService,
                           VaccinationScheduleService vaccinationScheduleService,
                           org.nutrichild.audit.AuditLogRepository auditRepo,
                           org.nutrichild.notification.HealthAlertRepository alertRepo) {
        this.userRepo = userRepo;
        this.childRepo = childRepo;
        this.growthRepo = growthRepo;
        this.healthCenterRepo = healthCenterRepo;
        this.schemeRepo = schemeRepo;
        this.prescriptionRepo = prescriptionRepo;
        this.appointmentRepo = appointmentRepo;
        this.passwordEncoder = passwordEncoder;
        this.growthAssessmentService = growthAssessmentService;
        this.vaccinationScheduleService = vaccinationScheduleService;
        this.auditRepo = auditRepo;
        this.alertRepo = alertRepo;
    }

    @Override
    public void run(String... args) {
        if (userRepo.count() > 0) {
            seedDoctorAppointmentsIfEmpty();
            return;
        }

        // 1. Seed Demo Users for All 6 Roles
        User parent = new User("9876543210", passwordEncoder.encode("1234"), "Sunita Devi (Mother)", UserRole.PARENT, "hi", "Kalyanpur", "Rayagada");
        User asha = new User("9876543211", passwordEncoder.encode("1234"), "Kamla Bai (ASHA Worker)", UserRole.ASHA, "hi", "Kalyanpur", "Rayagada");
        User anganwadi = new User("9876543212", passwordEncoder.encode("1234"), "Meera Sharma (AWW)", UserRole.ANGANWADI, "hi", "Kalyanpur", "Rayagada");
        User doctor = new User("9876543213", passwordEncoder.encode("1234"), "Dr. Rajesh Patra (MO)", UserRole.DOCTOR, "en", "Rayagada Block", "Rayagada");
        User govtOfficer = new User("9876543214", passwordEncoder.encode("1234"), "Smt. Anuradha Das (CDPO)", UserRole.GOVT_OFFICER, "en", "District HQ", "Rayagada");
        User admin = new User("9876543215", passwordEncoder.encode("admin123"), "System Admin", UserRole.ADMIN, "en", "State HQ", "Bhubaneswar");

        userRepo.save(parent);
        userRepo.save(asha);
        userRepo.save(anganwadi);
        userRepo.save(doctor);
        userRepo.save(govtOfficer);
        userRepo.save(admin);

        // 2. Seed Realistic Rural Children
        // Child 1: Aarav (Healthy, 18 months)
        Child c1 = new Child();
        c1.setFullName("Aarav Kumar");
        c1.setDateOfBirth(LocalDate.now().minusMonths(18));
        c1.setGender("MALE");
        c1.setBirthWeightKg(3.1);
        c1.setBloodGroup("B+");
        c1.setParentName("Sunita Devi");
        c1.setParentPhone("9876543210");
        c1.setParentUserId(parent.getId());
        c1.setVillage("Kalyanpur");
        c1.setDistrict("Rayagada");
        c1.setAnganwadiCenter("Kalyanpur AWC-1");
        c1.setQrToken("NCQR-AARAV18");
        Child savedC1 = childRepo.save(c1);
        vaccinationScheduleService.generateUipSchedule(savedC1);

        GrowthRecord g1 = new GrowthRecord();
        g1.setChildId(savedC1.getId());
        g1.setWeightKg(11.2);
        g1.setHeightCm(82.5);
        g1.setMuacCm(14.2);
        g1.setHemoglobinGdl(11.6);
        g1.setRecordedByRole("ASHA");
        g1.setRecordedByName("Kamla Bai");
        growthAssessmentService.assessGrowth(savedC1, g1);
        growthRepo.save(g1);

        // Child 2: Priyanka (SAM - High Risk Red, 14 months)
        Child c2 = new Child();
        c2.setFullName("Priyanka Soren");
        c2.setDateOfBirth(LocalDate.now().minusMonths(14));
        c2.setGender("FEMALE");
        c2.setBirthWeightKg(2.3);
        c2.setBloodGroup("O+");
        c2.setParentName("Laxmi Soren");
        c2.setParentPhone("9876500001");
        c2.setVillage("Kalyanpur");
        c2.setDistrict("Rayagada");
        c2.setAnganwadiCenter("Kalyanpur AWC-1");
        c2.setQrToken("NCQR-PRIYA14");
        Child savedC2 = childRepo.save(c2);
        vaccinationScheduleService.generateUipSchedule(savedC2);

        GrowthRecord g2 = new GrowthRecord();
        g2.setChildId(savedC2.getId());
        g2.setWeightKg(6.4);
        g2.setHeightCm(69.0);
        g2.setMuacCm(11.1); // < 11.5 cm => SAM (Severe Acute Malnutrition)
        g2.setHemoglobinGdl(6.8); // < 7.0 => Severe Anemia
        g2.setRecordedByRole("ANGANWADI");
        g2.setRecordedByName("Meera Sharma");
        growthAssessmentService.assessGrowth(savedC2, g2);
        growthRepo.save(g2);

        // Child 3: Manav (MAM - Moderate Risk Orange, 24 months)
        Child c3 = new Child();
        c3.setFullName("Manav Majhi");
        c3.setDateOfBirth(LocalDate.now().minusMonths(24));
        c3.setGender("MALE");
        c3.setBirthWeightKg(2.8);
        c3.setBloodGroup("A+");
        c3.setParentName("Budhu Majhi");
        c3.setParentPhone("9876500002");
        c3.setVillage("Gunduriguda");
        c3.setDistrict("Rayagada");
        c3.setAnganwadiCenter("Gunduriguda AWC");
        c3.setQrToken("NCQR-MANAV24");
        Child savedC3 = childRepo.save(c3);
        vaccinationScheduleService.generateUipSchedule(savedC3);

        GrowthRecord g3 = new GrowthRecord();
        g3.setChildId(savedC3.getId());
        g3.setWeightKg(9.2);
        g3.setHeightCm(81.0);
        g3.setMuacCm(12.1); // 11.5 - 12.4 cm => MAM
        g3.setHemoglobinGdl(9.4);
        g3.setRecordedByRole("ASHA");
        g3.setRecordedByName("Kamla Bai");
        growthAssessmentService.assessGrowth(savedC3, g3);
        growthRepo.save(g3);

        // 3. Seed Health Centers with GPS and NRC Flags
        healthCenterRepo.save(new HealthCenter(
            "Kalyanpur Sub-Health Centre", "SUB_CENTRE", "Kalyanpur", "Rayagada", "Rayagada", "Odisha",
            19.1685, 83.4150, "06856-222101", false
        ));
        healthCenterRepo.save(new HealthCenter(
            "Singapur Primary Health Centre (PHC)", "PHC", "Singapur", "Rayagada", "Rayagada", "Odisha",
            19.1820, 83.4420, "06856-222340", false
        ));
        healthCenterRepo.save(new HealthCenter(
            "Rayagada Community Health Centre (CHC)", "CHC", "Rayagada Town", "Rayagada", "Rayagada", "Odisha",
            19.1710, 83.4180, "06856-222888", true // NRC available here!
        ));
        healthCenterRepo.save(new HealthCenter(
            "District Headquarters Hospital & NRC Rayagada", "NRC", "Rayagada", "Rayagada", "Rayagada", "Odisha",
            19.1650, 83.4110, "06856-222999", true
        ));

        // 4. Seed Government Schemes
        schemeRepo.save(new GovtScheme(
            "POSHAN_2_0", "POSHAN Abhiyaan 2.0 (National Nutrition Mission)",
            "Children 0-6 years",
            "Intensive nutrition support, growth monitoring, fortified rations, and community VHSND convergence.",
            "Free Fortified Ration", "Hot Cooked Meals & Take-Home Rations (THR)",
            "All children enrolled in Anganwadi centers in rural and tribal districts.",
            "Aadhaar / Mother's MCP Card"
        ));
        schemeRepo.save(new GovtScheme(
            "ICDS_THR", "Take-Home Ration (THR) Supplementary Nutrition",
            "Children 6-36 months",
            "Micro-nutrient fortified energy dense blended food (Halwa / Khichdi mix) distributed bi-weekly.",
            "In-kind ration", "125-150 kcal/day extra calorie booster",
            "Children aged 6 months to 3 years registered at village Anganwadi.",
            "Child MCP Card"
        ));
        schemeRepo.save(new GovtScheme(
            "AMB_IFA", "Anemia Mukt Bharat - IFA Syrup",
            "Children 6-59 months",
            "Weekly administration of 1 ml Iron-Folic Acid syrup (containing 20mg elemental iron and 100mcg folic acid).",
            "Free Medication", "Iron-Folic Acid with dropper bottle",
            "All rural children aged 6 to 59 months.",
            "ASHA Growth Card"
        ));
        schemeRepo.save(new GovtScheme(
            "NRC_SAM_SUPPORT", "Nutrition Rehabilitation Centre (NRC) Inpatient Support",
            "SAM Children with Medical Complications",
            "14-day inpatient medical and therapeutic feeding care with specialized F-75 / F-100 therapeutic milk and RUTF.",
            "Wage loss compensation of Rs. 150/day to mother for 14 days",
            "Complete clinical nutritional rehabilitation",
            "MUAC < 11.5 cm or Bilateral Pitting Edema or Z-Score < -3SD.",
            "Medical Officer Referral Letter"
        ));
        schemeRepo.save(new GovtScheme(
            "PMMVY", "Pradhan Mantri Matru Vandana Yojana",
            "Pregnant and Lactating Mothers",
            "Direct cash benefit of Rs. 5,000 in installments directly transferred to bank account for maternal nutrition.",
            "Rs. 5,000 Direct Benefit Transfer (DBT)", "Cash for fresh fruits, eggs, and milk",
            "First live birth for pregnant women and lactating mothers.",
            "Aadhaar, MCP Card, Bank Passbook"
        ));

        seedDoctorAppointmentsIfEmpty();
    }

    private void seedDoctorAppointmentsIfEmpty() {
        if (appointmentRepo.count() == 0) {
            appointmentRepo.save(new Appointment(
                2L, "Priyanka Soren", "NC-697749", "Laxmi Soren", "9876500001", "Kalyanpur",
                LocalDate.now(), "10:30 AM", "IN_PERSON", "Severe Acute Malnutrition (SAM) NRC Inpatient Evaluation", "SCHEDULED"
            ));
            appointmentRepo.save(new Appointment(
                3L, "Manav Majhi", "NC-960267", "Budhu Majhi", "9876500002", "Gunduriguda",
                LocalDate.now(), "11:45 AM", "VIDEO", "Moderate Acute Malnutrition (MAM) Bi-Weekly Tele-Followup", "SCHEDULED"
            ));
            appointmentRepo.save(new Appointment(
                1L, "Aarav Kumar", "NC-704810", "Sunita Devi", "9876543210", "Kalyanpur",
                LocalDate.now().plusDays(1), "02:00 PM", "AUDIO", "Routine 18-Month UIP Booster & Growth Wellness Review", "SCHEDULED"
            ));
        }

        if (prescriptionRepo.count() == 0) {
            Prescription p1 = new Prescription();
            p1.setChildId(2L);
            p1.setChildName("Priyanka Soren");
            p1.setChildUhid("NC-697749");
            p1.setDoctorName("Dr. Rajesh Patra, MBBS, DCH (Pediatrics)");
            p1.setDoctorRegistrationNo("MCI-OD-2015-4421");
            p1.setHospitalClinic("Rayagada District Hospital & NRC");
            p1.setPrescriptionDate(LocalDate.now());
            p1.setPrimaryDiagnosis("Severe Acute Malnutrition (SAM) with Severe Microcytic Anemia");
            p1.setClinicalNotes("MUAC 11.1 cm, severe wasting, Hb 6.8 g/dL. Child referred to 14-day inpatient NRC therapeutic care.");
            p1.setMedicineListJson("[{\"name\":\"Therapeutic RUTF Paste\",\"dose\":\"1 packet\",\"timing\":\"Morning - Evening\",\"relation\":\"After Food\",\"duration\":\"14 Days\"},{\"name\":\"Syrup Iron-Folic Acid (IFA)\",\"dose\":\"1 ml weekly\",\"timing\":\"Morning\",\"relation\":\"After Food\",\"duration\":\"8 Weeks\"},{\"name\":\"Tablet Zinc Sulfate 20mg\",\"dose\":\"1 tab daily\",\"timing\":\"Morning\",\"relation\":\"After Food\",\"duration\":\"14 Days\"}]");
            p1.setDietaryAdvice("Exclusive RUTF therapeutic paste feeding under clinical protocol. Double Anganwadi Take-Home Ration (THR) on discharge.");
            p1.setFollowUpDate(LocalDate.now().plusDays(14));
            prescriptionRepo.save(p1);

            Prescription p2 = new Prescription();
            p2.setChildId(3L);
            p2.setChildName("Manav Majhi");
            p2.setChildUhid("NC-960267");
            p2.setDoctorName("Dr. Rajesh Patra, MBBS, DCH (Pediatrics)");
            p2.setDoctorRegistrationNo("MCI-OD-2015-4421");
            p2.setHospitalClinic("Rayagada CHC & Pediatric OPD");
            p2.setPrescriptionDate(LocalDate.now().minusDays(3));
            p2.setPrimaryDiagnosis("Moderate Acute Malnutrition (MAM) with Mild Helminthiasis");
            p2.setClinicalNotes("MUAC 12.1 cm, flat growth curve for 60 days. Prescribed prophylactic deworming and nutrient enrichment.");
            p2.setMedicineListJson("[{\"name\":\"Suspension Albendazole 400mg\",\"dose\":\"10 ml stat\",\"timing\":\"Night\",\"relation\":\"After Food\",\"duration\":\"1 Day\"},{\"name\":\"Syrup Multivitamin with Zinc\",\"dose\":\"2.5 ml daily\",\"timing\":\"Morning\",\"relation\":\"After Food\",\"duration\":\"30 Days\"},{\"name\":\"IFA Syrup 1ml\",\"dose\":\"1 ml weekly\",\"timing\":\"Morning\",\"relation\":\"After Food\",\"duration\":\"12 Weeks\"}]");
            p2.setDietaryAdvice("Add 1 boiled egg daily or sprouted moong. Enrich daily ragi porridge and khichdi with 1 teaspoon desi ghee or mustard oil.");
            p2.setFollowUpDate(LocalDate.now().plusDays(15));
            prescriptionRepo.save(p2);
        }

        if (alertRepo.count() == 0) {
            alertRepo.save(new org.nutrichild.notification.HealthAlert(
                2L, "NC-697749", "Priyanka Soren", "SAM_MALNUTRITION", "CRITICAL",
                "URGENT: Child Priyanka Soren diagnosed with Severe Acute Malnutrition (SAM). MUAC 11.1 cm, severe wasting, Hb 6.8 g/dL.",
                "Immediate referral to Nutrition Rehabilitation Centre (NRC) or Medical Officer review required."
            ));
            alertRepo.save(new org.nutrichild.notification.HealthAlert(
                3L, "NC-960267", "Manav Majhi", "OVERDUE_VACCINE", "WARNING",
                "Child Manav Majhi has overdue UIP vaccine: Measles-Rubella (MR-1) (Due since 14 days).",
                "Schedule home outreach or Anganwadi immunisation session."
            ));
            alertRepo.save(new org.nutrichild.notification.HealthAlert(
                1L, "NC-704810", "Aarav Kumar", "APPOINTMENT_REMINDER", "INFO",
                "Scheduled telemedicine follow-up tomorrow at 02:00 PM with Dr. Rajesh Patra.",
                "Remind parent Sunita Devi via SMS notification."
            ));
        }

        if (auditRepo.count() == 0) {
            auditRepo.save(new org.nutrichild.audit.AuditLog(
                "9876543213", "Dr. Rajesh Patra (MO)", UserRole.DOCTOR, "SIGN_PRESCRIPTION",
                "NC-697749", "Signed NRC inpatient referral and therapeutic prescription for Priyanka Soren", "192.168.1.104", "SUCCESS"
            ));
            auditRepo.save(new org.nutrichild.audit.AuditLog(
                "9876543211", "Kamla Bai (ASHA)", UserRole.ASHA, "RECORD_GROWTH",
                "NC-704810", "Recorded monthly vitals: W=11.2kg, H=82.5cm, MUAC=14.2cm. Risk: GREEN", "192.168.1.112", "SUCCESS"
            ));
            auditRepo.save(new org.nutrichild.audit.AuditLog(
                "9876543215", "System Admin", UserRole.ADMIN, "EXPORT_BACKUP",
                "DISTRICT-ALL", "Exported encrypted full-district snapshot for disaster recovery audit", "127.0.0.1", "SUCCESS"
            ));
        }
    }
}
