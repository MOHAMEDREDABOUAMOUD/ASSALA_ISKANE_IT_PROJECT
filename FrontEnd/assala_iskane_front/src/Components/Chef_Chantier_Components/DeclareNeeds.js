import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  useTheme,
  Divider,
  useMediaQuery,
  styled,
  TableCell
} from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPROJECTID } from '../constants.js';
import SideBarChefChantier from './SideBarChefChantier.js';
import { Logout as LogoutIcon } from '@mui/icons-material';
import Logo from "../../images/logo00.png"; // Import your logo

// Material UI hooks
const drawerWidth = 280;

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: drawerWidth,
  backgroundColor: '#ffffff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  position: 'fixed',
  top: 0,
  zIndex: theme.zIndex.drawer + 1
}));

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  marginTop: 64
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[200]
}));

const StyledTableRow = styled(TableRow)(({ theme, even }) => ({
  backgroundColor: even ? theme.palette.action.hover : '#fff'
}));

export default function DeclareNeeds() {
  const { id_resp, id_projet } = useParams();
  const [needs, setNeeds] = useState([]);
  const [newNeed, setNewNeed] = useState({ nom: '', qte: '', date_demande: '' });
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await fetch(
          `http://localhost:9092/assalaiskane/getBesoinsCC?id_projet=${id_projet}`
        );
        const data = await response.json();
        setNeeds(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des besoins :', error);
      }
    };
    fetchNeeds();
  }, [id_projet]);

  const handleChange = (e) =>
    setNewNeed({ ...newNeed, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newNeed.nom && newNeed.qte && newNeed.date_demande) {
      try {
        await fetch(
          `http://localhost:9092/assalaiskane/AddBesoin?nom=${newNeed.nom}&date_demande=${newNeed.date_demande}&qte=${newNeed.qte}&valide_par=${id_resp}&id_projet=${getPROJECTID()}`,
          { method: 'POST' }
        );

        needs.push(newNeed);
        setNewNeed({ nom: '', qte: '', date_demande: '' });
      } catch (error) {
        console.error('Erreur lors de l’ajout du besoin :', error);
      }
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };
  const handleLogout = () => {
    console.log("Logout clicked");
    navigate('/logout');
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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
                    Declarer Nouveau Besoin
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

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <SideBarChefChantier />
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        open
      >
        <SideBarChefChantier />
      </Drawer>

      <Main sx={{ marginLeft: '280px', width: '1000px' }}>
        <Container>
          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Ajouter un Nouveau Besoin
            </Typography>
            <Paper sx={{ p: 3 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Nom du Besoin"
                  name="nom"
                  value={newNeed.nom}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Quantité"
                  name="qte"
                  value={newNeed.qte}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  type="date"
                  name="date_demande"
                  value={newNeed.date_demande}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                  label="Date de la Demande"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{ mt: 2 }}
                >
                  Ajouter
                </Button>
              </form>
            </Paper>
          </Box>

          <Divider sx={{ my: 4 }} />
          <div>
            <Typography variant="h6" gutterBottom>
              Liste des Besoins
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableHeadCell>Nom</StyledTableHeadCell>
                    <StyledTableHeadCell>Quantité</StyledTableHeadCell>
                    <StyledTableHeadCell>Date de la Demande</StyledTableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {needs.map((need, index) => (
                    <StyledTableRow key={index} even={index % 2 === 0}>
                      <TableCell>{need.nom?.toString() || ''}</TableCell>
                      <TableCell>{need.qte?.toString() || ''}</TableCell>
                      <TableCell>
                        {new Date(need.date_demande).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Container>
      </Main>
    </Box>
  );
}
