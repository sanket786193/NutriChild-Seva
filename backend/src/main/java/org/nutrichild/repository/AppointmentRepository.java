package org.nutrichild.repository;

import org.nutrichild.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByAppointmentDateOrderByTimeSlotAsc(LocalDate date);
    List<Appointment> findByChildIdOrderByAppointmentDateDesc(Long childId);
    List<Appointment> findAllByOrderByAppointmentDateAsc();
}
