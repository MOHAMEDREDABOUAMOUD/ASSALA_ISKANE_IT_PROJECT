import React, { useEffect, useState } from 'react';
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
  useMediaQuery
} from '@mui/material';
import { 
  CheckBox as CheckBoxIcon, 
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, 
  ArrowBack as ArrowBackIcon,
  People as PeopleIcon,
  EventBusy as EventBusyIcon
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import SideBar from './SideBar';
const drawerWidth = 280;

export default function ListOuvrierChefProjet() {
  const { id_projet, id_resp } = useParams();

    const navigate = useNavigate();
    //const id_projet = "P001";
    const [ouvriers, setOuvriers] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('list-workers-listOuvrierChefProjet');


    useEffect(() => {
        const fetchOuvriers = async () => {
            try {
                const response = await axios.get(`http://localhost:9092/assalaiskane/getOuvriers?id_projet=${id_projet}`);
                const extractedData = response.data.map(ouvrier => ({
                    id: ouvrier.id,
                    nom: ouvrier.nom,
                    prenom: ouvrier.prenom,
                    numero: ouvrier.numero,
                    selected: false
                }));
                setOuvriers(extractedData);
            } catch (error) {
                console.error('Error fetching ouvriers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOuvriers();
    }, [id_projet]);

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
    const handleRowClick = (params) => {
        const id = params.id;
        setOuvriers(prevOuvriers => prevOuvriers.map(ouvrier => 
            ouvrier.id === id ? { ...ouvrier, selected: !ouvrier.selected } : ouvrier
        ));
    };

    const handleDeclareAbsence = async () => {
        const date_absence = new Date().toISOString().split('T')[0];
        const id_chantier = 1;

        for (const ouvrier of ouvriers) {
            try {
                await axios.post(
                    `http://localhost:9092/assalaiskane/AddAbsence?id_ouvrier=${ouvrier.id}&date_absence=${date_absence}&id_chantier=${id_chantier}&absent=${ouvrier.selected ? 1 : 0}`
                );
            } catch (error) {
                console.error(`Error declaring absence for ouvrier with ID ${ouvrier.id}:`, error.response ? error.response.data : error.message);
            }
        }
    };

    const handleSelectAll = () => {
        setOuvriers(prevOuvriers => prevOuvriers.map(ouvrier => ({ ...ouvrier, selected: true })));
    };

    const handleDeselectAll = () => {
        setOuvriers(prevOuvriers => prevOuvriers.map(ouvrier => ({ ...ouvrier, selected: false })));
    };

   
    const handleRetour = () => {
            console.log("Navigating to HomePage_ChefChantier");
            navigate('/HomePage_ChefChantier');
    };
    
    
    return (
        <Container maxWidth="lg">
            <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
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
          <Typography variant="h6" noWrap component="div">
            Gestion des Matériaux
          </Typography>
        </Toolbar>
      </AppBar>
      <SideBar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        selectedOption={selectedOption}
        handleMenuClick={handleMenuClick}
      />
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Tooltip title="Retour">
                        <IconButton onClick={handleRetour} sx={{ mr: 2 }}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
                        <PeopleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Liste des Ouvriers
                    </Typography>
                    <Chip 
                        icon={<EventBusyIcon />} 
                        label="Déclarer Absence" 
                        color="primary" 
                        variant="outlined"
                    />
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ height: 400, width: '100%', mb: 2 }}>
                    <DataGrid
                        rows={ouvriers}
                        columns={columns}
                        onRowClick={handleRowClick}
                        loading={loading}
                        disableSelectionOnClick
                        sx={{
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                        }}
                    />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Tooltip title="Select All">
                            <IconButton onClick={handleSelectAll} color="primary">
                                <CheckBoxIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Deselect All">
                            <IconButton onClick={handleDeselectAll} color="secondary">
                                <CheckBoxOutlineBlankIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDeclareAbsence}
                        startIcon={<EventBusyIcon />}
                        size="large"
                    >
                        Déclarer Absence
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}