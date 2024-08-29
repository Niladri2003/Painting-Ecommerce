import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.favorites.push(action.payload);
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(
                (product) => product.productId !== action.payload
            );
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favouriteSlice.actions;
export default favouriteSlice.reducer;