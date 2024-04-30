import React, { useEffect } from "react";
import Logo from "../img/vible_logo.svg";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


import Logo_Alfa from "../img/vible_alfabet.svg";
import {
  Avatar,
  Stack,
  Item,
  Box,
  Typography,
  Badge,
  IconButton,
  Tooltip,
  MenuItem,
  ListItemIcon,
  Menu,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  History,
  Logout,
  Mail,
  Notifications,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import Footer from "./Footer";
import {useSendLogoutMutation} from './Auth/authApi'
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
} from "./User/userApi";

import { selectCurrentUser, selectCurrentToken } from "./Auth/authSlice";
import links from "../json/Navbar";
const Navbar = () => { 
  const [logOut,result] = useSendLogoutMutation()
   const token = useSelector(selectCurrentToken);
   const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const {
      data: myData,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetUserQuery(currentUser?.id);
  
 
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async() => {

    console.log("loging out")
    // Dispatch logout action
    try {
      const res = await logOut()
      console.log(res)
      
    } catch (error) {
      console.log(error)
      
    }
    // Close the menu
    handleClose();
  };

console.log("result",result.isSuccess)
  useEffect(()=>{
    console.log("su")
    if(result.isSuccess){
       navigate("/", { replace: true });
    }

  },[result.isSuccess, result.isError])
  return (
    <Stack>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        py={1}
        px={2}
      >
        <Stack direction="row">
          <Box component="img" alt="Remy Sharp" src={Logo} />
          <Box component="img" src={Logo_Alfa}></Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          {links.map((link) => {
            return (
              <Typography
                variant="h3"
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
        {token ? (
          <Stack direction="row" spacing={4} alignItems="center">
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
                {isLoading && (
                  <>
                    <Avatar sx={{ width: 32, height: 32 }} alt="Profile" />

                    <CircularProgress
                      // variant="determinate"
                      // value={imagePercent}
                      size={32} // Adjust this size to fit your Avatar size plus some margin
                      thickness={2} // Adjust the thickness
                      sx={{
                        position: "absolute",
                        zIndex: 1,
                        // color: "green", // Change the color to increase visibility
                      }}
                    />
                  </>
                )}
                {isSuccess && (
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={myData?.profileUrl}
                  >
                    {myData?.name.toUpperCase()[0]}
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
          </Stack>
        ) : (
          <Button
            component={Link}
            to="/logIn"
            variant="contained"
            sx={{ color: "white" }}
          >
            Log in
          </Button>
        )}
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
        <MenuItem onClick={handleClose} component={Link} to="/profile">
          <Avatar /> Profile
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        <MenuItem onClick={handleClose} component={Link} to="/history">
          <ListItemIcon>
            <History fontSize="small" />
          </ListItemIcon>
          History and Recents
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/more">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      
    </Stack>
  );
};

export default Navbar;
