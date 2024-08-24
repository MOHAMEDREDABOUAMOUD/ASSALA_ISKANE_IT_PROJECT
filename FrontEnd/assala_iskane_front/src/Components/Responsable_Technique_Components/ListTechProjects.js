import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Box,
  Paper,
} from '@mui/material';
import {
  Work as WorkIcon,
  Info as InfoIcon,
  DateRange as DateRangeIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon
} from '@mui/icons-material';

export default function ListTechProjects() {
  // Sample data representing projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Construction de la base des unités de santé mobiles à Témara',
      number: '0001',
      description: 'Projet de construction de bases pour unités médicales',
      startDate: '2024-06-01',
      endDate: '2024-12-31',
      status: 'Ongoing' // Ongoing or Completed
    },
    {
      id: 2,
      name: 'Extension du complexe sportif de Rabat',
      number: '0002',
      description: 'Extension du complexe avec ajout de nouveaux équipements',
      startDate: '2024-07-01',
      endDate: '2024-10-15',
      status: 'Completed'
    },
    {
      id: 3,
      name: 'Réhabilitation du pont de Casablanca',
      number: '0003',
      description: 'Réhabilitation et renforcement du pont',
      startDate: '2023-01-15',
      endDate: '2023-12-31',
      status: 'Completed'
    },
    // More project data...
  ]);

  const ongoingProjects = projects.filter(project => project.status === 'Ongoing');
  const completedProjects = projects.filter(project => project.status === 'Completed');

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lister tous les projets
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Projets en Cours
        </Typography>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <List>
            {ongoingProjects.map((project) => (
              <ListItem key={project.id} divider>
                <ListItemIcon>
                  <HourglassEmptyIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary={project.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textSecondary">
                        <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {project.description}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="textSecondary">
                        <DateRangeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {`Début: ${project.startDate} | Fin: ${project.endDate}`}
                      </Typography>
                    </>
                  }
                />
                <Tooltip title="Voir les détails">
                  <IconButton edge="end" aria-label="details">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Projets Terminés
        </Typography>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <List>
            {completedProjects.map((project) => (
              <ListItem key={project.id} divider>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={project.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textSecondary">
                        <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {project.description}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="textSecondary">
                        <DateRangeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {`Début: ${project.startDate} | Fin: ${project.endDate}`}
                      </Typography>
                    </>
                  }
                />
                <Tooltip title="Voir les détails">
                  <IconButton edge="end" aria-label="details">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}
