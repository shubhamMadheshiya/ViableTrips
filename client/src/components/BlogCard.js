import { Star } from '@mui/icons-material';
import { Box, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import React from 'react'
import PlaceImg from "../img/delhi.jpg";

const BlogCard = () => {
  return (
    <>
      <Card sx={{ maxWidth: 260 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={PlaceImg}
            alt="green iguana"
          />
          <CardContent>
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                p={2}
                bgcolor="secondary.main"
                borderRadius={2}
              >
                <Typography variant="h4" color="primary.main">
                  02, jan 2020
                </Typography>
                <Typography variant="h3">|</Typography>
                <Typography variant="h4">Author</Typography>
              </Stack>
              <Typography variant="h2">
                A bit of Golden Triangle and The Land of Love and Devotion : New
              </Typography>
              <Box>
                <Typography component="span" variant="h4" display="inline">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  eaque et ab ratione voluptates quasi?......
                </Typography>
                <Typography
                  component="span"
                  variant="h4"
                  display="inline"
                  color="primary.main"
                >
                    Read More
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default BlogCard
