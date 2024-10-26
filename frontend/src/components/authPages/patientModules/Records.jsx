import React, { useEffect, useState } from 'react';
import '../../../styles/Records.css';
import test from '../../../images/about.jpg';
import axios from 'axios';

export default function Records({patientid}) {
  
  const [ehrData, setEhrData] = useState([]);
  const [ehrImage, setEhrImage] = useState({});
  const baseUrl = 'http://localhost:9090/ehr';

  function formatDateTime(isoString) {
    if (!isoString) {
        return "Invalid date";
    }
    const date = new Date(isoString);
        if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    const options = {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',  
    };
    return date.toLocaleDateString(undefined, options);
}

useEffect(() => {
  const fetchEhrRecords = async () => {
    try {
      const ehrResponse = await axios.get(baseUrl + `/patient/${patientid}`);
      setEhrData(ehrResponse.data);

      if (ehrResponse.data.length > 0) {
        const imagePromises = ehrResponse.data.map(async (record) => {
          try {
            const ehrImageResponse = await axios.get(`${baseUrl}/xray/${record.ehrId}`, {
              responseType: 'arraybuffer',
            });
            if (ehrImageResponse.data.byteLength > 0) {
              const base64Image = btoa(
                new Uint8Array(ehrImageResponse.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              );
              return { ehrId: record.ehrId, image: `data:image/jpeg;base64,${base64Image}` };
            } else {
              return { ehrId: record.ehrId, image: null };
            }
          } catch (error) {
            console.error(`Failed to fetch X-ray image for EHR ID: ${record.ehrId}`, error);
            return { ehrId: record.ehrId, image: null };
          }
        });

        const images = await Promise.all(imagePromises);
        const imagesMap = images.reduce((acc, { ehrId, image }) => {
          acc[ehrId] = image;
          return acc;
        }, {});

        setEhrImage(imagesMap);
      }
    } catch (error) {
      console.error("Error fetching EHR records:", error);
    }
  };

  if (patientid) {
    fetchEhrRecords();
  }
}, [patientid]);

  return (
    <div className='record-container'>
      <div className='record-heading'>
        <h1 className='head'>EHR DATA</h1>
      </div>
      <hr className='title-line' />
      {ehrData.map((record) => (
        <div key={record.id} className='record-data'>
          <div className='record-data-1'>
            <p><strong>EHR id:</strong> {record.ehrId}</p>
            <p><strong>Dr Name:</strong> {record.drName}</p>
            <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
            <p><strong>Prescription:</strong> {record.prescriptions}</p>
            <p><strong>Treatment:</strong> {record.treatment}</p>
            <p><strong>Visit Date:</strong> {formatDateTime(record.visitDate)}</p>
            <p><strong>Notes:</strong> {record.notes}</p>
          </div>
          <div className='record-data-2'>
          <img 
              src={ehrImage[record.ehrId] || test} 
              alt={`X-ray for record ${record.ehrId}`} 
            />
          </div>
        </div>
      ))}
      <hr />
    </div>
  );
}
