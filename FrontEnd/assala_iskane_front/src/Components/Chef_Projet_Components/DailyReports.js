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

export default function DailyReports() {
  // Local list of daily reports
  const [reports, setReports] = useState([
    { id: 1, titre: 'Inspection du Site', contenu: 'Inspection de l’état du chantier à Casablanca', date: '2024-08-13' },
    { id: 2, titre: 'Réunion de Coordination', contenu: 'Réunion avec les équipes de Marrakech pour discuter des progrès', date: '2024-08-14' },
  ]);

  const [newReport, setNewReport] = useState({
    titre: '',
    contenu: '',
    date: '',
  });

  const handleChange = (e) => {
    setNewReport({
      ...newReport,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReport.titre && newReport.contenu && newReport.date) {
      setReports([
        ...reports,
        {
          ...newReport,
          id: reports.length + 1, // Simple ID generation
        },
      ]);
      setNewReport({
        titre: '',
        contenu: '',
        date: '',
      });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Rapports Quotidiens
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Titre du Rapport"
          name="titre"
          value={newReport.titre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contenu du Rapport"
          name="contenu"
          value={newReport.contenu}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Date du Rapport"
          name="date"
          type="date"
          value={newReport.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: 16 }}>
          Ajouter Rapport
        </Button>
      </form>

      <Box mt={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Liste des Rapports Quotidiens
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Titre</TableCell>
                <TableCell>Contenu</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.titre}</TableCell>
                  <TableCell>{report.contenu}</TableCell>
                  <TableCell>{report.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
