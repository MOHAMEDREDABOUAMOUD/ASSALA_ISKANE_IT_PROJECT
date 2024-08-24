import React, { useEffect, useState } from 'react'
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios';
import { DataGridPro } from '@mui/x-data-grid-pro';

export default function ListOuvrier() {
    const id_projet = "P001";
    const [ouvriers, setOuvriers] = useState([]);
    const [selectedOuvriers, setSelectedOuvriers] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        const fetchOuvriers = async () => {
            try {
                const response = await axios.get(`/api/ouvriers/${id_projet}`);
                setOuvriers(response.data);
            } catch (error) {
                console.error('Error fetching ouvriers:', error);
            }
        };

        fetchOuvriers();
    }, [id_projet]);

    const columns = [
        { field: 'nom', headerName: 'Nom', width: 150 },
        { field: 'prenom', headerName: 'Prénom', width: 150 },
        { field: 'numero', headerName: 'Numéro de Téléphone', width: 200 },
    ];

    const handleSelectionChange = (newSelection) => {
        setSelectedOuvriers(newSelection);
    };

    const handleDeclareAbsence = async () => {
        const date_absence = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
        const id_chantier = 1; 
        
        for (const id of selectedOuvriers) {
            const ouvrier = ouvriers.find(row => row.id === id);
            if (ouvrier) {
                try {
                    await axios.post('/api/absence', {
                        id_ouvrier: ouvrier.id,
                        date_absence,
                        id_chantier,
                        absent: 1
                    });
                    console.log(`Absence declared for ouvrier ${ouvrier.nom} ${ouvrier.prenom}`);
                } catch (error) {
                    console.error(`Error declaring absence for ouvrier ${ouvrier.nom} ${ouvrier.prenom}:`, error);
                }
            }
        }
    };

    return (
   

        <Container>
            <Typography variant="h5" gutterBottom>
                Liste des Ouvriers - Déclarer Absence
            </Typography>
            <div style={{ height: 400, width: '100%' }}>
                <DataGridPro
                    rows={ouvriers}
                    columns={columns}
                    checkboxSelection
                    onSelectionModelChange={handleSelectionChange}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleDeclareAbsence}
                style={{ marginTop: '16px' }}
            >
                Déclarer Absence
            </Button>
        </Container>
  )
}

