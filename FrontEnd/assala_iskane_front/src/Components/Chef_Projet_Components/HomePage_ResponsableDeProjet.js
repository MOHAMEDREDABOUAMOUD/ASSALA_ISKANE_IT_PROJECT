import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Box,
  CssBaseline,
} from '@mui/material';
import {
  Menu as MenuIcon,
  List as ListIcon,
  Group as GroupIcon,
  Report as ReportIcon,
  CalendarViewMonth as CalendarViewMonthIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon,
  Folder as FolderIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import ListProjects from './ListProjects';
import WeeklyReports from './WeeklyReports';
import DailyReports from './DailyReports';
import Progress from './Progress';
import ListMaterials from '../Chef_Chantier_Components/ListMaterials';
import ListNeeds from './ListNeeds';
import ListFiles from './ListFiles';


const drawerWidth = 280;

const menuItems = [
  { text: 'Lister tous les projets', icon: <ListIcon />, path: 'list-projects' },
  { text: 'Lister les ouvriers avec l\'absence', icon: <GroupIcon />, path: 'list-workers' },
  { text: 'Lister/Ajouter les rapports du jour', icon: <ReportIcon />, path: 'daily-reports' },
  { text: 'Lister/Ajouter les rapports hebdomadaires', icon: <CalendarViewMonthIcon />, path: 'weekly-reports' },
  { text: 'Lister/Ajouter les avancements', icon: <TrendingUpIcon />, path: 'progress' },
  { text: 'Lister la quantité des matériels', icon: <InventoryIcon />, path: 'list-materials' },
  { text: 'Lister/Valider les besoins du chef chantier', icon: <FolderIcon />, path: 'declare-needs' },
  { text: 'Lister/Ajouter des fichiers', icon: <FolderIcon />, path: 'list-files' },
];
/*
<Route path="/list-projects" element={<ListProjects />} />
<Route path="/daily-reports" element={<DailyReports />} />
<Route path="/weekly-reports" element={<WeeklyReports />} />
<Route path="/progress" element={<Progress />} />
<Route path="/list-materials" element={<ListMaterials />} />
<Route path="/list-needs" element={<ListNeeds />} />
<Route path="/list-files" element={<ListFiles />} />
*/
export default function HomePage_ResponsableDeProjet({ id_projet, id_resp }) {
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
    navigate(`/${path}`);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'list-projects':
        return <ListProjects/>;
      case 'weekly-reports':
        return <WeeklyReports id_projet={id_projet} id_resp={id_resp} />;
      case 'daily-reports':
        return <DailyReports id_projet={id_projet} id_resp={id_resp} />;
      case 'progress':
        return <Progress id_projet={id_projet} id_resp={id_resp} />;
      case 'list-materials':
        return <ListMaterials id_projet={id_projet} id_resp={id_resp} />;
      case 'list-needs':
        return <ListNeeds id_projet={id_projet} id_resp={id_resp} />;
      case 'list-files':
        return <ListFiles id_projet={id_projet} id_resp={id_resp} />;
                    
      default:
        return <Typography variant="h6">Please select an option from the menu.</Typography>;
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
        <Typography variant="h4" gutterBottom>
          <DashboardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Welcome to your Dashboard
        </Typography>
        {renderSelectedComponent()}
      </Box>
    </Box>
  );
}
