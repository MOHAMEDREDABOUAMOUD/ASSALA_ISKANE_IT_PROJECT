import React, { useState } from 'react';
import { IconButton, InputBase, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from '@mui/icons-material/Search';

export default function ListFiles() {
  // Sample data to represent files
  const [files, setFiles] = useState([
    { id: 1, name: 'file1.pdf', url: '/path/to/file1.pdf' },
    { id: 2, name: 'file2.docx', url: '/path/to/file2.docx' },
    { id: 3, name: 'file3.xlsx', url: '/path/to/file3.xlsx' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');

  // Handle file download
  const handleDownload = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileUrl.split('/').pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Handle file printing
  const handlePrint = (fileUrl) => {
    window.open(fileUrl, '_blank').print();
  };

  // Filter files based on search term
  const filteredFiles = files.filter((file) => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Lister/Ajouter des fichiers</h2>

      {/* Search Bar */}
      <Paper component="form" style={{ padding: '2px 4px', marginBottom: '16px', display: 'flex', alignItems: 'center', width: '100%' }}>
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          style={{ marginLeft: 8, flex: 1 }}
          placeholder="Rechercher un fichier"
          inputProps={{ 'aria-label': 'search files' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      {/* List of Files */}
      <List>
        {filteredFiles.map((file) => (
          <div key={file.id}>
            <ListItem>
              <ListItemText primary={file.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="download" onClick={() => handleDownload(file.url)}>
                  <DownloadIcon />
                </IconButton>
                <IconButton edge="end" aria-label="print" onClick={() => handlePrint(file.url)}>
                  <PrintIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}
