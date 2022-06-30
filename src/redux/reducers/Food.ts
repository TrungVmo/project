import { actionsFood } from "../actions/Food";

const initialState: object = {
    data: [],
    loading: true
}
const initialStateAdd: object = {
    data: {}
}
const listFoodsReducer = (state = initialState, action: any) => {
    switch(action.type){
        case actionsFood.GET_FOOD:
            return {...state, loading: true}
        case actionsFood.GET_FOOD_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case actionsFood.GET_FOOD_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state            
    }
}

const getAFoodReducer = (state = initialState, action: any) => {
    switch(action.type){
        case actionsFood.GET_AFOOD:
            return {...state, loading: true}
        case actionsFood.GET_AFOOD_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case actionsFood.GET_AFOOD_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state            
    }
}

const addFoodsReducer = (state = initialStateAdd, action: any) => {
    switch(action.type){
        case actionsFood.ADD_FOOD:
            return {...state, loading: true}
        case actionsFood.ADD_FOOD_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case actionsFood.ADD_FOOD_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state            
    }
}

const updateFoodsReducer = (state = initialStateAdd, action: any) => {
    switch(action.type){
        case actionsFood.UPDATE_FOOD:
            return {...state, loading: true}
        case actionsFood.UPDATE_FOOD_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case actionsFood.UPDATE_FOOD_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state            
    }
}

const removeFoodsReducer = (state = initialStateAdd, action: any) => {
    switch(action.type){
        case actionsFood.REMOVE_FOOD:
            return {...state, loading: true}
        case actionsFood.REMOVE_FOOD_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case actionsFood.REMOVE_FOOD_FAIL:
            return {...state, loading: false, data: action.payload}
        default:
            return state            
    }
}

export {listFoodsReducer, addFoodsReducer, updateFoodsReducer, removeFoodsReducer, getAFoodReducer};