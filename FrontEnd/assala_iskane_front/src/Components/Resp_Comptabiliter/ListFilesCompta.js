import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SideBarCompta from './SideBarCompta';

import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Button,
  Paper,
  Divider,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Box,
  styled,
  Tooltip,
  Grid,
  Stack
} from '@mui/material';

import {
  Download as DownloadIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

const drawerWidth = 280;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - ${drawerWidth}px)`,
  backgroundColor: '#ffffff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
}));

export default function ListFilesCompta() {
  const { id_projet } = useParams();
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('/listFilesCompta');

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleMenuClick = (path) => {
    setSelectedOption(path);
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:9092/assalaiskane/getFichiersProjet?id_projet=${id_projet}`)
      .then(response => setFiles(response.data))
      .catch(error => console.error('Error fetching files:', error));
  }, [id_projet]);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleFileUpload = () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = () => {
      const formData = new FormData();
      formData.append('nom', selectedFile.name);
      formData.append('fichier', selectedFile);
      formData.append('id_projet', id_projet);
      setFiles([...files, { nom: selectedFile.name, fichier: selectedFile }]);

      axios.post('http://localhost:9092/assalaiskane/AddFichier', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .catch(error => console.error('Error uploading file:', error));
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = (file) => {
    const byteCharacters = atob(file.fichier);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) byteArray[i] = byteCharacters.charCodeAt(i);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', file.nom);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const filteredFiles = files.filter((file) =>
    file.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <StyledAppBar position="fixed" sx={{alignItems:'center'}}>
                  <Toolbar>
                    {isMobile && (
                      <IconButton color="inherit" edge="start">
                        <MenuIcon />
                      </IconButton>
                    )}
                    <Typography variant="h6" color="textPrimary">
                      Gestion des Ouvriers
                    </Typography>
                  </Toolbar>
     </StyledAppBar>
      <SideBarCompta
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        selectedOption={selectedOption}
        handleMenuClick={handleMenuClick}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginLeft:30,marginTop:-35,width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant="h5" sx={{ mb: 2 }}>Gestion des fichiers</Typography>

        <Paper sx={{ p: 2, mb: 2 }} elevation={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="upload-button-file"
            />
            <label htmlFor="upload-button-file">
              <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                Choisir un fichier
              </Button>
            </label>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              onClick={handleFileUpload}
            >
              Upload
            </Button>
          </Stack>
        </Paper>

        <Paper component="form" sx={{ p: '2px 4px', mb: 2, display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ p: '10px' }}>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Rechercher un fichier"
            inputProps={{ 'aria-label': 'search files' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Paper>

        <Paper elevation={3} sx={{ overflow: 'hidden' }}>
          <List>
            {filteredFiles.map((file) => (
              <React.Fragment key={file.id}>
                <ListItem>
                  <ListItemText primary={file.nom} />
                  <ListItemSecondaryAction>
                    <Tooltip title="Télécharger">
                      <IconButton edge="end" onClick={() => handleDownload(file)}>
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            {filteredFiles.length === 0 && (
              <ListItem>
                <ListItemText primary="Aucun fichier trouvé." />
              </ListItem>
            )}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}
