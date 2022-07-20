import { actionsCart } from "../actions/Cart";

const ca = localStorage.getItem('cart');
const cart = JSON.parse(ca ? ca : "");

const initialState = {
    data: [],
    loading: true,
    count: cart ? cart.length : 0
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

const getCartItemsReducer = (state = initialState, action: any) => {
    switch(action.type){
        case actionsCart.GET_CART:
            return {...state, loading: true}
        case actionsCart.GET_CART_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case actionsCart.GET_CART_FAIL:
            return {...state, loading: false, data: action.payload}

        case 'ADD_COUNT_CART':
            return {...state, count: action.payload}
        case 'REMOVE_COUNT_CART':
            return {...state, count: action.payload}
        
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

const getOrderListsReducer = (state = initialState, action: any) => {
    switch(action.type){
        case actionsCart.GET_ORDERLIST:
            return {...state, loading: true}
        case actionsCart.GET_ORDERLIST_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case actionsCart.GET_ORDERLIST_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state            
    }
}

const getFilterOrdersReducer = (state = initialState, action: any) => {
    switch(action.type){
        case actionsCart.GET_FILTERORDER:
            return {...state, loading: true}
        case actionsCart.GET_FILTERORDER_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case actionsCart.GET_FILTERORDER_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state            
    }
}



export {addCartReducer, getCartItemsReducer, getOrdersReducer, getOrderListsReducer, getFilterOrdersReducer};