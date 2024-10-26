package com.healthsphere.health.entity;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Patients implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int patientid;

	@Column(nullable = false)
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String gender;

	@Column(nullable = false)
	private Date dateofbirth;

	@Column(nullable = false)
	private String mobileno;

	@Column(nullable = false)
	private String bloodgroup;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private String address;

	@Column(nullable = false)
	private String emergencycontact;

	private byte[] profilepic;

	public int getPatientid() {
		return patientid;
	}

	public void setPatientid(int patientid) {
		this.patientid = patientid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getDateofbirth() {
		return dateofbirth;
	}

	public void setDateofbirth(Date dateofbirth) {
		this.dateofbirth = dateofbirth;
	}

	public String getMobileno() {
		return mobileno;
	}

	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}

	public String getBloodgroup() {
		return bloodgroup;
	}

	public void setBloodgroup(String bloodgroup) {
		this.bloodgroup = bloodgroup;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmergencycontact() {
		return emergencycontact;
	}

	public void setEmergencycontact(String emergencycontact) {
		this.emergencycontact = emergencycontact;
	}

	public byte[] getProfilepic() {
		return profilepic;
	}

	public void setProfilepic(byte[] profilepic) {
		this.profilepic = profilepic;
	}

	@Override
	public String toString() {
		return "Patients [patientid=" + patientid + ", username=" + username + ", password=" + password + ", name="
				+ name + ", gender=" + gender + ", dateofbirth=" + dateofbirth + ", mobileno=" + mobileno
				+ ", bloodgroup=" + bloodgroup + ", email=" + email + ", address=" + address + ", emergencycontact="
				+ emergencycontact + ", profilepic=" + Arrays.toString(profilepic) + "]";
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

}
