import React from 'react';
import '../CSS/Login_singin.css';
import Logo from '../images/logo00.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

export default function SignUp() {
  return (
    <div className="SignIn-container">
      <div className="login-form-container">
        <div className="login-logo-container">
          <img src={Logo} alt="Logo" className="login-logo" />
        </div>
        <h2 className="login-title">Sign In</h2>
        <form>
          <Box mb={2}>
            <TextField
              label="Email"
              type="email"
              id="email"
              name="email"
              variant="outlined"
              fullWidth
              required
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
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="userType-label">Type de Users</InputLabel>
              <Select
                labelId="userType-label"
                id="userType"
                name="userType"
                label="Type de Users"
                required
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
