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
  Avatar,
  Box,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';

export default function ListOuvrier() {
  // Local list of ouvriers
  const ouvriers = [
    { id: 'OUV001', nom: 'El Ayoubi', prenom: 'Khalid', numero: '0612345678' },
    { id: 'OUV002', nom: 'Benjelloun', prenom: 'Ahmed', numero: '0678901234' },
    { id: 'OUV003', nom: 'Bouhssine', prenom: 'Fatima', numero: '0667890123' },
    // Add more ouvriers as needed
  ];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Liste des Ouvriers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Numéro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ouvriers.map((ouvrier) => (
              <TableRow key={ouvrier.id}>
                <TableCell>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {ouvrier.nom[0]}
                  </Avatar>
                </TableCell>
                <TableCell>{ouvrier.nom}</TableCell>
                <TableCell>{ouvrier.prenom}</TableCell>
                <TableCell>{ouvrier.numero}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4}>
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {new Date().getFullYear()} Construction Management
        </Typography>
      </Box>
    </Container>
  );
}
