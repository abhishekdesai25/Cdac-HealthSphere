// import { useEffect, useState } from "react";
// import { Accordion } from "react-bootstrap";
// import axios from "axios";

// function AccordionUsage({ doctorid }) {
//   const [appointmentsData, setAppointmentsData] = useState([]);
//   const [formData, setFormData] = useState({
//     diagnosis: '',
//     prescriptions: '',
//     treatment: '',
//     visitdate: '2024-08-21',
//     notes: '',
//     patient: {
//       patientid: '',
//     },
//     doctor: {
//       doctorid: doctorid,
//     }
//   });
//   const [xray, setXray] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(''); // New state for success message

//   const handleSubmitEhr = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append('ehrdata', JSON.stringify(formData));
//     form.append('xray', xray);

//     try {
//       const response = await axios.post(
//         "http://localhost:9090/ehr",
//         form,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Response: ", response);
//       setSuccessMessage("EHR data submitted successfully!"); // Set success message on successful response
//     } catch (error) {
//       console.error('There was an error submitting the EHR data!', error);
//       setSuccessMessage("Failed to submit EHR data."); // Optionally set an error message
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setXray(e.target.files[0]);
//   };

//   const date1 = "2024-08-23";

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5241/api/Doctor/appointments/${doctorid}`,
//           {
//             params: {
//               date: date1,
//             },
//           }
//         );
//         console.log("response:", response);
//         setAppointmentsData(Array.isArray(response.data) ? response.data : []);
//         console.log("Fetched appointments:", response.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         setAppointmentsData([]);
//       }
//     };
//     fetchAppointments();
//   }, [doctorid, date1]);

//   useEffect(() => {
//     console.log("Appointments Data Updated:", appointmentsData);
//   }, [appointmentsData]);

//   const handleAccordionClick = (patientid) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       patient: {
//         patientid: patientid,
//       },
//     }));

//     console.log(appointmentsData);
//   };

//   return (
//     <>
//       {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Display success message */}
//       <Accordion>
//         {appointmentsData && appointmentsData.length > 0 ? (
//           appointmentsData.map((item, index) => (
//             <Accordion.Item eventKey={index.toString()} key={index}>
//               <Accordion.Header onClick={() => handleAccordionClick(item.patientid)}>
//                 {item.patient_name} - {item.patientid}
//               </Accordion.Header>
//               <Accordion.Body>
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Blood Group</th>
//                       <th>Gender</th>
//                       <th>Notes</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr key={item.patientid}>
//                       <td>{item.patient_name}</td>
//                       <td>{item.patient_BGroup}</td>
//                       <td>{item.patient_gender}</td>
//                       <td>{item.patient_notes}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <form onSubmit={handleSubmitEhr}>
//                   <div>
//                     <input 
//                       type="text" 
//                       placeholder="Diagnosis" 
//                       name="diagnosis" 
//                       value={formData.diagnosis} 
//                       onChange={handleChange} 
//                       required 
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       placeholder="Prescriptions" 
//                       name="prescriptions" 
//                       value={formData.prescriptions} 
//                       onChange={handleChange} 
//                       required 
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       placeholder="Treatment" 
//                       name="treatment" 
//                       value={formData.treatment} 
//                       onChange={handleChange} 
//                       required 
//                     />
//                   </div>
//                   <div>
//                     <label>Upload X-ray Image</label>
//                     <input 
//                       type="file" 
//                       onChange={handleFileChange} 
//                       accept="image/*" 
//                       required 
//                     />
//                   </div>
//                   <div className="button container">
//                     <button type="submit" className="appSubmit">Submit</button>
//                     <button type="delete" className="appDelete">Delete</button>
//                   </div>
//                 </form>
//               </Accordion.Body>
//             </Accordion.Item>
//           ))
//         ) : (
//           <div>No Appointments Found</div>
//         )}
//       </Accordion>
//     </>
//   );
// }

// export default AccordionUsage;


import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import axios from "axios";

function AccordionUsage({ doctorid }) {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [formData, setFormData] = useState({
    diagnosis: '',
    prescriptions: '',
    treatment: '',
    visitdate: '2024-08-21',
    notes: '',
    patient: {
      patientid: '',
    },
    doctor: {
      doctorid: doctorid,
    }
  });
  const [xray, setXray] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmitEhr = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('ehrdata', JSON.stringify(formData));
    form.append('xray', xray);

    try {
      const response = await axios.post(
        "http://localhost:9090/ehr",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response: ", response);
      setSuccessMessage("EHR data submitted successfully!");
    } catch (error) {
      console.error('There was an error submitting the EHR data!', error);
      setSuccessMessage("Failed to submit EHR data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:5241/api/Appointment/${appointmentId}`);
      setSuccessMessage("Appointment deleted successfully!");
      
      // Refetch appointments to refresh the list
      const response = await axios.get(
        `http://localhost:5241/api/Doctor/appointments/${doctorid}`,
        {
          params: {
            date: date1,
          },
        }
      );
      setAppointmentsData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('There was an error deleting the appointment!', error);
      setSuccessMessage("Failed to delete appointment.");
    }
  };
  

  const handleFileChange = (e) => {
    setXray(e.target.files[0]);
  };

  const date1 = "2024-08-23";

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5241/api/Doctor/appointments/${doctorid}`,
          {
            params: {
              date: date1,
            },
          }
        );
        console.log("response:", response);
        setAppointmentsData(Array.isArray(response.data) ? response.data : []);
        console.log("Fetched appointments:", response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointmentsData([]);
      }
    };
    fetchAppointments();
  }, [doctorid, date1]);

  useEffect(() => {
    console.log("Appointments Data Updated:", appointmentsData);
  }, [appointmentsData]);

  const handleAccordionClick = (patientid) => {
    setFormData((prevState) => ({
      ...prevState,
      patient: {
        patientid: patientid,
      },
    }));
  };

  return (
    <>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <Accordion>
        {appointmentsData && appointmentsData.length > 0 ? (
          appointmentsData.map((item, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header onClick={() => handleAccordionClick(item.patientid)}>
                {item.patient_name} - {item.patientid}
              </Accordion.Header>
              <Accordion.Body>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Blood Group</th>
                      <th>Gender</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={item.patientid}>
                      <td>{item.patient_name}</td>
                      <td>{item.patient_BGroup}</td>
                      <td>{item.patient_gender}</td>
                      <td>{item.patient_notes}</td>
                    </tr>
                  </tbody>
                </table>
                <form onSubmit={handleSubmitEhr}>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Diagnosis" 
                      name="diagnosis" 
                      value={formData.diagnosis} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Prescriptions" 
                      name="prescriptions" 
                      value={formData.prescriptions} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Treatment" 
                      name="treatment" 
                      value={formData.treatment} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div>
                    <label>Upload X-ray Image</label>
                    <input 
                      type="file" 
                      onChange={handleFileChange} 
                      accept="image/*" 
                      required 
                    />
                  </div>
                  <div className="button-container">
                    <button type="submit" className="appSubmit">Submit</button>
                    <button 
                      type="button" 
                      className="appDelete" 
                      onClick={() => handleDelete(item.appointment_id)}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <div>No Appointments Found</div>
        )}
      </Accordion>
    </>
  );
}

export default AccordionUsage;
