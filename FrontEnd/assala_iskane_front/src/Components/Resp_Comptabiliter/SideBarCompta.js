import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from '@mui/material';
import {
  Group as GroupIcon,
  Folder as FolderIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

const SideBarCompta = ({ mobileOpen, handleDrawerToggle, selectedOption, handleMenuClick }) => {
  const { id_resp, id_projet } = useParams();

  const menuItems = [
    { text: 'Lister tous les ouvriers', icon: <GroupIcon />, path: `/ListAllOuvrierRespCompta/${id_resp}/${id_projet}` },
    { text: 'Lister les fichiers comptables', icon: <FolderIcon />, path: `/listFilesCompta/${id_resp}/${id_projet}` },
    { text: 'Lister les besoins validés', icon: <CheckCircleIcon />, path: `/ListValidatedNeedsCompta/${id_resp}/${id_projet}` },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Menu
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={selectedOption === item.path}
            onClick={() => handleMenuClick(item.path)}
            component={RouterLink}
            to={item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
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
    </>
  );
};

export default SideBarCompta;