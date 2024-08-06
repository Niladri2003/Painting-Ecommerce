
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BASEAPI} from "../utils/BASEAPI.js";

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    const response = await fetch(`${BASEAPI}/v1/user/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    console.log("Data",response)
    return await response.json();
});

export const signupUser = createAsyncThunk('auth/signupUser', async ({ Username, Password }) => {
    const response = await fetch(`${BASEAPI}/v1/user/register`, {
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
        refreshToken: null,
        username: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.username = null;
            state.refreshToken = null;
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
                console.log("Res",action.payload)
                state.status = 'succeeded';
                state.token = action.payload.tokens.access;
                state.refreshToken=action.payload.tokens.refreshToken;
                localStorage.setItem('token',JSON.stringify(action.payload.tokens.access));
                localStorage.setItem('refreshToken',JSON.stringify(action.payload.tokens.refreshToken));
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
