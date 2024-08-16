import React from 'react'
import '../CSS/Navbar.css';
import Logo from "../images/logo00.png";
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
    <div className="navbar-logo">
        <img src={Logo} alt="Logo" />
    </div>
    <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        {/*  <li><a href="#">About</a></li>*/}
        <li><Link to="/Login">Login</Link></li>
        <li><Link to="/SignUP">Sign In</Link></li>
        {/*  <li><a href="#">Contact</a></li> */} 
    </ul>
    </nav>
  )
}
