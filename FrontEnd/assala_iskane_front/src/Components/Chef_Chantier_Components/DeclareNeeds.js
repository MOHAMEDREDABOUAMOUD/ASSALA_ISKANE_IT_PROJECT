import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

export default function DeclareNeeds() {
  // Local list of needs (demandes)
  const [needs, setNeeds] = useState([
    { id: 1, nom: 'Ciment', qte: 100, date_demande: '2024-08-10', chantier: 'Chantier Casablanca' },
    { id: 2, nom: 'Barres d’Acier', qte: 50, date_demande: '2024-08-12', chantier: 'Chantier Marrakech' },
  ]);

  const [newNeed, setNewNeed] = useState({
    nom: '',
    qte: '',
    date_demande: '',
    chantier: '',
  });

  const handleChange = (e) => {
    setNewNeed({
      ...newNeed,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNeed.nom && newNeed.qte && newNeed.date_demande && newNeed.chantier) {
      setNeeds([
        ...needs,
        {
          ...newNeed,
          id: needs.length + 1, // Simple ID generation
        },
      ]);
      setNewNeed({
        nom: '',
        qte: '',
        date_demande: '',
        chantier: '',
      });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Déclarer un Besoin
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom du Matériau"
          name="nom"
          value={newNeed.nom}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantité"
          name="qte"
          type="number"
          value={newNeed.qte}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date de Demande"
          name="date_demande"
          type="date"
          value={newNeed.date_demande}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Chantier"
          name="chantier"
          value={newNeed.chantier}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: 16 }}>
          Ajouter Besoin
        </Button>
      </form>

      <Box mt={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Liste des Besoins Déclarés
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom du Matériau</TableCell>
                <TableCell>Quantité</TableCell>
                <TableCell>Date de Demande</TableCell>
                <TableCell>Chantier</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {needs.map((need) => (
                <TableRow key={need.id}>
                  <TableCell>{need.nom}</TableCell>
                  <TableCell>{need.qte}</TableCell>
                  <TableCell>{need.date_demande}</TableCell>
                  <TableCell>{need.chantier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
