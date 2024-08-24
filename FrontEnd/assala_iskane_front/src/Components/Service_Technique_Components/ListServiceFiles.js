import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Divider,
  Paper,
  Box
} from '@mui/material';
import { FileCopy as FileCopyIcon, Download as DownloadIcon, Add as AddIcon } from '@mui/icons-material';

export default function ListServiceFiles() {
  // Sample data for files
  const [files, setFiles] = useState([
    { id: 1, name: 'Rapport Technique.pdf', size: '1.2 MB' },
    { id: 2, name: 'Plan de Chantier.png', size: '500 KB' },
    { id: 3, name: 'Cahier des Charges.docx', size: '350 KB' },
    // More files data...
  ]);

  // Handle file upload
  const handleAddFile = () => {
    // Logic for adding a new file (e.g., open a dialog for file upload)
    alert('Add file functionality to be implemented');
  };

  // Handle file download
  const handleDownloadFile = (fileName) => {
    // Logic for downloading a file (e.g., trigger a download action)
    alert(`Download ${fileName} functionality to be implemented`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lister/Ajouter des Fichiers
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Box mb={2}>
        <Tooltip title="Ajouter un fichier">
          <IconButton color="primary" onClick={handleAddFile}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {files.map((file) => (
            <ListItem key={file.id} divider>
              <ListItemIcon>
                <FileCopyIcon />
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                secondary={`Taille: ${file.size}`}
              />
              <Tooltip title="Télécharger le fichier">
                <IconButton edge="end" aria-label="download" onClick={() => handleDownloadFile(file.name)}>
                  <DownloadIcon color="primary" />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
