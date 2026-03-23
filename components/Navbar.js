import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif' }}>
            IN3VERT
          </Typography>
          <a href='/contact' style={{color:"inherit",textDecoration: 'none', paddingLeft: '10px', 
     fontFamily: 'Roboto, sans-serif'}}>CONTACT</a>
      <p style={{color:"inherit",textDecoration: 'none', paddingLeft: '10px', 
     fontFamily: 'Roboto, sans-serif'}}>/</p>
      <a href='/login' style={{color:"inherit",textDecoration: 'none', paddingLeft: '10px', 
     fontFamily: 'Roboto, sans-serif'}}>LOG IN</a>
     <p style={{color:"inherit",textDecoration: 'none', paddingLeft: '10px', 
     fontFamily: 'Roboto, sans-serif'}}>/</p>
      <a href='/register' style={{color:"inherit",textDecoration: 'none', paddingLeft: '10px', 
     fontFamily: 'Roboto, sans-serif'}}>SIGN UP</a>

     
        </Toolbar>
      </AppBar>
    </Box>
  );
}