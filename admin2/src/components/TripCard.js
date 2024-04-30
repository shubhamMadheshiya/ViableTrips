import { Bookmark, Delete, Edit, History, LocationOn, MoreVert, Star, Visibility } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
const PlaceImg ="https://images.unsplash.com/photo-1582450724147-0ee17201a14c?q=80&w=1862&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const AlertDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { padding: 2 , width:"100rem"} }}
    >
      <DialogTitle>Delete</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: "flex" }}>
        <Button onClick={handleClose} variant="contained" color="error">
          Delete
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="secondary"
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const TripCard = () => {
  const navigate = useNavigate()
   const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleDelete =()=>{
       setOpenDialog(true)
       handleClose()
    }
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };

      const handleEdit =()=>{
        navigate('/trips/editTrip')
        handleClose()

      }

  return (
    <>
      <Card sx={{   minWidth:280 ,flexGrow:1 , flexBasis:1, flexShrink:1, }}>
        <CardActionArea>
          <Box position="relative">
            <CardMedia
              component="img"
              height="200"
              image={PlaceImg}
              alt="green iguana"
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              p={2}
              position="absolute"
              top={0}
              left={0}
              right={0}
            >
              <Button
                variant="contained"
                color="inherit"
                size="small"
                startIcon={<LocationOn />}
              >
                Delhi
              </Button>
              <Button
                variant="contained"
                color="inherit"
                size="small"
                startIcon={<History />}
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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography gutterBottom variant="h2" color="primary">
                  $200
                </Typography>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose} sx={{ minWidth: "150px" }}>
                    <ListItemIcon>
                      <Visibility fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleEdit} sx={{ minWidth: "150px" }}>
                    <ListItemIcon>
                      <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleDelete} sx={{ minWidth: "150px" }}>
                    <ListItemIcon>
                      <Delete color="error" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "error.main" }}>
                      Delete
                    </ListItemText>
                  </MenuItem>
                </Menu>
                <AlertDialog
                  open={openDialog}
                  handleClose={handleCloseDialog}
                />
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default TripCard;
