import React, { useState } from 'react';
import '../../../styles/Modal.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

export default function DoctorModal({ isOpen, onClose }) {

  const [ loginData, setLoginData ] = useState({"username":"","password":""})
  const navigate = useNavigate();
  const { setAuthState } = useAuth();

  const baseUrl = 'http://localhost:7070/health/doctor';

  const initialState = {"username":"","password":""};

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(baseUrl + '/login', loginData);
      const token = response.data.token;
      localStorage.setItem('token', token);

      const doctor = jwtDecode(token);
      setAuthState({isAuthenticated: true, doctor, patient:null, admin:null});
      
      navigate('/doctordashboard');
      setLoginData(initialState);
    } catch (error) {
      console.error('There was an error logging in!',error);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmitLogin}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Doctor Login</h2>
        <input 
          type='text' 
          placeholder='Username' 
          autoFocus 
          required
          onChange={handleLoginChange}
          value={loginData.username}
          name='username'
        />
        <input 
          type='password' 
          placeholder='Password' 
          required
          onChange={handleLoginChange}
          value={loginData.password}
          name='password'
        />
        <button>Submit</button>
        </form>
      </div>
    </div>
  );
};
