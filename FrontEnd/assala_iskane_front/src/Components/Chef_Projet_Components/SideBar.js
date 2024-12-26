// SideBarChefProjet.jsx
import React from 'react';
import {
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  List as ListIcon,
  Group as GroupIcon,
  Report as ReportIcon,
  CalendarViewMonth as CalendarViewMonthIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon,
  Folder as FolderIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

// The menu items from the original code snippet
const menuItems = [
  { text: 'Lister tous les projets', icon: <ListIcon />, path: 'list-projects' },
  { text: "Lister les ouvriers avec l'absence", icon: <GroupIcon />, path: 'list-workers-listOuvrierChefProjet' },
  { text: 'Lister/Ajouter les rapports du jour', icon: <ReportIcon />, path: 'daily-reports' },
  { text: 'Lister/Ajouter les rapports hebdomadaires', icon: <CalendarViewMonthIcon />, path: 'weekly-reports' },
  { text: 'Lister/Ajouter les avancements', icon: <TrendingUpIcon />, path: 'progress' },
  { text: 'Lister la quantité des matériels', icon: <InventoryIcon />, path: 'list-materials-chefProjet' },
  { text: 'Lister/Valider les besoins du chef chantier', icon: <FolderIcon />, path: 'ListMaterialsNeedChefProjet' },
  { text: 'Lister/Ajouter des fichiers', icon: <FolderIcon />, path: 'list-files' },
];

// Styled drawer to match your second snippet
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }
}));

export default function SideBarChefProjet({
  mobileOpen,
  handleDrawerToggle,
  selectedOption,
  handleMenuClick,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
          Chef De Projet
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleMenuClick(item.path)}
            selected={selectedOption === item.path}
            sx={{
              borderRadius: theme.shape.borderRadius,
              margin: theme.spacing(0.5, 1),
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.common.white,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.common.white
                }
              },
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.common.white
                }
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Drawer for mobile */}
      <StyledDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' }
        }}
      >
        {drawerContent}
      </StyledDrawer>

      {/* Permanent drawer for desktop */}
      <StyledDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' }
        }}
        open
      >
        {drawerContent}
      </StyledDrawer>
    </>
  );
}
