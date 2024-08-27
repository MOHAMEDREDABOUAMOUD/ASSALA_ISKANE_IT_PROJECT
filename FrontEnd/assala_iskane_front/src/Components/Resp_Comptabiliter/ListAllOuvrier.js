import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Grid } from '@mui/material';
import { Cancel as CancelIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { format, differenceInDays, addDays } from 'date-fns';

export default function ListOuvrier() {
  function transformData(data) {
    const transformedData = {};
  
    data.forEach((item) => {
      const { ouvrier, date_absence, absent } = item;
      const date = new Date(date_absence).toLocaleDateString('fr-FR');
  
      if (!transformedData[ouvrier.id]) {
        transformedData[ouvrier.id] = {
          id: ouvrier.id,
          nom: ouvrier.nom,
          prenom: ouvrier.prenom,
          numero: ouvrier.numero,
          absences: [],
        };
      }
  
      if (absent) {
        transformedData[ouvrier.id].absences.push(date);
      }
    });
  
    return Object.values(transformedData);
  }
  
  // Example usage with your data
  const data = [
    {
      id: 5,
      ouvrier: {
        id: "O001",
        nom: "Williams",
        prenom: "David",
        numero: "1112223334",
        projet: {
          id: "P001",
          nom: "Project A",
          numero_marche: "M001",
          objet: "Building a bridge",
          date_ordre: "2023-01-14T23:00:00.000+00:00",
          date_fin: "2023-12-14T23:00:00.000+00:00",
          delai: 330,
          resp: {
            id: "U001",
            nom: "Smith",
            prenom: "John",
            fonction: "ChefChantier",
            numero: "1234567890",
            pass: "pass123",
          },
        },
      },
      date_absence: "2024-08-25T23:00:00.000+00:00",
      chantier: {
        id: 1,
        projet: {
          id: "P001",
          nom: "Project A",
          numero_marche: "M001",
          objet: "Building a bridge",
          date_ordre: "2023-01-14T23:00:00.000+00:00",
          date_fin: "2023-12-14T23:00:00.000+00:00",
          delai: 330,
          resp: {
            id: "U001",
            nom: "Smith",
            prenom: "John",
            fonction: "ChefChantier",
            numero: "1234567890",
            pass: "pass123",
          },
        },
        resp: {
          id: "U001",
          nom: "Smith",
          prenom: "John",
          fonction: "ChefChantier",
          numero: "1234567890",
          pass: "pass123",
        },
      },
      absent: 1,
    },
    {
      id: 6,
      ouvrier: {
        id: "O003",
        nom: "reda",
        prenom: "reda",
        numero: "1111111111",
        projet: {
          id: "P001",
          nom: "Project A",
          numero_marche: "M001",
          objet: "Building a bridge",
          date_ordre: "2023-01-14T23:00:00.000+00:00",
          date_fin: "2023-12-14T23:00:00.000+00:00",
          delai: 330,
          resp: {
            id: "U001",
            nom: "Smith",
            prenom: "John",
            fonction: "ChefChantier",
            numero: "1234567890",
            pass: "pass123",
          },
        },
      },
      date_absence: "2024-08-25T23:00:00.000+00:00",
      chantier: {
        id: 1,
        projet: {
          id: "P001",
          nom: "Project A",
          numero_marche: "M001",
          objet: "Building a bridge",
          date_ordre: "2023-01-14T23:00:00.000+00:00",
          date_fin: "2023-12-14T23:00:00.000+00:00",
          delai: 330,
          resp: {
            id: "U001",
            nom: "Smith",
            prenom: "John",
            fonction: "ChefChantier",
            numero: "1234567890",
            pass: "pass123",
          },
        },
        resp: {
          id: "U001",
          nom: "Smith",
          prenom: "John",
          fonction: "ChefChantier",
          numero: "1234567890",
          pass: "pass123",
        },
      },
      absent: 0,
    },
  ];
  
  const transformedData = transformData(data);
  console.log(transformedData);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  
  const ouvriers = [
    {
      id: 1,
      nom: 'Saidi',
      prenom: 'Abdelah',
      numero: '0617901313',
      absences: ['25/08/2024', '27/08/2024'],
    },
    {
      id: 2,
      nom: 'Doe',
      prenom: 'John',
      numero: '0622334455',
      absences: ['26/08/2024'],
    },
  ];

  const generateDateColumns = () => {
    if (!startDate || !endDate) return [];

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = differenceInDays(end, start) + 1;

    return Array.from({ length: days }, (_, i) => format(addDays(start, i), 'dd/MM/yyyy'));
  };

  const dateColumns = generateDateColumns();

  return (
    <div style={{ padding: '16px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Liste des Ouvriers
      </Typography>

      <Grid container spacing={2} style={{ marginBottom: '16px' }}>
        <Grid item xs={6}>
          <TextField
            label="Date de début"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Date de fin"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Numéro</TableCell>
              {dateColumns.map((date, index) => (
                <TableCell key={index}>{date}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ouvriers.map((ouvrier) => (
              <TableRow key={ouvrier.id}>
                <TableCell>{ouvrier.nom}</TableCell>
                <TableCell>{ouvrier.prenom}</TableCell>
                <TableCell>{ouvrier.numero}</TableCell>
                {dateColumns.map((date, index) => (
                  <TableCell key={index}>
                    {ouvrier.absences.includes(date) ? (
                      <CancelIcon style={{ color: 'red' }} />
                    ) : (
                      <CheckCircleIcon style={{ color: 'green' }} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
