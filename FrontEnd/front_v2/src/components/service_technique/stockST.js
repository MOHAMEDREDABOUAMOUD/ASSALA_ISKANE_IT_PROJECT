import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../images/logo00.png';
import api from '../../utils/api';
import { FaTrash } from 'react-icons/fa';

const StockST = () => {
  const { idProjet } = useParams();
  const [materials, setMaterials] = useState([]);
  const [searchedMaterials, setSearchedMaterials] = useState([]);
  const [searchMaterials, setSearchMaterials] = useState('');
  const [newMaterial, setNewMaterial] = useState({ nom: '', qte: '', prix: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await api.get(
          `http://localhost:9092/assalaiskane/getMateriels`
        );

        // Filtrer et formater les données selon la structure souhaitée
        const formattedMaterials = response.data.map(material => {
          // On prend 11 pour la quantité si elle est égale à 2

          return {
            id: material.id,
            nom: material.nom,
            qte: material.qte,
            prix: material.prix
          };
        });

        // Mettre à jour l'état avec les données formatées
        setMaterials(formattedMaterials);
        setSearchedMaterials(formattedMaterials); // Initialisation

      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };
    fetchMaterials();
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

  const handleAddMaterial = async () => {
    if (newMaterial.nom && newMaterial.qte && newMaterial.prix) {
      try {
        const { nom, qte, prix } = newMaterial;
        const response = await api.post(
          `http://localhost:9092/assalaiskane/addMateriel?nom=${nom}&qte=${qte}&prix=${prix}&idProjet=${idProjet}`
        );
        // const addedMaterial = response.data;
        setMaterials((prev) => [...prev, newMaterial]); // Mise à jour de la liste
        setNewMaterial({ nom: '', qte: '', prix: '' });
        alert('Le matériel a été bien ajouté');
      } catch (error) {
        console.error('Error adding material:', error);
        alert(error.message);
      }
    }
  };
  const handleQuantityChangeMaterial = (id, value) => {
    setSearchedMaterials((prev) =>
      prev.map((material) =>
        material.id === id ? { ...material, qte: value } : material
      )
    );
  };

  const handleSaveMaterial = async (material) => {
    try {
      const response = await api.post(
        `http://localhost:9092/assalaiskane/updateMateriel?id=${material.id}&qte=${material.qte}`
      );
      setSearchedMaterials((prev) =>
        prev.map((mat) =>
          mat.id === material.id ? { ...mat, qte: material.qte } : mat
        )
      );
      alert('Quantité mise à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du matériel', error);
      alert('Erreur de mise à jour');
    }
  };
  const handleDeleteMaterial = async (id) => {
    try {
      await api.post(
        `http://localhost:9092/assalaiskane/deleteMaterielAll?id=${id}`
      );
      setSearchedMaterials((prev) => prev.filter((material) => material.id !== id));
      alert('Matériel supprimé');
    } catch (error) {
      console.error('Error deleting material:', error);
      alert('Erreur de suppression');
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
            <li><a href={`/list-workersST/${idProjet}`}>Liste des employés</a></li>
            <li><a href={`/materialsST/${idProjet}`}>Liste des matériaux</a></li>
            <li><a href={"/stockST/"+idProjet}>visualiser stock</a></li>
            <li><a href={"/filesST/" + idProjet}>liste des fichiers</a></li>
            <li><a href={`/needsST/${idProjet}`}>Liste des besoins</a></li>
            <li>
              <a href={`/homeST`}>Liste des projets</a>
            </li>
          </ul>
        </aside>

        {/* Zone principale */}
        <main className="main-content">
          <div className="tables-container">
            {/* Matériels */}
            <div className="list-materials-container">
              <h2>Ajout d'un Matériel</h2>
              <div className="form-container">
                <input
                  type="text"
                  placeholder="Nom du matériel"
                  value={newMaterial.nom}
                  onChange={(e) => setNewMaterial({ ...newMaterial, nom: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Quantité"
                  value={newMaterial.qte}
                  onChange={(e) => setNewMaterial({ ...newMaterial, qte: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Prix"
                  value={newMaterial.prix}
                  onChange={(e) => setNewMaterial({ ...newMaterial, prix: e.target.value })}
                />
                <button onClick={handleAddMaterial}>Ajouter</button>
              </div>
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
                      <th>Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedMaterials.map((material) => (
                      <tr key={material.id}>
                        <td>{material.id}</td>
                        <td>{material.nom}</td>
                        <td>
                          <input
                            type="number"
                            value={material.qte}
                            onChange={(e) => handleQuantityChangeMaterial(material.id, e.target.value)}
                          />
                        </td>
                        <td>{material.prix}</td>
                        <td>
                          <button onClick={() => handleSaveMaterial(material)}>Enregistrer</button>
                        </td>
                        <td>
                          <button onClick={() => handleDeleteMaterial(material.id)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucun matériel trouvé pour ce projet.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StockST;
