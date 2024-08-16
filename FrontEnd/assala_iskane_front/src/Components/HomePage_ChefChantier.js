import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../CSS/Home.css'; // Add any custom CSS if needed

// Sample personal information
const chefChantierInfo = {
  id: 'USR002',
  lastName: 'Benjelloun',
  firstName: 'Ahmed',
  role: 'ChefChantier',
  phone: '0678901234',
  email: 'ahmed.benjelloun@example.com',
  password: 'password2'
};

export default function HomePage_ChefChantier() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Chef Chantier Dashboard
          </Typography>
          <Avatar>{chefChantierInfo.firstName[0]}</Avatar>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            Welcome, {chefChantierInfo.firstName} {chefChantierInfo.lastName}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {chefChantierInfo.role}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {chefChantierInfo.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {chefChantierInfo.email}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleMenuClick('/list-workers')} 
            sx={{ width: '80%' }}
          >
            Lister les ouvriers et marquer l’absence
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => handleMenuClick('/list-materials')} 
            sx={{ width: '80%' }}
          >
            Lister la quantité des matériels et des matériaux disponibles
          </Button>
          <Button 
            variant="outlined" 
            color="success" 
            onClick={() => handleMenuClick('/declare-needs')} 
            sx={{ width: '80%' }}
          >
            Déclarer des besoins
          </Button>
        </Box>
      </Container>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuClick('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handleMenuClick('/logout')}>Logout</MenuItem>
      </Menu>
    </>
  );
}
