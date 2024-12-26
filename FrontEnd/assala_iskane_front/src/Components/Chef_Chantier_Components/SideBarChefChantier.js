// SideBarCompta.jsx
import React from 'react';
import {
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Group as GroupIcon,
  Folder as FolderIcon,
  CheckCircle as CheckCircleIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }
}));

const menuItems = [
  { text: 'List Materiels', icon: <DashboardIcon />, path: 'list-materials' },
  { text: 'Liste des Ouvriers', icon: <GroupIcon />, path: 'list-workers' },
  { text: 'Declarer Besoin', icon: <CheckCircleIcon />, path: 'declare-needs' },

];


export default function SideBarChefChantier() {
  const theme = useTheme();
  const { id_resp, id_projet } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  const handleMenuClick = (path) => {
    navigate(`/${path}/${id_resp}/${id_projet}`);
  };

  return (
    <StyledDrawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
      }}
      open
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
            Chef Chantier
          </Typography>
        </Toolbar>
        <List sx={{ flexGrow: 1, pt: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleMenuClick(item.path)}
              selected={currentPath === item.path}
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
    </StyledDrawer>
  );
}
