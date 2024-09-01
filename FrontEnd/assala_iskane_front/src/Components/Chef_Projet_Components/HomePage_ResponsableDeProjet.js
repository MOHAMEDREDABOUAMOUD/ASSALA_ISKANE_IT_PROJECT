import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Typography,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Box,
  CssBaseline,
  // Sidebar.js and HomePage_ResponsableDeProjet.js

} from '@mui/material';
// Sidebar.js and HomePage_ResponsableDeProjet.js
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
import SideBar from './SideBar';

const drawerWidth = 280;

const menuItems = [
  { text: 'Lister tous les projets', icon: <ListIcon />, path: 'list-projects' },
  { text: 'Lister les ouvriers avec l\'absence', icon: <GroupIcon />, path: 'list-workers-listOuvrierChefProjet' },
  { text: 'Lister/Ajouter les rapports du jour', icon: <ReportIcon />, path: 'daily-reports' },
  { text: 'Lister/Ajouter les rapports hebdomadaires', icon: <CalendarViewMonthIcon />, path: 'weekly-reports' },
  { text: 'Lister/Ajouter les avancements', icon: <TrendingUpIcon />, path: 'progress' },
  { text: 'Lister la quantité des matériels', icon: <InventoryIcon />, path: 'list-materials' },
  { text: 'Lister/Valider les besoins du chef chantier', icon: <FolderIcon />, path: 'declare-needs' },
  { text: 'Lister/Ajouter des fichiers', icon: <FolderIcon />, path: 'list-files' },
];

export default function HomePage_ResponsableDeProjet() {
  const { id_resp, id_projet } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(menuItems[0].path); // Default selection

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (path) => {
    setSelectedOption(path);
    navigate(`/${path}/${id_resp}/${id_projet}`);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'list-projects':
        navigate("/list-projects/"+id_resp+"/"+id_projet);
        break;
      case 'weekly-reports':
        navigate("/weekly-reports/"+id_resp+"/"+id_projet)
        break;
      case 'daily-reports':
        navigate("/daily-reports/"+id_resp+"/"+id_projet)
        break;
      case 'progress':
        navigate("/progress/"+id_resp+"/"+id_projet)
        break;
      case 'list-materials':
        navigate("/list-materials-ChefProjet/"+id_resp+"/"+id_projet)
        break;
      case 'list-needs':
        navigate("/list-needs-chefProjet/"+id_resp+"/"+id_projet)
        break;
      case 'list-files':
        navigate("/list-files/"+id_resp+"/"+id_projet)
        break;
                    
      default:
        return <Typography variant="h6">Please select an option from the menu.</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
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
            Chef de Projet Dashboard
          </Typography>
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
          <SideBar
            menuItems={menuItems}
            selectedOption={selectedOption}
            handleMenuClick={handleMenuClick}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <SideBar
            menuItems={menuItems}
            selectedOption={selectedOption}
            handleMenuClick={handleMenuClick}
          />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          <DashboardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Welcome to your Dashboard
        </Typography>
        {renderSelectedComponent()}
      </Box>
    </Box>
  );
}
