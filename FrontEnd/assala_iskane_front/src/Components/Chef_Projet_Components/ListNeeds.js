import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, Divider, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import axios from 'axios'; 
import { useParams } from 'react-router';

export default function ListNeeds() {
  const { id_resp, id_projet } = useParams();
  const [needs, setNeeds] = useState([]);
 
  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        console.log(id_projet+", "+id_resp);
        const response = await axios.get(`http://localhost:9092/assalaiskane/getBesoinsRP?id_projet=${id_projet}`);
        setNeeds(response.data);
      } catch (error) {
        console.error('Error fetching needs:', error);
      }
    };
  
    fetchNeeds();
  }, []);
  
  
  const handleValidate = async (needId) => {
    try {
      await axios.post(`http://localhost:9092/assalaiskane/validateBesoin?id_resp=${id_resp}&id_besoin=${needId}`);
      setNeeds(needs.map(need => need.id === needId ? { ...need, validated: true } : need));
    } catch (error) {
      console.error('Error validating need:', error);
    }
  };
  
  console.log(needs);
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