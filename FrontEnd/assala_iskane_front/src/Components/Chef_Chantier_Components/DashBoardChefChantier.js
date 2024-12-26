import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';

const DashboardChefChantier = () => {
  const [materiaux, setMateriaux] = useState([]);
  const [materiels, setMateriels] = useState([]);
  const [ouvriers, setOuvriers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = 'http://localhost:9092/assalaiskane';
        const responses = await Promise.all([
          fetch(`${baseUrl}/getMateriauxChantiers?id_projet=P001`),
          fetch(`${baseUrl}/getMaterielsChantiers?id_projet=P001`),
          fetch(`${baseUrl}/getOuvriers?id_projet=P001`)
        ]);

        const [materiauxData, materielsData, ouvriersData] = await Promise.all(
          responses.map(res => res.json())
        );

        setMateriaux(materiauxData);
        setMateriels(materielsData);
        setOuvriers(ouvriersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const prepareChartData = (data) => {
    return data.map(item => ({
      name: item.nom,
      quantité: item.qte
    }));
  };

  const ChartCard = ({ title, data }) => (
    <Card sx={{ height: '100%'}}>
      <CardHeader title={title} />
      <CardContent>
        <Box sx={{ height: 300 }}>
          <BarChart
            width={500}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantité" fill="#1976d2" />
          </BarChart>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord Chantier
      </Typography>

      <Card sx={{ mb: 3, bgcolor: '#1976d2', color: 'white' }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <PeopleIcon sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">
                Nombre d'ouvriers
              </Typography>
              <Typography variant="h4">
                {ouvriers.length}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Matériaux (Quantité)"
            data={prepareChartData(materiaux)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Matériels (Quantité)"
            data={prepareChartData(materiels)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardChefChantier;
