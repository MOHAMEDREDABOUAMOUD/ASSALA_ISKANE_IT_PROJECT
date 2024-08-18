import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Inventory, Search } from '@mui/icons-material';

export default function ListTechMaterials() {
  // Sample data representing materials and their quantities
  const [materials, setMaterials] = useState([
    {
      id: 1,
      name: 'Bétonnière',
      chantier: 'Chantier A',
      quantity: 3,
      unit: 'unités',
      location: 'Zone 1',
    },
    {
      id: 2,
      name: 'Fer à béton',
      chantier: 'Chantier B',
      quantity: 500,
      unit: 'kg',
      location: 'Zone 2',
    },
    // More materials...
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filter materials based on search term
  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.chantier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lister la quantité des matériels et des matériaux disponibles
      </Typography>

      <TextField
        label="Rechercher un matériel ou matériau"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ marginBottom: 2 }} />

      <List>
        {filteredMaterials.map((material) => (
          <ListItem key={material.id} divider>
            <ListItemText
              primary={material.name}
              secondary={`Chantier: ${material.chantier} | Quantité: ${material.quantity} ${material.unit} | Localisation: ${material.location}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
