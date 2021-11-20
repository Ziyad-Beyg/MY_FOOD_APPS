import React,{useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { GlobalContext } from '../Context/ContextAPI';
import { useHistory } from 'react-router';



export default function MultiActionAreaCard({restaurantDP, restaurantName, restaurantCity, restaurantCountry, restaurantID }) {

    const {state, dispatch} = useContext(GlobalContext)
    const History = useHistory()

    const showAllDishes = async () => {
       await dispatch({type:"CLICKED_RESTAURANT_ID" , payload: {restaurantName, restaurantID}})

       History.push("/allDishesForCustomer")
    }

  return (
    <Card sx={{ width:'20%',minWidth:'200px', margin:"10px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={restaurantDP}
          alt="restaurant"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {restaurantName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurantCity}{", "}{restaurantCountry}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={showAllDishes} size="small" color="primary">
          All Dishes
        </Button>
      </CardActions>
    </Card>
  );
}