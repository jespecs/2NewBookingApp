import React from 'react';
import { Chip } from '@mui/material';

const ColorLabel = ({ label, color }) => {
  return (
    <Chip
      label={label}
      style={{
        backgroundColor: color,
        color: getContrastColor(color),
      }}
    />
  );
};

// Helper function to determine text color based on background color
const getContrastColor = (hexColor) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white depending on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export default ColorLabel;