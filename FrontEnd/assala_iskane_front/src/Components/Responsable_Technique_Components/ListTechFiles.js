import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
} from '@mui/material';
import { Description, GetApp, Print, Search } from '@mui/icons-material';

export default function ListTechFiles() {
  // Sample data representing files related to projects
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Rapport_Technique_ChantierA.pdf',
      project: 'Chantier A',
      dateUploaded: '2024-08-16',
    },
    {
      id: 2,
      name: 'Plan_Construction_ChantierB.pdf',
      project: 'Chantier B',
      dateUploaded: '2024-08-17',
    },
    // More files...
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle file download
  const handleDownload = (fileName) => {
    alert(`Downloading file: ${fileName}`);
  };

  // Function to handle file printing
  const handlePrint = (fileName) => {
    alert(`Printing file: ${fileName}`);
  };

  // Filter files based on search term
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lister/Ajouter des fichiers pour le Chef Technique
      </Typography>

      <TextField
        label="Rechercher un fichier"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ marginBottom: 2 }} />

      <List>
        {filteredFiles.map((file) => (
          <ListItem key={file.id} divider>
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              secondary={`Projet: ${file.project} | Date de téléchargement: ${file.dateUploaded}`}
            />
            <IconButton edge="end" onClick={() => handleDownload(file.name)}>
              <GetApp />
            </IconButton>
            <IconButton edge="end" onClick={() => handlePrint(file.name)}>
              <Print />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
