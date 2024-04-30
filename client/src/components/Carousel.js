import { Box, Stack } from '@mui/material';
import React from 'react'
import ExampleCarouselImage from "../img/Scenery.jpg";
import Slider from "react-slick";


const obj = [
  {
    url: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1666438254356-2f89807fbc49?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661963652315-d5a9d26637dd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1696590390391-a7607ad4a338?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];


const Carousel = () => {

  const settings = {
   nextArrow: null,
    prevArrow: null,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  return (
    // <Box
    //   height={400}
    //   borderRadius={5}
    //   component="img"
    //   src={ExampleCarouselImage}
    //   overflow="hidden"
    // ></Box>
    <div className="slider-container">
      <Slider {...settings}>
      {
        obj.map(i=>{
          return <Stack alignItems='center' justifyContent='center' borderRadius={4}  width='100%' height='28em' overflow='hidden'>
            <Box component='img' width='100%'  src={i.url} />
          </Stack>
        })
      }
   
      </Slider>
    </div>
  );
}

export default Carousel



