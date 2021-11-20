import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {auth, signOut} from "../Configs/firebase"
import { useHistory, Link } from "react-router-dom"

function RestaurantNav({restaurantName, city}) {

    const History = useHistory()
    let signOutFunction = () => {
signOut(auth).then(() => {
    History.push('/')
}).catch((error) => {

  console.log(error.message)
});
    } 

    return (
        <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{backgroundColor:'#202020'}} position="static">
        <Toolbar sx={{mx:'30px', textTransform:'capitalize'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/restaurantHome" style={{textDecoration:'none', color:'white'}}>{restaurantName}, {city}</Link>
          </Typography>
          <Button onClick = {signOutFunction} color="inherit">log out</Button>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default RestaurantNav
