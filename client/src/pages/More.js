import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React from 'react'
import Billing from '../components/Billing';
import { Delete, KeyboardArrowRight } from '@mui/icons-material';

const More = () => {
  return (
    <Container maxWidth="md">
      <Stack spacing={4} mb={8}>
        <Typography variant="h1">Billing Detail</Typography>
        <Billing />

        <Stack
          sx={{
            transition: "box-shadow 0.3s",
            "&:hover": {
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)", // Shadow on hover
            },
          }}
          bgcolor="white"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          border="1px solid gray"
          px={4}
          py={2}
          borderRadius={4}
          component="button"
        >
          <Stack direction="row" spacing={1}>
            <Delete /> <Typography variant="h2">Help</Typography>
          </Stack>
          <KeyboardArrowRight />
        </Stack>
      </Stack>
    </Container>
  );
}

export default More
