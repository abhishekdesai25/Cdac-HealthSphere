import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AppointmentScheduler from './AppointmentScheduler.jsx'
import AccordionUsage from './AccordionUsage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../../styles/Dashboard.css';
import '../../styles/Accordion.css';
import '../../styles/Calendar.css';
import defaultImg from '../../images/default.jpg';
import Appointment from '../../images/docDash1.jpg';

export default function DoctorDashboard() {

    const [doctor, setDoctor] = useState(null);
    const [showAccordion, setShowAccordion] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const baseUrl = 'http://localhost:7070/health/doctor';
    const navigate = useNavigate();
    const { setAuthState } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthState({ isAuthenticated: false, patient: null, doctor: null});
        navigate('/login');
    }

    const viewAppointments = () => {
        if (showCalendar){
            setShowCalendar(false);
        }
        setShowAccordion(!showAccordion);
    }

    const setCalendar = () => {
        if(showAccordion){
            setShowAccordion(false);
        }
        setShowCalendar(!showCalendar);
    }

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try{
            const token = localStorage.getItem('token');
            const response = await axios.get(baseUrl,{
                headers: { Authorization: `Bearer ${token}`},
            });
            setDoctor(response.data);
            if (response.data.doctorid) {
                const imageResponse = await axios.get(`${baseUrl}/picture/${response.data.doctorid}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: 'arraybuffer',
                });

                if (imageResponse.data.byteLength > 0) { 
                    const base64Image = btoa(
                        new Uint8Array(imageResponse.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    );
                    setProfileImageUrl(`data:image/jpeg;base64,${base64Image}`);
                } else {
                    setProfileImageUrl(null);
                }

                const appointmentsResponse = await axios.get(`${baseUrl}/appointments/${response.data.doctorid}` ,{
                    headers: { Authorization: `Bearer ${token}` },
                })

                setAppointments(appointmentsResponse.data)
            }
        } catch (error) {
            console.error("Error fetching doctor details or profile image:", error);
        }
        };

        fetchDoctorDetails();
    },[]);

    if(!doctor) return <div>Loading.....</div>

    const accordionItems = appointments.map((appointment,index) => ({
        title: `Appointment ${index + 1}`,
        content: `Name: ${appointment.name}, Blood Group: ${appointment.bloodgroup}, Gender: ${appointment.gender}`,
    }))

  return (
    <div className='dashboard-container'>
        <img src={Appointment} alt='body' className='back-img'/>
        <div className='profile'>
            <img src={profileImageUrl || defaultImg} alt={doctor.firstname} className='profileImg'/> 
            <div className='content'>
            <h2>Dr. {doctor.firstname}</h2>
            <p><h4>Specialization: {doctor.specialization}</h4></p>
            </div>
            <hr />
            <br />
            <button onClick={viewAppointments} className='view'>View Appointments</button>
            <br />
            <button onClick={setCalendar} className='calendar'>Set Calendar</button>
            <br />
            <button onClick={handleLogout} className='logout'>Logout</button>
        </div>
        
        {showAccordion && (
            <div className='accordion-container'>
                <h2 style={{color:"white"}}>Appointments</h2>
                <AccordionUsage items={accordionItems} doctorid={doctor.doctorid}/>
            </div>
        )}

        {showCalendar &&(
            <div className='calendar-container'>
                <AppointmentScheduler doctorid={doctor.doctorid}/>
            </div>
        )}
    </div>
  );
};
