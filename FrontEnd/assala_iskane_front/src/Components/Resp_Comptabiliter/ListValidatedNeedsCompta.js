import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

import SideBarCompta from './SideBarCompta';

import {
  ArrowBack as ArrowBackIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  ListAlt as ListAltIcon,
  Build as BuildIcon,
  DateRange as DateRangeIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

import {
  Container,
  Typography,
  Button,
  IconButton,
  Box,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  CircularProgress,
  Paper,
} from '@mui/material';

export default function ListMaterialsNeedRespMarchandise() {
  const { id_resp, id_projet } = useParams();
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('ListAllOuvrierRespMarchandise');

  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

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

  const drawerWidth = 280;

  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
  }));

  useEffect(() => {
    const fetchNeeds = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:9092/assalaiskane/getBesoinsCC?id_projet=${id_projet}`
        );
        setNeeds(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching needs:', error);
        setError('Erreur lors du chargement des besoins.');
      } finally {
        setLoading(false);
      }
    };

    fetchNeeds();
  }, [id_projet]);

  return (
    <Box sx={{ display: 'flex' ,marginTop: '-200px',}}>
      <StyledAppBar position="fixed" sx={{alignItems:'center'}}>
                        <Toolbar>
                          {isMobile && (
                            <IconButton color="inherit" edge="start">
                              <MenuIcon />
                            </IconButton>
                          )}
                          <Typography variant="h6" color="textPrimary">
                            Gestion des Ouvriers
                          </Typography>
                        </Toolbar>
      </StyledAppBar>

      <SideBarCompta
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        selectedOption={selectedOption}
        handleMenuClick={handleMenuClick}
      />

      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 ,
         padding: '100px',
         margin: '50px',
         marginLeft: '400px',
         width:'800px'
      }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Button startIcon={<ArrowBackIcon />} onClick={handleReturn} variant="outlined">
            Retour
          </Button>
          <Typography variant="h4" component="h1" ml={2}>
            <BuildIcon fontSize="large" style={{ verticalAlign: 'middle', marginRight: '10px' }} />
            Gestion des Besoins
          </Typography>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h5" gutterBottom color="secondary">
                    <ListAltIcon
                      fontSize="small"
                      style={{ verticalAlign: 'middle', marginRight: '5px' }}
                    />
                    Liste des Besoins Déclarés
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <BuildIcon fontSize="small" /> Matériau
                          </TableCell>
                          <TableCell align="right">
                            <AddCircleOutlineIcon fontSize="small" /> Quantité
                          </TableCell>
                          <TableCell align="right">
                            <DateRangeIcon fontSize="small" /> Date de Demande
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(needs) && needs.length > 0 ? (
                          needs.map((need) => (
                            <TableRow key={need.id}>
                              <TableCell>{need.nom}</TableCell>
                              <TableCell align="right">{need.qte}</TableCell>
                              <TableCell align="right">
                                {new Date(need.date_demande).toLocaleDateString('fr-FR')}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              Aucune donnée disponible
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
