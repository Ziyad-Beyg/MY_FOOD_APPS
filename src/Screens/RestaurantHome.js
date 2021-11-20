import React, { useState, useEffect, useContext } from 'react'
import ButtonAppBar from '../Components/Navbar';
import BoxSx from '../Components/Container';
import "./RestaurantHome.css"
// import FoodBankRoundedIcon from '@mui/icons-material/FoodBankRounded';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import { db, onSnapshot, where, query, auth, onAuthStateChanged, collection, doc, getDoc } from "../Configs/firebase";
import { GlobalContext } from '../Context/ContextAPI';
import {Link} from "react-router-dom"

function RestaurantHome() {
    const [datas, setData] = useState([])
    const [currentUserUID, setCurrentUserUID] = useState('')

    const { state, dispatch } = useContext(GlobalContext)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.uid, "USER")
                setCurrentUserUID(user.uid)

                fetchCurrrentUserInfo(user.uid)
            }
            else {
                console.log("NO USER")
            }
        })

        // restaurantInfo()

    }, [])

    // useEffect(() => {

    //         console.log(datas)

    //     //     const q = query(collection(db, "RestaurantsInfo"), where("restaurantID", "==", currentUserUID));
    //     // onSnapshot(q, (snapshot)=>
    //     //     setData(snapshot.docs.map((doc)=>({...doc.data(),id: doc.id})))

    //     // )

    // }, [])

    const fetchCurrrentUserInfo = async (uid) => {
        let userRef = doc(db, 'RestaurantsInfo', uid);
        let userInfo = await getDoc(userRef);
        userInfo = userInfo.data();
        console.log(userInfo);
        dispatch({ type: "CURRENT_USER", payload: userInfo });
        setData(userInfo)
    }

    // const restaurantInfo = () => {
    //     console.log("HELLO KAMINAU")
    //     const q = query(collection(db, "RestaurantsInfo"), where("restaurantID", "==", currentUserUID));
    //     onSnapshot(q, (snapshot)=>
    //     setData(snapshot.docs.map((doc)=>({...doc.data(),id: doc.id})))
    //     )
    // }

    // }

    // onAuthStateChanged(auth, (user) => {
    //     setCurrentUserUID(user.uid)

    // })

    // const q = query(collection(db, "RestaurantsInfo"), where("restaurantID", "==", currentUserUID));
    //     onSnapshot(q, (snapshot)=>
    //     setData(snapshot.docs.map((doc)=>({...doc.data(),id: doc.id})))
    //     )

    return (
        <div>
            {/* {datas.map((data, index) => (
                <div key={index}>
                    <ButtonAppBar restaurantName={data.restaurantName} city={data.city} restaurantDP={data.userDP}/>
                </div>
                 ))}  */}

            <ButtonAppBar restaurantName={datas.restaurantName} city={datas.city} restaurantDP={datas.userDP} />


            <div className="boxDiv">
                <Link className="screensLink" to='/alldishes'>
                <BoxSx Img={FastfoodIcon} boxValue="ALL DISHES" />
                </Link>
                <Link className="screensLink" to='/adddishes'>
                <BoxSx restaurantInfo={datas} Img={AddRoundedIcon} boxValue="ADD DISH" />
                </Link>
                <Link className="screensLink" to='/orderdetails'>
                <BoxSx Img={FormatListBulletedRoundedIcon} boxValue="ORDER DETAILS" />
                </Link>
            </div>


        </div>
    )
}


export default RestaurantHome
