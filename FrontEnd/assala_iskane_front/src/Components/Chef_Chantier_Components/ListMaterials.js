import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
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
  IconButton,
  useTheme,
  useMediaQuery,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BuildIcon from '@mui/icons-material/Build';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConstructionIcon from '@mui/icons-material/Construction';
import MenuIcon from '@mui/icons-material/Menu';
import { getName, getPROJECTID } from '../constants';
import NavBar2 from '../NavBar2.js';
import SideBar from '../Resp_Marchandise/SideBar';

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

  const drawer = (
    <div>
      <NavBar2 menuLabel={getName()} />
      <Toolbar />
      <Divider />
      <List>
        {/* <ListItem button onClick={() => handleMenuClick('profile')}>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem> */}
        <ListItem button onClick={() => handleMenuClick('list-workers')}>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="List Workers" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick('list-materials')}>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="List Materials" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick('declare-needs')}>
          <ListItemIcon>
            <AddShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Declare Needs" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick('logout')}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
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
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box display="flex" alignItems="center" mb={2}>
          <Button startIcon={<ArrowBackIcon />} onClick={handleReturn} variant="outlined">
            Retour
          </Button>
        </Box>

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
