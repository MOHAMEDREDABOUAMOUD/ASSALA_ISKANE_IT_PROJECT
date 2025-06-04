import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo00.png';
import api from '../utils/api'; // Instance Axios configurée
import {setUSERID} from './constants';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await api.get(`/authenticate?id=${username}&pass=${password}`);

      if (response.data) {
        const user = response.data;

        // Vérification des rôles et redirection
        if (user.fonction === 'chef_chantier') {
            setUSERID(user.id);
          // Récupération du projet pour le Chef de chantier
          const projectResponse = await api.get(`/getProjet?id_resp=${user.id}`);
          const projectId = projectResponse.data[0]?.id;
          if (projectId) {
            navigate('/homeCC/'+projectId);
          } else {
            setErrorMessage('Aucun projet associé trouvé.');
          }
        } else {
            setUSERID(user.id);
          const userId = user.id;
          switch (user.fonction) {
            case 'responsable_comptabiliter':
              navigate(`/homeRC`);
              break;
            case 'responsable_marchandise':
              navigate(`/homeRM`);
              break;
            case 'responsable_projet':
              navigate(`/homeCP/`);
              break;
            case 'responsable_technique':
              navigate(`/homeRT`);
              break;
            case 'service_technique':
              navigate(`/homeST`);
              break;
            default:
              setErrorMessage('Rôle non reconnu.');
              break;
          }
        }
      } else {
        setErrorMessage('ID ou mot de passe invalide.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setErrorMessage('Une erreur s’est produite lors de la connexion.');
    }
  };

  return (
    <div>
      {/* Barre de navigation */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo de l'entreprise" width="50" />
        </div>
        <ul className="menu">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Se connecter</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      <div className="auth-container">
        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="Logo de l'entreprise" className="logo" />
        </div>

        {/* Formulaire d'authentification */}
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Se connecter</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              placeholder="Entrez votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
