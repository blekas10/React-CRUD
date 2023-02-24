import React from 'react';
import {
  TextField,
  Box,
} from '@mui/material';

const DescriptionField = () => (
  <Box sx={{ display: 'flex', width: 1, gap: 2 }}>
    <TextField
      label="Aprašymas"
      name="description"
      fullWidth
      multiline
      variant="filled"
      size="small"
      rows={3}
    />
  </Box>
);

export default DescriptionField;
