import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Divider,
  Box,
  Paper,
  Chip,
  ListItemSecondaryAction,
  Button
} from '@mui/material';
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon, Info as InfoIcon } from '@mui/icons-material';

import AssignmentIcon from '@mui/icons-material/Assignment';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import axios from 'axios'; 
import { useParams } from 'react-router';

export default function ListServiceValidatedNeeds() {
  const { id_resp, id_projet } = useParams();
  const [needs, setNeeds] = useState([]);
 
  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await axios.get(`http://localhost:9092/assalaiskane/getBesoinsST?id_projet=${id_projet}`);
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
  
      // Update the UI after validation
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