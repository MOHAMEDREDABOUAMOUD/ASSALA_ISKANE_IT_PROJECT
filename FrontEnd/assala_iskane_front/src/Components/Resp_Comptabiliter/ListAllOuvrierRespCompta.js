import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
  createTheme,
  styled,
  ThemeProvider,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  Stack
} from '@mui/material';
import { CalendarMonth, TrendingUp, Person } from '@mui/icons-material';
import axios from 'axios';
import SideBarCompta from './SideBarCompta';

const drawerWidth = 280;

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#42a5f5' },
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    text: { primary: '#2c3345' }
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h5: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 500
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
          borderRadius: 16
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  }
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - ${drawerWidth}px)`,
  backgroundColor: '#ffffff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
}));

export default function AbsenceTrackingSalary() {
  const { id_projet } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [ouvriers, setOuvriers] = useState([]);
  const [absenceSummary, setAbsenceSummary] = useState({
    weeklyAbsences: {},
    monthlyAbsences: {}
  });

  useEffect(() => {
    const fetchOuvriers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9092/assalaiskane/getOuvriers?id_projet=${id_projet}`
        );
        const workers = response.data.map(ouvrier => ({
          id: ouvrier.id,
          nom: ouvrier.nom,
          prenom: ouvrier.prenom,
          numero: ouvrier.numero,
          absences: {
            weekly: Math.floor(Math.random() * 5), // Simulate weekly absences
            monthly: Math.floor(Math.random() * 15) // Simulate monthly absences
          }
        }));
        setOuvriers(workers);

        // Calculate summary
        const summary = workers.reduce((acc, worker) => {
          acc.weeklyAbsences[worker.id] = worker.absences.weekly;
          acc.monthlyAbsences[worker.id] = worker.absences.monthly;
          return acc;
        }, { weeklyAbsences: {}, monthlyAbsences: {} });

        setAbsenceSummary(summary);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchOuvriers();
  }, [id_projet]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getAbsenceStatus = (absences) => {
    if (absences === 0) return { label: 'Aucune absence', color: 'success' };
    if (absences <= 2) return { label: 'Peu d\'absences', color: 'info' };
    if (absences <= 4) return { label: 'Absences modérées', color: 'warning' };
    return { label: 'Absences élevées', color: 'error' };
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', backgroundColor: '#ffffff' }}>
        <CssBaseline />
        <SideBarCompta />
        <Box
          component="main"
          sx={{
            backgroundColor: '#ffffff',
            flexGrow: 1,
            p: 3,
            marginLeft: '320px',
            marginTop: '80px'
          }}
        >
          <StyledAppBar position="fixed">
            <Toolbar sx={{ justifyContent: 'center' }}>
              <Typography variant="h5" color="textPrimary">
                Suivi des Absences pour la Paie
              </Typography>
            </Toolbar>
          </StyledAppBar>

          <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 4 }}>
            <Tab icon={<CalendarMonth />} label="Cette Semaine" />
            <Tab icon={<TrendingUp />} label="Ce Mois" />
          </Tabs>

          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">Employé</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" fontWeight="bold">Jours d'absence</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" fontWeight="bold">Statut</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1" fontWeight="bold">Impact sur le salaire</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ouvriers.map(ouvrier => {
                  const absences = tabValue === 0 ? ouvrier.absences.weekly : ouvrier.absences.monthly;
                  const status = getAbsenceStatus(absences);
                  const salaryCut = absences * 200; // Example calculation

                  return (
                    <TableRow key={ouvrier.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Person color="primary" />
                          <div>
                            <Typography variant="body1" fontWeight="medium">
                              {ouvrier.nom} {ouvrier.prenom}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              ID: {ouvrier.id}
                            </Typography>
                          </div>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6">{absences}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={status.label}
                          color={status.color}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body1"
                          color="error"
                          fontWeight="medium"
                        >
                          -{salaryCut} DH
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Total des absences</Typography>
                <Typography variant="h4" color="primary">
                  {tabValue === 0
                    ? Object.values(absenceSummary.weeklyAbsences).reduce((a, b) => a + b, 0)
                    : Object.values(absenceSummary.monthlyAbsences).reduce((a, b) => a + b, 0)
                  }
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {tabValue === 0 ? 'Cette semaine' : 'Ce mois'}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Impact total sur la paie</Typography>
                <Typography variant="h4" color="error">
                  -{tabValue === 0
                    ? Object.values(absenceSummary.weeklyAbsences).reduce((a, b) => a + b, 0) * 200
                    : Object.values(absenceSummary.monthlyAbsences).reduce((a, b) => a + b, 0) * 200
                  } DH
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Déductions salariales
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
