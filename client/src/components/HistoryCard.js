import { ArrowForwardIos, ArrowRightAlt, KeyboardArrowRight } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Paper, Rating, Stack, Typography } from '@mui/material'
import React from 'react'

const HistoryCard = () => {

     const [value, setValue] = React.useState(2);
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{ width: 140, flex: 1 }}
          image="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Stack flex={9}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h2">Delhi</Typography>
                <Typography variant="h4">( Mon, 17 july , 2023)</Typography>
              </Stack>
              <Button
                variant="text"
                color="success"
                sx={{ textTransform: "none" }}
              >
                Primary
              </Button>
            </Stack>
            <Stack direction="row" justifyContent="space-between" pr={2}>
              <Stack spacing={1}>
                <Typography variant="h4">Pick Up Time : 09:35</Typography>
                <Typography variant="h4">
                  Pick Up Location : Ghanta Ghar Pick Up Location
                </Typography>
                <Typography variant="h4">Total Day of Trip : 5 Day</Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Stack>

              <Avatar
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                sx={{ width: 40, height: 40 }}
              />
            </Stack>
          </CardContent>

          <Stack direction="row" justifyContent="space-between" pr={2}>
            <CardActions>
              <Button
                variant="contained"
                size="small"
                sx={{ color: "white", textTransform: "none", bgcolor: "black" }}
              >
                Call Buddy
              </Button>
              <Button
                variant="outlined"
                color="text"
                endIcon={<KeyboardArrowRight />}
                size="small"
                sx={{ textTransform: "none" }}
              >
                More Info
              </Button>
            </CardActions>
            <Typography color="text.light" variant="h4">
              CRN No : 2355464787
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

export default HistoryCard
