package com.healthsphere.health.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthsphere.health.entity.AuthenticationResponse;
import com.healthsphere.health.entity.Patients;
import com.healthsphere.health.service.PatientAuthenticationService;
import com.healthsphere.health.service.JwtUtilService;
import com.healthsphere.health.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/health/patient")
public class PatientController {

	@Autowired
	private UserService userService;

	@Autowired
	private PatientAuthenticationService patientAuthService;

	@Autowired
	private JwtUtilService jwtUtilService;

	@PostMapping(value = "/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<AuthenticationResponse> registerPatient(
			@RequestPart("patient") String pat,
			@RequestPart("image") MultipartFile image) {
		try {
			ObjectMapper objMapper = new ObjectMapper();
			Patients patient = objMapper.readValue(pat, Patients.class);
			AuthenticationResponse response = patientAuthService.register(patient, image);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new AuthenticationResponse("Error registering Patient"));
		}
	}

	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> loginPatient(@RequestBody Patients patient) {
		try {
			AuthenticationResponse response = patientAuthService.authenticate(patient);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new AuthenticationResponse("Incorrect username or password"));
		}
	}

	@GetMapping
	public ResponseEntity<Patients> getPatient(@RequestHeader("Authorization") String token) {

		String jwt = token.substring(7);
		String username = jwtUtilService.extractUsername(jwt);
		Patients patient = userService.getPatientByUserName(username);

		if (patient != null) {
			return ResponseEntity.ok(patient);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@GetMapping("/picture/{patientid}")
	public ResponseEntity<byte[]> getProfilePic(@PathVariable int patientid) {
		try {
			byte[] image = patientAuthService.getProfilePic(patientid);
			return ResponseEntity.ok()
					.contentType(MediaType.IMAGE_JPEG)
					.body(image);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
