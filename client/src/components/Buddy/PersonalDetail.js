import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "./buddySlice";
import { app } from "../../firebase/firebase";
import {
  Button,
  Avatar,
  Badge,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  CircularProgress,
  Stack,
  LinearProgress,
} from "@mui/material";
import Camera from "../../img/join/camera.svg";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const languages = [
  "English",
  "Mandarin Chinese",
  "Hindi",
  "Spanish",
  "French",
  "Standard Arabic",
  "Bengali",
  "Russian",
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const defaultAvatar = require("../../img/defaultProfile.jpg").default;

const PersonalDetail = () => {
  const data = useSelector((state) => state.contact.formData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return; // No file selected

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPEG or PNG file.");
      return;
    }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.error("File upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          dispatch(
            updateFormData({
              ...data,
              profilePic: downloadURL,
            })
          );
        });
      }
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!data.dateOfBirth || !data.gender) {
      alert("Please fill in all required fields.");
      return;
    }
    dispatch(updateFormData(data));
    navigate("/joinUs/step_3");
  };

  return (
    <Stack
      component="form"
      alignItems="center"
      spacing={4}
      onSubmit={handleFormSubmit}
    >
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        sx={{ position: "relative", borderRadius: "1000rem" }}
      >
     
          <Avatar
            alt="Profile"
            src={data.profilePic || defaultAvatar}
            sx={{ width: 100, height: 100 }}
          />
          
            <CircularProgress
              variant="determinate"
              value={imagePercent}
              size={100} // Adjust this size to fit your Avatar size plus some margin
              thickness={2} // Adjust the thickness
              sx={{
                position: "absolute",
                zIndex: 1,
                // color: "green", // Change the color to increase visibility
              }}
            />
        
       

        <VisuallyHiddenInput
          type="file"
          onChange={handleFileUpload}
          accept=".jpg, .jpeg, .png"
        />
      </Button>

      <Autocomplete
        fullWidth
        multiple
        id="languages"
        options={languages}
        value={data.languages}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} label="Language" />}
        onChange={(event, value) =>
          dispatch(updateFormData({ ...data, languages: value }))
        }
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          fullWidth
          label="Date of Birth"
          value={data.dateOfBirth}
          onChange={(date) =>
            dispatch(updateFormData({ ...data, dateOfBirth: date }))
          }
          renderInput={(params) => <TextField {...params} required />}
        />
      </LocalizationProvider>

      <FormControl fullWidth required>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          value={data.gender}
          onChange={(e) =>
            dispatch(updateFormData({ ...data, gender: e.target.value }))
          }
          fullWidth
          label="Gender"
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel id="smoking-label">Problem with Smoking</InputLabel>
        <Select
          labelId="smoking-label"
          id="smoking"
          value={data.smoking}
          onChange={(e) =>
            dispatch(updateFormData({ ...data, smoking: e.target.value }))
          }
          fullWidth
          label="Problem with Smoking"
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

      <Stack direction="row" spacing={4}>
        <Button variant="text" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button sx={{ color: "white" }} variant="contained" type="submit">
          Save & Continue 
        </Button>
      </Stack>
    </Stack>
  );
};

export default PersonalDetail;
