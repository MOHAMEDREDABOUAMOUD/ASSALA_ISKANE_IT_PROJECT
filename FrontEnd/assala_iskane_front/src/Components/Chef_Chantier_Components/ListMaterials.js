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
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  CssBaseline,
  Drawer,
  styled
} from '@mui/material';
import axios from 'axios';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConstructionIcon from '@mui/icons-material/Construction';
import { getName, getPROJECTID } from '../constants';
import SideBarChefChantier from './SideBarChefChantier.js';
import { Logout as LogoutIcon } from '@mui/icons-material';
import Logo from "../../images/logo00.png"; // Import your logo
const drawerWidth = 280;

export default function ListMaterials() {
  const { id_projet, id_resp } = useParams();
  const [materials, setMaterials] = useState([]);
  const [chantierMaterials, setChantierMaterials] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('list-materials');

  const drawerWidth = 280;

  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
  }));

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
        const response = await axios.get(`http://localhost:9092/assalaiskane/getMaterielsChantiers?id_projet=${getPROJECTID()}`);
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    const fetchChantierMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:9092/assalaiskane/getMateriauxChantiers?id_projet=${getPROJECTID()}`);
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
  const handleLogout = () => {
    console.log("Logout clicked");
    navigate('/logout');
  };

  const drawer = (
    <div>
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
                   Lister Materials
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
        <SideBarChefChantier/>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: '1000px' ,marginLeft: '280px',marginTop:'-200px'}}

      >



        <Box mb={4}>
          <Typography variant="h5" component="h2" gutterBottom display="flex" alignItems="center">
            <InventoryIcon sx={{ mr: 1 }} /> Liste des Matériels
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
