import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import BookingApp from './components/BookingApp';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('booking');

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Word to the Mother Therapy
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => setCurrentView('booking')}
            variant={currentView === 'booking' ? 'outlined' : 'text'}
          >
            Booking
          </Button>
          <Button 
            color="inherit" 
            onClick={() => setCurrentView('admin')}
            variant={currentView === 'admin' ? 'outlined' : 'text'}
          >
            Admin
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {currentView === 'booking' ? <BookingApp /> : <AdminDashboard />}
        </Box>
      </Container>
    </div>
  );
}

export default App;
