import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { ListAlt as ListAltIcon, Person as PersonIcon } from '@mui/icons-material';
import axios from 'axios';

export default function ListProjects() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch projects data from backend
  useEffect(() => {
    axios.get('/getProjets')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the projects data!', error);
      });
  }, []);

  // Fetch users data from backend (assuming you have a corresponding endpoint)
  useEffect(() => {
    axios.get('/getUsers')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users data!', error);
      });
  }, []);

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