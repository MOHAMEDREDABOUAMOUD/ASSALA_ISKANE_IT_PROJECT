import React from 'react';
import logo from '../images/logo00.png'; // Importation explicite de l'image

const Home = () => {
  return (
    <div className="home">
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

      {/* Contenu principal */}
      <div className="main-content">
        <img src={logo} alt="Logo de l'entreprise" width="500" />
      </div>
    </div>
  );
};

export default Home;
