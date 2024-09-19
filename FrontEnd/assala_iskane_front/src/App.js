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
import ListNeeds from './Components/Chef_Projet_Components/ListNeedsChefProjet';
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
import AllProjectsListMarchandise from './Components/Resp_Marchandise/AllProjectsListMarchandise';
import ListNeedsChefProjet from './Components/Chef_Projet_Components/ListNeedsChefProjet';
import ListMaterialsChefProjet from './Components/Chef_Projet_Components/ListMaterialsChefProjet';
import ListOuvrierChefProjet from './Components/Chef_Projet_Components/ListOuvrierChefProjet';
import ListAllOuvrierRespMarchandise from './Components/Resp_Marchandise/ListAllOuvrierRespMarchandise';
import DashboardRespMarchandise from './Components/Resp_Marchandise/DashboardRespMarchandise';
import ListerMaterialRespMarchandise from './Components/Resp_Marchandise/ListerMaterialRespMarchandise';
import ListMaterialsNeedChefProjet from './Components/Chef_Projet_Components/ListNeedsChefProjet';
import ListMaterialsNeedRespMarchandise from './Components/Resp_Marchandise/ListValidatedNeedsMar';




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
        <Route path="/HomePage_ServiceTechnique/:id_resp/:id_projet" element={<HomePage_ServiceTechnique/>} />
        <Route path="/list-service-projects/:id_projet" element={<ListServiceProjects />} />
        <Route path="/list-service-validated-needs/:id_resp/:id_projet" element={<ListServiceValidatedNeeds />} />
        <Route path="/list-service-files/:id_resp/:id_projet" element={<ListServiceFiles />} />
        <Route path="/ajouter-ouvrier/:id_resp/:id_projet" element={<AjouterOuvrier />} />
        <Route path="/list-service-Materials/:id_resp/:id_projet" element={<AjouterOuvrier />} />
        {/*--------------------------------------*/}
        
        {/*Responsable Technique*/}
        <Route path="/HomePage_RespTechnique/:id_resp/:id_projet" element={<HomePage_RespTechnique/>} />
        <Route path="/list-tech-projects/:id_projet" element={<ListTechProjects />} />
        <Route path="/list-tech-workers/:id_resp/:id_projet" element={<ListTechWorkersWithAbsence />} />
        <Route path="/list-tech-daily-reports/:id_resp/:id_projet" element={<ListTechDailyReports />} />
        <Route path="/list-tech-weekly-reports/:id_resp/:id_projet" element={<ListTechWeeklyReports />} />
        <Route path="/list-tech-progress/:id_resp/:id_projet" element={<ListTechProgress />} />
        <Route path="/list-tech-materials/:id_resp/:id_projet" element={<ListTechMaterials />} />
        <Route path="/list-tech-validated-needs/:id_resp/:id_projet" element={<ListValidatedNeeds />} />
        <Route path="/list-tech-files/:id_resp/:id_projet" element={<ListTechFiles />} />
        {/*--------------------------------------*/}

        {/*Chef De Projet  */}
        <Route path="/HomePage_ChefDeProjet/:id_resp/:id_projet" element={<HomePage_ResponsableDeProjet />} />
        <Route path="/list-projects/:id_resp" element={<ListProjects />} />
        <Route path="/daily-reports/:id_resp/:id_projet" element={<DailyReports />} />
        <Route path="/weekly-reports/:id_resp/:id_projet" element={<WeeklyReports />} />
        <Route path="/progress/:id_resp/:id_projet" element={<Progress />} />
        <Route path="/list-materials-chefProjet/:id_resp/:id_projet" element={<ListMaterialsChefProjet />} />
        <Route path="/list-workers-listOuvrierChefProjet/:id_resp/:id_projet" element={<ListOuvrierChefProjet />}/>
        <Route path="/ListMaterialsNeedChefProjet/:id_resp/:id_projet" element={<ListMaterialsNeedChefProjet />} />
        <Route path="/list-files/:id_resp/:id_projet" element={<ListFiles />} />
        {/*-------------------------------*/}

        {/*Chef Chantier  */}
        <Route path="/HomePage_ChefChantier/:id_resp/:id_projet" element={<HomePage_ChefChantier/>} />
        <Route path="/list-workers/:id_resp/:id_projet" element={<ListOuvrier />} />
        <Route path="/list-materials/:id_resp/:id_projet" element={<ListMaterials />} />
        <Route path="/declare-needs/:id_resp/:id_projet" element={<DeclareNeeds />} />
        
        {/*-------------------------------*/}

        {/*Responsable Comptabiliter*/}
        <Route path="/HomePage_RespComptabiliter/:id_resp/:id_projet" element={<HomePage_RespComptabiliter/>} />
        <Route path="/listAllOuvriers/:id_resp/:id_projet" element={<ListAllOuvrier />} />
        <Route path="/listFilesCompta/:id_resp/:id_projet" element={<ListFilesCompta />} />
        <Route path="/listValidatedNeedsCompta/:id_resp/:id_projet" element={<ListValidatedNeedsCompta />} />
        <Route path="/AllProjectsList/:id_projet/:id_resp/:id_projet" element={<AllProjectsList />} />
        
        
        {/*-------------------------------*/}

        {/*Responsable Marchandise*/}
        <Route path="/HomePage_RespMarchandise/:id_resp/:id_projet" element={<HomePage_RespMarchandise/>} />
        <Route path="/ListAllOuvrierRespMarchandise/:id_resp/:id_projet" element={<ListAllOuvrierRespMarchandise/>} />
        <Route path="/listFilesMarchandise/:id_resp/:id_projet" element={<ListFilesMar />} />
        <Route path="/listValidatedNeedsMarchandise/:id_resp/:id_projet" element={<ListServiceValidatedNeedsMar />} />
        <Route path="/AllProjectsListMarchandise/:id_resp" element={<AllProjectsListMarchandise />} />
        <Route path="/DashboardRespMarchandise" element={<DashboardRespMarchandise/>} />
        <Route path="/ListMaterialsNeedRespMarchandise/:id_resp/:id_projet" element={<ListMaterialsNeedRespMarchandise />} />
        
        {/*-------------------------------*/}
        
        {/*Responsable Technique
        <Route path="/ResponsableTechnique" element={<HomePage_RespTechnique/>} />*/}
        {/*-------------------------------*/}
      </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
