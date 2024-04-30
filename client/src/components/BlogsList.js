import React from 'react'
import BlogCard from './BlogCard';
import { Stack } from '@mui/material';
import Sliders from './Sliders';
import axios from 'axios';

const BlogsList = () => {



  // var config = {
  //   method: "get",
  //   url: "https://api.countrystatecity.in/v1/countries/IN/cities",
  //   headers: {
  //     "X-CSCAPI-KEY":
  //       "ejl1eFk3UURESmJiTWJLR3p6ckw4YTczNVoyREozUHhJeENieW9RWQ==",
  //   },
  // };

  // axios(config)
  //   .then(function (response) {
  //     // console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });


//   const options = {
//   method: 'GET',
//   url: 'https://andruxnet-world-cities-v1.p.rapidapi.com/',
//   params: {
//     query: 'paris',
//     searchby: 'city'
//   },
//   headers: {
//     'X-RapidAPI-Key': '0d81883615msh003eb8855093ed4p1e1380jsnd82ad2ffa6ba',
//     'X-RapidAPI-Host': 'andruxnet-world-cities-v1.p.rapidapi.com'
//   }
// };

// const api = async () =>{
//   try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }

// }

// api()



      const num = [1, 2, 3, 4, 5];
      return (
        <Sliders value={num}>
          <BlogCard/>
        </Sliders>
      );
}

export default BlogsList
