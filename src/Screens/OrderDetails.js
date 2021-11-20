import React,{useState, useEffect, useContext} from 'react'
import SimpleAccordion from '../Components/OrderAccordion'
import RestaurantNav from '../Components/RestaurantNav'
import { GlobalContext } from '../Context/ContextAPI'
import './OrderDetails.css'
import { query, doc,  onSnapshot, getDocs, db, collection, where } from "../Configs/firebase"
import { useHistory } from 'react-router'



function OrderDetails() {

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
        <div >

<RestaurantNav restaurantName={state.currentUser?.restaurantName} city={state.currentUser?.city} />

        <div className='mainContainerDiv'>
            <h1 className="heading1">
                HELLO FORM ORDER DETAILS
            </h1>

        
            <SimpleAccordion className='accordion'/>


        </div>

        </div>
    )
}

export default OrderDetails
