import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Paper } from '@mui/material';
import { 
  ListAlt as ListAltIcon, 
  Person as PersonIcon, 
  Report as ReportIcon, 
  TrendingUp as TrendingUpIcon, 
  Category as CategoryIcon, 
  FileUpload as FileUploadIcon 
} from '@mui/icons-material';
import './HomePage_RespTechnique.css'; // Ensure you create this CSS file for styling

export default function HomePage_RespTechnique() {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <Paper elevation={3} className="dashboard-paper">
        <Typography variant="h4" className="dashboard-title">
          Chef Technique Dashboard
        </Typography>
        <Grid container spacing={2} className="menu-grid">
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="contained" 
              color="primary" 
              className="menu-button" 
              onClick={() => handleMenuClick('/list-tech-projects')}
              startIcon={<ListAltIcon />}
            >
              Lister tous les projets
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="contained" 
              color="primary" 
              className="menu-button" 
              onClick={() => handleMenuClick('/list-tech-workers')}
              startIcon={<PersonIcon />}
            >
              Lister les ouvriers avec l’absence
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="contained" 
              color="primary" 
              className="menu-button" 
              onClick={() => handleMenuClick('/list-tech-daily-reports')}
              startIcon={<ReportIcon />}
            >
              Lister les rapports du jour
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="contained" 
              color="primary" 
              className="menu-button" 
              onClick={() => handleMenuClick('/list-tech-weekly-reports')}
              startIcon={<ReportIcon />}
            >
              Lister les rapports hebdomadaires
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="contained" 
              color="primary" 
              className="menu-button" 
              onClick={() => handleMenuClick('/list-tech-progress')}
              startIcon={<TrendingUpIcon />}
            >
              Lister les avancements
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="contained" 
              color="primary" 
              className="menu-button" 
              onClick={() => handleMenuClick('/list-tech-materials')}
              startIcon={<CategoryIcon />}
            >
              Lister la quantité des matériels
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="contained" 
              color="primary" 
              className="menu-button" 
              onClick={() => handleMenuClick('/list-tech-validated-needs')}
              startIcon={<ListAltIcon />}
            >
              Lister les besoins validés
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="contained" 
              color="primary" 
              className="menu-button" 
              onClick={() => handleMenuClick('/list-tech-files')}
              startIcon={<FileUploadIcon />}
            >
              Lister/Ajouter des fichiers
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
