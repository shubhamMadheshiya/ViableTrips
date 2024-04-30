import React from "react";
import TripCard from "../../components/TripCard";
import { Stack } from "@mui/material";

const TripsList = () => {
  // Assuming the data array represents some unique ids for each trip
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16];

  return (
    <Stack direction='row'  flexWrap='wrap' alignItems='center' rowGap={4} columnGap={4}>
      {data.map((id) => (
        <TripCard key={id} id={id} />
      ))}
    </Stack>
  );
};

export default TripsList;
