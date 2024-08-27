import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, IconButton, Tooltip } from '@mui/material';
import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from '@mui/icons-material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material'; // Import Checkbox component

export default function ListOuvrier() {
    const id_projet = "P001";
    const [ouvriers, setOuvriers] = useState([]);

    useEffect(() => {
        const fetchOuvriers = async () => {
            try {
                const response = await axios.get(`http://localhost:9092/assalaiskane/getOuvriers?id_projet=${id_projet}`);
                const extractedData = response.data.map(ouvrier => ({
                    id: ouvrier.id,
                    nom: ouvrier.nom,
                    prenom: ouvrier.prenom,
                    numero: ouvrier.numero,
                    selected: false
                }));
                setOuvriers(extractedData);
            } catch (error) {
                console.error('Error fetching ouvriers:', error);
            }
        };

        fetchOuvriers();
    }, [id_projet]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'nom', headerName: 'Nom', width: 150 },
        { field: 'prenom', headerName: 'Prénom', width: 150 },
        { field: 'numero', headerName: 'Numéro de Téléphone', width: 200 },
        {
            field: 'selected',
            headerName: 'Select',
            width: 120,
            renderCell: (params) => (
                <Checkbox
                    checked={params.row.selected}
                    disabled
                />
            ),
        },
    ];

    const handleRowClick = async (params) => {
        const id = params.id;

        await setOuvriers(prevOuvriers => {
            const updatedOuvriers = prevOuvriers.map(ouvrier => {
                if (ouvrier.id === id) {
                    return { ...ouvrier, selected: !ouvrier.selected };
                }
                return ouvrier;
            });
            return updatedOuvriers;
        });
        //console.log(ouvriers);
    };

    const handleDeclareAbsence = async () => {
        console.log("handleDeclareAbsence function triggered");

        const date_absence = new Date().toISOString().split('T')[0];
        const id_chantier = 1;
        const absent = 1;

        
        for (const ouvrier of ouvriers) {
            //console.log("selected : "+ouvrier.id+", "+ouvrier.selected);
            if (ouvrier.selected) {
                console.log(`Attempting to declare absence for ouvrier with ID: ${ouvrier.id}`);
                try {
                  await axios.post(
                    `http://localhost:9092/assalaiskane/AddAbsence?id_ouvrier=${ouvrier.id}&date_absence=${date_absence}&id_chantier=${id_chantier}&absent=1`
                );

                    console.log(`Absence declared for ouvrier with ID ${ouvrier.id}`);
                } catch (error) {
                    console.error(`Error declaring absence for ouvrier with ID ${ouvrier.id}:`, error.response ? error.response.data : error.message);
                }
            }
            else{
              console.log(`Attempting to declare absence for ouvrier with ID: ${ouvrier.id}`);
                try {
                  await axios.post(
                    `http://localhost:9092/assalaiskane/AddAbsence?id_ouvrier=${ouvrier.id}&date_absence=${date_absence}&id_chantier=${id_chantier}&absent=0`
                );

                    console.log(`Absence declared for ouvrier with ID ${ouvrier.id}`);
                } catch (error) {
                    console.error(`Error declaring absence for ouvrier with ID ${ouvrier.id}:`, error.response ? error.response.data : error.message);
                }
            }
        }
    };

    const handleSelectAll = () => {
        setOuvriers(prevOuvriers =>
            prevOuvriers.map(ouvrier => ({ ...ouvrier, selected: true }))
        );
    };

    const handleDeselectAll = () => {
        setOuvriers(prevOuvriers =>
            prevOuvriers.map(ouvrier => ({ ...ouvrier, selected: false }))
        );
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
                    onRowClick={handleRowClick}
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
