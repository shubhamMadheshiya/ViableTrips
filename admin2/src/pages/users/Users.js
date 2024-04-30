import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { Add, MoreVert, Search } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";



const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 120,
    renderCell: (params) => <ActionMenu params={params} />,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];



const AlertDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { padding: 2 } }}
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




const ActionMenu = ({ params }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate("/users/editUser");
    handleMenuClose();
  };

  const handleDelete = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <MoreVert onClick={handleMenuOpen} />
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <AlertDialog open={openDialog} handleClose={handleCloseDialog} />
    </div>
  );
};



const LabTabs = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="lab API tabs example"
        >
          <Tab label="Item One" value="1" />
          <Tab label="Item Two" value="2" />
          <Tab label="Item Three" value="3" />
        </Tabs>
      </Box>
    </Box>
  );
};







const DataTable = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);
  };

  const filteredRows = rows.filter((row) => {
    return (
      (row.firstName && row.firstName.toLowerCase().includes(searchText)) ||
      (row.lastName && row.lastName.toLowerCase().includes(searchText))
    );
  });

  return (
    <Paper
      style={{
        height: 500,
        width: "98%",
        display: "flex",
        flexDirection: "column",
        gap: "2em",
        padding: 16,
      }}
    >
      <LabTabs />
      <OutlinedInput
        variant="outlined"
        id="input-with-icon-adornment"
        value={searchText}
        onChange={handleSearch}
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
      />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </Paper>
  );
};


const Users = () => {
  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>List</h1>
        <Button component={Link} to='/users/createUser' variant="contained" color="secondary" startIcon={<Add />}>
          New User
        </Button>
      </Stack>
      <DataTable />
    </div>
  );
};

export default Users;
