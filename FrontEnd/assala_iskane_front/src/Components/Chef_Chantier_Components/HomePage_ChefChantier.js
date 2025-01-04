import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Box,
  Toolbar,
  Typography,
  CssBaseline,
  useTheme,
  useMediaQuery,
  createTheme,
  styled,
  ThemeProvider,
  Button
} from '@mui/material';

import AppBar from '@mui/material/AppBar';
import SideBarChefChantier from './SideBarChefChantier';
import DashBoardChefChantier from './DashBoardChefChantier';
import { Logout as LogoutIcon } from '@mui/icons-material';
import Logo from "../../images/logo00.png"; // Import your logo
// import other icons/components as needed
// import { getName, getPROJECTID, getUSERID } from '../constants'; // if you need these

// --------------------- THEME SETUP ---------------------
const myTheme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#42a5f5' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#2c3345' }
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h5: { fontWeight: 600 },
    h6: { fontWeight: 500 }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
          borderRadius: 16
        }
      }
    }
  }
});

// ------------------- STYLED APP BAR --------------------
const drawerWidth = 280;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - ${drawerWidth}px)`,
  backgroundColor: '#ffffff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
}));



export default function HomePage_ChefChantier() {
  const { id_resp, id_projet } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const option = params.get('option');
    if (option) {
      setSelectedOption(option);
    }
  }, [location.search]);

  // Example for handling menu clicks
  const handleMenuClick = (option) => {
    setSelectedOption(option);
    // Navigate or handle logic accordingly
    // e.g. navigate(`?option=${option}`);
  };


  const handleLogout = () => {
    console.log("Logout clicked");
    navigate('/logout');
  };

  // The content that changes based on selectedOption
  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'list-workers':
        // Example: navigate to /list-workers
        // navigate('/list-workers/' + getUSERID() + '/' + getPROJECTID());
        return null;
      case 'list-materials':
        // Example: navigate to /list-materials
        return null;
      case 'declare-needs':
        // Example: navigate to /declare-needs
        return null;
      default:
        // Default: show Chef Chantier info card
        return (
            <DashBoardChefChantier/>
        );
    }
  };

  return (
    <ThemeProvider theme={myTheme}>
      <Box sx={{ display: 'flex', backgroundColor: '#ffffff' }}>
        <CssBaseline />
        {/* Sidebar on the left */}
        <SideBarChefChantier
          drawerWidth={drawerWidth}
          onMenuClick={handleMenuClick}
        />

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            backgroundColor: '#ffffff',
            flexGrow: 1,
            p: 3,
            marginLeft: `${drawerWidth + 40}px`,  // a little extra space
            marginTop: '80px'
          }}
        >
          <StyledAppBar position="fixed">
      <Toolbar sx={{ minHeight: 64 }}>
        {/* Left: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={Logo}
            alt="Entreprise Logo"
            style={{ height: '50px' , width: '50px'}}
          />

        </Box>

        {/* Center: Page Title */}
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h5" color="textPrimary">
            Home Page Chef Chantier
          </Typography>
        </Box>

         {/* Right: Logout Button with Icon */}
         <Button
          color="primary"
          variant="contained"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Toolbar>
    </StyledAppBar>

          {/* Render whichever content depends on selectedOption */}
          {renderSelectedComponent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
