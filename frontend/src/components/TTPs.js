import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, TextField, Box, Card, CardContent, CardActions, Grid, Paper, Divider, CircularProgress, Alert, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TTPs = () => {
  const [ttps, setTTPs] = useState([]);
  const [newTTP, setNewTTP] = useState({ name: '', description: '', mitre_id: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchTTPs();
  }, []);

  const fetchTTPs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8000/ttps/');
      setTTPs(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch TTPs. Please ensure the backend server is running.');
      setSnackbar({
        open: true,
        message: 'Failed to fetch TTPs',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewTTP({ ...newTTP, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await axios.post('http://localhost:8000/ttps/', newTTP);
      setNewTTP({ name: '', description: '', mitre_id: '' });
      setSnackbar({
        open: true,
        message: 'TTP added successfully',
        severity: 'success'
      });
      fetchTTPs();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add TTP');
      setSnackbar({
        open: true,
        message: 'Failed to add TTP',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>TTPs</Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Add New TTP</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField 
                name="name" 
                label="Name" 
                value={newTTP.name} 
                onChange={handleInputChange} 
                fullWidth 
                required 
                error={error && !newTTP.name}
                helperText={error && !newTTP.name ? 'Name is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                name="mitre_id" 
                label="MITRE ID" 
                value={newTTP.mitre_id} 
                onChange={handleInputChange} 
                fullWidth 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                name="description" 
                label="Description" 
                value={newTTP.description} 
                onChange={handleInputChange} 
                fullWidth 
                multiline 
                rows={2} 
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                disabled={loading}
              >
                Add TTP
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {ttps.map((ttp) => (
          <Grid item xs={12} sm={6} md={4} key={ttp.id}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{ttp.name}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>MITRE ID: {ttp.mitre_id}</Typography>
                <Typography variant="body2" color="textSecondary">{ttp.description}</Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button size="small" color="primary">View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TTPs; 