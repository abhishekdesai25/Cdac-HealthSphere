package com.Image.service;

import com.Image.dao.EHRResponse;
import com.Image.entity.Doctors;
import com.Image.entity.EHR;
import com.Image.entity.Patients;
import com.Image.repository.DoctorsRepository;
import com.Image.repository.EHR_Repository;
import com.Image.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EHR_Service {

    @Autowired
    private DoctorsRepository doctorsRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private EHR_Repository ehr_repository;


    public String save(EHR request, MultipartFile xray) throws IOException {
        EHR ehr = new EHR();

        ehr.setVisitdate(request.getVisitdate());
        ehr.setDiagnosis(request.getDiagnosis());
        ehr.setTreatment(request.getTreatment());
        ehr.setPrescriptions(request.getPrescriptions());
        if (xray != null && !xray.isEmpty()) {
            ehr.setXrayimage(xray.getBytes());
        }
        ehr.setNotes(request.getNotes());
        System.out.println("Request Id: " + request.getPatient().getPatientid());
        Doctors doctor = doctorsRepository.findById(request.getDoctor().getDoctorid()).orElseThrow(() -> new RuntimeException("not found"));
        Patients patient = patientRepository.findById(request.getPatient().getPatientid()).orElseThrow(() -> new RuntimeException("not found"));

        ehr.setDoctor(doctor);
        ehr.setPatient(patient);

        ehr_repository.save(ehr);
        return "Data persisted successfully";
    }


    public List<EHRResponse> getEHR(int patientId) {

        List<EHR> list = ehr_repository.findByPatient_patientid(patientId);

        List<EHRResponse> responseList = list.stream().map(ehr -> {
            EHRResponse response = new EHRResponse();
            response.setEhrId(ehr.getEhrid());
            response.setDoctorId(ehr.getDoctor().getDoctorid());

            Doctors doctor = doctorsRepository.findById(ehr.getDoctor().getDoctorid()).orElseThrow(() -> new RuntimeException("Doctor With id " + ehr.getDoctor().getDoctorid() + " Not Found"));
            String drName = doctor.getFirstname() + " " + doctor.getLastname();

            response.setDrName(drName);
            response.setSpecialization(doctor.getSpecialization());
            response.setPatientId(ehr.getPatient().getPatientid());
            response.setVisitDate(ehr.getVisitdate());
            response.setDiagnosis(ehr.getDiagnosis());
            response.setTreatment(ehr.getTreatment());
            response.setPrescriptions(ehr.getPrescriptions());
            response.setNotes(ehr.getNotes());
            return response;
        }).collect(Collectors.toList());
        return responseList;
    }

    public byte[] getXray(int ehrId) {
        EHR ehr = ehr_repository.findById(ehrId).orElseThrow(()->new RuntimeException("XRAY Not Found"));
        return ehr.getXrayimage();
    }
}
