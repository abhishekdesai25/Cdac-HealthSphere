import React, { useState } from 'react'
import '../../styles/LoginPage.css'
import img1 from '../../images/patientImg1.png'
import img2 from '../../images/doctorImg1.png'
import img3 from '../../images/adminImg1.png'
import PatientModal from './modal/PatientModal'
import DoctorModal from './modal/DoctorModal'
import AdminModal from './modal/AdminModal'

export default function Login() {

  const [ isPatientModalOpen, setIsPatientModalOpen ] = useState(false);
  const [ isDoctorModalOpen, setIsDoctorModalOpen ] = useState(false);
  const [ isAdminModalOpen, setIsAdminModalOpen ] = useState(false);

  const handlePatientClick = () => {
    setIsPatientModalOpen(true);
  }

  const closePatientModal = () => {
    setIsPatientModalOpen(false);
  }

  const handleDoctorClick = () => {
    setIsDoctorModalOpen(true);
  }

  const closeDoctorModal = () => {
    setIsDoctorModalOpen(false);
  }

  const handleAdminClick = () => {
    setIsAdminModalOpen(true);
  }

  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
  }

  return (
    <div className="container">
      <span onClick={handlePatientClick}>
        <img src={img1} alt="Patient"/>
      </span>
      <span onClick={handleDoctorClick}>
        <img src={img2} alt="Doctor"/>
      </span>
      <span onClick={handleAdminClick}>
        <img src={img3} alt="Admin"/>
      </span>

      <PatientModal isOpen={isPatientModalOpen} onClose={closePatientModal} />
      <DoctorModal isOpen={isDoctorModalOpen} onClose={closeDoctorModal} />
      <AdminModal isOpen={isAdminModalOpen} onClose={closeAdminModal} />
    </div>
  )
}
