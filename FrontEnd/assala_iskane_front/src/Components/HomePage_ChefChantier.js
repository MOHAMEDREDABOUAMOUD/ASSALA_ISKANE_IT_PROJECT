import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Home.css';

export default function HomePage_ChefChantier() {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Chef Chantier Dashboard</h1>
      <div className="menu">
        <button onClick={() => handleMenuClick('/list-workers')}>Lister les ouvriers et marquer l’absence</button>
        <button onClick={() => handleMenuClick('/list-materials')}>Lister la quantité des matériels et des matériaux disponibles</button>
        <button onClick={() => handleMenuClick('/declare-needs')}>Déclarer des besoins</button>
      </div>
    </div>
  );
}
