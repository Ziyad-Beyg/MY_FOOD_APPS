import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router'
import MediaCard from '../Components/FoodCard'
import {GlobalContext} from "../Context/ContextAPI"
import { query, doc,  onSnapshot, getDocs, db, collection, where } from "../Configs/firebase"
import "./allDishes.css"
import RestaurantNav from '../Components/RestaurantNav'



function AllDishes() {
    const [foodDishes, setFoodDishes] = useState([])
    const [currentRestaurantUID, setCurrentRestaurantUID] = useState('')
    const {state, dispatch} = useContext(GlobalContext)
    const History = useHistory()

    useEffect(() =>  {

        if(state?.currentUser != null){
        console.log(state.currentUser)

            setCurrentRestaurantUID(state.currentUser.restaurantID)

            let q =  query(collection(db, "FOOD_DISHES"));
            onSnapshot(q, snapshot => (
            setFoodDishes(snapshot.docs.map( doc => doc.data()))
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
            <h1 className='heading1'>
                MY DISHES
            </h1>
            <div className="cardContainerDiv">
                {
                    foodDishes.map( (foodDish, index) => (
                        
                                
                                    foodDish.restaurantID == currentRestaurantUID ?  
                                    <MediaCard key={index} itemImage={foodDish.itemImg} itemName={foodDish.itemName} itemPrice={foodDish.itemPrice} itemDeliveryType={foodDish.itemDeliveryType} /> : null
                                
                        
                    ))
                }
                 
            </div>
            </div>
            
        </div>
    )
}

export default AllDishes
