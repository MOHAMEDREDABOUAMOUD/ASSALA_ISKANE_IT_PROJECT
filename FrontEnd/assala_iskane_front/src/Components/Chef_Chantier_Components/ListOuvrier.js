import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';


export default function ListOuvrier() {
    
    const id_projet = "P002";
    const [ouvriers, setOuvriers] = useState([]);
    const [selectedOuvriers, setSelectedOuvriers] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        const fetchOuvriers = async () => {
            try {
                const response = await axios.get(`http://localhost:9092/assalaiskane/getOuvriers?id_projet=${id_projet}`);
                // Extract relevant data from the response
                const extractedData = response.data.map(ouvrier => ({
                    id: ouvrier.id,
                    nom: ouvrier.nom,
                    prenom: ouvrier.prenom,
                    numero: ouvrier.numero,
                }));
                setOuvriers(extractedData);
            } catch (error) {
                console.error('Error fetching ouvriers:', error);
            }
        };
    
        fetchOuvriers();
    }, [id_projet]);
    
    console.log(ouvriers); // Add this to see the data passed to DataGridPro

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },  // Add ID column for debugging
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
                    await axios.post('http://localhost:9092/assalaiskane/AddAbsence', null, {
                        params: {
                            id_ouvrier: ouvrier.id,
                            date_absence,
                            id_chantier,
                            absent: 1
                        }
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
                <DataGrid
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
    );
}