import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login_singin.css';
import Logo from "../images/logo00.png";

function Login() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/SignUP');
  };

  return (
    <div className="login-container">
      <div className="login-logo-container">
        <img src={Logo} alt="Logo" className="login-logo" />
      </div>
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        <form>
          <div className="login-input-group">
            <label className="login-label" htmlFor="email">Email:</label>
            <input className="login-input" type="email" id="email" name="email" required />
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="password">Password:</label>
            <input className="login-input" type="password" id="password" name="password" required />
          </div>
          <button className="login-button" type="submit">Login</button>
          <button className="signin-button" type="button" onClick={handleSignInClick}>Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
