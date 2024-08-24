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
  Box,
  Paper,
  Chip
} from '@mui/material';
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon, Info as InfoIcon } from '@mui/icons-material';

export default function ListValidatedNeeds() {
  // Sample data for validated needs
  const [needs, setNeeds] = useState([
    {
      id: 1,
      name: 'Ciment pour le béton',
      quantity: 50,
      validatedBy: 'Mohamed Ali',
    },
    {
      id: 2,
      name: 'Briques pour murs',
      quantity: 200,
      validatedBy: 'Fatima Zahra',
    },
    {
      id: 3,
      name: 'Plomberie - Tuyaux',
      quantity: 100,
      validatedBy: 'Hassan Ait',
    },
    // More needs data...
  ]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lister les Besoins Validés
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Box>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <List>
            {needs.map((need) => (
              <ListItem key={need.id} divider>
                <ListItemIcon>
                  <InfoIcon color="info" />
                </ListItemIcon>
                <ListItemText
                  primary={need.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textSecondary">
                        Quantité: {need.quantity}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="textSecondary">
                        Validé par: {need.validatedBy}
                      </Typography>
                    </>
                  }
                />
                <Tooltip title="Valider le besoin">
                  <IconButton edge="end" aria-label="validate">
                    <CheckCircleIcon color="success" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Annuler la validation">
                  <IconButton edge="end" aria-label="cancel">
                    <CancelIcon color="error" />
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
