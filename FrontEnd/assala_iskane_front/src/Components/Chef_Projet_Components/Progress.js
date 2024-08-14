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
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Local data for projects and progress
const projects = [
  { id: 'PROJ001', nom: 'Chantier Casablanca' },
  { id: 'PROJ002', nom: 'Chantier Marrakech' },
  { id: 'PROJ003', nom: 'Chantier Fes' }
];

const progressData = [
  { id: 1, id_projet: 'PROJ001', description: 'Fondations terminées', date: '2024-08-10' },
  { id: 2, id_projet: 'PROJ002', description: 'Élévation des murs', date: '2024-08-12' },
  { id: 3, id_projet: 'PROJ003', description: 'Installation des fenêtres', date: '2024-08-14' }
];

export default function Progress() {
  const [newProgress, setNewProgress] = useState({ id_projet: '', description: '', date: '' });
  const [progressList, setProgressList] = useState(progressData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgress(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddProgress = () => {
    if (newProgress.id_projet && newProgress.description && newProgress.date) {
      setProgressList([...progressList, { ...newProgress, id: progressList.length + 1 }]);
      setNewProgress({ id_projet: '', description: '', date: '' });
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Suivi des Progrès des Projets
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Projet</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {progressList.map(progress => (
              <TableRow key={progress.id}>
                <TableCell>{projects.find(proj => proj.id === progress.id_projet)?.nom || 'Inconnu'}</TableCell>
                <TableCell>{progress.description}</TableCell>
                <TableCell>{progress.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={3}>
        <Typography variant="h6" component="h2" gutterBottom>
          Ajouter un Nouveau Progrès
        </Typography>
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
        <TextField
          label="Description"
          name="description"
          value={newProgress.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
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
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProgress}
            startIcon={<AddIcon />}
          >
            Ajouter
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
