import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../../styles/Dashboard.css'
import BookAppointment from './patientModules/BookAppointment';
import Records from './patientModules/Records';
import PastAppointments from './patientModules/PastAppointments';
import defImg from '../../images/default.jpg';
import patDash from '../../images/patDash1.jpg';

export default function PatientDashboard() {

    const [patient, setPatient] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [activeComponent,setActiveComponent] = useState(false);
    const baseUrl = 'http://localhost:7070/health/patient';
    const navigate = useNavigate();
    const { setAuthState } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthState({ isAuthenticated: false, patient: null});
        navigate('/login');
    }

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(baseUrl, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data);
                setPatient(response.data);
    
                if (response.data.patientid) {
                    const imageResponse = await axios.get(`${baseUrl}/picture/${response.data.patientid}`, {
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
                        setProfileImage(`data:image/jpeg;base64,${base64Image}`);
                    } else {
                        setProfileImage(null);
                    }
                }
            } catch (error) {
                console.error("Error fetching patient details or profile image:", error);
            }
        };
    
        fetchPatientDetails();
    }, []);
    

    const handleShowBookAppointment = () => {
        setActiveComponent(activeComponent === 'bookAppointment' ? null : 'bookAppointment');
    }

    const handleShowViewRecords = () => {
        setActiveComponent(activeComponent === 'records' ? null : 'records');
    }

    const handleShowPastAppointments = () => {
        setActiveComponent(activeComponent === 'pastAppointment' ? null : 'pastAppointment');
    }

    if(!patient) return <div>Loading.....</div>

  return (
    <div className='dashboard-container'>
        <img src={patDash} alt='patient' className='back-img'/>
        <div className='profile'>
            <img src ={profileImage || defImg} alt={patient.name} className='profileImg' />
            <div className='content'>
            <h2>Hi, {patient.name}</h2>
            <p><h5>BloodGroup: {patient.bloodgroup}</h5></p>
            </div>
            <hr/>
            <br />
            <button className='appointment' onClick={handleShowBookAppointment}>Book an Appointment</button>
            <br/>
            <button className='records' onClick={handleShowViewRecords}>View Records</button>
            <br/>
            <button className='appointment' onClick={handleShowPastAppointments}>Past Appointments</button>
            <br/>
            <br/>
            <button onClick={handleLogout} className='logout'>Logout</button>
        </div>
        {activeComponent === 'bookAppointment' && (
            <div className='patient-container'>
                <BookAppointment patientid={patient.patientid}/>
            </div>
        )}
        {activeComponent === 'records' && (
            <div className='patient-container'>
                <Records patientid={patient.patientid}/>
            </div>
        )}
        {activeComponent === 'pastAppointment' && (
            <div className='patient-container'>
                <PastAppointments patientid={patient.patientid}/>
            </div>
        )}
    </div>
  );
};
