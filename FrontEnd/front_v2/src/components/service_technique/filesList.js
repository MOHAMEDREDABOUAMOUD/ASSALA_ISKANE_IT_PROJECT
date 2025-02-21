import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../images/logo00.png';
import { useParams } from 'react-router-dom';
import { FaDownload, FaTrash } from 'react-icons/fa';
import api from '../../utils/api';

const FileListST = () => {
  const { idProjet } = useParams();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  // Récupérer les fichiers depuis le backend
  useEffect(() => {
    axios
      .get(`http://localhost:9092/assalaiskane/getFichiersProjet?id_projet=${idProjet}`)
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
        setError('Une erreur est survenue lors de la récupération des fichiers.');
      });
  }, [idProjet]);

  // Gestion de la sélection de fichier
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Téléverser un fichier
  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('nom', selectedFile.name); // Nom réel du fichier
      formData.append('fichier', selectedFile);
      formData.append('id_projet', idProjet);

      // Ajouter le fichier à la liste localement avant l'appel backend
      setFiles([...files, { nom: selectedFile.name, fichier: selectedFile }]);

      axios
        .post('http://localhost:9092/assalaiskane/AddFichier', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('File uploaded successfully:', response.data);
          setSelectedFile(null); // Réinitialise le fichier sélectionné
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          setError('Une erreur est survenue lors de l’ajout du fichier.');
        });
    } else {
      alert('Veuillez sélectionner un fichier à téléverser.');
    }
  };

  // Fonction pour télécharger un fichier
  const handleDownload = (file) => {
    const byteCharacters = atob(file.fichier); // Si le fichier est en base64
    const byteArray = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: 'application/octet-stream' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', file.nom);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Fonction pour supprimer un fichier
  const handleDelete = async (fileId) => {
    try {
      // Appel de l'API pour supprimer le fichier
      await api.post(`http://localhost:9092/assalaiskane/RemoveFichier?id=${fileId}`);
  
      // Si la suppression est réussie, mettre à jour l'état local et afficher un message de succès
      setFiles(files.filter((file) => file.id !== fileId));
      alert('Fichier supprimé avec succès!');
    } catch (error) {
      // Si une erreur se produit, afficher un message d'erreur
      console.error('Error deleting file:', error);
      alert('Une erreur est survenue lors de la suppression du fichier.');
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
              <a href={`/absencesST/${idProjet}`}>Liste des employés</a>
            </li>
            <li>
              <a href={`/materialsST/${idProjet}`}>Liste des matériels</a>
            </li>
            <li><a href={"/stockST/"+idProjet}>visualiser stock</a></li>
            <li>
              <a href={`/filesST/${idProjet}`}>Liste des fichiers</a>
            </li>
            <li>
                <a href={`/needsST/${idProjet}`}>Liste des besoins</a>
            </li>
            <li>
              <a href={`/homeST`}>Liste des projets</a>
            </li>
          </ul>
        </aside>

        {/* Zone principale */}
        <main className="main-content">
          <div className="file-list-container">
            <h2>Ajouter un Fichier</h2>
            <div className="file-upload">
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleFileUpload}>Téléverser</button>
            </div>
            {error && <p className="error-message">{error}</p>}

            <h2>Liste des Fichiers</h2>
            {files.length > 0 ? (
              <table className="files-table">
                <thead>
                  <tr>
                    <th>Nom du fichier</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={index}>
                      <td>{file.nom}</td> {/* Affichage du nom sans lien */}
                      <td>
                        <button onClick={() => handleDownload(file)}>
                          <FaDownload />
                        </button>
                        <button onClick={() => handleDelete(file.id)} style={{ marginLeft: '10px' }}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun fichier trouvé pour ce projet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FileListST;
