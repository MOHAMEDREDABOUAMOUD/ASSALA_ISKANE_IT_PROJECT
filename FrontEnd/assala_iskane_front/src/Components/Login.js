import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Container, Avatar, IconButton, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from "../images/logo00.png"; // Import your logo

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
          setUser(response.data); // Wrap the response in an array
          if (response.data) {
            // Navigate to different pages based on the user's role
            switch (response.data.fonction) {
              case 'ChefChantier':
                navigate('/HomePage_ChefChantier');
                break;
              case 'responsable_comptabiliter':
                navigate('/HomePage_RespComptabiliter');
                break;
              case 'responsable_marchandise':
                navigate('/HomePage_RespMarchandise');
                break;
              case 'responsable_projet':
                navigate('/HomePage_ResponsableDeProjet');
                break;
              case 'responsable_technique':
                navigate('/HomePage_RespTechnique');
                break;
              case 'service_technique':
                navigate('/HomePage_ServiceTechnique');
                break;
              case 'chef_technique':
                navigate('/HomePage_ChefTechnique');
                break;
              case 'chef_projet':
                navigate('/HomePage_ChefDeProjet');
                break;
              default:
                setError('Role not recognized');
                break;
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
