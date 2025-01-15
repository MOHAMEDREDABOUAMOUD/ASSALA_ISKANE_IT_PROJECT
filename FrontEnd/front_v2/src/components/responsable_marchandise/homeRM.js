import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../images/logo00.png';
import { getUSERID } from '../constants';

const HomeRM = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const id_resp = getUSERID(); // Remplacez par l'identifiant réel du responsable connecté
  const navigate = useNavigate();

  // Fetch projects data from backend
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:9092/assalaiskane/getAllProjets`)
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the projects data!', error);
        setError('Une erreur est survenue lors de la récupération des projets.');
        setLoading(false);
      });
  }, [id_resp]);

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
          <li>
            <a href="/">Se déconnecter</a>
          </li>
        </ul>
      </nav>

      {/* Contenu principal */}
      <div className="content">
        <main className="main-content">
          <div className="projects-container">
            <h2>Liste des Projets</h2>
            {loading && <p>Chargement des projets...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && projects.length > 0 ? (
              <ul className="projects-list">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="project-item"
                    onClick={() => navigate(`/homePRM/${project.id}`)}
                  >
                    {project.nom}
                  </li>
                ))}
              </ul>
            ) : (
              !loading && !error && <p>Aucun projet trouvé.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeRM;
