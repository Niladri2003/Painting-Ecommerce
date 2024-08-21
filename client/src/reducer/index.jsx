import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";

const rootReducer = combineReducers({
  [cartReducer.name]: cartReducer,
  [authReducer.name]: authReducer,
  [profileReducer.name]: profileReducer,
});
export default rootReducer;
