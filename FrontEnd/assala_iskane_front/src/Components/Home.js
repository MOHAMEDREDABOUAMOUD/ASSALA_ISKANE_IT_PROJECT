import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './NavBar.js';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Language, Phone, Email } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image2 from "../images/2.jpeg";
import image3 from "../images/3.jpeg";
import image4 from "../images/4.jpeg";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default function Home() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
    <NavBar />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Assala Iskane
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="language"
            onClick={handleMenu}
          >
            <Language />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
            <MenuItem onClick={() => changeLanguage('ar')}>العربية</MenuItem>
            <MenuItem onClick={() => changeLanguage('fr')}>Français</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Box textAlign="center" my={4}>
          <Typography variant="h2" component="h1" gutterBottom>
            {t('heroTitle')}
          </Typography>
          <Typography variant="h5" component="p" color="textSecondary">
            {t('heroSubtitle')}
          </Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            {t('aboutUsTitle')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('aboutUsContent')}
          </Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            {t('projectsTitle')}
          </Typography>
          <Grid container spacing={3}>
            {[image2, image3, image4].map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={`Project ${index + 1}`}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {t('project')} {index + 1}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            {t('contactUsTitle')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('contactUsContent')}
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Phone color="primary" />
            <Typography variant="body1" style={{ marginLeft: '1rem' }}>
              +212 123-456-789
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Email color="primary" />
            <Typography variant="body1" style={{ marginLeft: '1rem' }}>
              contact@assalaiskane.com
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
