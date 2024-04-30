import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import { useState } from "react";

const Otp = ({ handlers, open, setOpen }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // You can handle form submission logic here
    console.log(phoneNumber); // Placeholder for handling form submission
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle textAlign="center">Enter Your Mobile Number</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}
      >
        <TextField
          id="phone-number"
          label="Mobile Number"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          required
          helperText="Please enter your 10-digit mobile number"
        />
        <Divider>or</Divider>
        <Button
          variant="outlined"
          fullWidth
          startIcon={
            <img
              alt="Google Icon"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KPHBhdGggZD0iTTE3LjMwNiwxNC42OTFsMTMuOTU3LTAuODc2QzE1LjE4MywxNS4yMjEsMTQuNTc5LDE1LjIyMSwxNC4xMjgsMTMuOTU3TDMuNTUyLDM5LjA4M0MxLjUyMywzOS4zMTUsMCwzNy4yMjMsMCwzMy45NTdDMCwzNi4zNzEsMCwxNS4wOTcsMCwxMy45NTdMMjQuODA0LDEzLjk1N0MzNS40NjYsMTUuMDk3LDM1LjI1MSwxNC4wNTUsMzQuMTY1LDE0LjE2NWMtMy4zNDUtMC4yMzQtNi42NzYtMi4xMDQtMTAuOTgzLTcuNTI1bC0xLjk3Mi00LjA3OEMxNy4yMzQsMTQuMDY4LDE3LjQ5NSwxMy4yMzIsMTcuMzA2LDE0LjY5MXoiIHN0cm9rZT0iIzAwMzZGNyIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPgo="
            />
          }
          sx={{ color: "black", border: "1px solid black" }}
        >
          Continue with Google
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          sx={{ color: "white", bgcolor: "black", mb: 2 }}
          fullWidth
          onClick={handleFormSubmit}
        >
          Send OTP
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Otp;
