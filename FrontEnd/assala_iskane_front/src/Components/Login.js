import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login_singin.css';
import Logo from "../images/logo00.png";

function Login() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/SignUP');
  };

  const user_data = [
    ('USR001', 'El Ayoubi', 'Khalid', 'Chef de projet', '0612345678', 'khalid.elayoubi@example.com', 'password1'),
    ('USR002', 'Benjelloun', 'Ahmed', 'Responsable chantier', '0678901234', 'ahmed.benjelloun@example.com', 'password2'),
    ('USR003', 'Bouhssine', 'Fatima', 'Ingénieur', '0667890123', 'fatima.bouhssine@example.com', 'password3')
  ]
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginClick = (e) => {
    e.preventDefault();

    // Check if user exists
    const user = user_data.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Navigate to dashboard or home page on successful login
      navigate('/dashboard');
    } else {
      // Show error message if login fails
      setError('Invalid email or password');
    }
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
          {error && <div className="login-error">{error}</div>}
          <button className="login-button" type="submit" onClick={handleLoginClick}>Login</button>
          <button className="signin-button" type="button" onClick={handleSignInClick}>Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
