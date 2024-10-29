import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Toolbar,
  useTheme,
  useMediaQuery,
  CssBaseline,
} from '@mui/material';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConstructionIcon from '@mui/icons-material/Construction';
import SideBar from './SideBar';
import { AppBar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 280;

export default function ListMaterialsChefProjet() {
  const { id_projet, id_resp } = useParams();
  const [materials, setMaterials] = useState([]);
  const [chantierMaterials, setChantierMaterials] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('list-materials-ChefProjet');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      currencyDisplay: 'symbol',
    }).format(price);
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:9092/assalaiskane/getMaterielsChantiers?id_projet=${id_projet}`);
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    const fetchChantierMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:9092/assalaiskane/getMateriauxChantiers?id_projet=${id_projet}`);
        setChantierMaterials(response.data);
      } catch (error) {
        console.error('Error fetching chantier materials:', error);
      }
    };

    fetchMaterials();
    fetchChantierMaterials();
  }, [id_projet]);

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

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
  position="fixed"
  sx={{
    width: { sm: `calc(100% - ${drawerWidth}px)` },
    ml: { sm: `${drawerWidth}px` },
    boxShadow: 3, // Add shadow for depth
    backgroundColor: '#e5e7e6', // Updated background color
  }}
>
  <Toolbar
    sx={{
      display: 'flex',
      justifyContent: 'space-between', // Space out the content
      alignItems: 'center', // Center items vertically
      px: 2, // Add horizontal padding
    }}
  >
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ 
        display: { sm: 'none' }, // Hide on larger screens
        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }, // Add hover effect
      }}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'black' }}>
      Gestion des Matériaux
    </Typography>
    <Box
      sx={{
        display: { xs: 'none', sm: 'block' }, // Hide on smaller screens
      }}
    >
      {/* You can add additional items here if needed */}
    </Box>
  </Toolbar>
</AppBar>
      <SideBar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        selectedOption={selectedOption}
        handleMenuClick={handleMenuClick}
      />
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, marginTop: '64px' }}
      >
        <Toolbar />
        <Box display="flex" alignItems="center" mb={2}>
          <Button startIcon={<ArrowBackIcon />} onClick={handleReturn} variant="outlined">
            Retour
          </Button>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" component="h2" gutterBottom display="flex" alignItems="center">
            <InventoryIcon sx={{ mr: 1 }} /> Liste des Matérieles
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Quantité</TableCell>
                  <TableCell>Prix</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell>{material.id}</TableCell>
                    <TableCell>{material.nom}</TableCell>
                    <TableCell>{material.qte}</TableCell>
                    <TableCell>{formatPrice(material.prix)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom display="flex" alignItems="center">
            <ConstructionIcon sx={{ mr: 1 }} /> Liste des Matériaux de Chantier
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Quantité</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Prix</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chantierMaterials.map((material) => (
                  <TableRow key={material.id_materiaux}>
                    <TableCell>{material.id}</TableCell>
                    <TableCell>{material.nom}</TableCell>
                    <TableCell>{material.qte}</TableCell>
                    <TableCell>{material.type}</TableCell>
                    <TableCell>{formatPrice(material.prix)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}