import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Button, 
  Typography, 
  Grid, 
  Paper, 
  AppBar, 
  Toolbar, 
  IconButton, 
  useTheme, 
  useMediaQuery, 
  CssBaseline, 
  Box, 
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  ListAlt, 
  LocalShipping, 
  Description, 
  Archive, 
  Inventory, 
  Menu as MenuIcon 
} from '@mui/icons-material';
import ListAllOuvrier from '../Resp_Comptabiliter/ListAllOuvrier';
import ListFilesMar from './ListFilesMarchandise';
import ListServiceValidatedNeedsMar from './ListValidatedNeedsMar';
import { useParams } from 'react-router';

const menuItems = [
  { text: 'Lister tous les ouvriers', icon: <ListAlt />, path: '/listAllOuvriers' },
  { text: 'Lister les fichiers', icon: <Description />, path: '/listFilesMarchandise' },
  { text: 'Lister les besoins validés', icon: <Inventory />, path: '/listValidatedNeedsMarchandise' }
];

export default function HomePage_RespMarchandise() {
  const { id_resp, id_projet } = useParams();
  //get from backend id_projet when they shose project:
  //const id_projet ='P001';
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(menuItems[0].path); // Default selection

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case '/listAllOuvriers':
        navigate("/listAllOuvriers/"+id_resp+"/"+id_projet);
      case '/listFilesMarchandise':
        navigate("/listFilesMarchandise/"+id_resp+"/"+id_projet);
      case '/listValidatedNeedsMarchandise':
        navigate("/listValidatedNeedsMarchandise/"+id_resp+"/"+id_projet);
      default:
        return <Typography variant="h6">Please select an option from the menu.</Typography>;
    }
  };

  const handleMenuClick = (path) => {
    setSelectedOption(path);
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - 240px)` }, ml: { sm: '240px' } }}>
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
          <Typography variant="h6" noWrap component="div">
            Responsable de Marchandise Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }} aria-label="menu items">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          <div>
            <Toolbar />
            <List>
              {menuItems.map((item) => (
                <ListItem button key={item.text} onClick={() => handleMenuClick(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
          open
        >
          <div>
            <Toolbar />
            <List>
              {menuItems.map((item) => (
                <ListItem button key={item.text} onClick={() => handleMenuClick(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}>
        <Toolbar />
        <Typography paragraph>
          Welcome to the Responsable de Marchandise Dashboard. Select an option from the menu to get started.
        </Typography>
        {renderSelectedComponent()}
      </Box>
    </Box>
  );
}
