
import { Autocomplete, Avatar, Badge, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, styled } from '@mui/material'
import React, { useState } from 'react'
import Camera from '../../img/join/camera.svg'
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import AdapterDateFnsLocalizationProvider from "@mui/lab/AdapterDateFns";
// import DatePicker from "@mui/lab/DatePicker";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useNavigate } from 'react-router-dom'



const languages = [
  "English",
  "Mandarin Chinese",
  "Hindi",
  "Spanish",
  "French",
  "Standard Arabic",
  "Bengali",
  "Russian",
  "Portuguese",
  "Urdu",
  "Indonesian",
  "German",
  "Japanese",
  "Swahili",
  "Marathi",
  "Telugu",
  "Turkish",
  "Korean",
  "Tamil",
  "Vietnamese",
  "Italian",
  "Yue Chinese",
  "Thai",
  "Gujarati",
  "Jin Chinese",
  "Southern Min",
  "Persian",
  "Polish",
  "Pashto",
  "Kannada",
  "Xiang Chinese",
  "Malayalam",
  "Sundanese",
  "Hausa",
  "Odia",
  "Burmese",
  "Hakka Chinese",
  "Ukrainian",
  "Bhojpuri",
  "Tagalog",
  "Yoruba",
  "Maithili",
  "Uzbek",
  "Sindhi",
  "Amharic",
  "Fula",
  "Romanian",
  "Oromo",
  "Igbo",
  "Azerbaijani",
  "Awadhi",
  "Gan Chinese",
  "Cebuano",
  "Dutch",
  "Kurdish",
  "Serbo-Croatian",
  "Malagasy",
  "Saraiki",
  "Nepali",
  "Sinhala",
  "Chittagonian",
  "Zhuang",
  "Khmer",
  "Turkmen",
  "Assamese",
  "Madurese",
  "Somali",
  "Marwari",
  "Magahi",
  "Haryanvi",
  "Hungarian",
  "Chhattisgarhi",
  "Greek",
  "Chewa",
  "Deccan",
  "Akan",
  "Kazakh",
  "Northern Min",
  "Sylheti",
  "Zulu",
  "Czech",
  "Kinyarwanda",
  "Dhundhari",
  "Haitian Creole",
  "Eastern Min",
  "Ilocano",
  "Quechua",
  "Kirundi",
  "Swedish",
  "Hmong",
  "Shona",
  "Uyghur",
  "Hiligaynon",
  "Mossi",
  "Xhosa",
  "Belarusian",
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


const PersonalDetail = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //gender
  const [gender, setGender] = useState("");
   const [smoking, setSmoking] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  //smokeing
  const [smokeing, setSmokeing] = useState("");

  const handleChangesm = (event) => {
    setSmoking(event.target.value);
  };

  return (
    <Stack alignItems="center" spacing={4}>
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        sx={{ borderRadius: "1000rem" }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Avatar sx={{ width: "1.5em", height: "1.5em" }} src={Camera} />
          }
        >
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            sx={{ width: 80, height: 80 }}
          />
        </Badge>

        <VisuallyHiddenInput type="file" />
      </Button>

      <Autocomplete
        fullWidth
        multiple
        id="tags-outlined"
        options={languages}
        getOptionLabel={(option) => option}
        defaultValue={[languages[13]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} label="Language" placeholder="Favorites" />
        )}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          fullWidth
          label="Date picker"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <FormControl fullWidth>
        <InputLabel id="gender-label">Gender</InputLabel>

        <Select
          labelId="gender-label"
          id="gender"
          value={gender}
          onChange={handleChange}
          fullWidth
          label="Gender"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Problem with Smoking</InputLabel>

        <Select
          labelId="Smoking-label"
          id="Smoking"
          value={smoking}
          onChange={handleChangesm}
          fullWidth
          label="Problem with Smoking"
        >
          <MenuItem value="male">Yes</MenuItem>
          <MenuItem value="female">No</MenuItem>
        </Select>
      </FormControl>

      <Stack direction="row" spacing={4}>
        <Button variant="text" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button
          sx={{ color: "white" }}
          variant="contained"
          onClick={() => navigate("/step_3", { replace: true })}
        >
          Save & Continue
        </Button>
      </Stack>
    </Stack>
  );
}

export default PersonalDetail
