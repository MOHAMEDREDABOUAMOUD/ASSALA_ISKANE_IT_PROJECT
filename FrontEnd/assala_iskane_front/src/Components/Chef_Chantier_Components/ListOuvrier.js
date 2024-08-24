import React, { useState } from 'react'
import { Container, Typography, Button } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';

export default function ListOuvrier() {
    const rows = [
        { id: '1', nom: 'El Majdoub', prenom: 'Ahmed', numero: '0612345678' },
        { id: '2', nom: 'Bennani', prenom: 'Khalid', numero: '0612345679' },
        { id: '3', nom: 'Chakir', prenom: 'Fatima', numero: '0612345680' },
        { id: '4', nom: 'Touhami', prenom: 'Hicham', numero: '0612345681' },
    ];

    const [selectedOuvriers, setSelectedOuvriers] = useState([]);

    const columns = [
        { field: 'nom', headerName: 'Nom', width: 150 },
        { field: 'prenom', headerName: 'Prénom', width: 150 },
        { field: 'numero', headerName: 'Numéro de Téléphone', width: 200 },
    ];

    const handleSelectionChange = (newSelection) => {
        setSelectedOuvriers(newSelection);
    };

    const handleDeclareAbsence = () => {
        selectedOuvriers.forEach(id => {
            const ouvrier = rows.find(row => row.id === id);
            console.log(`Absence declared for ouvrier ${ouvrier.nom} ${ouvrier.prenom}`);
        });
    };
    return (
   

        <Container>
            <Typography variant="h5" gutterBottom>
                Liste des Ouvriers - Déclarer Absence
            </Typography>
            <div style={{ height: 400, width: '100%' }}>
                <DataGridPro
                    rows={rows}
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

