package com.healthsphere.health.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.healthsphere.health.entity.AuthenticationResponse;
import com.healthsphere.health.entity.Patients;
import com.healthsphere.health.repository.PatientRepository;

@Service
public class PatientAuthenticationService {

	@Autowired
	private PatientRepository patientRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtUtilService jwtUtilService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	public AuthenticationResponse register(Patients request, MultipartFile profilepic) throws IOException {
		Patients patient = new Patients();
		patient.setUsername(request.getUsername());
		patient.setPassword(passwordEncoder.encode(request.getPassword()));
		patient.setName(request.getName());
		patient.setGender(request.getGender());
		patient.setDateofbirth(request.getDateofbirth());
		patient.setMobileno(request.getMobileno());
		patient.setBloodgroup(request.getBloodgroup());
		patient.setEmail(request.getEmail());
		patient.setAddress(request.getAddress());
		patient.setEmergencycontact(request.getEmergencycontact());
		
		if(profilepic != null && !profilepic.isEmpty()) {
			patient.setProfilepic(profilepic.getBytes());
		}
		
		patient = patientRepo.save(patient);
		
		String token = jwtUtilService.generateToken(patient, patient.getPatientid());
		return new AuthenticationResponse(token);
	}
	
	public AuthenticationResponse authenticate(Patients request) {

		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		Patients patient = patientRepo.findByUsername(request.getUsername());
		String token = jwtUtilService.generateToken(patient, patient.getPatientid());
		
		return new AuthenticationResponse(token);
	}
	
	public byte[] getProfilePic(int patientid) {
		return patientRepo.findById(patientid)
				.orElseThrow(() -> new RuntimeException("Patient not found")).getProfilepic();
	}
	
}
