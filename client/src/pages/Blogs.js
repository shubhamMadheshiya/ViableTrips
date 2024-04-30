import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import Carousel from '../components/Carousel'

import BlogCard from "../components/BlogCard";


const num = [1,2,3,4,5,6,7,8]


const Blogs = () => {
  return (
    <Container maxWidth="lg">
      <Stack spacing={8} mb={8}>
        <Carousel />
        <Typography textAlign="center" variant="h1">
          Our Latest Blogs Posts
        </Typography>
        <Stack direction="row" spacing={4} useFlexGap flexWrap="wrap">
          {num.map((i) => {
            return <BlogCard />;
          })}
        </Stack>
      </Stack>
    </Container>
  );
}

export default Blogs
