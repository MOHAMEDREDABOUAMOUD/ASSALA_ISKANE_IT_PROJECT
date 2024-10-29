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
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    CssBaseline,
    useMediaQuery
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BuildIcon from '@mui/icons-material/Build';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    ArrowBack as ArrowBackIcon,
    People as PeopleIcon,
    EventBusy as EventBusyIcon,
    Menu as MenuIcon,
    Inventory as InventoryIcon,
    Construction as ConstructionIcon
} from '@mui/icons-material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { getName, getPROJECTID, getUSERID } from '../constants';
import NavBar2 from '../NavBar2.js';

const drawerWidth = 280;

export default function ListOuvrier() {
    const { id_projet } = useParams();
    const navigate = useNavigate();
    const [ouvriers, setOuvriers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchOuvriers = async () => {
            try {
                const response = await axios.get(`http://localhost:9092/assalaiskane/getOuvriers?id_projet=${getPROJECTID()}`);
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

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (path) => {
        navigate(`/${path}/${getUSERID()}/${getPROJECTID()}`);
        if (isMobile) {
            setMobileOpen(false);
        }
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
        <Container maxWidth="lg">
            <CssBaseline />
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
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

            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Tooltip title="Retour">
                        <IconButton onClick={handleRetour} sx={{ mr: 2 }}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
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
