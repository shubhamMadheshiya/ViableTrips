import React, { useState, useRef } from "react";
import {
  TextField,
  Typography,
  Avatar,
  Stack,
  Paper,
  Card,
  CardContent,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Box,
  IconButton,
  Switch,
  Button,
} from "@mui/material";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import quill styles
import { Close } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import uploadIcon from "../../assets/uploadFile.svg";




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
    <Stack spacing={2} sx={{ mb: 1, mt: 2 }}>
      <TextField
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
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pl: 1,
                    backgroundColor: "primary.light",
                    minWidth: "4em",
                    justifyContent: "space-between",
                    borderRadius: "1rem",
                  }}
                >
                  <Typography color="primary.main">{value}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveValue(index)}
                  >
                    <CancelIcon sx={{ color: "black" }} />
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

const FormComponent = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [selectedGuides, setSelectedGuides] = useState([]);
  const fileInputRef = useRef(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleImageChange = (event) => {
    setImages([...images, event.target.files[0]]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    setImages([...images, imageFile]);
  };

  const handleCardClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    images.forEach((image) => formData.append("images", image));
    selectedGuides.forEach((guide) => formData.append("guides", guide.name));

    console.log("Form Data:", { name, content });
    console.log("Image Files:", images);
    console.log("Selected Guides:", selectedGuides);
  };

  const renderTags = (value, getTagProps) =>
    value.map((option, index) => (
      <Stack direction="row" alignItems='center'>
        <Avatar
          key={index}
          {...getTagProps({ index })}
          alt={option.name}
          src={option.avatarUrl}
          sx={{ marginRight: 1, width: 32, height: 32 }}
        />
       <Typography variant="h4">{option.name}</Typography>
      </Stack>
    ));

  return (
    <Stack direction="column" spacing={4} sx={{ p: 8 }}>
      <Typography variant="h1">Details</Typography>
      <Paper sx={{ p: 6 }}>
        <Stack
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Typography variant="h2" sx={{ mb: 1 }}>
            Name
          </Typography>
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Content
          </Typography>
          <Quill
            theme="snow"
            value={content}
            style={{ mt: 2, mb: 1, height: 200 }}
            onChange={handleContentChange}
          />

          <Card
            onClick={handleCardClick}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            sx={{ cursor: "pointer", mt: 2, mb: 1 }}
          >
            <CardContent
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={uploadIcon}
                alt="upload icon"
                style={{ width: "200px", height: "200px" }}
              />
              <Typography gutterBottom variant="h2" component="div">
                Drop or Click to Upload Image
              </Typography>
            </CardContent>
          </Card>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />

          <Stack direction="row" sx={{ mt: 2, mb: 1 }} spacing={2}>
            {images.map((image, index) => (
              <AvatarWithClose
                key={index}
                image={image}
                onRemove={() => handleRemoveImage(index)}
              />
            ))}
          </Stack>

          <button
            type="submit"
            style={{ display: "none" }} // hide the submit button
          >
            Submit
          </button>
        </Stack>
      </Paper>

      <Typography variant="h1">Properties</Typography>

      <Paper sx={{ p: 6 }}>
        <Stack
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Typography variant="h2" sx={{ mb: 1 }}>
            Tour Guides
          </Typography>
          <Autocomplete
            sx={{ mb: 1, mt: 2 }}
            multiple
            id="tour-guides"
            options={people}
            getOptionLabel={(person) => person.name}
            value={selectedGuides}
            onChange={(event, newValue) => {
              setSelectedGuides(newValue);
            }}
            renderTags={renderTags}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select tour guides" />
            )}
          />
          <Typography variant="h2" sx={{ mb: 1, mt: 2 }}>
            Destination
          </Typography>
          <Autocomplete
            sx={{ mb: 1, mt: 2 }}
            disablePortal
            id="combo-box-demo"
            options={place}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant="h2" sx={{ mb: 1, mt: 2 }}>
            Services
          </Typography>
          <Stack sx={{ height: 200 }} flexWrap="wrap">
            <FormControlLabel control={<Checkbox />} label="Audio guide" />
            <FormControlLabel control={<Checkbox />} label="Lunch" />{" "}
            <FormControlLabel
              control={<Checkbox />}
              label="Special Activities"
            />{" "}
            <FormControlLabel control={<Checkbox />} label="Gratiuities" />{" "}
            <FormControlLabel
              control={<Checkbox />}
              label="Professional guide"
            />{" "}
            <FormControlLabel control={<Checkbox />} label="Food and drinks" />{" "}
            <FormControlLabel control={<Checkbox />} label="Private tour" />{" "}
            <FormControlLabel control={<Checkbox />} label="Entrance fees" />{" "}
            <FormControlLabel
              control={<Checkbox />}
              label="Pick-up and drop off"
            />{" "}
            <FormControlLabel
              control={<Checkbox />}
              label="Transport by air-conditioned"
            />{" "}
          </Stack>
          <Typography variant="h2" sx={{ mb: 1, mt: 2 }}>
            Tags
          </Typography>
          <MultiValueTextField sx={{ mb: 1, mt: 2 }} />
        </Stack>
      </Paper>
      <Stack direction="row" justifyContent='space-between'>
        <FormControlLabel control={<Switch defaultChecked />} label="Publish" />
        <Button type="submit" color="secondary" variant="contained">
          {" "}
          Create Tour
        </Button>
      </Stack>
    </Stack>
  );
};

const AvatarWithClose = ({ image, onRemove }) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Avatar
        alt="Avatar"
        src={URL.createObjectURL(image)}
        variant="rounded"
        sx={{ width: 100, height: 100 }}
      />
      <Close
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "50%",
          cursor: "pointer",
          m: 0.8,
        }}
        onClick={onRemove}
      />
    </div>
  );
};

const EditTrip = () => {
  return <FormComponent />;
};

const place = ["delhi", "mumbai", "gorakhpur"]

const people = [
  { name: "John Doe", avatarUrl: "https://via.placeholder.com/150" },
  { name: "Jane Smith", avatarUrl: "https://via.placeholder.com/150" },
  // Add more people as needed...
];

export default EditTrip;
