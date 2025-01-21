import { createSlice } from "@reduxjs/toolkit";

const HistorySlice = createSlice({
    name: 'history',
    initialState: {
        items: []
    },
    reducers: {
        // update history
        addHistoryItem: (state, action) => {
            const {item} = action.payload;

            if (item) {
                state.items.push(item);
            }
        },

        setHistoryItems: (state, action) => {
            state.items = action.payload.items;
        }
    }
}); 

export const { addHistoryItem, setHistoryItems} = HistorySlice.actions;
export default HistorySlice.reducer;