import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import avatar from "../../assets/avatar.png";

const NavBar: React.FC = () => {
  return (
    <AppBar elevation={0} position="relative">
      <Toolbar>
        <Box mr={1}>
          <Avatar src={avatar} />
        </Box>
        <Typography variant="h5">Poke-memory</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
