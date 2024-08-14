import React, { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  LinearProgress,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Local data for projects and progress stages
const projects = [
  { id: 'PROJ001', nom: 'Construction de la base des unités de santé mobiles à Témara' },
  { id: 'PROJ002', nom: 'Chantier Marrakech' },
  { id: 'PROJ003', nom: 'Chantier Fes' }
];

const progressData = [
  { id: 1, id_projet: 'PROJ001', description: 'Coffrage des poteaux', date: '2024-05-17', etat: 'Exécuté', avancement: 100 },
  { id: 2, id_projet: 'PROJ001', description: 'Ferraillage des poteaux', date: '2024-05-15', etat: 'Exécuté', avancement: 100 },
  { id: 3, id_projet: 'PROJ001', description: 'Bétonnage des poteaux', date: '2024-05-22', etat: 'Exécuté', avancement: 100 },
  { id: 4, id_projet: 'PROJ002', description: 'Élévation des murs', date: '2024-08-12', etat: 'Non exécuté', avancement: 0 },
  { id: 5, id_projet: 'PROJ003', description: 'Installation des fenêtres', date: '2024-08-14', etat: 'En cours', avancement: 50 }
];

export default function Progress() {
  const [newProgress, setNewProgress] = useState({ id_projet: '', description: '', date: '', etat: '', avancement: 0 });
  const [progressList, setProgressList] = useState(progressData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgress(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddProgress = () => {
    if (newProgress.id_projet && newProgress.description && newProgress.date && newProgress.etat) {
      setProgressList([...progressList, { ...newProgress, id: progressList.length + 1 }]);
      setNewProgress({ id_projet: '', description: '', date: '', etat: '', avancement: 0 });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Suivi des Progrès des Projets
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Projet</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>État</TableCell>
              <TableCell>Avancement</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {progressList.map(progress => (
              <TableRow key={progress.id}>
                <TableCell>{projects.find(proj => proj.id === progress.id_projet)?.nom || 'Inconnu'}</TableCell>
                <TableCell>{progress.description}</TableCell>
                <TableCell>{progress.date}</TableCell>
                <TableCell>{progress.etat}</TableCell>
                <TableCell>
                  <LinearProgress variant="determinate" value={progress.avancement} />
                  {progress.avancement}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={3}>
        <Typography variant="h6" component="h2" gutterBottom>
          Ajouter un Nouveau Progrès
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Projet"
              select
              SelectProps={{ native: true }}
              name="id_projet"
              value={newProgress.id_projet}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            >
              <option value="">Choisir un projet</option>
              {projects.map(proj => (
                <option key={proj.id} value={proj.id}>{proj.nom}</option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Description"
              name="description"
              value={newProgress.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={newProgress.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="État"
              name="etat"
              value={newProgress.etat}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Avancement (%)"
              name="avancement"
              type="number"
              value={newProgress.avancement}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProgress}
                startIcon={<AddIcon />}
                fullWidth
              >
                Ajouter
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
