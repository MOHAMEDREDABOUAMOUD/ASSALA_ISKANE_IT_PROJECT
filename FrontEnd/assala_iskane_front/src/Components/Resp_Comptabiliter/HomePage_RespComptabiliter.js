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
  useMediaQuery,
  Paper,
  Container,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Menu as MenuIcon,
  Group as GroupIcon,
  Folder as FolderIcon,
  CheckCircle as CheckCircleIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import ListFilesCompta from './ListFilesCompta';
import ListValidatedNeedsCompta from './ListValidatedNeedsCompta';
import ListAllOuvrierRespCompta from './ListAllOuvrierRespCompta';

// Définir la largeur du tiroir
const drawerWidth = 280;

// Définir les éléments de menu
const menuItems = [
  { text: 'Tableau de Bord', icon: <DashboardIcon />, path: 'HomePage_RespComptabiliter' },
  { text: 'Liste des Ouvriers', icon: <GroupIcon />, path: 'ListAllOuvrierRespCompta' },
  { text: 'Fichiers Comptables', icon: <FolderIcon />, path: 'listFilesCompta' },
  { text: 'Besoins Validés', icon: <CheckCircleIcon />, path: 'ListValidatedNeedsCompta' },
];

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Deep blue
      light: '#42a5f5',
      dark: '#1565c0'
    },
    background: {
      default: 'white', // Soft light gray
      paper: '#ffffff'
    },
    text: {
      primary: '#2c3345' // Dark gray for better readability
    }
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h6: {
      fontWeight: 600,
      letterSpacing: '0.5px'
    }
  },
  shape: {
    borderRadius: 12
  }
});

// Styled components for enhanced visual appeal
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
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
}));



export default function HomePage_RespComptabiliter() {
  const { id_resp, id_projet } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('dashboard');

  useEffect(() => {
    const currentPath = location.pathname.split('/').pop();
    setSelectedOption(currentPath || 'dashboard');
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



  // Le reste du code reste identique
  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
          Comptabilité
        </Typography>
      </Toolbar>
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <StyledListItem
            key={item.text}
            onClick={() => handleMenuClick(item.path)}
            selected={selectedOption === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={2}
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: theme.palette.common.white,
            color: theme.palette.text.primary,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
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
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Tableau de Bord du Responsable Comptabilité
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="navigation menu"
        >
          <StyledDrawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
            }}
          >
            {drawer}
          </StyledDrawer>
          <StyledDrawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
            open
          >
            {drawer}
          </StyledDrawer>
        </Box>
        <Dashboard/>
      </Box>
    </ThemeProvider>
  );
}
function Dashboard() {
     // Data for the Cards
  const projectStats = [
    { title: 'Projets Validés', value: 12 },
    { title: 'Projets en Attente', value: 5 },
    { title: 'Besoins Validés', value: 40 },
    { title: 'Dépenses Totales', value: '25,000 €' },
  ];

  // Data for the Bar Chart
  const revenueData = [
    { month: 'Jan', revenue: 12000, depenses: 8000 },
    { month: 'Feb', revenue: 15000, depenses: 10000 },
    { month: 'Mar', revenue: 17000, depenses: 12000 },
    { month: 'Apr', revenue: 14000, depenses: 9000 },
  ];

  // Data for the Pie Chart
  const pieData = [
    { name: 'Salaires', value: 40 },
    { name: 'Matériaux', value: 30 },
    { name: 'Sous-traitance', value: 20 },
    { name: 'Autres', value: 10 },
  ];
  const COLORS = ['#1976d2', '#ff5722', '#4caf50', '#ffc107'];

  return (
    <Container maxWidth="lg" sx={{ py: 4 , margin:10}}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 3,
          minHeight: 'calc(100vh - 120px)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Tableau de Bord - Responsable Comptabilité
        </Typography>

        {/* Dashboard Content */}
        <Grid container spacing={3} justifyContent="center">
          {/* Cards */}
          {projectStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card elevation={3} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Bar Chart */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Revenus et Dépenses
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#1976d2" name="Revenus" />
                <Bar dataKey="depenses" fill="#ff5722" name="Dépenses" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Répartition du Budget
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    );
  }
