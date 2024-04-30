import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const HighlightBox = () => {
  return (
    <Stack spacing={2} bgcolor='primary.light' p={4}>
      <Typography textAlign='center' variant="h2">Free Accidental Travel Insurance</Typography>
      <Typography textAlign='center' variant="h3">
        Enjoy the peace of mind with complimentary accidental travel insurance
        provided by ViableTrips. Your safety is our priority, and we've got you
        covered throughout your journey. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, officia. Magni corrupti pariatur quaerat error.
      </Typography>
    </Stack>
  );
}

export default HighlightBox
