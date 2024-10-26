package com.healthsphere.health.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthsphere.health.entity.Admins;
import com.healthsphere.health.entity.Doctors;
import com.healthsphere.health.entity.Patients;
import com.healthsphere.health.repository.AdminRepository;
import com.healthsphere.health.repository.DoctorRepository;
import com.healthsphere.health.repository.PatientRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private AdminRepository adminRepo;

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Doctors doctor = doctorRepo.findByUsername(username);
        if (doctor != null) {
            return doctor;
        }
        Patients patient = patientRepo.findByUsername(username);
        if (patient != null) {
            return patient;
        }

        Admins admin = adminRepo.findByUsername(username);
        if (admin != null) {
            return admin;
        }

        throw new UsernameNotFoundException("User not found");
    }

    @Transactional(readOnly = true)
    public Doctors getDoctorByUserName(String username) {
        return doctorRepo.findByUsername(username);
    }

    @Transactional(readOnly = true)
    public Patients getPatientByUserName(String username) {
        return patientRepo.findByUsername(username);
    }

    @Transactional(readOnly = true)
    public Admins getAdminByUserUserName(String username) {
        return adminRepo.findByUsername(username);
    }
}
