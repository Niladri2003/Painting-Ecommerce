import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        restoreCart: (state, action) => {
            console.log(action.payload)
            state.cart = action.payload.cart;
            state.total = action.payload.total;
            state.totalItems = action.payload.totalItems;
        },
        addToCart: (state, action) => {
            const product = action.payload;
            const index = state.cart.findIndex((item) => item.data.id === product.data.id);

            if (index >= 0) {
                return;
            }
            state.cart.push(product);
            state.totalItems += product.data.quantity;
            state.total += product.data.price * product.data.quantity;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            const index = state.cart.findIndex((item) => item.data.id === productId);

            if (index >= 0) {
                state.totalItems -= state.cart[index].data.quantity;
                state.total -= state.cart[index].data.price * state.cart[index].data.quantity;
                state.cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            }
        },
        resetCart: (state) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        },
    }
});

export const { addToCart, removeFromCart, resetCart, restoreCart } = cartSlice.actions;
export default cartSlice.reducer;
