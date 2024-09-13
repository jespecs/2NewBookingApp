import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import dayjs from 'dayjs';
import ColorLabel from './ColorLabel';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', labelId: '', totalBookings: 0 });
  const [bookings, setBookings] = useState([]);
  const [labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState({ name: '', color: '#000000' });

  useEffect(() => {
    // Fetch users, bookings, and labels data from API or local storage
    // For now, we'll use dummy data
    setUsers([
      { id: 1, name: 'John Doe', labelId: 1, totalBookings: 10, remainingBookings: 8 },
      { id: 2, name: 'Jane Smith', labelId: 2, totalBookings: 15, remainingBookings: 12 },
    ]);

    setBookings([
      { id: 1, userId: 1, date: dayjs(), isRecurring: false },
      { id: 2, userId: 2, date: dayjs(), isRecurring: true },
    ]);

    setLabels([
      { id: 1, name: 'Team A', color: '#FF5733' },
      { id: 2, name: 'Team B', color: '#33FF57' },
    ]);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUserId = users.length + 1;
    setUsers([...users, { ...newUser, id: newUserId, remainingBookings: newUser.totalBookings }]);
    setNewUser({ name: '', labelId: '', totalBookings: 0 });
  };

  const handleAddBooking = (userId, date, isRecurring) => {
    const newBookingId = bookings.length + 1;
    setBookings([...bookings, { id: newBookingId, userId, date, isRecurring }]);

    // Update remaining bookings for the user
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, remainingBookings: user.remainingBookings - 1 } 
        : user
    ));
  };

  const handleAddLabel = (e) => {
    e.preventDefault();
    const newLabelId = labels.length + 1;
    setLabels([...labels, { ...newLabel, id: newLabelId }]);
    setNewLabel({ name: '', color: '#000000' });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} className="admin-dashboard">
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h5" gutterBottom>Bookings Calendar</Typography>
              <StaticDatePicker
                orientation="landscape"
                openTo="day"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h5" gutterBottom>Add New Label</Typography>
              <form onSubmit={handleAddLabel}>
                <TextField
                  label="Label Name"
                  value={newLabel.name}
                  onChange={(e) => setNewLabel({ ...newLabel, name: e.target.value })}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Label Color"
                  type="color"
                  value={newLabel.color}
                  onChange={(e) => setNewLabel({ ...newLabel, color: e.target.value })}
                  required
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Add Label
                </Button>
              </form>
            </Paper>
            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h5" gutterBottom>Add New User</Typography>
              <form onSubmit={handleAddUser}>
                <TextField
                  label="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Label</InputLabel>
                  <Select
                    value={newUser.labelId}
                    onChange={(e) => setNewUser({ ...newUser, labelId: e.target.value })}
                  >
                    {labels.map((label) => (
                      <MenuItem key={label.id} value={label.id}>
                        <ColorLabel label={label.name} color={label.color} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Total Bookings"
                  type="number"
                  value={newUser.totalBookings}
                  onChange={(e) => setNewUser({ ...newUser, totalBookings: parseInt(e.target.value) })}
                  required
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Add User
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
          <Typography variant="h5" gutterBottom>Users</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Label</TableCell>
                  <TableCell>Total Bookings</TableCell>
                  <TableCell>Remaining Bookings</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => {
                  const userLabel = labels.find(label => label.id === user.labelId);
                  return (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        {userLabel && <ColorLabel label={userLabel.name} color={userLabel.color} />}
                      </TableCell>
                      <TableCell>{user.totalBookings}</TableCell>
                      <TableCell>{user.remainingBookings}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleAddBooking(user.id, dayjs(), false)} variant="outlined" size="small" sx={{ mr: 1 }}>
                          Add Booking
                        </Button>
                        <Button onClick={() => handleAddBooking(user.id, dayjs(), true)} variant="outlined" size="small">
                          Add Recurring
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Paper>
    </LocalizationProvider>
  );
};

export default AdminDashboard;