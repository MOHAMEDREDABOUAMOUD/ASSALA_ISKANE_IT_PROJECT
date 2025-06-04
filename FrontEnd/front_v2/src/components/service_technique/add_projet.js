import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo00.png';

const AddProject = () => {
  const navigate = useNavigate();
  const [usersCC, setUsersCC] = useState([]);
  const [usersRP, setUsersRP] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    nom: '',
    numero_marche: '',
    objet: '',
    date_ordre: '',
    date_fin: '',
    delai: '',
    idResponsableProjet: '',
    idResponsableChantier: '',
  });
  const [error, setError] = useState('');

  // Récupérer la liste des utilisateurs depuis le backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('http://localhost:9092/assalaiskane/getCC');
        setUsersCC(response.data);
        const response2 = await api.get('http://localhost:9092/assalaiskane/getRP');
        setUsersRP(response2.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        setError('Impossible de charger la liste des utilisateurs.');
      }
    };

    fetchUsers();
  }, []);

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Construire l'URL avec les paramètres individuels
      const { id, nom, numero_marche, objet, date_ordre, date_fin, delai, idResponsableProjet, idResponsableChantier } = formData;
  
      await api.post(
        `http://localhost:9092/assalaiskane/CreateProjet?id=${id}&nom=${nom}&numero_marche=${numero_marche}&objet=${objet}&date_ordre=${date_ordre}&date_fin=${date_fin}&delai=${delai}&id_resp=${idResponsableProjet}&id_resp_chantier=${idResponsableChantier}`
      );
  
      alert('Projet ajouté avec succès.');
      navigate('/homeST'); // Redirige l'utilisateur après l'ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout du projet :', error);
      setError('Une erreur est survenue lors de l\'ajout du projet.');
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
            <li>
              <a href={`/homeST`}>Liste des projets</a>
            </li>
          </ul>
        </aside>
        {/* Zone principale */}
        <main className="main-content">
          <div className="add-project-container">
            <h2>Ajouter un Projet</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="add-project-form">
              <div className="form-group">
                <label>ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Numéro de Marché</label>
                <input
                  type="text"
                  name="numero_marche"
                  value={formData.numero_marche}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Objet</label>
                <textarea
                  name="objet"
                  value={formData.objet}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date d'Ordre</label>
                <input
                  type="date"
                  name="date_ordre"
                  value={formData.date_ordre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date de Fin</label>
                <input
                  type="date"
                  name="date_fin"
                  value={formData.date_fin}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Délai (jours)</label>
                <input
                  type="number"
                  name="delai"
                  value={formData.delai}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Responsable du Projet</label>
                <select
                  name="idResponsableProjet"
                  value={formData.idResponsableProjet}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Sélectionnez un utilisateur --</option>
                  {usersRP.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nom} {user.prenom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Responsable du Chantier</label>
                <select
                  name="idResponsableChantier"
                  value={formData.idResponsableChantier}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Sélectionnez un utilisateur --</option>
                  {usersCC.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nom} {user.prenom}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="submit-button">
                Ajouter
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProject;
