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
import { Description as DescriptionIcon, DateRange as DateRangeIcon } from '@mui/icons-material';

export default function ListTechWeeklyReports() {
  // Sample data representing weekly reports
  const [reports, setReports] = useState([
    {
      id: 1,
      weekNumber: 29,
      year: 2024,
      startDate: '2024-07-15',
      endDate: '2024-07-21',
      description: 'Semaine de préparation des fondations et des installations initiales.',
    },
    {
      id: 2,
      weekNumber: 30,
      year: 2024,
      startDate: '2024-07-22',
      endDate: '2024-07-28',
      description: 'Bétonnage des poteaux du premier étage et traçage des zones de cloisons.',
    },
    // More report data...
  ]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lister les Rapports Hebdomadaires
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Box>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <List>
            {reports.map((report) => (
              <ListItem key={report.id} divider>
                <ListItemIcon>
                  <DescriptionIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary={`Semaine ${report.weekNumber} - ${report.year}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textSecondary">
                        <DateRangeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {`Du ${report.startDate} au ${report.endDate}`}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="textSecondary">
                        {report.description}
                      </Typography>
                    </>
                  }
                />
                <Tooltip title="Voir les détails">
                  <IconButton edge="end" aria-label="details">
                    <DescriptionIcon />
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
