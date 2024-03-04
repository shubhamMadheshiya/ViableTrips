import { Button, MenuItem, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate , Navigate } from "react-router-dom";




const api =
  "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json";

const cities_data = async () => {
    try {
        const response = await axios.get(api);
        const countries = response.data;

        // Find India in the list of countries
        const india = countries.find((country) => country.name === "India");
         if (india) {
            // Extract cities of India
            const cities = india.states.reduce((acc, state) => {
                acc.push(...state.cities);
                return acc;
            }, []);

            return cities
        } else {
            console.log("India not found")
        }
        
    } catch (error) {
        console.log(error)
        
    }
  
};





const Contact = () => {
  const navigate = useNavigate();

  

    const [cities, setCities] = useState(['']);
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);




    

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

   


    cities_data().then(data=>{
        setCities(data)

    }).catch(e=>{
        console.log(e)
    })

  return (
    <Stack component="form" spacing={4} alignItems="center">
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Mobile Number"
        variant="outlined"
        fullWidth
      />
      <TextField
        select
        label="Select"
        defaultValue="City"
        helperText="Please select your city"
        fullWidth
      >
        {cities.slice(0, 5).map((option) => (
          <MenuItem value={option.name}>{option.name}</MenuItem>
        ))}
      </TextField>
      <Button
        sx={{ color: "white", width: "fit-content" }}
        variant="contained"
        onClick={()=>navigate('step_2')}
      >
        Save & Continue
      </Button>
    
      {/* joinUs/step_3 */}
    </Stack>
  );
}

export default Contact
