import React, { useState } from 'react'
import {Link, NavLink} from "react-router-dom";
import '../styles/Navbar.css';
export const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
        <Link to="/" className='title'>HealthSphere</Link>
        <div className='menu' onClick={() => {
            setMenuOpen(!menuOpen);
        }}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/doctors">Doctors</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
        </ul>
    </nav>
  )
}
