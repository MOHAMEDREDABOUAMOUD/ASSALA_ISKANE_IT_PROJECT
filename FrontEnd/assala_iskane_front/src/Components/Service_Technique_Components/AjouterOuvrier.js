import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert, 
  Paper, 
  Container,
  InputAdornment
} from '@mui/material';
import { 
  Person, 
  Badge, 
  Work, 
  Phone, 
  Add
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

export default function AjouterOuvrier() {
  const [id, setId] = useState('');
  const [idProjet, setIdProjet] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numero, setNumero] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9092/assalaiskane/AddOuvrier?id=${id}&id_projet=${idProjet}&nom=${nom}&prenom=${prenom}&numero=${numero}`, {
        method: 'POST',
      });
      if (response.ok) {
        setSuccess(true);
        setError('');
        // Clear the form
        setId('');
        setIdProjet('');
        setNom('');
        setPrenom('');
        setNumero('');
      } else {
        throw new Error('Failed to add ouvrier');
      }
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 8, backgroundColor: 'white' }}>
          <Typography variant="h4" align="center" gutterBottom color="primary">
            Ajouter un Ouvrier
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="ID"
                variant="outlined"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Badge color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="ID Projet"
                variant="outlined"
                value={idProjet}
                onChange={(e) => setIdProjet(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Work color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Nom"
                variant="outlined"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Prénom"
                variant="outlined"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Numéro"
                variant="outlined"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Add />}
                sx={{ mt: 2 }}
              >
                Ajouter
              </Button>
            </Box>
          </form>
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Ouvrier ajouté avec succès!
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Erreur: {error}
            </Alert>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}