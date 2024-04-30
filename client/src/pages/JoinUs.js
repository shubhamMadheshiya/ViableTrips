import { Box, Container, Stack, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react'
import ContactDetails from '../img/join/contact_detail.svg'
import { Outlet, Link } from "react-router-dom";
// import Contact from '../components/Contact';
// import PersonalDetail from '../components/PersonalDetail';
import Verification from '../components/Buddy/Verification';


const steps = [
  "Contact Details",
  "Personal Details",
  "Verification",
];

const JoinUs = () => {
  const [stepsNo , setStepsNo]=useState(1)
  return (
    <Container maxWidth="lg">
      <Stack spacing={8} mb={8} direction="row">
        <Stack flex={1} justifyContent="center" alignItems="center">
          <Box component="img" width="100%" src={ContactDetails} />
        </Stack>
        <Stack flex={1} direction="column" spacing={4}>
          <Stepper activeStep={stepsNo} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* <Verification/> */}

          <Outlet context={setStepsNo} />
        </Stack>
      </Stack>
    </Container>
  );
}

export default JoinUs
