import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, IconButton, Tooltip } from '@mui/material';
import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from '@mui/icons-material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

export default function ListOuvrier() {
    const id_projet = "P001";
    const [ouvriers, setOuvriers] = useState([]);
    const [selectedOuvriers, setSelectedOuvriers] = useState([]);

    useEffect(() => {
        const fetchOuvriers = async () => {
            try {
                const response = await axios.get(`http://localhost:9092/assalaiskane/getOuvriers?id_projet=${id_projet}`);
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

    console.log(ouvriers);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'nom', headerName: 'Nom', width: 150 },
        { field: 'prenom', headerName: 'Prénom', width: 150 },
        { field: 'numero', headerName: 'Numéro de Téléphone', width: 200 },
    ];

    const handleSelectionChange = (newSelection) => {
        console.log("New Selection:", newSelection);
        setSelectedOuvriers(newSelection);
    };

    const handleDeclareAbsence = async () => {
        console.log("handleDeclareAbsence function triggered");
        console.log("Selected Ouvriers:", selectedOuvriers);

        const date_absence = new Date().toISOString().split('T')[0];
        const id_chantier = 1;
        const absent = 1;

        for (const id of selectedOuvriers) {
            console.log(`Attempting to declare absence for ouvrier with ID: ${id}`);
            try {
                await axios.post('http://localhost:9092/assalaiskane/AddAbsence', null, {
                    params: {
                        id_ouvrier: id,
                        date_absence: date_absence,
                        id_chantier: id_chantier,
                        absent: absent
                    }
                });

                console.log(`Absence declared for ouvrier with ID ${id}`);
            } catch (error) {
                console.error(`Error declaring absence for ouvrier with ID ${id}:`, error.response ? error.response.data : error.message);
            }
        }
    };

    const handleSelectAll = () => {
        const allOuvriers = ouvriers.map(ouvrier => ouvrier.id);
        setSelectedOuvriers(allOuvriers);
    };

    const handleDeselectAll = () => {
        setSelectedOuvriers([]);
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Liste des Ouvriers - Déclarer Absence
            </Typography>
            <div style={{ height: 400, width: '100%', marginBottom: '16px' }}>
                <DataGrid
                    rows={ouvriers}
                    columns={columns}
                    checkboxSelection
                    onSelectionModelChange={handleSelectionChange}
                />
            </div>
            <div style={{ marginBottom: '16px' }}>
                <Tooltip title="Select All">
                    <IconButton onClick={handleSelectAll}>
                        <CheckBoxIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Deselect All">
                    <IconButton onClick={handleDeselectAll}>
                        <CheckBoxOutlineBlankIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleDeclareAbsence}
            >
                Déclarer Absence
            </Button>
        </Container>
    );
}
