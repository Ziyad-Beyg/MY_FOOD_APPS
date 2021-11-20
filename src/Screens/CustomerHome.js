import React,{useState, useEffect, useContext} from 'react'
import CustomerButtonAppBar from '../Components/customerNavbar'
import { GlobalContext } from '../Context/ContextAPI'
import { query, doc,  onSnapshot, auth, onAuthStateChanged,  getDoc, db, collection, where } from "../Configs/firebase"
import MultiActionAreaCard from '../Components/RestaurantCard'



function CustomerHome() {
    const [datas, setData] = useState([])
    const [currentUserUID, setCurrentUserUID] = useState('')
    const [restaurantInfo, setRestaurantInfo] = useState([])
    const {state, dispatch} = useContext(GlobalContext)


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.uid, "USER")
                setCurrentUserUID(user.uid)

                fetchCurrrentUserInfo(user.uid)

                let q =  query(collection(db, "RestaurantsInfo"));
            onSnapshot(q, snapshot => (
            setRestaurantInfo(snapshot.docs.map( doc => doc.data()))
            ))
            }
            else {
                console.log("NO USER")
            }
        })

        // restaurantInfo()

    }, [])

    useEffect(() => {
        console.log(restaurantInfo)
    }, [restaurantInfo])

    const fetchCurrrentUserInfo = async (uid) => {
        let userRef = doc(db, 'CustomersInfo', uid);
        let userInfo = await getDoc(userRef);
        userInfo = userInfo.data();
        console.log(userInfo);
        dispatch({ type: "CURRENT_CUSTOMER", payload: userInfo });
        setData(userInfo)
    }

    return (
        <div>
            <CustomerButtonAppBar name={datas.username} dp={datas.userDP}/>
            
        
            <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
            <h1>
                ALL RESTAURANTS 
            </h1>
            <br/>
            <div style={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
            {
                restaurantInfo.map((restaurant, index) => (
                    <MultiActionAreaCard key={index} restaurantDP={restaurant.userDP} restaurantName={restaurant.restaurantName} restaurantCity={restaurant.city} restaurantCountry={restaurant.country} restaurantID={restaurant.restaurantID}/>  
                ))
            }
            </div>
            </div>
        </div>
    )
}

export default CustomerHome
