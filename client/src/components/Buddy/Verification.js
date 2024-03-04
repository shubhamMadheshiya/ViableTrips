import { CheckCircleOutline, CloudUpload, Downloading } from '@mui/icons-material';
import { Box, Button, Input, Paper, Stack, TextField } from '@mui/material'
import React from 'react'
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom';

const Verification = () => {
  const navigate = useNavigate();
  const history = unstable_HistoryRouter();

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      // Handle the selected file here, for example:
      console.log("Selected file:", file);
    };
  return (
    <>
      <Stack alignItems="center" spacing={4} useFlexGap>
        <TextField
          id="outlined-basic"
          label="Bank Account Number"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="IFSC Code"
          variant="outlined"
          fullWidth
        />

        <Stack
          width={"95%"}
          color="text.light"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            border: "1px solid #0005",
            borderRadius: "0.4em",
            borderStyle: "dashed",
          }}
          p={2}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <CloudUpload color="inherit" />

            <h4>
              Drage and Drop file here <span> or Choose File</span>{" "}
            </h4>
          </Stack>

          <CheckCircleOutline color="success" />
        </Stack>

        <Stack
          useFlexGap
          color="text.light"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            border: "1px solid #0005",
            borderRadius: "0.4em",
            borderStyle: "dashed",
            width: "95%",
          }}
          p={2}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <CloudUpload color="inherit" />

            <h4>
              Drage and Drop file here <span> or Choose File</span>{" "}
            </h4>
          </Stack>

          <Downloading color="warning" />
        </Stack>
        <Stack fullWidth direction="row" spacing={4}>
          <Button variant="text" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button
            sx={{ color: "white" }}
            variant="contained"
            onClick={() => navigate("/", { replace: true })}
          >
            Finish
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default Verification
