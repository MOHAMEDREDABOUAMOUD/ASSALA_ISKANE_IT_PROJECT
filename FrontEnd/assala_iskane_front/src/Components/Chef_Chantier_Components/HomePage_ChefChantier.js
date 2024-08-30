import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Button,
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BuildIcon from '@mui/icons-material/Build';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListOuvrier from './ListOuvrier';
import ListMaterials from './ListMaterials';
import DeclareNeeds from './DeclareNeeds';
import { useParams } from 'react-router';

const chefChantierInfo = {
  id: 'USR002',
  lastName: 'Benjelloun',
  firstName: 'Ahmed',
  role: 'Chef Chantier',
  phone: '0678901234',
  email: 'ahmed.benjelloun@example.com',
  password: 'password2'
};

const drawerWidth = 240;

export default function HomePage_ChefChantier() {
  const { id_resp, id_projet } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  //const id_projet = 'P001'; // Example project ID

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const option = params.get('option');
    if (option) {
      setSelectedOption(option);
    }
  }, [location.search]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (option) => {
    setSelectedOption(option);
    navigate(`?option=${option}`);
    if (isMobile) {
      setMobileOpen(false);
    }
  };
  const handleMenuClicklogout= () => {
    navigate(`/logout`);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'list-workers':
        navigate('/list-workers/'+id_resp+'/'+id_projet);
      case 'list-materials':
        navigate('/list-materials/'+id_resp+'/'+id_projet);
      case 'declare-needs':
        navigate('/declare-needs/'+id_resp+'/'+id_projet);
      default:
        return (
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
        );
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button onClick={() => handleMenuClick('profile')}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick('list-workers')}>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="List Workers" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick('list-materials')}>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="List Materials" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick('declare-needs')}>
          <ListItemIcon>
            <AddShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Declare Needs" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleMenuClicklogout()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <DashboardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Chef Chantier Dashboard
          </Typography>
          <Tooltip title="Profile">
            <IconButton color="inherit" onClick={() => handleMenuClick('profile')}>
              <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>{chefChantierInfo.firstName[0]}</Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {renderSelectedComponent()}
      </Box>
    </Box>
  );
}