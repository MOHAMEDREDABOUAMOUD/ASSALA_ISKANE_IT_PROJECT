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
  Dashboard as DashboardIcon,
  ListAlt as ListAltIcon,
  Person as PersonIcon,
  Report as ReportIcon,
  TrendingUp as TrendingUpIcon,
  Category as CategoryIcon,
  FileUpload as FileUploadIcon,
} from '@mui/icons-material';
import ListTechDailyReports from './ListTechDailyReports';
import ListFiles from './ListTechFiles';
import ListTechMaterials from './ListTechMaterials';
import ListTechProgress from './ListTechProgress';
import ListTechProjects from './ListTechProjects';
import ListTechWeeklyReports from './ListTechWeeklyReports';
import ListTechWorkersWithAbsence from './ListTechWorkersWithAbsence';
import ListValidatedNeeds from './ListValidatedNeeds';
import { useParams } from 'react-router';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/HomePage_RespTechnique' },
  { text: 'Projets', icon: <ListAltIcon />, path: '/list-tech-projects' },
  { text: 'Ouvriers', icon: <PersonIcon />, path: '/list-tech-workers' },
  { text: 'Rapports du jour', icon: <ReportIcon />, path: '/list-tech-daily-reports' },
  { text: 'Rapports hebdomadaires', icon: <ReportIcon />, path: '/list-tech-weekly-reports' },
  { text: 'Avancements', icon: <TrendingUpIcon />, path: '/list-tech-progress' },
  { text: 'Matériels', icon: <CategoryIcon />, path: '/list-tech-materials' },
  { text: 'Besoins validés', icon: <ListAltIcon />, path: '/list-tech-validated-needs' },
  { text: 'Fichiers', icon: <FileUploadIcon />, path: '/list-tech-files' },
];

export default function ResponsiveTechDashboard() {
  const { id_resp, id_projet } = useParams();
  //get from backend id_projet when they shose project:
  //const id_projet ='P001';
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
      case '/list-tech-daily-reports':
        navigate("/list-tech-daily-reports/"+id_resp+"/"+id_projet);
      case '/list-tech-files':
        navigate("/list-tech-files/"+id_resp+"/"+id_projet);
      case '/list-tech-materials':
        navigate("/list-tech-materials/"+id_resp+"/"+id_projet);
      case '/list-tech-progress':
        navigate("/list-tech-progress/"+id_resp+"/"+id_projet);
      case '/list-tech-projects':
        navigate("/list-tech-progress/"+id_resp+"/"+id_projet);
      case '/list-tech-weekly-reports':
        navigate("/list-tech-weekly-reports/"+id_resp+"/"+id_projet);
      case '/list-tech-workers':
        navigate("/list-tech-workers/"+id_resp+"/"+id_projet);
      case '/list-tech-validated-needs':
        navigate("/list-tech-validated-needs/"+id_resp+"/"+id_projet);
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
            Chef Technique Dashboard
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
