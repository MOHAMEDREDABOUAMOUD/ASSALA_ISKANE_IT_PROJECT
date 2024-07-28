import './CSS/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import NavBar from './Components/NavBar';
import Loading from './Components/Loading';



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
      </Routes>
      </div>
    </Router>
  );
}

export default App;
