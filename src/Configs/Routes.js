import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import RestaurantHome from "../Screens/RestaurantHome";
import CustomerSignUp from "../Screens/CustomerSignUp";
import SignIn from "../Screens/SignIn";
import SignUp from "../Screens/SignUp";
import AllDishes from "../Screens/AllDishes";
import AddDishes from "../Screens/AddDishes";
import OrderDetails from "../Screens/OrderDetails";
import CustomerHome from "../Screens/CustomerHome";
import CustomerSignIn from "../Screens/CustomerSignIn";
import AllDishesCustomer from "../Screens/AllDishesCustomer";
import OrderForm from "../Screens/OrderForm";
import MyOrders from "../Screens/MyOrders";



export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                <Route exact path="/">
                        <SignUp/>
                    </Route>
                    <Route path="/customerSignUp">
                        <CustomerSignUp/>
                    </Route>
                    <Route path="/signIn">
                        <SignIn/>
                    </Route>
                    <Route path="/restaurantHome">
                        <RestaurantHome/>
                    </Route>
                    <Route path="/alldishes">
                        <AllDishes/>
                    </Route>
                    <Route path="/adddishes">
                        <AddDishes/>
                    </Route>
                    <Route path="/orderdetails">
                        <OrderDetails/>
                    </Route>
                    <Route path="/customerHome">
                        <CustomerHome/>
                    </Route>
                    <Route path="/customerSignin">
                        <CustomerSignIn/>
                    </Route>
                    <Route path="/allDishesForCustomer">
                        <AllDishesCustomer/>
                    </Route>
                    <Route path="/orderForm">
                        <OrderForm/>
                    </Route>
                    <Route path="/myOrders">
                        <MyOrders/>
                    </Route>
                    

                </Switch>
            </div>
        </Router>
    );
}
