import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function ListTechDailyReports() {
  // Sample data representing daily reports fetched from the database
  const [reports, setReports] = useState([
    {
      id: 1,
      date: '2024-08-16',
      chantier: 'Chantier A',
      chef_technique: 'Youssef Assoul',
      temperature: '30°C',
      pluie: 'Non',
      vent: 'Modéré',
      travaux: [
        'Vérification du coffrage',
        'Installation des échafaudages',
        'Contrôle des matériaux reçus',
      ],
      remarques: 'Tous les matériaux sont conformes aux normes.',
    },
    {
      id: 2,
      date: '2024-08-17',
      chantier: 'Chantier B',
      chef_technique: 'Ahmed El-Karim',
      temperature: '32°C',
      pluie: 'Oui',
      vent: 'Fort',
      travaux: [
        'Interruption des travaux à cause du vent',
        'Préparation des fondations',
      ],
      remarques: 'Les travaux ont été interrompus en raison des conditions météorologiques.',
    },
    // More reports...
  ]);

  // Filtering reports based on the role of Chef Technique
  const filteredReports = reports.filter(report => report.chef_technique === 'Youssef Assoul');

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lister les rapports du jour pour le Chef Technique
      </Typography>

      <List>
        {filteredReports.map((report) => (
          <Card key={report.id} variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">Chantier: {report.chantier}</Typography>
              <Typography>Date: {report.date}</Typography>
              <Typography>Température: {report.temperature}</Typography>
              <Typography>Pluie: {report.pluie}</Typography>
              <Typography>Vent: {report.vent}</Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="subtitle1">Travaux Réalisés</Typography>
              <List>
                {report.travaux.map((task, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={task} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="subtitle1">Remarques</Typography>
              <Typography>{report.remarques}</Typography>
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
  );
}
