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
  Paper
} from '@mui/material';
import { Visibility as VisibilityIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@mui/icons-material';

export default function ListServiceValidatedNeeds() {
  // Sample data for validated needs
  const [validatedNeeds, setValidatedNeeds] = useState([
    { id: 1, name: 'Besoin de béton pour le coffrage', quantity: 100, status: 'Validé' },
    { id: 2, name: 'Besoin de matériel électrique', quantity: 50, status: 'Validé' },
    { id: 3, name: 'Besoin de matériel de plomberie', quantity: 75, status: 'Validé' },
    // More needs data...
  ]);

  // Handle view need details
  const handleViewNeed = (needId) => {
    // Logic to view need details (e.g., navigate to need details page)
    alert(`View need ${needId}`);
  };

  // Handle reject need
  const handleRejectNeed = (needId) => {
    // Logic to reject need (e.g., show a confirmation dialog and update the need status)
    alert(`Reject need ${needId}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lister les Besoins Validés
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {validatedNeeds.map((need) => (
            <ListItem key={need.id} divider>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary={need.name}
                secondary={`Quantité: ${need.quantity} - Statut: ${need.status}`}
              />
              <Tooltip title="Voir les détails">
                <IconButton edge="end" aria-label="view" onClick={() => handleViewNeed(need.id)}>
                  <VisibilityIcon color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Rejeter le besoin">
                <IconButton edge="end" aria-label="reject" onClick={() => handleRejectNeed(need.id)}>
                  <CancelIcon color="error" />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
// who validate bch service !