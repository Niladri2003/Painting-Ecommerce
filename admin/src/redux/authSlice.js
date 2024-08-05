
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BASEAPI} from "../utils/BASEAPI.js";

export const loginUser = createAsyncThunk('auth/loginUser', async ({ Username, Password }) => {
    const response = await fetch(`${BASEAPI}/v2/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username, Password }),
    });
    console.log("Data",response)
    return await response.json();
});

export const signupUser = createAsyncThunk('auth/signupUser', async ({ Username, Password }) => {
    const response = await fetch(`${BASEAPI}/v2/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username, Password }),
    });

    return await response.json(); // Return response data if needed
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        username: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.username = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('userDetails');


        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("Res",action.payload.user)
                state.status = 'succeeded';
                state.token = action.payload;
                state.username = action.payload.user.Username;
                localStorage.setItem('token',JSON.stringify(action.payload.token));
                localStorage.setItem('user',JSON.stringify(action.payload.user.ID));
                localStorage.setItem('userDetails',JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(signupUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
