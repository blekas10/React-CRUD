import React from 'react';
import {
  Typography, Box, Rating, RatingProps,
} from '@mui/material';

type RatingFieldProps = {
  defaultValue?:RatingProps['defaultValue']
};

const RatingField: React.FC<RatingFieldProps> = ({ defaultValue }) => (

  <Box sx={{ alignSelf: 'flex-start' }}>
    <Typography component="legend">Įvertinimas</Typography>
    <Rating defaultValue={defaultValue} name="rating" />
  </Box>
);

export default RatingField;
