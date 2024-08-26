import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, Divider, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function ListNeeds() {
  const [needs, setNeeds] = useState([]);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await fetch('/api/getBesoins?id_resp=RESP001&id_projet=PROJ001');
        const data = await response.json();
        setNeeds(data);
      } catch (error) {
        console.error('Error fetching needs:', error);
      }
    };

    fetchNeeds();
  }, []);

  const handleValidate = async (needId) => {
    try {
      await fetch(`/api/needs/validate/${needId}`, {
        method: 'POST',
      });

      // Update the UI after validation
      setNeeds(needs.map(need => need.id === needId ? { ...need, validated: true } : need));
    } catch (error) {
      console.error('Error validating need:', error);
    }
  };

  return (
    <div>
      <h2>Lister/Valider les besoins du chef chantier</h2>
      <List>
        {needs.map((need) => (
          <div key={need.id}>
            <ListItem>
              <IconButton edge="start">
                <AssignmentIcon />
              </IconButton>
              <ListItemText 
                primary={need.nom} 
                secondary={`Quantité: ${need.qte} | Date de demande: ${new Date(need.date_demande).toLocaleDateString('fr-FR')}`} 
              />
              <ListItemSecondaryAction>
                {!need.validated ? (
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleValidate(need.id)}
                    startIcon={<PriorityHighIcon />}
                  >
                    Valider
                  </Button>
                ) : (
                  <IconButton edge="end" color="success">
                    <CheckCircleIcon />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}