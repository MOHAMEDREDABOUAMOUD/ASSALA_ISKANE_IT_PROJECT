import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams, Routes, Route } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar,
  CssBaseline,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Group as GroupIcon,
  Folder as FolderIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import ListFilesCompta from './ListFilesCompta';
import ListValidatedNeedsCompta from './ListValidatedNeedsCompta';
import ListAllOuvrierRespCompta from './ListAllOuvrierRespCompta';

const drawerWidth = 240;

const menuItems = [
  { text: 'Lister tous les ouvriers', icon: <GroupIcon />, path: 'ListAllOuvrierRespCompta' },
  { text: 'Lister les fichiers comptables', icon: <FolderIcon />, path: 'listFilesCompta' },
  { text: 'Lister les besoins validés', icon: <CheckCircleIcon />, path: 'ListValidatedNeedsCompta' },
];

export default function HomePage_RespComptabiliter() {
  const { id_resp, id_projet } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const currentPath = location.pathname.split('/')[1];
    setSelectedOption(currentPath || menuItems[0].path);
  }, [location]);

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

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => handleMenuClick(item.path)}
            selected={selectedOption === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
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
            Responsable Comptabilité Dashboard
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
            keepMounted: true,
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
        <Routes>
          <Route path="ListAllOuvrierRespCompta" element={<ListAllOuvrierRespCompta />} />
          <Route path="listFilesCompta" element={<ListFilesCompta />} />
          <Route path="ListValidatedNeedsCompta" element={<ListValidatedNeedsCompta />} />
          <Route path="/" element={
            <Typography paragraph>
              Welcome to the Responsable Comptabilité Dashboard. Select an option from the menu to get started.
            </Typography>
          } />
        </Routes>
      </Box>
    </Box>
  );
}