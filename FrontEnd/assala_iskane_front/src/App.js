import './CSS/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import NavBar from './Components/NavBar';
import Loading from './Components/Loading';
import HomePage_ChefChantier from './Components/HomePage_ChefChantier';
import HomePage_RespComptabiliter from './Components/HomePage_RespComptabiliter';
import HomePage_RespMarchandise from './Components/HomePage_RespMarchandise';
import HomePage_ResponsableDeProjet from './Components/HomePage_ResponsableDeProjet';
import HomePage_RespTechnique from './Components/HomePage_RespTechnique';
import HomePage_ServiceTechnique from './Components/HomePage_ServiceTechnique';
import HomePage_ChefTechnique from './Components/HomePage_ChefTechnique';
import ListOuvrier from './Components/Chef_Chantier_Components/ListOuvrier';
import ListMaterials from './Components/Chef_Chantier_Components/ListMaterials';
import DeclareNeeds from './Components/Chef_Chantier_Components/DeclareNeeds';
import ListProjects from './Components/Chef_Projet_Components/ListProjects';
import ListWorkersWithAbsence from './Components/Chef_Projet_Components/ListWorkersWithAbsence';
import DailyReports from './Components/Chef_Projet_Components/DailyReports';
import WeeklyReports from './Components/Chef_Projet_Components/WeeklyReports';
import Progress from './Components/Chef_Projet_Components/Progress';
import ListNeeds from './Components/Chef_Projet_Components/ListNeeds';
import ListFiles from './Components/Chef_Projet_Components/ListFiles';
import ListTechProjects from './Components/Chef_Technique_Components/ListTechProjects';
import ListTechWorkersWithAbsence from './Components/Chef_Technique_Components/ListTechWorkersWithAbsence';
import ListTechDailyReports from './Components/Chef_Technique_Components/ListTechDailyReports';
import ListTechWeeklyReports from './Components/Chef_Technique_Components/ListTechWeeklyReports';
import ListTechProgress from './Components/Chef_Technique_Components/ListTechProgress';
import ListTechMaterials from './Components/Chef_Technique_Components/ListTechMaterials';
import ListValidatedNeeds from './Components/Chef_Technique_Components/ListValidatedNeeds';
import ListTechFiles from './Components/Chef_Technique_Components/ListTechFiles';
import ListServiceProjects from './Components/Service_Technique_Components/ListServiceProjects';
import ListServiceValidatedNeeds from './Components/Service_Technique_Components/ListServiceValidatedNeeds';
import ListServiceFiles from './Components/Service_Technique_Components/ListServiceFiles';
import AjouterOuvrier from './Components/Service_Technique_Components/AjouterOuvrier';



function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
          setIsLoading(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
      return <Loading />;
  }

  return (
    <Router>
    <NavBar />
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/logout" element={<Login/>} />
        <Route path="/SignUP" element={<SignUp/>} />
        
        {/*--------------------------------------*/}

        {/*Chef Technique Service Technique*/}
        <Route path="/HomePage_ServiceTechnique" element={<HomePage_ServiceTechnique/>} />
        <Route path="/list-service-projects" element={<ListServiceProjects />} />
        <Route path="/list-service-validated-needs" element={<ListServiceValidatedNeeds />} />
        <Route path="/list-service-files" element={<ListServiceFiles />} />
        <Route path="/ajouter-ouvrier" element={<AjouterOuvrier />} />
        {/*--------------------------------------*/}
        
        {/*Chef Technique*/}
        <Route path="/HomePage_ChefTechnique" element={<HomePage_ChefTechnique/>} />
        <Route path="/list-tech-projects" element={<ListTechProjects />} />
        <Route path="/list-tech-workers" element={<ListTechWorkersWithAbsence />} />
        <Route path="/list-tech-daily-reports" element={<ListTechDailyReports />} />
        <Route path="/list-tech-weekly-reports" element={<ListTechWeeklyReports />} />
        <Route path="/list-tech-progress" element={<ListTechProgress />} />
        <Route path="/list-tech-materials" element={<ListTechMaterials />} />
        <Route path="/list-tech-validated-needs" element={<ListValidatedNeeds />} />
        <Route path="/list-tech-files" element={<ListTechFiles />} />
        {/*--------------------------------------*/}

        {/*Chef De Projet  */}
        <Route path="/HomePage_ChefDeProjet" element={<HomePage_ResponsableDeProjet />} />
        <Route path="/list-projects" element={<ListProjects />} />
        <Route path="/list-workersAbsence" element={<ListWorkersWithAbsence />} />
        <Route path="/daily-reports" element={<DailyReports />} />
        <Route path="/weekly-reports" element={<WeeklyReports />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/list-materials" element={<ListMaterials />} />
        <Route path="/list-needs" element={<ListNeeds />} />
        <Route path="/list-files" element={<ListFiles />} />
        {/*-------------------------------*/}

        {/*Chef Chantier  */}
        <Route path="/HomePage_ChefChantier" element={<HomePage_ChefChantier/>} />
        <Route path="/list-workers" element={<ListOuvrier />} />
        <Route path="/list-materials" element={<ListMaterials />} />
        <Route path="/declare-needs" element={<DeclareNeeds />} />
        {/*-------------------------------*/}

        <Route path="/HomePage_RespComptabiliter" element={<HomePage_RespComptabiliter/>} />
        <Route path="/HomePage_RespMarchandise" element={<HomePage_RespMarchandise/>} />
        <Route path="/ResponsableTechnique" element={<HomePage_RespTechnique/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
