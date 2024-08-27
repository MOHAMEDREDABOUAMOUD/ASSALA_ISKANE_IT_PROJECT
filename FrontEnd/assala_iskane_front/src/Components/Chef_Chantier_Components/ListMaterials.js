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


export default function ListMaterials() {
    const [materials, setMaterials] = useState([]);
    const [chantierMaterials, setChantierMaterials] = useState([]);
    const id_projet = "P001"; // Replace with the actual project ID you want to use
    
    // Function to format prices with "DH" currency
    const formatPrice = (price) => {
      return new Intl.NumberFormat('fr-MA', {
        style: 'currency',
        currency: 'MAD',
        currencyDisplay: 'symbol',
      }).format(price);
    };

    useEffect(() => {
      // Fetch materials in stock from the backend
      const fetchMaterials = async () => {
        try {
          const response = await axios.get(`http://localhost:9092/assalaiskane/getMaterielsChantiers?id_projet=${id_projet}`);
          
          setMaterials(response.data);
        } catch (error) {
          console.error('Error fetching materials:', error);
        }
      };

      // Fetch chantier materials from the backend
      const fetchChantierMaterials = async () => {
        try {
          const response = await axios.get(`http://localhost:9092/assalaiskane/getMateriauxChantiers?id_projet=${id_projet}`);
          setChantierMaterials(response.data);
        } catch (error) {
          console.error('Error fetching chantier materials:', error);
        }
      };

      fetchMaterials();
      fetchChantierMaterials();
    }, [id_projet]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Liste des Matérieles
      </Typography>
      <TableContainer component={Paper}>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Quantité</TableCell>
              <TableCell>Prix</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.id}</TableCell>
                <TableCell>{material.nom}</TableCell>
                <TableCell>{material.qte}</TableCell>
                <TableCell>{formatPrice(material.prix)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Liste des Matériaux
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
              </TableRow>
            </TableHead>
            <TableBody>
              {chantierMaterials.map((material) => (
                <TableRow key={material.id_materiaux}>
                  <TableCell>{material.id}</TableCell>
                  <TableCell>{material.nom}</TableCell>
                  <TableCell>{material.qte}</TableCell>
                  <TableCell>{material.type}</TableCell>
                  <TableCell>{formatPrice(material.prix)}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}