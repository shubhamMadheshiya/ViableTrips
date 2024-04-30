import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Typography } from "@mui/material";

const MultiValueTextField = () => {
  const [values, setValues] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setValues([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveValue = (index) => {
    setValues(values.filter((_, i) => i !== index));
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Enter values"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        fullWidth
        InputProps={{
          startAdornment: (
            <Stack direction="row" spacing={1}>
              {values.map((value, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center" ,pl:1, backgroundColor:'primary.light', minWidth:"4em" , justifyContent:'space-between', borderRadius:'1rem'}}
                >
                  <Typography color='primary.main'>{value}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveValue(index)}
                  >
                    <CancelIcon sx={{color:'black'}} />
                  </IconButton>
                  {/* {index !== values.length - 1 && ","} */}
                </Box>
              ))}
            </Stack>
          ),
        }}
      />
    </Stack>
  );
};

export default MultiValueTextField;
