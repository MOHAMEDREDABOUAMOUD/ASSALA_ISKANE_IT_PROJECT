import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Button,
} from '@mui/material';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useParams } from 'react-router';

export default function ListMaterials() {
  const { id_projet } = useParams();
  const [materials, setMaterials] = useState([]);
  const [chantierMaterials, setChantierMaterials] = useState([]);
  const navigate = useNavigate();

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

  const handleReturn = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  return (
    <Container>
      <Box display="flex" alignItems="center" mb={2}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleReturn} variant="outlined">
          Retour
        </Button>
        <Typography variant="h4" component="h1" ml={2}>
          Gestion des Matériaux
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" component="h2" gutterBottom display="flex" alignItems="center">
          <InventoryIcon sx={{ mr: 1 }} /> Liste des Matérieles
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
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom display="flex" alignItems="center">
          <ConstructionIcon sx={{ mr: 1 }} /> Liste des Matériaux de Chantier
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