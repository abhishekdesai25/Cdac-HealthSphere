package com.healthsphere.health.controllers;

import java.util.Collection;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
import com.healthsphere.health.entity.Doctors;
import com.healthsphere.health.service.DoctorAuthenticationService;
import com.healthsphere.health.service.JwtUtilService;
import com.healthsphere.health.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/health/doctor")
public class DoctorController {

	@Autowired
	private UserService userService;

	@Autowired
	private DoctorAuthenticationService doctorAuthService;

	@Autowired
	private JwtUtilService jwtUtilService;

	@PostMapping(value = "/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<AuthenticationResponse> registerDoctor(
			@RequestPart("doctor") String doc,
			@RequestPart("image") MultipartFile image) {
		try {
			ObjectMapper objMapper = new ObjectMapper();
			Doctors doctor = objMapper.readValue(doc, Doctors.class);
			AuthenticationResponse response = doctorAuthService.register(doctor, image);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new AuthenticationResponse("Error registering Patient"));
		}
	}

	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> loginDoctor(@RequestBody Doctors doctor) {
		try {
			AuthenticationResponse response = doctorAuthService.authenticate(doctor);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new AuthenticationResponse("Incorrect username or password"));
		}
	}

	@GetMapping
	public ResponseEntity<Doctors> getDoctor(@RequestHeader("Authorization") String token) {
		String jwt = token.substring(7);
		String username = jwtUtilService.extractUsername(jwt);
		Doctors doctor = userService.getDoctorByUserName(username);
		if (doctor != null) {
			return ResponseEntity.ok(doctor);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@GetMapping("/picture/{doctorid}")
	public ResponseEntity<byte[]> getProfilePic(@PathVariable int doctorid) {
		try {
			byte[] image = doctorAuthService.getProfilePic(doctorid);
			return ResponseEntity.ok()
					.contentType(MediaType.IMAGE_JPEG)
					.body(image);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@GetMapping("/list")
	public ResponseEntity<Collection<Map<String, Object>>> getAllDoctors() {
		try {
			return ResponseEntity.ok(doctorAuthService.getAllDoctors());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	@PatchMapping("/time/{doctorid}")
	public ResponseEntity<AuthenticationResponse> updateDoctorTime(@PathVariable int doctorid, @RequestBody Doctors doctor) {
		try {
			String response = doctorAuthService.updateDoctorTime(doctorid, doctor);
			return ResponseEntity.ok().body(new AuthenticationResponse(response));
		} catch(Exception e) {
			return ResponseEntity.ok().body(new AuthenticationResponse("Error updating time."));
		}
	}
}
