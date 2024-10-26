import React, { useEffect, useState } from "react";
import '../../../styles/PastAppointment.css';
import axios from "axios";

const PastAppointments = ({ patientid }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5241/api/Patient/appointments/${patientid}`);
        
        // Log the response to see what is returned
        console.log(response.data);

        // Check if the response data is an object or array
        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else if (response.data && typeof response.data === 'object') {
          // If it's a single object, wrap it in an array
          setAppointments([response.data]);
        } else {
          console.error("Unexpected response format:", response.data);
          setAppointments([]); // Set to empty array if not an array or object
        }
      } catch (error) {
        console.error("Error fetching the appointments:", error);
        setAppointments([]); // Set to empty array in case of error
      }
    };

    fetchAppointments();
  }, [patientid]);

  return (
    <div>
      <h1>Appointments</h1>
      <div className="pat-appointment-container">
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Doctor ID</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td>{appointment.appointmentId}</td>
                  <td>{appointment.doctorId}</td>
                  <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.notes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-appointments">No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastAppointments;
