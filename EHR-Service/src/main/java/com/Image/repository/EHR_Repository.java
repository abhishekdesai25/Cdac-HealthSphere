package com.Image.repository;

import com.Image.entity.EHR;
import com.Image.entity.Patients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EHR_Repository extends JpaRepository<EHR, Integer> {
    List<EHR> findByPatient_patientid(int patientid);
}
