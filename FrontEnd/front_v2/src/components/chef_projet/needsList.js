import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../../images/logo00.png';
import api from '../../utils/api';
import { getUSERID } from '../constants';

const NeedsListCP = () => {
  const { idProjet } = useParams();
  const [needs, setNeeds] = useState([]);

  // Récupérer la liste des besoins
  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await api.get(
          `http://localhost:9092/assalaiskane/getBesoinsRP?id_projet=${idProjet}`
        );
        setNeeds(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des besoins :', error);
      }
    };

    fetchNeeds();
  }, [idProjet]);

  // Fonction pour accepter un besoin
  const handleAccept = async (needId) => {
    try {
      await api.post(`http://localhost:9092/assalaiskane/validateBesoin?id_resp=${getUSERID()}&id_besoin=${needId}`);
      setNeeds(needs.filter((need) => need.id !== needId)); // Met à jour la liste après l'acceptation
      alert('Besoin accepté avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'acceptation du besoin :', error);
      alert('Une erreur est survenue lors de l\'acceptation du besoin.');
    }
  };

  // Fonction pour refuser un besoin
  const handleRefuse = async (needId) => {
    try {
      await api.post(`http://localhost:9092/assalaiskane/deleteBesoin?id_besoin=${needId}`);
      setNeeds(needs.filter((need) => need.id !== needId)); // Met à jour la liste après le refus
      alert('Besoin refusé avec succès.');
    } catch (error) {
      console.error('Erreur lors du refus du besoin :', error);
      alert('Une erreur est survenue lors du refus du besoin.');
    }
  };

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
        {/* Menu latéral gauche */}
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li><a href={`/list-workersCP/${idProjet}`}>Liste des employés</a></li>
            <li><a href={`/materialsCP/${idProjet}`}>Liste des matériaux</a></li>
            <li><a href={"/files/"+idProjet}>liste des fichiers</a></li>
            <li><a href={`/needsCP/${idProjet}`}>Liste des besoins</a></li>
            <li>
                <a href={`/homeCP`}>Liste des projets</a>
            </li>
          </ul>
        </aside>

        {/* Zone principale */}
        <main className="main-content">
          <div className="needs-list-container">
            <h2>Liste des Besoins</h2>
            {needs.length > 0 ? (
              <table className="needs-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Quantité</th>
                    <th>Date Demande</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {needs.map((need, index) => (
                    <tr key={index}>
                      <td>{need.nom}</td>
                      <td>{need.qte}</td>
                      <td>{need.date_demande}</td>
                      <td>
                        <button
                          className="btn-accept"
                          onClick={() => handleAccept(need.id)}
                        >
                          Accepter
                        </button>
                        <button
                          className="btn-refuse"
                          onClick={() => handleRefuse(need.id)}
                        >
                          Refuser
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun besoin trouvé pour ce projet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NeedsListCP;
