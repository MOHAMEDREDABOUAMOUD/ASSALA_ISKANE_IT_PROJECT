import React from 'react'
import '../CSS/Loading.css';
import Logo from "../images/logo00.png";
import LinearWithValueLabel from './LinearWithValueLabel';

export default function Loading() {
  return (
    <div className="loading-container">
        <img className="loading-logo" src={Logo} alt="Logo" />
        <div className="loading-progress">
            <LinearWithValueLabel />
        </div>
    </div>
  )
}


