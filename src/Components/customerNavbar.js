import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {auth, signOut} from "../Configs/firebase"
import { Link, useHistory } from "react-router-dom"
import MenuPopupState from './Drawer';


export default function CustomerButtonAppBar({name, dp}) {

    // const[avatarImg, setAvatarImg] = useState("/broken-image.jpg")



    

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
      <AppBar sx={{backgroundColor:'orange'}} position="static">
        <Toolbar sx={{ textTransform:'capitalize'}}>
          <Typography variant="h6" component="div" sx={{ display:'flex', alignItems:'center', flexGrow: 1, color:"black", fontWeight:500 }}>
          <Avatar sx={{marginRight: 2}} src={dp} />
          <Link style={{textDecoration:'none', color:'black'}} to='/customerHome'>{name}</Link>
             
          </Typography>
      
              <MenuPopupState clickFunction={signOutFunction}/>

          {/* <Button sx={{color:'black'}} onClick = {signOutFunction} color="inherit">log out</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}