import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {useHistory} from "react-router"
 
export default function MenuPopupState({clickFunction}) {
    const History = useHistory()
    const myOrders = () => {
        History.push('/myOrders')
    }   

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button sx={{color:'black'}} {...bindTrigger(popupState)}>
            <ExpandMoreRoundedIcon />
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={myOrders}>My Orders</MenuItem>
            {/* <MenuItem onClick={popupState.close}>My account</MenuItem> */}
            <MenuItem onClick={clickFunction}>Log Out</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}