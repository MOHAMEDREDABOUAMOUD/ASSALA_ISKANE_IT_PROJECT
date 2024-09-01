import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Typography, TextField, Grid, Button, IconButton, Tooltip, Box, Card, CardContent
} from '@mui/material';
import { 
  Cancel as CancelIcon, CheckCircle as CheckCircleIcon, Refresh as RefreshIcon,
  Person as PersonIcon, CalendarToday as CalendarTodayIcon, Phone as PhoneIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { format, differenceInDays, addDays } from 'date-fns';
import axios from 'axios';
import { useParams } from 'react-router';

export default function ListAllOuvrier({sidebarContent}) {
  const { id_resp, id_projet } = useParams();
  const [ouvriers, setOuvriers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

 
  const generateDateColumns = () => {
    if (!startDate || !endDate) return [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = differenceInDays(end, start) + 1;
    return Array.from({ length: days }, (_, i) => format(addDays(start, i), 'dd/MM/yyyy'));
  };

  const fetchAbsences = async () => {
    if (!startDate || !endDate) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:9092/assalaiskane/getAbsences`,
        { params: { id_projet, date_debut: startDate, date_fin: endDate } }
      );
      setOuvriers(transformData(response.data));
    } catch (error) {
      console.error('Error fetching absences:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  function transformData(data) {
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
    return Object.values(transformedData);
  }

  useEffect(() => {
    if (startDate && endDate) {
      fetchAbsences();
    }
  }, [startDate, endDate]);

  const dateColumns = generateDateColumns();

  return (
    <Box sx={{ padding: '24px', maxWidth: '1200px', margin: 'auto' }}>
     
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ mr: 2 }} />
            Liste des Ouvriers
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={5}>
              <TextField
                label="Date de début"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputProps={{
                  startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                label="Date de fin"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputProps={{
                  startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={fetchAbsences}
                startIcon={<SearchIcon />}
                sx={{ height: '56px' }}
              >
                Rechercher
              </Button>
            </Grid>
          </Grid>

          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><PersonIcon sx={{ mr: 1 }} /> Nom</TableCell>
                  <TableCell><PersonIcon sx={{ mr: 1 }} /> Prénom</TableCell>
                  <TableCell><PhoneIcon sx={{ mr: 1 }} /> Numéro</TableCell>
                  {dateColumns.map((date, index) => (
                    <TableCell key={index} align="center">
                      <CalendarTodayIcon sx={{ mr: 1 }} /> {date}
                    </TableCell>
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
                      <TableCell key={index} align="center">
                        <Tooltip title={ouvrier.absences.includes(date) ? 'Absent' : 'Présent'}>
                          <IconButton size="small">
                            {ouvrier.absences.includes(date) ? (
                              <CancelIcon style={{ color: '#f44336' }} />
                            ) : (
                              <CheckCircleIcon style={{ color: '#4caf50' }} />
                            )}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Typography>Chargement des données...</Typography>
            </Box>
          )}

          {!loading && ouvriers.length === 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Typography>Aucune donnée disponible. Veuillez sélectionner une plage de dates et effectuer une recherche.</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}