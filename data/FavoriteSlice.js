import { createSlice } from "@reduxjs/toolkit";

const FavoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        items: []
    },
    reducers: {
        setFavoriteItem: (state, action) => {
            state.items = action.payload.items;
        }
    }
}); 

export const { setFavoriteItem } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;