import { configureStore } from "@reduxjs/toolkit";
import HistorySlice from "./HistorySlice";
import FavoriteSlice from "./FavoriteSlice";

export default configureStore({
    reducer: {
        history: HistorySlice,
        favoriteItems : FavoriteSlice,
    }
})