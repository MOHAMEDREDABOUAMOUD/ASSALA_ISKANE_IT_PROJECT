import React from 'react';
import logo from '../images/logo00.png'; // Logo de l'entreprise

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Barre de navigation */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo de l'entreprise" width="50" />
        </div>
        <ul className="menu">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Se connecter</a></li>
        </ul>
      </nav>

      {/* Contenu principal */}
      <div className="contact-content">
        <h1>Contactez-nous</h1>
        <p>Voici quelques moyens de nous joindre :</p>
        <ul className="contact-list">
          <li>📧 Email : contact@entreprise.com</li>
          <li>📞 Téléphone : +33 1 23 45 67 89</li>
          <li>📍 Adresse : 123 Rue Fictive, 75000 Paris, France</li>
          <li>🌐 Site Web : www.entreprise.com</li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
