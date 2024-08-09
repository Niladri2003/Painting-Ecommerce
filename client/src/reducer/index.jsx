import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    profile: profileReducer,

});
export default rootReducer;