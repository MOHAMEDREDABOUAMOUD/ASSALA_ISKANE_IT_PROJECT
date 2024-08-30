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
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BuildIcon from '@mui/icons-material/Build';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

export default function DeclareNeeds() {
  const { id_resp, id_projet } = useParams();
  const [needs, setNeeds] = useState([]);
  const [newNeed, setNewNeed] = useState({
    nom: '',
    qte: '',
    date_demande: '',
    chantier: '',
  });
  const navigate = useNavigate();
  //const id_resp = 'U001'; // Replace with the actual responsible user's ID
  const id_chantier = 1; // Replace with the actual chantier ID
  
  const handleReturn = () => {
    navigate(-1); // This will navigate back to the previous page
  };
  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await axios.get(`http://localhost:9092/assalaiskane/getBesoinsCC?id_projet=${id_projet}`);
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
        await axios.post(`http://localhost:9092/assalaiskane/AddBesoin?nom=${newNeed.nom}&date_demande=${newNeed.date_demande}&qte=${newNeed.qte}&valide_par=${id_resp}&id_chantier=${id_chantier}`);

        const response = await axios.get(`http://localhost:9092/assalaiskane/getBesoins?id_resp=${id_resp}&id_projet=${id_projet}`);
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
    <Container maxWidth="lg">
      <Box display="flex" alignItems="center" mb={2}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleReturn} variant="outlined">
          Retour
        </Button>
        <Typography variant="h4" component="h1" ml={2}>
        <BuildIcon fontSize="large" style={{ verticalAlign: 'middle', marginRight: '10px' }} />
        Gestion des Besoins
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom color="secondary">
                <AddCircleOutlineIcon fontSize="small" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
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
                  variant="outlined"
                />
                <TextField
                  label="Quantité"
                  name="qte"
                  type="number"
                  value={newNeed.qte}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Date de Demande"
                  name="date_demande"
                  type="date"
                  value={newNeed.date_demande}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Chantier"
                  name="chantier"
                  value={newNeed.chantier}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  type="submit"
                  fullWidth
                  size="large"
                  startIcon={<AddCircleOutlineIcon />}
                  style={{ marginTop: 16 }}
                >
                  Ajouter Besoin
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom color="secondary">
                <ListAltIcon fontSize="small" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                Liste des Besoins Déclarés
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><BuildIcon fontSize="small" /> Matériau</TableCell>
                      <TableCell align="right"><AddCircleOutlineIcon fontSize="small" /> Quantité</TableCell>
                      <TableCell align="right"><DateRangeIcon fontSize="small" /> Date de Demande</TableCell>
                      <TableCell align="right"><BusinessIcon fontSize="small" /> Chantier</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(needs) && needs.length > 0 ? (
                      needs.map((need) => (
                        <TableRow key={need.id}>
                          <TableCell component="th" scope="row">{need.nom}</TableCell>
                          <TableCell align="right">{need.qte}</TableCell>
                          <TableCell align="right">{new Date(need.date_demande).toLocaleDateString()}</TableCell>
                          <TableCell align="right">{need.chantier?.name || 'N/A'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">Aucune donnée disponible</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}