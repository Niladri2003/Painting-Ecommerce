import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import favouriteReducer from "../slices/favouriteSlice.jsx";

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    profile: profileReducer,
    favourite: favouriteReducer,

});
export default rootReducer;