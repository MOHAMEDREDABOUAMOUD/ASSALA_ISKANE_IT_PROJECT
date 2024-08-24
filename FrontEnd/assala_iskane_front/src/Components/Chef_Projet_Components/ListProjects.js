import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { ListAlt as ListAltIcon, Person as PersonIcon } from '@mui/icons-material';

// Local list of projects
const projects = [
  { id: 'PROJ001', nom: 'Projet Casablanca', id_resp: 'USR001' },
  { id: 'PROJ002', nom: 'Projet Marrakech', id_resp: 'USR002' },
  { id: 'PROJ003', nom: 'Projet Fes', id_resp: 'USR003' },
  // Add more projects as needed
];

// Local list of users (for example purposes)
const users = [
  { id: 'USR001', nom: 'El Ayoubi', prenom: 'Khalid' },
  { id: 'USR002', nom: 'Benjelloun', prenom: 'Ahmed' },
  { id: 'USR003', nom: 'Bouhssine', prenom: 'Fatima' },
  // Add more users as needed
];

export default function ListProjects() {
  // Find the project manager names based on the project manager ID
  const getProjectManagerName = (id) => {
    const user = users.find(user => user.id === id);
    return user ? `${user.prenom} ${user.nom}` : 'Inconnu';
  };

  return (
    <div style={{ padding: '16px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Liste des Projets
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton>
                  <ListAltIcon />
                </IconButton>
                Nom du Projet
              </TableCell>
              <TableCell>
                <IconButton>
                  <PersonIcon />
                </IconButton>
                Responsable
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{project.nom}</TableCell>
                <TableCell>{getProjectManagerName(project.id_resp)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
