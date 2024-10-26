package com.healthsphere.health.entity;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.Collection;

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
public class Doctors implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int doctorid;
	
	@Column
	private String username;
	
	@Column
	private String password;
	
	@Column
	private String firstname;
	
	@Column
	private String lastname;
	
	@Column
	private String specialization;
	
	@Column
	private String mobileno;
	
	@Column
	private String yearsofexperience;
	
	@Column
	private String bio;
	

	private byte[] profilepic;
	
	private LocalTime starttime;
	
	private LocalTime endtime;
	

	public int getDoctorid() {
		return doctorid;
	}


	public void setDoctorid(int doctorid) {
		this.doctorid = doctorid;
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


	public String getFirstname() {
		return firstname;
	}


	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}


	public String getLastname() {
		return lastname;
	}


	public void setLastname(String lastname) {
		this.lastname = lastname;
	}


	public String getSpecialization() {
		return specialization;
	}


	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}


	public String getMobileno() {
		return mobileno;
	}

	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}


	public String getYearsofexperience() {
		return yearsofexperience;
	}


	public void setYearsofexperience(String yearsofexperience) {
		this.yearsofexperience = yearsofexperience;
	}


	public String getBio() {
		return bio;
	}


	public void setBio(String bio) {
		this.bio = bio;
	}


	public byte[] getProfilepic() {
		return profilepic;
	}


	public void setProfilepic(byte[] profilepic) {
		this.profilepic = profilepic;
	}


	public LocalTime getStarttime() {
		return starttime;
	}


	public void setStarttime(LocalTime starttime) {
		this.starttime = starttime;
	}


	public LocalTime getEndtime() {
		return endtime;
	}


	public void setEndtime(LocalTime endtime) {
		this.endtime = endtime;
	}

	@Override
	public String toString() {
		return "Doctors [doctorid=" + doctorid + ", username=" + username + ", password=" + password + ", firstname="
				+ firstname + ", lastname=" + lastname + ", specialization=" + specialization + ", mobileno=" + mobileno
				+ ", yearsofexperience=" + yearsofexperience + ", bio=" + bio + ", profilepic="
				+ Arrays.toString(profilepic) + ", starttime=" + starttime + ", endtime=" + endtime + "]";
	}


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

}
