import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

export default function AjouterOuvrier() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numero, setNumero] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOuvrier = {
      nom,
      prenom,
      numero,
    };

    try {
      const response = await fetch('http://localhost:5000/api/ouvrier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOuvrier),
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
        // Clear the form
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
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Ajouter un Ouvrier
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nom"
            variant="outlined"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <TextField
            label="Prénom"
            variant="outlined"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
          <TextField
            label="Numéro"
            variant="outlined"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Ajouter
          </Button>
        </Box>
        {success && (
          <Alert severity="success" sx={{ marginTop: 2 }}>
            Ouvrier ajouté avec succès!
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            Erreur: {error}
          </Alert>
        )}
      </form>
    </Box>
  );
}
