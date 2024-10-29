import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, InputBase, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, Divider, Button, useTheme, useMediaQuery } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from './SideBar'; // Ensure you have this component

const drawerWidth = 280;


export default function ListFilesMar() {
  const { id_resp, id_projet } = useParams();
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('ListFilesMar');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (path) => {
      setSelectedOption(path);
      navigate(`/${path}/${id_resp}/${id_projet}`);
      if (isMobile) {
        setMobileOpen(false);
      }
  };
  

  // Fetch the list of files from the backend
  useEffect(() => {
    axios.get(`http://localhost:9092/assalaiskane/getFichiersProjet?id_projet=${id_projet}`)
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64File = reader.result.split(',')[1]; // Extract base64 part
        const formData = new FormData();
        formData.append('nom', selectedFile.name); // Use the real name of the file
        formData.append('fichier', selectedFile);
        formData.append('id_projet', id_projet);
        
        setFiles([...files, {'nom':selectedFile.name, 'fichier':selectedFile}]);

        axios.post('http://localhost:9092/assalaiskane/AddFichier', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            console.log('File uploaded successfully:', response.data);
          })
          .catch(error => {
            console.error('Error uploading file:', error);
          });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDownload = (file) => {
    // Decode the base64 string
    const byteCharacters = atob(file.fichier);
    const byteArray = new Uint8Array(byteCharacters.length);

    // Convert each character to its corresponding byte
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    // Create a Blob from the byteArray
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });

    // Create a temporary download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', file.nom);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Filter files based on search term
  const filteredFiles = files.filter((file) =>
    file.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Lister/Ajouter des fichiers</h2>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Gestion des Matériaux
          </Typography>
        </Toolbar>
      </AppBar>
      <SideBar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        selectedOption={selectedOption}
        handleMenuClick={handleMenuClick}
      />
      {/* File Upload */}
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleFileUpload}>
        Upload
      </Button>

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
              <ListItemText primary={file.nom} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="download" onClick={() => handleDownload(file)}>
                  <DownloadIcon />
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
