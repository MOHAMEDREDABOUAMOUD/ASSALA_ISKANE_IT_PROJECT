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
  CssBaseline,
  useMediaQuery,
  styled
} from '@mui/material';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  EventBusy as EventBusyIcon,
  Inventory as InventoryIcon,
  Construction as ConstructionIcon
} from '@mui/icons-material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { getPROJECTID, getUSERID } from '../constants';
import SideBarChefChantier from './SideBarChefChantier.js';
import { Logout as LogoutIcon } from '@mui/icons-material';
import Logo from "../../images/logo00.png"; // Import your logo

const drawerWidth = 280;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - ${drawerWidth}px)`,
  backgroundColor: '#ffffff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
}));

export default function ListOuvrier() {
  const { id_projet } = useParams();
  const navigate = useNavigate();
  const [ouvriers, setOuvriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchOuvriers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9092/assalaiskane/getOuvriers?id_projet=${getPROJECTID()}`
        );
        const extractedData = response.data.map((ouvrier) => ({
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
    { field: 'id', headerName: 'ID', width: 80 },
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
      width: 100,
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
    setOuvriers((prev) =>
      prev.map((ouvrier) =>
        ouvrier.id === id
          ? { ...ouvrier, selected: !ouvrier.selected }
          : ouvrier
      )
    );
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
        console.error(`Error declaring absence for ouvrier with ID ${ouvrier.id}:`, error);
      }
    }
  };

  const handleSelectAll = () => {
    setOuvriers((prev) =>
      prev.map((ouvrier) => ({ ...ouvrier, selected: true }))
    );
  };

  const handleDeselectAll = () => {
    setOuvriers((prev) =>
      prev.map((ouvrier) => ({ ...ouvrier, selected: false }))
    );
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
                        Declarer Absence
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
      <SideBarChefChantier />
    </div>
  );

  return (
    <Container maxWidth="lg" sx={{ marginLeft: '120px',marginTop:'-100px' ,width: '1000px', }}>
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        open
      >
        {drawer}
      </Drawer>

      <Divider sx={{ mb: 2 }} />

      <Box
        component={Paper}
        sx={{
          p: 2,
          boxShadow: 3,
          borderRadius: 2,

          width: '950px',
          mb: 2
        }}
      >
        <DataGrid
          rows={ouvriers}
          columns={columns}
          onRowClick={handleRowClick}
          loading={loading}
          disableSelectionOnClick
          rowHeight={55}
          headerHeight={60}
          sx={{
            height: 420,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold',
              fontSize: '1rem',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
            width: '900px',
          }}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Tooltip title="Tout sélectionner">
            <IconButton onClick={handleSelectAll} color="primary">
              <CheckBoxIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tout désélectionner">
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
    </Container>
  );
}
