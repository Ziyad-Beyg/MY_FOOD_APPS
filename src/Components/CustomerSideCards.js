import React,{useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GlobalContext } from '../Context/ContextAPI';
import { useHistory } from 'react-router';


export default function CustomerSideCard({itemImage, itemName, itemPrice, itemDeliveryType, itemsRestaurantId, restaurantName }) {

    const History = useHistory()
    const {state, dispatch} = useContext(GlobalContext)
    const makeOrder = async () => {
       await dispatch({type:"ORDER_INFO" , payload: {itemsRestaurantId, itemImage, itemName, itemPrice, itemDeliveryType, restaurantName}})
       History.push('/orderForm')
    }

    

  return (
    <Card sx={{ width:'20%',minWidth:'200px', margin:"10px" }}>
      <CardMedia
        component="img"
        height="200px"
        image={itemImage}
        alt="Food Items"
      />
      <CardContent sx={{padding: "20px !important"}}>
        <Typography sx={{fontWeight:700, fontSize:'30px', marginBottom:'20px'}} gutterBottom variant="h5" component="div">
           {itemName}
        </Typography>
        <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
        <h3 style={{fontWeight:700, margin: 0}}>
           Price: <span style={{fontWeight:1000}}>
           {itemPrice}
           </span>
        </h3>

        <h3 style={{fontWeight:700, margin: 0}}> 
            Delivery: 
            <span style={{fontWeight:1000}}>
           {itemDeliveryType}
           </span>
        </h3>
        </div>
        <br/>
        <Button onClick={makeOrder} sx={{fontWeight:500}}>Order Now</Button>
      </CardContent>
    </Card>
  );
}