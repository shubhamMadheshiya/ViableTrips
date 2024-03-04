import React from 'react'
import BlogCard from './BlogCard';
import { Stack } from '@mui/material';
import Sliders from './Sliders';

const BlogsList = () => {
      const num = [1, 2, 3, 4, 5];
      return (
        <Sliders value={num}>
          <BlogCard/>
        </Sliders>
      );
}

export default BlogsList
