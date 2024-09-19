import React from 'react';
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
  List as ListIcon,
  Group as GroupIcon,
  Report as ReportIcon,
  CalendarViewMonth as CalendarViewMonthIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

const menuItems = [
  { text: 'Lister tous les projets', icon: <ListIcon />, path: 'AllProjectsListMarchandise' },
  { text: 'Lister tous les ouvriers', icon: <GroupIcon />, path: '/ListAllOuvrierRespMarchandise' },
  { text: 'Lister/Ajouter les rapports du jour', icon: <ReportIcon />, path: 'daily-reports' },
  { text: 'Lister/Ajouter les rapports hebdomadaires', icon: <CalendarViewMonthIcon />, path: 'weekly-reports' },
  { text: 'Lister/Ajouter les avancements', icon: <TrendingUpIcon />, path: 'progress' },
  { text: 'Lister la quantité des matériels', icon: <InventoryIcon />, path: 'ListMaterialsNeedRespMarchandise' },
  { text: 'Lister/Valider les besoins', icon: <FolderIcon />, path: 'ListServiceValidatedNeedsMar' },
  { text: 'Lister/Ajouter des fichiers', icon: <FolderIcon />, path: 'list-files' },
];

const SideBar = ({ mobileOpen, handleDrawerToggle, selectedOption, handleMenuClick }) => {
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

export default SideBar;