import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import CustomerButtonAppBar from '../Components/customerNavbar'
import { GlobalContext } from '../Context/ContextAPI'
import { query, onSnapshot, db, collection } from "../Configs/firebase"
import ActionAreaCard from '../Components/MyOrderCards'


function MyOrders() {
    const History = useHistory()
    const { state, dispatch } = useContext(GlobalContext)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        
        let q =  query(collection(db, "Orders_Info"));
            onSnapshot(q, snapshot => (
            setOrders(snapshot.docs.map( doc => doc.data()))
            ))

    }, [])

    return (
        <div>
            {
                state.currentCustomer?.username != null ?
                    <CustomerButtonAppBar name={state.currentCustomer.username} dp={state.currentCustomer.userDP} /> :

                    History.push('/customerHome')

            }

            <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

                <h1>
                    MY ORDERS
                </h1>
                <br />

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {
                        orders.map((order, index) => (

                            order.CustomerName == state.currentCustomer.username && order.CustomerID == state.currentCustomer.userID ?
                            <ActionAreaCard key={index} restaurantName={order.RestaurantName} itemImage={order.ItemImage} itemName={order.ItemName} orderPrice={order.ItemPrice} orderStatus={order.OrderStatus} /> : null
                             
                            ))
                        }
                        
                </div>

            </div>
        </div>
    )
}

export default MyOrders
