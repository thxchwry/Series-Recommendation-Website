import React from 'react'
import {Container,Grid,TextField,Breadcrumbs,Link,Typography,InputAdornment} from'@mui/material';
import NavBar from '@/components/Navbar';

export default function page() {
  return (
    <div>
       <NavBar/>
        <center>
    <img className = "imgCard" src="8.jpg"  
    style={{ maxWidth: "100%", height: "auto", objectFit: 'cover' }}/>
    </center><br></br>
    <Breadcrumbs>
            <Link color="inherit" href="http://localhost:3000">Home</Link>
            <Typography color="textPrimary">Contact</Typography>
        </Breadcrumbs>
    </div>
  )
}