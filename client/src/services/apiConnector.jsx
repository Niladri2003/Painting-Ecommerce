import axios from 'axios';
import {useDispatch} from "react-redux";
import {setRefreshToken, setToken} from "../slices/authSlice.jsx";
import {BASEAPI} from "../utils/BASE_API.js";

export const axiosInstance = axios.create({
    withCredentials: true, // Ensure cookies (e.g., refresh tokens) are sent
    baseURL:BASEAPI,
});

// Function to refresh the access token
const refreshToken = async () => {
    const dispatch = useDispatch();
    try {
        const response = await axiosInstance.post('/renew-access-token', {
            refreshToken: localStorage.getItem('refreshToken'),
        });
        const { access,refreshToken } = response.data.tokens;

        // Store the new access token
        dispatch(setToken(access));
        dispatch(setRefreshToken(refreshToken));
        return access;
    } catch (error) {
        console.error("Failed to refresh token", error);
        throw error;
    }
};

// Response interceptor to handle 401 errors and retry the request
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshToken();
                axiosInstance.defaults.headers.common['Authorization'] = `${newAccessToken}`;
                originalRequest.headers['Authorization'] = `${newAccessToken}`;

                // Retry the original request with the new token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

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
