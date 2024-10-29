// Importations similaires
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  Divider,
  useMediaQuery,
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BuildIcon from '@mui/icons-material/Build';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import {
  AddCircleOutline as AddCircleOutlineIcon,
  Inventory as InventoryIcon,
  Construction as ConstructionIcon,
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar2 from '../NavBar2.js';
import { getName, getPROJECTID, getUSERID } from '../constants.js';

const drawerWidth = 280;

export default function DeclareNeeds() {
  const { id_resp, id_projet } = useParams();
  const [needs, setNeeds] = useState([]);
  const [newNeed, setNewNeed] = useState({
    nom: '',
    qte: '',
    date_demande: '',
    chantier: '',
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuClick = (path) => navigate(`/${path}/${getUSERID()}/${getPROJECTID()}`);
  const handleReturn = () => navigate(-1);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await axios.get(`http://localhost:9092/assalaiskane/getBesoinsCC?id_projet=${id_projet}`);
        setNeeds(response.data);
      } catch (error) {
        console.error('Error fetching needs:', error);
      }
    };
    fetchNeeds();
  }, [id_projet]);

  const handleChange = (e) => setNewNeed({ ...newNeed, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newNeed.nom && newNeed.qte && newNeed.date_demande && newNeed.chantier) {
      try {
        await axios.post(`http://localhost:9092/assalaiskane/AddBesoin?nom=${newNeed.nom}&date_demande=${newNeed.date_demande}&qte=${newNeed.qte}&valide_par=${id_resp}&id_chantier=1`);
        const response = await axios.get(`http://localhost:9092/assalaiskane/getBesoins?id_resp=${id_resp}&id_projet=${id_projet}`);
        setNeeds(response.data);
        setNewNeed({ nom: '', qte: '', date_demande: '', chantier: '' });
      } catch (error) {
        console.error('Error adding need:', error);
      }
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  const drawer = (
    <div>
      <NavBar2 menuLabel = {getName()} />
      <Toolbar />
      <Divider />
      <List>
        {/* <ListItem button onClick={() => handleMenuClick('profile')}>
          <ListItemIcon><InventoryIcon /></ListItemIcon>
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
          <ListItemIcon><ArrowBackIcon /></ListItemIcon>
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
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        open
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>Gestion des Besoins</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />

        {/* Contenu principal : formulaire et tableau */}
        <Container>
          <Typography variant="h5" gutterBottom>Déclarer un Besoin</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Nom du Besoin" name="nom" value={newNeed.nom} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Quantité" name="qte" value={newNeed.qte} onChange={handleChange} fullWidth margin="normal" required />
            <TextField type="date" label="Date de Demande" name="date_demande" value={newNeed.date_demande} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Chantier" name="chantier" value={newNeed.chantier} onChange={handleChange} fullWidth margin="normal" required />
            <Button type="submit" variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>Ajouter Besoin</Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>Liste des Besoins</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Quantité</TableCell>
                  <TableCell>Date de Demande</TableCell>
                  <TableCell>Chantier</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {needs.map((need, index) => (
                  <TableRow key={index}>
                    <TableCell>{need.nom?.toString() || ''}</TableCell>
                    <TableCell>{need.qte?.toString() || ''}</TableCell>
                    <TableCell>{need.date_demande?.toString() || ''}</TableCell>
                    <TableCell>{need.chantier?.toString() || ''}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
}
