import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';

export default function HomePage_ServiceTechnique() {
    const navigate = useNavigate();

    const handleMenuClick = (path) => {
        navigate(path);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Service Technique Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AssignmentIcon />}
                    onClick={() => handleMenuClick('/list-service-projects')}
                    sx={{ margin: 2, width: '250px' }}
                >
                    Lister tous les projets
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleMenuClick('/list-service-validated-needs')}
                    sx={{ margin: 2, width: '250px' }}
                >
                    Lister les besoins validés
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<FolderIcon />}
                    onClick={() => handleMenuClick('/list-service-files')}
                    sx={{ margin: 2, width: '250px' }}
                >
                    Lister/Ajouter des fichiers
                </Button>
                <Button
                    variant="contained"
                    color="info"
                    startIcon={<PersonIcon />}
                    onClick={() => handleMenuClick('/ajouter-ouvrier')}
                    sx={{ margin: 2, width: '250px' }}
                >
                    Ajouter les ouvriers
                </Button>
            </Box>
        </div>
    );
}