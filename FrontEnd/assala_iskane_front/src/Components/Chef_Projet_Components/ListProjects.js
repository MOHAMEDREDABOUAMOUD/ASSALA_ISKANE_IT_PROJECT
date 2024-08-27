import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton,
  Box, Tooltip
} from '@mui/material';
import {
  ListAlt as ListAltIcon, Person as PersonIcon, DateRange as DateRangeIcon, 
  AccessTime as AccessTimeIcon, Description as DescriptionIcon, Gavel as GavelIcon
} from '@mui/icons-material';
import axios from 'axios';

export default function ListProjects() {
  const [projects, setProjects] = useState([]);

  // Fetch projects data from backend
  useEffect(() => {
    axios.get('http://localhost:9092/assalaiskane/getProjets')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the projects data!', error);
      });
  }, []);

  return (
    <div style={{ padding: '16px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Liste des Projets
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><ListAltIcon /> Nom du Projet</TableCell>
              <TableCell><GavelIcon /> Numéro Marché</TableCell>
              <TableCell><DescriptionIcon /> Objet</TableCell>
              <TableCell><DateRangeIcon /> Date Ordre</TableCell>
              <TableCell><DateRangeIcon /> Date Fin</TableCell>
              <TableCell><AccessTimeIcon /> Délai</TableCell>
              <TableCell><PersonIcon /> Responsable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{project.nom}</TableCell>
                <TableCell>{project.numero_marche}</TableCell>
                <TableCell>{project.objet}</TableCell>
                <TableCell>{new Date(project.date_ordre).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{new Date(project.date_fin).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{project.delai} jours</TableCell>
                <TableCell>
                  <Tooltip title={`${project.resp.prenom} ${project.resp.nom} - ${project.resp.fonction}`}>
                    <span>{project.resp.prenom} {project.resp.nom}</span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
