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
import { useParams } from 'react-router';

const drawerWidth = 240;

const menuItems = [
  { text: 'Lister tous les projets', icon: <AssignmentIcon />, path: '/list-service-projects' },
  { text: 'Lister les besoins validés', icon: <CheckCircleIcon />, path: '/list-service-validated-needs' },
  { text: 'Lister/Ajouter des fichiers', icon: <FolderIcon />, path: '/list-service-files' },
  { text: 'Ajouter les ouvriers', icon: <PersonIcon />, path: '/ajouter-ouvrier' },
  { text: 'Lister les matériels', icon: <CategoryIcon />, path: '/list-service-materials' },
];

export default function HomePage_ServiceTechnique() {
  const { id_resp, id_projet } = useParams();
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
        navigate('/list-service-projects/'+id_resp+"/"+id_projet);
      case '/list-service-validated-needs':
        navigate('/list-service-validated-needs/'+id_resp+"/"+id_projet);
      case '/list-service-files':
        navigate('/list-service-files/'+id_resp+"/"+id_projet);
      case '/list-service-materials':
        navigate('/list-service-materials/'+id_resp+"/"+id_projet);
      case '/ajouter-ouvrier':
        navigate('/ajouter-ouvrier/'+id_resp+"/"+id_projet);
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
