import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Container, Avatar, IconButton, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from "../images/logo00.png"; // Import your logo
import NavBar2 from './NavBar2';
import NavBar from './NavBar.js';
import { set } from 'lodash';
import { setName, setUSERID, setPROJECTID } from './constants';

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({});
  const handleLoginClick = (e) => {
    e.preventDefault();
    if (id && password) {
      axios.get(`http://localhost:9092/assalaiskane/authenticate?id=${id}&pass=${password}`)
        .then(response => {
          setUser(response.data);
          if (response.data) {
            const user = response.data;
            setName(user.prenom + " " + user.nom);
            setUSERID(user.id);
            if (user.fonction === 'ChefChantier') {
              const id_resp = user.id;
              // Fetch the project ID for ChefChantier
              axios.get(`http://localhost:9092/assalaiskane/getProjet?id_resp=${user.id}`)
                .then(projetResponse => {
                  const id_projet = projetResponse.data[0].id;
                  setPROJECTID(id_projet);
                  navigate('/HomePage_ChefChantier/'+id_resp+'/'+id_projet);
                })
                .catch(error => {
                  console.error('Error fetching project ID:', error);
                  setError('An error occurred while fetching project ID');
                });
            } else {
              const id_resp = user.id; // Using the entered ID as the responsible ID for other roles
              switch (user.fonction) {
                case 'responsable_comptabiliter':
                  navigate('/AllProjectsList/'+id_resp);
                  break;
                case 'responsable_marchandise':
                  navigate('/AllProjectsListMarchandise/'+id_resp);
                  break;
                case 'responsable_projet':
                  navigate('/list-projects/'+id_resp);
                  break;
                case 'responsable_technique':
                  navigate('/list-tech-projects/'+id_resp);
                  break;
                case 'service_technique':
                  navigate('/list-service-projects/'+id_resp);
                  break;
                default:
                  setError('Role not recognized');
                  break;
              }
            }
          } else {
            setError('Invalid ID or password');
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setError('An error occurred while logging in');
        });
    } else {
      setError('Please enter both ID and password');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
      <NavBar />
      <Avatar sx={{ m: 1, bgcolor: 'transparent', border: '2px solid', borderColor: 'primary.main' }}>
        <img src={Logo} alt="Logo" style={{ width: 60, height: 60 }} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form noValidate onSubmit={handleLoginClick} style={{ width: '100%', mt: 1 }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="id"
          label="ID"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          autoComplete="id"
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        <Button
          fullWidth
          variant="text"
          color="secondary"
          onClick={() => navigate('/SignUP')}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
}

export default Login;
