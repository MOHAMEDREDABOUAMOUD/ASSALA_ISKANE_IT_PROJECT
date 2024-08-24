import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, Paper } from '@mui/material';
import { ListAlt, LocalShipping, Description, Archive, Inventory } from '@mui/icons-material';
import './HomePage_RespMarchandise.css'; // Ensure you create this CSS file for styling

export default function HomePage_RespMarchandise() {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <Typography variant="h2" className="dashboard-title">
        Responsable de Marchandise Dashboard
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="menu-item" elevation={3}>
            <Button
              startIcon={<ListAlt />}
              fullWidth
              onClick={() => handleMenuClick('/list-projects')}
            >
              Lister tous les projets
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="menu-item" elevation={3}>
            <Button
              startIcon={<LocalShipping />}
              fullWidth
              onClick={() => handleMenuClick('/list-deliveries')}
            >
              Lister les livraisons
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="menu-item" elevation={3}>
            <Button
              startIcon={<Description />}
              fullWidth
              onClick={() => handleMenuClick('/list-documents')}
            >
              Lister les documents
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="menu-item" elevation={3}>
            <Button
              startIcon={<Archive />}
              fullWidth
              onClick={() => handleMenuClick('/manage-archives')}
            >
              Gérer les archives
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="menu-item" elevation={3}>
            <Button
              startIcon={<Inventory />}
              fullWidth
              onClick={() => handleMenuClick('/manage-inventory')}
            >
              Gérer l'inventaire
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
