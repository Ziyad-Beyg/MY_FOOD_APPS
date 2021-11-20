export let data = {
    authUser: null,
    currentUser:null,
    currentCustomer:null,
    clickedRestaurantId:null,
    orderInfo: null,
    deliveryCharges: 150
}

export function reducer(state, action) {
    switch (action.type) {
        case "AUTH_USER": {
            return {
                ...state,
                authUser: action.payload
            }
        }

        // case "DROPDOWN_VALUE" : {
        //     let dropdownClone = state.dropdownValue.slice(0);
        //     dropdownClone.push(action.payload);
        //     console.log(action.payload, dropdownClone)
        //     return {
        //         ...state,
        //         dropdownValue: dropdownClone
        //     }
        // }

        case "CURRENT_USER": {
            console.log(action.payload)
            return {
                ...state,    
                currentUser: action.payload
            }
        }
        case "CURRENT_CUSTOMER": {
            console.log(action.payload)
            return {
                ...state,    
                currentCustomer: action.payload
            }
        }
        case "CLICKED_RESTAURANT_ID": {
            console.log(action.payload)
            return {
                ...state,    
                clickedRestaurantId: action.payload
            }
        }
        case "ORDER_INFO": {
            console.log(action.payload)
            return {
                ...state,    
                orderInfo: action.payload
            }
        }
        default:
            return state;

    }
}