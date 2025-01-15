import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import logo from '../../images/logo00.png';

const OuvriersList = () => {
  const { idProjet } = useParams();
  const navigate = useNavigate();
  const [ouvriers, setOuvriers] = useState([]);
  const [error, setError] = useState('');
  const [absents, setAbsents] = useState([]);
  const [newOuvrier, setNewOuvrier] = useState({
    id: '',
    nom: '',
    prenom: '',
    numero: '',
  });

  // Récupérer les ouvriers liés à un projet
  useEffect(() => {
    if (idProjet) {
      const fetchOuvriers = async () => {
        try {
          setError('');
          const response = await api.get(`/getOuvriers?id_projet=${idProjet}`);
          if (response.status === 200) {
            setOuvriers(response.data);
          } else {
            setOuvriers([]);
            setError('Aucun ouvrier trouvé pour ce projet.');
          }
        } catch (err) {
          console.error('Erreur lors de la récupération des ouvriers :', err);
          setError('Une erreur est survenue. Veuillez réessayer.');
        }
      };
      fetchOuvriers();
    }
  }, [idProjet]);

  // Gérer la sélection des ouvriers absents
  const handleCheckboxChange = (id) => {
    setAbsents((prev) =>
      prev.includes(id) ? prev.filter((absentId) => absentId !== id) : [...prev, id]
    );
  };

  // Déclarer les absences
  const handleDeclareAbsence = async () => {
    const dateAbsence = new Date().toISOString().split('T')[0]; // Date actuelle au format YYYY-MM-DD
    try {
      let idChantier;
      const response = await api.get(`/getChantier?id_projet=${idProjet}`);
      if (response.status === 200) {
        idChantier = response.data.id;
      } else {
        setError('Aucun chantier trouvé pour ce projet.');
        return;
      }
  
      // Traiter tous les ouvriers
      for (const ouvrier of ouvriers) {
        const absentValue = absents.includes(ouvrier.id) ? 1 : 0; // 1 si absent, sinon 0
        console.log(
          `Ouvrier ID: ${ouvrier.id}, Date: ${dateAbsence}, Chantier: ${idChantier}, Absent: ${absentValue}`
        );
        await api.post(
          `http://localhost:9092/assalaiskane/AddAbsence?id_ouvrier=${ouvrier.id}&date_absence=${dateAbsence}&id_chantier=${idChantier}&absent=${absentValue}`
        );
      }
  
      alert('Absences et présences enregistrées avec succès.');
      setAbsents([]); // Réinitialiser les absences sélectionnées
    } catch (err) {
      console.error('Erreur lors de la déclaration des absences/présences :', err);
      alert('Une erreur est survenue lors de la déclaration des absences/présences.');
    }
  };

  // Ajouter un ouvrier
  // Ajouter un ouvrier
  const handleAddOuvrier = async () => {
    if (newOuvrier.nom && newOuvrier.prenom && newOuvrier.numero) {
      try {
        // Envoyer la requête au backend pour ajouter l'ouvrier
        const response = await api.post(
          `http://localhost:9092/assalaiskane/AddOuvrier?id=${newOuvrier.id}&nom=${newOuvrier.nom}&prenom=${newOuvrier.prenom}&numero=${newOuvrier.numero}&id_projet=${idProjet}`
        );
  
        if (response.status === 200) {
          // Ajouter directement l'ouvrier à la liste locale
          setOuvriers((prevOuvriers) => [
            ...prevOuvriers,
            { id: newOuvrier.id, ...newOuvrier },
          ]);
  
          // Réinitialiser le formulaire
          setNewOuvrier({ nom: '', prenom: '', numero: '' });
          alert('Ouvrier ajouté avec succès.');
        } else {
          alert("L'ajout a échoué, veuillez réessayer.");
        }
      } catch (err) {
        console.error('Erreur lors de l’ajout de l’ouvrier :', err);
        alert('Une erreur est survenue.');
      }
    } else {
      alert('Veuillez remplir tous les champs du formulaire.');
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
            <li><a href={"/list-workers/"+idProjet}>liste des employés</a></li>
            <li><a href={"/materials/"+idProjet}>liste des materials</a></li>
            <li><a href={"/needs/"+idProjet}>liste des besoins</a></li>
          </ul>
        </aside>

        {/* Zone principale */}
        <main className="main-content">
          <div className="ouvriers-container">
          <h2>Ajouter un Ouvrier</h2>
            <div className="form-container">
              <input
                type="text"
                placeholder="Id"
                value={newOuvrier.id}
                onChange={(e) => setNewOuvrier({ ...newOuvrier, id: e.target.value })}
              />
              <input
                type="text"
                placeholder="Nom"
                value={newOuvrier.nom}
                onChange={(e) => setNewOuvrier({ ...newOuvrier, nom: e.target.value })}
              />
              <input
                type="text"
                placeholder="Prénom"
                value={newOuvrier.prenom}
                onChange={(e) => setNewOuvrier({ ...newOuvrier, prenom: e.target.value })}
              />
              <input
                type="text"
                placeholder="Numéro de téléphone"
                value={newOuvrier.numero}
                onChange={(e) => setNewOuvrier({ ...newOuvrier, numero: e.target.value })}
              />
              <button className="add-button" onClick={handleAddOuvrier}>
                Ajouter
              </button>
            </div>
            <h2>Liste des Ouvriers</h2>
            {error && <p className="error-message">{error}</p>}
            {ouvriers.length > 0 ? (
              <>
                <table className="ouvriers-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Téléphone</th>
                      <th>Absent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ouvriers.map((ouvrier) => (
                      <tr key={ouvrier.id}>
                        <td>{ouvrier.id}</td>
                        <td>{ouvrier.nom}</td>
                        <td>{ouvrier.prenom}</td>
                        <td>{ouvrier.numero}</td>
                        <td>
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(ouvrier.id)}
                            checked={absents.includes(ouvrier.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="absence-button" onClick={handleDeclareAbsence}>
                  Déclarer Absence
                </button>
                <button 
                  className="absence-button" 
                  onClick={() => navigate(`/absences/${idProjet}`)}
                >
                  Voir les absences
                </button>
              </>
            ) : (
              !error && <p>Veuillez entrer un ID de projet pour voir les ouvriers.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OuvriersList;
