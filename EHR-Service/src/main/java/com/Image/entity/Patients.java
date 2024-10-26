package com.Image.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;
@Entity
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
@Table(name = "patients")
public class Patients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patientid")
    private int patientid;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "dateofbirth")
    private Date dateofbirth;
    @Column(name = "mobileno")
    private String mobileno;
    @Column(name = "address")
    private String address;
    @Column(name = "emergencycontact")
    private String emergencycontact;
    @Column(name = "bloodgroup")
    private String bloodgroup;
    @Column(name = "profilepic")
    private byte[] profilepic;
    @Column(name = "gender")
    private String gender;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<EHR> electronicHealthRecord;

    @ManyToMany
    @JoinTable(
            name = "patient_doctor",
            joinColumns = @JoinColumn(name = "patientid"),
            inverseJoinColumns = @JoinColumn(name = "doctorid")
    )
    private Set<Doctors> doctors;

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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getBloodgroup() {
		return bloodgroup;
	}

	public void setBloodgroup(String bloodgroup) {
		this.bloodgroup = bloodgroup;
	}

	public byte[] getProfilepic() {
		return profilepic;
	}

	public void setProfilepic(byte[] profilepic) {
		this.profilepic = profilepic;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Set<EHR> getElectronicHealthRecord() {
		return electronicHealthRecord;
	}

	public void setElectronicHealthRecord(Set<EHR> electronicHealthRecord) {
		this.electronicHealthRecord = electronicHealthRecord;
	}

	public Set<Doctors> getDoctors() {
		return doctors;
	}

	public void setDoctors(Set<Doctors> doctors) {
		this.doctors = doctors;
	};
}
