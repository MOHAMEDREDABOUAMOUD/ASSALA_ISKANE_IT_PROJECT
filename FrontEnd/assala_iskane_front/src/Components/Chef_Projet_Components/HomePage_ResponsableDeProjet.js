import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../CSS/Home.css'; // Add any custom CSS if needed

export default function HomePage_ResponsableDeProjet() {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Chef de Projet Dashboard</h1>
      <div className="menu">
        <button onClick={() => handleMenuClick('/list-projects')}>Lister tous les projets</button>
        <button onClick={() => handleMenuClick('/list-workers')}>Lister les ouvriers avec l’absence</button>
        <button onClick={() => handleMenuClick('/daily-reports')}>Lister/Ajouter les rapports du jour</button>
        <button onClick={() => handleMenuClick('/weekly-reports')}>Lister/Ajouter les rapports hebdomadaires</button>
        <button onClick={() => handleMenuClick('/progress')}>Lister/Ajouter les avancements</button>
        <button onClick={() => handleMenuClick('/list-materials')}>Lister la quantité des matériels</button>
        <button onClick={() => handleMenuClick('/list-needs')}>Lister/Valider les besoins du chef chantier</button>
        <button onClick={() => handleMenuClick('/list-files')}>Lister/Ajouter des fichiers</button>
      </div>
    </div>
  );
}
