import React,{useState, useContext, useEffect} from 'react'
import { useHistory } from 'react-router'
import CustomerButtonAppBar from '../Components/customerNavbar'
import { GlobalContext } from '../Context/ContextAPI'
import { collection, db,onSnapshot,  query } from "../Configs/firebase";
import CustomerSideCard from '../Components/CustomerSideCards'


function AllDishesCustomer() {
    const [clickedRestaurantId, setClickedRestaurantId] = useState('')
    const [clickedRestaurantName, setClickedRestaurantName] = useState('')
    const [selectedRestaurantDishes, setSelectedRestaurantDishes] = useState([])
    const {state, dispatch} = useContext(GlobalContext)
    const History = useHistory()

    console.log(state.clickedRestaurantId)

    useEffect(async () =>  {

        if(state.clickedRestaurantId != null){
        console.log("hello", state.clickedRestaurantId)

        setClickedRestaurantId(state.clickedRestaurantId.restaurantID)
        setClickedRestaurantName(state.clickedRestaurantId.restaurantName)
            let q =  query(collection(db, "FOOD_DISHES"));
            onSnapshot(q, snapshot => (
                setSelectedRestaurantDishes(snapshot.docs.map( doc => doc.data()))
            ))
        }

        else{
            History.push("/customerHome")
        }
            
    }, [])


    return (
        <div>
            {
                state.currentCustomer?.username != null ?  
            <CustomerButtonAppBar name={state.currentCustomer.username} dp={state.currentCustomer.userDP}/> : 
            
            History.push('/customerHome')

            }
            

            <div style={{width: '100%', display: 'flex', alignItems: 'center', flexDirection:'column'}}>

            <h1>
                {clickedRestaurantName}{' DISHES'}
            </h1>
            <br />

                <div style={{width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                {
                    selectedRestaurantDishes.map( (foodDish, index) => (
                        
                                
                                    foodDish.restaurantID == clickedRestaurantId ?  
                                    <CustomerSideCard key={index} restaurantName={foodDish.restaurantName} itemImage={foodDish.itemImg} itemName={foodDish.itemName} itemPrice={foodDish.itemPrice} itemDeliveryType={foodDish.itemDeliveryType} itemsRestaurantId = {foodDish.restaurantID} /> : null
                                
                        
                    ))
                }
                </div>
                
            </div>
            
        </div>
    )
}

export default AllDishesCustomer
