import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Login_singin.css';
import Logo from "../images/logo00.png";

function Login() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/SignUP');
  };

  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id && password) {
      axios.get(`/assalaiskane/authenticate/${id}/${password}`)
        .then(response => {
          setUsers([response.data]); // Wrap the response in an array
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [id, password]);  

  const handleLoginClick = (e) => {
    e.preventDefault();

    // Check if user exists
    const user = users.find(
      (user) => user.Id === id && user.Pass === password
    );

    if (user) {
      // Navigate to different pages based on the user's role
      switch (user.Fonction) {
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
      setError('Invalid ID or password');
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
            <label className="login-label" htmlFor="id">ID:</label>
            <input
              className="login-input"
              type="text"
              id="id"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
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
