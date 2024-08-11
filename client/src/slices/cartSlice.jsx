import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartId: null,
    cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    total: localStorage.getItem("total")
        ? JSON.parse(localStorage.getItem("total"))
        : 0,
    totalItems: localStorage.getItem("totalItems")
        ? JSON.parse(localStorage.getItem("totalItems"))
        : 0,
        loading: false,
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
            state.cart = []
            state.total = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setCartId: (state, action) => {
            state.cartId = action.payload
        },
        updateCart: (state, action) => {
            const updatedData = action.payload
            // console.log(action.payload)
            const index = state.cart.findIndex((cartItem) => cartItem.data.id === updatedData.id)
            if (index >= 0) {
                state.cart[index].data=updatedData
                state.total = state.cart.reduce((acc, item) => acc + updatedData.price*updatedData.quantity, 0)
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
            }
        }
    }
})

export const { addToCart, removeFromCart, resetCart, setLoading, setCartId, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
