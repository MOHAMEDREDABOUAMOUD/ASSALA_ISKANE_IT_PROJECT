import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../../images/logo00.png';
import api from '../../utils/api';

const ListMaterialsCP = () => {
  const { idProjet } = useParams();
  const [materials, setMaterials] = useState([]);
  const [materiaux, setMateriaux] = useState([]);
  const [searchedMaterials, setSearchedMaterials] = useState([]);
  const [searchedMateriaux, setSearchedMateriaux] = useState([]);
  const [searchMaterials, setSearchMaterials] = useState('');
  const [searchMateriaux, setSearchMateriaux] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await api.get(
          `http://localhost:9092/assalaiskane/getMaterielsChantiers?id_projet=${idProjet}`
        );
    
        // Filtrer et formater les données selon la structure souhaitée
        const formattedMaterials = response.data.map(material => {
          // On prend 11 pour la quantité si elle est égale à 2
    
          return {
            id: material.materiel.id,
            nom: material.materiel.nom,
            qte: material.qte,
            prix: material.materiel.prix
          };
        });
    
        // Mettre à jour l'état avec les données formatées
        setMaterials(formattedMaterials);
        setSearchedMaterials(formattedMaterials); // Initialisation
    
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };
    

    const fetchMateriaux = async () => {
      try {
        const response = await api.get(
          `http://localhost:9092/assalaiskane/getMateriauxChantiers?id_projet=${idProjet}`
        );
    
        // Formater les données et appliquer la règle sur la quantité
        const formattedMateriaux = response.data.map(materiau => {
          // On prend 11 pour la quantité si elle est égale à 100
    
          return {
            id: materiau.materiaux.id,
            nom: materiau.materiaux.nom,
            type: materiau.materiaux.type,
            qte: materiau.qte,
            prix: materiau.materiaux.prix
          };
        });
    
        // Mettre à jour les états avec les données filtrées et formatées
        setMateriaux(formattedMateriaux);
        setSearchedMateriaux(formattedMateriaux); // Initialisation
    
      } catch (error) {
        console.error('Error fetching chantier materials:', error);
      }
    };
    

    fetchMaterials();
    fetchMateriaux();
  }, [idProjet]);

  // Recherche synchronisée pour matériels
  useEffect(() => {
    const filtered = searchMaterials.trim()
      ? materials.filter((material) =>
        material.nom.toLowerCase().includes(searchMaterials.trim().toLowerCase())
      )
      : materials;
    setSearchedMaterials(filtered);
  }, [searchMaterials, materials]);

  // Recherche synchronisée pour matériaux
  useEffect(() => {
    const filtered = searchMateriaux.trim()
      ? materiaux.filter((materiau) =>
        materiau.nom.toLowerCase().includes(searchMateriaux.trim().toLowerCase())
      )
      : materiaux;
    setSearchedMateriaux(filtered);
  }, [searchMateriaux, materiaux]);

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
          <div className="tables-container">
            {/* Matériels */}
            <div className="list-materials-container">
              <h2>Liste des Matériels</h2>
              <input
                type="text"
                placeholder="Rechercher un matériel..."
                value={searchMaterials}
                onChange={(e) => setSearchMaterials(e.target.value)}
              />
              {searchedMaterials.length > 0 ? (
                <table className="materials-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Quantité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedMaterials.map((material) => (
                      <tr key={material.id}>
                        <td>{material.id}</td>
                        <td>{material.nom}</td>
                        <td>{material.qte}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucun matériel trouvé pour ce projet.</p>
              )}
            </div>

            {/* Matériaux */}
            <div className="list-materials-container">
              <h2>Liste des Matériaux</h2>
              <input
                type="text"
                placeholder="Rechercher un matériau..."
                value={searchMateriaux}
                onChange={(e) => setSearchMateriaux(e.target.value)}
              />
              {searchedMateriaux.length > 0 ? (
                <table className="materials-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Quantité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedMateriaux.map((material) => (
                      <tr key={material.id}>
                        <td>{material.id}</td>
                        <td>{material.nom}</td>
                        <td>{material.qte}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucun matériau trouvé pour ce projet.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListMaterialsCP;
