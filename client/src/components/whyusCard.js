import { Box, Stack, Typography } from '@mui/material';
import React from 'react'
import Img from "../img/insurance.svg";


const whyusCard = () => {

    
  return (

    <Stack
      flex={1}
      justifyContent="center"
      direction="column"
      spacing={2}
      component='button'
      alignItems='center'
      border='none'
      sx={{bgcolor:'transparent'}}
    
    >
      <Box component="img" height={40} src={Img}></Box>
      <Typography textAlign="center" variant="h3">
        Free Insurance
      </Typography>
      <Typography textAlign="center" variant="h4">
        Lorem ipsum autem vero. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, autem. Nam id mollitia, eius amet omnis corporis rerum adipisci vero.
      </Typography>
    </Stack>
  );
}

export default whyusCard
