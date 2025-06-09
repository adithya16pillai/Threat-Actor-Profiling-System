import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Button, TextField, Box, Card, CardContent, CardActions, Grid, Paper, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ThreatActors = () => {
  const [threatActors, setThreatActors] = useState([]);
  const [newThreatActor, setNewThreatActor] = useState({ name: '', aliases: '', description: '', country: '', motivations: '' });

  useEffect(() => {
    fetchThreatActors();
  }, []);

  const fetchThreatActors = async () => {
    const response = await axios.get('http://localhost:8000/threat-actors/');
    setThreatActors(response.data);
  };

  const handleInputChange = (e) => {
    setNewThreatActor({ ...newThreatActor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/threat-actors/', newThreatActor);
    setNewThreatActor({ name: '', aliases: '', description: '', country: '', motivations: '' });
    fetchThreatActors();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>Threat Actors</Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Add New Threat Actor</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="name" label="Name" value={newThreatActor.name} onChange={handleInputChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="aliases" label="Aliases" value={newThreatActor.aliases} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField name="description" label="Description" value={newThreatActor.description} onChange={handleInputChange} fullWidth multiline rows={2} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="country" label="Country" value={newThreatActor.country} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="motivations" label="Motivations" value={newThreatActor.motivations} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />}>Add Threat Actor</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Grid container spacing={3}>
        {threatActors.map((actor) => (
          <Grid item xs={12} sm={6} md={4} key={actor.id}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{actor.name}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>Aliases: {actor.aliases}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>Country: {actor.country}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>Motivations: {actor.motivations}</Typography>
                <Typography variant="body2" color="textSecondary">{actor.description}</Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button size="small" color="primary">View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ThreatActors; 