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
        <Route path="/SignUP" element={<SignUp/>} />
        
        {/*--------------------------------------*/}
        <Route path="/HomePage_ChefChantier" element={<HomePage_ChefChantier/>} />
        <Route path="/HomePage_RespComptabiliter" element={<HomePage_RespComptabiliter/>} />
        <Route path="/HomePage_RespMarchandise" element={<HomePage_RespMarchandise/>} />
        <Route path="/ResponsableDeProjet" element={<HomePage_ResponsableDeProjet/>} />
        <Route path="/ResponsableTechnique" element={<HomePage_RespTechnique/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
