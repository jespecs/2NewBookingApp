import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { Button, Card, CardContent, Typography, Box, Paper, Grid } from '@mui/material';
import dayjs from 'dayjs';
import './BookingApp.css';

const BookingApp = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setShowConfirmation(false);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowConfirmation(false);
  };

  const handleBooking = () => {
    setShowConfirmation(true);
  };

  const isWeekday = (date) => {
    const day = date.day();
    return day !== 0 && day !== 6;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 10; i <= 14; i++) {
      const startTime = dayjs().hour(i).minute(0);
      const endTime = startTime.add(50, 'minute');
      slots.push({
        value: `${i}:00 - ${i}:50`,
        display: `${startTime.format('h:mm A')} - ${endTime.format('h:mm A')}`
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} className="booking-app">
        <Typography variant="h4" gutterBottom>
          Book an Appointment
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StaticDatePicker
              orientation="landscape"
              openTo="day"
              value={selectedDate}
              shouldDisableDate={(date) => !isWeekday(date) || dayjs(date).isBefore(dayjs(), 'day')}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Select a Time
            </Typography>
            <Box className="time-select">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.value}
                  variant={selectedTime === slot.value ? "contained" : "outlined"}
                  onClick={() => handleTimeSelect(slot.value)}
                  disabled={!selectedDate}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  {slot.display}
                </Button>
              ))}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
              fullWidth
              sx={{ mt: 2 }}
            >
              Book Now
            </Button>
          </Grid>
        </Grid>
        {showConfirmation && selectedDate && (
          <Card className="confirmation-card" sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Booking Confirmed
              </Typography>
              <Typography variant="body1">
                Date: {selectedDate.format('MMMM DD, YYYY')}
              </Typography>
              <Typography variant="body1">
                Time: {timeSlots.find(slot => slot.value === selectedTime)?.display}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Paper>
    </LocalizationProvider>
  );
};

export default BookingApp;