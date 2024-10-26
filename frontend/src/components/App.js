import React from 'react';
import '../styles/App.css';
import { Navbar } from './Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import { useAuth } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import PatientDashboard from './authPages/PatientDashboard';
import DoctorDashboard from './authPages/DoctorDashboard';
import Footer from './pages/Footer';
import AdminDashboard from './authPages/AdminDashboard';
import AccordionUsage from './authPages/AccordionUsage';

export default function App() {
  const location = useLocation();
  const NavbarRoutes = ['/', '/about', '/doctors', '/login'];
  const showNavbar = NavbarRoutes.includes(location.pathname);
  const { authState } = useAuth();

  return (
    <>
      <div className='App'>
        {showNavbar && <Navbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route
            element={
              <PrivateRoute isAuthenticated={authState.isAuthenticated} />
            }
          >
            <Route path='/patientdashboard' element={<PatientDashboard />} />
            <Route path='/doctordashboard' element={<DoctorDashboard />} />
            <Route path='/AccordionUsage' element={<AccordionUsage />} />
            <Route path='/admindashboard' element={<AdminDashboard />} />
          </Route>
        </Routes>
      </div>
      {showNavbar && <Footer />}
    </>
  );
}
