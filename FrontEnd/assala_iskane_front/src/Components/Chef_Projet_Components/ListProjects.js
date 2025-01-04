import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton,
  Box, Tooltip, Container, Card, CardContent, Chip, LinearProgress, useTheme, useMediaQuery
} from '@mui/material';
import {
  ListAlt as ListAltIcon, Person as PersonIcon, DateRange as DateRangeIcon,
  AccessTime as AccessTimeIcon, Description as DescriptionIcon, Gavel as GavelIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

export default function ListProjects() {
  const { id_resp } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch projects data from backend
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:9092/assalaiskane/getProjets?id_resp=${id_resp}`)
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the projects data!', error);
        setLoading(false);
      });
  }, [id_resp]); // Added id_resp to dependency array

  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const totalDays = (end - start) / (1000 * 60 * 60 * 24);
    const daysElapsed = (today - start) / (1000 * 60 * 60 * 24);
    return Math.min(Math.max((daysElapsed / totalDays) * 100, 0), 100);
  };

  // Function to handle row click
  const handleRowClick = (project) => {
    navigate(`/HomePage_ChefDeProjet/${id_resp}/${project.id}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <BusinessIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
            <Typography variant="h4" component="h1">
              Liste des Projets
            </Typography>
          </Box>
          {loading ? (
            <LinearProgress />
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><ListAltIcon /> Nom du Projet</TableCell>
                    <TableCell><GavelIcon /> Numéro Marché</TableCell>
                    {!isMobile && <TableCell><DescriptionIcon /> Objet</TableCell>}
                    <TableCell><DateRangeIcon /> Dates</TableCell>
                    {!isMobile && <TableCell><AccessTimeIcon /> Délai</TableCell>}
                    <TableCell><PersonIcon /> Responsable</TableCell>
                    <TableCell>Progression</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map(project => (
                    <TableRow
                      key={project.id}
                      sx={{ '&:hover': { backgroundColor: theme.palette.action.hover, cursor: 'pointer' } }}
                      onClick={() => handleRowClick(project)}
                    >
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">{project.nom}</Typography>
                      </TableCell>
                      <TableCell>{project.numero_marche}</TableCell>
                      {!isMobile && <TableCell>{project.objet}</TableCell>}
                      <TableCell>
                        <Tooltip title={`Début: ${new Date(project.date_ordre).toLocaleDateString('fr-FR')}`}>
                          <Chip
                            icon={<DateRangeIcon />}
                            label={new Date(project.date_fin).toLocaleDateString('fr-FR')}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Tooltip>
                      </TableCell>
                      {!isMobile && <TableCell>{project.delai} jours</TableCell>}
                      <TableCell>
                        <Tooltip title={`${project.resp.prenom} ${project.resp.nom} - ${project.resp.fonction}`}>
                          <Chip
                            icon={<PersonIcon />}
                            label={`${project.resp.prenom} ${project.resp.nom}`}
                            size="small"
                            color="secondary"
                            variant="outlined"
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={calculateProgress(project.date_ordre, project.date_fin)}
                              sx={{ height: 10, borderRadius: 5 }}
                            />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">
                              {`${Math.round(calculateProgress(project.date_ordre, project.date_fin))}%`}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
