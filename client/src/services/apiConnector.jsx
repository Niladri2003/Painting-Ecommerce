import axios from 'axios';
import {BASEAPI} from "../utils/BASE_API.js";

export const axiosInstance = axios.create({
    withCredentials: true, // Ensure cookies (e.g., refresh tokens) are sent
    baseURL:BASEAPI,
});
let isRefreshing = false;
// Function to refresh the access token
const refreshToken = async () => {
     const   refreshTokendata= localStorage.getItem('refreshToken')
    const token = localStorage.getItem("authToken");
    console.log('refresh token',refreshTokendata);
    if(refreshTokendata){
        try {
            const response = await axiosInstance.post('/renew-access-token',
                { refreshToken: refreshTokendata },
                { headers: { Authorization: `${token}` } }
            );

            const { access,refreshToken } = response.data.tokens;
            console.log(access)
            localStorage.setItem("authToken",access);
            localStorage.setItem("refreshToken", refreshToken);
            // Store the new access token
            // dispatch(setToken(access));
            // dispatch(setRefreshToken(refreshToken));
            return access;
        } catch (error) {
            console.error("Failed to refresh token", error);
            throw error;
        }
    }else {
        alert('no token found');
    }
};

// Response interceptor to handle 401 errors and retry the request
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('apiconnector',error);
        const originalRequest = error.config;
        console.log("status",error.response?.status)
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return Promise.reject(error);
            }

            isRefreshing = true;
            originalRequest._retry = true;


            try {
                console.log('try again')
                const newAccessToken = await refreshToken();
                console.log(newAccessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `${newAccessToken}`;
                originalRequest.headers['Authorization'] = `${newAccessToken}`;

                // Retry the original request with the new token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                // Handle the failure of token refresh, such as logging out the user
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
                // Optionally redirect to the login page
                window.location.href = '/signin';
                return Promise.reject(refreshError);
            }
        }
        console.log('outside')

        return Promise.reject(error);
    }
);

export const apiConnector = (method, url, bodyData, headers, params, useToken = true) => {
    // If `useToken` is true, add the Authorization header
    if (useToken) {
        const token = localStorage.getItem("authToken");
        console.log(token)
        if (token) {
            headers = {
                ...headers,
                Authorization: `${token}`,
            };
        }
    }

    return axiosInstance({
        method: method,
        url: url,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    });
};



// apiConnector('GET', '/protected-resource', null, null, null, true)
//     .then(response => console.log(response.data))
//     .catch(error => console.error(error));
//
// apiConnector('GET', '/public-resource', null, null, null, false)
//     .then(response => console.log(response.data))
//     .catch(error => console.error(error));
