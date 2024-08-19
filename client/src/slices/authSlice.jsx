import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: false,
    //token: localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")).token:null,
    token: localStorage.getItem("authToken") || null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },

        setToken(state, action) {
            state.token = action.payload
            localStorage.setItem("authToken", action.payload);
        },

        logout(state) {
            state.token = null;
            state.cartId = null;
            localStorage.removeItem("authToken");
            localStorage.removeItem("cart_id"); 
        }

    }
})

export const { setLoading, setToken,logout } = authSlice.actions;
export default authSlice.reducer;