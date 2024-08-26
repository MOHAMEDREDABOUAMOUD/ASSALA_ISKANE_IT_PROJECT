import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

export default function ListMaterials({ id_projet }) {
  const [materials, setMaterials] = useState([]);
  const [chantierMaterials, setChantierMaterials] = useState([]);

  useEffect(() => {
    // Fetch materiels
    axios.get(`/getMaterielsChantiers`, { params: { id_projet } })
      .then(response => setMaterials(response.data))
      .catch(error => console.error('Error fetching materials:', error));

    // Fetch materiaux
    axios.get(`/getMateriauxChantiers`, { params: { id_projet } })
      .then(response => setChantierMaterials(response.data))
      .catch(error => console.error('Error fetching chantier materials:', error));
  }, [id_projet]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Liste des Matériaux
      </Typography>
      <TableContainer component={Paper}>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Quantité</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>ID Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.id}</TableCell>
                <TableCell>{material.nom}</TableCell>
                <TableCell>{material.qte}</TableCell>
                <TableCell>{material.prix}</TableCell>
                <TableCell>{material.id_stock}</TableCell>
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
                <TableCell>ID</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Quantité</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Prix</TableCell>
                <TableCell>ID Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chantierMaterials.map((material) => (
                <TableRow key={material.id_materiaux}>
                  <TableCell>{material.id}</TableCell>
                  <TableCell>{material.nom}</TableCell>
                  <TableCell>{material.qte}</TableCell>
                  <TableCell>{material.type}</TableCell>
                  <TableCell>{material.prix}</TableCell>
                  <TableCell>{material.id_stock}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}