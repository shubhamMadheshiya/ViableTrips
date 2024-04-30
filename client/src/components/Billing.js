import { Box, Divider, Icon, Stack, SvgIcon, Typography } from '@mui/material'
import React from 'react'
import Logo from '../img/vible_logo.svg'
import LogoName from "../img/vible_alfabet.svg";

const Billing = () => {
  return (
    <Stack spacing={2} border="1px solid gray" p={4} borderRadius={4}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box height="2em" component="img" src={Logo} />
          <Box height="2em" component="img" src={LogoName} />
        </Stack>

        
          <Typography variant="h3" textTransform="capitalize">
            Placed on : 2 jan, 2023 | CNR No : 25679946
          </Typography>
         
        
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h3" textTransform="capitalize">
            LODHI GARDEN TOUR OF DELHI
          </Typography>
          <Typography variant="h3" color="text.light">
            Hosted by VIJAY ANAND
          </Typography>
        </Stack>
        <Typography variant="h3" textTransform="capitalize">
          $225
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Total number of Ticket</Typography>

        <Typography variant="h3" textTransform="capitalize">
          5
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Sub Total</Typography>

        <Typography variant="h3" textTransform="capitalize">
          $4455
        </Typography>
      </Stack>

      <Stack
        color="primary.main"
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h3">Sub Total</Typography>

        <Typography variant="h3" textTransform="capitalize">
          $4455
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Tex (%5 GST)</Typography>

        <Typography variant="h3" textTransform="capitalize">
          $200
        </Typography>
      </Stack>

      <Divider />

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2">Total</Typography>

        <Typography variant="h2" textTransform="capitalize">
          $6800
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Billing
