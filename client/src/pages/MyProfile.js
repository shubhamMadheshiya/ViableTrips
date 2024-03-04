import styled from '@emotion/styled';
import { Avatar, Badge, Button, Container, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Camera from '../img/join/camera.svg'

const MyProfile = () => {


    const VisuallyHiddenInput = styled("input")({
      clip: "rect(0 0 0 0)",
      clipPath: "inset(50%)",
      height: 1,
      overflow: "hidden",
      position: "absolute",
      bottom: 0,
      left: 0,
      whiteSpace: "nowrap",
      width: 1,
    });

  return (
    <Container maxWidth="lg">
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        spacing={8}
        mb={8}
        p={8}
      >
        <Stack
          minWidth="400px"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            sx={{ borderRadius: "1000rem" }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Avatar sx={{ width: "2.5em", height: "2.5em" }} src={Camera} />
              }
            >
              <Avatar
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                sx={{ width: 180, height: 180 }}
              />
            </Badge>

            <VisuallyHiddenInput type="file" />
          </Button>
          <Typography variant="h4">
            Allowed *.jpeg, *.jpg, *.png, *.gifmax size of 3 Mb
          </Typography>

          <Button
            variant="text"
            size="small"
            color="error"
            sx={{ width: "fit-content", textTransform: "none" }}
          >
            Delete Profile
          </Button>
        </Stack>
        <Stack spacing={4} flex={1} minWidth="400px" alignItems="center">
          <Typography variant="h1" textAlign="center">
            My Profile
          </Typography>
          <TextField
            fullWidth
            label="Name"
            defaultValue="Shubham"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Email"
            defaultValue="kr.shubhamgupta1999@gmail.com"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Mobile Number"
            disabled
            defaultValue="9670653925"
            variant="outlined"
          />
          <Button
            variant="contained"
            sx={{ color: "white", textTransform: "none", width: "fit-content" }}
          >
            Save & Change
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
  
}

export default MyProfile
