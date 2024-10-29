import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../images/logo00.png";

const NavBar2 = ({ menuLabel = "Home" }) => { // Set a default value for menuLabel
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Only add to menuItems if menuLabel is defined and not empty
  const menuItems = menuLabel ? [{ text: menuLabel, link: '/' }] : [];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src={Logo} alt="Logo" style={{ height: '40px' }} />
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.link}>
            <Avatar
              sx={{ 
                width: theme.spacing(12),
                height: theme.spacing(12),
                margin: 'auto',
                bgcolor: theme.palette.primary.main,
                fontSize: theme.typography.h3.fontSize
              }}
            >
              {item.text.charAt(0)} {/* Safely access the first character */}
            </Avatar>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="default" elevation={1}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            Assala Iskane
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.link}
                sx={{ color: 'inherit', ml: 2 }}
              >
                <Avatar
                  sx={{ 
                    width: theme.spacing(3),
                    height: theme.spacing(3),
                    marginRight: theme.spacing(1),
                    bgcolor: theme.palette.primary.main,
                    fontSize: theme.typography.h6.fontSize
                  }}
                >
                  {item.text.charAt(0)} {/* Safely access the first character */}
                </Avatar>
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar /> {/* This empty Toolbar acts as a spacer */}
    </>
  );
};

export default NavBar2;
