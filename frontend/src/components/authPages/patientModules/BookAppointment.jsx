import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import '../../../styles/BookAppointment.css';

export default function BookAppointment({ patientid }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({});
  const [starttime, setStartTime] = useState('');
  const [endtime, setEndTime] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const formatTimeHHMMSStoHHMM = (time) => {
    if (!time || typeof time !== 'string') {
      console.error("Invalid time format:", time);
      return ''; // Return an empty string or a default time like '00:00'
    }
    return time.slice(0, 5);
  };

  const formatTimeHHMMtoHHMMSS = (time) => {
    const match = time.match(/(\d{2}):(\d{2})([ap]m)/);
    if (!match) {
      throw new Error('Invalid time format');
    }
    let [_, hours, minutes, period] = match;
    let hours24 = parseInt(hours, 10);
    if (period === 'pm' && hours24 !== 12) hours24 += 12;
    if (period === 'am' && hours24 === 12) hours24 = 0;
    return `${hours24.toString().padStart(2, '0')}:${minutes}:00`;
  };

  const fetchAllDoctors = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:7070/health/doctor/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const doctorsList = response.data.map(doctor => ({
        doctorid: doctor.doctorid,
        firstname: doctor.firstname,
        specialization: doctor.specialization,
        starttime: formatTimeHHMMSStoHHMM(doctor.starttime),
        endtime: formatTimeHHMMSStoHHMM(doctor.endtime)
      }));
      setDoctors(doctorsList);
    } catch (error) {
      console.error("Error fetching doctors: ", error);
    }
  }, []);

  const fetchBookedAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5241/api/Appointment");
      const appointments = response.data;
      const doctorAppointments = generateDoctorAppointmentsData(appointments);

      console.log("Generated doctor appointments data:", doctorAppointments);
      setBookedSlots(doctorAppointments);
    } catch (error) {
      console.error("Error fetching booked appointments: ", error);
    }
  };
  

  const generateDoctorAppointmentsData = (appointments) => {
    return appointments.reduce((acc, appointment, index) => {
      const { doctorId, appointmentDate, appointmentTime } = appointment;
  
      // Create a date object from the appointment date
      const localDate = new Date(appointmentDate);
  
      // Convert the local date to a string in YYYY-MM-DD format
      const date = localDate.toLocaleDateString('en-CA'); // 'en-CA' gives a format of YYYY-MM-DD
  
      // Convert the time to a 12-hour format without spaces (e.g., "12:30pm")
      const time = new Date(`1970-01-01T${appointmentTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).replace(/\s/g, '');
  
      console.log(`Processing appointment ${index + 1}/${appointments.length}:`, appointment);
  
      // Initialize the array for this date if it doesn't exist
      if (!acc[date]) {
        acc[date] = [];
      }
  
      // Add the time slot to the corresponding date
      acc[date].push(time);
  
      console.log(`acc after processing appointment ${index + 1}:`, JSON.stringify(acc, null, 2));
  
      return acc;
    }, {});
  };
  
  
  

  function convertToISO8601(dateString) {
    const date = new Date(dateString);
    const currentTime = new Date();

    // Set the time from the current date
    date.setHours(currentTime.getHours());
    date.setMinutes(currentTime.getMinutes());
    date.setSeconds(currentTime.getSeconds());
    date.setMilliseconds(currentTime.getMilliseconds());

    // Convert to ISO 8601 string
    return date.toISOString();
}

  const fetchTimeSlots = (startTime, endTime, interval = 30) => {
    let slots = [];
    let currentTime = new Date(`1970-01-01T${startTime}:00`);
    const endTimeObj = new Date(`1970-01-01T${endTime}:00`);
    while (currentTime < endTimeObj) {
      const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).replace(/\s/g, '');
      slots.push(formattedTime);
      currentTime.setMinutes(currentTime.getMinutes() + interval);
    }
    setTimeSlots(slots);
  };

  useEffect(() => {
    fetchAllDoctors();
    fetchBookedAppointments();

    console.log("Updated booked slots after fetch:", bookedSlots);

    const today = new Date();
    const days = [];
    for (let i = 1; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    setAvailableDates(days);

    if (selectedDoctorId) {
      fetchTimeSlots(starttime, endtime);
    }
  }, [fetchAllDoctors, selectedDoctorId, starttime, endtime]);

  const handleDoctorChange = (e) => {
    const selectedDoctorId = e.target.value;
    const selectedDoctor = doctors.find(doctor => doctor.doctorid === parseInt(selectedDoctorId));

    if (selectedDoctor) {
      setSelectedDoctorId(selectedDoctor.doctorid);
      setStartTime(selectedDoctor.starttime);
      setEndTime(selectedDoctor.endtime);
      fetchTimeSlots(selectedDoctor.starttime, selectedDoctor.endtime);
    } else {
      setSelectedDoctorId('');
      setStartTime('');
      setEndTime('');
      setTimeSlots([]);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleSymptomsChange = (e) => {
    setSymptoms(e.target.value);
  };

  const handleBooking = async () => {
    if (!selectedDoctorId || !selectedDate || !selectedTimeSlot) {
      alert('Please select a doctor, date, and time slot.');
      return;
    }
    try {
      const bookingDetails = {
        doctorId: selectedDoctorId,
        date: convertToISO8601(selectedDate),
        time: formatTimeHHMMtoHHMMSS(selectedTimeSlot),
        notes: symptoms, 
        status: "scheduled",
        patientId: patientid
      };
      alert(`Booking Details:\nDoctor ID: ${bookingDetails.doctorId}\nDate: ${bookingDetails.date}\nTime: ${bookingDetails.time}\nSymptoms: ${bookingDetails.notes}\nAppointment Booked.`);

      await axios.post('http://localhost:5241/api/Appointment', bookingDetails);

      setSelectedDoctorId('');
      setSelectedDate('');
      setSelectedTimeSlot('');
      setSymptoms(''); // Clear symptoms input
      setTimeSlots([]);
      setStartTime('');
      setEndTime('');
      setBookedSlots({});
    } catch (error) {
      console.error("Error booking appointment: ", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  console.log("Booked Slots: ",bookedSlots);

  return (
    <div className='appointment'>
      <h1>Book Appointment</h1>
      <div className='appointment-container'>
        <select onChange={handleDoctorChange} required>
          <option value="" disabled selected>Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctorid} value={doctor.doctorid}>
              {`Dr. ${doctor.firstname} (${doctor.specialization})`}
            </option>
          ))}
        </select>
        <br/>
        <br/>
        <div>
          <input
            type='text'
            placeholder='Explain your symptoms (Optional)'
            value={symptoms}
            onChange={handleSymptomsChange}
          />
        </div>
        <hr/>
        <div className="date-selection">
          {availableDates.map((date) => (
            <div key={date} className="date-section">
              <h3>{new Date(date).toDateString()}</h3>
              <div className="time-slots">
                {timeSlots.map((timeSlot) => {
                  const isBooked = bookedSlots[date] && bookedSlots[date].includes(timeSlot);
                  const isSelected = selectedDate === date && selectedTimeSlot === timeSlot;
                  return (
                    <button
                      key={timeSlot}
                      className={`time-slot ${isSelected ? 'selected' : ''}`}
                      disabled={isBooked}
                      onClick={() => {
                        if (!isBooked) {
                          handleDateChange(date);
                          handleTimeSlotChange(timeSlot);
                        }
                      }}
                    >
                      {timeSlot}
                    </button>
                  );
                })}
              </div>
              <hr/>
            </div>
          ))}
        </div>
        <button onClick={handleBooking}>Book Appointment</button>
      </div>
    </div>
  );
}
