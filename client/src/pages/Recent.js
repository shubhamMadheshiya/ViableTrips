import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import HistoryCard from '../components/HistoryCard'

const num = [1,2,3,4,5,6,7,8]

const Recent = () => {
  return (
    <Container maxWidth="lg">
      <Stack spacing={4} mb={8}>
        <Typography  variant="h1">
          Recent & History
        </Typography>
        {num.map((i) => {
          return <HistoryCard />;
        })}
      </Stack>
    </Container>
  );
}

export default Recent
