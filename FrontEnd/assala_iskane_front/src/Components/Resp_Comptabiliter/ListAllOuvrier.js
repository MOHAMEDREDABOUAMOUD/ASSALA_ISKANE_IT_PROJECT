import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Grid } from '@mui/material';
import { Cancel as CancelIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { format, differenceInDays, addDays } from 'date-fns';
import axios from 'axios';

export default function ListOuvrier() {
  const [ouvriers, setOuvriers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const id_projet = 'P001'; // Replace with your actual project ID

  // Function to generate date columns based on the selected start and end dates
  const generateDateColumns = () => {
    if (!startDate || !endDate) return [];

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = differenceInDays(end, start) + 1;

    return Array.from({ length: days }, (_, i) => format(addDays(start, i), 'dd/MM/yyyy'));
  };

  const fetchAbsences = async () => {
    if (!startDate || !endDate) return; // Don't fetch if dates are not set

    try {
      const response = await axios.get(
        `http://localhost:9092/assalaiskane/getAbsences`,
        {
          params: {
            id_projet: id_projet,
            date_debut: startDate,
            date_fin: endDate
          }
        }
      );

      console.log('Raw data from backend:', response.data); // Debugging: log the raw data from the backend

      const transformedData = transformData(response.data);
      console.log('Transformed data:', transformedData); // Debugging: log the transformed data
      setOuvriers(transformedData);
    } catch (error) {
      console.error('Error fetching absences:', error.response ? error.response.data : error.message);
    }
  };

  function transformData(data) {
    console.log('Data before transformation:', data); // Debugging: log the raw data

    const transformedData = {};

    data.forEach((item) => {
      const { ouvrier, date_absence, absent } = item;
      const date = format(new Date(date_absence), 'dd/MM/yyyy');

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

    console.log('Data after transformation:', transformedData); // Debugging: log the transformed data

    return Object.values(transformedData);
  }

  useEffect(() => {
    fetchAbsences();
  }, [startDate, endDate]); // Fetch data when startDate or endDate changes

  // Generate date columns based on the startDate and endDate
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
