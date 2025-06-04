import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../images/logo00.png';
import api from '../../utils/api';
import { FaTrash } from 'react-icons/fa';

const ListMaterialsST = () => {
  const { idProjet } = useParams();
  const [materials, setMaterials] = useState([]);
  const [materiaux, setMateriaux] = useState([]);
  const [searchedMaterials, setSearchedMaterials] = useState([]);
  const [searchedMateriaux, setSearchedMateriaux] = useState([]);
  const [searchMaterials, setSearchMaterials] = useState('');
  const [searchMateriaux, setSearchMateriaux] = useState('');
  const [newMaterial, setNewMaterial] = useState({ nom: '', qte: '', prix: '' });
  const [newMateriau, setNewMateriau] = useState({ nom: '', type: '', qte: '', prix: '' });
  const navigate = useNavigate();

  const [stockMaterials, setStockMaterials] = useState([]);

  useEffect(() => {
    const fetchStockMaterials = async () => {
      try {
        const response = await api.get('http://localhost:9092/assalaiskane/getMateriels');
        setStockMaterials(response.data);
      } catch (error) {
        console.error('Error fetching stock materials:', error);
      }
    };

    fetchStockMaterials();
  }, []);

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
            qte_stock: material.materiel.qte,
            prix: material.materiel.prix,
            diff: 0
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

  const handleAddMaterial = async () => {
    if (newMaterial.id && newMaterial.qte) {
      try {
        const selectedMaterial = stockMaterials.find(material => material.id === parseInt(newMaterial.id));
        if (!selectedMaterial) {
          alert('Matériel non trouvé dans le stock');
          return;
        }

        const { id, nom, prix } = selectedMaterial;
        const qte = parseInt(newMaterial.qte);

        if (qte > selectedMaterial.qte) {
          alert('La quantité demandée dépasse la quantité disponible en stock');
          return;
        }

        const response = await api.post(
          `http://localhost:9092/assalaiskane/addMateriel?id_materiel=${id}&qte=${qte}&idProjet=${idProjet}`
        );

        setMaterials((prev) => [...prev, { id: selectedMaterial.id, nom, qte, prix }]);
        setNewMaterial({ id: '', qte: '' });
        alert('Le matériel a été bien ajouté');
      } catch (error) {
        console.error('Error adding material:', error);
        alert(error.message);
      }
    }
  };

  const handleAddMateriau = async () => {
    if (newMateriau.nom && newMateriau.qte && newMateriau.prix) {
      try {
        const { nom, type, qte, prix } = newMateriau;
        const response = await api.post(
          `http://localhost:9092/assalaiskane/addMateriaux?nom=${nom}&type=${type}&qte=${qte}&prix=${prix}&idProjet=${idProjet}`
        );
        // const addedMateriau = response.data;
        setMateriaux((prev) => [...prev, newMaterial]); // Mise à jour de la liste
        setNewMateriau({ nom: '', type: '', qte: '', prix: '' });
        alert('Le matériau a été bien ajouté');
      } catch (error) {
        console.error('Error adding materiau:', error);
        alert(error.message);
      }
    }
  };
  const handleQuantityChangeMaterial = (id, value) => {
    if (value < 0) return;
    setSearchedMaterials((prev) =>
      prev.map((material) => {
        console.log(value - material.qte + material.diff);
        return material.id === id ? { ...material, diff: value - material.qte + material.diff, qte: value } : material;
      })
    );
  };

  const handleSaveMaterial = async (material) => {
    try {
      if (material.qte_stock - material.diff < 0) {
        alert('vous avez depasser le nombre de ce materiel existant dans le stock');
        return;
      }
      console.log("qte stock : " + (material.qte_stock - material.diff));
      const response = await api.post(
        `http://localhost:9092/assalaiskane/updateMateriel?id=${material.id}&qte=${material.qte}&qte_stock=${(material.qte_stock - material.diff)}`
      );
      setSearchedMaterials((prev) =>
        prev.map((mat) =>
          mat.id === material.id ? { ...mat, qte: material.qte, qte_stock: material.qte_stock - material.diff, diff: 0 } : mat
        )
      );
      alert('Quantité mise à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du matériel', error);
      alert('Erreur de mise à jour');
    }
  };

  const handleQuantityChangeMateriau = (id, value) => {
    setSearchedMateriaux((prev) =>
      prev.map((materiau) =>
        materiau.id === id ? { ...materiau, qte: value } : materiau
      )
    );
  };

  const handleSaveMateriau = async (materiau) => {
    try {
      const response = await api.post(
        `http://localhost:9092/assalaiskane/updateMateriaux?id=${materiau.id}&qte=${materiau.qte}`
      );
      setSearchedMateriaux((prev) =>
        prev.map((mat) =>
          mat.id === materiau.id ? { ...mat, qte: materiau.qte } : mat
        )
      );
      alert('Quantité mise à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du matériau', error);
      alert('Erreur de mise à jour');
    }
  };

  const handleDeleteMaterial = async (id, qte) => {
    try {
      await api.post(
        `http://localhost:9092/assalaiskane/deleteMateriel?id=${id}&qte=${qte}`
      );
      setSearchedMaterials((prev) => prev.filter((material) => material.id !== id));
      alert('Matériel supprimé');
    } catch (error) {
      console.error('Error deleting material:', error);
      alert('Erreur de suppression');
    }
  };

  const handleDeleteMateriau = async (id) => {
    try {
      await api.post(
        `http://localhost:9092/assalaiskane/deleteMateriau?id=${id}`
      );
      setSearchedMateriaux((prev) => prev.filter((materiau) => materiau.id !== id));
      alert('Matériau supprimé');
    } catch (error) {
      console.error('Error deleting materiau:', error);
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
            <li><a href={"/stockST/" + idProjet}>visualiser stock</a></li>
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
                <div>
                  <label>Nom du matériel:</label>
                  <div className="select-container">
                    <select value={newMaterial.id} onChange={(e) => setNewMaterial({ ...newMaterial, id: e.target.value })}>
                      <option value="">Sélectionnez un matériel</option>
                      {stockMaterials.map((material) => (
                        <option key={material.id} value={material.id}>{material.nom}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label>Quantité:</label>
                  <input type="number" value={newMaterial.qte} onChange={(e) => setNewMaterial({ ...newMaterial, qte: e.target.value })} />
                </div>
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
                          <button onClick={() => handleDeleteMaterial(material.id, material.qte)}>
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

            {/* Matériaux */}
            <div className="list-materials-container">
              <h2>Ajout d'un Matériau</h2>
              <div className="form-container">
                <input
                  type="text"
                  placeholder="Nom du matériau"
                  value={newMateriau.nom}
                  onChange={(e) => setNewMateriau({ ...newMateriau, nom: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Type du matériau"
                  value={newMateriau.type}
                  onChange={(e) => setNewMateriau({ ...newMateriau, type: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Quantité"
                  value={newMateriau.qte}
                  onChange={(e) => setNewMateriau({ ...newMateriau, qte: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Prix"
                  value={newMateriau.prix}
                  onChange={(e) => setNewMateriau({ ...newMateriau, prix: e.target.value })}
                />
                <button onClick={handleAddMateriau}>Ajouter</button>
              </div>
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
                      <th>Type</th>
                      <th>Quantité</th>
                      <th>Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedMateriaux.map((materiau) => (
                      <tr key={materiau.id}>
                        <td>{materiau.id}</td>
                        <td>{materiau.nom}</td>
                        <td>{materiau.type}</td>
                        <td>
                          <input
                            type="number"
                            value={materiau.qte}
                            onChange={(e) => handleQuantityChangeMateriau(materiau.id, e.target.value)}
                          />
                        </td>
                        <td>{materiau.prix}</td>
                        <td>
                          <button onClick={() => handleSaveMateriau(materiau)}>Enregistrer</button>
                        </td>
                        <td>
                          <button onClick={() => handleDeleteMateriau(materiau.id)}>
                            <FaTrash />
                          </button>
                        </td>
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

export default ListMaterialsST;
