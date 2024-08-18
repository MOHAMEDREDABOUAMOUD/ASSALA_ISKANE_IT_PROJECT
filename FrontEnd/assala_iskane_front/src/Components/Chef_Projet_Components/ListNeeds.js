import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, Divider, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function ListNeeds() {
  const [needs, setNeeds] = useState([
    // Fake data for testing
    { id: 1, nom: 'Ciment', date_demande: '2024-08-17', qte: 50, validated: false, id_chantier: 1 },
    { id: 2, nom: 'Sable', date_demande: '2024-08-16', qte: 100, validated: true, id_chantier: 2 },
    { id: 3, nom: 'Briques', date_demande: '2024-08-15', qte: 200, validated: false, id_chantier: 3 }
  ]);

  // Uncomment when you are ready to fetch from API
  /*
  useEffect(() => {
    const fetchNeeds = async () => {
      // Replace with actual API call to fetch needs
      const response = await fetch('/api/needs'); // Example API endpoint
      const data = await response.json();
      setNeeds(data);
    };
    
    fetchNeeds();
  }, []);
  */

  // Handle validation of needs
  const handleValidate = async (needId) => {
    // Replace with actual API call to validate the need
    await fetch(`/api/needs/validate/${needId}`, {
      method: 'POST',
    });

    // Update the UI after validation
    setNeeds(needs.map(need => need.id === needId ? { ...need, validated: true } : need));
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
