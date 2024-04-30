import { Camera, CameraAlt } from '@mui/icons-material';
import { Avatar, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const Create = () => {
  return (
    <Stack spacing={4} my={4}>
    <Typography  variant="h1">Create User</Typography>
    <Stack direction="row" spacing={8} justifyContent="space-around">
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: 4,
         p:4,
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 200, height: 200 }}
        >
            <CameraAlt sx={{width:100, height:100}}/>
        </Avatar>
        <Typography variant="h4">
          Allowed *.jpeg, *.jpg, *.png, *.gif max size of 2 Mb
        </Typography>
      </Paper>

      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: 4,
         p:4,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color='secondary' sx={{ ml: "auto" }}>
          {" "}
          Create{" "}
        </Button>
      </Paper>
    </Stack>
    </Stack>
  );
}

export default Create
