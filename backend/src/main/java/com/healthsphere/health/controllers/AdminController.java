package com.healthsphere.health.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthsphere.health.entity.Admins;
import com.healthsphere.health.entity.AuthenticationResponse;
import com.healthsphere.health.service.AdminAuthenticationService;
import com.healthsphere.health.service.JwtUtilService;
import com.healthsphere.health.service.UserService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/health/admin")
public class AdminController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AdminAuthenticationService adminAuthService;
	
	@Autowired
	private JwtUtilService jwtUtilService;
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> registerAdmin(@RequestBody Admins admin){
		try {
			AuthenticationResponse response = adminAuthService.register(admin);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AuthenticationResponse("Error registering Admin"));
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> loginAdmin(@RequestBody Admins admin){
		try {
			AuthenticationResponse response = adminAuthService.authenticate(admin);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthenticationResponse("Incorrect username or password"));
		}
	}
	
	@GetMapping
	public ResponseEntity<Admins> getAdmin(@RequestHeader("Authorization") String token){
		String jwt = token.substring(7);
		String username = jwtUtilService.extractUsername(jwt);
		Admins admin = userService.getAdminByUserUserName(username);
		
		if(admin != null) {
			return ResponseEntity.ok(admin);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
