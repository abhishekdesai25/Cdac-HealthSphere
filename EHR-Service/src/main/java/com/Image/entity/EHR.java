package com.Image.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
@Table(name = "ehr")
public class EHR {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ehrid")
    private int ehrid;
    @Column(name = "visitdate")
    private Date visitdate;
    @Column(name = "diagnosis")
    private String diagnosis;
    @Column(name = "treatment")
    private String treatment;
    @Column(name = "prescriptions")
    private String prescriptions;
    @Column(name = "xrayimage")
    private byte[] xrayimage;
    @Column(name = "notes")
    private String notes;

    @ManyToOne
    @JoinColumn(name = "patientid")
    private Patients patient;

    @ManyToOne
    @JoinColumn(name = "doctorid")
    private Doctors doctor;

	public int getEhrid() {
		return ehrid;
	}

	public void setEhrid(int ehrid) {
		this.ehrid = ehrid;
	}

	public Date getVisitdate() {
		return visitdate;
	}

	public void setVisitdate(Date visitdate) {
		this.visitdate = visitdate;
	}

	public String getDiagnosis() {
		return diagnosis;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public String getTreatment() {
		return treatment;
	}

	public void setTreatment(String treatment) {
		this.treatment = treatment;
	}

	public String getPrescriptions() {
		return prescriptions;
	}

	public void setPrescriptions(String prescriptions) {
		this.prescriptions = prescriptions;
	}

	public byte[] getXrayimage() {
		return xrayimage;
	}

	public void setXrayimage(byte[] xrayimage) {
		this.xrayimage = xrayimage;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Patients getPatient() {
		return patient;
	}

	public void setPatient(Patients patient) {
		this.patient = patient;
	}

	public Doctors getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctors doctor) {
		this.doctor = doctor;
	}
}
