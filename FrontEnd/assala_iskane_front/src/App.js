import './CSS/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import NavBar from './Components/NavBar';
import Loading from './Components/Loading';
import HomePage_ChefChantier from './Components/Chef_Chantier_Components/HomePage_ChefChantier';
import HomePage_RespComptabiliter from './Components/Resp_Comptabiliter/HomePage_RespComptabiliter';
import HomePage_RespMarchandise from './Components/Resp_Marchandise/HomePage_RespMarchandise';
import HomePage_ResponsableDeProjet from './Components/Chef_Projet_Components/HomePage_ResponsableDeProjet';
import HomePage_RespTechnique from './Components/Responsable_Technique_Components/HomePage_RespTechnique';
import HomePage_ServiceTechnique from './Components/Service_Technique_Components/HomePage_ServiceTechnique';
import ListOuvrier from './Components/Chef_Chantier_Components/ListOuvrier';
import ListMaterials from './Components/Chef_Chantier_Components/ListMaterials';
import DeclareNeeds from './Components/Chef_Chantier_Components/DeclareNeeds';
import WeeklyReports from './Components/Chef_Projet_Components/WeeklyReports';
import Progress from './Components/Chef_Projet_Components/Progress';
import ListNeeds from './Components/Chef_Projet_Components/ListNeeds';
import ListTechProjects from './Components/Responsable_Technique_Components/ListTechProjects';
import ListTechWorkersWithAbsence from './Components/Responsable_Technique_Components/ListTechWorkersWithAbsence';
import ListTechDailyReports from './Components/Responsable_Technique_Components/ListTechDailyReports';
import ListTechWeeklyReports from './Components/Responsable_Technique_Components/ListTechWeeklyReports';
import ListTechProgress from './Components/Responsable_Technique_Components/ListTechProgress';
import ListTechMaterials from './Components/Responsable_Technique_Components/ListTechMaterials';
import ListValidatedNeeds from './Components/Responsable_Technique_Components/ListValidatedNeeds';
import ListTechFiles from './Components/Responsable_Technique_Components/ListTechFiles';
import ListServiceProjects from './Components/Service_Technique_Components/ListServiceProjects';
import ListServiceValidatedNeeds from './Components/Service_Technique_Components/ListServiceValidatedNeeds';
import ListServiceFiles from './Components/Service_Technique_Components/ListServiceFiles';
import AjouterOuvrier from './Components/Service_Technique_Components/AjouterOuvrier';
import ListFiles from './Components/Chef_Projet_Components/ListFiles';
import DailyReports from './Components/Chef_Projet_Components/DailyReports';
import ListProjects from './Components/Chef_Projet_Components/ListProjects';
import ListAllOuvrier from './Components/Resp_Comptabiliter/ListAllOuvrier';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import ListFilesCompta from './Components/Resp_Comptabiliter/ListFilesCompta';
import ListValidatedNeedsCompta from './Components/Resp_Comptabiliter/ListValidatedNeedsCompta';
import ListFilesMar from './Components/Resp_Marchandise/ListFilesMarchandise';
import ListServiceValidatedNeedsMar from './Components/Resp_Marchandise/ListValidatedNeedsMar';
import AllProjectsList from './Components/Resp_Comptabiliter/AllProjectsList';




function App() {
  const [isLoading, setIsLoading] = useState(true);
  const theme = createTheme();
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
    <ThemeProvider theme={theme}>
      {/* Your app components */}
    
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
        <Route path="/list-service-Materials" element={<AjouterOuvrier />} />
        {/*--------------------------------------*/}
        
        {/*Responsable Technique*/}
        <Route path="/HomePage_RespTechnique" element={<HomePage_RespTechnique/>} />
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

        {/*Responsable Comptabiliter*/}
        <Route path="/HomePage_RespComptabiliter" element={<HomePage_RespComptabiliter/>} />
        <Route path="/listAllOuvriers" element={<ListAllOuvrier />} />
        <Route path="/listFilesCompta" element={<ListFilesCompta />} />
        <Route path="/listValidatedNeedsCompta" element={<ListValidatedNeedsCompta />} />
        <Route path="/AllProjectsList" element={<AllProjectsList />} />
        
        
        {/*-------------------------------*/}

        {/*Responsable Marchandise*/}
        <Route path="/HomePage_RespMarchandise" element={<HomePage_RespMarchandise/>} />
        <Route path="/listAllOuvriers" element={<ListAllOuvrier />} />
        <Route path="/listFilesMarchandise" element={<ListFilesMar />} />
        <Route path="/listValidatedNeedsMarchandise" element={<ListServiceValidatedNeedsMar />} />
        {/*-------------------------------*/}
        
        {/*Responsable Technique*/}
        <Route path="/ResponsableTechnique" element={<HomePage_RespTechnique/>} />
        {/*-------------------------------*/}
      </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
