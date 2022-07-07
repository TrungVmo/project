import { actionsCart } from "../actions/Cart";

const initialState: object = {
    data: [],
    loading: true
}

const addCartReducer = (state = initialState, action: any) => {
    switch(action.type){
        case actionsCart.ADD_CART:
            return {...state, loading: true}
        case actionsCart.ADD_CART_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case actionsCart.ADD_CART_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state            
    }
}

const getOrdersReducer = (state = initialState, action: any) => {
    switch(action.type){
        case actionsCart.GET_ORDER:
            return {...state, loading: true}
        case actionsCart.GET_ORDER_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case actionsCart.GET_ORDER_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state            
    }
}

export {addCartReducer, getOrdersReducer};