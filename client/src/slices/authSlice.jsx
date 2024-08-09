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
        setLoading(state, value) {
            state.loading = value.payload;
        },

        setToken(state, value) {
            state.token = value.payload
            localStorage.setItem("authToken", action.payload);
        },
        logout(state) {
            state.token = null;
            localStorage.removeItem("authToken");
        }

    }
})

export const { setLoading, setToken,logout } = authSlice.actions;
export default authSlice.reducer;