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
import { Person as PersonIcon, Event as EventIcon, Cancel as CancelIcon } from '@mui/icons-material';

export default function ListTechWorkersWithAbsence() {
  // Sample data for workers and their absences
  const [workers, setWorkers] = useState([
    {
      id: '1',
      name: 'Ahmed Ben Ali',
      absenceDate: '2024-08-14',
      reason: 'Maladie',
    },
    {
      id: '2',
      name: 'Khadija Laaroussi',
      absenceDate: '2024-08-15',
      reason: 'Raisons personnelles',
    },
    {
      id: '3',
      name: 'Youssef El Azzouzi',
      absenceDate: '2024-08-16',
      reason: 'Urgence familiale',
    },
    // More worker data...
  ]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lister les Ouvriers avec l’Absence
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Box>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <List>
            {workers.map((worker) => (
              <ListItem key={worker.id} divider>
                <ListItemIcon>
                  <PersonIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary={worker.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textSecondary">
                        <EventIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {`Date d'absence: ${worker.absenceDate}`}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="textSecondary">
                        <Chip
                          label={worker.reason}
                          color="error"
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </Typography>
                    </>
                  }
                />
                <Tooltip title="Voir les détails">
                  <IconButton edge="end" aria-label="details">
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
