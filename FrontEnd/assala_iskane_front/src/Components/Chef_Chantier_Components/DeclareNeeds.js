import React, { useState, useEffect } from 'react';
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
import axios from 'axios'; 

export default function DeclareNeeds() {
  const [needs, setNeeds] = useState([]);

  const [newNeed, setNewNeed] = useState({
    nom: '',
    qte: '',
    date_demande: '',
    chantier: '',
  });

  // Fetch needs from the backend when the component mounts
  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await axios.get('/getBesoins', {
          params: {
            id_resp: 'id_resp_value', // Replace with the actual responsible user's ID
            id_projet: 'id_projet_value', // Replace with the actual project ID
          },
        });
        setNeeds(response.data);
      } catch (error) {
        console.error('Error fetching needs:', error);
      }
    };

    fetchNeeds();
  }, []);

  const handleChange = (e) => {
    setNewNeed({
      ...newNeed,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newNeed.nom && newNeed.qte && newNeed.date_demande && newNeed.chantier) {
      try {
        await axios.post('/AddBesoin', null, {
          params: {
            nom: newNeed.nom,
            date_demande: newNeed.date_demande,
            qte: newNeed.qte,
            valide_par: 'id_of_user_validating', // Replace with the actual ID
            id_chantier: 'id_chantier_value', // Replace with the actual chantier ID
          },
        });

        // Optionally refetch the needs list to update the UI
        const response = await axios.get('/getBesoins', {
          params: {
            id_resp: 'id_resp_value', // Replace with the actual responsible user's ID
            id_projet: 'id_projet_value', // Replace with the actual project ID
          },
        });
        setNeeds(response.data);

        setNewNeed({
          nom: '',
          qte: '',
          date_demande: '',
          chantier: '',
        });
      } catch (error) {
        console.error('Error adding need:', error);
      }
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