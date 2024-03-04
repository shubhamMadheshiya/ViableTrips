import React from 'react'
import '../components/Carousel.css'
import Slider from "react-slick";
import '../components/Carousel.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../components/card";

const Sliders = ({children,value}) => {

  const num =[1,2,3,4,5,6,7,8,9]


  

 

     var settings = {
       dots: true,
       infinite: false,
       speed: 500,
       slidesToShow: 4,
       slidesToScroll: 4,
       initialSlide: 0,
       responsive: [
         {
           breakpoint: 1024,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 2,
             infinite: true,
             dots: true,
           },
         },
         {
           breakpoint: 600,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 2,
             initialSlide: 2,
           },
         },
         {
           breakpoint: 480,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 2,
           },
         },
       ],
     };
     

  return (
    <div className="slider-container">
    
   
      <Slider {...settings}>
     {value.map(i=>{
      return children
     })}
        
      </Slider> 
    </div>
  );
}

export default Sliders
