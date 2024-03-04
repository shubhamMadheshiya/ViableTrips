import React from 'react'
import Card from '../components/card'
import { Stack } from '@mui/material';
import AliceCarousel from "react-alice-carousel";
import Sliders from './Sliders';


const topdestination = () => {

    const num = [1,2,3,4,5];


    



  return (

   <Sliders value={num}>
    <Card/>
   </Sliders>
    
  );
}

export default topdestination
