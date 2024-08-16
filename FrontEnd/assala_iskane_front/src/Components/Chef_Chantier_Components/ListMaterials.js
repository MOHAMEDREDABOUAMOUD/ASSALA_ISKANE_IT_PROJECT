import React from 'react';
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
  Box,
} from '@mui/material';

export default function ListMaterials() {
  // Local list of materials in stock
  const materials = [
    { id: 1, nom: 'Ciment', qte: 150, prix: 70.00, chantier: 'Chantier Casablanca' },
    { id: 2, nom: 'Barres d’Acier', qte: 80, prix: 250.00, chantier: 'Chantier Marrakech' },
    { id: 3, nom: 'Briques', qte: 1000, prix: 0.75, chantier: 'Chantier Fes' },
    // Add more materials as needed
  ];

  // Local list of materials available in chantier
  const chantierMaterials = [
    { id_materiaux: 1, nom: 'Ciment', qte: 60, chantier: 'Chantier Casablanca' },
    { id_materiaux: 2, nom: 'Barres d’Acier', qte: 30, chantier: 'Chantier Marrakech' },
    { id_materiaux: 3, nom: 'Briques', qte: 500, chantier: 'Chantier Fes' },
    // Add more chantier materials as needed
  ];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Liste des Matériaux en Stock
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Quantité</TableCell>
              <TableCell>Prix (MAD)</TableCell>
              <TableCell>Chantier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.nom}</TableCell>
                <TableCell>{material.qte}</TableCell>
                <TableCell>{material.prix} MAD</TableCell>
                <TableCell>{material.chantier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Liste des Matériaux Disponibles dans les Chantiers
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Quantité</TableCell>
                <TableCell>Chantier</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chantierMaterials.map((material) => (
                <TableRow key={material.id_materiaux}>
                  <TableCell>{material.nom}</TableCell>
                  <TableCell>{material.qte}</TableCell>
                  <TableCell>{material.chantier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
