package com.Image.controller;

import com.Image.dao.EHRResponse;
import com.Image.entity.EHR;
import com.Image.service.EHR_Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/ehr")
public class EHR_Controller {

    @Autowired
    private EHR_Service service;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> createEHr(@RequestPart("ehrdata") String ehrdata, @RequestPart("xray") MultipartFile xray) {
        try {
            ObjectMapper objMapper = new ObjectMapper();
            EHR ehr = objMapper.readValue(ehrdata, EHR.class);

            String response = service.save(ehr, xray);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error Creating Electronic Health Record");
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<EHRResponse>> getEHR(@PathVariable int patientId) {
        List<EHRResponse> responses = service.getEHR(patientId);
        return ResponseEntity.ok().body(responses);
    }

    @GetMapping("/xray/{ehrId}")
    public ResponseEntity<byte[]> getXray(@PathVariable int ehrId) {
        byte[] xray = service.getXray(ehrId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return ResponseEntity.ok()
                .headers(headers)
                .body(xray);
    }
}
