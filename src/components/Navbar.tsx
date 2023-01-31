import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

export default function Navbar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Amazon / Flipkart Price Tracker
          </Typography>
          <Button color="inherit">Tracker List</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
