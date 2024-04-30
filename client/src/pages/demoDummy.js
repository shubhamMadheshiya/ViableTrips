import { Avatar, Badge, styled } from '@mui/material';
import React from 'react'

const demoDummy = () => {
    const SmallAvatar = styled(Avatar)(({ theme }) => ({
      width: 22,
      height: 22,
      border: `2px solid ${theme.palette.background.paper}`,
    }));
  return (
    <div>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        }
      >
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      </Badge>
    </div>
  );
}

export default demoDummy
