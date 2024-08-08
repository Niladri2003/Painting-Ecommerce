import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';


const rootReducer = combineReducers({
    cart: cartReducer,
});
export default rootReducer;