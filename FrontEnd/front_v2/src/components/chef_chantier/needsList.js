import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../../images/logo00.png';
import api from '../../utils/api';
import { getUSERID } from '../constants';

const NeedsList = () => {
  const { idProjet } = useParams();
  const [needs, setNeeds] = useState([]);
  const [newNeed, setNewNeed] = useState({ nom: '', qte: '', date_demande: '' });

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await api.get(
          `http://localhost:9092/assalaiskane/getBesoinsCC?id_projet=${idProjet}`
        );
        const data = await response.json();
        setNeeds(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des besoins :', error);
      }
    };

    fetchNeeds();
  }, [idProjet]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newNeed.nom && newNeed.qte && newNeed.date_demande) {
      try {
        await api.post(
          `http://localhost:9092/assalaiskane/AddBesoin?nom=${newNeed.nom}&date_demande=${newNeed.date_demande}&qte=${newNeed.qte}&valide_par=${getUSERID()}&id_projet=${idProjet}`,
        );

        setNeeds([...needs, newNeed]);
        setNewNeed({ nom: '', qte: '', date_demande: '' });
      } catch (error) {
        console.error('Erreur lors de l’ajout du besoin :', error);
      }
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNeed({ ...newNeed, [name]: value });
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
            <li><a href={`/list-workers/${idProjet}`}>Liste des employés</a></li>
            <li><a href={`/materials/${idProjet}`}>Liste des matériaux</a></li>
            <li><a href={`/needs/${idProjet}`}>Liste des besoins</a></li>
          </ul>
        </aside>

        {/* Zone principale */}
        <main className="main-content">
          <div className="needs-list-container">
            <h2>Ajouter un Besoin</h2>
            <form onSubmit={handleSubmit} className="add-need-form">
              <div>
                <label htmlFor="nom">Nom:</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={newNeed.nom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="qte">Quantité:</label>
                <input
                  type="number"
                  id="qte"
                  name="qte"
                  value={newNeed.qte}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="date_demande">Date Demande:</label>
                <input
                  type="date"
                  id="date_demande"
                  name="date_demande"
                  value={newNeed.date_demande}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">Ajouter</button>
            </form>

            <h2>Liste des Besoins</h2>
            {needs.length > 0 ? (
              <table className="needs-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Quantité</th>
                    <th>Date Demande</th>
                  </tr>
                </thead>
                <tbody>
                  {needs.map((need, index) => (
                    <tr key={index}>
                      <td>{need.nom}</td>
                      <td>{need.qte}</td>
                      <td>{need.date_demande}</td>
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

export default NeedsList;
