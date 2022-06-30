import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {getAFoodReducer, listFoodsReducer}  from './reducers/Food'
import { composeWithDevTools } from 'redux-devtools-extension'
import { listUsersReducer } from './reducers/User'

const reducer = combineReducers({
  foodList: listFoodsReducer,
  aFood: getAFoodReducer,
  userList: listUsersReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;