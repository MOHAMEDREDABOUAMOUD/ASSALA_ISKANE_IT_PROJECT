import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.js';
import Home from './components/home.js';
import './css/style.css'; // Importation des styles
import Contact from './components/contact.js';
import HomeCC from './components/chef_chantier/home.js';
import OuvriersList from './components/chef_chantier/ouvriersList.js';
import OuvriersAbsences from './components/chef_chantier/ouvriersListWA.js';
import ListMaterials from './components/chef_chantier/list_materials.js';
import NeedsList from './components/chef_chantier/needsList.js';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/homeCC/:id_projet" element={<HomeCC />} />
          <Route path="/list-workers/:idProjet" element={<OuvriersList />} />
          <Route path="/absences/:idProjet" element={<OuvriersAbsences />} />
          <Route path="/materials/:idProjet" element={<ListMaterials />} />
          <Route path="/needs/:idProjet" element={<NeedsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
