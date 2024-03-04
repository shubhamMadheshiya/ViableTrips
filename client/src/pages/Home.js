import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'


import Search from '../components/search';
import WhyUs from '../components/whyUs'
import Top from '../components/topdestination'
import HighlightBox from '../components/HighlightBox';
import BlogsList from '../components/BlogsList';
import Carousel from '../components/Carousel'

const Home = () => {

 
  return (
    <Container maxWidth="lg">
      <Stack spacing={8} mb={8}>
        <Carousel />

        <Search />
        <Typography textAlign="center" variant="h1">
          Why Choose ViableTrips
        </Typography>
        <WhyUs />
        <Typography textAlign="center" variant="h1">
          Top Destination
        </Typography>
          <Top />
        <HighlightBox />
        <Typography textAlign="center" variant="h1">
          Oue Latest Blogs Posts
        </Typography>
        <BlogsList />
      </Stack>
    </Container>
  );
}

export default Home
