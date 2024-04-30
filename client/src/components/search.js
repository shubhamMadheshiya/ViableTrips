import { Search } from '@mui/icons-material';
import { Button, InputBase, Paper, Stack } from '@mui/material'
import React from 'react'

const search = () => {
  return (
    <>
      <Paper elevation={5}  component='form' sx={{padding:'1rem', display:'flex', justifyContent:'space-between'}}>
        <InputBase 
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Location here"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <Button  variant="contained" sx={{color:'white', textTransform:'none'}} startIcon={<Search />}>
          Search
        </Button>
      </Paper>
    </>
  );
}

export default search
