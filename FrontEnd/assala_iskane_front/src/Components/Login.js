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
    { id: 'USR001', lastName: 'El Ayoubi', firstName: 'Khalid', role: 'ChefDeProjet', phone: '0612345678', email: 'khalid.elayoubi@example.com', password: 'password1' },
    { id: 'USR002', lastName: 'Benjelloun', firstName: 'Ahmed', role: 'ChefChantier', phone: '0678901234', email: 'ahmed.benjelloun@example.com', password: 'password2' },
    { id: 'USR003', lastName: 'Bouhssine', firstName: 'Fatima', role: 'ServiceTechnique', phone: '0667890123', email: 'fatima.bouhssine@example.com', password: 'password3' },
    { id: 'USR004', lastName: 'El Fassi', firstName: 'Omar', role: 'ChefTechnique', phone: '0645678901', email: 'omar.elfassi@example.com', password: 'password4' },
    { id: 'USR005', lastName: 'Tazi', firstName: 'Rachid', role: 'ChefDeProjet', phone: '0623456789', email: 'rachid.tazi@example.com', password: 'password5' },
  ];

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
      // Navigate to different pages based on the user's role
      switch (user.role) {
        case 'ChefChantier':
          navigate('/HomePage_ChefChantier');
          break;
        case 'ResponsableComptabiliter':
          navigate('/HomePage_RespComptabiliter');
          break;
        case 'ResponsableMarchandise':
          navigate('/HomePage_RespMarchandise');
          break;
        case 'ResponsableDeProjet':
          navigate('/HomePage_ResponsableDeProjet');
          break;
        case 'ResponsableTechnique':
          navigate('/HomePage_RespTechnique');
          break;
        case 'ServiceTechnique':
          navigate('/HomePage_ServiceTechnique');
          break;
        case 'ChefTechnique':
          navigate('/HomePage_ChefTechnique');
          break;
        case 'ChefDeProjet':
          navigate('/HomePage_ChefDeProjet');
          break;
        default:
          setError('Role not recognized');
          break;
      }
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
        <form onSubmit={handleLoginClick}>
          <div className="login-input-group">
            <label className="login-label" htmlFor="email">Email:</label>
            <input
              className="login-input"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="password">Password:</label>
            <input
              className="login-input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button className="login-button" type="submit">Login</button>
          <button className="signin-button" type="button" onClick={handleSignInClick}>Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
