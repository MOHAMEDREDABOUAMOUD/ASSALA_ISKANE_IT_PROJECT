import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Folder as FolderIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import ListServiceProjects from './ListServiceProjects';
import ListServiceValidatedNeeds from './ListServiceValidatedNeeds';
import ListServiceFiles from './ListServiceFiles';
import ListServiceMaterials from './ListServiceMaterials';
import AjouterOuvrier from './AjouterOuvrier';

const drawerWidth = 240;

const menuItems = [
  { text: 'Lister tous les projets', icon: <AssignmentIcon />, path: '/list-service-projects' },
  { text: 'Lister les besoins validés', icon: <CheckCircleIcon />, path: '/list-service-validated-needs' },
  { text: 'Lister/Ajouter des fichiers', icon: <FolderIcon />, path: '/list-service-files' },
  { text: 'Ajouter les ouvriers', icon: <PersonIcon />, path: '/ajouter-ouvrier' },
  { text: 'Lister les matériels', icon: <CategoryIcon />, path: '/list-service-materials' },
];

export default function HomePage_ServiceTechnique({ id_resp }) {

 //get from backend id_projet when they shose project:
  const id_projet ='P001';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPath, setSelectedPath] = useState(menuItems[0].path); // Initialize with the first menu item's path
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    setSelectedPath(path);
    navigate(path);
    setMobileOpen(false);
  };

  const renderSelectedComponent = () => {
    switch (selectedPath) {
      case '/list-service-projects':
        return <ListServiceProjects />;
      case '/list-service-validated-needs':
        return <ListServiceValidatedNeeds id_projet={id_projet} id_resp={id_resp} />;
      case '/list-service-files':
        return <ListServiceFiles id_projet={id_projet} />;
      case '/list-service-materials':
        return <ListServiceMaterials id_projet={id_projet} />;
      case '/ajouter-ouvrier':
        return <AjouterOuvrier />;
      default:
        return <Typography variant="h6">Please select an option from the menu.</Typography>;
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index, item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

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
            Service Technique Dashboard
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
