import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BuildIcon from '@mui/icons-material/Build';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';

const chefChantierInfo = {
  id: 'USR002',
  lastName: 'Benjelloun',
  firstName: 'Ahmed',
  role: 'Chef Chantier',
  phone: '0678901234',
  email: 'ahmed.benjelloun@example.com',
  password: 'password2'
};

export default function HomePage_ChefChantier() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <DashboardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Chef Chantier Dashboard
          </Typography>
          <Tooltip title="Profile">
            <IconButton color="inherit" onClick={() => handleMenuClick('/profile')}>
              <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>{chefChantierInfo.firstName[0]}</Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Card elevation={3}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{ 
                      width: theme.spacing(12),
                      height: theme.spacing(12),
                      margin: 'auto',
                      bgcolor: theme.palette.primary.main,
                      fontSize: theme.typography.h3.fontSize
                    }}
                  >
                    {chefChantierInfo.firstName[0]}{chefChantierInfo.lastName[0]}
                  </Avatar>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {chefChantierInfo.firstName} {chefChantierInfo.lastName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {chefChantierInfo.role}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                  <Typography variant="body1">
                    <strong>Phone:</strong> {chefChantierInfo.phone}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {chefChantierInfo.email}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ListAltIcon />}
              onClick={() => handleMenuClick('/list-workers')}
              fullWidth
              sx={{ py: 2 }}
            >
              Lister les ouvriers et marquer l'absence
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<BuildIcon />}
              onClick={() => handleMenuClick('/list-materials')}
              fullWidth
              sx={{ py: 2 }}
            >
              Lister la quantité des matériels et des matériaux
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              color="success"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => handleMenuClick('/declare-needs')}
              fullWidth
              sx={{ py: 2 }}
            >
              Déclarer des besoins
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleMenuClick('/profile')}>
          <PersonIcon sx={{ mr: 1 }} /> Profile
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick('/logout')}>
          <ExitToAppIcon sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}