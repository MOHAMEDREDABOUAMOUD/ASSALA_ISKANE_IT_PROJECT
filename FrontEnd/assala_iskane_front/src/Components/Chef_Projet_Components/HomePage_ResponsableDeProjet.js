import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Grid } from '@mui/material';
import {
  List as ListIcon,
  Group as GroupIcon,
  Report as ReportIcon,
  CalendarViewMonth as CalendarViewMonthIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon,
  Folder as FolderIcon
} from '@mui/icons-material';

export default function HomePage_ResponsableDeProjet() {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Chef de Projet Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<ListIcon />}
            onClick={() => handleMenuClick('/list-projects')}
          >
            Lister tous les projets
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<GroupIcon />}
            onClick={() => handleMenuClick('/list-tech-workers')}
          >
            Lister les ouvriers avec l’absence
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<ReportIcon />}
            onClick={() => handleMenuClick('/daily-reports')}
          >
            Lister/Ajouter les rapports du jour
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<CalendarViewMonthIcon />}
            onClick={() => handleMenuClick('/weekly-reports')}
          >
            Lister/Ajouter les rapports hebdomadaires
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<TrendingUpIcon />}
            onClick={() => handleMenuClick('/progress')}
          >
            Lister/Ajouter les avancements
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<InventoryIcon />}
            onClick={() => handleMenuClick('/list-materials')}
          >
            Lister la quantité des matériels
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<FolderIcon />}
            onClick={() => handleMenuClick('/list-needs')}
          >
            Lister/Valider les besoins du chef chantier
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<FolderIcon />}
            onClick={() => handleMenuClick('/list-files')}
          >
            Lister/Ajouter des fichiers
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
