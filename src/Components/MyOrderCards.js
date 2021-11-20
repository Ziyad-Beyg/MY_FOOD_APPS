import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';

export default function ActionAreaCard({itemImage, restaurantName, itemName, orderPrice, orderStatus}) {
  return (
    <Card sx={{ width:'20%',minWidth:'200px', margin:"10px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={itemImage}
          alt="Orders"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {itemName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurantName}
            <br />
            {'Order Price : '}{orderPrice}
          </Typography>
          <br />
          <Button size="small" color="primary">
          {/* {'ORDER '} */}
          {orderStatus}
        </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}