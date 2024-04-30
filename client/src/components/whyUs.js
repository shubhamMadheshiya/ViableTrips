import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Img from '../img/insurance.svg'
import Card from './whyusCard'
import Slider from "react-slick";

const whyUs = () => {
  const num =[1,2,3,4]

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  return (
    <>
      <div
        className="slider-container"
        sx={{ backgroundColor: { xs: "red", md: "green", lg: "blue" } }}
      >
        <Stack direction="row" spacing={4}>
          {num.map((i) => {
            return <Card />;
          })}
        </Stack>

        {/* <Stack direction="row" spacing={4}>
        {num.map((i) => {
          return <Card />;
        })}
      </Stack> */}
      </div>
    </>
  );
}

export default whyUs
