import { Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const LocationCard = () => {
  return (
    <Button 
    variant='outlined'
      
      
      sx={{
        height: "12rem",
        width: "12rem",
        textTransform: "none",
        bgcolor: "primary",
        borderRadius: "1rem",
        padding: "2rem",
      }}
    >
      <Stack color="text.light" borderRadius="1rem" spacing={1}>
        <Typography textAlign="center" variant="h4">
          Noida Office
        </Typography>
        <Typography textAlign="center" variant="h2">
          Noida Up
        </Typography>
        <Typography textAlign="center" variant="h4">
          Lorem ipsum dolor, sit amet excepturi asperiores maiores veritatis!
        </Typography>
        <Typography textAlign="center" variant="h4" color="primary.main">
          View on Map
        </Typography>
      </Stack>
    </Button>
  );
}

export default LocationCard

