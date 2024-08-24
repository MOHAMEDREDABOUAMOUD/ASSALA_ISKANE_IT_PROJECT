import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress,
} from '@mui/material';

export default function ListTechProgress() {
  // Sample data representing project progress
  const [progressList, setProgressList] = useState([
    {
      id: 1,
      projectName: 'Construction de la base des unités de santé mobiles à Témara',
      stage: 'Ferraillage des poteaux',
      startDate: '2024-08-01',
      endDate: '2024-08-07',
      status: 'En cours',
      completion: 60, // Percentage of completion
    },
    {
      id: 2,
      projectName: 'Extension du complexe sportif de Rabat',
      stage: 'Bétonnage des poteaux',
      startDate: '2024-07-15',
      endDate: '2024-07-22',
      status: 'Terminé',
      completion: 100,
    },
    // More progress data...
  ]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lister les avancements
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <List>
        {progressList.map((progress) => (
          <ListItem key={progress.id} divider>
            <ListItemText
              primary={`${progress.projectName} - ${progress.stage}`}
              secondary={`Début: ${progress.startDate} | Fin: ${progress.endDate} | État: ${progress.status}`}
            />
            <div style={{ width: '100%', marginTop: '8px' }}>
              <LinearProgress
                variant="determinate"
                value={progress.completion}
                sx={{
                  height: '10px',
                  borderRadius: '5px',
                  backgroundColor: progress.completion === 100 ? '#4caf50' : '#ff9800',
                }}
              />
              <Typography variant="body2" color="textSecondary" align="right">
                {progress.completion}%
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
