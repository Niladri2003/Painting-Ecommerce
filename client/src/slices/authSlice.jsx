import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: false,
    //token: localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")).token:null,
    token: localStorage.getItem("authToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
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
        setRefreshToken(state, action) {
            state.refreshToken = action.payload;
            localStorage.setItem("refreshToken", action.payload);
        },
        logout(state) {
            state.token = null;
            state.cartId = null;
            localStorage.removeItem("authToken");
            localStorage.removeItem("cart_id"); 
            localStorage.removeItem("totalItems"); 
            localStorage.removeItem("user"); 
        }

    }
})

export const { setLoading, setToken,setRefreshToken,logout } = authSlice.actions;
export default authSlice.reducer;