import React,{useState, useEffect, useContext} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import RecipeReviewCard from "./AccordianCards"
import { query, doc,  onSnapshot, getDocs, db, collection, where } from "../Configs/firebase"
import { useHistory } from 'react-router'
import { GlobalContext } from '../Context/ContextAPI'


export default function SimpleAccordion() {

    const [orderdetails, setOrderdetails] = useState([])
    const {state, dispatch} = useContext(GlobalContext)
    const History = useHistory()

    useEffect(() =>  {

        if(state?.currentUser != null){


            let q =  query(collection(db, "Orders_Info"));
            onSnapshot(q, snapshot => (
            setOrderdetails(snapshot.docs.map( doc => doc.data()))
            ))

        }

        else{
            History.push("/restaurantHome")
        }
            
    }, [])

  return (
    <div className="accordionParent">
      <Accordion elevation={4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>PENDING ORDERS</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={{ display:'flex', justifyContent:'center', flexWrap:'wrap'}}>

           {
                orderdetails.map((orders, index) => (
                    orders.OrderStatus == "PENDING" && orders.RestaurantID == state.currentUser.restaurantID ?
                    <RecipeReviewCard key={index} customerDP={orders.CustomerDp} customerName={orders.CustomerName} customerAddress={orders.CustomersAddress} itemImage={orders.ItemImage} itemName={orders.ItemName} restaurantName={orders.RestaurantName} orderBill={orders.ItemPrice} DeliveryType={orders.DeliveryType}  /> : null
                    ))
            }
                
                

        </AccordionDetails>
      </Accordion>
      
      <br />

      <Accordion elevation={4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>ACTIVE ORDERS</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={{ display:'flex', justifyContent:'center', flexWrap:'wrap'}}>

           {
                orderdetails.map((orders, index) => (
                    orders.OrderStatus == "ACTIVE" && orders.RestaurantID == state.currentUser.restaurantID ?
                    <RecipeReviewCard key={index} customerDP={orders.CustomerDp} customerName={orders.CustomerName} customerAddress={orders.CustomersAddress} itemImage={orders.ItemImage} itemName={orders.ItemName} restaurantName={orders.RestaurantName} orderBill={orders.ItemPrice} DeliveryType={orders.DeliveryType}  /> : null
                    ))
            }
                
                

        </AccordionDetails>
      </Accordion>

      <br />

      <Accordion elevation={4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>DELIVERED ORDERS</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={{ display:'flex', justifyContent:'center', flexWrap:'wrap'}}>

           {
                orderdetails.map((orders, index) => (
                    orders.OrderStatus == "DELIVERED" && orders.RestaurantID == state.currentUser.restaurantID ?
                    <RecipeReviewCard key={index} customerDP={orders.CustomerDp} customerName={orders.CustomerName} customerAddress={orders.CustomersAddress} itemImage={orders.ItemImage} itemName={orders.ItemName} restaurantName={orders.RestaurantName} orderBill={orders.ItemPrice} DeliveryType={orders.DeliveryType}  /> : null
                    ))
            }
                
                

        </AccordionDetails>
      </Accordion>
     
    </div>
  );
}