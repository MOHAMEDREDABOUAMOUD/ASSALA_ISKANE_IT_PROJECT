import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BuildIcon from '@mui/icons-material/Build';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import SideBarCompta from './SideBarCompta';
import { 
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { 
  Container, 
  Typography, 
  Button, 
  IconButton, 
  Tooltip, 
  Box,
  Paper,
  Divider,
  Chip,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Checkbox,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

export default function ListMaterialsNeedRespMarchandise() {
  const { id_resp, id_projet } = useParams();
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('ListAllOuvrierRespMarchandise');
  const [newNeed, setNewNeed] = useState({
    nom: '',
    qte: '',
    date_demande: '',
    chantier: '',
  });
  const navigate = useNavigate();
  //const id_resp = 'U001'; // Replace with the actual responsible user's ID
  const id_chantier = 1; // Replace with the actual chantier ID
  
  const handleReturn = () => {
    navigate(-1); // This will navigate back to the previous page
  };
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
  }, []);

  const handleChange = (e) => {
    setNewNeed({
      ...newNeed,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newNeed.nom && newNeed.qte && newNeed.date_demande && newNeed.chantier) {
      try {
        await axios.post(`http://localhost:9092/assalaiskane/AddBesoin?nom=${newNeed.nom}&date_demande=${newNeed.date_demande}&qte=${newNeed.qte}&valide_par=${id_resp}&id_chantier=${id_chantier}`);

        const response = await axios.get(`http://localhost:9092/assalaiskane/getBesoins?id_resp=${id_resp}&id_projet=${id_projet}`);
        setNeeds(response.data);

        setNewNeed({
          nom: '',
          qte: '',
          date_demande: '',
          chantier: '',
        });
      } catch (error) {
        console.error('Error adding need:', error);
      }
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nom', headerName: 'Nom', width: 150 },
    { field: 'prenom', headerName: 'Prénom', width: 150 },
    { 
        field: 'numero', 
        headerName: 'Numéro de Téléphone', 
        width: 200,
        renderCell: (params) => (
            <Chip 
                label={params.value} 
                variant="outlined" 
                size="small" 
                color="primary"
            />
        ),
    },
    {
        field: 'selected',
        headerName: 'Absent',
        width: 120,
        renderCell: (params) => (
            <Checkbox
                checked={params.row.selected}
                color="secondary"
            />
        ),
    },
];
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
  return (
    <Container maxWidth="lg">
       <SideBarCompta
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        selectedOption={selectedOption}
        handleMenuClick={handleMenuClick}
      />
      <Box display="flex" alignItems="center" mb={2}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleReturn} variant="outlined">
          Retour
        </Button>
        <Typography variant="h4" component="h1" ml={2}>
        <BuildIcon fontSize="large" style={{ verticalAlign: 'middle', marginRight: '10px' }} />
        Gestion des Besoins
        </Typography>
      </Box>

     

        <Grid item xs={12} md={7}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom color="secondary">
                <ListAltIcon fontSize="small" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                Liste des Besoins Déclarés
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><BuildIcon fontSize="small" /> Matériau</TableCell>
                      <TableCell align="right"><AddCircleOutlineIcon fontSize="small" /> Quantité</TableCell>
                      <TableCell align="right"><DateRangeIcon fontSize="small" /> Date de Demande</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(needs) && needs.length > 0 ? (
                      needs.map((need) => (
                        <TableRow key={need.id}>
                          <TableCell component="th" scope="row">{need.nom}</TableCell>
                          <TableCell align="right">{need.qte}</TableCell>
                          <TableCell align="right">{new Date(need.date_demande).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">Aucune donnée disponible</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
     
    </Container>
  );
}
