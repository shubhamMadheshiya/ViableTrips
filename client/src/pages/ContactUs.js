import React from "react";
import Carousel from "../components/Carousel";
import LocationCard from "../components/LocationCard";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const num = [1, 2, 3];

const ContactUs = () => {
  return (
    <Container maxWidth="lg">
      <Carousel />
      <Container maxWidth="md">
        <Stack spacing={8} mb={8} mt={8}>
          <Stack direction="row" spacing={4} justifyContent="space-around">
            {num.map((i) => {
              return <LocationCard />;
            })}
          </Stack>
          <Typography textAlign="center" variant="h1">
            Leave Us Your Info
          </Typography>
          <Paper elevation={4}>
            <Stack spacing={4} p={8} alignItems="center">
             
                <TextField label="Name" variant="outlined" fullWidth />
                <TextField label="Subject" variant="outlined" fullWidth />
              
              <TextField label="Email" variant="outlined" fullWidth />
              <TextField label="Message" multiline rows={4} fullWidth />

              <Button
                sx={{
                  color: "white",
                  width: "fit-content",
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
                variant="contained"
              >
                Submit
              </Button>
            </Stack>
          </Paper>

          <Box mt={4}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57935.83014658235!2d79.87062581076148!3d24.83003665316438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3982e5f63138c3c5%3A0xaa20ea639a4572c!2sKhajuraho%2C%20Madhya%20Pradesh%20471606!5e0!3m2!1sen!2sin!4v1707865660578!5m2!1sen!2sin"
              width="100%"
              height="400"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Stack>
      </Container>
    </Container>
  );
};

export default ContactUs;
