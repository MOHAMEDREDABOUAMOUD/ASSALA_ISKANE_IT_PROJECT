import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../../images/logo00.png';
import api from '../../utils/api';

const ListMaterialsCP = () => {
  const { idProjet } = useParams();
  const [materials, setMaterials] = useState([]);
  const [materiaux, setMateriaux] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await api.get(
          `http://localhost:9092/assalaiskane/getMaterielsChantiers?id_projet=${idProjet}`
        );
        console.log(response.data);
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };
    const fetchMateriaux = async () => {
        try {
          const response = await api.get(`http://localhost:9092/assalaiskane/getMateriauxChantiers?id_projet=${idProjet}`);
          console.log(response.data);
          setMateriaux(response.data);
        } catch (error) {
          console.error('Error fetching chantier materials:', error);
        }
      };

    fetchMaterials();
    fetchMateriaux();
  }, [idProjet]);

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
            <li><a href={"/absencesCP/"+idProjet}>liste des employés</a></li>
            <li><a href={"/materialsCP/"+idProjet}>liste des materials</a></li>
            <li><a href={"/files/"+idProjet}>liste des fichiers</a></li>
            <li>
              <a href={`/homeCP`}>Liste des projets</a>
            </li>
            {/* <li><a href={"/list-workers/"+id_projet}>liste des employés</a></li>
            <li><a href={"/materials/"+id_projet}>liste des materials</a></li>
            <li><a href={"/needs/"+id_projet}>liste des besoins</a></li> */}
            {/* <li><a href="#settings">declare des besoins</a></li>
            <li><a href="#settings">Parametres</a></li> */}
          </ul>
        </aside>

        {/* Zone principale */}
        <main className="main-content">
          <div className="list-materials-container">
            <h2>Liste des Matériels</h2>
            {materials.length > 0 ? (
              <table className="materials-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Quantité</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((material) => (
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
          <div className="list-materials-container">
            <h2>Liste des Matériaux</h2>
            {materiaux.length > 0 ? (
              <table className="materials-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Quantité</th>
                  </tr>
                </thead>
                <tbody>
                  {materiaux.map((material) => (
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
        </main>
      </div>
    </div>
  );
};

export default ListMaterialsCP;
