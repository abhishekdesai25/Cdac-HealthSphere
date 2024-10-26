package com.Image.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Set;

@Entity
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
@Table(name="doctors")
public class Doctors {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctorid")
    private int doctorid;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "firstname")
    private String firstname;
    @Column(name = "lastname")
    private String lastname;
    @Column(name = "specialization")
    private String specialization;
    @Column(name = "yearsofexperience")
    private String yearsofexperience;
    @Column(name = "mobileno")
    private String mobileno;
    @Column(name = "profilepic")
    private byte[] profilepic;
    @Column(name = "bio")
    private String bio;
    @Column(name = "starttime")
    private LocalTime starttime;
    @Column(name = "endtime")
    private LocalTime endtime;

    @ManyToMany(mappedBy = "doctors", cascade = CascadeType.ALL)
    private Set<Patients> patients;

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

	public String getYearsofexperience() {
		return yearsofexperience;
	}

	public void setYearsofexperience(String yearsofexperience) {
		this.yearsofexperience = yearsofexperience;
	}

	public String getMobileno() {
		return mobileno;
	}

	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}

	public byte[] getProfilepic() {
		return profilepic;
	}

	public void setProfilepic(byte[] profilepic) {
		this.profilepic = profilepic;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
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

	public Set<Patients> getPatients() {
		return patients;
	}

	public void setPatients(Set<Patients> patients) {
		this.patients = patients;
	}
}
