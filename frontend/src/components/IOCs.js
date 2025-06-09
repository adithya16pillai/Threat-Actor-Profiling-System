import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Button, TextField, Box, Card, CardContent, CardActions, Grid, Paper, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const IOCs = () => {
  const [iocs, setIOCs] = useState([]);
  const [newIOC, setNewIOC] = useState({ type: '', value: '', threat_actor_id: '' });

  useEffect(() => {
    fetchIOCs();
  }, []);

  const fetchIOCs = async () => {
    const response = await axios.get('http://localhost:8000/iocs/');
    setIOCs(response.data);
  };

  const handleInputChange = (e) => {
    setNewIOC({ ...newIOC, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/iocs/', newIOC);
    setNewIOC({ type: '', value: '', threat_actor_id: '' });
    fetchIOCs();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>IOCs</Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Add New IOC</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="type" label="Type" value={newIOC.type} onChange={handleInputChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="value" label="Value" value={newIOC.value} onChange={handleInputChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField name="threat_actor_id" label="Threat Actor ID" value={newIOC.threat_actor_id} onChange={handleInputChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />}>Add IOC</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Grid container spacing={3}>
        {iocs.map((ioc) => (
          <Grid item xs={12} sm={6} md={4} key={ioc.id}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{ioc.type}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>Value: {ioc.value}</Typography>
                <Typography variant="body2" color="textSecondary">Threat Actor ID: {ioc.threat_actor_id}</Typography>
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

export default IOCs; 