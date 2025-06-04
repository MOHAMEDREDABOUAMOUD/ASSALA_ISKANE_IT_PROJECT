import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.js';
import Home from './components/home.js';
import './css/style.css'; // Importation des styles
import Contact from './components/contact.js';
import HomeCC from './components/chef_chantier/home.js';
import OuvriersList from './components/chef_chantier/ouvriersList.js';
import OuvriersAbsences from './components/chef_chantier/ouvriersListWA.js';
import OuvriersAbsencesCP from './components/chef_projet/ouvriersListWA.js';
import ListMaterials from './components/chef_chantier/list_materials.js';
import ListMaterialsCP from './components/chef_projet/list_materials.js';
import NeedsList from './components/chef_chantier/needsList.js';
import HomeCP from './components/chef_projet/homeCP.js';
import HomePCP from './components/chef_projet/homePCP.js';
import FileList from './components/chef_projet/filesList.js';
import NeedsListCP from './components/chef_projet/needsList.js';
import HomeRT from './components/responsable_technique/homeRT.js';
import HomePRT from './components/responsable_technique/homePRT.js';
import OuvriersAbsencesRT from './components/responsable_technique/ouvriersListWA.js';
import ListMaterialsRT from './components/responsable_technique/list_materials.js';
import NeedsListRT from './components/responsable_technique/needsList.js';
import FileListRT from './components/responsable_technique/filesList.js';
import HomeRC from './components/responsable_comptabilité/homeRC.js';
import HomePRC from './components/responsable_comptabilité/homePRC.js';
import OuvriersAbsencesRC from './components/responsable_comptabilité/ouvriersListWA.js';
import NeedsListRC from './components/responsable_comptabilité/needsList.js';
import FileListRC from './components/responsable_comptabilité/filesList.js';
import HomeRM from './components/responsable_marchandise/homeRM.js';
import HomePRM from './components/responsable_marchandise/homePRM.js';
import OuvriersAbsencesRM from './components/responsable_marchandise/ouvriersListWA.js';
import ListMaterialsRM from './components/responsable_marchandise/list_materials.js';
import NeedsListRM from './components/responsable_marchandise/needsList.js';
import FileListRM from './components/responsable_marchandise/filesList.js';
import HomeST from './components/service_technique/homeST.js';
import HomePST from './components/service_technique/homePST.js';
import OuvriersAbsencesST from './components/service_technique/ouvriersListWA.js';
import ListMaterialsST from './components/service_technique/list_materials.js';
import NeedsListST from './components/service_technique/needsList.js';
import FileListST from './components/service_technique/filesList.js';
import AddProject from './components/service_technique/add_projet.js';
import StockST from './components/service_technique/stockST.js';
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
          
          <Route path="/homeCP" element={<HomeCP />} />
          <Route path="/homePCP/:idProjet" element={<HomePCP />} />
          <Route path="/absencesCP/:idProjet" element={<OuvriersAbsencesCP />} />
          <Route path="/materialsCP/:idProjet" element={<ListMaterialsCP />} />
          <Route path="/needsCP/:idProjet" element={<NeedsListCP />} />
          <Route path="/files/:idProjet" element={<FileList />} />
          
          <Route path="/homeRT" element={<HomeRT />} />
          <Route path="/homePRT/:idProjet" element={<HomePRT />} />
          <Route path="/absencesRT/:idProjet" element={<OuvriersAbsencesRT />} />
          <Route path="/materialsRT/:idProjet" element={<ListMaterialsRT />} />
          <Route path="/needsRT/:idProjet" element={<NeedsListRT />} />
          <Route path="/filesRT/:idProjet" element={<FileListRT />} />
          
          <Route path="/homeRC" element={<HomeRC />} />
          <Route path="/homePRC/:idProjet" element={<HomePRC />} />
          <Route path="/absencesRC/:idProjet" element={<OuvriersAbsencesRC />} />
          <Route path="/needsRC/:idProjet" element={<NeedsListRC />} />
          <Route path="/filesRC/:idProjet" element={<FileListRC />} />
          
          <Route path="/homeRM" element={<HomeRM />} />
          <Route path="/homePRM/:idProjet" element={<HomePRM />} />
          <Route path="/absencesRM/:idProjet" element={<OuvriersAbsencesRM />} />
          <Route path="/materialsRM/:idProjet" element={<ListMaterialsRM />} />
          <Route path="/needsRM/:idProjet" element={<NeedsListRM />} />
          <Route path="/filesRM/:idProjet" element={<FileListRM />} />

          <Route path="/homeST" element={<HomeST />} />
          <Route path="/homePST/:idProjet" element={<HomePST />} />
          <Route path="/absencesST/:idProjet" element={<OuvriersAbsencesST />} />
          <Route path="/materialsST/:idProjet" element={<ListMaterialsST />} />
          <Route path="/stockST/:idProjet" element={<StockST />} />
          <Route path="/needsST/:idProjet" element={<NeedsListST />} />
          <Route path="/filesST/:idProjet" element={<FileListST />} />
          <Route path="/addProjet" element={<AddProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
