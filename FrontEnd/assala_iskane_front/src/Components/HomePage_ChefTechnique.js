import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../CSS/Home.css';

export default function HomePage_ChefTechnique() {
    const navigate = useNavigate();

    const handleMenuClick = (path) => {
      navigate(path);
    };
  
    return (
      <div>
        <h1>Chef Technique Dashboard</h1>
        <div className="menu">
          <button onClick={() => handleMenuClick('/list-tech-projects')}>Lister tous les projets</button>
          <button onClick={() => handleMenuClick('/list-tech-workers')}>Lister les ouvriers avec l’absence</button>
          <button onClick={() => handleMenuClick('/list-tech-daily-reports')}>Lister les rapports du jour</button>
          <button onClick={() => handleMenuClick('/list-tech-weekly-reports')}>Lister les rapports hebdomadaires</button>
          <button onClick={() => handleMenuClick('/list-tech-progress')}>Lister les avancements</button>
          <button onClick={() => handleMenuClick('/list-tech-materials')}>Lister la quantité des matériels</button>
          <button onClick={() => handleMenuClick('/list-tech-validated-needs')}>Lister les besoins validés</button>
          <button onClick={() => handleMenuClick('/list-tech-files')}>Lister/Ajouter des fichiers</button>
        </div>
      </div>
    );
}
