import React from 'react'
import Logo from '../img/vible_logo.svg'
import { Outlet, Link } from "react-router-dom";
import Logo_Alfa from '../img/vible_alfabet.svg'
import {Avatar, Stack,Item, Box, Typography, Badge, IconButton, Tooltip, MenuItem, ListItemIcon, Menu, Divider} from "@mui/material";
import {History, Logout, Mail, Notifications, PersonAdd, Settings} from "@mui/icons-material";
import Footer from './Footer';
import links from '../json/Navbar'
const Navbar = () => {





   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };
  return (
    <Stack minHeight='100vh' >
      <Stack
        direction="row"
        spacing={2}
       
        justifyContent="space-between"
        alignItems="center"
        py={1} px={2}
      >
        <Stack direction="row">
          <Box component="img" alt="Remy Sharp" src={Logo} />
          <Box component="img" src={Logo_Alfa}></Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          {links.map((link) => {
            return (
              <Typography
              variant='h3'
                sx={{
                  textDecoration: "none",
                  textDecoration: "none", // Remove underline
                  color: "inherit", // Inherit text color
                  "&:hover": {
                    textDecoration: "none", // Remove underline on hover
                  },
                }}
                component={Link}
                to={link.url}
               
              >
                {link.name}
              </Typography>
            );
          })}
          
        </Stack>
        <Stack direction="row" spacing={4} alignItems='center'>
          <Badge badgeContent={4} color="error">
            <Mail color="action" />
          </Badge>
          <Badge badgeContent={4} color="error">
            <Notifications color="action" />
          </Badge>

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} component={Link} to='/profile'>
          <Avatar /> Profile
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        <MenuItem onClick={handleClose} component={Link} to='/history'>
          <ListItemIcon>
            <History fontSize="small" />
          </ListItemIcon>
          History and Recents
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to='/more'>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Outlet />

      <Footer />
    </Stack>
  );
}

export default Navbar
