import React from 'react'
import { Logout as LogoutIcon } from '@mui/icons-material';
import Logo from "../../images/logo00.png"; // Import your logo
import { AppBar, Box, Button, styled, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';



export default function StyledAppBar({Titre}) {
    const drawerWidth = 280;
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log("Logout clicked");
        navigate('/logout');
    };
    const StyledAppBar = styled(AppBar)(({ theme }) => ({
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: '#ffffff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        position: 'fixed',
        top: 0,
        zIndex: theme.zIndex.drawer + 1
    }));

    return (
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
                    {Titre}
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
    )
}
