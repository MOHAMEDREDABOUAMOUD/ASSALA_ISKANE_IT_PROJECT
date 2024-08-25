import React, { useState } from 'react';
import '../CSS/Login_singin.css';
import Logo from '../images/logo00.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numero, setNumero] = useState('');
  const [fonction, setFonction] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    // Send the data to the backend
    axios.post('http://localhost:9092/assalaiskane/AddUser?id='+id+'&nom='+nom+'&prenom='+prenom+'&fonction='+fonction+'&numero='+numero+'&pass='+password)
      .then(response => {
        console.log('User signed up successfully:', response.data);
        navigate('/Login');
      })
      .catch(error => {
        console.error('There was an error signing up the user:', error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <div className="SignIn-container">
      <div className="login-form-container">
        <div className="login-logo-container">
          <img src={Logo} alt="Logo" className="login-logo" />
        </div>
        <h2 className="login-title">Sign In</h2>
        <form onSubmit={handleSignUp}>
          <Box mb={2}>
            <TextField
              label="Id"
              type="text"
              id="id"
              name="id"
              variant="outlined"
              fullWidth
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              id="password"
              name="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Nom"
              type="text"
              id="nom"
              name="nom"
              variant="outlined"
              fullWidth
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Prenom"
              type="text"
              id="prenom"
              name="prenom"
              variant="outlined"
              fullWidth
              required
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Numero"
              type="text"
              id="numero"
              name="numero"
              variant="outlined"
              fullWidth
              required
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="fonction-label">Type de Users</InputLabel>
              <Select
                labelId="fonction-label"
                id="fonction"
                name="fonction"
                label="Type de Users"
                required
                value={fonction}
                onChange={(e) => setFonction(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select...</em>
                </MenuItem>
                <MenuItem value="chef_chantier">Chef Chantier</MenuItem>
                <MenuItem value="responsable_technique">Responsable Technique</MenuItem>
                <MenuItem value="responsable_projet">Responsable de Projet</MenuItem>
                <MenuItem value="responsable_comptabilite">Responsable de Comptabilité</MenuItem>
                <MenuItem value="responsable_marchandise_logistique">Responsable de Marchandise et Logistique</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            className="signIn2-button"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
