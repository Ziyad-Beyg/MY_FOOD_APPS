import React,{ useState, useContext, useEffect} from 'react'
import { useHistory } from 'react-router'
import CustomerButtonAppBar from '../Components/customerNavbar'
import { GlobalContext } from '../Context/ContextAPI'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { collection, db, addDoc } from "../Configs/firebase"; 



function OrderForm() {
    const History = useHistory()
    const [addressEmpty, setAddressEmpty] = useState('')
    const [address, setAddress] = useState('')
    const {state, dispatch} = useContext(GlobalContext)

    const makeOrder = () => {
        if(address != ''){
            console.log(address)

            if(state.orderInfo.itemDeliveryType === 'Paid'){
                let totalPrice = state.orderInfo.itemPrice 
                totalPrice =  parseInt(totalPrice) + 150

                const orderDetails = {
                    CustomerDp : state.currentCustomer.userDP,
                    CustomerName : state.currentCustomer.username,
                    CustomerID : state.currentCustomer.userID,
                    ItemName : state.orderInfo.itemName,
                    ItemImage: state.orderInfo.itemImage,
                    DeliveryType : state.orderInfo.itemDeliveryType,
                    RestaurantName : state.orderInfo.restaurantName,
                    RestaurantID : state.orderInfo.itemsRestaurantId,
                    ItemPrice : totalPrice,
                    CustomersAddress : address,
                    OrderStatus : "PENDING"
                };  

                uploadOrderInfo(orderDetails)

            }
            else{

                const orderDetails = {
                        CustomerDp : state.currentCustomer.userDP,
                        CustomerName : state.currentCustomer.username,
                        CustomerID : state.currentCustomer.userID,
                        ItemName : state.orderInfo.itemName,
                        ItemImage: state.orderInfo.itemImage,
                        DeliveryType : state.orderInfo.itemDeliveryType,
                        RestaurantName : state.orderInfo.restaurantName,
                        RestaurantID : state.orderInfo.itemsRestaurantId,
                        ItemPrice : state.orderInfo.itemPrice,
                        CustomersAddress : address,
                        OrderStatus : "PENDING"
                    }; 

                    uploadOrderInfo(orderDetails)

            }

            // const orderDetails = {
            //     CustomerDp : state.currentCustomer.userDP,
            //     CustomerName : state.currentCustomer.username,
            //     CustomerID : state.currentCustomer.userID,
            //     ItemName : state.orderInfo.itemName,
            //     ItemImage: state.orderInfo.itemImage,
            //     DeliveryType : state.orderInfo.itemDeliveryType,
            //     RestaurantName : state.orderInfo.restaurantName,
            //     RestaurantID : state.orderInfo.itemsRestaurantId,
            //     ItemPrice : function (){
            //         if(this.DeliveryType == 'Paid'){
            //             let totalPrice = state.orderInfo.itemPrice 
            //             return parseInt(totalPrice) + 200
            //         }
            //         else{
            //             return state.orderInfo.itemPrice
            //         }
            //     },
            //     CustomersAddress : address,
            //     OrderStatus : "PENDING"
            // };  
            
            // console.log(orderDetails)

            // uploadOrderInfo(orderDetails)

        }
        else{
            setTimeout(()=>{
                setAddressEmpty('Address Can Not Be Empty!!!') 
            }, 1)
            setTimeout(()=>{
                setAddressEmpty('')
            },3000)
        }
    }

    const uploadOrderInfo = async (OrderObj) =>{
        console.log(OrderObj)

        const docRef = await addDoc(collection(db, "Orders_Info"), OrderObj);

        History.push('/customerHome')

    }

    useEffect(() => {
        if(state.orderInfo == null){
            History.push('/customerHome')
        }
      }, [])

    return (
        <div>
            {
                state.currentCustomer?.username != null ?  
            <CustomerButtonAppBar name={state.currentCustomer.username} dp={state.currentCustomer.userDP}/> : 
            
            History.push('/customerHome')

            }
            <div style={{width:'100%', display:'flex', alignItems:'center', flexDirection:'column'}}>
            <h1>
                ORDER SUMMARY
            </h1>
            {
                    state.orderInfo != null ?

                <div style={{width:'100%', display:'flex', alignItems:'center', flexDirection:'column'}}>
                    <Paper sx={{width:"40%", padding:'30px', display:'flex', alignItems:'center', flexDirection:'column'}} elevation={3} >

                
            
                    <TextField sx={{width:'80%', margin:'10px'}} id="outlined-read-only-input" label="Item Name" defaultValue={state.orderInfo.itemName} variant="standard" InputProps={{readOnly: true,}}/>
                    <TextField sx={{width:'80%', margin:'10px'}} id="outlined-read-only-input" label="Restaurant Name" defaultValue={state.orderInfo.restaurantName} variant="standard" InputProps={{readOnly: true,}}/>
                    <TextField sx={{width:'80%', margin:'10px'}} id="outlined-read-only-input" label="Item Price" defaultValue={state.orderInfo.itemPrice} variant="standard" InputProps={{readOnly: true,}}/>
                    <TextField sx={{width:'80%', margin:'10px'}} id="outlined-read-only-input" label="Delivery Of Item" defaultValue={state.orderInfo.itemDeliveryType} variant="standard" InputProps={{readOnly: true,}}/>
                    
                    

                    {
                        state.orderInfo.itemDeliveryType == "Paid" ? 
                    <TextField sx={{width:'80%', margin:'10px'}} id="outlined-read-only-input" label="Delivery Charges" value={state.deliveryCharges} variant="standard" InputProps={{readOnly: true,}}/> : null
                    }

                    <TextField sx={{width:'80%', margin:'10px'}} value={address} onChange={(e) => {setAddress(e.target.value)}} id="outlined-read-only-input" label="Address" required  variant="standard" />
                    <p style={{color:"red",margin:0, fontFamily:'Arial' }}>
                        {addressEmpty}
                    </p>
                    <Button onClick={makeOrder} sx={{fontWeight:500}}>Order Now</Button>

                    </Paper>
                </div>
                : History.push('/customerHome')
            }

            </div>
            
        </div>
    )
}

export default OrderForm
