import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Divider,
  Paper,
  Box
} from '@mui/material';
import { Visibility as VisibilityIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export default function ListServiceProjects() {
  // Sample data for projects
  const [projects, setProjects] = useState([
    { id: 1, name: 'Construction de la base des unités de santé mobiles à Témara', status: 'En cours' },
    { id: 2, name: 'Rénovation du centre de santé de Rabat', status: 'Terminé' },
    { id: 3, name: 'Extension du laboratoire à Casablanca', status: 'En attente' },
    // More projects data...
  ]);

  // Handle project view
  const handleViewProject = (projectId) => {
    // Logic to view project details (e.g., navigate to project details page)
    alert(`View project ${projectId}`);
  };

  // Handle project edit
  const handleEditProject = (projectId) => {
    // Logic to edit project (e.g., open an edit form or dialog)
    alert(`Edit project ${projectId}`);
  };

  // Handle project delete
  const handleDeleteProject = (projectId) => {
    // Logic to delete project (e.g., show a confirmation dialog and delete the project)
    alert(`Delete project ${projectId}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lister Tous les Projets
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {projects.map((project) => (
            <ListItem key={project.id} divider>
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
              <ListItemText
                primary={project.name}
                secondary={`Statut: ${project.status}`}
              />
              <Tooltip title="Modifier le projet">
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditProject(project.id)}>
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Supprimer le projet">
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProject(project.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Voir le projet">
                <IconButton edge="end" aria-label="view" onClick={() => handleViewProject(project.id)}>
                  <VisibilityIcon color="action" />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
