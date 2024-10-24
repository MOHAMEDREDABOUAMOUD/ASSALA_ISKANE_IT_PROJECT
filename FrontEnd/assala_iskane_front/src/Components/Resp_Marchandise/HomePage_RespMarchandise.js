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
  List as ListIcon,
  Group as GroupIcon,
  Report as ReportIcon,
  CalendarViewMonth as CalendarViewMonthIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router';

const menuItems = [
  { text: 'Lister tous les ouvriers', icon: <GroupIcon />, path: 'ListAllOuvrierRespMarchandise' },
  { text: 'Lister/Ajouter les rapports du jour', icon: <ReportIcon />, path: 'daily-reports' },
  { text: 'Lister/Ajouter les rapports hebdomadaires', icon: <CalendarViewMonthIcon />, path: 'weekly-reports' },
  { text: 'Lister/Ajouter les avancements', icon: <TrendingUpIcon />, path: 'progress' },
  { text: 'Lister la quantité des matériels', icon: <InventoryIcon />, path: 'ListerMaterialRespMarchandise' },
  { text: 'Lister/Valider les besoins', icon: <FolderIcon />, path: 'ListMaterialsNeedRespMarchandise' },
  { text: 'Lister/Ajouter des fichiers', icon: <FolderIcon />, path: 'ListFilesMar' },
];

export default function HomePage_RespMarchandise() {
  const { id_resp, id_projet } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(menuItems[0].path);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (path) => {
    setSelectedOption(path);
    
    // Special case for AllProjectsListMarchandise
    if (path === 'AllProjectsListMarchandise') {
      navigate(`/${path}/${id_resp}`);
    } else {
      // For all other paths
      navigate(`/${path}/${id_resp}/${id_projet}`);
    }
    
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const renderSelectedComponent = () => {
    // This function might need to be updated based on your routing structure
    return <Typography variant="h6">Please select an option from the menu.</Typography>;
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