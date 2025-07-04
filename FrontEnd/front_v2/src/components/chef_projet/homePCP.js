import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/logo00.png';
import { useNavigate, useParams } from 'react-router-dom';

const HomePCP = ({ children }) => {
    const { idProjet } = useParams();
    const navigate = useNavigate();
  return (
    <div className="main-layout">
      {/* Barre de navigation */}
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Logo" className="navbar-logo-image" />
          </a>
        </div>
        <ul className="navbar-menu">
          <li><a href="/">Se déconnecter</a></li>
        </ul>
      </nav>

      {/* Contenu principal */}
      <div className="content">
        {/* Menu latéral gauche */}
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li><a href={"/absencesCP/"+idProjet}>liste des employés</a></li>
            <li><a href={"/materialsCP/"+idProjet}>liste des materials</a></li>
            <li><a href={"/files/"+idProjet}>liste des fichiers</a></li>
            <li><a href={`/needsCP/${idProjet}`}>Liste des besoins</a></li>
            <li>
              <a href={`/homeCP`}>Liste des projets</a>
            </li>
          </ul>
        </aside>

        {/* Zone principale */}
        <main className="main-content">
          {children || (
            <div className="default-content">
              <img src={logo} alt="Logo" className="main-logo" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Validation des props
HomePCP.propTypes = {
  children: PropTypes.node,
};

export default HomePCP;
