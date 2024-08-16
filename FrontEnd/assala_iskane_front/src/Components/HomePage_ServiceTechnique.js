import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../CSS/Home.css';

export default function HomePage_ServiceTechnique() {
    const navigate = useNavigate();

    const handleMenuClick = (path) => {
      navigate(path);
    };
  
    return (
      <div>
        <h1>Service Technique Dashboard</h1>
        <div className="menu">
          <button onClick={() => handleMenuClick('/list-service-projects')}>Lister tous les projets</button>
          <button onClick={() => handleMenuClick('/list-service-validated-needs')}>Lister les besoins validés</button>
          <button onClick={() => handleMenuClick('/list-service-files')}>Lister/Ajouter des fichiers</button>
        </div>
      </div>
    );
}
