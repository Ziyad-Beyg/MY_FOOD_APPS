import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { updateDoc, doc, collection, db, query, where  } from "../Configs/firebase"; 


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({customerDP, customerName, customerAddress, itemImage, itemName, restaurantName, orderBill, DeliveryType}) {

    const updatedVal = {
        "OrderStatus": "ACTIVE",
    }

    const statusUpdater = async () => {
        // console.log("hi")
        const PendingDocRef = doc(db, "Orders_Info");
        const q = query(PendingDocRef, where("CustomerName", "==", customerName), where("ItemName", "==", itemName), where("RestaurantName", "==", restaurantName));

        await updateDoc(q, updatedVal);
    }

    return (
    <Card sx={{ width:'25%',minWidth:'250px', margin:"10px" }}>
      <CardHeader
        avatar={
          <Avatar src={customerDP} sx={{ bgcolor: red[500] }} aria-label="recipe" />
        }
        
        title={customerName}
        subheader={customerAddress}
      />
      <CardMedia
        component="img"
        height="194"
        image={itemImage}
        alt="Pending Order"
      />
      <CardContent>
        <Typography variant="h5" color="text.danger">
          {itemName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {restaurantName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'Total : '}{orderBill}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'Delivery : '}{DeliveryType}
        </Typography>
      </CardContent>
      <Button onClick={statusUpdater} style={{margin:'10px'}}>
          ACCEPT
      </Button>
    </Card>
  );
}