import React, { useEffect, useState } from "react";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "./buddySlice";

const Contact = () => {
  const navigate = useNavigate();
  const setStepsNo = useOutletContext();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contact.formData);

  const citiesInIndia = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Jaipur",
    "Ahmedabad",
    "Pune",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Visakhapatnam",
    "Indore",
    "Thane",
    "Bhopal",
    "Patna",
    "Vadodara",
  ];

  useEffect(() => {
    setStepsNo(0);
  }, [setStepsNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ ...data, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Navigate to the next step
    navigate("/joinUs/step_2");
  };

  return (
    <Stack
      component="form"
      spacing={4}
      alignItems="center"
      onSubmit={handleFormSubmit}
    >
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        fullWidth
        name="name"
        value={data.name}
        onChange={handleChange}
        required
      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        fullWidth
        name="email"
        value={data.email}
        onChange={handleChange}
        required
        type="email"
      />
      <TextField
        id="mobileNumber"
        label="Mobile Number"
        variant="outlined"
        fullWidth
        name="mobileNumber"
        value={data.mobileNumber}
        onChange={handleChange}
        required
        inputProps={{
          pattern: "\\d{10}",
          title: "Mobile number must be 10 digits",
        }}
      />
      <Autocomplete
        fullWidth
        id="city"
        options={citiesInIndia}
        renderInput={(params) => (
          <TextField {...params} label="City" variant="outlined" required />
        )}
        value={data.city}
        onChange={(event, value) =>
          dispatch(updateFormData({ ...data, city: value || "" }))
        }
        isOptionEqualToValue={(option, value) => option === value}
      />
      <Button
        sx={{ color: "white", width: "fit-content" }}
        variant="contained"
        type="submit"
      >
        Save & Continue
      </Button>
    </Stack>
  );
};

export default Contact;
