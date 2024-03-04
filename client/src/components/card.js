import { Bookmark, History, LocationOn, Star } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import React from 'react'
import PlaceImg from '../img/delhi.jpg'

const card = () => {
  return (
    <>
      <Card sx={{ maxWidth: 260 }}>
        <CardActionArea>
          <Box position='relative'>
            <CardMedia
              component="img"
              height="200"
              image={PlaceImg}
              alt="green iguana"
            />
            <Stack direction="row" justifyContent="space-between" p={2} position='absolute' top={0} left={0} right={0}>
              <Button
                variant="contained"
                color="inherit"
                size='small' 
                startIcon={<LocationOn />}
              >
                Delhi
              </Button>
              <Button
                variant="contained"
                color="inherit"
                size="small"
                
                startIcon={<History/>}
              >
                55
              </Button>
            </Stack>
          </Box>

          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4">With Rajat Gupta</Typography>
                <Stack direction="row">
                  <Star fontSize="sm" />
                  <Typography variant="h4">5</Typography>
                </Stack>
              </Stack>
              <Typography gutterBottom variant="h2">
                A bit of Golden Triangle and The Land of Love and Devotion : New
              </Typography>
              <Typography variant="h4">09 Apr ,24 | 8 Day</Typography>
              <Typography gutterBottom variant="h2" color="primary.main">
                $200
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default card
