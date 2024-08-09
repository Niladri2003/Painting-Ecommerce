const BASE_URL = import.meta.env.VITE_BASE_URL

export const endpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
} 

export const cartEndpoints = {
    CREATE_CART: BASE_URL + "/create-cart",
    ADD_ITEM: BASE_URL + "/add-item",
    GET_CART: BASE_URL + "/get-cart",
    REMOVE_ITEM: BASE_URL + "/remove-item/1144ac99-9024-449e-a293-6c0c2f4f74b3",
    UPDATE_ITEM: BASE_URL + "/update-item"
}