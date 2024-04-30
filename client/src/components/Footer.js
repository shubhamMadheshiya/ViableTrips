import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import Viable from '../img/vible_logo.svg'
import ViableAlfa from "../img/vible_alfabet.svg";
import links from '../json/Navbar'
import CompanyLinks from "../json/CompanyLink";
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import Number from './login/Number';

const Footer = () => {




  // Login

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };


     const handlers = useMemo(
       () => ({
         handleClickOpen,
         handleClose,
        
       }),
       [handleClickOpen, handleClose,setOpen]
     );









  return (
    <Stack bgcolor="footer" p={4} spacing={4} px={12} marginTop="auto">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h1" color="white">
          Your Travel Jurney Start Here
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            id="outlined-basic"
            size="small"
            bgcolor="white"
            color="text"
            sx={{ color: "gray" }}
            inputProps={{ style: { color: "gray" } }}
            focused
            variant="outlined"
            placeholder="Type your email for update"
            fullWidth
          />
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Subcribe
          </Button>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row">
          <Box component="img" color="white" src={Viable} />
          <Box component="img" color="white" src={ViableAlfa} />
        </Stack>

        <Stack direction="row" height={0.5} spacing={6}>
          <Stack direction="column" color="text.light" spacing={1}>
            <Typography fontWeight="700" variant="h4">
              PAGES
            </Typography>
            {links.map((link) => {
              return (
                <Typography
                  component={Link}
                  variant="h4"
                  to={link.url}
                  sx={{
                    textDecoration: "none",
                    textDecoration: "none", // Remove underline
                    color: "inherit", // Inherit text color
                    "&:hover": {
                      textDecoration: "none", // Remove underline on hover
                    },
                  }}
                >
                  {link.name}
                </Typography>
              );
            })}
          </Stack>

          <Stack direction="column" color="text.light" spacing={1}>
            <Typography fontWeight="700" variant="h4">
              COMPANY
            </Typography>
            {CompanyLinks.map((link) => {
              return (
                <Typography
                  component={Link}
                  variant="h4"
                  to={link.url}
                  sx={{
                    textDecoration: "none",
                    textDecoration: "none", // Remove underline
                    color: "inherit", // Inherit text color
                    "&:hover": {
                      textDecoration: "none", // Remove underline on hover
                    },
                  }}
                >
                  {link.name}
                </Typography>
              );
            })}
          </Stack>

          <Stack direction="column" color="text.light" spacing={1}>
            <Typography fontWeight="700" variant="h4">
              ACCOUNT
            </Typography>
            <Typography
              onClick={handleClickOpen}
              component={Link}
              variant="h4"
              sx={{
                textDecoration: "none",
                textDecoration: "none", // Remove underline
                color: "inherit", // Inherit text color
                "&:hover": {
                  textDecoration: "none", // Remove underline on hover
                },
              }}
            >
              Login
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" color="text.light">
          © All rights reserved Viabletrips. Powered By Weband Technology
        </Typography>

        <Stack color="text.light" direction="row" spacing={2}>
          <Instagram />
          <Twitter />
          <Facebook />
        </Stack>
      </Stack>

      {/* <Number handlers={handlers} open={open} setOpen={setOpen} /> */}
    </Stack>
  );
}

export default Footer
